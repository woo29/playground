import { useEffect, useState } from "react";
import styles from "./dnd.module.css";
import Layout from "@/components/Layout";

export type TItemStatus = "To Do" | "On Progress" | "Done" | "test";

export type TItem = {
  id: string;
  status: string;
  title: string;
  index: number;
};

export type TItems = {
  [key in string]: TItem[];
};

function DragAndDrop() {
  const [data, setData] = useState<TItems>({
    "To Do": [...Array(5)].map((_, i) => ({
      id: `${i}${i}${i}`,
      title: `Title ${i + 1}000`,
      status: "To Do",
      index: i,
    })),
    "On Progress": [],
    Done: [],
    test: [],
  });

  return (
    <div className={styles.wrap}>
      <Layout data={data} setData={setData} />
    </div>
  );
}

export default DragAndDrop;
