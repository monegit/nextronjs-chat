import React from "react";
import { useUserStore } from "../store/user";

function Main() {
  const { name, birth, uid } = useUserStore();
  return (
    <div>
      <div>{`${name.firstName} ${name.lastName}`}</div>
      <div>{`${birth.year} ${birth.month} ${birth.day}`}</div>
      <div>{`${uid}`}</div>
    </div>
  );
}

export default Main;
