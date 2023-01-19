import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Speech from "../../components/message/speech";
import { MessageService } from "../../libs/api/messageService";
import { ChatData } from "../../libs/dto/chat";
import { useMessageStore } from "../../store/message";
import { useUserStore } from "../../store/user";

function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef("");
  const { uid, name } = useUserStore();

  useEffect(() => {
    (async () => {
      setMessages(await MessageService.getChannelMessages());
    })();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{router.query.name}'s chat</title>
      </Head>
      <div className="flex flex-col p-2 h-screen gap-2">
        <div
          onClick={() => {
            router.back();
          }}
        >
          <button className="bg-rose-500 text-white p-2 rounded-xl font-bold">
            back
          </button>
        </div>
        <div className="flex flex-col overflow-y-auto gap-2 flex-shrink">
          {messages.map((value) => {
            return (
              <Speech
                isMe={value.uid === uid}
                speech={value.text}
                createdAt={value.createdAt}
                name={value.name}
              />
            );
          })}
        </div>
        <div className="flex gap-1">
          <input
            className="w-full outline-none bg-slate-100 rounded-lg p-2 text-lg"
            ref={inputRef}
            onChange={(e) => {
              messageRef.current = e.target.value;
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                const { message } = await MessageService.sendChannelMessage(
                  uid,
                  messageRef.current,
                  name
                );
                setMessages([...messages]);
                inputRef.current.value = "";
              }
            }}
          />
          <button
            className="p-2 justify-center bg-yellow-300 rounded-xl px-4"
            onClick={async () => {
              const { message } = await MessageService.sendChannelMessage(
                uid,
                messageRef.current,
                name
              );
              setMessages([...messages]);
              inputRef.current.value = "";
            }}
          >
            send
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Chat;
