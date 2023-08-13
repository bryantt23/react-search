/**
 * This file will hold the Main content that lives in the main body of the site
 *
 */
import React from 'react';

function Home() {
  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof Home
   */
  return (
    <section id='home'>
      <div className='content'>
        <p>ELC Coding Test...</p>
      </div>
    </section>
  );
}

// Export out the React Component
export default Home;
