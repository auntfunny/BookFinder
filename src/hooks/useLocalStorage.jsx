function useLocalStorage(action, name, data) {
  let status = null;
  try {
    switch (action) {
      case "set":
        localStorage.setItem(name, JSON.stringify(data));
        status = "Local Storage updated";
        break;
      case "get":
        const localData = localStorage.getItem(name);
        status = JSON.parse(localData);
        break;
      case "remove":
        localStorage.removeItem(name);
        status = "Local Storage updated";
        break;
      case "clear":
        localStorage.clear();
        status = "Local Storage cleared";
        break;
    }
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
  return status;
}

export default useLocalStorage;
