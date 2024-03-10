import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from '../helpers/Helper';

const Navigation = () => {

    const { user } = useAuthStatus();
    
    return ( 
        <div>
            { user && (
                <div className="navbar">
                    <Link to={'/userpage/' + user._id}>Calculate</Link>
                    <Link to={'/userpage/' + user._id + '/goals'}>Goals & Progress</Link>
                    <Link to={'/userpage/' + user._id + '/news'}>News & Recommendations</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            )}
            { !user && (
                <div className="navbar">
                     <Link to="/calculate">Continue As Guest</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            )}
        </div>
     );
}
 
export default Navigation;