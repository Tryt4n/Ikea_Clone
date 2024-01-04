// Import react dependencies
import { ReactElement, createContext, useState } from "react";
// Import react-router-dom dependencies
import { Params, useParams } from "react-router-dom";

// Define the type for the ProductContext
type ProductContextType = {
  displayedMainImg: DisplayedImgType; // The displayed main image
  setDisplayedMainImg: (data: DisplayedImgType) => void; // A function for setting the displayed main image
  path: Readonly<Params<string>>; // The path parameters
  URL: string; // The URL for the product data
};

// Define the type for the displayed main image
export type DisplayedImgType = {
  src: string; // The source of the image
  variant: string; // The variant of the image
};

// Create the product context with a default value of null
export const ProductContext = createContext<ProductContextType | null>(null);

/**
 * ProductProvider is a functional component that provides the product context to its children.
 * The context includes the displayed main image, a function for setting the displayed main image, the path parameters, and the URL for the product data.
 * The displayed main image and the function for setting it are managed by a state hook.
 * The path parameters are obtained from the useParams hook.
 * The URL for the product data is constructed from the path parameters.
 *
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {ReactElement} props.children - The children elements to be rendered within this component.
 *
 * @example
 * return (
 *   <ProductProvider>
 *     <ChildComponent />
 *   </ProductProvider>
 * )
 */
export function ProductProvider({ children }: { children: ReactElement }) {
  const [displayedMainImg, setDisplayedMainImg] = useState({ src: "", variant: "" }); // Initialize the state for the displayed main image
  const path = useParams(); // Get the path parameters from the useParams hook

  const URL = `https://tryt4n.github.io/Ikea-data/server/products/${path.collection}/${path.product}/${path.type}/${path.productID}/data.json`; // Construct the URL for the product data from the path parameters

  // Define the value for the product context
  const contextValue = {
    displayedMainImg,
    setDisplayedMainImg,
    path,
    URL,
  };

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
}
