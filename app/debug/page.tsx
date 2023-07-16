"use client"

import { useEffect, useState } from 'react';

const Debug = () => {
  const [data, setData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Simulate API call or fetching data from a data source
    setIsLoading(true);
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, index) => data.length + index + 1);
      setData((prevData) => [...prevData, ...newData]);
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    // Check if user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
          Item {item}
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default Debug;
