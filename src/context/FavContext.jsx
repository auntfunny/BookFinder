import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import supabase from "../supabase";

const FavContext = createContext();

export function FavProvider({ children }) {
  const [faveData, setFaveData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loadingFaves, setLoadingFaves] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingChange, setLoadingChange] = useState("");
  const [newFavorite, setNewFavorite] = useState(false);
  const { user } = useAuth();

  const getFavorites = async () => {
    console.log("get favorites");
    const { data } = await supabase
      .from("favoriteBooks")
      .select("bookID")
      .eq("user_id", user.id);

    setFaveData(data);
  };

  useEffect(() => {
    if (user) {
      try {
        setLoadingFaves(true);
        getFavorites();
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingFaves(false);
      }
    }
  }, [user, newFavorite]);

  useEffect(() => {
    const fetchFullBookDetails = async () => {
      if (faveData.length === 0) return;

      setLoadingBooks(true);
      console.log("fetch full book");
      try {
        const bookPromises = faveData.map((item) =>
          fetch(`https://openlibrary.org${item.bookID}.json`).then((res) =>
            res.json(),
          ),
        );
        const fullBooks = await Promise.all(bookPromises);
        setFavorites(fullBooks);
      } catch (err) {
        console.error("OpenLibrary Error:", err);
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchFullBookDetails();
  }, [faveData]);

  const editFavorites = async (bookKey) => {
    const exists = favorites.find((book) => book.key === bookKey);
    setLoadingChange(bookKey);
    if (!exists) {
      try {
        const { data, error } = await supabase
          .from("favoriteBooks")
          .insert([{ bookID: bookKey }])
          .select();

        if (error) throw error;
        return { success: true };
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingChange("");
        setNewFavorite(!newFavorite)
      }
    } else {
      try {
        const { error } = await supabase
          .from("favoriteBooks")
          .delete()
          .eq("bookID", bookKey);

          if(error) throw error;
          return{success: true}
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingChange("");
        setNewFavorite(!newFavorite)
      }
    }
  };

  return (
    <FavContext.Provider value={{ favorites, setFavorites, editFavorites, loadingBooks, loadingChange, loadingFaves }}>
      {children}
    </FavContext.Provider>
  );
}

export const useFaves = () => useContext(FavContext);
