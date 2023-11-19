// React
import { useRef, useState } from "react";
// Components
import Btn from "../../../../components/Btn/Btn";
import { InputText } from "../../../../components/InputText/InputText";
// Icons
import OpenNewWindowIcon from "../../../../Icons/OpenNewWindowIcon";

export default function ZipCode() {
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(true);
  const zipCodeInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="zip-code-modal">
      <p>
        Uzyskaj aktualne informacje o dostawie produktów i dostępności produktów w twojej okolicy.
      </p>

      <form
        className="zip-code-modal__form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputText
          ref={zipCodeInputRef}
          id="zip-code"
          label="Wprowadź kod pocztowy"
          exampleMessage="np. 12-345"
          errorMessage="Wprowadź kod pocztowy Wprowadzony kod pocztowy jest nieprawidłowy. Spróbuj ponownie."
          isError={isErrorMessageVisible}
        />
      </form>

      <p className="tx-gray">
        Do świadczenia tej usługi wykorzystujemy pliki cookie. Więcej informacji o tym, jak używamy
        plików cookie, możesz znaleźć w{" "}
        <a
          className="zip-code-modal__link"
          href="#"
          target="_blank"
        >
          nasza polityka
          <OpenNewWindowIcon />
        </a>
        . Pamiętaj, że twoja lokalizacja nie będzie udostępniana.
      </p>

      <div className="zip-code-modal__btn-wrapper">
        <Btn>Zapisz</Btn>
      </div>
    </div>
  );
}
