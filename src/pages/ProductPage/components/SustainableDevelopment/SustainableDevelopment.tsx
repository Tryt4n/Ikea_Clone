// Intersection Observer
import { useInView } from "react-intersection-observer";
// Style
import "./index.scss";

export default function SustainableDevelopment() {
  const [sustainabilityRef, inView] = useInView({
    triggerOnce: false,
  });

  return (
    <div
      ref={sustainabilityRef}
      className={`sustainability${inView ? ` sustainability--inView` : ""}`}
    >
      <div className="sustainability__circle sustainability__circle--1">
        <strong className="sustainability__header">
          <small>Zrównoważony rozwój</small>
          Dla ludzi + planety
        </strong>
      </div>

      <div
        role="presentation"
        aria-hidden="true"
        className="sustainability__circle sustainability__circle--2"
      />
      <div
        role="presentation"
        aria-hidden="true"
        className="sustainability__circle sustainability__circle--3"
      />
      <div
        role="presentation"
        aria-hidden="true"
        className="sustainability__circle sustainability__circle--4"
      />
      <div
        role="presentation"
        aria-hidden="true"
        className="sustainability__circle sustainability__circle--5"
      />
    </div>
  );
}
