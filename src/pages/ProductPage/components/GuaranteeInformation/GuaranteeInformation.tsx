// Import styles
import "./index.scss";

/**
 * GuaranteeInformation Component
 *
 * This is a React functional component. It displays the guarantee period for a product with badge hidden for screen readers.
 *
 * @param {number} guarantee - The guarantee period to be displayed in the component.
 *
 * @example
 * <GuaranteeInformation guarantee={2} />
 *
 * @returns A JSX element that consists of a `div` with the class name `guarantee-information`. Inside this `div`, it renders two `span` elements. The first `span` displays the badge and the second `span` displays a text indicating the guarantee period.
 */

export default function GuaranteeInformation({
  guarantee,
}: {
  guarantee: number;
}) {
  return (
    <div className="guarantee-information">
      {/* Display visual badge, hidden for screen readers */}
      <span
        className="guarantee-information__badge"
        role="presentation"
        aria-hidden="true"
      >
        {guarantee}
      </span>

      <span>{guarantee}-letnia gwarancja</span>
    </div>
  );
}
