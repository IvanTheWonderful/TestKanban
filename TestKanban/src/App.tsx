import { useEffect, useState } from "react";
import "./App.css";
import Kanban from "./components/Kanban";
import SelectSortingCriteria from "./components/SelectSortingCriteria";
import { dummyCardObjects } from "./dummyData/dummyCardObjects";
import { sortIntoKanbanBoard } from "./utilities/sortIntoKanbanBoard";
import { KanbanBoard } from "@caldwell619/react-kanban";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type CardObject = {
  id: number;
  title: string;
  description: string;
  assignedTo?: string;
  type: CardType;
  status: CardStatus;
};

export type ColumnNamesToProvide = "status" | "type";

const columnNames: Record<
  keyof Pick<CardObject, ColumnNamesToProvide>,
  string[]
> = {
  status: ["todo", "in-progress", "done"],
  type: ["task", "bug", "feature"],
};

export type CardStatus = "todo" | "in-progress" | "done";
export type CardType = "task" | "bug" | "feature";

function App() {
  const [board, setBoard] = useState<KanbanBoard<CardObject>>({ columns: [] });
  const [selectedKeyProperty, setSelectedKeyProperty] =
    useState<ColumnNamesToProvide>("status");

  // update the board based on the selectedKeyProperty
  useEffect(() => {
    const coresponsingColumnNames =
      selectedKeyProperty in columnNames
        ? columnNames[selectedKeyProperty]
        : [];
    const updatedBoard = sortIntoKanbanBoard(
      selectedKeyProperty,
      dummyCardObjects,
      coresponsingColumnNames
    );
    setBoard(updatedBoard);
  }, [selectedKeyProperty]);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <SelectSortingCriteria onChange={setSelectedKeyProperty} />;
      <Kanban board={board} setBoard={setBoard} />;
    </QueryClientProvider>
  );
}

export default App;
