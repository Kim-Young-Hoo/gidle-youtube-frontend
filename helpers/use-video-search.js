import axios from "axios";
import { useEffect, useState } from "react";

export default function useVideoSearch(skip) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://gidleyoutubecollections.ml/api/videos/",
      params: { skip: skip },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.API_KEY}`,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        console.log(response);
        setBooks((prevBooks) => {
          return [
            ...new Set([
              ...prevBooks,
              ...response.data.docs.map((b) => b.title),
            ]),
          ];
        });
        setHasMore(response.data.docs.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, books, hasMore };
}
