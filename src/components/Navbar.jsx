import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({
  setThemePreference,
  currentTheme,
  isLoggedIn,
  logout,
  username,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownThemeOpen, setDropdownThemeOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleThemeDropdown = () => {
    setDropdownThemeOpen(!dropdownThemeOpen);
  };

  const themeIcon = () => {
    switch (currentTheme) {
      case "dark":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            className="w-6 h-6"
            viewBox="0 0 384 512"
          >
            <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
          </svg>
        );
      case "light":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            className="w-6 h-6"
            viewBox="0 0 512 512"
          >
            <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
            />
          </svg>
        );
    }
  };

  return (
    <nav className="bg-slate-50 border-b dark:border-slate-800 dark:bg-gray-900 p-4 mx-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-black dark:text-slate-50 text-xl font-bold">
          Catur Hendra x Aksamedia
        </h1>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                className="hidden sm:inline-block text-black dark:text-slate-50 px-4 py-2 hover:opacity-70"
              >
                Home
              </Link>
              <Link
                to="/employee"
                className="hidden sm:inline-block text-black dark:text-slate-50 px-4 py-2 hover:opacity-70"
              >
                Employee
              </Link>

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-black dark:text-slate-50 px-4 py-2 hover:opacity-70"
                >
                  {username}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                    <Link
                      to="/"
                      className="block w-full text-left px-4 py-2 text-black dark:text-slate-50 hover:bg-gray-100 dark:hover:bg-gray-700 sm:hidden"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/employee"
                      className="block w-full text-left px-4 py-2 text-black dark:text-slate-50 hover:bg-gray-100 dark:hover:bg-gray-700 sm:hidden"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Employee
                    </Link>
                    <Link
                      to="/Profile"
                      className="block w-full text-left px-4 py-2 text-black dark:text-slate-50 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-black dark:text-slate-50 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (<></>)}
          <div className="relative">
            <button
              onClick={toggleThemeDropdown}
              className="text-black dark:text-slate-50 px-4 py-2 rounded-md"
            >
              {themeIcon()}
            </button>
            {dropdownThemeOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-black dark:text-slate-50 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setThemePreference("dark");
                    setDropdownThemeOpen(false);
                  }}
                >
                  Dark
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-black dark:text-slate-50 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setThemePreference("light");
                    setDropdownThemeOpen(false);
                  }}
                >
                  Light
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-black dark:text-slate-50 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setThemePreference("system");
                    setDropdownThemeOpen(false);
                  }}
                >
                  System
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
