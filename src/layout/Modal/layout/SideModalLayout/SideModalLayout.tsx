// React
import { ReactElement, Suspense, lazy } from "react";
// Hooks
import useModal from "../../../../hooks/useModal";
import useApp from "../../../../hooks/useApp";
// Modal Variants
const ChooseSize = lazy(() => import("../../variants/ChooseSize/ChooseSize"));
const ChooseColor = lazy(() => import("../../variants/ChooseColor/ChooseColor"));
const PostalCode = lazy(() => import("../../variants/PostalCode/PostalCode"));
const PrefferedShop = lazy(() => import("../../variants/PrefferedShop/PrefferedShop"));
const ChosenShop = lazy(() => import("../../variants/ChosenShop/ChosenShop"));
const Login = lazy(() => import("../../variants/Login/Login"));
const AdditionalInformations = lazy(
  () => import("../../variants/AdditionalInformations/AdditionalInformations")
);
const NextStep = lazy(() => import("../../variants/NextStep/NextStep"));
const Control = lazy(() => import("../../variants/Control/Control"));
const AddProductByNumber = lazy(
  () => import("../../variants/AddProductByNumber/AddProductByNumber")
);
const CreateList = lazy(() => import("../../variants/CreateList/CreateList"));
// Components
import Btn from "../../../../components/Btn/Btn";
import LoadingSpinner from "../../../../components/LazyLoadLoadingSpinner/LoadingSpinner";
import Tag from "../../../../pages/ProductPage/components/Tag/Tag";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Types
import type { SideModalLayoutType } from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
import ArrowLeftIcon from "../../../../Icons/ArrowLeftIcon";
// Style
import "./index.scss";

export type SideModalLayoutTypeProps = { data: SideModalLayoutType };

export default function SideModalLayout({ data }: SideModalLayoutTypeProps) {
  const { setModalData, closeModal } = useModal();
  const { state } = useApp();

  const { type } = data;

  let header: string | ReactElement;

  switch (type) {
    case "choose-size":
      header = "Wybierz rozmiar";
      break;
    case "choose-color":
      header = "Wybierz kolor";
      break;
    case "choose-shop":
      header = "Znajdź swój preferowany sklep";
      break;
    case "postal-code":
      header = "Użyj swojej lokalizacji";
      break;
    case "preffered-shop":
      header = "Wybierz swój preferowany sklep";
      break;
    case "chosen-shop":
      header = state.chosenShop ? state.chosenShop.name : "";
      break;
    case "log-in":
      header = "Zaloguj się";
      break;
    case "product-information":
      header = "Informacje o produkcie";
      break;
    case "items-included":
      header = "Elementu w zestawie";
      break;
    case "dimensions":
      header = "Wymiary";
      break;
    case "ratings":
      header = "Opinie";
      break;
    case "installment-purchase":
      header = "Na raty w IKEA";
      break;
    case "refund":
      header = "W zmianie zdania nie ma nic złego!";
      break;
    case "data-encryption":
      header = "Ta strona jest bezpieczna";
      break;
    case "product-control":
      header = "Produkt";
      break;
    case "shopping-cart-control":
      header = "Koszyk";
      break;
    case "add-product-by-number":
      header = "Dodaj produkt, wpisując jego numer";
      break;
    case "next-step":
      header = (
        <>
          <>Oszczędzaj 16,50 dzięki</>
          &nbsp;
          <Tag
            variant="blue"
            className="side-modal__header-tag"
          >
            Oferty dla Klubowiczów IKEA Family
          </Tag>
        </>
      );
      break;
    case "create-list":
      header = "Nadaj swojej liście nazwę";
      break;
    default:
      throw new Error("A case has been defined that does not exist.");
  }

  function goBack() {
    startViewTransition(() => {
      if (type === "choose-shop") {
        setModalData({ type: "choose-shop" });
      } else if (type === "add-product-by-number") {
        setModalData({ type: "shopping-cart-control" });
      }
    });
  }

  return (
    <>
      {data && (
        <>
          <header className="side-modal__header">
            <div className="side-modal__btns-wrapper">
              {(type === "preffered-shop" || type === "add-product-by-number") && (
                <Btn
                  variant="light"
                  shape="circle"
                  className="side-modal__go-back-btn"
                  onClick={goBack}
                >
                  <ArrowLeftIcon />
                </Btn>
              )}
              <Btn
                variant="light"
                shape="circle"
                className="side-modal__close-btn"
                type="button"
                onClick={closeModal}
              >
                <span className="visually-hidden">Zamknij</span>
                <CloseIcon />
              </Btn>
            </div>
            <h2 className={`side-modal__heading${type === "log-in" ? ` visually-hidden` : ""}`}>
              {header}
            </h2>
          </header>

          <div className="side-modal__content-wrapper scrollbar-style">
            <Suspense fallback={<LoadingSpinner />}>
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

              {(type === "product-control" || type === "shopping-cart-control") && (
                <Control type={type} />
              )}

              {type === "add-product-by-number" && <AddProductByNumber />}

              {type === "create-list" && <CreateList />}
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
