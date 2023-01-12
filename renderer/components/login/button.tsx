import React from "react";
import { motion, useAnimation } from "framer-motion";

interface Props {
  content: string;
  backgroundColor?: string;
  textColor?: string;
  onClick?: () => void;
}

function Button(props: Props) {
  const buttonAnimation = useAnimation();
  return (
    <motion.button
      className={`${props.backgroundColor ?? "bg-emerald-500"} ${
        props.textColor ?? "text-white"
      } font-bold text-base rounded-lg p-1`}
      onClick={props.onClick}
      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
    >
      {props.content}
    </motion.button>
  );
}

export default Button;
