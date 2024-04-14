import setToast from "@/utils/setToast";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "@/components/Modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setToast("success", "ㅇ_ㅇ!");
    setIsOpen(true);
    document.querySelector("html")?.classList.add("scroll-locked");
  };

  const closeModal = () => {
    setToast("error", "ㅇ_ㅇ!");
    setIsOpen(false);
    document.querySelector("html")?.classList.remove("scroll-locked");
  };

  return (
    <>
      <div>
        <button onClick={openModal}>토스트 알림 보내기</button>
        <div style={{ marginTop: 2000 }}>ㅇ_ㅇ</div>
      </div>

      {isOpen && createPortal(<Modal closeModal={closeModal} />, document.body)}
    </>
  );
}
