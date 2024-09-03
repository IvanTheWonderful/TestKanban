import { CardObject } from "../App";

interface SelectSortingCriteriaProps {
  onChange: (arr: Array<keyof Partial<CardObject>>) => void;
}

const SelectSortingCriteria = (props: SelectSortingCriteriaProps) => {
  const { onChange } = props;
  const keysOfCardObject: Array<keyof CardObject> = [
    "status",
    "type",
    "assignedTo",
  ];
  return (
    <select
      name="keyProperty"
      id="keyProperty"
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      {keysOfCardObject.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
};

export default SelectSortingCriteria;
