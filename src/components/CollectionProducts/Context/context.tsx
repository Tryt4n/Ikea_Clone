import { ReactNode, createContext, useState } from "react";

type CollectionContextType = {
  isDescriptionMenuVisible: boolean;
  setIsDescriptionMenuVisible: (state: boolean) => void;
  hoveredItemID: string;
  setHoveredItemID: (id: string) => void;
};

export const CollectionContext = createContext<CollectionContextType | null>(null);

export function CollectionContextProvider({ children }: { children: ReactNode }) {
  const [isDescriptionMenuVisible, setIsDescriptionMenuVisible] = useState(false);
  const [hoveredItemID, setHoveredItemID] = useState("");

  const contextValue = {
    isDescriptionMenuVisible,
    setIsDescriptionMenuVisible,
    hoveredItemID,
    setHoveredItemID,
  };

  return <CollectionContext.Provider value={contextValue}>{children}</CollectionContext.Provider>;
}
