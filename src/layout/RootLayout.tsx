import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AsideMenu from "./AsideMenu/AsideMenu";
import { SideMenuProvider } from "../context/SideMenuContext";

export function RootLayout() {
  return (
    <SideMenuProvider>
      <Header />
      <AsideMenu />

      <main>
        <Outlet />
      </main>

      <ScrollRestoration />

      <Footer />
    </SideMenuProvider>
  );
}
