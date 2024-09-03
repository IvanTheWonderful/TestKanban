import { CardObject } from "../App";
import "./CustomCard.css";

interface CustomCardProps {
  card: CardObject;
  isMoving?: boolean;
}

const CustomCard = (props: CustomCardProps) => {
  const { card, isMoving } = props;
  const { title, description, assignedTo, status } = card;
  return (
    <div
      className={`react-kanban-card react-kanban-card--dragging ${
        isMoving && "is-moving"
      } ${status}`}
    >
      <h3>{title}</h3>
      <p>Description: {description}</p>
      {assignedTo && <p>Assigned To: {assignedTo}</p>}
      {isMoving && <div className="spinner" />}
    </div>
  );
};

export default CustomCard;
