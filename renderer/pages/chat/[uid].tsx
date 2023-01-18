import { useRouter } from "next/router";
import React from "react";

function Chat() {
  const router = useRouter();
  return (
    <div>
      {router.query.uid}
      <div
        onClick={() => {
          router.back();
        }}
      >
        asdf
      </div>
    </div>
  );
}

export default Chat;
