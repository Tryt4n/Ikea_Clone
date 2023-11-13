import "./index.scss";

export default function GuaranteeInformation({ guarantee }: { guarantee: number }) {
  return (
    <div className="guarantee-information">
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
