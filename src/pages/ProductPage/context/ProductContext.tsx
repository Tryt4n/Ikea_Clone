import { ReactElement, createContext, useState } from "react";
import { Params, useParams } from "react-router-dom";

type ProductContextType = {
  displayedMainImg: DisplayedImgType;
  setDisplayedMainImg: (data: DisplayedImgType) => void;
  path: Readonly<Params<string>>;
  URL: string;
};

export type DisplayedImgType = {
  src: string;
  variant: string;
};

type ProductProviderPropsType = {
  children?: ReactElement;
};

export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: ProductProviderPropsType) {
  const [displayedMainImg, setDisplayedMainImg] = useState({ src: "", variant: "" });

  const path = useParams();
  const URL = `https://tryt4n.github.io/Ikea-data/server/products/${path.collection}/${path.product}/${path.type}/${path.productID}/data.json`;

  const contextValue = {
    displayedMainImg,
    setDisplayedMainImg,
    path,
    URL,
  };

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
}
