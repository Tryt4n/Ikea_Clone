// Import SwiperJS dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, FreeMode, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// Import components
import Article from "../../compoundComponents/Article/Article";
import ImageCardCollection, {
  CardCollectionType,
} from "./components/ImageCardCollection/ImageCardCollection";

// Define ImageCardsCollectionSlider type
export type ImageCardsCollectionSliderType = {
  id: string;
  header: string;
  subheader?: string;
  showProductsOnlyOnHover?: boolean;
  cards: CardCollectionType[];
};

/**
 * ImageCardsCollectionSlider is a React component that renders an article with a header, an optional subheader, and a swiper slider containing image card collections.
 * Each image card collection has an image, a heading, a text, a button, and a list of products. The swiper slider supports different configurations for various screen widths.
 *
 * @param {ImageCardsCollectionSliderType} props.article - The article to be rendered.
 *
 * @example
 * <ImageCardsCollectionSlider article={article} />
 */

export default function ImageCardsCollectionSlider({
  article,
}: {
  article: ImageCardsCollectionSliderType;
}) {
  const { id, header, subheader, cards, showProductsOnlyOnHover } = article; // Destructure the article object

  return (
    <Article>
      <Article.Header>{header}</Article.Header>

      {/* If subheader exists, render it */}
      {subheader && <Article.SubHeader>{subheader}</Article.SubHeader>}

      <Swiper
        slidesPerView={1} // Set slides per view to 1
        slidesPerGroup={1} // Set slides per group to 1
        spaceBetween={20} // Set space between slides to 20px
        freeMode={true} // Set freeMode to true to allow slides to slide freely, without snapping to slides
        navigation={true} // Set navigation to true to enable navigation buttons
        scrollbar={{ hide: true }} // Set scrollbar to true to enable scrollbar
        keyboard={{
          enabled: true, // Set keyboard to true to enable keyboard navigation
        }}
        modules={[Navigation, Scrollbar, Keyboard, FreeMode, A11y]} // Import SwiperJS modules
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
        }} // Set breakpoints for different screen widths
        className={`mySwiper-${id}`}
      >
        {/* Map through the cards array and render an ImageCardCollection component for each card */}
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <ImageCardCollection
              card={card}
              onHoverStatus={showProductsOnlyOnHover} // If showProductsOnlyOnHover is true, set onHoverStatus to true
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Article>
  );
}
