// React
import { MouseEvent } from "react";
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
// Types
import type { FavouritesListType } from "../../context/AppContext";
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
  const { dispatch } = useApp();
  const { setModalData } = useModal();
  const { width } = useWindowSize();

  function openListControlMenu(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    dispatch({ type: "setEditingList", payload: list });

    setModalData({
      type: "list-control",
    });
  }

  return (
    <section className="favourite-list">
      <Link
        to={`/favourites/${list.id}`}
        className="favourite-list__container-link"
      >
        <div className="favourite-list__inner-wrapper">
          <HeartIcon />
          {(isMainList || (!isMainList && width >= 600)) && (
            <p>Ta lista potrzebuje odrobiny miłości</p>
          )}
        </div>

        <div className="favourite-list__description">
          <div>
            <h3 className="favourite-list__header">{list.name}</h3>
            <time
              dateTime={list.lastEdit.toString()}
              className={`favourite-list__time${
                !isMainList ? " favourite-list__time--break-word" : ""
              }`}
            >
              Zaktualizowano&nbsp;
              {formatDistanceToNow(new Date(list.lastEdit), {
                addSuffix: true,
                locale: pl,
              })}
            </time>
          </div>

          {isMainList && (
            <>
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
            </>
          )}

          {!isMainList && width >= 900 && (
            <Btn
              shape="circle"
              variant="gray"
            >
              <span className="visually-hidden">Przejdź do listy {list.name}</span>
              <ArrowRightIcon />
            </Btn>
          )}
        </div>
      </Link>
    </section>
  );
}
