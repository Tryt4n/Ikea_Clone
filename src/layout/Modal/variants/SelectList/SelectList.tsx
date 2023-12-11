// Custom Hooks
import useApp from "../../../../hooks/useApp";
// date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pl from "date-fns/locale/pl";
// Helpers
import { productLink } from "../../../../constants/links";
// Components
import Btn from "../../../../components/Btn/Btn";
// Icons
import HeartIcon from "../../../../Icons/HeartIcon";
// Types
import type { FavouritesListType } from "../../../../context/AppContext";
// Style
import "./index.scss";

export default function SelectList() {
  const { state } = useApp();

  return (
    <div className="select-list-modal">
      {state.favouriteLists && (
        <ul className="select-list-modal__list">
          {state.favouriteLists.map((list) => (
            <List
              key={list.id}
              list={list}
            />
          ))}
        </ul>
      )}
      <Btn
        size="big"
        className="select-list-modal__create-new-list-btn"
      >
        Stwórz listę
      </Btn>
    </div>
  );
}

function List({ list }: { list: FavouritesListType }) {
  const firstListProduct = list.products && list.products[0];
  const imgSrc =
    firstListProduct &&
    `${productLink}/${firstListProduct.collection}-${firstListProduct.name}-${firstListProduct.variant}__${firstListProduct.images.main}`;

  return (
    <li>
      <button className="select-list-modal__list-item">
        {list.products && (
          <img
            alt=""
            src={imgSrc}
            loading="lazy"
            className="select-list-modal__list-item-img"
          />
        )}
        <div className="select-list-modal__list-text-wrapper">
          <strong>{list.name}</strong>
          <time dateTime={list.lastEdit.toString()}>
            Zaktualizowano&nbsp;
            {formatDistanceToNow(new Date(list.lastEdit), {
              addSuffix: true,
              locale: pl,
            })}
          </time>
        </div>

        <HeartIcon />
      </button>
    </li>
  );
}
