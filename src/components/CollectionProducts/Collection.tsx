// React
import { CSSProperties, HTMLProps, ReactNode } from "react";
// Utils
import { addThousandSeparator } from "../../utils/addThousandSeparator";
// Icons
import ChevronRightIcon from "../../Icons/ChevronRightIcon";
// Style
import "./index.scss";

type CollectionListPropsType = {
  children: ReactNode;
} & HTMLProps<HTMLUListElement>;

type CollectionListItemPropsType = {
  children: ReactNode;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  linkToProduct: string;
  descriptionContainerId: string;
} & HTMLProps<HTMLLIElement>;

type ListItemDescriptionContainerPropsType = {
  children: ReactNode;
  id: string;
};

type ListItemPricePropsType = {
  price: number;
  priceDecimal?: number;
};

type ListItemLastPriceDescriptionPropsType = {
  lastPrice: number;
  lastPriceDecimal?: number;
};

export default function Collection({ children }: CollectionListPropsType) {
  return (
    <ul
      className="collection-list"
      aria-label="Produkty na zdjęciu"
    >
      {children}
    </ul>
  );
}

function CollectionListItem({
  children,
  top,
  bottom,
  left,
  right,
  linkToProduct,
  descriptionContainerId,
}: CollectionListItemPropsType) {
  const style: CSSProperties = {
    top: top ? top : "auto",
    bottom: bottom ? bottom : "auto",
    left: left ? left : "auto",
    right: right ? right : "auto",
  };

  return (
    <li style={style}>
      <a href={linkToProduct}>
        <span className="visually-hidden">Idź na stronę produktu</span>
        <span
          className="collection-list__item"
          role="presentation"
          aria-labelledby={descriptionContainerId}
        ></span>
        {children}
      </a>
    </li>
  );
}

function ListItemDescriptionContainer({ children, id }: ListItemDescriptionContainerPropsType) {
  return (
    <div
      id={id}
      className="collection-list__item-description-container"
      role="tooltip"
      aria-hidden="true"
    >
      <div className="collection-list__item-description-inner-wrapper">{children}</div>
      <ChevronRightIcon />
    </div>
  );
}

function ListItemHeadingContainer({ children }: { children: ReactNode }) {
  return <h3 className="collection-list__item-heading-container">{children}</h3>;
}

function ListItemHeading({ children }: { children: string }) {
  return <span className="collection-list__item-heading">{children}</span>;
}

function ListItemSubHeading({ children }: { children: string }) {
  return <span className="collection-list__item-subheading">{children}</span>;
}

function ListItemPrice({ price, priceDecimal }: ListItemPricePropsType) {
  const formattedPrice = addThousandSeparator(price);

  return (
    <strong>
      <span className="visually-hidden">Cena {price},-</span>
      <div className="collection-list__item-price">
        {formattedPrice}
        {priceDecimal ? (
          <sup>
            <small>&nbsp;,{priceDecimal}</small>
          </sup>
        ) : (
          <small>,-</small>
        )}
      </div>
    </strong>
  );
}

function ListItemNewPriceTag() {
  return <em className="collection-list__item-new-price">Nowa niższa cena</em>;
}

function ListItemLastPriceDescription({
  lastPrice,
  lastPriceDecimal,
}: ListItemLastPriceDescriptionPropsType) {
  const formattedLastPrice = addThousandSeparator(lastPrice);

  return (
    <p>
      Najniższa cena z 30 dni przed obniżką:
      <small>
        &nbsp;
        {formattedLastPrice},{lastPriceDecimal ? lastPriceDecimal : "-"}
      </small>
    </p>
  );
}

Collection.ListItem = CollectionListItem;
Collection.ListItemDescriptionContainer = ListItemDescriptionContainer;
Collection.ListItemHeadingContainer = ListItemHeadingContainer;
Collection.ListItemHeading = ListItemHeading;
Collection.ListItemSubHeading = ListItemSubHeading;
Collection.ListItemPrice = ListItemPrice;
Collection.ListItemNewPriceTag = ListItemNewPriceTag;
Collection.ListItemLastPriceDescription = ListItemLastPriceDescription;
