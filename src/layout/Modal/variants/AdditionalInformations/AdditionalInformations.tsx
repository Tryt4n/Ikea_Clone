// Import custom hooks
import useModal from "../../../../hooks/useModal/useModal";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import types
import type { ShoppingCartAsideMenuInformationList } from "../../types/ModalTypes";
// Import styles
import "./index.scss";

/**
 * AdditionalInformations is a React component that renders additional information about a refund or a security certificate.
 * The information includes a text, a link, and a close button.
 * The component uses the useModal custom hook.
 *
 * @param {"refund" | "data-encryption"} props.type - The type of the information.
 *
 * @example
 * <AdditionalInformations type="refund" />
 */

export default function AdditionalInformations({
  type,
}: ShoppingCartAsideMenuInformationList) {
  const { closeModal } = useModal();

  return (
    <div className="additional-informations-modal">
      {type === "refund" ? (
        <>
          <p>
            Jeśli nie jesteś w pełni zadowolony z zakupów w IKEA, możesz zwrócić
            nowe i nierozpakowane produkty w ciągu 365 dni od ich dostawy lub
            wydania. Wystarczy, że okażesz dowód zakupu, a otrzymasz zwrot
            pieniędzy.
          </p>
          <p>
            <strong>
              Nie przyjmujemy zwrotów kart upominkowych i refundacyjnych IKEA,
              rozpakowanych materacy, towarów zakupionych w Dziale Okazje na
              Okrągło oznaczone jako Oddaj i zyskaj, a także artykułów
              zakupionych w ramach umowy leasingowej.
            </strong>
            &nbsp;Nie możemy zaoferować zwrotu pieniędzy ani wymienić towaru,
            jeśli okaże się, że został on przerobiony w stosunku do stanu, w
            jakim był w momencie zakupu, jest brudny, poplamiony lub uszkodzony.
          </p>
        </>
      ) : (
        <p>
          Strona www.ikea.com została uznana za gwarantująca bezpieczne
          wysyłanie i odbieranie poufnych danych, co potwierdza certyfikat SSL
          OV wydany przez DigiCert.
        </p>
      )}

      <a href="#" className="additional-informations-modal__link">
        {type === "refund"
          ? "Aby uzyskać więcej informacji, zapoznaj się z polityką i regulaminem zwrotu towarów IKEA."
          : "Więcej informacji możesz znaleźć w sekcji najczęściej zadawanych pytań."}
      </a>

      <Btn
        className="additional-informations-modal__btn"
        onClick={closeModal} // The function to call when the close button is clicked.
        data-testid="additional-informations-modal-close-btn"
      >
        Zamknij
      </Btn>
    </div>
  );
}
