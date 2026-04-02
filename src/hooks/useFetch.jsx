import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBooks() {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data.docs);
      } catch (error) {
        console.error("Something went wrong: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getBooks();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
