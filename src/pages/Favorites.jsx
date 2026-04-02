import BookList from "../components/BookList";
import { useFaves } from "../context/FavContext";

const Favorites = () => {
  const { favorites } = useFaves();
  return (
    <div className="flex flex-col gap-4 items-center bg-gray-200 min-h-screen w-full">
      <h2 className="pt-4 text-2xl font-bold text-accBlue">
        Your Favorite Books
      </h2>
      <BookList data={favorites} error={null} loading={null} />
    </div>
  );
};

export default Favorites;
