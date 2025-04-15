
import React, { useState } from 'react';
import axios from 'axios';
import '../app.css'; 

export default function ReportItem() {
  const [status, setStatus] = useState('lost');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [image, setImage] = useState(null); // Optional, based on your backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('status', status);
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('date', date);
      formData.append('contactInfo', contactInfo);
      if (image) {
        formData.append('image', image);
      }
  
      const token = localStorage.getItem('authToken');
  
      const response = await axios.post('http://localhost:5006/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert('Report submitted successfully');
      console.log(response.data);
    } catch (err) {
      console.error('Error reporting item', err);
      alert('Failed to report item.');
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = {
  //       status,
  //       title,
  //       category,
  //       description,
  //       location,
  //       date,
  //       contactInfo
  //     };

  //     const token = localStorage.getItem("authToken");

  //     const response = await axios.post('http://localhost:5006/api/items', formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     alert("Report submitted successfully");
  //     console.log(response.data);
  //   } catch (err) {
  //     console.error("Error reporting item", err);
  //     alert("Failed to report item.");
  //   }
  // };

  return (
    <div className="report-wrapper">
      <h1 className="report-title">Report Lost or Found Item</h1>
      <p>Please provide as much detail as possible to help us match lost items with their owners.</p>

      <div className="report-form">
        <div className="status-toggle">
          <button 
            className={status === 'lost' ? 'active' : ''} 
            onClick={() => setStatus('lost')}
          >
            I Lost an Item
          </button>
          <button 
            className={status === 'found' ? 'active' : ''} 
            onClick={() => setStatus('found')}
          >
            I Found an Item
          </button>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input 
            type="text" 
            placeholder="Item Title" 
            required 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="input-field"
          />
          
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            className="input-field"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="id-card">ID Card</option>
            <option value="clothing">Clothing</option>
            {/* Add more */}
          </select>

          <textarea 
            placeholder="Description" 
            rows="4" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="input-field"
          ></textarea>

          <input 
            type="text" 
            placeholder="Location (e.g. Library, Room 204)" 
            value={location} 
            onChange={e => setLocation(e.target.value)} 
            className="input-field"
          />

          <input 
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
            className="input-field"
          />

          <input 
            type="text" 
            placeholder="Contact Info (Phone or Email)" 
            value={contactInfo} 
            onChange={e => setContactInfo(e.target.value)} 
            className="input-field"
          />

          <input 
            type="file" 
            accept="image/*" 
            onChange={e => setImage(e.target.files[0])} 
            className="input-field"
          />

          <button 
            type="submit" 
            className="submit-btn"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
