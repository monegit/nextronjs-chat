import React, { useState } from "react";
import { AnimationControls, motion, useAnimation } from "framer-motion";

interface Props {
  placeholder?: string;
  password?: true;
  email?: true;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const isTrueAnimation = {
  backgroundColor: "rgb(16, 185, 129)",
  color: "rgb(255, 255, 255)",
  transition: { duration: 0.15 },
};

const isFalseAnimation = {
  backgroundColor: "rgb(226, 232, 240)",
  color: "rgb(0, 0, 0)",
  transition: { duration: 0.15 },
};

function UserInput(props: Props) {
  const inputAnimation = useAnimation();
  const emailRegex = /[a-zA-Z0-9\-_]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
  const passwordRegex = /[a-zA-Z0-9]{6,}/;

  return (
    <motion.input
      animate={inputAnimation}
      type={props.password ? "password" : ""}
      className="outline-none bg-slate-200 rounded-xl w-80 h-12 p-4"
      placeholder={
        props.placeholder ??
        (props.email ? "abcde@homepage.com" : props.password ? "password" : "")
      }
      onKeyUp={props.onKeyUp}
      onFocus={() => {
        inputAnimation.start({ scale: 1.03, transition: { duration: 0.15 } });
      }}
      onBlur={() => {
        inputAnimation.start({ scale: 1, transition: { duration: 0.15 } });
      }}
      onChange={(e) => {
        let value = e.target.value;

        if (value === "") {
          inputAnimation.start(isFalseAnimation);
          return;
        }

        // email test
        if (props.email) {
          if (emailRegex.test(value)) {
            inputAnimation.start(isTrueAnimation);
          } else {
            inputAnimation.start(isFalseAnimation);
          }
        }

        // password test
        if (props.password) {
          if (passwordRegex.test(value)) {
            inputAnimation.start(isTrueAnimation);
          } else {
            inputAnimation.start(isFalseAnimation);
          }
        }
      }}
    ></motion.input>
  );
}

export default UserInput;
