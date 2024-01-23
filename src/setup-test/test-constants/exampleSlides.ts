import type { SlideType } from "../../layout/Articles/variants/CarouselSliderArticle/CarouselSliderArticle";

export const exampleSlides: SlideType[] = [
  {
    id: "1",
    link: "/slide-1",
    btn: {
      shape: "circle",
    },
  },
  {
    id: "2",
    variant: "brown",
    link: "/slide-2",
    linkStyles: "link-2-class",
    heading: "Slide 2",
    btn: {
      shape: "oval",
      variant: "gray",
      text: "button slide 2",
    },
    img: {
      imgSrc: "slide-2.jpg",
      imgSrcSet: "slide-2.jpg 1x",
      imgAlt: "slide 2",
    },
  },
  {
    id: "3",
    variant: "light-brown",
    link: "/slide-3",
    heading: "Slide 3",
    btn: {
      shape: "oval",
      variant: "gray",
      icon: "<svg></svg>",
    },
    img: {
      imgSrc: "slide-3.jpg",
      imgSrcSet: "slide-3.jpg 1x",
      imgAlt: "slide 3",
    },
  },
  {
    id: "4",
    variant: "light-gray",
    link: "/slide-4",
    heading: "Slide 4",
    btn: {
      shape: "circle",
    },
    img: {
      imgSrc: "slide-4.jpg",
      imgSrcSet: "slide-4.jpg 1x",
      imgAlt: "slide 4",
    },
  },
];
