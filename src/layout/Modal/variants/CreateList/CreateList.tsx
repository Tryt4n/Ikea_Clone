// React
import { ChangeEvent, MouseEvent, FormEvent, useEffect, useRef, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
// Components
import Input from "../../../../components/Input/Input";
import Btn from "../../../../components/Btn/Btn";
// Styles
import "./index.scss";

export default function CreateList() {
  const { dispatch } = useApp();

  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();

    dispatch({
      type: "createNewList",
      payload: {
        name: inputValue,
        createdAt: new Date(),
      },
    });
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function labelOnClickFunction(e: MouseEvent<HTMLLabelElement>) {
    e.preventDefault();

    if (inputRef.current) inputRef.current.focus();
  }

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <form
      className="create-list-modal"
      onSubmit={onSubmit}
    >
      <Input
        id="new-list-name"
        label="Wprowadź nazwę listy"
        type="text"
        labelProps={{
          onClick: labelOnClickFunction,
        }}
        inputProps={{
          ref: inputRef,
          className: "",
          autoComplete: "off",
          required: true,
          value: inputValue,
          onChange: onInputChange,
        }}
      />

      <Btn type="submit">Stwórz listę</Btn>
    </form>
  );
}
