// Import react dependencies
import { type ReactNode, Suspense, lazy } from "react";
// Import custom hooks
import useModal from "../../../../hooks/useModal/useModal";
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
// Import lazy modal variants
const MainMenu = lazy(() => import("../../variants/MainMenu/MainMenu"));
const ProductsMenu = lazy(
  () => import("../../variants/ProductsMenu/ProductsMenu"),
);
const RoomsMenu = lazy(() => import("../../variants/RoomsMenu/RoomsMenu"));
// Import components
import LoadingSpinner from "../../../../components/ui/LazyLoadLoadingSpinner/LoadingSpinner";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import types
import type { MenuLayoutType } from "../../types/ModalTypes";
// Import icons
import CloseIcon from "../../../../Icons/CloseIcon";
import IkeaLogo from "../../../../Icons/IkeaLogo";
import ArrowLeftIcon from "../../../../Icons/ArrowLeftIcon";
// Import styles
import "./index.scss";

// Define MenuLayoutTypePropsType type
export type MenuLayoutTypePropsType = {
  data: MenuLayoutType;
};

/**
 * MenuLayout is a React component that renders a layout for a menu.
 * The layout includes a header with a close button and a logo, and a wrapper for the content of the menu.
 * The content of the menu is loaded lazily and can be one of three types: main menu, products menu, or rooms menu.
 * The component uses the useModal and useWindowSize custom hooks.
 *
 * @param {MenuLayoutType} props.data - The data of the menu.
 *
 * @example
 * <MenuLayout data={data} />
 */

export default function MenuLayout({ data }: MenuLayoutTypePropsType) {
  const { closeModal } = useModal(); // Use the useModal custom hook to get the closeModal function.
  const { width } = useWindowSize(); // Use the useWindowSize custom hook to get the width of the window.

  return (
    <>
      {data && (
        <>
          <header className="menu-modal__header">
            <h2 className="visually-hidden">Menu Poboczne</h2>
            <Btn
              variant="light"
              shape="circle"
              onClick={closeModal} // The function to call when the close button is clicked.
            >
              <CloseIcon />
              {/* visually-hidden is a class that hides the text but keeps it accessible for screen readers and SEO purposes. */}
              <span className="visually-hidden">Zamknij Menu</span>
            </Btn>

            {/* The logo is only rendered if the menu is the main menu or the window width is greater than or equal to 900px. */}
            {(data.type === "menu" ||
              ((data.type === "products-menu" || data.type === "rooms-menu") &&
                width >= 900)) && (
              <a href="/" aria-label="Idź na stronę główną">
                {/* visually-hidden is a class that hides the text but keeps it accessible for screen readers and SEO purposes. */}
                <span className="visually-hidden">Strona główna</span>
                <IkeaLogo />
              </a>
            )}
          </header>

          <div className="menu-modal__wrapper scrollbar-style">
            {/* The content of the menu is loaded lazily. The loading spinner is displayed while the content is loading. */}
            {/* The content of the menu is rendered based on the type of the menu. */}
            <Suspense fallback={<LoadingSpinner />}>
              {data.type === "menu" && <MainMenu />}

              {data.type === "products-menu" && (
                <ModalInnerWrapper title="Produkty">
                  <ProductsMenu className={data.type} />
                </ModalInnerWrapper>
              )}

              {data.type === "rooms-menu" && (
                <ModalInnerWrapper title="Pomieszczenia">
                  <RoomsMenu className={data.type} />
                </ModalInnerWrapper>
              )}
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}

// Define ModalInnerWrapperPropsType props type
type ModalInnerWrapperPropsType = {
  title: string;
  children: ReactNode;
};

/**
 * ModalInnerWrapper is a React component that renders a wrapper for the content of a modal.
 * The wrapper includes a go back button, a heading, and the children of the component.
 * The component uses the useModal custom hook.
 *
 * @param {string} props.title - The title of the wrapper.
 * @param {ReactNode} props.children - The children of the wrapper.
 *
 * @example
 * <ModalInnerWrapper title="Title">
 *   <ChildComponent />
 * </ModalInnerWrapper>
 */

function ModalInnerWrapper({ title, children }: ModalInnerWrapperPropsType) {
  const { setModalData } = useModal(); // Use the useModal custom hook to get the setModalData function.

  /**
   * goBack is a function that starts a view transition and sets the data of the modal to "menu".
   */
  function goBack() {
    startViewTransition(() => {
      setModalData({
        type: "menu",
      });
    });
  }

  return (
    <>
      <Btn
        variant="light"
        shape="circle"
        className="menu-modal__go-back-btn"
        onClick={goBack} // The function to call when the go back button is clicked.
      >
        {/* visually-hidden is a class that hides the text but keeps it accessible for screen readers and SEO purposes. */}
        <span className="visually-hidden">Wstecz</span>
        <ArrowLeftIcon />
      </Btn>

      <strong className="menu-modal__inner-wrapper-heading">{title}</strong>

      {children}
    </>
  );
}
