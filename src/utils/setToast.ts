import { Bounce, toast } from "react-toastify";

type Type = "info" | "success" | "warn" | "error";

/*
type: "info" | "success" | "warn" | "error" 중 하나 넣기
text: 토스트에 보여질 문구
사용방법: setToast("warn", "🚨 경고 메세지 출력!")
*/
const setToast = (type: Type, text: string): void => {
  toast[type](text, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export default setToast;
