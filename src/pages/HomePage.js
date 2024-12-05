import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    // <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to the Homepage</h1>
        <nav style={styles.nav}>
          <Link to="/login" style={styles.link}>Login</Link>
        </nav>
      </div>
    // </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '20px',
  },
  nav: {
    marginTop: '20px',
  },
  link: {
    fontSize: '24px',
    color: 'azure',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    borderRadius: '4px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
};

export default HomePage;
