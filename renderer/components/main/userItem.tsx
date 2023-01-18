import React from "react";
import { motion } from "framer-motion";
import { Name } from "../../data/dto/user";
import { useRouter } from "next/router";

interface UserItemProps {
  name: Name;
  uid: string;
}

function UerItem(props: UserItemProps) {
  const router = useRouter();

  return (
    <motion.div
      className="flex p-2 items-center h-10 bg-gray-200 truncate text-sm font-semibold px-3 py-6"
      initial={{ backgroundColor: "rgb(255,255,255)" }}
      whileHover={{
        backgroundColor: "rgb(229 231 235)",
        transition: { duration: 0.05 },
      }}
      onClick={() => {
        router.push(`/chat/${props.name.firstName}`);
      }}
    >
      {props.name.firstName} {props.name.lastName}
    </motion.div>
  );
}

export default UerItem;
