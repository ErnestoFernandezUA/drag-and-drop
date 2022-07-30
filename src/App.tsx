import React, { useState } from 'react';
import './App.scss';

type Card = {
  id: string;
  order: string;
  name: string;
};

const someCards: Card[] = [
  { id: '1', order: '1', name: 'card #1' },
  { id: '3', order: '3', name: 'card #3' },
  { id: '4', order: '4', name: 'card #4' },
  { id: '2', order: '2', name: 'card #2' },
];

export const App: React.FC = () => {
  const [cardList, setCardList] = useState(someCards);
  const [currentCard, setCurrentCard] = useState({
    id: '',
    order: '',
    name: '',
  });

  const basicOrder = () => setCardList(someCards);

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, card: Card) => {
    // eslint-disable-next-line no-console
    // console.log(event, card);

    setCurrentCard(card);
  };

  const dragLeaveHandler = (event: any) => {
    // eslint-disable-next-line no-console
    console.log('see this', event);

    // eslint-disable-next-line no-param-reassign
    event.target.style.backgroundColor = 'red';
  };

  const dragEndHandler = (event: any) => {
    // eslint-disable-next-line no-console
    console.log(event);

    // eslint-disable-next-line no-param-reassign
    // event.target.style.background = 'red';
  };

  const dragOverHandler = (event: any) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    console.log(event);

    // eslint-disable-next-line no-param-reassign
    event.target.style.background = 'lightgrey';
  };

  const dropHandler = (event: any, card: Card) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    console.log(card, event);

    setCardList(cardList.map(c => {
      if (c.id === card.id) {
        return { ...c, order: currentCard.order };
      }

      if (c.id === currentCard.id) {
        return { ...c, order: card.order };
      }

      return c;
    }));

    // eslint-disable-next-line no-param-reassign
    event.target.style.background = 'red';
  };

  const sortCards = (c1: Card, c2: Card) => {
    return (c1.order > c2.order) ? 1 : -1;
  };

  return (
    <div className="starter">
      <h1 className="title">drug and drop</h1>
      {cardList.sort(sortCards).map((card: { id: string; order: string; name: string; }) => (
        <div
          key={card.id}
          className="card"
          draggable="true"
          onDragStart={(event) => dragStartHandler(event, card)}
          onDragLeave={(event) => dragLeaveHandler(event)}
          onDragEnd={(event) => dragEndHandler(event)}
          onDragOver={(event) => dragOverHandler(event)}
          onDrop={(event) => dropHandler(event, card)}
        >
          {card.name}
        </div>
      ))}
      <button
        className="button"
        type="button"
        onClick={basicOrder}
      >
        Basic
      </button>
    </div>
  );
};
