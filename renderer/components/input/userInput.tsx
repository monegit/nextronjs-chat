import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface Props {
  placeholder?: string;
  password?: true;
  email?: true;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function UserInput(props: Props) {
  const inputAnimation = useAnimation();
  const emailRegex = /[a-zA-Z0-9\-_]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
  const passwordRegex = /[a-zA-Z0-9]{10,}/;

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
          inputAnimation.start({
            backgroundColor: "rgb(226, 232, 240)",
            color: "black",
            transition: { duration: 0.15 },
          });
          return;
        }

        // email test
        if (props.email) {
          if (emailRegex.test(value)) {
            inputAnimation.start({
              backgroundColor: "rgb(16, 185, 129)",
              color: "white",
              transition: { duration: 0.15 },
            });
          } else {
            inputAnimation.start({
              backgroundColor: "rgb(226, 232, 240)",
              color: "black",
              transition: { duration: 0.15 },
            });
          }
        }

        // password test
        if (props.password) {
          if (passwordRegex.test(value)) {
            inputAnimation.start({
              backgroundColor: "rgb(16, 185, 129)",
              color: "white",
              transition: { duration: 0.15 },
            });
          } else {
            inputAnimation.start({
              backgroundColor: "rgb(226, 232, 240)",
              color: "black",
              transition: { duration: 0.15 },
            });
          }
        }
      }}
    ></motion.input>
  );
}

export default UserInput;