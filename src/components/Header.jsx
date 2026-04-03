import { Link } from "react-router-dom";
import { useFaves } from "../context/FavContext";
import { faker } from "@faker-js/faker";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Header() {
  const {user, logout} = useAuth();
  const {setFavorites, favorites} = useFaves()
  const navigate = useNavigate()

  async function handleLogout(){
    try {
      const result = await logout()
      if(result.success){
        navigate("/login");
        setFavorites([]);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header className="flex justify-between w-full h-16 p-4 md:px-10 lg:px-24 border-b-2 border-gray-300 bg-gray-50 items-center">
      <Link to="/" className="flex gap-1 items-center">
        <h1 className="text-2xl text-accBlue font-bold">BookFinder</h1>
        <img src="/books.png" alt="Book Stack" className="w-10" />
      </Link>
      <nav className="flex justify-evenly grow text-accBlue">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to={`/explore/${faker.book.genre()}`} className="hover:underline">Explore</Link>
        {user ? <button onClick={handleLogout} className="hover:underline hover:cursor-pointer">Log Out</button> : <Link to="/login" className="hover:underline">Login</Link>}
      </nav>
      <Link to="/favorites" className="flex items-center gap-3 p-2 bg-accBGBlue rounded-full text-accBlue">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
        <p className="hidden md:block font-bold">Favorites</p>
        <p className="font-bold text-lg">{favorites.length}</p>
      </Link>
    </header>
  );
}

export default Header;
