import React from "react";
import Modal from "../components/modal/modal";
import { useModalStore } from "../store/modal";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  const { content } = useModalStore();
  return (
    <>
      <Modal content={content} />
      <Component {...pageProps} />
    </>
  );
}
