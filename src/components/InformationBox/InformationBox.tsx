import InfoIcon from "../../Icons/InfoIcon";
import "./index.scss";

type InformationBoxPropsType = {
  heading?: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  information: string;
  as?: "div" | "section";
  className?: string;
};

export default function InformationBox({
  heading,
  headingLevel = 3,
  as = "div",
  information,
  className,
}: InformationBoxPropsType) {
  const Container = as;
  const Heading = `h${headingLevel}` as const;

  return (
    <Container className={`information-box${className ? ` ${className}` : ""}`}>
      <InfoIcon />
      <div>
        {heading && <Heading>{heading}</Heading>}
        <p>{information}</p>
      </div>
    </Container>
  );
}
