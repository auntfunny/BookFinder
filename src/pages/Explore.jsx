import SearchForm from "../components/SearchForm";
import { useParams } from "react-router-dom";
import BookList from "../components/BookList";
import useFetch from "../hooks/useFetch";

const Explore = () => {
  const { search } = useParams();
  const { data, error, loading } = useFetch(
    `https://openlibrary.org/search.json?q=${search}&limit=20`,
  );
  return (
    <div className="flex flex-col gap-4 items-center bg-gray-200 min-h-screen w-full">
      <SearchForm />
      <div className="flex justify-between items-center w-full px-4 md:max-w-2xl lg:max-w-4xl">
        <h2 className="text-2xl font-bold">Search: {search}</h2>
      </div>
      <BookList data={data} error={error} loading={loading} />
    </div>
  );
};

export default Explore;
