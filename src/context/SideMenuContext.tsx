import { ReactElement, createContext, useState } from "react";

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

  return (
    <SideMenuContext.Provider value={{ isMenuOpen, toggleOpenState, sideMenuId }}>
      {children}
    </SideMenuContext.Provider>
  );
}
