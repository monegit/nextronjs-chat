import React, { ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ipcRenderer } from "electron";
import { UserData } from "../libs/dto/user";
import UerItem from "../components/main/userItem";
import Head from "next/head";
import { useModalStore } from "../store/modal";
import { useUserStore } from "../store/user";

function Main() {
  const router = useRouter();
  const [userList, setUserList] = useState<ReactElement[]>([]);
  const { uid, name } = useUserStore();

  useEffect(() => {
    ipcRenderer.send("data/user/list", { uid: uid });
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
            docId={value.docId}
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
              {name.firstName} {name.lastName}
            </span>
          </div>
          <img
            src="/images/logo.png"
            className="w-10 h-10 justify-self-center"
          />
          <button
            className="justify-self-end self-center font-bold text-sm"
            onClick={() => {
              router.back();
            }}
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col h-screen">
          <UerItem
            key={-1}
            name={{
              firstName: "channel chat",
              lastName: "",
            }}
            uid={""}
            docId={""}
          />
          {userList}
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default Main;
