import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const roleId = Number(localStorage.getItem('roleId'));

  useEffect(() => {
    if (roleId === 1) {
      navigate('/app/admin', { replace: true });
    }
    if (roleId === 2) {
      navigate('/app/dashboard', { replace: true });
    }
  }, [navigate, roleId]);

  return <div>Home page</div>;
};

export default Home;
