// React
import { FormEvent, useRef } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
// Components
import Btn from "../../../../components/Btn/Btn";
import { PostalCodeInput } from "../../../../components/PostalCodeInput/PostalCodeInput";
import { PostalCodeRememberCheckbox } from "../../../../components/PostalCodeRememberCheckbox/PostalCodeRememberCheckbox";

export default function ChooseShop() {
  const { dispatch } = useApp();

  const postalCodeRef = useRef<HTMLInputElement | null>(null);
  const postalCodeCheckboxRef = useRef<HTMLInputElement | null>(null);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const zipCodeValue = postalCodeRef.current?.value || "";
    const zipCodeRegex = /^\d{2}-\d{3}$/;

    if (!zipCodeValue) {
      dispatch({
        type: "showErrorMessage",
        payload: "Wprowadź kod pocztowy",
      });
    } else if (!zipCodeRegex.test(zipCodeValue)) {
      dispatch({
        type: "showErrorMessage",
        payload: "Wprowadzony kod pocztowy jest nieprawidłowy. Spróbuj ponownie.",
      });
    } else {
      dispatch({
        type: "showErrorMessage",
        payload: "",
      });
      dispatch({
        type: "setPostalCode",
        payload: zipCodeValue,
      });
    }
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
        <PostalCodeInput ref={postalCodeRef} />

        <PostalCodeRememberCheckbox ref={postalCodeCheckboxRef} />

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
