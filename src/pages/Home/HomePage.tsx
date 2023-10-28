// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, FreeMode, Mousewheel, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// Custom Hooks
import useModal from "../../hooks/useModal";
// Components
import Article from "../../compoundComponents/Article/Article";
import Collection from "../../compoundComponents/CollectionProducts/components/Collection";
// Style
import "./index.scss";

//!
// Articles
import article_1 from "../../../server/article_1.json";
import article_2 from "../../../server/article_2.json";
import article_3 from "../../../server/article_3.json";
import article_5 from "../../../server/article_5.json";
import article_6 from "../../../server/article_6.json";
import article_7 from "../../../server/article_7.json";
import article_8 from "../../../server/article_8.json";
import article_9 from "../../../server/article_9.json";
import article_10 from "../../../server/article_10.json";

// Article Components
import MainArticle, { MainArticleType } from "../../layout/Articles/MainArticle";
import TextCardsArticle, { TextCardsArticleType } from "../../layout/Articles/TextCardsArticle";
import CarouselSliderArticle, {
  CarouselSliderArticleType,
} from "../../layout/Articles/CarouselSliderArticle";
import ImgCardsArticle, { ImgCardsArticleType } from "../../layout/Articles/ImgCardsArticle";
//!

export default function HomePage() {
  const { modalId, setIsModalOpen } = useModal();

  function checkIfIsListItem(element: HTMLElement) {
    if (element.tagName === "LI") {
      return true;
    } else {
      if (element.parentNode as HTMLElement) {
        return checkIfIsListItem(element.parentNode as HTMLElement);
      }
    }
    return false;
  }

  function openImageModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const isListItem = checkIfIsListItem(e.target as HTMLElement);

    if (isListItem) return;

    setIsModalOpen(true);
  }

  return (
    <div className="articles">
      <MainArticle article={article_1 as MainArticleType} />

      <CarouselSliderArticle article={article_2 as CarouselSliderArticleType} />

      <ImgCardsArticle article={article_3 as ImgCardsArticleType} />

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
            <Article.Section
              aria-controls={modalId}
              onClick={(e) => openImageModal(e)}
            >
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
                      placement="left-center"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="bottom-center"
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
                      placement="top-right"
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
                      placement="top-right"
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
                      placement="top-left"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="top-right"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="top-right"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="top-right"
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
                      placement="top-right"
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
                      placement="top-left"
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
                      placement="top-center"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="top-right"
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
                      placement="top-center"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="left-center"
                    >
                      <Collection.ListItemTag variant="red">Top Seller</Collection.ListItemTag>
                      <Collection.ListItemTag variant="red">
                        Nowa niższa cena
                      </Collection.ListItemTag>
                      <Collection.ListItemHeadingContainer>
                        <Collection.ListItemHeading>TOFTLUND </Collection.ListItemHeading>
                        <Collection.ListItemSubHeading>
                          Dywan, 55x85 cm
                        </Collection.ListItemSubHeading>
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
                      placement="top-left"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="right-center"
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
                      placement="top-left"
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
                      placement="top-left"
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
                      placement="bottom-left"
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
                      placement="top-right"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="top-center"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                    bottom="13.5%"
                    descriptionContainerId="SAMLA-pojemnik-79x57x18cm/55l"
                  >
                    <Collection.ListItemDescriptionContainer
                      id="SAMLA-pojemnik-79x57x18cm/55l"
                      linkToProduct="#"
                      placement="top-right"
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
                    bottom="29.5%"
                    descriptionContainerId="SAMLA-pojemnik-38x28x28cm/22l"
                  >
                    <Collection.ListItemDescriptionContainer
                      id="SAMLA-pojemnik-38x28x28cm/22l"
                      linkToProduct="#"
                      placement="top-center"
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
                    right="38%"
                    bottom="22%"
                    descriptionContainerId="SAMLA-pojemnik-57x39x42cm/65l"
                  >
                    <Collection.ListItemDescriptionContainer
                      id="SAMLA-pojemnik-57x39x42cm/65l"
                      linkToProduct="#"
                      placement="right-center"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="top-right"
                    >
                      <Collection.ListItemHeadingContainer>
                        <Collection.ListItemHeading>BODBYN </Collection.ListItemHeading>
                        <Collection.ListItemSubHeading>
                          Drzwi, 40x60 cm
                        </Collection.ListItemSubHeading>
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
                      placement="bottom-right"
                    >
                      <Collection.ListItemHeadingContainer>
                        <Collection.ListItemTag variant="red">Top Seller</Collection.ListItemTag>
                        <Collection.ListItemHeading>BAGGANÄS </Collection.ListItemHeading>
                        <Collection.ListItemSubHeading>
                          Uchwyt, 143 mm
                        </Collection.ListItemSubHeading>
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
                      placement="bottom-right"
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
                      placement="right-center"
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
                      placement="top-right"
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
                      placement="bottom-center"
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
            </Article.Section>
          </SwiperSlide>

          <SwiperSlide>
            <Article.Section>
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
                      placement="bottom-center"
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
                      placement="top-right"
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
                      placement="top-right"
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
            </Article.Section>
          </SwiperSlide>
        </Swiper>
      </Article>

      <ImgCardsArticle article={article_5 as ImgCardsArticleType} />

      <MainArticle article={article_6 as MainArticleType} />

      <MainArticle article={article_7 as MainArticleType} />

      <CarouselSliderArticle article={article_8 as CarouselSliderArticleType} />

      <TextCardsArticle article={article_9 as TextCardsArticleType} />

      <MainArticle article={article_10 as MainArticleType} />

      <article>
        <h2 className="article__heading">Aranżacje wnętrz i inspiracje</h2>
      </article>
    </div>
  );
}
