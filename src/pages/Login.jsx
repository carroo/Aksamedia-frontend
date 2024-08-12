import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';


function Login({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      login();
      toastr.success('Login successfully!');
      navigate("/");
    } else {
      toastr.error('Use username:admin and password:admin!');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-lg border shadow-md m-2 dark:border-gray-700 border-gray-300 mt-12">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight dark:text-slate-50 text-black mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="px-6">
            <div className="flex flex-wrap mb-3">
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                Username
              </label>
              <input
                className="w-full h-10 rounded-md border dark:border-gray-600 border-gray-300 bg-slate-50 dark:bg-gray-900 text-black dark:text-gray-200 px-3 py-2 text-sm"
                placeholder="admin"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap">
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                Password
              </label>
              <input
                className="w-full h-10 rounded-md border dark:border-gray-600 border-gray-300 bg-slate-50 dark:bg-gray-900 text-black dark:text-gray-200 px-3 py-2 text-sm"
                placeholder="admin"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center p-6">
            <button
              className="w-full items-center justify-center rounded-md text-sm font-medium dark:bg-slate-600 bg-black dark:hover:bg-slate-700 hover:bg-black/90 text-slate-50 h-10 px-4 py-2"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
