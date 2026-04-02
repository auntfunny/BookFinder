import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(event) {
    event.preventDefault();
    setIncorrect(false);
    setShortPassword(false);
    if (password === confirmPassword && password.length > 5) {
      setLoading(true);
      try {
        const { success, user } = await register(email, password);
        if (success) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else if (password !== confirmPassword) {
      setIncorrect(true);
    } else {
      setShortPassword(true);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-200 ">
      <div className="relative flex flex-col justify-center items-center gap-2 bg-white w-xs md:w-md lg:w-lg min-h-100 px-6 pt-10 rounded-2xl shadow-xl ">
        <div className="flex justify-center items-center bg-accBGBlue w-14 h-14 rounded-lg text-accBlue mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold">Please Sign Up</h2>
        <p className="text-gray-400">Please enter your details to sign up</p>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          {incorrect && (
            <p className="text-red-500 font-semibold self-center italic">
              Passwords must match
            </p>
          )}
          {shortPassword && (
            <p className="text-red-500 font-semibold self-center italic">
              Password must be at lease 6 characters
            </p>
          )}
          <div className="flex flex-col gap-1 w-ful">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:inset-ring-1 focus:inset-ring-accBlue"
            />
          </div>
          <div className="relative flex flex-col gap-1 w-full">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="*********"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:inset-ring-1 focus:inset-ring-accBlue"
            />
            <button
              onClick={togglePassword}
              type="button"
              className="absolute right-4 top-7 p-2 text-accBlue hover:cursor-pointer"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="relative flex flex-col gap-1 w-full">
            <label htmlFor="confirmPassword" className="font-semibold">
              Confirm Password
            </label>
            <input
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="*********"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:inset-ring-1 focus:inset-ring-accBlue"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex gap-4 justify-center items-center w-full h-10 font-semibold bg-accBlue text-white rounded-lg hover:cursor-pointer hover:bg-accBGBlue hover:text-accBlue hover:inset-ring-2 hover:inset-ring-accBlue hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            {loading ? "Loading ... " : "Sign Up"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </form>
        <div className="flex justify-center items-center gap-2 p-3 w-xs md:w-md lg:w-lg bg-accBG2 md:bg-white md:pb-4 rounded-b-2xl border-t-2 md:border-t-0 border-gray-200 text-gray-500 text-sm">
          <p>Already have and account?</p>
          <Link to="/login" className="font-semibold text-accBlue">
            Log in here
          </Link>
        </div>
        <div className="hidden md:absolute md:inline-block bottom-0 left-0 h-2 bg-linear-to-r from-accBlue via-blue-400 to-accBlue rounded-b-2xl w-md lg:w-lg "></div>
      </div>
    </div>
  );
}

export default SignUp;
