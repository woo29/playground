import styles from "./Layout.module.css";
import Item from "../Item";
import Image from "next/image";
import { TItems } from "@/pages/dnd";
import { useState, useEffect, MouseEvent, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Layout({
  data,
  setData,
}: {
  data: TItems;
  setData: (items: TItems) => void;
}) {
  const [buttonVisible, setButtonVisible] = useState({
    prev: false,
    next: true,
  });
  const [enabled, setEnabled] = useState(false);
  const cardContainer = useRef<any>(null);
  const xDown = useRef<any>(null);
  const xUp = useRef<any>(null);

  const handlePrevCard = () => {
    cardContainer.current.scrollBy({
      left: -820,
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNextCard = () => {
    cardContainer.current.scrollBy({
      left: 820,
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const maxScrollLeft =
      cardContainer.current.scrollWidth - cardContainer.current.clientWidth;
    const isStart = cardContainer.current.scrollLeft === 0;
    const isEnd = cardContainer.current.scrollLeft >= maxScrollLeft - 100;

    if (isStart) {
      setButtonVisible({
        prev: false,
        next: true,
      });
      return;
    }

    if (isEnd) {
      setButtonVisible({
        prev: true,
        next: false,
      });
      return;
    }

    setButtonVisible({
      prev: true,
      next: true,
    });
  };

  const handleSwipeAction = (xDiff: any) => {
    console.log(xDiff);
    if (xDiff > 0) {
      handleNextCard();
      return;
    }

    handlePrevCard();
  };

  const handleMove = () => {
    if (!xDown.current) {
      return;
    }
    const xDiff = xDown.current - xUp.current;
    if (xDiff !== 0) {
      handleSwipeAction(xDiff);
    }
    // 좌표 초기화
    xDown.current = null;
    xUp.current = null;
  };

  const handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset.status === "item") {
      return;
    }

    xDown.current = e.clientX;
    document.body.style.userSelect = "none";
  };

  const handleMouseUp = (e: MouseEvent) => {
    xUp.current = e.clientX;
    handleMove();
    document.body.style.userSelect = "";
  };

  const onDragEnd = ({ source, destination }: any) => {
    if (!destination) {
      return;
    }

    const scourceKey = source.droppableId; // 클릭한 곳의 key
    const destinationKey = destination.droppableId; // 드랍한 곳의 key

    const _items = JSON.parse(JSON.stringify(data));

    const [targetItem] = _items[scourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);

    setData(_items);
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  useEffect(() => {
    if (cardContainer.current) {
      cardContainer.current.addEventListener("scroll", handleScroll);
    }
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={styles.wrap}
        ref={cardContainer}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {Object.keys(data).map((key) => (
          <div className={styles.contaniner} key={key}>
            <h2 className={styles.title}>{key}</h2>
            <Droppable key={key} droppableId={key}>
              {(provided) => (
                <div
                  className={styles.box}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data[key]?.map((list, index) => (
                    <Draggable
                      key={list.id}
                      draggableId={list.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <Item text={list.title} key={list.id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
        {/* {buttonVisible.prev && (
          <Image
            width="16"
            height="16"
            className={styles.btn1}
            src="/arrow-left.svg"
            alt="이전 버튼"
            onClick={handlePrevCard}
          />
        )}
        {buttonVisible.next && (
          <Image
            width="16"
            height="16"
            className={styles.btn2}
            onClick={handleNextCard}
            src="/arrow-right.svg"
            alt="다음 버튼"
          />
        )} */}
      </div>
    </DragDropContext>
  );
}

export default Layout;
