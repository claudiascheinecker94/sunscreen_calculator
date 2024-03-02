import { set } from 'mongoose';
import { useState, useEffect } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import {useAuthStatus, useSecureRouting}  from './Helper';
import Calculate from './Calculate';

const UserPage = () => {
    //https://bobbyhadz.com/blog/react-router-get-id-from-url#:~:text=Use%20the%20useParams()%20hook,e.g.%20const%20params%20%3D%20useParams()%20.
    const { id } = useParams();
    const { user } = useAuthStatus();
    useSecureRouting(user);

    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [age, setAge] = useState();
    const [skinType, setSkinType] = useState();
    const [changed, setChanged] = useState(false);

    

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
            <b></b>
            <b></b>
            <h2>User Page</h2>
            <b></b>
            <b></b>
            <input 
                type="number" 
                value={height} 
                onChange={(e) => {
                    setChanged(true);
                    setHeight(e.target.value);
                }}
            />
            <input 
                type="number" 
                value={weight} 
                onChange={(e) => {
                    setChanged(true);
                    setWeight(e.target.value);
                }}/>
            <input 
                type="number" 
                value={age} 
                onChange={(e) => {
                    setChanged(true);
                    setAge(e.target.value);
                }}
            />
            <input 
                type="number" 
                value={skinType} 
                onChange={(e) => {
                    setChanged(true);
                    setSkinType(e.target.value);
                }}/>
            {changed && 
                <>
                    <button 
                        onClick={changeUserDetails}>Save</button> 
                    <button 
                        onClick={(e) => {
                            setChanged(false);
                            window.location.reload();
                        }}>Cancel</button>
                </>}
                <br></br>
                <br></br>
                <Calculate />
        </div>
        
     );
}
 
export default UserPage;