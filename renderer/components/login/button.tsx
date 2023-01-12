import React from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

interface Props {
  content: string;
  backgroundColor?: string;
  textColor?: string;
  onClick?: () => void;
}

function Button(props: Props) {
  return (
    <AnimatePresence>
      <motion.button
        className={`${props.backgroundColor ?? "bg-emerald-500"} ${
          props.textColor ?? "text-white"
        } font-bold text-base rounded-lg p-1 select-none`}
        onClick={props.onClick}
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
      >
        {props.content}
      </motion.button>
    </AnimatePresence>
  );
}

export default Button;
