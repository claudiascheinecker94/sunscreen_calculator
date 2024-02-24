import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Calculate = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [skinType, setSkinType] = useState('');
    const [clothingChoice, setClothingChoice] = useState('');
    const [inOut, setInOut] = useState('');
    const [plannedActivities, setPlannedActivities] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [result, setResult] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = { height, weight };

        setIsPending(true);
        
        try {
            const res = await fetch('http://localhost:3000/calculate', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(params)
            });

            const result = await res.json();
            setResult(result);
            console.log(result);
            setIsPending(false);
            //navigate('/');
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div className="create">
            <h2>Daily Sunscreen Need</h2>
            <form onSubmit={handleSubmit}>
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
                <label>Clothing Choice for the day:</label>
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
                )}
            </form>
        </div>
     );
}
 
export default Calculate;