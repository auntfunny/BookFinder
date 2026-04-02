import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [url, setUrl] = useState(``);
  const [form, setForm] = useState({ search: "" });
  const { data, error, loading } = useFetch(url);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/explore/${form.search}`);
  };

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <SearchContext.Provider
      value={{ url, setUrl, form, handleSubmit, handleChange }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
