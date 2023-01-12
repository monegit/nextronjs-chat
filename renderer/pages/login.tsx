import React, { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import UserInput from "../components/input/userInput";
import Button from "../components/login/button";
import CheckBox from "../components/login/checkBox";
import Modal from "../components/modal/modal";
import { useModalStore } from "../store/modal";
import Registry from "../components/modal/content/registry";
import { ipcRenderer } from "electron";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <React.Fragment>
      <motion.div className="grid h-screen gap-2 place-content-center">
        <img
          src="/images/logo.png"
          className="relative justify-self-center w-20 bottom-5"
        />
        <UserInput
          email
          onKeyUp={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <UserInput
          password
          onKeyUp={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
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
          <Button
            content="Login"
            onClick={() => {
              ipcRenderer.send("data/user/login:client", {
                email: email,
                password: password,
              });
              ipcRenderer.on("data/user/login:server", (event, res) => {
                console.log(res);
              });
            }}
          />
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default login;
