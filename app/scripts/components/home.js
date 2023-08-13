/**
 * This file will hold the Main content that lives in the main body of the site
 *
 */
import React, { useEffect, useState } from 'react';

function Home({ searchTerm }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:3035/store?searchTerm=${searchTerm}`
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    fetchData();
  }, [searchTerm]);

  if (data === null) {
    return (
      <div className='products-container'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className='products-container'>
        <h1>No Products Found</h1>
      </div>
    );
  }

  return (
    <div className='products-container'>
      <h1>{data.length} Products Found</h1>
      <div className='grid-container'>
        {data.map(item => (
          <div className='grid-item' key={item.id}>
            <h2> {item.name} </h2>
            <img src={item.picture} />
            <p>{item.about}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export out the React Component
export default Home;
