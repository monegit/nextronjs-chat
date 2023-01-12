import React, { useRef, useState } from "react";
import { useModalStore } from "../../../store/modal";
import UserInput from "../../input/userInput";
import Button from "../../login/button";

function Registry() {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-1">
        <div className="flex relative left-3 items-center">
          <TitleText content="Email" />
        </div>
        <UserInput email />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex relative left-3 items-center">
          <TitleText content="Password" />
          {password !== "" && password.length <= 10 ? (
            <Descript content="password too short" fontColor="text-rose-500" />
          ) : password !== passwordCheck ? (
            <Descript content="password different" fontColor="text-rose-500" />
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <UserInput
            password
            onKeyUp={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <UserInput
            password
            placeholder="password check"
            onKeyUp={(e) => {
              setPasswordCheck(e.currentTarget.value);
            }}
          />
        </div>
        <Descript content="Password and password check must be the same" />
      </div>
      <div className="flex flex-col gap-2">
        <Button content={"Sign up"} />
        <Button
          content={"Cancel"}
          backgroundColor="bg-rose-500"
          onClick={() => {
            useModalStore.setState({ isVisible: false });
          }}
        />
      </div>
    </div>
  );
}

const TitleText = (props: { content: string }) => {
  return <span className="text-lg font-bold">{props.content}</span>;
};

const Descript = (props: { content: string; fontColor?: string }) => {
  return (
    <span
      className={`relative text-xs ${
        props.fontColor ?? "text-slate-400"
      } left-2`}
    >
      {props.content}
    </span>
  );
};

export default Registry;
