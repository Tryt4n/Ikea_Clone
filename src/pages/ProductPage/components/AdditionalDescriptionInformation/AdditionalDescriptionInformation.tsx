// React
import { HTMLProps, useRef, useState } from "react";
// react-router-dom
import { useParams } from "react-router-dom";
// Types
import { AdditionalInfo, ProductDataType } from "../../types/ProductDataType";
import { TextVariants } from "../../../../types/colorsVariantsType";
// Constants
import { productLink } from "../../../../constants/links";
// Style
import "./index.scss";

export default function AdditionalDescriptionInformation({
  infoData,
}: {
  infoData: NonNullable<ProductDataType["additionalInfo"]>;
}) {
  return (
    <div className="additional-info">
      {infoData.map((section) => {
        const { title, additionalSections } = section;

        return (
          <section key={title}>
            {additionalSections ? (
              <LongDescriptionSectionWithImage data={section} />
            ) : (
              <DescriptionSection data={section} />
            )}
          </section>
        );
      })}
    </div>
  );
}

function Header({
  title,
  variant,
  ...props
}: { title: string; variant?: TextVariants } & HTMLProps<HTMLDivElement>) {
  return (
    <header
      {...props}
      className={`additional-info__title ${variant ? `tx-${variant}` : "tx-gray"}`}
    >
      {title}
    </header>
  );
}

function ImgContainer({ img }: { img: string }) {
  const params = useParams();
  const imgLink = `${productLink}/${params.collection}-${params.product}-${params.type}__${img}`;
  const imgSrc = `${imgLink}?f=m`;
  const imgSrcSet = `${imgLink}?f=xxxl 1100w, ${imgLink}?f=xxl 900w, ${imgLink}?f=xl 750w, ${imgLink}?f=l 700w, ${imgLink}?f=m 600w, ${imgLink}?f=s 500w, ${imgLink}?f=xs 400w, ${imgLink}?f=xxs 300w, ${imgLink}?f=xxxs 160w, ${imgLink}?f=u 80w, ${imgLink}?f=xu 40w`;

  return (
    <div className="additional-info__img-wrapper">
      <img
        src={imgSrc}
        srcSet={imgSrcSet}
        sizes="(max-width: 599px) 100vw, (max-width: 899px) 80vw, (max-width: 1400px) 33vw,  600px"
        alt=""
        loading="lazy"
      />
    </div>
  );
}

function LongDescriptionSections({ data }: { data: AdditionalInfo }) {
  const [showMore, setShowMore] = useState(false);
  const longDescriptionRef = useRef<HTMLDivElement | null>(null);

  const { title, variant, header, description, additionalSections } = data;

  function handleShowMoreClick() {
    setShowMore(!showMore);

    if (showMore && longDescriptionRef.current) {
      const targetScrollPosition =
        longDescriptionRef.current.getBoundingClientRect().top + window.scrollY - 90;

      window.scrollTo({ top: targetScrollPosition, behavior: "smooth" });
    }
  }

  return (
    <div
      ref={longDescriptionRef}
      className={`additional-info__long-content-container${showMore ? " showMore" : ""}`}
    >
      <div className="additional-info__long-content-wrapper">
        <Header
          title={title}
          variant={variant}
          id="long-section-header"
        />

        <LongDescriptionMainSection
          header={header}
          description={description}
        />

        {additionalSections!.map((section) => {
          return (
            <LongDescriptionSection
              key={section.header}
              header={section.header}
              description={section.description}
            />
          );
        })}
      </div>

      <ShowMoreBtn
        showMore={showMore}
        setShowMore={handleShowMoreClick}
      />
    </div>
  );
}

type LongDescriptionSectionType = {
  header: string;
  description: string;
};

function LongDescriptionMainSection({ header, description }: LongDescriptionSectionType) {
  return (
    <div className="additional-info__description-container">
      <h4 className="additional-info__heading">{header}</h4>
      <p>{description}</p>
    </div>
  );
}

function LongDescriptionSection({ header, description }: LongDescriptionSectionType) {
  return (
    <section
      key={header}
      className="additional-info__description-container"
    >
      <h4 className="additional-info__heading-small">{header}</h4>
      <p>{description}</p>
    </section>
  );
}

function ShowMoreBtn({
  showMore,
  setShowMore,
}: {
  showMore: boolean;
  setShowMore: (value: boolean) => void;
}) {
  return (
    <div className="additional-info__btn-wrapper">
      <button
        className="additional-info__btn"
        onClick={() => setShowMore(!showMore)}
        aria-label={showMore ? "Naciśnij aby schować" : "Naciśnij aby pokazać więcej"}
      >
        {showMore ? "Pokaż mniej" : "Dowiedz się więcej"}
      </button>
    </div>
  );
}

function DescriptionSection({ data }: { data: AdditionalInfo }) {
  const { title, variant, header, description, subDescription } = data;

  return (
    <div className="additional-info__section-container">
      <Header
        title={title}
        variant={variant}
      />

      <div className="additional-info__text-container">
        <h4 className="additional-info__heading">{header}</h4>
        <div className="additional-info__description-container">
          <p>{description}</p>
          {subDescription && <p>{subDescription}</p>}
        </div>
      </div>
    </div>
  );
}

function LongDescriptionSectionWithImage({ data }: { data: AdditionalInfo }) {
  return (
    <div className="additional-info__long-section-container">
      <ImgContainer img={data.backgroundImage!} />

      <LongDescriptionSections data={data} />
    </div>
  );
}
