import {
  Card,
  ControlledBoard,
  KanbanBoard,
  moveCard,
  OnDragEndNotification,
} from "@caldwell619/react-kanban";
import "@caldwell619/react-kanban/dist/styles.css";
import { useState } from "react";
import { CardObject } from "../App";
import CustomCard from "./CustomCard";

interface KanbanProps {
  board: KanbanBoard<CardObject>;
  setBoard: React.Dispatch<React.SetStateAction<KanbanBoard<CardObject>>>;
}

const Kanban = (props: KanbanProps) => {
  const { board, setBoard } = props;
  const [cardsBeingMoved, setCardsBeingMoved] = useState<
    Array<string | number>
  >([]);

  const [disableCardDrag, setDisableCardDrag] = useState<boolean>(false);

  const handleCardMove: OnDragEndNotification<Card> = async (
    _card,
    source,
    destination
  ) => {
    setCardsBeingMoved([...cardsBeingMoved, _card.id]);
    setBoard((currentBoard) => {
      return moveCard(currentBoard, source, destination);
    });

    // dummy api call
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(_card),
    });
    const data = await response.json();

    // If api call fails, revert the card to its original position
    if (data.id !== 101) {
      const newDestination = {
        toPosition: source?.fromPosition,
        toColumnId: source?.fromColumnId,
      };
      const newSource = {
        fromPosition: destination?.toPosition,
        fromColumnId: destination?.toColumnId,
      };
      console.log("API call failed.");
      setBoard((currentBoard) => {
        return moveCard(currentBoard, newSource, newDestination);
      });
    } else {
      setCardsBeingMoved(cardsBeingMoved.filter((id) => id !== _card.id));
    }
  };

  return (
    <>
      <div className="input-n-label">
        <input
          type="checkbox"
          name="disable-card-drag"
          id="disable-card-drag"
          onChange={() => {
            setDisableCardDrag(!disableCardDrag);
          }}
        />
        <label htmlFor="disable-card-drag">Disable Card Drag</label>
      </div>
      <ControlledBoard
        onCardDragEnd={handleCardMove}
        disableCardDrag={disableCardDrag}
        disableColumnDrag
        allowRenameColumn={false}
        renderCard={(card: CardObject) => (
          <CustomCard
            card={card}
            isMoving={cardsBeingMoved.includes(card.id)}
          />
        )}
      >
        {board}
      </ControlledBoard>
    </>
  );
};

export default Kanban;
