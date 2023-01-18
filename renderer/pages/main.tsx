import React, { ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ipcRenderer } from "electron";
import { UserData } from "../data/dto/user";
import UerItem from "../components/main/userItem";
import Head from "next/head";
import Chat from "./chat/[uid]";
import { useModalStore } from "../store/modal";

function Main() {
  const router = useRouter();
  const [userList, setUserList] = useState<ReactElement[]>([]);

  useEffect(() => {
    ipcRenderer.send("data/user/list");
    ipcRenderer.on("data/user/list", (event, res: UserData[]) => {
      setUserList(
        res.map((value, index) => (
          <UerItem
            key={index}
            name={{
              firstName: value.name.firstName,
              lastName: value.name.lastName,
            }}
            uid={value.uid}
          />
        ))
      );
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>chat</title>
      </Head>
      <motion.div className="flex flex-col h-screen">
        <div className="grid grid-flow-col grid-cols-3 border-b p-3">
          {/* <img src="" className="w-10 h-10 rounded-full" /> */}
          <div className="flex gap-2">
            <div
              className="w-10 h-10 rounded-full bg-sky-200"
              onClick={() => {
                useModalStore.setState({ isVisible: true });
              }}
            ></div>
            <span className="self-center text-sm font-semibold">
              jongwon park
            </span>
          </div>
          <img
            src="/images/logo.png"
            className="w-10 h-10 justify-self-center"
          />
          <div className="justify-self-end self-center font-bold text-sm">
            Logout
          </div>
        </div>
        <div className="flex flex-col h-screen">{userList}</div>
        {/* <div className="rounded-lg bg-slate-200 p-2">Hello, </div>
        <div className="flex w-full h-full gap-2">
          <div className="flex flex-col bg-slate-200 rounded-lg p-2">
            <span className="font-bold text-lg">
              User List <span className="text-xs">({userList.length})</span>
            </span>
            <div className="flex flex-col gap-1 mt-1 items-center">
              {userList}
            </div>
          </div>
          <div className="bg-slate-50 w-full h-full p-2 rounded-lg">
            <input></input>
          </div>
        </div>
        <button onClick={router.back}>aa</button> */}
      </motion.div>
    </React.Fragment>
  );
}

export default Main;
