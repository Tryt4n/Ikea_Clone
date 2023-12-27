// React
import { useEffect, useState } from "react";
// react-intersection-observer
import { useInView } from "react-intersection-observer";
// Custom Hooks
import useWindowSize from "../../../hooks/useWindowSize";
// Icons
import ChevronRightIcon from "../../../Icons/ChevronRightIcon";
// Styles
import "./index.scss";

export default function BackToTopBtn() {
  const { width } = useWindowSize();

  const [isExpanded, setIsExpanded] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "-40px", //? 40px is the height of the element
  });

  useEffect(() => {
    const footer = document.querySelector(".footer");
    if (footer) {
      ref(footer);
    }

    setFooterInView(inView);

    const checkScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [ref, inView]);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      // behavior: "smooth",
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  }

  const btnClasses = `${
    width < 600 ? "btn--light" : `${footerInView ? "btn--dark" : "btn--gray"}`
  } back-to-top-btn__btn${isVisible ? "" : " back-to-top-btn__btn--hidden"}`;

  return (
    <div className={width >= 600 ? "page-container" : ""}>
      <div className="back-to-top-btn">
        <button
          ref={ref}
          className={btnClasses}
          onMouseEnter={width >= 600 ? () => setIsExpanded(true) : undefined}
          onMouseLeave={width >= 600 ? () => setIsExpanded(false) : undefined}
          onClick={scrollToTop}
          aria-hidden={!isVisible}
        >
          <ChevronRightIcon />

          <div
            className={`back-to-top-btn__text-wrapper${
              isExpanded ? "" : " back-to-top-btn__text-wrapper--hidden"
            }`}
          >
            <small className="back-to-top-btn__text">Powrót do góry</small>
          </div>
        </button>
      </div>
    </div>
  );
}
