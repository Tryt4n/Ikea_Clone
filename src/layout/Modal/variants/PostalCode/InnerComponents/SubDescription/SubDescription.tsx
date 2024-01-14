// Import icons
import OpenNewWindowIcon from "../../../../../../Icons/OpenNewWindowIcon";
// Import types
import type { PostalCodePropsType } from "../../PostalCode";

/**
 * `SubDescription` is a React component that displays a sub-description text based on the `type` prop only if the type is "postal-code".
 * It uses the `OpenNewWindowIcon` component to display an icon next to a link.
 * The component receives one prop: `type` (the type of the modal).
 *
 * @param {PostalCodePropsType["modalType"]} props.type - The type of the modal.
 * @returns {JSX.Element} The rendered `SubDescription` component.
 */

export function SubDescription({
  type,
}: {
  type: PostalCodePropsType["modalType"];
}) {
  return (
    <>
      {
        // Render the sub-description text only if the type is "postal-code"
        type === "postal-code" && (
          <p className="postal-code-modal__subdescription tx-gray">
            Do świadczenia tej usługi wykorzystujemy pliki cookie. Więcej
            informacji o tym, jak używamy plików cookie, możesz znaleźć w{" "}
            <a
              className="postal-code-modal__link"
              href="#"
              target="_blank" // Open the link in a new tab
            >
              nasza polityka
              <OpenNewWindowIcon />
            </a>
            . Pamiętaj, że twoja lokalizacja nie będzie udostępniana.
          </p>
        )
      }
    </>
  );
}
