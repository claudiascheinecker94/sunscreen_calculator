import { set } from 'mongoose';
import { useState, useEffect } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import {useAuthStatus, useSecureRouting}  from '../helpers/Helper';
import AccountDetails from '../components/AccountDetailsComponent';
import Calculate from './Calculate';


const UserPage = () => {
    const { user } = useAuthStatus();
    useSecureRouting(user);
    
    //https://www.youtube.com/watch?v=JX36ga1O6xo&ab_channel=CalebCurry
    return ( 
        <div>
            <AccountDetails />
            <h3>Calculate away...</h3>
            <Calculate/>
        </div>      
     );
}
 
export default UserPage;