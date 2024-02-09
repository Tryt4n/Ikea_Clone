// Import styles
import "./index.scss";

/**
 * NotFoundPage is a functional component that renders a div with a "not-found" class.
 * Inside this div, it renders:
 * - A div with a "not-found__ufo-container" class, containing a video of a UFO.
 * - A div containing an h2 element with an error message, two p elements with additional information, and a link to the home page.
 *
 * @returns {JSX.Element} A div with a "not-found" class, containing a video of a UFO and an error message with additional information and a link to the home page.
 */

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__ufo-container">
        <video
          src="https://www.ikea.com/pl/pl/static/mp4s/ufo.2d5c35ab6c116cc323bb.mp4"
          autoPlay // The video starts playing automatically.
          muted // The video is muted.
          playsInline // The video is played inline in mobile instead of fullscreen.
        />
      </div>

      <div>
        <h2>Ups... Coś poszło nie tak!</h2>
        <p>Strona której szukasz niestety nie istnieje.</p>
        <p>Spróbuj po linkiem poniżej.</p>
        {/* Navigate to home page */}
        <a href="/" data-testid="not-found-page-link">
          Wróć do strony głównej IKEA
        </a>
      </div>
    </div>
  );
}
