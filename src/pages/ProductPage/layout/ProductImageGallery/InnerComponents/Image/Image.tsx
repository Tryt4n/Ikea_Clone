/**
 * Image Component
 *
 * This is a React functional component. It displays an image with a source set for different viewport sizes. The image is lazy-loaded, which means that it is loaded only when it is in (or near) the viewport. This can help improve performance on pages that contain many images. The component also includes a visually hidden span that provides additional information for screen readers.
 *
 * @param {string} props.imgSrc - The source URL for the image.
 * @param {string} props.imgSrcSet - A string that contains one or more comma-separated source URLs for the image, along with their widths. The browser will choose the most suitable image based on the current viewport width and the device's pixel density.
 *
 * @example
 * <Image imgSrc="image.jpg" imgSrcSet="image-320w.jpg 320w, image-480w.jpg 480w, image-800w.jpg 800w" />
 *
 * @returns A JSX fragment that consists of an `img` element with the `src`, `srcSet`, `sizes`, `alt`, and `loading` attributes, and a `span` element with the class name `visually-hidden` that provides additional information for screen readers.
 */

export function Image({
  imgSrc,
  imgSrcSet,
}: {
  imgSrc: string;
  imgSrcSet: string;
}) {
  const imgSizes =
    "(max-width: 900px) 100vw, (max-width: 1200px) 160px, (max-width: 1400px) 300px, (max-width: 1700px) 400px, 500px";

  return (
    <>
      <img
        src={imgSrc}
        srcSet={imgSrcSet}
        sizes={imgSizes}
        alt=""
        loading="lazy" // Lazy-load the image
      />
      <span className="visually-hidden">Naciśnij aby powiększyć</span>
    </>
  );
}
