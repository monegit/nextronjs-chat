import React, { ReactElement, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useModalStore } from "../../store/modal";

interface Props {
  content: ReactElement;
}

function Modal(props: Props) {
  // const contentAnimation = useAnimation();
  const modalAnimation = useAnimation();
  const { isVisible } = useModalStore();

  useEffect(() => {
    if (isVisible!) {
      modalAnimation.set({ display: "grid", top: -10 });
      modalAnimation.start({
        opacity: 1,
        transition: { duration: 0.1 },
      });
      modalAnimation.start({
        top: 0,
        transition: { duration: 0.2 },
      });
    } else {
      modalAnimation
        .start({ opacity: 0, transition: { duration: 0.1 } })
        .then(() => {
          modalAnimation.set({ display: "none", top: -10 });
        });
      modalAnimation.start({
        top: 10,
        transition: { duration: 0.15 },
      });
    }
  }, [isVisible]);

  return (
    <motion.div
      animate={modalAnimation}
      initial={{ opacity: 0, display: "none" }}
      className="grid absolute w-full h-full z-10"
    >
      <motion.div
        className="grid relative z-10 bg-white place-self-center p-14 px-20 rounded-xl shadow-lg"
        initial={{ top: -10 }}
      >
        {props.content}
      </motion.div>
      <motion.div
        className="absolute w-full h-full bg-slate-500/50"
        onClick={() => {
          useModalStore.setState({ isVisible: false });
        }}
      />
    </motion.div>
  );
}

export default Modal;
