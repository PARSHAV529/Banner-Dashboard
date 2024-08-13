import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
  const [banner, setBanner] = useState({
    isVisible: true,
    description: '',
    countdown: 30, 
    link: ''
  });

  const [timeLeft, setTimeLeft] = useState(banner.countdown);

 
  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(response => {
        const bannerData = response.data;

        
        setBanner(bannerData);

        const savedTime = localStorage.getItem('timeLeft');
        if (savedTime && bannerData.isVisible) {
          
          setTimeLeft(parseInt(savedTime, 10));
        } else {
          setTimeLeft(bannerData.countdown);
        }
      })
      .catch(error => console.error('Error fetching banner data:', error));
  }, []);

  
  useEffect(() => {
    if (banner.isVisible && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;

          if (newTime <= 0) {
            clearInterval(timer);
            localStorage.removeItem('timeLeft'); 
            return 0;
          }

          
          localStorage.setItem('timeLeft', newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [banner.isVisible, timeLeft]);

 
  useEffect(() => {
    if (timeLeft === 0 && banner.isVisible) {
      axios.post('http://localhost:5000/api/banner', { isVisible: false })
        .then(response => {
          console.log('Banner visibility updated:', response.data);
        })
        .catch(error => console.error('Error updating banner visibility:', error));
    }
  }, [timeLeft, banner.isVisible]);

  return (
    (banner.isVisible && timeLeft > 0) && (
      <div className="banner">
        <p>{banner.description}</p>
        <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
        <a href={banner.link} target="_blank" rel="noopener noreferrer">Learn More</a>
      </div>
    )
  );
};

export default Banner;
