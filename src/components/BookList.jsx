import { useLocation } from "react-router-dom";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { useFaves } from "../context/FavContext";

const BookList = ({ data, error, loading, loadNumber }) => {
  const {loadingBooks} = useFaves();
  const { pathname } = useLocation();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 p-4 place-items-center">
      {loading || !data ? (
        Array(loadNumber ? loadNumber : 8)
          .fill()
          .map((_, index) => <BookCardSkeleton key={index} />)
      ) : error ? (
        <p className="col-span-4 p-4 text-2xl font-bold text-center">
          Oh no, something went wrong, please reload or try again later
        </p>
      ) : data.length > 0 ? (
        data.map((book) => <BookCard book={book} key={book.key} />)
      ) : pathname.includes("explore") ? (
        <p className="col-span-4 p-4 text-2xl font-bold text-center">
          No items match your search
        </p>
      ) : <p className="col-span-4 p-4 text-2xl font-bold text-center">
          {loadingBooks ? "Loading your favorite books" : "You have no favorites yet, go find some!"}
        </p>}
    </div>
  );
};

export default BookList;
