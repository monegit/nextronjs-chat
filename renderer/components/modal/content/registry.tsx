import { ipcRenderer } from "electron";
import React, { useRef, useState } from "react";
import { useAlertStore } from "../../../store/alert";
import { useModalStore } from "../../../store/modal";
import UserInput, {
  emailRegex,
  passwordRegex,
  SizeType,
} from "../../input/userInput";
import Button from "../../login/button";
import { motion, useAnimation } from "framer-motion";
import { onHide, onVisible } from "../../animations/body";
import { useRegistyStore } from "../../../store/registry";
import { useUserStore } from "../../../store/user";
import { useRouter } from "next/router";

function Registry() {
  return <AccountPanel />;
}

const AccountPanel = () => {
  const router = useRouter();
  const { email, password } = useRegistyStore();
  const [passwordCheck, setPasswordCheck] = useState("");
  const bodyAnimation = useAnimation();

  return (
    <motion.div
      animate={bodyAnimation}
      className="gap-5"
      initial={{ display: "grid" }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex relative left-3 items-center">
          <TitleText content="Email" />
        </div>
        <UserInput
          email
          sizeType={SizeType.Fixed}
          onKeyUp={(e) => {
            useRegistyStore.setState({ email: e.currentTarget.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex relative left-3 items-center">
          <TitleText content="Password" />
          {password !== "" && password.length < 6 ? (
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
            sizeType={SizeType.Fixed}
            onKeyUp={(e) => {
              useRegistyStore.setState({ password: e.currentTarget.value });
            }}
          />
          <UserInput
            password
            sizeType={SizeType.Fixed}
            placeholder="password check"
            onKeyUp={(e) => {
              setPasswordCheck(e.currentTarget.value);
            }}
          />
        </div>
        <Descript content="Password and password check must be the same" />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          content={"Next"}
          onClick={() => {
            if (
              emailRegex.test(email) &&
              passwordRegex.test(password) &&
              password === passwordCheck
            ) {
              onHide(bodyAnimation).then(() => {
                useModalStore.setState({ content: <DetailPanel /> });
              });
            } else {
              useAlertStore.setState({
                isVisible: true,
                content: "Please enter your email or password correctly",
              });
            }
          }}
        />
        <Button
          content={"Cancel"}
          backgroundColor="bg-rose-500"
          onClick={() => {
            useModalStore.setState({ isVisible: false });
          }}
        />
      </div>
    </motion.div>
  );
};

const DetailPanel = () => {
  const bodyAnimation = useAnimation();
  const router = useRouter();
  const { email, password, birth, name } = useRegistyStore();

  return (
    <motion.div
      animate={bodyAnimation}
      className="gap-5"
      initial={{ display: "grid" }}
      onLoad={() => {
        onVisible(bodyAnimation);
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex relative left-3 items-center">
          <TitleText content="Name" />
        </div>
        <UserInput
          placeholder="First Name"
          sizeType={SizeType.Fixed}
          onKeyUp={(e) => {
            useRegistyStore.setState({
              name: {
                firstName: e.currentTarget.value,
                lastName: name.lastName,
              },
            });
          }}
        />
        <UserInput
          placeholder="Last Name"
          sizeType={SizeType.Fixed}
          onKeyUp={(e) => {
            useRegistyStore.setState({
              name: {
                firstName: name.firstName,
                lastName: e.currentTarget.value,
              },
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex relative left-3 items-center">
          <TitleText content="Birth" />
        </div>
        <div className="grid grid-flow-col grid-cols-3 justify-items-center gap-2">
          <div className="w-[100px]">
            <UserInput
              isTextAlignCenter
              placeholder="YYYY"
              sizeType={SizeType.Auto}
              onKeyUp={(e) => {
                useRegistyStore.setState({
                  birth: {
                    year: Number(e.currentTarget.value),
                    month: birth.month,
                    day: birth.day,
                  },
                });
              }}
            />
          </div>
          <div className="w-[100px]">
            <UserInput
              isTextAlignCenter
              placeholder="MM"
              sizeType={SizeType.Auto}
              onKeyUp={(e) => {
                useRegistyStore.setState({
                  birth: {
                    year: birth.year,
                    month: Number(e.currentTarget.value),
                    day: birth.day,
                  },
                });
              }}
            />
          </div>
          <div className="w-[100px]">
            <UserInput
              isTextAlignCenter
              placeholder="DD"
              sizeType={SizeType.Auto}
              onKeyUp={(e) => {
                useRegistyStore.setState({
                  birth: {
                    year: birth.year,
                    month: birth.month,
                    day: Number(e.currentTarget.value),
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
      <Button
        content={"Sign up"}
        onClick={() => {
          ipcRenderer.send("data/user/registry", {
            email: email,
            password: password,
            birth: birth,
            name: name,
          });
          ipcRenderer.on("data/user/registry", (event, res) => {
            switch (res) {
              case "auth/email-already-in-use":
                useAlertStore.setState({
                  isVisible: true,
                  content: "This email is already in use.",
                });
                break;
              case "ok":
                useUserStore.setState({
                  name: { firstName: name.firstName, lastName: name.lastName },
                  birth: {
                    year: birth.year,
                    month: birth.month,
                    day: birth.day,
                  },
                });
                useModalStore.setState({ isVisible: false });
                router.push("/main");
                break;
            }
            console.log(res);
          });
        }}
      />
    </motion.div>
  );
};

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
