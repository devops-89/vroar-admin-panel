import { hideModal } from "@/redux/reducers/modal";
import styles from "@/styles/modal.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";

export default function Modal() {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.modal.content);

  function closeModal() {
    dispatch(hideModal());
  }

  const modalBackgroundAnimation = useSpring({
    opacity: content ? 1 : 0,
    transform: content ? "translateY(0)" : "translateY(-20px)",
    config: { tension: 200, friction: 20 },
  });

  const modalContentAnimation = useSpring({
    opacity: content ? 1 : 0,
    transform: content ? "scale(1)" : "scale(0.9)",
    config: { tension: 200, friction: 20 },
  });

  const router = useRouter();

  return (
    <animated.div
      style={modalBackgroundAnimation}
      onClick={(e) => {
        if (e.target.classList.contains(`${styles.modal__background}`)) {
          closeModal();
        }
      }}
      className={`${styles.modal__background} ${content ? "d-flex" : "d-none"}`}
    >
      <animated.div
        style={modalContentAnimation}
        className={`${styles.modal__content}`}
      >
        {content}
      </animated.div>
    </animated.div>
  );
}
