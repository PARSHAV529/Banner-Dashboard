import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [banner, setBanner] = useState({
    isVisible: true,
    description: '',
    countdown: 0,
    link: ''
  });

  useEffect(() => {
    // Fetch initial banner data from the server
    axios.get('http://localhost:5000/api/banner')
      .then(response => setBanner(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner(prevBanner => ({
      ...prevBanner,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios.post('http://localhost:5000/api/banner', banner)
    .then(response => {
      toast.success('Banner updated successfully!');
    })
    .catch(error => {
      toast.error('Error updating banner.');
      console.error(error);
    });
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <label>
        Visible:
        <input
          type="checkbox"
          name="isVisible"
          checked={banner.isVisible}
          onChange={(e) => handleChange({ target: { name: 'isVisible', value: e.target.checked } })}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={banner.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Timer (seconds):
        <input
          type="number"
          name="countdown"
          value={banner.countdown}
          onChange={handleChange}
        />
      </label>
      <label>
        Link:
        <input
          type="text"
          name="link"
          value={banner.link}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Dashboard;
