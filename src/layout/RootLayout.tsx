// Router
import { ScrollRestoration } from "react-router-dom";
// Layout
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

export function RootLayout() {
  return (
    <>
      <Header />

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Main>
        <ScrollRestoration />
      </Main>

      <Footer />
    </>
  );
}
