// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, FreeMode, Mousewheel, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// Hooks
import useWindowSize from "../../hooks/useWindowSize";
// Types
import { BackgroundVariants } from "../../types/colorsVariantsType";
import { BtnVariantsType } from "../../types/btnTypes";
// Components
import Article from "../../compoundComponents/Article/Article";
import CardsContainer from "../../compoundComponents/Card/CardsContainer";
import Card from "../../compoundComponents/Card/Card";

export type ImgCardsArticleType = {
  id: string;
  breakOnMobile?: boolean;
  header?: string;
  cards: ImgCard[];
};

type ImgCard = {
  id: string;
  link: string;
  variant: BackgroundVariants;
  img: {
    imgSrc: string;
    imgAlt: string;
  };
  heading: string;
  text: string;
  btnVariant?: BtnVariantsType;
};

export default function ImgCardsArticle({ article }: { article: ImgCardsArticleType }) {
  const { width } = useWindowSize();

  const { breakOnMobile } = article;

  return (
    <Article key={article.id}>
      <Article.Header>{article.header}</Article.Header>

      <CardsContainer breakOnMobile={breakOnMobile}>
        <Swiper
          slidesPerView={breakOnMobile ? 0 : 1}
          slidesPerGroup={breakOnMobile ? 0 : 1}
          spaceBetween={breakOnMobile ? 0 : 20}
          freeMode={breakOnMobile ? width >= 600 : width < 900}
          mousewheel={breakOnMobile ? width >= 600 : width < 900}
          navigation={breakOnMobile ? width >= 600 : width < 900}
          scrollbar={breakOnMobile ? width >= 600 && { hide: true } : width < 900 && { hide: true }}
          keyboard={
            breakOnMobile
              ? width >= 600 && {
                  enabled: true,
                }
              : width < 900 && {
                  enabled: true,
                }
          }
          modules={
            breakOnMobile
              ? width >= 600
                ? [Navigation, Scrollbar, Keyboard, FreeMode, Mousewheel, A11y]
                : undefined
              : width < 900
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
          className={`mySwiper${article.id}`}
        >
          {article.cards.map((card) => {
            const { id, link, variant, img, heading, text } = card;

            return (
              <SwiperSlide key={id}>
                <Card
                  as="link"
                  href={link}
                  variant={variant}
                >
                  <Card.Img
                    src={img.imgSrc}
                    alt={img.imgAlt}
                  />

                  <Card.TextContainer>
                    <div>
                      <Card.Heading headingLevel={article.header ? 3 : 2}>{heading}</Card.Heading>
                      <Card.Text>{text}</Card.Text>
                    </div>
                    <Card.Btn />
                  </Card.TextContainer>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </CardsContainer>
    </Article>
  );
}
