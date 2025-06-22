import React, { useState } from 'react';

const data = [
  { id: 1, name: 'Harshada', role: 'Developer', email: 'harshada@example.com' },
  { id: 2, name: 'Amit', role: 'Designer', email: 'amit@example.com' },
  { id: 3, name: 'Priya', role: 'Manager', email: 'priya@example.com' },
  { id: 4, name: 'Rohan', role: 'Tester', email: 'rohan@example.com' },
  { id: 5, name: 'Neha', role: 'HR', email: 'neha@example.com' },
  { id: 6, name: 'Suresh', role: 'Lead', email: 'suresh@example.com' },
  { id: 7, name: 'Meena', role: 'Analyst', email: 'meena@example.com' },
  { id: 8, name: 'Tarun', role: 'Intern', email: 'tarun@example.com' },
];

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page when searching
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 User Table</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 border rounded w-full max-w-md"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center max-w-md">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
