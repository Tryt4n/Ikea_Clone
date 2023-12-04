import Shop2Icon from "../Icons/Shop2Icon";
import TruckIcon from "../Icons/TruckIcon";

export const deliveryOptions = [
  {
    option: "homeDelivery",
    text: "Dostawa do domu",
    icon: <TruckIcon />,
  },
  {
    option: "otherOptions",
    text: "Opcje odbioru: Sklep, InPost, Punkt Odbioru",
    icon: <Shop2Icon />,
  },
] as const;
