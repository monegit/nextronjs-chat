import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAlertStore } from "../../store/alert";

function Alert(props: { content: string }) {
  const alertAnimation = useAnimation();
  const { isVisible } = useAlertStore();

  useEffect(() => {
    if (isVisible!) {
      alertAnimation.set({ display: "grid", top: -10 });
      alertAnimation.start({
        opacity: 1,
        transition: { duration: 0.1 },
      });
      alertAnimation
        .start({
          top: 0,
          transition: { duration: 0.2 },
        })
        .then(() => {
          alertAnimation
            .start({ opacity: 0, transition: { duration: 0.1, delay: 2 } })
            .then(() => {
              alertAnimation.set({ display: "none", top: -10 });
              useAlertStore.setState({ isVisible: false });
            });
          alertAnimation.start({
            top: -10,
            transition: { duration: 0.15, delay: 2 },
          });
        });
    }
  }, [isVisible]);

  return (
    <motion.div
      animate={alertAnimation}
      initial={{ opacity: 0, display: "none" }}
      className="grid absolute w-full z-50"
    >
      <motion.div
        className="grid relative z-10 bg-white place-self-center p-2 max-w-xl w-full m-5 rounded-xl shadow-lg border border-slate-200 font-bold text-center"
        initial={{ top: -10 }}
      >
        {props.content}
      </motion.div>
    </motion.div>
  );
}
export default Alert;
