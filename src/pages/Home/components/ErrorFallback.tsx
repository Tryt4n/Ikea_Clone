/**
 * ErrorFallback is a functional component that renders an error message and a reload button.
 *
 * The component renders a div element containing an error message and a button.
 *
 * The error message is displayed in a h2 element.
 *
 * The button is used to reload the page. When clicked, it calls the window.location.reload function,
 * which reloads the current document.
 *
 * @returns {JSX.Element} A div element with an error message and a reload button.
 */

export function ErrorFallback() {
  return (
    <div className="message-container">
      <h2 className="message message--error">
        <strong>Nie można załadować strony!</strong> Spróbuj ponownie.
      </h2>

      {/* Button to reload the page */}
      <button onClick={() => window.location.reload()}>
        Naciśnij aby załadować stronę jeszcze raz
      </button>
    </div>
  );
}
