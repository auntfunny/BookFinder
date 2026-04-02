import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { FavProvider } from "./context/FavContext";
import Home from "./pages/Home";
import { faker } from "@faker-js/faker";
import Favorites from "./pages/Favorites";
import Explore from "./pages/Explore";
import { SearchProvider } from "./context/SearchContext";
import { useEffect } from "react";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { pathname } = useLocation();
  const defaultGenre = faker.book.genre();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <>
      <AuthProvider>
        <FavProvider>
          <SearchProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home defaultGenre={defaultGenre} />} />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route path="/explore/:search" element={<Explore />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            <Footer />
          </SearchProvider>
        </FavProvider>
      </AuthProvider>
    </>
  );
}

export default App;
