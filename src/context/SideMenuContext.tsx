import { ReactElement, createContext, useEffect, useState } from "react";
import useEventListener from "../hooks/useEventListener";

type SideMenuContextType = {
  isMenuOpen: boolean;
  toggleOpenState: () => void;
  sideMenuId: string;
};

type SideMenuProviderPropsType = {
  children?: ReactElement | ReactElement[];
};

export const SideMenuContext = createContext<SideMenuContextType | null>(null);

export function SideMenuProvider({ children }: SideMenuProviderPropsType) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  useEffect(() => {
    document.body.setAttribute("data-overlay", isMenuOpen ? "true" : "false");
    console.log("fsaf");
  }, [isMenuOpen]);

  return (
    <SideMenuContext.Provider value={{ isMenuOpen, toggleOpenState, sideMenuId }}>
      {children}
    </SideMenuContext.Provider>
  );
}
