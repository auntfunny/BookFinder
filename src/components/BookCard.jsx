import { useEffect, useState } from "react";
import { useFaves } from "../context/FavContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const { favorites, editFavorites, loadingChange } = useFaves();
  const {user} = useAuth()
  const navigate = useNavigate();
  const exists = favorites.find((fave) => fave.key === book.key);
  
  const handleClick = () => {
    if(user){
      editFavorites(book.key)
    } else {
      navigate("/login");
    }
  }
 
  return (
    <div className="relative flex flex-col justify-between w-42 h-88 md:w-52 md:h-104 rounded-2xl min-h-40 bg-white">
      <div className="w-full h-60 md:h-72 overflow-hidden items-center rounded-t-2xl">
        <img
          src={
            book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : book.covers
                ? `https://covers.openlibrary.org/b/id/${book.covers?.[0]}-M.jpg`
                : `https://loremflickr.com/168/240/book`
          }
          alt="Book Cover"
          className="w-full object-cover"
        />
      </div>
      <h2 className="px-4">
        <strong>{book.title}</strong>
      </h2>
      <h3 className="text-sm text-gray-500 px-4">
        {book.author_name ? book.author_name?.[0] : ""}
      </h3>
      <p className="text-sm text-gray-500 font-semibold italic pl-6 px-4 pb-4">
        {book.first_publish_year}
      </p>
      <button
        disabled={loadingChange === book.key}
        onClick={handleClick}
        className={`absolute top-3 right-3 flex justify-center items-center bg-[#fffd] w-10 h-10 rounded-full ${exists ? "text-accBlue" : "text-gray-400"} hover:cursor-pointer hover:shadow hover:bg-accBGBlue`}
      >
        {loadingChange === book.key ? (
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-accBlue border-t-transparent"></div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default BookCard;
