// Import React dependencies
import { useEffect, useState } from "react";
// Import react-intersection-observer for detecting when an element is in view
import { useInView } from "react-intersection-observer";
// Import custom hooks
import useWindowSize from "../../../hooks/useWindowSize";
// Import icons
import ChevronRightIcon from "../../../Icons/ChevronRightIcon";
// Import styles
import "./index.scss";

/**
 * BackToTopBtn component
 *
 * This component displays a "Back to Top" button that scrolls the page to the top when clicked.
 *
 * @returns A div element containing another div with a "back-to-top-btn" class, which contains a button that scrolls the page to the top when clicked.
 */

export default function BackToTopBtn() {
  const { width } = useWindowSize(); // Get the window width

  const [isExpanded, setIsExpanded] = useState(false); // State for whether the button is expanded
  const [footerInView, setFooterInView] = useState(false); // State for whether the footer is in view
  const [isVisible, setIsVisible] = useState(false); // State for whether the button is visible

  // Use the useInView hook to detect when the footer is in view
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "-40px", // 40px is the height of the element
  });

  useEffect(() => {
    const footer = document.querySelector(".footer"); // Get the footer element
    if (footer) {
      ref(footer); // If the footer exists, pass it to the ref function
    }

    setFooterInView(inView); // Set whether the footer is in view

    // Define a function to check the scroll position and set whether the button is visible
    const checkScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", checkScroll); // Add the checkScroll function as a scroll event listener

    // Remove the checkScroll function as a scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [ref, inView]);

  /**
   * scrollToTop function
   *
   * This function scrolls the page to the top.
   */
  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth", // If the user prefers reduced motion, scroll to the top without animation
    });
  }

  // Define the classes for the button
  const btnClasses = `${
    width < 600 ? "btn--light" : `${footerInView ? "btn--dark" : "btn--gray"}`
  } back-to-top-btn__btn${isVisible ? "" : " back-to-top-btn__btn--hidden"}`;

  return (
    <div className={width >= 600 ? "page-container" : ""}>
      <div className="back-to-top-btn">
        <button
          ref={ref}
          className={btnClasses}
          onMouseEnter={width >= 600 ? () => setIsExpanded(true) : undefined} // Handle expanding functionality only on larger screens
          onMouseLeave={width >= 600 ? () => setIsExpanded(false) : undefined} // Handle expanding functionality only on larger screens
          onClick={scrollToTop}
          aria-hidden={width >= 600 ? !isVisible : undefined} // Handle expanding functionality only on larger screens
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
