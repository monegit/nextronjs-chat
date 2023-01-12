import React from "react";
import { motion } from "framer-motion";
import UserInput from "../components/input/userInput";
import Button from "../components/login/button";
import CheckBox from "../components/login/checkBox";

function login() {
  return (
    <React.Fragment>
      <motion.div className="grid h-screen gap-2 place-content-center">
        <UserInput placeholder="abcde@homepage.com" email />
        <UserInput placeholder="password" password />
        <div className="grid grid-flow-col gap-2 text-sm items-center">
          {/* <div className="grid justify-items-center">
            <CheckBox />
          </div> */}
          <Button
            content="Sign up"
            backgroundColor="bg-sky-500"
            onClick={() => {}}
          />
          <Button content="Login" />
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default login;
