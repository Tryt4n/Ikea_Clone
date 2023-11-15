import Btn, { BtnPropsType } from "../Btn/Btn";
import HeartIcon from "../../Icons/HeartIcon";

export default function AddToWishListBtn({ ...props }: Omit<BtnPropsType, "children">) {
  return (
    <Btn
      {...props}
      shape="circle"
    >
      <span className="visually-hidden">Dodaj do ulubionych</span>
      <HeartIcon />
    </Btn>
  );
}
