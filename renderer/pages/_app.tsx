import React from "react";
import Alert from "../components/alert/alert";
import Modal from "../components/modal/modal";
import { useAlertStore } from "../store/alert";
import { useModalStore } from "../store/modal";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  const { content } = useModalStore();

  return (
    <>
      <Alert content={useAlertStore().content} />
      <Modal content={useModalStore().content} />
      <Component {...pageProps} />
    </>
  );
}
