import React from "react";
import s from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className={s.errorText}>{message}</p>;
};

export default ErrorMessage;
