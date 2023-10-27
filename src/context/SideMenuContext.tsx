import { ReactElement, createContext, useLayoutEffect, useState } from "react";
import useEventListener from "../hooks/useEventListener";

type SideMenuContextType = {
  isMenuOpen: boolean;
  toggleOpenState: () => void;
  sideMenuId: string;
  isDesktop: boolean;
};

type SideMenuProviderPropsType = {
  children?: ReactElement | ReactElement[];
};

export const SideMenuContext = createContext<SideMenuContextType | null>(null);

export function SideMenuProvider({ children }: SideMenuProviderPropsType) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = !("ontouchstart" in window);
  const sideMenuId = "sideMenu";

  function toggleOpenState() {
    setIsMenuOpen((prevState) => !prevState);
  }

  useEventListener<KeyboardEvent>("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      toggleOpenState();
    }
  });

  useEventListener<MouseEvent>("mousedown", (e) => {
    const menu = document.querySelector(`#${sideMenuId}`);
    if (isMenuOpen && menu && !menu.contains(e.target as Node)) {
      toggleOpenState();
    }
  });

  useLayoutEffect(() => {
    document
      .querySelector("[data-overlay]")
      ?.setAttribute("data-overlay", isMenuOpen ? "true" : "false");
  }, [isMenuOpen]);

  const contextValue = {
    isMenuOpen,
    toggleOpenState,
    sideMenuId,
    isDesktop,
    setIsMenuOpen,
  };

  return <SideMenuContext.Provider value={contextValue}>{children}</SideMenuContext.Provider>;
}
