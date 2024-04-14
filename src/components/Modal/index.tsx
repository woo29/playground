import styles from "./Modal.module.css";

type TModal = {
  closeModal: any;
};

function Modal({ closeModal }: TModal) {
  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <button onClick={closeModal}>닫기</button>
        <p className={styles.content}>
          모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달모달
        </p>
      </div>
    </div>
  );
}

export default Modal;
