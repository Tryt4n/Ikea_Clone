// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, FreeMode, Mousewheel, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// Components
import Article from "../../compoundComponents/Article/Article";
import ImageCardCollection, {
  CardCollectionType,
} from "./components/ImageCardCollection/ImageCardCollection";

export type ImageCardsCollectionSliderType = {
  id: string;
  header: string;
  subheader?: string;
  showProductsOnlyOnHover?: boolean;
  cards: CardCollectionType[];
};

export default function ImageCardsCollectionSlider({
  article,
}: {
  article: ImageCardsCollectionSliderType;
}) {
  const { id, header, subheader, cards, showProductsOnlyOnHover } = article;

  return (
    <Article>
      <Article.Header>{header}</Article.Header>
      {subheader && <Article.SubHeader>{subheader}</Article.SubHeader>}

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
        className={`mySwiper-${id}`}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <ImageCardCollection
              card={card}
              onHoverStatus={showProductsOnlyOnHover}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Article>
  );
}
