// Router
import { ScrollRestoration } from "react-router-dom";
// Context
import { SideMenuProvider } from "../context/SideMenuContext";
// Layout
import Header from "./Header/Header";
import AsideMenu from "./AsideMenu/AsideMenu";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

export function RootLayout() {
  return (
    <SideMenuProvider>
      <Header />
      <AsideMenu />

      <Main />

      <ScrollRestoration />

      <Footer />
    </SideMenuProvider>
  );
}
