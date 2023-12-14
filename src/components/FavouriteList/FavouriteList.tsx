// React
import React, { MouseEvent } from "react";
// Custom Hooks
import useApp from "../../hooks/useApp";
import useModal from "../../hooks/useModal";
import useWindowSize from "../../hooks/useWindowSize";
// react-router-dom
import { Link } from "react-router-dom";
// date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pl from "date-fns/locale/pl";
// Components
import Btn from "../Btn/Btn";
// Constants
import { productLink } from "../../constants/links";
// Types
import type { FavouritesListType, ShoppingCartType } from "../../context/AppContext";
// Icons
import HeartIcon from "../../Icons/HeartIcon";
import TripleDotsMenuIcon from "../../Icons/TripleDotsMenuIcon";
import ArrowRightIcon from "../../Icons/ArrowRightIcon";
// Style
import "./index.scss";

type ListPropsType = {
  list: FavouritesListType;
  isMainList?: boolean;
};

export default function FavouriteList({ list, isMainList = false }: ListPropsType) {
  const { id, products } = list;

  return (
    <section className="favourite-list">
      <Link
        to={`/favourites/${id}`}
        className="favourite-list__container-link"
      >
        {products && products.length > 0 ? (
          <ImagesListWithProducts products={products} />
        ) : (
          <EmptyList isMainList={isMainList} />
        )}

        <ListDescription
          list={list}
          isMainList={isMainList}
        />
      </Link>
    </section>
  );
}

function ImagesListWithProducts({ products }: { products: ShoppingCartType[] }) {
  return (
    <ul
      className={`favourite-list__inner-list-grid_${
        products.length === 1 ? 1 : products.length === 2 ? 2 : 3
      }`}
    >
      {products.map((product, index) => {
        const { collection, name, variant, images, productNumber, nameToDisplay, variantName } =
          product;

        const imgSrc = `${productLink}/${collection}-${name}-${variant}__${images.main}`;

        return (
          <React.Fragment key={productNumber}>
            {index < 3 && (
              <li>
                <div className="favourite-list__product-image">
                  {index === 2 && products.length > 3 ? (
                    <span>+{products.length - index}</span>
                  ) : (
                    <img
                      src={imgSrc}
                      alt={`${collection}-${nameToDisplay} ${variantName}`}
                      loading="lazy"
                    />
                  )}
                </div>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}

function EmptyList({ isMainList }: { isMainList: boolean }) {
  const { width } = useWindowSize();

  return (
    <div className="favourite-list__inner-wrapper">
      <HeartIcon />
      {(isMainList || (!isMainList && width >= 600)) && <p>Ta lista potrzebuje odrobiny miłości</p>}
    </div>
  );
}

function ListDescription({ list, isMainList }: { list: FavouritesListType; isMainList: boolean }) {
  const { dispatch } = useApp();
  const { setModalData } = useModal();
  const { width } = useWindowSize();

  const { lastEdit, name } = list;

  function openListControlMenu(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    dispatch({ type: "setEditingList", payload: list });

    setModalData({
      type: "list-control",
    });
  }

  return (
    <div className="favourite-list__description">
      <div>
        <h3 className="favourite-list__header">{name}</h3>
        <time
          dateTime={lastEdit.toString()}
          className={`favourite-list__time${
            !isMainList ? " favourite-list__time--break-word" : ""
          }`}
        >
          Zaktualizowano&nbsp;
          {formatDistanceToNow(new Date(lastEdit), {
            addSuffix: true,
            locale: pl,
          })}
        </time>
      </div>

      {isMainList && (
        <div className="favourite-list__btns-wrapper">
          <Btn tabIndex={-1}>Zobacz</Btn>
          <Btn
            shape="circle"
            variant="gray"
            className="favourite-list__btn-menu"
            onClick={openListControlMenu}
          >
            <span className="visually-hidden">Otwórz menu listy</span>
            <TripleDotsMenuIcon />
          </Btn>
        </div>
      )}

      {!isMainList && width >= 900 && (
        <Btn
          shape="circle"
          variant="gray"
          tabIndex={-1}
        >
          <span className="visually-hidden">Przejdź do listy {name}</span>
          <ArrowRightIcon />
        </Btn>
      )}
    </div>
  );
}
