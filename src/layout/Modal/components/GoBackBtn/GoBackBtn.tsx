// Import custom hooks
import useModal from "../../../../hooks/useModal/useModal";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import types
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
// Import icons
import ArrowLeftIcon from "../../../../Icons/ArrowLeftIcon";

// Define GoBackFunctionType type
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

/**
 * GoBackBtn is a React component that renders a button which allows the user to go back to the previous state in the modal.
 * The button is only rendered under certain conditions based on the type of the modal.
 *
 * @param {SideModalLayoutType["type"]} props.type - The type of the modal.
 *
 * @example
 * <GoBackBtn type={modalType} />
 */

export default function GoBackBtn({ type }: { type: SideModalLayoutType["type"] }) {
  const { modalData, setModalData } = useModal(); // Use the useModal custom hook to get the current modal data and the function to set the modal data.

  /**
   * goBack is a function that sets the modal data to go back to the previous state based on the type of the modal.
   *
   * @param {GoBackFunctionType} type - The type of the modal.
   */
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
          // If the modalData exists and the type of the modalData is the same as the type of the modal and the product exists, set the modal data to select-list.
          if (modalData && modalData.type === type && modalData.product) {
            setModalData({ type: "select-list", product: modalData.product });
          }
          break;

        case "select-list":
          // If the modalData exists and the type of the modalData is the same as the type of the modal and the previousModal exists and the type of the previousModal is image-with-products, set the modal data to image-with-products.
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
          // If the modalData exists and the type of the modalData is the same as the type of the modal and the previousModal exists, set the modal data to the previousModal.
          if (modalData && modalData.type === type && modalData.previousModal) {
            setModalData(modalData.previousModal);
          }
          break;

        case "move-to-other-list":
          setModalData({ type: "list-control" });
          break;

        case "move-product-from-one-list-to-another":
          // If the modalData exists and the type of the modalData is the same as the type of the modal and the products array exists and the length of the products array is greater than 1, set the modal data to manage-products-in-list.
          if (modalData && modalData.type === type) {
            if (modalData.products.length > 1) {
              setModalData({
                type: "manage-products-in-list",
                products: modalData.products,
              });
            } else {
              // Otherwise, set the modal data to more-options-for-product-in-list.
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
      {/* The button is only rendered under certain conditions based on the type of the modal. */}
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
          onClick={() => goBack(type)} // When the button is clicked, the goBack function is called with the type of the modal.
        >
          <ArrowLeftIcon />
        </Btn>
      )}
    </>
  );
}
