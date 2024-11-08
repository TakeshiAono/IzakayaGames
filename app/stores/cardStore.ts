import _ from "lodash";
import { action, computed, makeAutoObservable, observable } from "mobx";

export type TrampCard = {
  type: "cards-spade" | "diamond" | "cards-club" | "heart" | "joker";
  number: number | null;
};

export type DealtCards = {
  id: string;
  cards: TrampCard[];
};

export type CardCoordinate = {
  id: string;
  xHead: number;
  yHead: number;
  xBottom: number;
  yBottom: number;
};

export default class CardStore {
  @observable
  cards!: TrampCard[];

  @observable
  dealtCardsList!: DealtCards[];

  @observable
  cardCoordinates!: CardCoordinate[];

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  @action
  public initialize() {
    this.createDeckOfCards();
    this.cardCoordinates = [];
  }

  @action
  public solitaireStart(splitNumber: number, isExcludeJoker: boolean) {
    if (isExcludeJoker) {
      this.cards = this.cards.filter((card) => card.type !== "joker");
    }
    this.deckShuffle();
    this.deal(splitNumber);
  }

  @action
  public setCardCoordinates(cardCoordinates: CardCoordinate[]) {
    this.cardCoordinates = cardCoordinates;
  }

  @action
  public deckShuffle() {
    const cards = this.cards;
    for (let i = cards.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = cards[i];
      cards[i] = cards[r];
      cards[r] = tmp;
    }
    console.log("しゃっふるしたcards", cards);
    this.cards = cards;
  }

  @action
  public deal(splitNumber: number) {
    const cards = this.cards;
    // BUG: 割り切れない時におかしくなる
    const chunkSize = Math.ceil(cards.length / splitNumber);
    this.dealtCardsList = _.chunk(cards, chunkSize).map((cards, index) => {
      return { id: index.toString(), cards };
    });
  }

  @action
  private createDeckOfCards() {
    const cards: TrampCard[] = [];
    for (let i = 1; i <= 13; i++) {
      console.log("i", i);
      cards.push({ type: "cards-spade", number: i });
      cards.push({ type: "diamond", number: i });
      cards.push({ type: "cards-club", number: i });
      cards.push({ type: "heart", number: i });
    }
    cards.push({ type: "joker", number: null });
    console.log("cards", cards);
    this.cards = cards;
  }

  // TODO: ゆくゆくはデコレーターを使用して、addとremoveにルールを追加できるようにする
  // ルールデコレーターをゲームによって動的に変更できるようにする
  @action
  public exchangeCard(
    fromDealtCardsId: string,
    toDealtCardsId: string,
    trampCard: TrampCard,
  ) {
    const removeToCards = this.dealtCardsList.filter(
      (dealtCards) => dealtCards.id == fromDealtCardsId,
    );
    const addToCards = this.dealtCardsList.filter(
      (dealtCards) => dealtCards.id == toDealtCardsId,
    );
    if (removeToCards.length === 0 || addToCards.length === 0) return;
    const otherCardsList = this.dealtCardsList.filter(
      (dealtCards) =>
        dealtCards.id != fromDealtCardsId && dealtCards.id != toDealtCardsId,
    );

    const addedCards = [...addToCards[0].cards, trampCard];
    const deletedCards = removeToCards[0].cards.filter(
      (card) =>
        !(card.type == trampCard.type && card.number == trampCard.number),
    );

    // NOTE: このソートをしなければcardsの順番が変わってしまう
    const tempList = [
      ...otherCardsList,
      { id: removeToCards[0].id, cards: deletedCards },
      { id: addToCards[0].id, cards: addedCards },
    ];
    this.dealtCardsList = _.sortBy(tempList, (cards) => parseInt(cards.id));
  }

  @computed
  public get getDealtCardsList() {
    return this.dealtCardsList;
  }
}
