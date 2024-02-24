import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthStatus from './Helper';


const Navbar = () => {

    const { user } = useAuthStatus();

    return ( 
        <nav>
            <div className="home">
                { user && (
                    <div >
                        <Link to="/calculate">Calculate</Link>
                        <Link to="/goals">Goals & Progress</Link>
                        <Link to="/news">News & Recommendations</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                )}
                { !user && (
                    <div >
                        <Link to="/calculate">Calculate</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
     );
}
 
export default Navbar;