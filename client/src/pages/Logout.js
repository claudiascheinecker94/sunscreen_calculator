import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const handleLogout = async () => {
    setLogout(true);

    try {
        const response = await fetch('http://localhost:3000/logout');

        if (response.ok) {
            console.log('Logout successful');
            window.location.reload();
            navigate('/');
          } else {
            console.error('Logout failed');
          }
        

    } catch (error) {
        console.log(error.message);
    }

    setLogout(false);
  };
  handleLogout();
}, []);
 
};

export default Logout;