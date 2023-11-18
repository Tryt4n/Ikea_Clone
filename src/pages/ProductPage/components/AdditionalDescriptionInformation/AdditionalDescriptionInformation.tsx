// React
import { useState } from "react";
// Types
import { useParams } from "react-router-dom";
import { productLink } from "../../../../constants/links";
import { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

export default function AdditionalDescriptionInformation({
  infoData,
}: {
  infoData: NonNullable<ProductDataType["additionalInfo"]>;
}) {
  console.log(infoData);
  const params = useParams();

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="additional-info">
      {infoData.map((section) => {
        const {
          title,
          header,
          description,
          subDescription,
          variant,
          backgroundImage,
          additionalSections,
        } = section;

        const imgLink = `${productLink}/${params.collection}-${params.product}-${params.type}__${backgroundImage}`;
        const imgSrc = `${imgLink}?f=m`;
        const imgSrcSet = `${imgLink}?f=xxxl 1100w, ${imgLink}?f=xxl 900w, ${imgLink}?f=xl 750w, ${imgLink}?f=l 700w, ${imgLink}?f=m 600w, ${imgLink}?f=s 500w, ${imgLink}?f=xs 400w, ${imgLink}?f=xxs 300w, ${imgLink}?f=xxxs 160w, ${imgLink}?f=u 80w, ${imgLink}?f=xu 40w`;

        return (
          <section key={title}>
            {additionalSections ? (
              <div className="additional-info__long-section-container">
                <div className="additional-info__img-wrapper">
                  <img
                    src={imgSrc}
                    srcSet={imgSrcSet}
                    sizes="(max-width: 599px) 100vw, (max-width: 899px) 80vw, (max-width: 1400px) 33vw,  600px"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div
                  className={`additional-info__long-content-container${
                    showMore ? " showMore" : ""
                  }`}
                >
                  <div className="additional-info__long-content-wrapper">
                    <header
                      className={`additional-info__title ${variant ? `tx-${variant}` : "tx-gray"}`}
                    >
                      {title}
                    </header>

                    <div className="additional-info__description-container">
                      <h4 className="additional-info__heading">{header}</h4>
                      <p>{description}</p>
                    </div>

                    {additionalSections.map((section) => {
                      return (
                        <section
                          key={section.header}
                          className="additional-info__description-container"
                        >
                          <h4 className="additional-info__heading-small">{section.header}</h4>
                          <p>{section.description}</p>
                        </section>
                      );
                    })}
                  </div>

                  <div className="additional-info__btn-wrapper">
                    <button
                      className="additional-info__btn"
                      onClick={() => setShowMore(!showMore)}
                      aria-label={showMore ? "Naciśnij aby schować" : "Naciśnij aby pokazać więcej"}
                    >
                      {showMore ? "Pokaż mniej" : "Dowiedz się więcej"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="additional-info__section-container">
                <header
                  className={`additional-info__title ${variant ? `tx-${variant}` : "tx-gray"}`}
                >
                  {title}
                </header>
                <div className="additional-info__text-container">
                  <h4 className="additional-info__heading">{header}</h4>
                  <div className="additional-info__description-container">
                    <p>{description}</p>
                    {subDescription && <p>{subDescription}</p>}
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
