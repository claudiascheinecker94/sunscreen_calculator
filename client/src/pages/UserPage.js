import { set } from 'mongoose';
import { useState, useEffect } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import {useAuthStatus, useSecureRouting}  from '../helpers/Helper';
import { LocalStorageProvider } from '../context/LocalStorageContext';
import AccountDetails from '../components/AccountDetailsComponent';
import Calculate from './Calculate';


const UserPage = () => {
    const { user } = useAuthStatus();
    const { id } = useParams();
    useSecureRouting(user);
    
    //https://www.youtube.com/watch?v=JX36ga1O6xo&ab_channel=CalebCurry
    return ( 
        <LocalStorageProvider id={id}>
            <div>
                <AccountDetails />
                <Calculate/>
            </div> 
        </LocalStorageProvider>     
     );
}
 
export default UserPage;