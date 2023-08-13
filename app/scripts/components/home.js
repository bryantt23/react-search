/**
 * This file will hold the Main content that lives in the main body of the site
 *
 */
import React, { useEffect, useState } from 'react';

function getFacetsArray(checkedItems) {
  return Object.entries(checkedItems)
    .filter(([key, value]) => value) // only include items that are checked
    .map(([key, value]) => `${encodeURIComponent(key)}`);
}

function Home({ searchTerm }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // Convert checkedItems object to query string

      try {
        const res = await fetch(
          `http://localhost:3035/store?searchText=${searchTerm}`
        );
        const json = await res.json();
        console.log('🚀 ~ file: home.js:57 ~ fetchData ~ json:', json);
        setData(json);
      } catch (error) {}
    }

    fetchData();
  }, [searchTerm]);

  return (
    <div style={{ padding: 10 }}>
      <p>About {data.length} results</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px'
        }}
      >
        {data.map(item => (
          <div
            key={item.id}
            style={{
              border: '1px solid black',
              width: 200,
              height: 200
            }}
          >
            <p>
              {item.name} {item.about}
            </p>
            <img style={{ maxHeight: 100 }} src={item.picture} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Export out the React Component
export default Home;
