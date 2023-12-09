// React
import React from "react";
// Custom Hooks
import useApp from "../../hooks/useApp";
import useModal from "../../hooks/useModal";
import useWindowSize from "../../hooks/useWindowSize";
// Components
import Btn from "../../components/Btn/Btn";
// date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pl from "date-fns/locale/pl";
// Icons
import HeartIcon from "../../Icons/HeartIcon";
import TripleDotsMenuIcon from "../../Icons/TripleDotsMenuIcon";
import ArrowRightIcon from "../../Icons/ArrowRightIcon";
// Types
import type { FavouritesListType } from "../../context/AppContext";
// Style
import "./index.scss";

export default function FavouriteLists() {
  const { state } = useApp();
  const { openModal, setModalData } = useModal();

  function openCreateListModal() {
    openModal();
    setModalData({ type: "create-list" });
  }

  return (
    <>
      <article className="favourite-lists">
        <hgroup className="favourite-lists__header">
          <h2>Hej!</h2>
          <p>Zacznij organizować swoją wymarzoną przestrzeń.</p>
        </hgroup>

        <div className="favourite-lists__container">
          <section className="favourite-lists__content-wrapper">
            <HeartIcon />
            <h3>Wiele list, jeden dom</h3>
            <p>
              Znajdź wszystkie swoje listy w jednym miejscu. Podziel swoje ulubione listy na
              kategorie i zapisz je tutaj.
            </p>
            <p>Nie możesz znaleźć swoich list? Upewnij się, że jesteś zalogowany.</p>
            <div className="favourite-lists__btns-wrapper">
              <Btn onClick={openCreateListModal}>Stwórz listę</Btn>
              <Btn variant="white-with-border">Zaloguj się</Btn>
            </div>
          </section>

          {state.favouriteLists && state.favouriteLists.length > 0 && (
            <List
              list={state.favouriteLists[0]}
              isMainList
            />
          )}
        </div>
      </article>

      {state.favouriteLists && state.favouriteLists.length > 0 && (
        <article>
          <h2 className="visually-hidden">Twoje listy</h2>
          <ul className="favourite-lists__list">
            {state.favouriteLists.map((list, index) => {
              return (
                <React.Fragment key={list.name + list.lastEdit}>
                  {index > 0 && <List list={list} />}
                </React.Fragment>
              );
            })}
          </ul>
        </article>
      )}
    </>
  );
}

type ListPropsType = {
  list: FavouritesListType;
  isMainList?: boolean;
};

function List({ list, isMainList = false }: ListPropsType) {
  const { dispatch } = useApp();
  const { openModal, setModalData } = useModal();
  const { width } = useWindowSize();

  function openListControlMenu() {
    dispatch({ type: "setEditingList", payload: list });

    openModal();
    setModalData({
      type: "list-control",
    });
  }

  return (
    <section className="favourite-list">
      <a
        href="#"
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
            <h4 className="favourite-list__header">{list.name}</h4>
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
              <Btn>Zobacz</Btn>
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
      </a>
    </section>
  );
}
