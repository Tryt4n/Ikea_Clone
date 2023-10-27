// React
import React, { CSSProperties, HTMLProps, ReactNode } from "react";
// Context
import { CollectionContextProvider } from "../Context/context";
import useCollection from "../hooks/useContext";
// Utils
import { addThousandSeparator } from "../../../utils/addThousandSeparator";
// Icons
import ChevronRightIcon from "../../../Icons/ChevronRightIcon";
// Style
import "../index.scss";

type CollectionListPropsType = {
  children: ReactNode;
  showOnlyOnHover?: boolean;
} & HTMLProps<HTMLUListElement>;

type CollectionListItemPropsType = {
  children: ReactNode;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  descriptionContainerId: string;
} & HTMLProps<HTMLLIElement>;

type ListItemDescriptionContainerPropsType = {
  children: ReactNode;
  id: string;
  linkToProduct: string;
  placeRightCenter?: boolean;
  placeLeftCenter?: boolean;
  placeTopCenter?: boolean;
  placeBottomCenter?: boolean;
  placeTopLeft?: boolean;
  placeTopRight?: boolean;
  placeBottomLeft?: boolean;
  placeBottomRight?: boolean;
};

type ListItemPricePropsType = {
  price: number;
  priceDecimal?: number;
  quantity?: number;
  sizeInMeters?: number;
};

type ListItemTagPropsType = {
  children: string;
  variant?: "red" | "orange";
};

type ListItemLastPriceDescriptionPropsType = {
  lastPrice: number;
  lastPriceDecimal?: number;
};

export default function Collection({ children, showOnlyOnHover }: CollectionListPropsType) {
  return (
    <CollectionContextProvider>
      <ul
        className={`collection-list${showOnlyOnHover ? ` show-only-on-hover` : ""}`}
        aria-label="Produkty ze zdjęcia"
      >
        {children}
      </ul>
    </CollectionContextProvider>
  );
}

function CollectionListItem({
  children,
  top,
  bottom,
  left,
  right,
  descriptionContainerId,
}: CollectionListItemPropsType) {
  const { setIsDescriptionMenuVisible, setHoveredItemID } = useCollection();

  const listItemStyle: CSSProperties = {
    top: top ? top : "auto",
    bottom: bottom ? bottom : "auto",
    left: left ? left : "auto",
    right: right ? right : "auto",
  };

  function showItemDescription() {
    setIsDescriptionMenuVisible(true);
    setHoveredItemID(descriptionContainerId);
  }

  return (
    <li
      style={listItemStyle}
      onFocus={showItemDescription}
      onMouseEnter={showItemDescription}
    >
      <span className="visually-hidden">Idź na stronę produktu</span>
      <button
        className="collection-list__item"
        aria-controls={descriptionContainerId}
        aria-labelledby={descriptionContainerId}
      >
        <span className="visually-hidden">Pokaż informacje o produkcie</span>
      </button>
      {children}
    </li>
  );
}

function ListItemDescriptionContainer({
  children,
  id,
  linkToProduct,
  placeRightCenter,
  placeLeftCenter,
  placeTopCenter,
  placeBottomCenter,
  placeTopLeft,
  placeTopRight,
  placeBottomLeft,
  placeBottomRight,
}: ListItemDescriptionContainerPropsType) {
  const { isDescriptionMenuVisible, hoveredItemID, setIsDescriptionMenuVisible } = useCollection();

  const visibilityCondition = hoveredItemID === id && isDescriptionMenuVisible;

  const itemDescriptionClasses = `collection-list__item-description-container${
    placeRightCenter ? " right-center" : ""
  }${placeLeftCenter ? " left-center" : ""}${placeTopCenter ? " top-center" : ""}${
    placeBottomCenter ? " bottom-center" : ""
  }${placeTopLeft ? " top-left" : ""}${placeTopRight ? " top-right" : ""}${
    placeBottomLeft ? " bottom-left" : ""
  }${placeBottomRight ? " bottom-right" : ""}`;

  return (
    <div
      id={id}
      className={itemDescriptionClasses}
      role="tooltip"
      aria-hidden={visibilityCondition ? "false" : "true"}
    >
      <a
        href={linkToProduct}
        className="collection-list__item-description-link"
        tabIndex={visibilityCondition ? 0 : -1}
        onBlur={() => setIsDescriptionMenuVisible(false)}
        onMouseLeave={() => setIsDescriptionMenuVisible(false)}
      >
        <div className="collection-list__item-description-inner-wrapper">{children}</div>
        <ChevronRightIcon />
      </a>
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

function ListItemPrice({ price, priceDecimal, quantity, sizeInMeters }: ListItemPricePropsType) {
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
        {quantity && <small> /{quantity} szt.</small>}
        {sizeInMeters && (
          <small className="collection-list__item-size-in-meters"> /{sizeInMeters} m</small>
        )}
      </div>
    </strong>
  );
}

export function ListItemTag({ children, variant }: ListItemTagPropsType) {
  return (
    <em
      className={`collection-list__item-tag${
        variant ? ` collection-list__item-tag--${variant}` : ""
      }`}
    >
      {children}
    </em>
  );
}

function ListItemLastPriceDescription({
  lastPrice,
  lastPriceDecimal,
}: ListItemLastPriceDescriptionPropsType) {
  const formattedLastPrice = addThousandSeparator(lastPrice);

  return (
    <p className="collection-list__last-price-text-wrapper">
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
Collection.ListItemTag = ListItemTag;
Collection.ListItemLastPriceDescription = ListItemLastPriceDescription;
