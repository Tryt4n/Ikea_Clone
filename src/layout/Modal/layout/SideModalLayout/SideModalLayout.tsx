// Import react dependencies
// import { Suspense, lazy, type ReactElement } from "react";
import { Suspense, lazy } from "react";
// Import custom hooks
import useModal from "../../../../hooks/useModal/useModal";
import useApp from "../../../../hooks/useApp/useApp";
// Import modal variants inner components by lazy loading
const ChooseSize = lazy(() => import("../../variants/ChooseSize/ChooseSize"));
const ChooseColor = lazy(
  () => import("../../variants/ChooseColor/ChooseColor"),
);
const PostalCode = lazy(() => import("../../variants/PostalCode/PostalCode"));
const PrefferedShop = lazy(
  () => import("../../variants/PrefferedShop/PrefferedShop"),
);
const ChosenShop = lazy(() => import("../../variants/ChosenShop/ChosenShop"));
const Login = lazy(() => import("../../variants/Login/Login"));
const AdditionalInformations = lazy(
  () => import("../../variants/AdditionalInformations/AdditionalInformations"),
);
const NextStep = lazy(() => import("../../variants/NextStep/NextStep"));
const Control = lazy(() => import("../../variants/Control/Control"));
const AddProductByNumber = lazy(
  () => import("../../variants/AddProductByNumber/AddProductByNumber"),
);
const NameList = lazy(() => import("../../variants/NameList/NameList"));
const DeleteListConfirmation = lazy(
  () => import("../../variants/DeleteListConfirmation/DeleteListConfirmation"),
);
const SelectList = lazy(() => import("../../variants/SelectList/SelectList"));
const ManageProductsInList = lazy(
  () => import("../../variants/ManageProductsInList/ManageProductsInList"),
);
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
import LoadingSpinner from "../../../../components/ui/LazyLoadLoadingSpinner/LoadingSpinner";
// import Tag from "../../../../components/ui/Tag/Tag";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";
// Import utility functions
import { getHeader } from "./utils/getHeader";
// Import types
import type { SideModalLayoutType } from "../../types/ModalTypes";
// Import icons
import CloseIcon from "../../../../Icons/CloseIcon";
// Import styles
import "./index.scss";

// Define the prop types for component
export type SideModalLayoutTypeProps = { data: SideModalLayoutType };

/**
 * `SideModalLayout` is a React component that renders a side modal with different content based on the `type` prop.
 * It uses several inner components (`ChooseSize`, `ChooseColor`, `PostalCode`, `PrefferedShop`, `ChosenShop`, `Login`, `AdditionalInformations`, `NextStep`, `Control`, `AddProductByNumber`, `NameList`, `DeleteListConfirmation`, `SelectList`, `ManageProductsInList`) to provide different modal content. Content is lazy loaded using the `Suspense` component for better performance. While the content is loading, a `LoadingSpinner` component is rendered.
 *
 * @component
 * @param {string} props.data.type - The type of the modal. It can be one of the following: "choose-size", "choose-color", "choose-shop", "postal-code", "preffered-shop", "chosen-shop", "log-in", "refund", "data-encryption", "next-step", "product-control", "shopping-cart-control", "list-control", "more-options-for-product-in-list", "add-product-by-number", "create-list", "create-list-with-products", "change-list-name", "delete-list-confirmation", "select-list", "move-to-other-list", "move-product-from-one-list-to-another", "select-list-with-products", "manage-products-in-list".
 * @returns {JSX.Element} The rendered `SideModalLayout` component.
 */

export default function SideModalLayout({ data }: SideModalLayoutTypeProps) {
  const { state } = useApp(); // Get state from useApp custom hook
  const { modalData, closeModal } = useModal(); // Get modalData and closeModal from useModal custom hook

  const { type } = data; // Get the type of the modal

  // Get the header for the modal using the getHeader utility function
  const header = modalData
    ? getHeader(type, modalData as SideModalLayoutType, state)
    : "";

  // Render the side modal with the appropriate header and content based on the type prop
  return (
    <>
      {data && (
        <>
          <header className="side-modal__header">
            <div className="side-modal__btns-wrapper">
              {/* Render button with arrow back icon in some cases specified in the component */}
              <GoBackBtn type={type} />

              <Btn
                variant="light"
                shape="circle"
                className="side-modal__close-btn"
                type="button"
                onClick={closeModal} // Close the modal on click
                data-testid="side-modal-close-btn"
              >
                {/* Text is visually hidden but it is still available for screen readers and SEO purposes */}
                <span className="visually-hidden">Zamknij</span>
                <CloseIcon />
              </Btn>
            </div>

            <h2
              className={`side-modal__heading${
                type === "log-in" ? ` visually-hidden` : ""
              }`} // Hide visually the heading for the "log-in" type but keep it available for screen readers and SEO purposes
            >
              {header}
            </h2>
          </header>

          <div className="side-modal__content-wrapper scrollbar-style scrollbar-style--thin">
            <Suspense
              fallback={<LoadingSpinner />} // Render a loading spinner while the content is loading
            >
              {type === "choose-size" && <ChooseSize data={data} />}

              {type === "choose-color" && <ChooseColor data={data} />}

              {type === "choose-shop" && <PostalCode modalType={type} />}

              {type === "postal-code" && <PostalCode modalType={type} />}

              {type === "preffered-shop" && <PrefferedShop />}

              {type === "chosen-shop" && <ChosenShop />}

              {type === "log-in" && <Login />}

              {(type === "refund" || type === "data-encryption") && (
                <AdditionalInformations type={type} />
              )}

              {type === "next-step" && <NextStep />}

              {(type === "product-control" ||
                type === "shopping-cart-control" ||
                type === "list-control" ||
                type === "more-options-for-product-in-list") && (
                <Control type={type} />
              )}

              {type === "add-product-by-number" && <AddProductByNumber />}

              {(type === "create-list" ||
                type === "create-list-with-products" ||
                type === "change-list-name") && <NameList type={type} />}

              {type === "delete-list-confirmation" && (
                <DeleteListConfirmation />
              )}

              {(type === "select-list" ||
                type === "move-to-other-list" ||
                type === "move-product-from-one-list-to-another" ||
                type === "select-list-with-products") && <SelectList />}

              {type === "manage-products-in-list" && <ManageProductsInList />}
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
