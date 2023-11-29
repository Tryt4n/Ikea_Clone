// React
import { FormEvent, useRef } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Components
import { PostalCodeInput } from "../../components/PostalCodeInput/PostalCodeInput";
import { PostalCodeRememberCheckbox } from "../../components/PostalCodeRememberCheckbox/PostalCodeRememberCheckbox";
import Btn from "../../../../components/Btn/Btn";
import LocationBtn from "../../components/LocationBtn/LocationBtn";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Types
import {
  ModalChooseShopType,
  ModalPostalCodeType,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import OpenNewWindowIcon from "../../../../Icons/OpenNewWindowIcon";
// Style
import "./index.scss";

type PostalCodePropsType = {
  modalType: ModalPostalCodeType["type"] | ModalChooseShopType["type"];
};

export default function PostalCode({ modalType }: PostalCodePropsType) {
  const { dispatch } = useApp();

  const postalCodeRef = useRef<HTMLInputElement>(null);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const zipCodeValue = postalCodeRef.current?.value || "";
    const zipCodeRegex = /^\d{2}-\d{3}$/;

    if (!zipCodeValue) {
      dispatchErrorMessage("Wprowadź kod pocztowy");
    } else if (!zipCodeRegex.test(zipCodeValue)) {
      dispatchErrorMessage("Wprowadzony kod pocztowy jest nieprawidłowy. Spróbuj ponownie.");
    } else {
      dispatchErrorMessage("");
      dispatch({
        type: "setPostalCode",
        payload: zipCodeValue,
      });
    }
  }

  function dispatchErrorMessage(message: string) {
    dispatch({
      type: "showErrorMessage",
      payload: message,
    });
  }

  function deletePostalCode() {
    dispatch({ type: "deletePostalCode" });
  }

  return (
    <div className="postal-code-modal">
      <p>
        {modalType === "postal-code"
          ? "Uzyskaj aktualne informacje o dostawie produktów i dostępności produktów w twojej okolicy."
          : "Znajdź swój preferowany sklep, aby uzyskać informacje o jego godzinach otwarcia, dostępności asortymentu i aktualnych ofertach."}
      </p>

      <Form
        type={modalType}
        postalCodeRef={postalCodeRef}
        saveFunction={handleFormSubmit}
      />

      <SubDescription type={modalType} />

      <Btns
        type={modalType}
        saveFunction={handleFormSubmit}
        deleteFunction={deletePostalCode}
      />
    </div>
  );
}

type FormProps = {
  type: PostalCodePropsType["modalType"];
  postalCodeRef: React.RefObject<HTMLInputElement>;
  saveFunction: (e: FormEvent) => void;
};

function Form({ type, postalCodeRef, saveFunction }: FormProps) {
  const postalCodeCheckboxRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="postal-code-modal__form"
      onSubmit={saveFunction}
    >
      <PostalCodeInput ref={postalCodeRef} />

      {type === "choose-shop" && (
        <>
          <PostalCodeRememberCheckbox ref={postalCodeCheckboxRef} />

          <LocationBtn className="postal-code-modal__location-btn" />
        </>
      )}
    </form>
  );
}

function SubDescription({ type }: { type: PostalCodePropsType["modalType"] }) {
  return (
    <>
      {type === "postal-code" && (
        <p className="postal-code-modal__subdescription tx-gray">
          Do świadczenia tej usługi wykorzystujemy pliki cookie. Więcej informacji o tym, jak
          używamy plików cookie, możesz znaleźć w{" "}
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
      )}
    </>
  );
}

type BtnsProps = {
  type: PostalCodePropsType["modalType"];
  saveFunction: (e: FormEvent) => void;
  deleteFunction: () => void;
};

function Btns({ type, saveFunction, deleteFunction }: BtnsProps) {
  const { state } = useApp();
  const { setModalData } = useModal();

  function showShopsList() {
    startViewTransition(() => {
      setModalData({
        type: "preffered-shop",
      });
    });
  }

  return (
    <div className="postal-code-modal__btn-wrapper">
      <Btn onClick={saveFunction}>
        {type === "postal-code" ? "Zapisz" : "Znajdź preferowany sklep"}
      </Btn>
      {(type === "choose-shop" || (type === "postal-code" && state.postalCode)) && (
        <Btn
          variant="white-with-border"
          onClick={type === "postal-code" ? deleteFunction : showShopsList}
        >
          {type === "postal-code"
            ? "Nie wykorzystuj kodu pocztowego"
            : "Zobacz pełną listę sklepów"}
        </Btn>
      )}
    </div>
  );
}
