import React, { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import UserInput from "../components/input/userInput";
import Button from "../components/login/button";
import CheckBox from "../components/login/checkBox";
import Modal from "../components/modal/modal";
import { useModalStore } from "../store/modal";
import Registry from "../components/modal/content/registry";

function login() {
  return (
    <React.Fragment>
      <motion.div className="grid h-screen gap-2 place-content-center">
        <img
          src="/images/logo.png"
          className="relative justify-self-center w-20 bottom-5"
        />
        <UserInput email />
        <UserInput password />
        <div className="grid grid-flow-col gap-2 text-sm items-center">
          {/* <div className="grid justify-items-center">
            <CheckBox />
          </div> */}
          <Button
            content="Sign up"
            backgroundColor="bg-sky-500"
            onClick={() => {
              useModalStore.setState({
                isVisible: true,
                content: <Registry />,
              });
            }}
          />
          <Button content="Login" />
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default login;
