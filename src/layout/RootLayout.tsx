// Layout
import Header from "./Header/Header";
import Main from "./Main/Main";
import BackToTopBtn from "../components/features/BackToTopBtn/BackToTopBtn";
import Footer from "./Footer/Footer";

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
