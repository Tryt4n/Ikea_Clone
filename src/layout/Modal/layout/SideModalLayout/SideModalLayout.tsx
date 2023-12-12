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
const NameList = lazy(() => import("../../variants/NameList/NameList"));
const DeleteListConfirmation = lazy(
  () => import("../../variants/DeleteListConfirmation/DeleteListConfirmation")
);
const SelectList = lazy(() => import("../../variants/SelectList/SelectList"));
// Components
import Btn from "../../../../components/Btn/Btn";
import LoadingSpinner from "../../../../components/LazyLoadLoadingSpinner/LoadingSpinner";
import Tag from "../../../../pages/ProductPage/components/Tag/Tag";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Types
import type {
  AddProductByNumberModal,
  ChangeListNameModal,
  CreateListModal,
  DeleteListConfirmationModal,
  ModalPrefferedShopType,
  SideModalLayoutType,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
import ArrowLeftIcon from "../../../../Icons/ArrowLeftIcon";
// Style
import "./index.scss";

export type SideModalLayoutTypeProps = { data: SideModalLayoutType };

export default function SideModalLayout({ data }: SideModalLayoutTypeProps) {
  const { closeModal, modalData } = useModal();
  const { state } = useApp();

  const { type } = data;

  let header: string | ReactElement;

  const productControlHeader =
    modalData && modalData.type === "product-control"
      ? (state.shoppingCart || []).find((product) => {
          return product.productNumber === modalData.productNumber;
        })?.collection
      : "";

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
      header = productControlHeader ? productControlHeader : "";
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
    case "list-control":
      header = "Ustawienia";
      break;
    case "change-list-name":
      header = "Zmień nazwę listy";
      break;
    case "delete-list-confirmation":
      header = "Usuń swoją listę";
      break;
    case "select-list":
      header = "Zapisz na swojej liście";
      break;
    default:
      throw new Error("A case has been defined that does not exist.");
  }

  return (
    <>
      {data && (
        <>
          <header className="side-modal__header">
            <div className="side-modal__btns-wrapper">
              <GoBackBtn type={type} />

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

          <div className="side-modal__content-wrapper scrollbar-style scrollbar-style--thin">
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

              {(type === "product-control" ||
                type === "shopping-cart-control" ||
                type === "list-control") && <Control type={type} />}

              {type === "add-product-by-number" && <AddProductByNumber />}

              {(type === "create-list" || type === "change-list-name") && <NameList type={type} />}

              {type === "delete-list-confirmation" && <DeleteListConfirmation />}

              {type === "select-list" && <SelectList />}
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}

type GoBackFunctionType = (
  | ModalPrefferedShopType
  | AddProductByNumberModal
  | ChangeListNameModal
  | DeleteListConfirmationModal
  | CreateListModal
)["type"];

function GoBackBtn({ type }: { type: SideModalLayoutType["type"] }) {
  const { modalData, setModalData } = useModal();

  function goBack(type: GoBackFunctionType) {
    startViewTransition(() => {
      switch (type) {
        case "preffered-shop":
          setModalData({ type: "choose-shop" });
          break;
        case "add-product-by-number":
          setModalData({ type: "shopping-cart-control" });
          break;
        case "change-list-name":
          setModalData({ type: "list-control" });
          break;
        case "delete-list-confirmation":
          setModalData({ type: "list-control" });
          break;
        case "create-list":
          if (modalData && modalData.type === "create-list" && modalData.product) {
            setModalData({ type: "select-list", product: modalData.product });
          }
          break;
      }
    });
  }

  return (
    <>
      {type === "preffered-shop" ||
        type === "add-product-by-number" ||
        type === "change-list-name" ||
        type === "delete-list-confirmation" ||
        (type === "create-list" &&
          modalData &&
          modalData.type === "create-list" &&
          modalData.product && (
            <Btn
              variant="light"
              shape="circle"
              className="side-modal__go-back-btn"
              onClick={() => goBack(type)}
            >
              <ArrowLeftIcon />
            </Btn>
          ))}
    </>
  );
}
