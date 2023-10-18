// Components
import Btn from "../../components/Btn/Btn";
// Style
import "./index.scss";

export default function HomePage() {
  return (
    <article className="articles">
      <h2 className="visually-hidden">Strona Główna</h2>
      <section className="article">
        <h3 className="visually-hidden">Witaj w nowym lepszym domu!</h3>
        <div className="article__img-container">
          <img
            sizes="(max-width: 1055px) 100vw, 1055px"
            srcSet="
                /images/collections/1/collection_asjspy_c_scale,w_280.avif 280w,
                /images/collections/1/collection_asjspy_c_scale,w_629.avif 629w,
                /images/collections/1/collection_asjspy_c_scale,w_1025.avif 1025w,
                /images/collections/1/collection_asjspy_c_scale,w_1055.avif 1055w"
            src="/images/collections/1/collection_asjspy_c_scale,w_1055.avif"
            alt="Some Description"
            loading="lazy"
          />
        </div>
        <div className="article__text-container">
          <strong className="article__heading">Nowa niższa cena</strong>
          <p className="article__text">
            Wciąż wprowadzamy pomysłowe rozwiązania i ulepszamy procesy, dzięki czemu obniżamy
            koszty. To pozwoliło nam obniżyć ceny dziesiątek produktów
          </p>
          <Btn
            text="Zobacz wszystkie produkty z niższą ceną"
            variant="light"
          />
        </div>
      </section>

      <section className="article">
        <h3 className="article__heading">Przygotuj sie na jesienne domowanie z IKEA</h3>
      </section>
    </article>
  );
}
