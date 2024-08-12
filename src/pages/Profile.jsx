import React, { useState } from "react";

import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

function Profile({ username, setUsername }) {
  const [newUsername, setNewUsername] = useState(username);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(newUsername);
    sessionStorage.setItem("username", newUsername);
    toastr.success('Username saved successfully');
  };

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold text-center dark:text-slate-50 mb-4">
        Profile
      </h2>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="max-w-lg rounded-lg border shadow-md m-2 p-2 dark:border-gray-700 border-gray-300">
          <input
            className="w-full h-10 rounded-md border dark:border-gray-600 border-gray-300 bg-slate-50 dark:bg-gray-900 text-black dark:text-gray-200 px-3 py-2 text-sm mb-2"
            type="text"
            required
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button
            className="w-full items-center justify-center rounded-md text-sm font-medium dark:bg-slate-600 bg-black dark:hover:bg-slate-700 hover:bg-black/90 text-slate-50 h-10 px-4 py-2"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
