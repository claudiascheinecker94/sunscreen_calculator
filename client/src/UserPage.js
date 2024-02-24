import { set } from 'mongoose';
import { useState, useEffect } from 'react';
import {Route, Link, Routes, useParams, useNavigate} from 'react-router-dom';
import useAuthStatus from './Helper';

const UserPage = () => {
    //https://bobbyhadz.com/blog/react-router-get-id-from-url#:~:text=Use%20the%20useParams()%20hook,e.g.%20const%20params%20%3D%20useParams()%20.
    const { id } = useParams();
    const { user } = useAuthStatus();
    const navigate = useNavigate();

    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [skinType, setSkinType] = useState('');
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (user && user._id !== id) {
            navigate('/logout')
          }
    }, [user, id, navigate])

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
            <div className="create">
                <h2>Daily Sunscreen Need</h2>
                <form>
                    <label>Height (in cm):</label>
                    <input
                        type="number" 
                        required
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <label>Weight (in kg):</label>
                    <input
                    type="number"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    />
                    <label>Age (in years):</label>
                    <input
                        type="number" 
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <label>Skin Type:</label>
                    <select className="dropdown"
                        value={skinType}
                        onChange={(e) => setSkinType(e.target.value)}
                    >
                        <option value="notset">-</option>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                        <option value="four">4</option>
                        <option value="five">5</option>
                        <option value="six">6</option>
                    </select>
                    {/* <label>Clothing Choice for the day:</label>
                    <select className="dropdown"
                        value={clothingChoice}
                        onChange={(e) => setClothingChoice(e.target.value)}
                    >
                        <option value="notset">-</option>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                        <option value="four">4</option>
                        <option value="five">5</option>
                        <option value="six">6</option>
                    </select>
                    <label>Indoor/Outdoor Indicator:</label>
                    <select className="dropdown"
                        value={inOut}
                        onChange={(e) => setInOut(e.target.value)}
                    >
                        <option value="notset">-</option>
                        <option value="indoor">Primarily Indoor</option>
                        <option value="outdoor">Primarily Outdoor</option>
                        <option value="equal">Equal Parts</option>
                    </select>
                    <label>Planned Activies:</label>
                    <select className="dropdown"
                        value={plannedActivities}
                        onChange={(e) => setPlannedActivities(e.target.value)}
                    >
                        <option value="notset">-</option>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                        <option value="four">4</option>
                        <option value="five">5</option>
                        <option value="six">6</option>
                    </select>
                    { !isPending && <button>Calculate</button>}
                    { isPending && <button disabled>Calculating...</button>}
                    { result && (
                        <div>
                            <p>Result:</p>
                            <p>Reapplication Rate: { result.rateResult }</p>
                            <p>Sunscreen Dose (in ml): { result.sunscreenResult }</p>
                        </div>
                    )} */}
                </form>
            </div>
        </div>
        
     );
}
 
export default UserPage;