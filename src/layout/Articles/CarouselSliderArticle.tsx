// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, FreeMode, Mousewheel, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// Components
import Article from "../../compoundComponents/Article/Article";
// Types
import { BtnShapesType, BtnVariantsType } from "../../types/btnTypes";
import { BackgroundVariants } from "../../types/colorsVariantsType";

export type CarouselSliderArticleType = {
  id: "string";
  header?: string;
  swiperConfig: SwiperType;
  slides: SlideType[];
  imgSizes: string;
};

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

export default function CarouselSliderArticle({ article }: { article: CarouselSliderArticleType }) {
  const { numberOfInitialSlides, spaceBetweenSlides, breakpoints } = article.swiperConfig;

  return (
    <Article key={article.id}>
      {article.header && <Article.Header>{article.header}</Article.Header>}
      <Swiper
        slidesPerView={numberOfInitialSlides}
        slidesPerGroup={numberOfInitialSlides}
        spaceBetween={spaceBetweenSlides}
        freeMode={true}
        mousewheel={true}
        navigation={true}
        scrollbar={{ hide: true }}
        keyboard={{
          enabled: true,
        }}
        modules={[Navigation, Scrollbar, Keyboard, FreeMode, Mousewheel, A11y]}
        breakpoints={breakpoints}
        className={`mySwiper-${article.id}`}
      >
        {article.slides.map((slide: SlideType) => {
          const { id, variant, link, linkStyles, heading, btn, img } = slide;

          return (
            <SwiperSlide key={id}>
              <Article.Slide variant={variant}>
                <Article.Link
                  href={link}
                  className={linkStyles}
                >
                  {heading && (
                    <Article.Header headingLevel={article.header ? 3 : 2}>{heading}</Article.Header>
                  )}
                  {btn.text && <span className="visually-hidden">{btn.text}</span>}
                  <Article.SlideBtn
                    variant={btn.variant}
                    shape={btn.shape}
                  >
                    {btn.icon && !btn.text && (
                      <div dangerouslySetInnerHTML={{ __html: btn.icon }} />
                    )}
                    {btn.text && !btn.icon && btn.text}
                  </Article.SlideBtn>

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
