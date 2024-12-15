import _ from "lodash";
import { action, computed, makeAutoObservable, observable } from "mobx";

export type TrampCard = {
  type: "cards-spade" | "diamond" | "cards-club" | "heart" | "joker";
  number: number | null;
};

export const MarkColorMap = {
  heart: "red",
  diamond: "red",
  "cards-club": "black",
  "cards-spade": "black",
} as const;

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

export type DumpSolitaireCard = {
  type: string;
  number: number;
};

export default class CardStore {
  @observable
  cards!: TrampCard[];

  @observable
  dealtCardsList!: DealtCards[];

  @observable
  activeColumnNumber!: string | null;

  @observable
  cardCoordinates!: CardCoordinate[];

  @observable
  dumpSolitaireCardsList!: [
    { cardAreaType: "cards-spade"; card: TrampCard | null },
    { cardAreaType: "diamond"; card: TrampCard | null },
    { cardAreaType: "cards-club"; card: TrampCard | null },
    { cardAreaType: "heart"; card: TrampCard | null },
  ];

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  @action
  public initialize() {
    this.createDeckOfCards();
    this.cardCoordinates = [];
    this.activeColumnNumber = null;
    this.dealtCardsList = [];
    this.dumpSolitaireCardsList = [
      { cardAreaType: "cards-spade", card: null },
      { cardAreaType: "diamond", card: null },
      { cardAreaType: "cards-club", card: null },
      { cardAreaType: "heart", card: null },
    ];
  }

  @action
  public addDumpSolitaireCardList(card: TrampCard, columnNumber: string) {
    if(this.isAddableDumpSolitaireCardList(card)) {
      const [matchingRecords, otherRecords] = _.partition(
        this.dumpSolitaireCardsList,
        (cardList) => cardList.cardAreaType === card.type
      );
      matchingRecords[0].card = card

      const [remainingCards, popCard] = _.partition(this.dealtCardsList, predicate => predicate.id === columnNumber)
      this.dumpSolitaireCardsList = [...remainingCards, ...matchingRecords]
      this.removeFromDealtCards(card, columnNumber)
    }
  }

  private removeFromDealtCards(removeCard: TrampCard, columnNumber: string) {
    const [targetCards, remainingCards] = _.partition(this.dealtCardsList, (dealtCards) => dealtCards.id == columnNumber);
    const mutatedCards = targetCards[0].cards.filter(card => card.type !== removeCard.type && card.number !== removeCard.number)
    this.dealtCardsList = [...remainingCards, { id: columnNumber, cards: mutatedCards }]
    this.dealtCardsList = _.sortBy(this.dealtCardsList, (cards) => parseInt(cards.id));
  }

  private isAddableDumpSolitaireCardList(addCard: TrampCard) {
    const targetCardList = this.dumpSolitaireCardsList.find(cardList => cardList.cardAreaType === addCard.type)

    // NOTE: カードがまだストックされてない状態
    if (targetCardList?.card === null && addCard.number === 1) {
      return true
    }

    if (
      addCard.number != null && // NOTE: nullガード
      targetCardList?.card?.number === addCard.number - 1) {
      return true
    }

    return false
  }

  @action
  public solitaireStart(splitNumber: number, isExcludeJoker: boolean) {
    if (isExcludeJoker) {
      this.cards = this.cards.filter((card) => card.type !== "joker");
    }
    this.deckShuffle();
    for (let i = 0; i < splitNumber; i++) {
      this.distributeCards(i + 1, i.toString());
    }
  }

  @action
  public setCardCoordinates(cardCoordinates: CardCoordinate[]) {
    this.cardCoordinates = cardCoordinates;
  }

  @action
  public setActiveColumnNumber(columnNumber: string | null) {
    this.activeColumnNumber = columnNumber;
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
  public dealOne(targetDealCardId?: number) {
    if(targetDealCardId) {
      const [targetCard, ...remainingCards] = this.cards
      this.cards = remainingCards
    } else {
      let dealCards: TrampCard[] = []
      let remainingCards: TrampCard[] = []
      if(this.cards.length < this.dealtCardsList.length) {
        // 配るカードが足りない場合
        dealCards = this.cards
        remainingCards = []
      } else {
        dealCards = this.cards.slice(0, this.dealtCardsList.length)
        remainingCards = this.cards.slice(this.dealtCardsList.length, this.cards.length)
      }

      this.cards = remainingCards
      const newDealtCardsList = this.dealtCardsList.map((dealtCards, index) => {
        return { id: dealtCards.id, cards: dealCards[index] ? dealtCards.cards.concat(dealCards[index]) : dealtCards.cards}
      })
      this.dealtCardsList = newDealtCardsList
    }
  }

  @action
  public distributeCards(distributeNumber: number, index: string) {
    const distributeCards = this.cards.slice(0, distributeNumber);

    this.cards = this.cards.slice(distributeNumber);
    this.dealtCardsList = [
      ...this.dealtCardsList,
      {
        id: index,
        cards: distributeCards,
      },
    ];
  }

  @action
  private createDeckOfCards() {
    const cards: TrampCard[] = [];
    for (let i = 1; i <= 13; i++) {
      cards.push({ type: "cards-spade", number: i });
      cards.push({ type: "diamond", number: i });
      cards.push({ type: "cards-club", number: i });
      cards.push({ type: "heart", number: i });
    }
    cards.push({ type: "joker", number: null });
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
    const findToCards = this.dealtCardsList.find(
      (dealtCards) => dealtCards.id == toDealtCardsId,
    );
    if (findToCards === undefined) return false;
    const lastCard = _.last(findToCards.cards);
    if (lastCard === undefined) return false;

    if (
      this.isEmptyCards(toDealtCardsId) ||
      this.isDescendingOrderAndColorAlternating(lastCard, trampCard)
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
  }

  @computed
  public get getDealtCardsList() {
    return this.dealtCardsList;
  }

  private isEmptyCards(toDealtCardsId: string) {
    const findCards = this.dealtCardsList.find(
      (dealtCards) => dealtCards.id == toDealtCardsId,
    );
    if (findCards === undefined) return false;
    return findCards.cards.length === 0;
  }

  private isDescendingCards(currentCard: TrampCard, nextCard: TrampCard) {
    if (currentCard.number === null || nextCard.number === null) return false;

    return currentCard.number - 1 === nextCard.number;
  }

  private descendingOrderAndColorAlternatingGrouping(originList: TrampCard[]) {
    let index = 0;
    const groupedList: (TrampCard | TrampCard[])[] = [];
    let tempGroup: TrampCard[] = [];
    _.forEach<TrampCard>(originList, (_) => {
      if (originList[index + 1] === undefined) {
        // NOTE: 最後の要素の時
        if (tempGroup.length > 0) {
          tempGroup.push(originList[index]);
          groupedList.push(tempGroup);
        } else {
          groupedList.push(originList[index]);
        }
      } else if (
        // NOTE: 最後の要素ではない、かつ次の要素が連番の時、かつ次の要素が同じ色でない時
        originList[index + 1] !== undefined &&
        this.isDescendingOrderAndColorAlternating(
          originList[index],
          originList[index + 1],
        )
      ) {
        tempGroup.push(originList[index]);
        index++;
      } else {
        // NOTE: 最後の要素ではない、かつ次の要素が連番ではない時、または次の要素が同じ色の時
        if (tempGroup.length > 0) {
          tempGroup.push(originList[index]);
          groupedList.push(tempGroup);
        } else {
          groupedList.push(originList[index]);
        }
        tempGroup = [];
        index++;
      }
    });
    return groupedList;
  }

  private isDescendingOrderAndColorAlternating(
    currentCard: TrampCard,
    nextCard: TrampCard,
  ) {
    return (
      this.isDescendingCards(currentCard, nextCard) &&
      this.isNotSerialSameColorCard(currentCard, nextCard)
    );
  }

  private isNotSerialSameColorCard(
    currentCard: TrampCard,
    nextCard: TrampCard,
  ) {
    return !(
      (currentCard.type === "cards-club" && nextCard.type === "cards-club") ||
      (currentCard.type === "cards-club" && nextCard.type === "cards-spade") ||
      (currentCard.type === "cards-spade" && nextCard.type === "cards-club") ||
      (currentCard.type === "cards-spade" && nextCard.type === "cards-spade") ||
      (currentCard.type === "diamond" && nextCard.type === "diamond") ||
      (currentCard.type === "diamond" && nextCard.type === "heart") ||
      (currentCard.type === "heart" && nextCard.type === "diamond") ||
      (currentCard.type === "heart" && nextCard.type === "heart")
    );
  }
}
