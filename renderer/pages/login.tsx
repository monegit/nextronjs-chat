import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import UserInput, { SizeType } from "../components/input/userInput";
import Button from "../components/login/button";
import { useModalStore } from "../store/modal";
import Registry from "../components/modal/content/registry";
import { ipcRenderer } from "electron";
import { useUserStore } from "../store/user";
import { useRouter } from "next/router";
import { UserData } from "../libs/dto/user";
import { useAlertStore } from "../store/alert";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <React.Fragment>
      <motion.div className="grid h-screen gap-2 place-content-center">
        <img
          src="/images/logo.png"
          className="relative justify-self-center w-20 bottom-5"
        />
        <UserInput
          email
          sizeType={SizeType.Fixed}
          onKeyUp={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <UserInput
          password
          sizeType={SizeType.Fixed}
          onKeyUp={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <div className="grid grid-flow-col gap-2 text-sm items-center">
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
              ipcRenderer.send("data/user/login", {
                email: email,
                password: password,
              });
              ipcRenderer.on(
                "data/user/login",
                (
                  event,
                  res: { code: string; message: string; user?: UserData }
                ) => {
                  switch (res.code) {
                    case "ok":
                      useUserStore.setState({
                        name: res.user.name,
                        birth: res.user.birth,
                        uid: res.user.uid,
                        docId: res.user.docId,
                      });

                      router.push("/main");
                      break;
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                      useAlertStore.setState({
                        isVisible: true,
                        content: "Email or password do not match",
                      });
                      break;
                    case "auth/uid-not-found":
                    default:
                      useAlertStore.setState({
                        isVisible: true,
                        content: "unknown error",
                      });
                  }
                }
              );
            }}
          />
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default login;
