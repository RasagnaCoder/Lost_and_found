import React, { useEffect, useState } from 'react';

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5006/api/items")
      .then((res) => res.json())
      .then((data) => {
        const found = data.filter(item => item.status === "found");
        setFoundItems(found);
      })
      .catch((err) => console.error("Error fetching found items:", err));
  }, []);

  return (
    <div className="w-full h-screen bg-white text-black overflow-auto">
      <h1 className="text-center text-2xl font-semibold py-4">Found Items</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Title</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Category</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Description</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Location</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Date</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Contact Info</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Image</th> {/* New column for image */}
          </tr>
        </thead>
        <tbody>
          {foundItems.length > 0 ? (
            foundItems.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2">{item.title || ''}</td>
                <td className="border border-gray-300 px-4 py-2">{item.category || ''}</td>
                <td className="border border-gray-300 px-4 py-2">{item.description || ''}</td>
                <td className="border border-gray-300 px-4 py-2">{item.location || ''}</td>
                <td className="border border-gray-300 px-4 py-2">{item.date || ''}</td>
                <td className="border border-gray-300 px-4 py-2">{item.contactInfo || ''}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      style={{ width: '200px', height: 'auto' }} 
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border border-gray-300 px-4 py-2 text-center">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FoundItems;
