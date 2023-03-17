import "./Style/categorySelect.css";

interface Props {
  data: {
    categoryId: number;
    categoryName: string;
  }[];
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
}

export default function CategorySelect(props: Props) {
  const ChoiceCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    props.setCategoryId(parseInt(e.target.value));
  };

  return (
    <select
      className="Category_Select"
      onChange={(e) => ChoiceCategoryHandler(e)}
    >
      {props.data.length !== 0
        ? props.data.map((el) => {
            return (
              <option key={el.categoryId} value={el.categoryId}>
                {el.categoryName}
              </option>
            );
          })
        : null}
    </select>
  );
}
