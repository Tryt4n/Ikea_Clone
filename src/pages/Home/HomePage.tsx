// Components
import Article from "../../components/Article/Article";
// Icons
import SaleIcon from "../../Icons/SaleIcon";
import Shop2Icon from "../../Icons/Shop2Icon";
import ShoppingCart2Icon from "../../Icons/ShoppingCart2Icon";
import TruckIcon from "../../Icons/TruckIcon";
// Style
import "./index.scss";

export default function HomePage() {
  return (
    <div className="articles">
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

      <article>
        <h2 className="article__heading">Przygotuj sie na jesienne domowanie z IKEA</h2>
      </article>

      <article>
        <h2 className="article__heading">
          Dołącz do klubu IKEA Family i korzystaj ze wszystkich korzyści
        </h2>
      </article>

      <article>
        <h2 className="article__heading">Wasze wnętrza</h2>
      </article>

      <article>
        <h2 className="article__heading">Aktualnie w IKEA</h2>
      </article>

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

      <article>
        <h2 className="article__heading">Wybierz przestrzeń, którą chcesz zaprojektować</h2>
      </article>

      <Article>
        <Article.Header>Zakupowe korzyści w IKEA</Article.Header>
        <Article.Body>
          <Article.Section>
            <ShoppingCart2Icon />
            <Article.Header headingLevel={3}>3 lub 6 rat 0% na stałe w IKEA</Article.Header>
            <Article.Text>Nie musisz płacić od razu – zapłać w wygodnych ratach.</Article.Text>
            <Article.Link href="#" />
          </Article.Section>
          <Article.Section>
            <TruckIcon />
            <Article.Header headingLevel={3}>Dostawa już od 1,-</Article.Header>
            <Article.Text>
              Zamów z dostawą za 1,- do Paczkomatu InPost (przy zakupach za min. 69,-) lub za 5,- do
              Punktu Odbioru GLS lub kurierem na wybrany adres (przy zakupach za min. 119,-).
            </Article.Text>
            <Article.Link href="#" />
          </Article.Section>
          <Article.Section>
            <Shop2Icon />
            <Article.Header headingLevel={3}>Zamów i odbierz</Article.Header>
            <Article.Text>Zrób zakupy przez Internet i odbierz je w Punkcie Odbioru.</Article.Text>
            <Article.Link href="#" />
          </Article.Section>
          <Article.Section>
            <SaleIcon />
            <Article.Header headingLevel={3}>Okazje na Okrągło</Article.Header>
            <Article.Text>Podaruj meblom nowe życie w nowym domu.</Article.Text>
            <Article.Link href="#" />
          </Article.Section>
        </Article.Body>
      </Article>

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

      <article>
        <h2 className="article__heading">Aranżacje wnętrz i inspiracje</h2>
      </article>
    </div>
  );
}
