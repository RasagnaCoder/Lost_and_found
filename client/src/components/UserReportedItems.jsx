import React, { useState, useEffect } from 'react';

export default function UserReportedItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:5006/api/items/my-items', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user-reported items');
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching user-reported items:', error);
      }
    };

    fetchUserItems();
  }, []);

  return (
    <div>
      <h2>Your Reported Items</h2>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item._id}>
              <strong>{item.title}</strong> - {item.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items reported yet.</p>
      )}
    </div>
  );
}
