import useFetch from "../hooks/useFetch";
import SearchForm from "../components/SearchForm";
import BookList from "../components/BookList";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useEffect, useState } from "react";

const Home = ({ defaultGenre }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const isBigScreen = useMediaQuery("(min-width: 1024px)");
  const loadNumber = isBigScreen ? "4" : isMediumScreen ? "3" : "2";
  const { data, error, loading } = useFetch(
    `https://openlibrary.org/search.json?q=${defaultGenre}&limit=4`,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="flex flex-col gap-4 items-center bg-gray-200 min-h-screen w-full">
      {console.log(data, error, loading)}
      <SearchForm />
      <div className="flex justify-between items-center w-full px-4 md:max-w-2xl lg:max-w-4xl">
        <h2 className="text-2xl font-bold">{defaultGenre} Books</h2>
        <Link
          to={`/explore/${defaultGenre}`}
          className="flex items-center justify-center gap-1 text-sm text-accBlue p-1 px-3 rounded-full hover:bg-accBGBlue hover:cursor-pointer"
        >
          Show more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
      <BookList
        data={data.slice(0, loadNumber)}
        error={error}
        loading={loading}
      />
    </main>
  );
};

export default Home;
