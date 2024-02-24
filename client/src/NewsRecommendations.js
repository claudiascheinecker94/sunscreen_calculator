import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthStatus from './Helper';

const NewsRecommendations = () => {

    const { user } = useAuthStatus();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user._id !== id) {
            navigate('/logout')
          }
    }, [user, id, navigate])

    return ( 
        <div>
        </div>
     );
}
 
export default NewsRecommendations;