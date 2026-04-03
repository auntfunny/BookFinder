import SearchForm from "../components/SearchForm";
import { useParams } from "react-router-dom";
import BookList from "../components/BookList";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

const Explore = () => {
  const [showBooks, setShowBooks] = useState(0);
  const [page, setPage] = useState(1);
  const { search } = useParams();


  useEffect(() => {
    setShowBooks(0);
    setPage(1);
  }, [search]);


  const { data, error, loading } = useFetch(
      `https://openlibrary.org/search.json?q=${search}&page=${page}`
  );
  
  const totalBooks = data?.numFound || 0;

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowBooks(0);
  };


  return (
    <div className="flex flex-col gap-4 items-center bg-gray-200 min-h-screen w-full">
      {console.log(data)}
      <SearchForm />
      <div className="flex justify-between items-center w-full px-4 md:max-w-2xl lg:max-w-4xl">
        <h2 className="text-2xl font-bold">Search: {search}</h2>
      </div>
      <BookList data={data.docs ? data.docs.slice(0, (showBooks + 1) * 20) : []} error={error} loading={loading} />
      { totalBooks > ((page -1) * 100) + ((showBooks + 1) * 20)  ? showBooks < 4 ? <button
      onClick={() => {setShowBooks((prev) => prev + 1)}}
        type="button"
        className="w-42 bg-accBlue p-3 mb-10 rounded-2xl text-white font-bold hover:bg-blue-700 active:bg-blue-800 hover:cursor-pointer"
      >
        Show More
      </button>
      :
      <button
      onClick={handleNextPage}
        type="button"
        className="w-42 bg-accBlue p-3 mb-10 rounded-2xl text-white font-bold hover:bg-blue-700 active:bg-blue-800 hover:cursor-pointer"
      >
        Next Page
      </button> : null}
    </div>
  );
};

export default Explore;
