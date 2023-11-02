// Router
import { ScrollRestoration } from "react-router-dom";
// Context
import { SideMenuProvider } from "../context/SideMenuContext";
// Layout
import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

export function RootLayout() {
  return (
    <SideMenuProvider>
      <Header />
      <SideMenu />

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Main>
        <ScrollRestoration />
      </Main>

      <Footer />
    </SideMenuProvider>
  );
}
