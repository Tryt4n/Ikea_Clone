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
import CollectionNameContainer from "../../components/CollectionProducts/components/CollectionNameContainer";
import Collection from "../../components/CollectionProducts/components/Collection";
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
          <Article.Header className="visually-hidden">Witaj w nowym lepszym domu</Article.Header>
          <Article.ImgContainer>
            <Article.Img
              sizes="(max-width: 1600px) 100vw, 1600px"
              srcSet="
                /images/collections/1/collection_rzilav_c_scale,w_320.avif 320w,
                /images/collections/1/collection_rzilav_c_scale,w_744.avif 744w,
                /images/collections/1/collection_rzilav_c_scale,w_1010.avif 1010w,
                /images/collections/1/collection_rzilav_c_scale,w_1351.avif 1351w,
                /images/collections/1/collection_rzilav_c_scale,w_1561.avif 1561w,
                /images/collections/1/collection_rzilav_c_scale,w_1600.avif 1600w"
              src="/images/collections/1/collection_rzilav_c_scale,w_1600.avif"
              alt="Urządzony salon"
              aspectRatioMobile="3/4"
            />

            <Collection>
              <Collection.ListItem
                top="23.3%"
                left="37.0677%"
                descriptionContainerId="list-item-1_main"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-1_main"
                  linkToProduct="#"
                  placeBottomRight
                >
                  <Collection.ListItemTag variant="red">Nowa niższa cena</Collection.ListItemTag>
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>Eket </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>Szafka ścienna</Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice price={80} />
                  <Collection.ListItemLastPriceDescription lastPrice={105} />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>

              <Collection.ListItem
                top="30.4%"
                left="50.3%"
                descriptionContainerId="list-item-2_main"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-2_main"
                  linkToProduct="#"
                  placeBottomCenter
                >
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>Konstfull </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>Wazon</Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice
                    price={59}
                    priceDecimal={99}
                  />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>

              <Collection.ListItem
                top="75.8%"
                left="17.2%"
                descriptionContainerId="list-item-3_main"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-3_main"
                  linkToProduct="#"
                  placeTopRight
                >
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>Kivik </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>
                      1o sofa rozkładana
                    </Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice price={1899} />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>

              <Collection.ListItem
                top="68.7%"
                left="43.3%"
                descriptionContainerId="list-item-4_main"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-4_main"
                  linkToProduct="#"
                  placeTopCenter
                >
                  <Collection.ListItemTag variant="red">Nowa niższa cena</Collection.ListItemTag>
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>BESTÅ </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>
                      Kombinacja z drzwiami
                    </Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice price={710} />
                  <Collection.ListItemLastPriceDescription lastPrice={763} />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>

              <Collection.ListItem
                top="92.1%"
                left="58.3%"
                descriptionContainerId="list-item-5_main"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-5_main"
                  linkToProduct="#"
                  placeTopCenter
                >
                  <Collection.ListItemTag variant="red">Nowa niższa cena</Collection.ListItemTag>
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>Gladom </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>Stolik z tacą</Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice
                    price={69}
                    priceDecimal={99}
                  />
                  <Collection.ListItemLastPriceDescription
                    lastPrice={89}
                    lastPriceDecimal={99}
                  />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>
            </Collection>
          </Article.ImgContainer>

          <Article.TextContainer variant="accent">
            <Article.Header>Nowa niższa cena</Article.Header>
            <Article.Text>
              Wciąż wprowadzamy pomysłowe rozwiązania i ulepszamy procesy, dzięki czemu obniżamy
              koszty. To pozwoliło nam obniżyć ceny dziesiątek produktów
            </Article.Text>
            <Article.Btn
              href="#"
              variant="light"
            >
              Zobacz wszystkie produkty z niższą ceną
            </Article.Btn>
          </Article.TextContainer>
        </Article.Body>
      </Article>

      <Article>
        <Article.Header>Przygotuj sie na jesienne domowanie z IKEA</Article.Header>
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
                <span className="visually-hidden">Meble modułowe BESTÅ</span>
                <Article.SlideBtn variant="light">Meble modułowe BESTÅ</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_1/modular-furnitures.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Dekoracje</span>
                <Article.SlideBtn variant="light">Dekoracje</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_1/decorations.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Sofy i narożniki</span>
                <Article.SlideBtn variant="light">Sofy i narożniki</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_1/sofas.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Oświetlenie</span>
                <Article.SlideBtn variant="light">Oświetlenie</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_1/lightning.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Tekstylia</span>
                <Article.SlideBtn variant="light">Tekstylia</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_1/textiles.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Fotele i szezlongi</span>
                <Article.SlideBtn variant="light">Fotele i szezlongi</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_1/chairs.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Dywany</span>
                <Article.SlideBtn variant="light">Dywany</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_1/carpets.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Drobne przechowywanie</span>
                <Article.SlideBtn variant="light">Drobne przechowywanie</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_1/containers.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Stoliki kawowe</span>
                <Article.SlideBtn variant="light">Stoliki kawowe</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_1/coffee-tables.avif"
                alt=""
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
            freeMode={width < 900 && true}
            mousewheel={width < 900 && true}
            navigation={width < 900 && true}
            scrollbar={width < 900 && { hide: true }}
            keyboard={
              width < 900 && {
                enabled: true,
              }
            }
            modules={
              width < 900
                ? [Navigation, Scrollbar, Keyboard, FreeMode, Mousewheel, A11y]
                : undefined
            }
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
                variant="blue"
              >
                <Card.Img
                  src="/images/scrollbars/IKEA_Family_club/1.avif"
                  alt="Krzesło przykryte częściowo kocem"
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
                variant="blue"
              >
                <Card.Img
                  src="/images/scrollbars/IKEA_Family_club/2.avif"
                  alt="Łóżko"
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
                variant="blue"
              >
                <Card.Img
                  src="/images/scrollbars/IKEA_Family_club/3.avif"
                  alt="Rodzina przy stole"
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

      <Article>
        <Article.Header>Wasze wnętrza</Article.Header>
        <Article.SubHeader>
          Przeglądaj aranżacje wnętrz klientów na podstawie ostatnio przeglądanych produktów.
        </Article.SubHeader>

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
            },
            1100: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1500: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }}
          className="mySwiper3"
        >
          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/1/UGC100009357.avif"
                alt="Zdjęcie użytkownika AdventureSoul82"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>AdventureSoul82</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  top="50%"
                  right="9%"
                  descriptionContainerId="JÄTTELIK-pluszak"
                >
                  <Collection.ListItemDescriptionContainer
                    id="JÄTTELIK-pluszak"
                    linkToProduct="#"
                    placeLeftCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>JÄTTELIK </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Pluszak, 44cm</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={29}
                      priceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/2/UGC100008730.avif"
                alt="Zdjęcie użytkownika FashionistaGlobe"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>FashionistaGlobe</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  left="30%"
                  bottom="27.5%"
                  descriptionContainerId="SOARÉ-podkladka"
                >
                  <Collection.ListItemDescriptionContainer
                    id="SOARÉ-podkladka"
                    linkToProduct="#"
                    placeBottomCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">Top Seller</Collection.ListItemTag>
                      <Collection.ListItemHeading>SOARÉ </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Podkładka, 37 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={19}
                      priceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  bottom="0%"
                  right="35%"
                  descriptionContainerId="RINNIG-scierka"
                >
                  <Collection.ListItemDescriptionContainer
                    id="RINNIG-scierka"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>RINNIG </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Ścierka, 45x60 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={14}
                      priceDecimal={99}
                      quantity={4}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  top="58%"
                  right="30%"
                  descriptionContainerId="KORKEN-sloik_z_pokrywka"
                >
                  <Collection.ListItemDescriptionContainer
                    id="KORKEN-sloik_z_pokrywka"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>KORKEN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Słoik z pokrywką, 1 l
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={12}
                      priceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  top="55%"
                  left="39%"
                  descriptionContainerId="VARDAGEN-sloik_z_pokrywka"
                >
                  <Collection.ListItemDescriptionContainer
                    id="VARDAGEN-sloik_z_pokrywka"
                    linkToProduct="#"
                    placeTopLeft
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>VARDAGEN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Słoik z pokrywką, 1.9 l
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={19}
                      priceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/3/UGC100009307.avif"
                alt="Zdjęcie użytkownika TechGeniusNinja"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>TechGeniusNinja</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  left="15%"
                  bottom="0"
                  descriptionContainerId="ALSEDA-stolek"
                >
                  <Collection.ListItemDescriptionContainer
                    id="ALSEDA-stolek"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>ALSEDA </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Stołek</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={159} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/4/UGC100026647.avif"
                alt="Zdjęcie użytkownika FitnessFervor365"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>FitnessFervor365</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  left="36%"
                  bottom="10%"
                  descriptionContainerId="GRADVIS-wazon"
                >
                  <Collection.ListItemDescriptionContainer
                    id="GRADVIS-wazon"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>GRADVIS </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Wazon z metalowym wkładem, 21 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={49}
                      priceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/5/UGC100007426.avif"
                alt="Zdjęcie użytkownika ArtisticVoyager"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>ArtisticVoyager</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  left="21%"
                  bottom="24.5%"
                  descriptionContainerId="ENERYDA-uchwyt"
                >
                  <Collection.ListItemDescriptionContainer
                    id="ENERYDA-uchwyt"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>ENERYDA </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Uchwyt, 89 mm</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={20}
                      quantity={2}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  left="17.5%"
                  bottom="7%"
                  descriptionContainerId="BODBYN-front-szuflady_60x40"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BODBYN-front-szuflady_60x40"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Front szuflady, 60x40 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={115} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  right="17.5%"
                  bottom="2.5%"
                  descriptionContainerId="BODBYN-front-szuflady_60x20"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BODBYN-front-szuflady_60x20"
                    linkToProduct="#"
                    placeTopLeft
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Front szuflady, 60x20 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={80} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  right="46%"
                  bottom="10%"
                  descriptionContainerId="BODBYN-front-szuflady_80x40"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BODBYN-front-szuflady_80x40"
                    linkToProduct="#"
                    placeTopCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Front szuflady, 80x40 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={140} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/6/UGC100009091.avif"
                alt="Zdjęcie użytkownika MusicMaven88"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>MusicMaven88</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  left="32%"
                  bottom="50%"
                  descriptionContainerId="MALM-komoda"
                >
                  <Collection.ListItemDescriptionContainer
                    id="MALM-komoda"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>MALM </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Komoda, 2 szuflady, 40x55 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={279} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  right="33%"
                  bottom="15%"
                  descriptionContainerId="MALM-rama-lozka"
                >
                  <Collection.ListItemDescriptionContainer
                    id="MALM-rama-lozka"
                    linkToProduct="#"
                    placeTopCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">
                        Nowa niższa cena
                      </Collection.ListItemTag>
                      <Collection.ListItemHeading>MALM </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Rama łóżka z 2 pojemnikami, 120x200 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={1249} />
                    <Collection.ListItemLastPriceDescription lastPrice={1449} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/7/UGC100008065.avif"
                alt="Zdjęcie użytkownika FoodieExplorer"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>FoodieExplorer</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  right="25%"
                  bottom="19%"
                  descriptionContainerId="TOFTLUND-dywan"
                >
                  <Collection.ListItemDescriptionContainer
                    id="TOFTLUND-dywan"
                    linkToProduct="#"
                    placeLeftCenter
                  >
                    <Collection.ListItemTag variant="red">Top Seller</Collection.ListItemTag>
                    <Collection.ListItemTag variant="red">Nowa niższa cena</Collection.ListItemTag>
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>TOFTLUND </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Dywan, 55x85 cm</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={39}
                      priceDecimal={99}
                    />
                    <Collection.ListItemLastPriceDescription
                      lastPrice={49}
                      lastPriceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  right="15%"
                  bottom="40%"
                  descriptionContainerId="STRANDMON-fotel"
                >
                  <Collection.ListItemDescriptionContainer
                    id="STRANDMON-fotel"
                    linkToProduct="#"
                    placeTopLeft
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">Top Seller</Collection.ListItemTag>
                      <Collection.ListItemHeading>STRANDMON </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Fotel uszak</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={899} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/8/UGC100019561.avif"
                alt="Zdjęcie użytkownika WanderlustDreamer"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>WanderlustDreamer</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  left="18.25%"
                  top="20%"
                  descriptionContainerId="ENERYDA-galka"
                >
                  <Collection.ListItemDescriptionContainer
                    id="ENERYDA-galka"
                    linkToProduct="#"
                    placeRightCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>ENERYDA </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Gałka, 27 mm</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={15}
                      quantity={2}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  right="-2%"
                  bottom="34%"
                  descriptionContainerId="BODBYN-front-szuflady-80x20"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BODBYN-front-szuflady-80x20"
                    linkToProduct="#"
                    placeTopLeft
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Front szuflady, 80x20 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={95} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  right="40%"
                  bottom="16.5%"
                  descriptionContainerId="BODBYN-front-szuflady-60x40_2"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BODBYN-front-szuflady-60x40_2"
                    linkToProduct="#"
                    placeTopLeft
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Front szuflady, 60x40 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={115} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  right="6.5%"
                  bottom="29.5%"
                  descriptionContainerId="ENERYDA-uchwyt_23"
                >
                  <Collection.ListItemDescriptionContainer
                    id="ENERYDA-uchwyt_23"
                    linkToProduct="#"
                    placeBottomLeft
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>ENERYDA </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Uchwyt, 89 mm</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={20}
                      quantity={2}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  left="23%"
                  bottom="40%"
                  descriptionContainerId="SÄLJAN-blat"
                >
                  <Collection.ListItemDescriptionContainer
                    id="SÄLJAN-blat"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">Top Seller</Collection.ListItemTag>
                      <Collection.ListItemHeading>SÄLJAN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Blat, 246x3.8 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={349}
                      sizeInMeters={2.46}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/9/UGC100008853.avif"
                alt="Zdjęcie użytkownika NatureNurturer"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>NatureNurturer</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  left="45%"
                  bottom="40%"
                  descriptionContainerId="STRANDMON-fotel_2421"
                >
                  <Collection.ListItemDescriptionContainer
                    id="STRANDMON-fotel_2421"
                    linkToProduct="#"
                    placeTopCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">Top Seller</Collection.ListItemTag>
                      <Collection.ListItemHeading>STRANDMON </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Fotel uszak</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={899} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/10/UGC100007970.avif"
                alt="Zdjęcie użytkownika BookwormChic"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>BookwormChic</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  left="15%"
                  bottom="42%"
                  descriptionContainerId="SAMLA-pojemnik-79x57x18cm/55l"
                >
                  <Collection.ListItemDescriptionContainer
                    id="SAMLA-pojemnik-79x57x18cm/55l"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">
                        Nowa niższa cena
                      </Collection.ListItemTag>
                      <Collection.ListItemHeading>SAMLA </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Pojemnik z pokrywką, 79x57x18 cm/ 55 l
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={69}
                      priceDecimal={99}
                    />
                    <Collection.ListItemLastPriceDescription
                      lastPrice={79}
                      lastPriceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  left="38%"
                  bottom="40%"
                  descriptionContainerId="SAMLA-pojemnik-38x28x28cm/22l"
                >
                  <Collection.ListItemDescriptionContainer
                    id="SAMLA-pojemnik-38x28x28cm/22l"
                    linkToProduct="#"
                    placeTopCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">
                        Nowa niższa cena
                      </Collection.ListItemTag>
                      <Collection.ListItemHeading>SAMLA </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Pojemnik z pokrywką, 39x28x28 cm/ 22 l
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={27}
                      priceDecimal={99}
                    />
                    <Collection.ListItemLastPriceDescription
                      lastPrice={29}
                      lastPriceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  left="40%"
                  bottom="20%"
                  descriptionContainerId="SAMLA-pojemnik-57x39x42cm/65l"
                >
                  <Collection.ListItemDescriptionContainer
                    id="SAMLA-pojemnik-57x39x42cm/65l"
                    linkToProduct="#"
                    placeRightCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>SAMLA </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Pojemnik z pokrywką, 57x39x42 cm/ 65 l
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={59}
                      priceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/11/UGC100008111.avif"
                alt="Zdjęcie użytkownika SportsJunkie365"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>SportsJunkie365</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  left="37%"
                  top="30%"
                  descriptionContainerId="BODBYN-drzwi-40x60-24423"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BODBYN-drzwi-40x60-24423"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Drzwi, 40x60 cm</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={115} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  top="38.5%"
                  left="17.5%"
                  descriptionContainerId="BAGGANÄS-uchwyt-2444"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BAGGANÄS-uchwyt-2444"
                    linkToProduct="#"
                    placeBottomRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">Top Seller</Collection.ListItemTag>
                      <Collection.ListItemHeading>BAGGANÄS </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Uchwyt, 143 mm</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={25}
                      quantity={2}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  top="25%"
                  left="49%"
                  descriptionContainerId="BODBYN-drzwi-60x100-5623623"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BODBYN-drzwi-60x100-5623623"
                    linkToProduct="#"
                    placeBottomRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Drzwi, 60x100 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={255} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  top="44%"
                  left="47%"
                  descriptionContainerId="HULTARP-szyna-24412"
                >
                  <Collection.ListItemDescriptionContainer
                    id="HULTARP-szyna-24412"
                    linkToProduct="#"
                    placeRightCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>HULTARP </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Szyna, 60 cm</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={24}
                      priceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  bottom="25%"
                  left="40%"
                  descriptionContainerId="BODBYN-front-szuflady-80x40-06943"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BODBYN-front-szuflady-80x40-06943"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Front szuflady, 80x40 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={140} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  bottom="43%"
                  right="22.5%"
                  descriptionContainerId="BODBYN-front-szuflady-60x40-8833"
                >
                  <Collection.ListItemDescriptionContainer
                    id="BODBYN-front-szuflady-60x40-8833"
                    linkToProduct="#"
                    placeBottomCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Front szuflady, 60x40 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={115} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>

          <SwiperSlide>
            <Article.ImgContainer>
              <Article.Img
                src="/images/scrollbars/instagram_photos/12/UGC100008954.avif"
                alt="Zdjęcie użytkownika ThrillSeekerElite"
                aspectRatio="3/4"
              />
              <Article.InstagramBadge>ThrillSeekerElite</Article.InstagramBadge>

              <Collection showOnlyOnHover>
                <Collection.ListItem
                  right="17%"
                  top="14%"
                  descriptionContainerId="FEJKA-sztuczna-roslina-doniczkowa-24242"
                >
                  <Collection.ListItemDescriptionContainer
                    id="FEJKA-sztuczna-roslina-doniczkowa-24242"
                    linkToProduct="#"
                    placeBottomCenter
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">
                        Nowa niższa cena
                      </Collection.ListItemTag>
                      <Collection.ListItemHeading>FEJKA </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Sztuczna roślina doniczkowa, 9 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={19}
                      priceDecimal={99}
                    />
                    <Collection.ListItemLastPriceDescription
                      lastPrice={24}
                      lastPriceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  left="5.5%"
                  bottom="28.5%"
                  descriptionContainerId="LÄTTAD-podkladka_2442"
                >
                  <Collection.ListItemDescriptionContainer
                    id="LÄTTAD-podkladka_2442"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>LÄTTAD </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Podkładka, 37 cm
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice
                      price={19}
                      priceDecimal={99}
                    />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>

                <Collection.ListItem
                  left="40%"
                  bottom="0%"
                  descriptionContainerId="INGOLF-krzeslo-24fa"
                >
                  <Collection.ListItemDescriptionContainer
                    id="INGOLF-krzeslo-24fa"
                    linkToProduct="#"
                    placeTopRight
                  >
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemTag variant="red">Top Seller</Collection.ListItemTag>
                      <Collection.ListItemHeading>INGOLF </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>Krzesło</Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={249} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              </Collection>
            </Article.ImgContainer>
          </SwiperSlide>
        </Swiper>
      </Article>

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
            className="mySwiper4"
          >
            <SwiperSlide>
              <Card
                as="link"
                href="#"
                variant="light-brown"
              >
                <Card.Img
                  src="/images/scrollbars/currently/1.avif"
                  alt="Urządzony salon"
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
                  alt="Telefon z włączoną aplikacją IKEA Kreativ"
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
                  alt="Pluszowy chomik w stroju kosmonauty siedzący na poduszcze w kształcie UFO"
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
                  alt="Pokój z dwoma fotelami o kontrastującym kolorze i wiele elementów dekoracji wnętrz"
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
                  alt="Chłopiec idący do sklepu IKEA"
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
            <Article.Img
              sizes="(max-width: 2667px) 60vw, 1600px"
              srcSet="
                /images/organization_ideas/organization_wnguvj_ar_16_9,c_fill,g_auto__c_scale,w_320.avif 320w,
                /images/organization_ideas/organization_wnguvj_ar_16_9,c_fill,g_auto__c_scale,w_971.avif 971w,
                /images/organization_ideas/organization_wnguvj_ar_16_9,c_fill,g_auto__c_scale,w_1123.avif 1123w,
                /images/organization_ideas/organization_wnguvj_ar_16_9,c_fill,g_auto__c_scale,w_1507.avif 1507w,
                /images/organization_ideas/organization_wnguvj_ar_16_9,c_fill,g_auto__c_scale,w_1600.avif 1600w"
              src="/images/organization_ideas/organization_wnguvj_ar_16_9,c_fill,g_auto__c_scale,w_1600.avif"
              alt="Kolaż z kolorowymi kwadrantami i wycinankami zdjęć ludzi."
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
            <Article.Btn href="#">Pierwszy krok do lepszej organizacji</Article.Btn>
          </Article.TextContainer>
        </Article.Body>
      </Article>

      <Article>
        <Article.Header>
          Nowości z przeszłości - odkryj drugą odsłone archiwalnych projektów IKEA
        </Article.Header>
        <Article.Body>
          <Article.ImgContainer>
            <Article.Img
              sizes="(max-width: 2667px) 60vw, 1600px"
              srcSet="
                /images/collections/2/collection_dh1zfn_ar_16_9,c_fill,g_auto__c_scale,w_320.avif 320w,
                /images/collections/2/collection_dh1zfn_ar_16_9,c_fill,g_auto__c_scale,w_737.avif 737w,
                /images/collections/2/collection_dh1zfn_ar_16_9,c_fill,g_auto__c_scale,w_961.avif 961w,
                /images/collections/2/collection_dh1zfn_ar_16_9,c_fill,g_auto__c_scale,w_1488.avif 1488w,
                /images/collections/2/collection_dh1zfn_ar_16_9,c_fill,g_auto__c_scale,w_1544.avif 1544w,
                /images/collections/2/collection_dh1zfn_ar_16_9,c_fill,g_auto__c_scale,w_1600.avif 1600w"
              src="/images/collections/2/collection_dh1zfn_ar_16_9,c_fill,g_auto__c_scale,w_1600.avif"
              alt="Dwa fotele SKÅLBODA, klosz lampy wiszącej HAVSFJÄDER i inne produkty z drugiej premiery kolekcji Nytillverkad."
              aspectRatioMobile="3/4"
            />

            <Collection>
              <Collection.ListItem
                top="73.9%"
                left={width >= 600 ? "55.5007%" : "63.024%"}
                descriptionContainerId="list-item-1_Nytillverkad"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-1_Nytillverkad"
                  linkToProduct="#"
                  placeTopCenter
                >
                  <Collection.ListItemTag variant="orange">Nowość</Collection.ListItemTag>
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>SKÅLBODA </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>Fotel</Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice price={249} />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>

              <Collection.ListItem
                top="53.1%"
                left={width >= 600 ? "35.8982%" : "16.6112%"}
                descriptionContainerId="list-item-2_Nytillverkad"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-2_Nytillverkad"
                  linkToProduct="#"
                  placeRightCenter
                >
                  <Collection.ListItemTag variant="orange">Nowość</Collection.ListItemTag>
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>TUVKORNELL </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>
                      Świeczniki, 3 szt.
                    </Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice
                    price={39}
                    priceDecimal={99}
                  />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>

              <Collection.ListItem
                top="28.4%"
                left={width >= 600 ? "62.0015%" : "78.416%"}
                descriptionContainerId="list-item-3_Nytillverkad"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-3_Nytillverkad"
                  linkToProduct="#"
                  placeBottomLeft
                >
                  <Collection.ListItemTag variant="orange">Nowość</Collection.ListItemTag>
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>HAVSFJÄDER </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>
                      Klosz lampy wiszącej
                    </Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice price={149} />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>

              <Collection.ListItem
                top="61.2%"
                left={width >= 600 ? "66.4021%" : "88.8352%"}
                descriptionContainerId="list-item-4_Nytillverkad"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-4_Nytillverkad"
                  linkToProduct="#"
                  placeTopLeft
                >
                  <Collection.ListItemTag variant="orange">Nowość</Collection.ListItemTag>
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>JÄRLÅSA </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>Stolik na kółkach</Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice price={179} />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>

              {width >= 600 && (
                <Collection.ListItem
                  top="68%"
                  left="90.205%"
                  descriptionContainerId="list-item-5_Nytillverkad"
                >
                  <Collection.ListItemDescriptionContainer
                    id="list-item-5_Nytillverkad"
                    linkToProduct="#"
                    placeTopLeft
                  >
                    <Collection.ListItemTag variant="orange">Nowość</Collection.ListItemTag>
                    <Collection.ListItemHeadingContainer>
                      <Collection.ListItemHeading>JÄRLÅSA </Collection.ListItemHeading>
                      <Collection.ListItemSubHeading>
                        Stolik na kółkach
                      </Collection.ListItemSubHeading>
                    </Collection.ListItemHeadingContainer>
                    <Collection.ListItemPrice price={179} />
                  </Collection.ListItemDescriptionContainer>
                </Collection.ListItem>
              )}

              <Collection.ListItem
                top="60%"
                left={width >= 600 ? "45.9995%" : "40.528%"}
                descriptionContainerId="list-item-6_Nytillverkad"
              >
                <Collection.ListItemDescriptionContainer
                  id="list-item-6_Nytillverkad"
                  linkToProduct="#"
                  placeTopCenter
                >
                  <Collection.ListItemTag variant="orange">Nowość</Collection.ListItemTag>
                  <Collection.ListItemHeadingContainer>
                    <Collection.ListItemHeading>SVEDJENÄVA </Collection.ListItemHeading>
                    <Collection.ListItemSubHeading>Poszewka</Collection.ListItemSubHeading>
                  </Collection.ListItemHeadingContainer>
                  <Collection.ListItemPrice
                    price={24}
                    priceDecimal={99}
                  />
                </Collection.ListItemDescriptionContainer>
              </Collection.ListItem>
            </Collection>

            <CollectionNameContainer
              collectionName="Nytillverkad"
              collectionLink="#"
              isNew
            />
          </Article.ImgContainer>
        </Article.Body>
      </Article>

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
          className="mySwiper5"
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
                <span className="visually-hidden">Planowanie szafy</span>
                <Article.SlideBtn variant="light">Planowanie szafy</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_2/wardrobes.webp"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Kuchnia</span>
                <Article.SlideBtn variant="light">Kuchnia</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_2/kitchen.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Pokój dzienny</span>
                <Article.SlideBtn variant="light">Pokój dzienny</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_2/living-room.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Sypialnia</span>
                <Article.SlideBtn variant="light">Sypialnia</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_2/bedroom.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Domowe biuro</span>
                <Article.SlideBtn variant="light">Domowe biuro</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_2/home-office.webp"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Pokój dziecięcy</span>
                <Article.SlideBtn variant="light">Pokój dziecięcy</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_2/childrens-room.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Projektowanie mieszkania</span>
                <Article.SlideBtn variant="light">Projektowanie mieszkania</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_2/apartment-design.avif"
                alt=""
              />
            </Article.Slide>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Slide>
              <Article.Link
                href="#"
                className="flex-container"
              >
                <span className="visually-hidden">Przestrzeń biznesowa</span>
                <Article.SlideBtn variant="light">Przestrzeń biznesowa</Article.SlideBtn>
              </Article.Link>
              <Article.Img
                src="images/scrollbars/scrollbar_2/business-space.avif"
                alt=""
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
            <Article.Img
              sizes="(max-width: 2667px) 60vw, 1600px"
              srcSet="
                /images/for_business/office_amsyms_ar_16_9,c_fill,g_auto__c_scale,w_320.avif 320w,
                /images/for_business/office_amsyms_ar_16_9,c_fill,g_auto__c_scale,w_1285.avif 1285w,
                /images/for_business/office_amsyms_ar_16_9,c_fill,g_auto__c_scale,w_1520.avif 1520w,
                /images/for_business/office_amsyms_ar_16_9,c_fill,g_auto__c_scale,w_1600.avif 1600w"
              src="/images/for_business/office_amsyms_ar_16_9,c_fill,g_auto__c_scale,w_1600.avif"
              alt="Office"
            />
          </Article.ImgContainer>

          <Article.TextContainer>
            <Article.Header>IKEA dla Firm</Article.Header>
            <Article.Text>
              Dołącz do IKEA Business Network i poznaj korzyści dedykowane dla małych i dużych
              przedsiębiorców.
            </Article.Text>
            <Article.Btn href="#">Dołącz do IKEA Business Network</Article.Btn>
          </Article.TextContainer>
        </Article.Body>
      </Article>

      <article>
        <h2 className="article__heading">Aranżacje wnętrz i inspiracje</h2>
      </article>
    </div>
  );
}
