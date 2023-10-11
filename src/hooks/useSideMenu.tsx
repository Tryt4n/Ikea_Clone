import { useContext } from "react";
import { SideMenuContext } from "../context/sideMenuContext";

export function useSideMenu() {
  const sideMenu = useContext(SideMenuContext);

  if (sideMenu == null) {
    throw new Error("useSideMenu must be used within SideMenuProvider");
  }

  return sideMenu;
}
