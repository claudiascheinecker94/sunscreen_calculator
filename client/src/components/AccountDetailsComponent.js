import { set } from 'mongoose';
import { useState, useEffect } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import {useAuthStatus, useSecureRouting}  from '../helpers/Helper';

const AccountDetails = () => {
    //https://bobbyhadz.com/blog/react-router-get-id-from-url#:~:text=Use%20the%20useParams()%20hook,e.g.%20const%20params%20%3D%20useParams()%20.
    const { id } = useParams();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [age, setAge] = useState();
    const [skinType, setSkinType] = useState();
    const [changed, setChanged] = useState(false);
    const [style, setStyle] = useState('hide');

    

    useEffect(() => {
        const checkUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/userpage/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                const data = await response.json();
                setHeight(data.accountDetails[0].height);
                setWeight(data.accountDetails[0].weight);
                setAge(data.accountDetails[0].age);
                setSkinType(data.accountDetails[0].skin);
            }
            
        } catch (error) {
            console.log(error.message);
        }
    };

    checkUserDetails();
  }, []);

  const changeUserDetails = async (e) => {
    e.preventDefault();
    const updates = { height, weight, age, skinType };
    
    try {
        const res = await fetch(`http://localhost:3000/userpage/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(updates)
        });

        const data = await res.json();
        setChanged(false);
        console.log(data);

    } catch (error) {
        console.log(error.message);
    }
}
    //https://www.youtube.com/watch?v=JX36ga1O6xo&ab_channel=CalebCurry
    return ( 
        <div>
            <img className="profile-icon" src="/Profile_Icon.png" alt="Profile Icon" onClick={() => 
            {if(style === 'hide') {
                setStyle('show')
            } else {
                setStyle('hide')
            }}}/>
                <div className={style}>
                    <div className="details">
                    <h3>Account Details</h3>
                    <br></br>
                    <label>Height (in cm):</label>
                    <input 
                        type="number" 
                        value={height} 
                        onChange={(e) => {
                            setChanged(true);
                            setHeight(e.target.value);
                        }}
                    />
                    <br></br>
                    <br></br>
                    <label>Weight (in kg):</label>
                    <input 
                        type="number" 
                        value={weight} 
                        onChange={(e) => {
                            setChanged(true);
                            setWeight(e.target.value);
                        }}/>
                    <br></br>
                    <br></br>
                    <label>Age (in years):</label>
                    <input 
                        type="number" 
                        value={age} 
                        onChange={(e) => {
                            setChanged(true);
                            setAge(e.target.value);
                        }}
                    />
                    <br></br>
                    <br></br>
                    <label>Skin Type:</label>
                    <input 
                        type="number" 
                        value={skinType} 
                        onChange={(e) => {
                            setChanged(true);
                            setSkinType(e.target.value);
                        }}/>
                    <div className="button-setup">
                        {changed && 
                            <>
                                <button 
                                    onClick={(e) => {
                                        changeUserDetails(e);
                                        setStyle('hide');
                                    }}>Save</button> 
                                <button 
                                    onClick={(e) => {
                                        setChanged(false);
                                        setStyle('hide');
                                    }}>Cancel</button>
                            </>}
                        </div>
                        <button><Link to={`/userpage/${id}/deleteaccount`}>Delete Account</Link></button>
                        <br></br>
                        <br></br>
                    </div>
                </div>
        </div>
        
     );
}
 
export default AccountDetails;