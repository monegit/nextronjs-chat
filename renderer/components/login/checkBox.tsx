import React, { useRef } from "react";
import { motion } from "framer-motion";

function CheckBox() {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div
      className="flex gap-2"
      onClick={(e) => {
        // e.preventDefault();
        inputRef.current.checked = !inputRef.current.checked;
      }}
    >
      <motion.input type={"checkbox"} ref={inputRef} />
      <span>Auto Login</span>
    </div>
  );
}

export default CheckBox;
