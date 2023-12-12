import Btn, { BtnPropsType } from "../Btn/Btn";
import HeartIcon from "../../Icons/HeartIcon";

type AddToWishListBtnPropsType = {
  active?: boolean;
} & Omit<BtnPropsType, "children">;

export default function AddToWishListBtn({ active, ...props }: AddToWishListBtnPropsType) {
  return (
    <Btn
      {...props}
      shape="circle"
    >
      <span className="visually-hidden">Dodaj do ulubionych</span>
      <HeartIcon active={active} />
    </Btn>
  );
}
