import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function ProductPage() {
  const path = useParams();
  const URL = `https://tryt4n.github.io/Ikea-data/server/products/${path.collectionId}/data.json`;

  const navigate = useNavigate();

  const data = useFetch(URL);

  useEffect(() => {
    console.log(data.data);

    if (data.isError) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <h2>ProductPage</h2>;
}
