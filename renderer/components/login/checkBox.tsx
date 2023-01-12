import React, { useRef } from "react";
import { motion, useCycle } from "framer-motion";

function CheckBox() {
  const inputRef = useRef<HTMLInputElement>();
  const [check, setCheck] = useCycle(false);

  return (
    <div className="flex gap-2 items-center" onClick={(e) => {}}>
      <motion.div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-emerald-600/50 font-bold"></motion.div>
      <div>Auto Login</div>
    </div>
  );
}

export default CheckBox;
