import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "../../../setup-test/test-utils";
import Collection from "./Collection";
import userEvent from "@testing-library/user-event";

describe("Collection", () => {
  it("should render correctly without any additional props", () => {
    // Arrange
    const productTag = "New";
    const productHeading = "Collection heading";
    const productSubheading = "Collection subheading";
    const productId = "description-id";
    const productLink = "https://collection.com";
    const productPriceInteger = 1234;
    const productLastPriceInteger = 1444;

    // Act
    render(
      <Collection>
        <Collection.ListItem descriptionContainerId={productId}>
          <Collection.ListItemTag>{productTag}</Collection.ListItemTag>

          <Collection.ListItemDescriptionContainer
            id={productId}
            linkToProduct={productLink}
            placement="top-right"
          >
            <Collection.ListItemHeadingContainer>
              <Collection.ListItemHeading>
                {productHeading}
              </Collection.ListItemHeading>

              <Collection.ListItemSubHeading>
                {productSubheading}
              </Collection.ListItemSubHeading>
            </Collection.ListItemHeadingContainer>

            <Collection.ListItemPrice price={productPriceInteger} />

            <Collection.ListItemLastPriceDescription
              lastPrice={productLastPriceInteger}
            />
          </Collection.ListItemDescriptionContainer>
        </Collection.ListItem>
      </Collection>,
    );

    const collectionList = screen.getByRole("list");
    const collectionListItem = screen.getByRole("listitem");
    const collectionListItemTag = screen.getByText(productTag);
    const collectionListItemDescriptionContainer = screen.getByRole("tooltip", {
      hidden: true,
    });
    const collectionListItemHeading = screen.getByText(productHeading);
    const collectionListItemSubHeading = screen.getByText(productSubheading);
    const collectionListItemPrice = screen.getByTestId("collection-price");
    const collectionListItemLastPrice = screen.getByText(
      "Najniższa cena z 30 dni przed obniżką:",
    );

    // Assert
    expect(collectionList).toBeInTheDocument();
    expect(collectionList.children.length).toBe(1);

    expect(collectionListItem).toBeInTheDocument();
    expect(collectionListItem).toHaveStyle("top: auto");
    expect(collectionListItem).toHaveStyle("right: auto");
    expect(collectionListItem).toHaveStyle("bottom: auto");
    expect(collectionListItem).toHaveStyle("left: auto");

    expect(collectionListItemTag).toBeInTheDocument();

    expect(collectionListItemDescriptionContainer).toBeInTheDocument();
    expect(collectionListItemDescriptionContainer).toHaveClass("top-right");
    expect(collectionListItemDescriptionContainer).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(collectionListItemHeading).toBeInTheDocument();

    expect(collectionListItemSubHeading).toBeInTheDocument();

    expect(collectionListItemPrice).toBeInTheDocument();
    expect(collectionListItemPrice).toHaveTextContent("1 234,-");

    expect(collectionListItemLastPrice).toBeInTheDocument();
    expect(collectionListItemLastPrice).toHaveTextContent(
      `Najniższa cena z 30 dni przed obniżką: 1 444,-`,
    );
  });

  it("should render correctly with all additional props", () => {
    // Arrange
    const productTag = "New";
    const productTagAdditionalClass = "tag-class";
    const productDescriptionContainerAdditionalClass = "description-class";
    const productHeading = "Collection heading";
    const productSubheading = "Collection subheading";
    const productId = "description-id";
    const productLink = "https://collection.com";
    const productPriceInteger = 1234;
    const productPriceDecimal = 89;
    const productPriceQuantity = 3;
    const productPriceSize = 3.17;
    const productLastPriceInteger = 1444;
    const productLastPriceDecimal = 99;
    const productLastPriceAdditionalClass = "last-price-class";

    // Act
    render(
      <Collection showOnlyOnHover={true}>
        <Collection.ListItem
          descriptionContainerId={productId}
          top="50%"
          right="50%"
        >
          <Collection.ListItemTag
            variant="black"
            className={productTagAdditionalClass}
          >
            {productTag}
          </Collection.ListItemTag>

          <Collection.ListItemDescriptionContainer
            id={productId}
            linkToProduct={productLink}
            placement="top-center"
            className={productDescriptionContainerAdditionalClass}
          >
            <Collection.ListItemHeadingContainer>
              <Collection.ListItemHeading>
                {productHeading}
              </Collection.ListItemHeading>

              <Collection.ListItemSubHeading>
                {productSubheading}
              </Collection.ListItemSubHeading>
            </Collection.ListItemHeadingContainer>

            <Collection.ListItemPrice
              price={productPriceInteger}
              priceDecimal={productPriceDecimal}
              quantity={productPriceQuantity}
              sizeInMeters={productPriceSize}
            />

            <Collection.ListItemLastPriceDescription
              lastPrice={productLastPriceInteger}
              lastPriceDecimal={productLastPriceDecimal}
              className={productLastPriceAdditionalClass}
            />
          </Collection.ListItemDescriptionContainer>
        </Collection.ListItem>
      </Collection>,
    );

    const collectionList = screen.getByRole("list");
    const collectionListItem = screen.getByRole("listitem");
    const collectionListItemDescriptionContainer = screen.getByRole("tooltip", {
      hidden: true,
    });
    const collectionListItemTag = screen.getByText(productTag);
    const collectionListItemHeading = screen.getByText(productHeading);
    const collectionListItemSubHeading = screen.getByText(productSubheading);
    const collectionListItemPrice = screen.getByTestId("collection-price");
    const collectionListItemLastPrice = screen.getByText(
      "Najniższa cena z 30 dni przed obniżką:",
    );

    // Assert
    expect(collectionList).toBeInTheDocument();
    expect(collectionList).toHaveClass("show-only-on-hover");

    expect(collectionListItem).toBeInTheDocument();
    expect(collectionListItem).toHaveStyle("top: 50%");
    expect(collectionListItem).toHaveStyle("right: 50%");
    expect(collectionListItem).toHaveStyle("bottom: auto");
    expect(collectionListItem).toHaveStyle("left: auto");

    expect(collectionListItemDescriptionContainer).toBeInTheDocument();
    expect(collectionListItemDescriptionContainer).toHaveClass("top-center");
    expect(collectionListItemDescriptionContainer).toHaveClass(
      productDescriptionContainerAdditionalClass,
    );

    expect(collectionListItemTag).toBeInTheDocument();
    expect(collectionListItemTag).toHaveClass(productTagAdditionalClass);
    expect(collectionListItemTag).toHaveClass("tx-black");

    expect(collectionListItemHeading).toBeInTheDocument();

    expect(collectionListItemSubHeading).toBeInTheDocument();

    expect(collectionListItemPrice).toBeInTheDocument();
    expect(collectionListItemPrice).toHaveTextContent(
      `1 234 ,${productPriceDecimal} /${productPriceQuantity} szt. /${productPriceSize} m`,
    );

    expect(collectionListItemLastPrice).toBeInTheDocument();
    expect(collectionListItemLastPrice).toHaveTextContent(
      `Najniższa cena z 30 dni przed obniżką: 1 444,${productLastPriceDecimal}`,
    );
  });

  it("should render ListItem with proper styles", () => {
    // Act
    render(
      <Collection>
        <Collection.ListItem
          descriptionContainerId="test-id"
          top="auto"
          right="auto"
          bottom="25%"
          left="25%"
        >
          <div>some children</div>
        </Collection.ListItem>
        ,
      </Collection>,
    );

    const collectionListItem = screen.getByRole("listitem");

    // Assert
    expect(collectionListItem).toHaveStyle("top: auto");
    expect(collectionListItem).toHaveStyle("right: auto");
    expect(collectionListItem).toHaveStyle("bottom: 25%");
    expect(collectionListItem).toHaveStyle("left: 25%");
  });

  it("should show item description on hover", async () => {
    // Arrange
    const user = userEvent.setup();
    const descriptionContainerId = "test-id";
    const productLink = "https://collection.com";

    // Act
    render(
      <Collection>
        <Collection.ListItem descriptionContainerId={descriptionContainerId}>
          <Collection.ListItemDescriptionContainer
            id={descriptionContainerId}
            linkToProduct={productLink}
            placement="top-right"
          >
            <div>some children</div>
          </Collection.ListItemDescriptionContainer>
        </Collection.ListItem>
        ,
      </Collection>,
    );

    const collectionListItem = screen.getByRole("listitem");
    const collectionListItemDescriptionContainer = screen.getByRole("tooltip", {
      hidden: true,
    });
    const collectionListItemButton = screen.getByRole("button");
    const collectionListItemLink = screen.getByRole("link", { hidden: true });

    // Assert
    expect(collectionListItem).toBeInTheDocument();

    expect(collectionListItemDescriptionContainer).toBeInTheDocument();
    expect(collectionListItemDescriptionContainer).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(collectionListItemButton).toHaveAttribute(
      "aria-controls",
      descriptionContainerId,
    );
    expect(collectionListItemButton).toHaveAttribute(
      "aria-labelledby",
      descriptionContainerId,
    );

    expect(collectionListItemLink).toBeInTheDocument();
    expect(collectionListItemLink).toHaveAttribute("tabIndex", "-1");

    // Act - hover
    await user.hover(collectionListItem);

    // Assert - hover
    expect(collectionListItemDescriptionContainer).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    expect(collectionListItemLink).toHaveAttribute("tabIndex", "0");
  });

  it("should show item description on focus", () => {
    // Arrange
    const descriptionContainerId = "test-id";
    const productLink = "https://collection.com";

    // Act
    render(
      <Collection>
        <Collection.ListItem descriptionContainerId={descriptionContainerId}>
          <Collection.ListItemDescriptionContainer
            id={descriptionContainerId}
            linkToProduct={productLink}
            placement="top-right"
          >
            <div>some children</div>
          </Collection.ListItemDescriptionContainer>
        </Collection.ListItem>
        ,
      </Collection>,
    );

    const collectionListItem = screen.getByRole("listitem");
    const collectionListItemDescriptionContainer = screen.getByRole("tooltip", {
      hidden: true,
    });
    const collectionListItemButton = screen.getByRole("button");
    const collectionListItemLink = screen.getByRole("link", { hidden: true });

    // Assert
    expect(collectionListItem).toBeInTheDocument();

    expect(collectionListItemDescriptionContainer).toBeInTheDocument();
    expect(collectionListItemDescriptionContainer).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(collectionListItemButton).toHaveAttribute(
      "aria-controls",
      descriptionContainerId,
    );
    expect(collectionListItemButton).toHaveAttribute(
      "aria-labelledby",
      descriptionContainerId,
    );

    expect(collectionListItemLink).toBeInTheDocument();
    expect(collectionListItemLink).toHaveAttribute("tabIndex", "-1");

    // Act - hover
    fireEvent.focus(collectionListItem);

    // Assert - hover
    expect(collectionListItemDescriptionContainer).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    expect(collectionListItemLink).toHaveAttribute("tabIndex", "0");
  });

  it("should show item description on hover and focus on the proper item and hide them on unhover or focus loose", async () => {
    // Arrange
    const user = userEvent.setup();
    const descriptionContainerId = "test-id";
    const productLink = "https://collection.com";
    const descriptionContainerId_2 = "test-id_2";
    const productLink_2 = "https://collection-2.com";

    // Act
    render(
      <Collection>
        <Collection.ListItem descriptionContainerId={descriptionContainerId}>
          <Collection.ListItemDescriptionContainer
            id={descriptionContainerId}
            linkToProduct={productLink}
            placement="top-right"
          >
            <div>Some Children</div>
          </Collection.ListItemDescriptionContainer>
        </Collection.ListItem>
        <Collection.ListItem descriptionContainerId={descriptionContainerId_2}>
          <Collection.ListItemDescriptionContainer
            id={descriptionContainerId_2}
            linkToProduct={productLink_2}
            placement="top-right"
          >
            <div>Some Children 2</div>
          </Collection.ListItemDescriptionContainer>
        </Collection.ListItem>
        ,
      </Collection>,
    );

    const collectionListItems = screen.getAllByRole("listitem");
    const collectionListItemDescriptionContainers = screen.getAllByRole(
      "tooltip",
      {
        hidden: true,
      },
    );
    const collectionListItemButtons = screen.getAllByRole("button");
    const collectionListItemLinks = screen.getAllByRole("link", {
      hidden: true,
    });

    // Assert
    collectionListItems.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    collectionListItemDescriptionContainers.forEach((element) => {
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("aria-hidden", "true");
    });

    expect(collectionListItemButtons[0]).toHaveAttribute(
      "aria-controls",
      descriptionContainerId,
    );
    expect(collectionListItemButtons[0]).toHaveAttribute(
      "aria-labelledby",
      descriptionContainerId,
    );

    expect(collectionListItemLinks[0]).toBeInTheDocument();
    expect(collectionListItemLinks[0]).toHaveAttribute("tabIndex", "-1");
    expect(collectionListItemLinks[0]).toHaveAttribute("href", productLink);

    expect(collectionListItemButtons[1]).toHaveAttribute(
      "aria-controls",
      descriptionContainerId_2,
    );
    expect(collectionListItemButtons[1]).toHaveAttribute(
      "aria-labelledby",
      descriptionContainerId_2,
    );

    expect(collectionListItemLinks[1]).toBeInTheDocument();
    expect(collectionListItemLinks[1]).toHaveAttribute("tabIndex", "-1");
    expect(collectionListItemLinks[1]).toHaveAttribute("href", productLink_2);

    // Act - hover on first item
    await user.hover(collectionListItems[0]);

    // Assert - hover on first item
    expect(collectionListItemDescriptionContainers[0]).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    expect(collectionListItemLinks[0]).toHaveAttribute("tabIndex", "0");

    expect(collectionListItemDescriptionContainers[1]).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(collectionListItemLinks[1]).toHaveAttribute("tabIndex", "-1");

    // Act - focus on second item
    fireEvent.focus(collectionListItems[1]);

    // Assert - hover on second item
    expect(collectionListItemDescriptionContainers[0]).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(collectionListItemLinks[0]).toHaveAttribute("tabIndex", "-1");

    expect(collectionListItemDescriptionContainers[1]).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    expect(collectionListItemLinks[1]).toHaveAttribute("tabIndex", "0");

    // Act - hover and unhover on second item
    await user.hover(collectionListItemLinks[1]);
    await user.unhover(collectionListItemLinks[1]);

    // Assert - hover and unhover on second item
    expect(collectionListItemDescriptionContainers[0]).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(collectionListItemLinks[0]).toHaveAttribute("tabIndex", "-1");

    expect(collectionListItemDescriptionContainers[1]).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(collectionListItemLinks[1]).toHaveAttribute("tabIndex", "-1");

    // Act - focus and blur on second item
    fireEvent.focus(collectionListItemLinks[1]);
    fireEvent.blur(collectionListItemLinks[1]);

    // Assert - focus and blur on second item
    expect(collectionListItemDescriptionContainers[0]).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(collectionListItemLinks[0]).toHaveAttribute("tabIndex", "-1");

    expect(collectionListItemDescriptionContainers[1]).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(collectionListItemLinks[1]).toHaveAttribute("tabIndex", "-1");
  });
});
