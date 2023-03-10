import React from "react";
import { motion } from "framer-motion";
import { Name } from "../../libs/dto/user";
import { useRouter } from "next/router";
import { useMessageStore } from "../../store/message";

interface UserItemProps {
  name: Name;
  uid: string;
  docId: string;
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
        useMessageStore.setState({ messageDocId: props.docId });
        router.push(`/messages/${props.name.firstName} ${props.name.lastName}`);
      }}
    >
      {props.name.firstName} {props.name.lastName}
    </motion.div>
  );
}

export default UerItem;
