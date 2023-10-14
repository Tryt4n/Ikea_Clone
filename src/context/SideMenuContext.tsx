import { ReactElement, createContext, useLayoutEffect, useState } from "react";
import useEventListener from "../hooks/useEventListener";
import useLayoutEventListener from "../hooks/useLayoutEventListener";

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
  const [touchStartX, setTouchStartX] = useState(0);
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

  function handleTouchStart(e: TouchEvent) {
    if (isDesktop) return;

    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchMove(e: TouchEvent) {
    if (isDesktop) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartX;

    if (!isMenuOpen && deltaX > 50) {
      toggleOpenState();
    } else if (isMenuOpen && deltaX < -50) {
      toggleOpenState();
    }
    setTouchStartX(currentX);
  }

  useLayoutEventListener("touchstart", handleTouchStart);
  useLayoutEventListener("touchmove", handleTouchMove);

  const contextValue = {
    isMenuOpen,
    toggleOpenState,
    sideMenuId,
    isDesktop,
  };

  return <SideMenuContext.Provider value={contextValue}>{children}</SideMenuContext.Provider>;
}
