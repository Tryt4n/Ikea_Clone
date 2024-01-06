// Import SwiperJS dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, FreeMode, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// Import components
import Article from "../../compoundComponents/Article/Article";
// Import types
import type { BtnShapesType, BtnVariantsType } from "../../types/btnTypes";
import type { BackgroundVariants } from "../../types/colorsVariantsType";

// Define CarouselSliderArticle type
export type CarouselSliderArticleType = {
  id: "string";
  header?: string;
  swiperConfig: SwiperType;
  slides: SlideType[];
  imgSizes: string;
};

// Define Slide type
type SlideType = {
  id: string;
  variant?: BackgroundVariants;
  link: string;
  linkStyles?: string;
  heading?: string;
  btn: {
    variant?: BtnVariantsType;
    shape: BtnShapesType;
    icon?: string;
    text?: string;
  };
  img?: {
    imgSrc: string;
    imgSrcSet: string;
    imgAlt: string;
  };
};

// Define Swiper type
type SwiperType = {
  numberOfInitialSlides: number;
  spaceBetweenSlides: number;
  breakpoints: {
    [key: number]: {
      slidesPerView: number;
      slidesPerGroup: number;
    };
  };
};

/**
 * CarouselSliderArticle is a React component that renders an article with an optional header and a swiper slider containing slides.
 * Each slide has a link, an optional heading, a button, and an optional image. The swiper slider supports different configurations for various screen widths.
 *
 * @param {object} props - The properties that define the article.
 * @param {CarouselSliderArticleType} props.article - The article to be rendered.
 *
 * @example
 * <CarouselSliderArticle article={article} />
 */

export default function CarouselSliderArticle({ article }: { article: CarouselSliderArticleType }) {
  const { numberOfInitialSlides, spaceBetweenSlides, breakpoints } = article.swiperConfig; // Destructure the swiperConfig object

  return (
    <Article key={article.id}>
      {article.header && <Article.Header>{article.header}</Article.Header>}
      <Swiper
        slidesPerView={numberOfInitialSlides}
        slidesPerGroup={numberOfInitialSlides}
        spaceBetween={spaceBetweenSlides}
        freeMode={true} // Set freeMode to true to allow slides to slide freely, without snapping to slides
        navigation={true} // Set navigation to true to enable navigation buttons
        scrollbar={{ hide: true }} // Set scrollbar to true to enable scrollbar
        keyboard={{
          enabled: true,
        }} // Set keyboard to true to enable keyboard navigation
        modules={[Navigation, Scrollbar, Keyboard, FreeMode, A11y]} // Import SwiperJS modules
        breakpoints={breakpoints} // Set breakpoints for different screen widths
        className={`mySwiper-${article.id}`}
      >
        {/* Map through the slides array and render a SwiperSlide component for each slide */}
        {article.slides.map((slide: SlideType) => {
          const { id, variant, link, linkStyles, heading, btn, img } = slide; // Destructure the slide object

          return (
            <SwiperSlide key={id}>
              <Article.Slide variant={variant}>
                <Article.Link
                  href={link}
                  className={linkStyles}
                >
                  {/* If heading exists, render it */}
                  {heading && (
                    <Article.Header headingLevel={article.header ? 3 : 2}>{heading}</Article.Header>
                  )}

                  {/* If btn.text exists, render it */}
                  {btn.text && <span className="visually-hidden">{btn.text}</span>}

                  <Article.SlideBtn
                    variant={btn.variant}
                    shape={btn.shape}
                  >
                    {/* If btn.icon exists and btn.text doesn't exist, render icon */}
                    {btn.icon && !btn.text && (
                      <div dangerouslySetInnerHTML={{ __html: btn.icon }} />
                    )}

                    {/* If btn.text exists and btn.icon doesn't exist, render text */}
                    {btn.text && !btn.icon && btn.text}
                  </Article.SlideBtn>

                  {/* If img exists, render it */}
                  {img && (
                    <Article.Img
                      src={img.imgSrc}
                      srcSet={img.imgSrcSet}
                      sizes={article.imgSizes}
                      alt={img.imgAlt}
                    />
                  )}
                </Article.Link>
              </Article.Slide>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Article>
  );
}
