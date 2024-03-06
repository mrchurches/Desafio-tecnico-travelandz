import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  useEffect(() => {
    console.log('se renderizo el componente Landing <---');
  }, []);
  return (
    <div>
      <h1>Welcome to the Transfers App</h1>
      <p>Start exploring and managing your transfers!</p>
      <Link to="/home">Enter</Link>
    </div>
  );
};

export default Landing;
