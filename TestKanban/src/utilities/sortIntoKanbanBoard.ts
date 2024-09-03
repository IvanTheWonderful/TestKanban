import { Card, KanbanBoard } from "@caldwell619/react-kanban";

export const sortIntoKanbanBoard = <T extends Card>(
  keyProperty: keyof T,
  array: T[],
  columnNames?: Array<T[keyof T]>
): KanbanBoard<T> => {
  // Define an empty object to store the sorted arrays
  const sortedArrays: KanbanBoard<T> = { columns: [] };

  // Add an "not-specified" column to store items that do not have the keyProperty
  sortedArrays.columns.push({
    id: "not-specified",
    title: "",
    cards: [],
  });

  // If columnNames is provided, create a column for each item in columnNames (usecases: status, type)
  // If not, create a column for each unique value of the keyProperty (usecase: assignedTo)
  if (columnNames && columnNames.length > 0) {
    columnNames.forEach((item) => {
      sortedArrays.columns.push({
        id: String(item),
        title: String(item),
        cards: [],
      });
    });
  } else {
    // Find the unique values of the keyProperty, and don't include undefined or null
    const uniqueValues = Array.from(
      new Set(array.map((card) => card[keyProperty]))
    ).filter((item) => item !== undefined && item !== null);

    // Create a column for each unique value of the keyProperty
    uniqueValues.forEach((item) => {
      sortedArrays.columns.push({
        id: String(item),
        title: String(item),
        cards: [],
      });
    });
  }

  // Define the not-specified column
  const notSpecifiedColumn = sortedArrays.columns[0];

  // Sort the array into arrays based on the keyProperty
  array.forEach((card) => {
    const valueOfKeyProperty = card[keyProperty];
    if (keyProperty in card) {
      // Find the column that corresponds to the keyProperty
      const column = sortedArrays.columns.find(
        (column) => column.id === String(valueOfKeyProperty)
      );
      // Push the card into the column
      column?.cards.push(card);
    } else {
      // If the keyProperty is not in the card, push it into the "not-specifid" array
      notSpecifiedColumn.cards.push(card);
    }
  });

  // If the not-specified column is empty, remove it
  if (notSpecifiedColumn.cards.length === 0) {
    sortedArrays.columns.shift();
  }

  return sortedArrays;
};
