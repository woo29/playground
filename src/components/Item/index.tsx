import styles from "./Item.module.css";

type TItem = {
  text: string;
};

function Item({ text }: TItem) {
  return (
    <div data-status="item" className={styles.box}>
      {text}
    </div>
  );
}

export default Item;
