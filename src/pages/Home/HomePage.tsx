// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, FreeMode, Mousewheel, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// Hooks
import useWindowSize from "../../hooks/useWindowSize";
// Components
import Article from "../../components/Article/Article";
import CardsContainer from "../../components/Card/CardsContainer";
import Card from "../../components/Card/Card";
// Icons
import SaleIcon from "../../Icons/SaleIcon";
import Shop2Icon from "../../Icons/Shop2Icon";
import ShoppingCart2Icon from "../../Icons/ShoppingCart2Icon";
import TruckIcon from "../../Icons/TruckIcon";
import ArrowRightIcon from "../../Icons/ArrowRightIcon";
// Style
import "./index.scss";

export default function HomePage() {
  const { width } = useWindowSize();

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
            <Article.Btn variant="light">Zobacz wszystkie produkty z niższą ceną</Article.Btn>
          </Article.TextContainer>
        </Article.Body>
      </Article>

      {/* //? Carousel */}
      <Article>
        <Article.Header>Przygotuj sie na jesienne domowanie z IKEA</Article.Header>
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={20}
          freeMode={true}
          mousewheel={true}
          navigation={true}
          scrollbar={{ hide: true }}
          keyboard={{
            enabled: true,
          }}
          modules={[Navigation, Scrollbar, Keyboard, FreeMode, Mousewheel, A11y]}
          breakpoints={{
            400: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            800: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1080: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1360: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            1680: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <Article.Slide variant="accent">
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.Header headingLevel={3}>Produkt z nową niższą ceną</Article.Header>
                <Article.SlideBtn
                  variant="light"
                  shape="circle"
                >
                  <ArrowRightIcon />
                </Article.SlideBtn>
              </Article.Link>
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Meble modułowe BESTÅ</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_1/modular-furnitures.avif"
                alt="Meble modułowe BESTÅ"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Dekoracje</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_1/decorations.avif"
                alt="Dekoracje"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Sofy i narożniki</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_1/sofas.avif"
                alt="Sofy i narożniki"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Oświetlenie</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_1/lightning.avif"
                alt="Oświetlenie"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Tekstylia</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_1/textiles.avif"
                alt="Tekstylia"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Fotele i szezlongi</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_1/chairs.avif"
                alt="Fotele i szezlongi"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Dywany</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_1/carpets.avif"
                alt="Dywany"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Drobne przechowywanie</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_1/containers.avif"
                alt="Drobne przechowywanie"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Stoliki kawowe</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_1/coffee-tables.avif"
                alt="Stoliki kawowe"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>
        </Swiper>
      </Article>

      <Article>
        <Article.Header>
          Dołącz do klubu IKEA Family i korzystaj ze wszystkich korzyści
        </Article.Header>

        <CardsContainer>
          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={20}
            freeMode={true}
            mousewheel={true}
            navigation={true}
            scrollbar={{ hide: true }}
            keyboard={{
              enabled: true,
            }}
            modules={[Navigation, Scrollbar, Keyboard, FreeMode, Mousewheel, A11y]}
            breakpoints={{
              600: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20,
              },
              900: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 8,
              },
            }}
            className="mySwiper2"
          >
            <SwiperSlide>
              <Card
                as="link"
                href="#"
              >
                <Card.Img
                  src="/images/scrollbars/IKEA_Family_club/1.avif"
                  alt=""
                />
                <Card.TextContainer>
                  <div>
                    <Card.Heading>
                      Rabat 15% na zasłony, koce, poduszki i inne tekstylia dekoracyjne przy zakupie
                      za min. 20 zł
                    </Card.Heading>
                    <Card.Text>
                      Oferta obowiązuje od 13.10.2023 do 18.11.2023 dla nowych i obecnych
                      Klubowiczów IKEA Family i IKEA Business Network. Szczegóły w regulaminie.
                    </Card.Text>
                  </div>
                  <Card.Btn />
                </Card.TextContainer>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card
                as="link"
                href="#"
              >
                <Card.Img
                  src="/images/scrollbars/IKEA_Family_club/2.avif"
                  alt=""
                />
                <Card.TextContainer>
                  <div>
                    <Card.Heading>
                      Rabat 15% na kołdry, poduszki, pościele i inne tekstylia do sypialni przy
                      zakupie za min. 20 zł
                    </Card.Heading>
                    <Card.Text>
                      Oferta obowiązuje od 13.10.2023 do 18.11.2023 dla nowych i obecnych
                      Klubowiczów IKEA Family i IKEA Business Network. Szczegóły w regulaminie.
                    </Card.Text>
                  </div>
                  <Card.Btn />
                </Card.TextContainer>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card
                as="link"
                href="#"
              >
                <Card.Img
                  src="/images/scrollbars/IKEA_Family_club/3.avif"
                  alt=""
                />
                <Card.TextContainer>
                  <div>
                    <Card.Heading>Klubowicze IKEA Family mogą więcej</Card.Heading>
                    <Card.Text>
                      Spełnij marzenie o stylowych i funkcjonalnych wnętrzach dzięki specjalnym
                      ofertom i inspiracjom, które czekają na ciebie w IKEA Family. Dołącz do Klubu
                      i poczuj się jak w domu.
                    </Card.Text>
                  </div>
                  <Card.Btn />
                </Card.TextContainer>
              </Card>
            </SwiperSlide>
          </Swiper>
        </CardsContainer>
      </Article>

      <article>
        <h2 className="article__heading">Wasze wnętrza</h2>
      </article>

      <Article>
        <Article.Header>Aktualnie w IKEA</Article.Header>

        <CardsContainer breakOnMobile={true}>
          <Swiper
            slidesPerView={0}
            slidesPerGroup={0}
            freeMode={width >= 600 && true}
            mousewheel={width >= 600 && true}
            navigation={width >= 600 && true}
            scrollbar={width >= 600 && { hide: true }}
            keyboard={
              width >= 600 && {
                enabled: true,
              }
            }
            modules={
              width >= 600
                ? [Navigation, Scrollbar, Keyboard, FreeMode, Mousewheel, A11y]
                : undefined
            }
            breakpoints={{
              600: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 8,
              },
              900: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 20,
              },
            }}
            className="mySwiper3"
          >
            <SwiperSlide>
              <Card
                as="link"
                href="#"
                variant="light-brown"
              >
                <Card.Img
                  src="/images/scrollbars/currently/1.avif"
                  alt=""
                />
                <Card.TextContainer>
                  <div>
                    <Card.Heading>Sezon na domowanie z IKEA</Card.Heading>
                    <Card.Text>
                      Gdy zbliża się jesień, brak planów to najlepszy plan na wieczór. Niezależnie
                      od tego, czy wolisz długo ucztować z bliskimi przy stole, urządzić serialowy
                      seans na kanapie czy poświęcić się nowemu hobby – w IKEA znajdziesz wszystko,
                      czego potrzebujesz
                    </Card.Text>
                  </div>
                  <Card.Btn variant="dark" />
                </Card.TextContainer>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card
                as="link"
                href="#"
                variant="brown"
              >
                <Card.Img
                  src="/images/scrollbars/currently/2.avif"
                  alt=""
                />
                <Card.TextContainer>
                  <div>
                    <Card.Heading>
                      Zmiany w wystroju? Nieskończone możliwości czekają w IKEA Kreativ!
                    </Card.Heading>
                    <Card.Text>
                      Otwórz się na zupełnie nowe możliwości w aranżacji wnętrz – skanuj
                      pomieszczenia, wymaż niepotrzebne przedmioty i puść wodze wyobraźni w
                      interaktywnej przestrzeni wirtualnej.
                    </Card.Text>
                  </div>
                  <Card.Btn />
                </Card.TextContainer>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card
                as="link"
                href="#"
                variant="violet"
              >
                <Card.Img
                  src="/images/scrollbars/currently/3.avif"
                  alt=""
                />
                <Card.TextContainer>
                  <div>
                    <Card.Heading>Kolekcja AFTONSPARV dotarła na Ziemię!</Card.Heading>
                    <Card.Text>
                      Dołącz do programu kosmicznego IKEA na największym placu zabaw we
                      wszechświecie – w swojej wyobraźni! Astronauci, statki kosmiczne, rakiety i
                      świecąca w ciemności zasłona pozwolą ci wyruszyć w podróż tam, gdzie wszystko
                      jest możliwe.
                    </Card.Text>
                  </div>
                  <Card.Btn variant="dark" />
                </Card.TextContainer>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card
                as="link"
                href="#"
                variant="yellow"
              >
                <Card.Img
                  src="/images/scrollbars/currently/4.avif"
                  alt=""
                />
                <Card.TextContainer>
                  <div>
                    <Card.Heading>Zaprojektowane przez IKEA – wykonane w Polsce</Card.Heading>
                    <Card.Text>
                      Czy wiesz, że co piąty mebel IKEA powstaje w Polsce? Celebrujemy ponad 60 lat
                      obecności IKEA w Polsce – dowiedz się więcej o współpracy, której efektem są
                      tysiące miejsc pracy w kraju oraz miliony lepiej pomyślanych produktów
                      wykonanych w Polsce.
                    </Card.Text>
                  </div>
                  <Card.Btn variant="dark" />
                </Card.TextContainer>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card
                as="link"
                href="#"
                variant="light-yellow"
              >
                <Card.Img
                  src="/images/scrollbars/currently/5.avif"
                  alt=""
                />
                <Card.TextContainer>
                  <div>
                    <Card.Heading>IKEA to więcej niż sklep</Card.Heading>
                    <Card.Text>
                      Co sprawia, że miliony ludzi na całym świecie uwielbiają wizyty w IKEA?
                      Zobacz, co czeka na ciebie w naszych sklepach i zaplanuj odwiedziny!
                    </Card.Text>
                  </div>
                  <Card.Btn variant="dark" />
                </Card.TextContainer>
              </Card>
            </SwiperSlide>
          </Swiper>
        </CardsContainer>
      </Article>

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
            <Article.Btn>Pierwszy krok do lepszej organizacji</Article.Btn>
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

      {/* //? Carousel */}
      <Article>
        <Article.Header>Wybierz przestrzeń, którą chcesz zaprojektować</Article.Header>
        <Swiper
          slidesPerView={2}
          slidesPerGroup={2}
          spaceBetween={20}
          freeMode={true}
          mousewheel={true}
          navigation={true}
          scrollbar={{ hide: true }}
          keyboard={{
            enabled: true,
          }}
          modules={[Navigation, Scrollbar, Keyboard, FreeMode, Mousewheel, A11y]}
          breakpoints={{
            800: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1080: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1360: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            1680: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
          }}
          className="mySwiper4"
        >
          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.Header headingLevel={3}>Ty wybierasz, my projektujemy</Article.Header>
                <Article.SlideBtn
                  shape="circle"
                  variant="dark"
                >
                  <ArrowRightIcon />
                </Article.SlideBtn>
              </Article.Link>
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Planowanie szafy</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_2/wardrobes.webp"
                alt="Planowanie szafy"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Kuchnia</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_2/kitchen.avif"
                alt="Kuchnia"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Pokój dzienny</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_2/living-room.avif"
                alt="Pokój dzienny"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Sypialnia</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_2/bedroom.avif"
                alt="Sypialnia"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Domowe biuro</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_2/home-office.webp"
                alt="Domowe biuro"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Pokój dziecięcy</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_2/childrens-room.avif"
                alt="Pokój dziecięcy"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Projektowanie mieszkania</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_2/apartment-design.avif"
                alt="Projektowanie mieszkania"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <Article.SlideBtn variant="light">Przestrzeń biznesowa</Article.SlideBtn>
              </Article.Link>
              <img
                src="images/scrollbars/scrollbar_2/business-space.avif"
                alt="Przestrzeń biznesowa"
                loading="lazy"
              />
            </Article.Slide>
          </SwiperSlide>
        </Swiper>
      </Article>

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
            <Article.Btn>Dołącz do IKEA Business Network</Article.Btn>
          </Article.TextContainer>
        </Article.Body>
      </Article>

      <article>
        <h2 className="article__heading">Aranżacje wnętrz i inspiracje</h2>
      </article>
    </div>
  );
}
