// Components
import Article from "../../components/Article/Article";
// Style
import "./index.scss";

export default function HomePage() {
  return (
    <article className="articles">
      <h2 className="visually-hidden">Strona Główna</h2>

      <Article>
        <Article.Body>
          <Article.ImgContainer>
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
          </Article.ImgContainer>

          <Article.TextContainer variant="accent">
            <Article.Header>Nowa niższa cena</Article.Header>
            <Article.Text>
              Wciąż wprowadzamy pomysłowe rozwiązania i ulepszamy procesy, dzięki czemu obniżamy
              koszty. To pozwoliło nam obniżyć ceny dziesiątek produktów
            </Article.Text>
            <Article.Btn>Zobacz wszystkie produkty z niższą ceną</Article.Btn>
          </Article.TextContainer>
        </Article.Body>
      </Article>

      <section>
        <h3 className="article__heading">Przygotuj sie na jesienne domowanie z IKEA</h3>
      </section>

      <section>
        <h3 className="article__heading">
          Dołącz do klubu IKEA Family i korzystaj ze wszystkich korzyści
        </h3>
      </section>

      <section>
        <h3 className="article__heading">Wasze wnętrza</h3>
      </section>

      <section>
        <h3 className="article__heading">Aktualnie w IKEA</h3>
      </section>

      <Article>
        <Article.Body>
          <Article.ImgContainer>
            <img
              src="/images/organization_ideas/organization.avif"
              alt="Kolaż z kolorowymi kwadrantami i wycinankami zdjęć ludzi."
              loading="lazy"
            />
          </Article.ImgContainer>

          <Article.TextContainer>
            <Article.Header>
              Hej! Szukasz pomysłów na przechowywanie i organizację w domu?
            </Article.Header>
            <Article.Text>
              W każdym bałaganie kryją się nowe możliwości. Zainspiruj się do stworzenia
              uporządkowanej i dobrze zorganizowanej przestrzeni – tutaj znajdziesz pomysły i
              wskazówki, jak zorganizować przestrzeń po swojemu!
            </Article.Text>
            <Article.Btn variant="dark">Pierwszy krok do lepszej organizacji</Article.Btn>
          </Article.TextContainer>
        </Article.Body>
      </Article>

      <Article>
        <Article.Header>
          Nowości z przeszłości - odkryj drugą odsłone archiwalnych projektów IKEA
        </Article.Header>
        <Article.Body>
          <Article.ImgContainer>
            <img
              src="/images/collections/2/collection.avif"
              alt="Dwa fotele SKÅLBODA, klosz lampy wiszącej HAVSFJÄDER i inne produkty z drugiej premiery kolekcji Nytillverkad."
              loading="lazy"
            />
          </Article.ImgContainer>
        </Article.Body>
      </Article>

      <section>
        <h3 className="article__heading">Wybierz przestrzeń, którą chcesz zaprojektować</h3>
      </section>

      <section>
        <h3 className="article__heading">Zakupowe korzyści w IKEA</h3>
      </section>

      <Article>
        <Article.Body className="col-reverse">
          <Article.ImgContainer>
            <img
              src="/images/for_business/office.avif"
              alt="Office"
              loading="lazy"
            />
          </Article.ImgContainer>

          <Article.TextContainer>
            <Article.Header>IKEA dla Firm</Article.Header>
            <Article.Text>
              Dołącz do IKEA Business Network i poznaj korzyści dedykowane dla małych i dużych
              przedsiębiorców.
            </Article.Text>
            <Article.Btn variant="dark">Dołącz do IKEA Business Network</Article.Btn>
          </Article.TextContainer>
        </Article.Body>
      </Article>

      <section>
        <h3 className="article__heading">Aranżacje wnętrz i inspiracje</h3>
      </section>
    </article>
  );
}
