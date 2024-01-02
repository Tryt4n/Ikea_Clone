// Custom Hooks
import useApp from "../../hooks/useApp";
import useModal from "../../hooks/useModal";
// Components
import FavouriteList from "../../components/features/FavouriteList/FavouriteList";
import { Btn } from "../../components/ui/Btn/Btn";
// Icons
import HeartIcon from "../../Icons/HeartIcon";
// Style
import "./index.scss";

export default function FavouriteLists() {
  const { state } = useApp();

  return (
    <div style={{ minHeight: "90vh" }}>
      <MainList />

      {state.favouriteLists && state.favouriteLists.length > 1 && <OtherLists />}
    </div>
  );
}

function MainList() {
  const { state } = useApp();

  return (
    <article className="favourite-lists">
      <hgroup className="favourite-lists__header">
        <h2>Hej!</h2>
        <p>Zacznij organizować swoją wymarzoną przestrzeń.</p>
      </hgroup>

      <div className="favourite-lists__container">
        <ListCreation />

        {state.favouriteLists && state.favouriteLists.length > 0 && (
          <FavouriteList
            list={state.favouriteLists[0]}
            isMainList
          />
        )}
      </div>
    </article>
  );
}

function OtherLists() {
  const { state } = useApp();

  return (
    <>
      {state.favouriteLists && (
        <article>
          <h2 className="visually-hidden">Twoje listy</h2>
          <ul className="favourite-lists__list">
            {state.favouriteLists.map((list, index) => {
              if (index === 0) return null;

              return (
                <li key={list.name + list.lastEdit}>
                  {index > 0 && <FavouriteList list={list} />}
                </li>
              );
            })}
          </ul>
        </article>
      )}
    </>
  );
}

function ListCreation() {
  const { setModalData } = useModal();

  function openCreateListModal() {
    setModalData({ type: "create-list" });
  }

  return (
    <section className="favourite-lists__content-wrapper">
      <HeartIcon />
      <h3>Wiele list, jeden dom</h3>
      <p>
        Znajdź wszystkie swoje listy w jednym miejscu. Podziel swoje ulubione listy na kategorie i
        zapisz je tutaj.
      </p>
      <p>Nie możesz znaleźć swoich list? Upewnij się, że jesteś zalogowany.</p>
      <div className="favourite-lists__btns-wrapper">
        <Btn onClick={openCreateListModal}>Stwórz listę</Btn>
        <Btn variant="white-with-border">Zaloguj się</Btn>
      </div>
    </section>
  );
}
