import "./Style/categorySelect.css";

interface Props {
  data: {
    categoryId: number;
    categoryName: string;
  }[];
  setCategoryValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function CategorySelect(props: Props) {
  const ChoiceCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  return (
    <select className="Category_Select" onChange={(e) => ChoiceCategoryHandler(e)}>
      <option value={0}>
        없음
      </option>
      {props.data.map((el) => {
        return (
          <option key={el.categoryId} value={el.categoryId}>
            {el.categoryName}
          </option>
        );
      })}
    </select>
  );
}
