// React
import { FormEvent, useEffect, useRef, useState } from "react";
// Custom Hooks
import { useLocalStorage } from "../../../../hooks/useStorage";
// Components
import Btn from "../../../../components/Btn/Btn";
import { InputText } from "../../../../components/InputText/InputText";
// Icons
import OpenNewWindowIcon from "../../../../Icons/OpenNewWindowIcon";

export default function PostalCode() {
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const postalCodeRef = useRef<HTMLInputElement | null>(null);

  const [postalCode, setPostalCode, removePostalCode] = useLocalStorage(
    "postalCode",
    postalCodeValue
  );

  useEffect(() => {
    if (postalCode) {
      setPostalCodeValue(postalCode);
    }
  }, []);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const zipCodeValue = postalCodeRef.current?.value || "";
    const zipCodeRegex = /^\d{2}-\d{3}$/;

    if (!zipCodeValue) {
      setErrorMessage("Wprowadź kod pocztowy");
      setIsErrorMessageVisible(true);
    } else if (!zipCodeRegex.test(zipCodeValue)) {
      setErrorMessage("Wprowadzony kod pocztowy jest nieprawidłowy. Spróbuj ponownie.");
      setIsErrorMessageVisible(true);
    } else {
      setErrorMessage("");
      setIsErrorMessageVisible(false);
      setPostalCode(postalCodeValue);
    }
  }

  function deletePostalCode() {
    setPostalCodeValue("");
    removePostalCode();
  }

  return (
    <div className="postal-code-modal">
      <p>
        Uzyskaj aktualne informacje o dostawie produktów i dostępności produktów w twojej okolicy.
      </p>

      <form
        className="postal-code-modal__form"
        onSubmit={handleFormSubmit}
      >
        <InputText
          ref={postalCodeRef}
          id="postal-code"
          label="Wprowadź kod pocztowy"
          exampleMessage="np. 12-345"
          autoComplete="off"
          errorMessage={errorMessage}
          isError={isErrorMessageVisible}
          value={postalCodeValue}
          onChangeFunction={setPostalCodeValue}
        />
      </form>

      <p className="tx-gray">
        Do świadczenia tej usługi wykorzystujemy pliki cookie. Więcej informacji o tym, jak używamy
        plików cookie, możesz znaleźć w{" "}
        <a
          className="postal-code-modal__link"
          href="#"
          target="_blank"
        >
          nasza polityka
          <OpenNewWindowIcon />
        </a>
        . Pamiętaj, że twoja lokalizacja nie będzie udostępniana.
      </p>

      <div className="postal-code-modal__btn-wrapper">
        <Btn onClick={handleFormSubmit}>Zapisz</Btn>
        {postalCode && (
          <Btn
            variant="white-with-border"
            onClick={deletePostalCode}
          >
            Nie wykorzystuj kodu pocztowego
          </Btn>
        )}
      </div>
    </div>
  );
}
