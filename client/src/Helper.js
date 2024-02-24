import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const useAuthStatus = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const checkAuthStatus = async () => {
        try {
            const response = await fetch('http://localhost:3000/status');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                const data = await response.json();
                setUser(data.user);

                if (user && window.location.pathname === '/login') {
                    // Redirect to another page if the user is already logged in
                    navigate('/userpage/' + user._id);
                }

            }
            
        } catch (error) {
            console.log(error.message);
        }
    };

    checkAuthStatus();
    }, []);

    return { user };
}

const useSecureRouting  = (user) => {
    const navigate = useNavigate(); 
    const { id } = useParams();

    useEffect(() => {
        if (user && user._id !== id) {
            navigate('/logout')
          }
    }, [user, id, navigate])
}


export {useAuthStatus, useSecureRouting};