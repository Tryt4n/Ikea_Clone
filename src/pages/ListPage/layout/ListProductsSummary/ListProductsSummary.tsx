// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useList from "../../context/useList";
import useToast from "../../../../hooks/useToast";
// Components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Icons
import ShoppingCartAddIcon from "../../../../Icons/ShoppingCartAddIcon";
// Constants
import { getClubDiscount } from "../../../../constants/clubDiscount";
// Style
import "./index.scss";

export default function ListProductsSummary() {
  const { dispatch } = useApp();
  const { listState } = useList();
  const { setToastData } = useToast();

  function calculateDiscount(price: number) {
    const savingsMath = getClubDiscount(price);
    const formattedSavings = savingsMath.toLocaleString("pl-PL");

    const finalPrice = Number.isInteger(savingsMath)
      ? `${formattedSavings},-`
      : `${formattedSavings}`;

    return finalPrice;
  }

  const totalPrice = listState?.products
    ? listState.products.reduce(
        (acc, product) => {
          let totalInteger = acc[0] + product.quantity * product.price.integer;
          let totalDecimal =
            acc[1] + product.quantity * (product.price.decimal ? product.price.decimal : 0);

          if (totalDecimal >= 100) {
            totalInteger += Math.floor(totalDecimal / 100);
            totalDecimal = totalDecimal % 100;
          }

          return [totalInteger, totalDecimal];
        },
        [0, 0]
      )
    : [0, 0];

  const totalPriceInteger = totalPrice[0];
  const totalPriceDecimal = totalPrice[1];

  const totalPriceWithDiscount = calculateDiscount(
    Number(`${totalPriceInteger}.${totalPriceDecimal}`)
  );

  function addProductsToShoppingCart() {
    if (listState?.products) {
      const productsNames = listState.products.map((product) => product.collection);

      dispatch({ type: "addToShoppingCart", payload: listState?.products });

      setToastData({
        open: true,
        text: `${
          productsNames.length > 1 ? productsNames.join(", ") : productsNames[0]
        } dodano to koszyka.`,
        link: "/shoppingcart",
      });
    }
  }

  return (
    <section className="list-products-summary">
      <h3 className="visually-hidden">Podsumowanie</h3>

      <div className="list-products-summary__wrapper">
        <span>Cena dla Klubowiczów IKEA Family</span>
        <strong>
          {totalPriceInteger}
          <sup>
            <small>,{totalPriceDecimal}</small>
          </sup>
        </strong>
      </div>

      <div className="list-products-summary__wrapper">
        <span>Cena dla pozostałych klientów</span>
        <em>{totalPriceWithDiscount}</em>
      </div>

      <Btn
        variant="blue"
        size="big"
        className="list-products-summary__btn"
        onClick={addProductsToShoppingCart}
      >
        <ShoppingCartAddIcon />
        Dodaj wszystko do koszyka
      </Btn>
    </section>
  );
}
