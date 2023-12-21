// Custom Hooks
import useModal from "../../../../hooks/useModal";
// Components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Types
import type {
  AddProductByNumberModal,
  ChangeListNameModal,
  CreateListModal,
  DeleteListConfirmationModal,
  ModalPrefferedShopType,
  MoveProductFromOneListToAnotherModal,
  MoveToOtherListModal,
  SelectListModal,
  SideModalLayoutType,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import ArrowLeftIcon from "../../../../Icons/ArrowLeftIcon";

type GoBackFunctionType = (
  | ModalPrefferedShopType
  | AddProductByNumberModal
  | ChangeListNameModal
  | DeleteListConfirmationModal
  | CreateListModal
  | SelectListModal
  | MoveToOtherListModal
  | MoveProductFromOneListToAnotherModal
)["type"];

export default function GoBackBtn({ type }: { type: SideModalLayoutType["type"] }) {
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
        case "select-list":
          if (
            modalData &&
            modalData.type === "select-list" &&
            modalData.previousModal &&
            modalData.previousModal.type === "image-with-products"
          ) {
            setModalData(modalData.previousModal);
          }
          break;
        case "move-to-other-list":
          setModalData({ type: "list-control" });
          break;
        case "move-product-from-one-list-to-another":
          if (modalData && modalData.type === "move-product-from-one-list-to-another") {
            setModalData({
              type: "more-options-for-product-in-list",
              product: modalData.payload.product,
            });
          }
          break;
      }
    });
  }

  return (
    <>
      {(type === "preffered-shop" ||
        type === "add-product-by-number" ||
        type === "change-list-name" ||
        type === "delete-list-confirmation" ||
        type === "move-to-other-list" ||
        type === "move-product-from-one-list-to-another" ||
        (type === "create-list" &&
          modalData &&
          modalData.type === "create-list" &&
          modalData.product) ||
        (type === "select-list" &&
          modalData &&
          modalData.type === "select-list" &&
          modalData.previousModal &&
          modalData.previousModal.type === "image-with-products")) && (
        <Btn
          variant="light"
          shape="circle"
          className="side-modal__go-back-btn"
          onClick={() => goBack(type)}
        >
          <ArrowLeftIcon />
        </Btn>
      )}
    </>
  );
}
