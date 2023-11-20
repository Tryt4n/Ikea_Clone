// React
import { FormEvent, useEffect, useRef, useState } from "react";
// Custom Hooks
import { useLocalStorage } from "../../../../hooks/useStorage";
// Components
import Btn from "../../../../components/Btn/Btn";
import { InputText } from "../../../../components/InputText/InputText";
import { InputCheckbox } from "../../../../components/InputCheckbox/InputCheckbox";

export default function ChooseShop() {
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const postalCodeRef = useRef<HTMLInputElement | null>(null);
  const postalCodeCheckboxRef = useRef<HTMLInputElement | null>(null);

  const [postalCode, setPostalCode] = useLocalStorage("postalCode", postalCodeValue);
  const [checkboxStatus, setCheckboxStatus] = useLocalStorage("rememberPostalCode", true);

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

  function changeCheckboxStatus() {
    setCheckboxStatus(!checkboxStatus);
  }

  return (
    <div className="postal-code-modal">
      <p>
        Znajdź swój preferowany sklep, aby uzyskać informacje o jego godzinach otwarcia, dostępności
        asortymentu i aktualnych ofertach.
      </p>

      <form
        className="postal-code-modal__form"
        onSubmit={handleFormSubmit}
      >
        <InputText
          ref={postalCodeRef}
          id="postal-code"
          label="Wprowadź kod pocztowy"
          autoComplete="off"
          exampleMessage="np. 12-345"
          errorMessage={errorMessage}
          isError={isErrorMessageVisible}
          value={postalCodeValue}
          onChangeFunction={setPostalCodeValue}
        />

        <InputCheckbox
          ref={postalCodeCheckboxRef}
          id="postal-code-checkbox"
          checked={checkboxStatus}
          onChangeFunction={changeCheckboxStatus}
        />

        <button
          type="button"
          className="postal-code-modal__current-location-btn"
        >
          Użyj obecnej lokalizacji
        </button>
      </form>

      <div className="postal-code-modal__btn-wrapper">
        <Btn onClick={handleFormSubmit}>Znajdź preferowany sklep</Btn>
        <Btn variant="white-with-border">Zobacz pełną listę sklepów</Btn>
      </div>
    </div>
  );
}
