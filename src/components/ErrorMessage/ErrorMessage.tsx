import { HTMLProps } from "react";
import "./index.scss";

type ErrorMessagePropsType = {
  errorVisibility: boolean;
  id: string;
  errorMessage: string;
} & HTMLProps<HTMLParagraphElement>;

export default function ErrorMessage({
  errorVisibility,
  id,
  errorMessage,
  ...props
}: ErrorMessagePropsType) {
  return (
    <small
      id={id}
      className="error-message"
      aria-hidden={errorVisibility}
      {...props}
    >
      {errorMessage}
    </small>
  );
}
