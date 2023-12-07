// React
import { FormEvent } from "react";
// Components
import Input from "../../../../components/Input/Input";
import Btn from "../../../../components/Btn/Btn";
// Styles
import "./index.scss";

export default function CreateList() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form
      className="create-list-modal"
      onSubmit={onSubmit}
    >
      <Input
        id="new-list-name"
        label="Wprowadź nazwę listy"
        type="text"
      />

      <Btn type="submit">Stwórz listę</Btn>
    </form>
  );
}
