import { useSearch } from "../context/SearchContext";

function SearchForm() {
  const {form, handleSubmit, handleChange} = useSearch();
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-sm md:w-md lg:w-lg p-3 py-6"
    >
      <div className="relative">
        <input
          onChange={handleChange}
          value={form.search}
          type="text"
          name="search"
          id="search"
          placeholder="Search by title, author, or ISBN"
          className="w-full bg-white p-3 pl-10 rounded-2xl focus:outline-none focus:inset-ring-1 focus:inset-ring-accBlue"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="size-5 absolute top-3 left-3 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <button
        type="submit"
        className="w-full bg-accBlue p-3 rounded-2xl text-white font-bold hover:bg-blue-700 active:bg-blue-800 hover:cursor-pointer"
      >
        Search Library
      </button>
    </form>
  );
}

export default SearchForm;
