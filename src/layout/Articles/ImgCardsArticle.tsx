// Import SwiperJS dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, FreeMode, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// Import custom hooks
import useWindowSize from "../../hooks/useWindowSize";
// Import components
import Article from "../../compoundComponents/Article/Article";
import CardsContainer from "../../compoundComponents/Card/CardsContainer";
import Card from "../../compoundComponents/Card/Card";
// Import types
import type { BackgroundVariants } from "../../types/colorsVariantsType";
import type { BtnVariantsType } from "../../types/btnTypes";

// Define ImgCardsArticle type
export type ImgCardsArticleType = {
  id: string;
  breakOnMobile?: boolean;
  header?: string;
  imgSizes: string;
  cards: ImgCard[];
};

// Define ImgCard type
type ImgCard = {
  id: string;
  link: string;
  variant: BackgroundVariants;
  img: {
    imgSrc: string;
    imgSrcSet: string;
    imgAlt: string;
  };
  heading: string;
  text: string;
  btnVariant?: BtnVariantsType;
};

/**
 * ImgCardsArticle is a React component that renders an article with a header and a swiper slider containing cards.
 * Each card has an image, a heading, a text, and a button. The swiper slider supports different configurations for mobile and desktop.
 *
 * @param {ImgCardsArticleType} props.article - The article to be rendered.
 *
 * @example
 * <ImgCardsArticle article={article} />
 */

export default function ImgCardsArticle({ article }: { article: ImgCardsArticleType }) {
  const { width } = useWindowSize(); // Get the width of the window from useWindowSize custom hook

  const { breakOnMobile } = article; // Destructure the breakOnMobile property from the article object

  return (
    <Article key={article.id}>
      <Article.Header>{article.header}</Article.Header>

      <CardsContainer breakOnMobile={breakOnMobile}>
        <Swiper
          // The swiper slider configuration. It changes depending on the window width and the breakOnMobile property.
          slidesPerView={breakOnMobile ? 0 : 1} // If breakOnMobile is true, set slides per view to 0 (disable), otherwise set it to 1
          slidesPerGroup={breakOnMobile ? 0 : 1} // If breakOnMobile is true, set slides per group to 0 (disable), otherwise set it to 1
          spaceBetween={breakOnMobile ? 0 : 20} // If breakOnMobile is true, set space between slides to 0 (disable), otherwise set it to 20px
          freeMode={breakOnMobile ? width >= 600 : width < 900} // If breakOnMobile is true, set freeMode to true if width is greater than or equal to 600px, otherwise set it to false if width is less than 900px
          navigation={breakOnMobile ? width >= 600 : width < 900} // If breakOnMobile is true, set navigation to true if width is greater than or equal to 600px, otherwise set it to false if width is less than 900px
          scrollbar={breakOnMobile ? width >= 600 && { hide: true } : width < 900 && { hide: true }} // If breakOnMobile is true, set scrollbar to true if width is greater than or equal to 600px, otherwise set it to false if width is less than 900px
          keyboard={
            breakOnMobile
              ? width >= 600 && {
                  enabled: true,
                }
              : width < 900 && {
                  enabled: true,
                }
          } // If breakOnMobile is true, set keyboard to true if width is greater than or equal to 600px, otherwise set it to false if width is less than 900px
          modules={
            breakOnMobile
              ? width >= 600
                ? [Navigation, Scrollbar, Keyboard, FreeMode, A11y]
                : undefined
              : width < 900
              ? [Navigation, Scrollbar, Keyboard, FreeMode, A11y]
              : undefined
          } // If breakOnMobile is true, set modules to an array of SwiperJS modules if width is greater than or equal to 600px, otherwise set it to undefined if width is less than 900px
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
          }} // Set breakpoints for different screen widths
          className={`mySwiper${article.id}`}
        >
          {/* Map through the cards array and render a card for each item */}
          {article.cards.map((card) => {
            const { id, link, variant, img, heading, text, btnVariant } = card;

            return (
              <SwiperSlide key={id}>
                <Card
                  as="link"
                  href={link}
                  variant={variant}
                >
                  <Card.Img
                    src={img.imgSrc}
                    srcSet={img.imgSrcSet}
                    sizes={article.imgSizes}
                    alt={img.imgAlt}
                  />

                  <Card.TextContainer>
                    <div>
                      <Card.Heading
                        headingLevel={article.header ? 3 : 2} // If article.header is defined, use 3 as default heading level, otherwise use 2
                      >
                        {heading}
                      </Card.Heading>
                      <Card.Text>{text}</Card.Text>
                    </div>

                    <Card.Btn
                      variant={btnVariant ? btnVariant : "light"} // If btnVariant is not defined, use "light" as default
                    />
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
