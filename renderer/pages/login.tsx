import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import UserInput from "../components/input/userInput";
import Button from "../components/login/button";
import CheckBox from "../components/login/checkBox";

function login() {
  return (
    <motion.div className="grid h-screen gap-2 place-content-center">
      <UserInput placeholder="abcde@homepage.com" email />
      <UserInput placeholder="password" password />
      <div className="grid grid-flow-col gap-2 px-2 text-sm items-center">
        <CheckBox />
        <Button content="Sign up" backgroundColor="bg-sky-500" />
        <Button content="Login" />
      </div>
    </motion.div>
  );
}

export default login;
