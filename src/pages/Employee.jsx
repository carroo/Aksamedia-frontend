import React, { useState, useEffect } from "react";

import 'toastr/build/toastr.min.css';
import toastr from 'toastr';


function Employee() {
  const loadStateFromLocalStorage = () => {
    const storedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    const storedSearch = localStorage.getItem("search") || "";
    const storedSearchDevision = localStorage.getItem("searchDevision") || "";
    const storedCurrentPage =
      parseInt(localStorage.getItem("currentPage")) || 1;

    return {
      storedEmployees,
      storedSearch,
      storedSearchDevision,
      storedCurrentPage,
    };
  };

  const [employees, setEmployees] = useState(
    () => loadStateFromLocalStorage().storedEmployees
  );
  const [name, setName] = useState("");
  const [search, setSearch] = useState(
    () => loadStateFromLocalStorage().storedSearch
  );
  const [searchDevision, setSearchDevision] = useState(
    () => loadStateFromLocalStorage().storedSearchDevision
  );
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [devision, setDevision] = useState("");
  const [position, setPosition] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    () => loadStateFromLocalStorage().storedCurrentPage
  );
  const employeesPerPage = 6;

  const devisions = ["Marketing", "Development", "Design", "Sales"];
  const positions = [
    "Manager",
    "Developer",
    "Designer",
    "Sales Representative",
  ];

  useEffect(() => {
    const { storedEmployees, storedSearch, storedSearchDevision } =
      loadStateFromLocalStorage();
    const results = storedEmployees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(storedSearch.toLowerCase()) &&
        (storedSearchDevision === "" ||
          employee.devision === storedSearchDevision)
    );
    setFilteredEmployees(results);
  }, []);

  useEffect(() => {
    const results = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) &&
        (searchDevision === "" || employee.devision === searchDevision)
    );
    setFilteredEmployees(results);

    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("search", search);
    localStorage.setItem("searchDevision", searchDevision);
    localStorage.setItem("currentPage", currentPage.toString());
  }, [employees, search, searchDevision, currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedEmployees;
    if (editingIndex >= 0) {
      updatedEmployees = employees.map((emp, index) =>
        index === editingIndex
          ? { name, phone, image, devision, position }
          : emp
      );
    } else {
      updatedEmployees = [
        ...employees,
        { name, phone, image, devision, position },
      ];
    }
    toastr.success('Employee added successfully');
    setEmployees(updatedEmployees);
    resetForm();
  };

  const handleEdit = (index) => {
    const employee = employees[index];
    setName(employee.name);
    setPhone(employee.phone);
    setImage(employee.image);
    setDevision(employee.devision);
    setPosition(employee.position);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    toastr.success('Employee deleted successfully');
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setImage("");
    setDevision("");
    setPosition("");
    setEditingIndex(-1);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber.toString());
  };
  return (
    <div className="container">
      <h2 className="text-4xl font-bold dark:text-slate-50 mt-4 mb-8 text-center">
        Data Employee
      </h2>
      <div className="flex flex-wrap ">
        <div className="w-full md:w-1/3 p-2">
          <div className="border rounded-lg p-2">
            <h4 className="text-xl font-bold text-center dark:text-slate-50 my-4">
              Form Data
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="px-4">
                <div className="flex flex-wrap mb-3">
                  <label className="block text-sm font-medium dark:text-slate-300 text-slate-700">
                    Name
                  </label>
                  <input
                    className="w-full h-10 rounded-md border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-black dark:text-slate-200 px-3 py-2 text-sm"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-wrap mb-3">
                  <label className="block text-sm font-medium dark:text-slate-300 text-slate-700">
                    Phone
                  </label>
                  <input
                    className="w-full h-10 rounded-md border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-black dark:text-slate-200 px-3 py-2 text-sm"
                    placeholder="0899"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-wrap mb-3">
                  <label className="block text-sm font-medium dark:text-slate-300 text-slate-700">
                    Image URL
                  </label>
                  <input
                    className="w-full h-10 rounded-md border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-black dark:text-slate-200 px-3 py-2 text-sm"
                    placeholder="Image URL"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap mb-3">
                  <label className="block text-sm font-medium dark:text-slate-300 text-slate-700">
                    Devision
                  </label>
                  <select
                    className="w-full h-10 rounded-md border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-black dark:text-slate-200 px-3 py-2 text-sm"
                    value={devision}
                    onChange={(e) => setDevision(e.target.value)}
                    required
                  >
                    <option value="">Select Devision</option>
                    {devisions.map((dev, index) => (
                      <option key={index} value={dev}>
                        {dev}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-wrap mb-3">
                  <label className="block text-sm font-medium dark:text-slate-300 text-slate-700">
                    Position
                  </label>
                  <select
                    className="w-full h-10 rounded-md border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-black dark:text-slate-200 px-3 py-2 text-sm"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  >
                    <option value="">Select Position</option>
                    {positions.map((pos, index) => (
                      <option key={index} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center p-6">
                <button
                  className="w-full items-center justify-center rounded-md text-sm font-medium dark:bg-slate-600 bg-black dark:hover:bg-slate-700 hover:bg-black/90 text-slate-50 h-10 px-4 py-2"
                  type="submit"
                >
                  {editingIndex >= 0 ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full md:w-2/3 p-2">
          <div className="border rounded-lg p-2">
            <div className="flex justify-between m-4">
              <h4 className="text-xl font-bold dark:text-slate-50 ">
                Card Data
              </h4>
              <div className="flex gap-2">
                <input
                  className="w-full h-10 rounded-md border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-black dark:text-slate-200 px-3 py-2 text-sm"
                  placeholder="Search Name"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="w-full h-10 rounded-md border dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-black dark:text-slate-200 px-3 py-2 text-sm"
                  value={searchDevision}
                  onChange={(e) => setSearchDevision(e.target.value)}
                >
                  <option value="">All Devision</option>
                  {devisions.map((dev, index) => (
                    <option key={index} value={dev}>
                      {dev}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee, index) => (
                  <div
                    key={index}
                    className="rounded-lg border w-full max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-xl"
                  >
                    <div className="p-6 grid gap-4">
                      <div className="grid gap-1">
                        {employee.image ? (
                          <img
                            src={employee.image}
                            alt={`${employee.name} Avatar`}
                            className="mx-auto rounded-full border-4 border-white dark:border-gray-800 w-32 h-32 object-cover bg-slate-300"
                          />
                        ) : (
                          <div className="mx-auto rounded-full border-4 border-white dark:border-gray-800 w-32 h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-4xl font-bold text-gray-500 dark:text-gray-400">
                              {employee.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-center">
                          {employee.name}
                        </h3>
                        <p className="text-center">
                          <span className="bg-green-700 rounded-lg px-1 text-slate-50">{employee.position}</span>
                        </p>
                      </div>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-gray-400 dark:text-gray-500"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          <p>{employee.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-gray-400 dark:text-gray-500"
                          >
                            <rect
                              width="16"
                              height="20"
                              x="4"
                              y="2"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M9 22v-4h6v4"></path>
                            <path d="M8 6h.01"></path>
                            <path d="M16 6h.01"></path>
                            <path d="M12 6h.01"></path>
                            <path d="M12 10h.01"></path>
                            <path d="M12 14h.01"></path>
                            <path d="M16 10h.01"></path>
                            <path d="M16 14h.01"></path>
                            <path d="M8 10h.01"></path>
                            <path d="M8 14h.01"></path>
                          </svg>
                          <p>{employee.devision}</p>
                        </div>
                      </div>
                      <div className="flex justify-center mt-2">
                        <button
                          onClick={() =>
                            handleEdit(indexOfFirstEmployee + index)
                          }
                          className="text-sm px-3 py-1 rounded-md bg-yellow-500 hover:bg-yellow-400 text-white mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(indexOfFirstEmployee + index)
                          }
                          className="text-sm px-3 py-1 rounded-md bg-red-500 hover:bg-red-400 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <p className="text-gray-600 dark:text-gray-300">
                    No employees found
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-center my-4">
              {filteredEmployees.length > employeesPerPage && (
                <div>
                  <ul className="flex">
                    {Array.from({
                      length: Math.ceil(
                        filteredEmployees.length / employeesPerPage
                      ),
                    }).map((_, index) => (
                      <li key={index}>
                        <button
                          onClick={() => paginate(index + 1)}
                          className={`px-3 py-1 mx-1 rounded ${
                            currentPage === index + 1
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
