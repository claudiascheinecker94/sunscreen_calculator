import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {useAuthStatus, useSecureRouting}  from './Helper';

const NewsRecommendations = () => {

    const { user } = useAuthStatus();
    useSecureRouting(user);

    return ( 
        <div>
        </div>
     );
}
 
export default NewsRecommendations;