export type ShopType = (typeof shopsList)[number];

export const shopsList = [
  {
    name: "IKEA Bydgoszcz",
    address: "ul. Skandynawska 1, Bydgoszcz",
    openingHours: {
      "pon. - pt.": "10:00 - 20:00",
      "sob.": "10:00 - 21:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "10:00 - 20:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Gdańsk",
    address: "ul. Złota Karczma 26, Gdańsk",
    openingHours: {
      "pon. - sob.": "10:00 - 21:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "10:00 - 21:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Katowice",
    address: "al. W. Roździeńskiego 95, Katowice",
    openingHours: {
      "pon. - sob.": "10:00 - 21:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "10:00 - 21:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Kraków",
    address: "ul. Josepha Conrada 66, Kraków",
    openingHours: {
      "pon. - sob.": "10:00 - 21:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "09:00 - 21:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Lublin",
    address: "Aleja Spółdzielczości Pracy 86, Lublin",
    openingHours: {
      "pon. - pt.": "10:00 - 21:00",
      "sob.": "09:00 - 21:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "09:00 - 20:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Łódź",
    address: "ul. Pabianicka 255, Łódź",
    openingHours: {
      "pon. - sob.": "10:00 - 21:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "10:00 - 20:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Poznań",
    address: "ul. Szwedzka 10, Poznań",
    openingHours: {
      "pon. - sob.": "09:00 - 21:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "09:00 - 20:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Szczecin",
    address: "ul. Białowieska 2, Szczecin",
    openingHours: {
      "pon. - pt.": "10:00 - 20:00",
      "sob.": "10:00 - 21:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "10:00 - 20:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Warszawa Janki",
    address: "Janki, pl. Szwedzki 1, Raszyn",
    openingHours: {
      "pon. - sob.": "09:00 - 22:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "09:00 - 21:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Warszawa Targówek",
    address: "ul. Malborska 51, Warszawa",
    openingHours: {
      "pon. - sob.": "09:00 - 22:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "09:00 - 21:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
  {
    name: "IKEA Wrocław",
    address: "Bielany Wrocławskie, Czekoladowa 5A, Kobierzyce",
    openingHours: {
      "pon. - sob.": "09:00 - 21:00",
      "niedz.": "Zamknięte",
    },
    nonStandardOpeningHours: {
      "17.12.2023": "09:00 - 20:00",
      "24.12.2023": "Zamknięte",
      "25.12.2023": "Zamknięte",
      "26.12.2023": "Zamknięte",
      "1.01.2024": "Zamknięte",
      "6.01.2024": "Zamknięte",
    },
  },
] as const;

export const nextTradingSunday = "17 grudnia 2023";
