// Components
import Btn from "../../components/Btn/Btn";
// Icons
import HeartIcon from "../../Icons/HeartIcon";
// Style
import "./index.scss";

export default function WishList() {
  return (
    <article className="wish-list">
      <hgroup className="wish-list__header">
        <h2>Hej!</h2>
        <p>Zacznij organizować swoją wymarzoną przestrzeń.</p>
      </hgroup>

      <section className="wish-list__content-wrapper">
        <HeartIcon />

        <h3>Wiele list, jeden dom</h3>

        <p>
          Znajdź wszystkie swoje listy w jednym miejscu. Podziel swoje ulubione listy na kategorie i
          zapisz je tutaj.
        </p>
        <p>Nie możesz znaleźć swoich list? Upewnij się, że jesteś zalogowany.</p>

        <div className="wish-list__btns-wrapper">
          <Btn variant="white-with-border">Zaloguj się</Btn>
          <Btn>Stwórz listę</Btn>
        </div>
      </section>
    </article>
  );
}
