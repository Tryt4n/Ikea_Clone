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
  MoveProductsFromOneListToAnotherModal,
  MoveToOtherListModal,
  SelectListModal,
  SelectListWithMultipleProducts,
  SideModalLayoutType,
} from "../../types/ModalTypes";
// Icons
import ArrowLeftIcon from "../../../../Icons/ArrowLeftIcon";

type GoBackFunctionType = (
  | ModalPrefferedShopType
  | AddProductByNumberModal
  | ChangeListNameModal
  | DeleteListConfirmationModal
  | CreateListModal
  | SelectListModal
  | SelectListWithMultipleProducts
  | MoveToOtherListModal
  | MoveProductsFromOneListToAnotherModal
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
          if (modalData && modalData.type === type && modalData.product) {
            setModalData({ type: "select-list", product: modalData.product });
          }
          break;

        case "select-list":
          if (
            modalData &&
            modalData.type === type &&
            modalData.previousModal &&
            modalData.previousModal.type === "image-with-products"
          ) {
            setModalData(modalData.previousModal);
          }
          break;

        case "select-list-with-products":
          if (modalData && modalData.type === type && modalData.previousModal) {
            setModalData(modalData.previousModal);
          }
          break;

        case "move-to-other-list":
          setModalData({ type: "list-control" });
          break;

        case "move-product-from-one-list-to-another":
          if (modalData && modalData.type === type) {
            if (modalData.products.length > 1) {
              setModalData({
                type: "manage-products-in-list",
                products: modalData.products,
              });
            } else {
              setModalData({
                type: "more-options-for-product-in-list",
                products: [modalData.products[0]],
              });
            }
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
        (type === "create-list" && modalData && modalData.type === type && modalData.product) ||
        (type === "select-list" &&
          modalData &&
          modalData.type === type &&
          modalData.previousModal &&
          modalData.previousModal.type === "image-with-products") ||
        (type === "select-list-with-products" &&
          modalData &&
          modalData.type === type &&
          modalData.previousModal)) && (
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
