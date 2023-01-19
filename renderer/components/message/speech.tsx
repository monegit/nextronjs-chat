import React from "react";
import { motion } from "framer-motion";
import { Timestamp } from "firebase/firestore";
import { Name } from "../../libs/dto/user";

interface SpeechProps {
  isMe: boolean;
  speech: string;
  name?: Name;
  createdAt: Timestamp;
}

function Speech(props: SpeechProps) {
  return (
    <div
      className={`flex flex-col ${
        props.isMe ? "self-end" : "self-start"
      } gap-2`}
    >
      <span className={`${props.isMe ? "hidden" : "visible"}`}>
        {props.name.firstName} {props.name.lastName}
      </span>
      <div className={`flex ${props.isMe ? "" : "flex-row-reverse"} gap-1`}>
        <span className="text-xs text-slate-400 self-center">
          {props.createdAt.toDate().toUTCString()}
        </span>
        <motion.div
          className={`flex bg-gray-200 p-2 rounded-xl px-3 w-fit text-sm`}
        >
          {props.speech}
        </motion.div>
      </div>
    </div>
  );
}

export default Speech;
