class Card {
  constructor(cardType, color, value, symbol) {
    this.cardType = cardType;
    this.color = color;
    this.value = value;
    this.symbol = symbol;
  }
}

const CARD_COLORS = {
  RED: "RED",
  BLACK: "BLACK",
};

const CARD_TYPES = {
  CLUB: "CLUB",
  DIAMOND: "DIAMOND",
  HEART: "HEART",
  SPADE: "SPADE",
};

const CARD_TYPES_SYMBOL = {
  CLUB: "♣",
  DIAMOND: "♦",
  HEART: "♥",
  SPADE: "♠",
};

const CARD_VALUES = {
  A: "A",
  K: "K",
  Q: "Q",
  J: "J",
  10: "10",
  9: "9",
  8: "8",
  7: "7",
  6: "6",
  5: "5",
  4: "4",
  3: "3",
  2: "2",
};

const CARD_TYPE_ARRAY = ["CLUB", "HEART", "SPADE", "DIAMOND"];
const CARD_VALUES_ARRAY = [
  "A",
  "K",
  "Q",
  "J",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

function createDeck() {
  let deck = CARD_TYPE_ARRAY.map((cardType) => {
    let color =
      cardType === CARD_TYPES.CLUB || cardType === CARD_TYPES.SPADE
        ? CARD_COLORS.BLACK
        : CARD_COLORS.RED;
    let cardsByType = CARD_VALUES_ARRAY.map((value) => {
      return new Card(cardType, color, value, CARD_TYPES_SYMBOL[cardType]);
    });
    return cardsByType;
  });
  return deck;
}

let cardDeck = createDeck();

const cssClasses = {
  cardContainerClass: "card",
  cardTopClass: "card-top",
  cardMiddlwClass: "card-middle",
  cardBottomClass: "card-bottom",
  cardItemSpanClass: "card-item-span",
  cardSymbolSpaceArroundClass: "card-symbol-space-around",
  cardSymbolExtraSmallClass: "card-symbol-xsm",
  cardSymbolSmallClass: "card-symbol-sm",
  cardSymbolMediumClass: "card-symbol-md",
  cardSymbolLargeClass: "card-symbol-lg",
};

(function () {
  let container = document.getElementById("container");
  cardDeck.forEach((cardArray) => {
    cardArray.forEach((card) => {
      let cardUI = createCardUI(card);
      container.appendChild(cardUI);
    });
  });
})();

function createCardUI(card) {
  let colorClass =
    card.color === CARD_COLORS.RED ? "card-color-red" : "card-color-black";
  let cardElement = document.createElement("div");
  cardElement.classList.add(cssClasses.cardContainerClass);
  cardElement.classList.add(colorClass);
  let topElement = document.createElement("div");
  let middleElement = document.createElement("div");
  let bottomElement = document.createElement("div");
  topElement.innerText = card.value;
  bottomElement.innerText = card.value;
  if (CARD_VALUES_ARRAY.indexOf(card.value) > 3) {
    let tmpArray = new Array(+card.value).fill(card.symbol);
    tmpArray.forEach((cardSymbol, i) => {
      let symbolDiv = document.createElement("div");
      symbolDiv.innerText = cardSymbol;
      if (+card.value % 2 === 1 && i + 1 === +card.value) {
        symbolDiv.classList.add(cssClasses.cardItemSpanClass);
      }
      middleElement.appendChild(symbolDiv);
    });
    let cardValue = +card.value;
    if (cardValue > 8) {
      middleElement.classList.add(cssClasses.cardSymbolExtraSmallClass);
    } else if (cardValue > 6) {
      middleElement.classList.add(cssClasses.cardSymbolSmallClass);
    } else if (cardValue > 4) {
      middleElement.classList.add(cssClasses.cardSymbolMediumClass);
    } else {
      middleElement.classList.add(cssClasses.cardSymbolLargeClass);
    }
    middleElement.classList.add(cssClasses.cardSymbolSpaceArroundClass);
  } else {
    middleElement.innerText = card.symbol;
  }
  topElement.classList.add(cssClasses.cardTopClass);
  middleElement.classList.add(cssClasses.cardMiddlwClass);
  bottomElement.classList.add(cssClasses.cardBottomClass);
  cardElement.appendChild(topElement);
  cardElement.appendChild(middleElement);
  cardElement.appendChild(bottomElement);
  return cardElement;
}
