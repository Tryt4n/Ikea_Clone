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
// Style
import "./index.scss";

export default function FavouriteLists() {
  const { state } = useApp();
  const { openModal, setModalData } = useModal();
  const { width } = useWindowSize();

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
            <section className="favourite-list">
              <div className="favourite-list__inner-wrapper">
                <HeartIcon />
                <p>Ta lista potrzebuje odrobiny miłości</p>
              </div>

              <div className="favourite-list__description">
                <div>
                  <h4 className="favourite-list__header">{state.favouriteLists[0].name}</h4>
                  <time
                    dateTime={state.favouriteLists[
                      state.favouriteLists.length - 1
                    ].createdAt.toString()}
                    className="favourite-list__time"
                  >
                    Zaktualizowano&nbsp;
                    {formatDistanceToNow(new Date(state.favouriteLists[0].createdAt), {
                      addSuffix: true,
                      locale: pl,
                    })}
                  </time>
                </div>

                <Btn>Zobacz</Btn>
                <Btn
                  shape="circle"
                  variant="gray"
                  className="favourite-list__btn-menu"
                >
                  <span className="visually-hidden">Otwórz menu listy</span>
                  <TripleDotsMenuIcon />
                </Btn>
              </div>
            </section>
          )}
        </div>
      </article>

      {state.favouriteLists && state.favouriteLists.length > 0 && (
        <article>
          <h2 className="visually-hidden">Twoje listy</h2>
          <ul className="favourite-lists__list">
            {state.favouriteLists.map((list, index) => {
              return (
                <React.Fragment key={list.name + list.createdAt}>
                  {index > 0 && (
                    <li>
                      <section className="favourite-list">
                        <div className="favourite-list__inner-wrapper">
                          <HeartIcon />
                          {width >= 600 && <p>Ta lista potrzebuje odrobiny miłości</p>}
                        </div>

                        <div className="favourite-list__description">
                          <div>
                            <h4 className="favourite-list__header">{list.name}</h4>
                            <time
                              dateTime={list.createdAt.toString()}
                              className="favourite-list__time"
                            >
                              Zaktualizowano&nbsp;
                              {formatDistanceToNow(new Date(list.createdAt), {
                                addSuffix: true,
                                locale: pl,
                              })}
                            </time>
                          </div>

                          <Btn
                            shape="circle"
                            variant="gray"
                          >
                            <span className="visually-hidden">Przejdź do listy {list.name}</span>
                            <ArrowRightIcon />
                          </Btn>
                        </div>
                      </section>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </article>
      )}
    </>
  );
}
