// Import layout components
import Header from "./Header/Header";
import Main from "./Main/Main";
import BackToTopBtn from "../components/features/BackToTopBtn/BackToTopBtn";
import Footer from "./Footer/Footer";

/**
 * RootLayout
 *
 * Component that serves as the root layout for the application. It renders the main layout components: Header, Main, BackToTopBtn, and Footer.
 *
 * The component uses the `Fragment` shorthand (`<>` and `</>`) to group the layout components without adding an extra node to the DOM.
 *
 * @returns {JSX.Element} The RootLayout component.
 */

export function RootLayout() {
  return (
    <>
      <Header />

      <Main />

      <BackToTopBtn />

      <Footer />
    </>
  );
}
