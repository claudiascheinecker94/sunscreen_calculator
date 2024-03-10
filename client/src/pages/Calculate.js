import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';
import { components } from "react-select";
import { useLocalStorage } from '../context/LocalStorageContext';

const Calculate = () => {

    //set form answers
    const { id } = useParams();
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState();
    const [age, setAge] = useState();
    const [skinType, setSkinType] = useState();
    const [clothingChoice, setClothingChoice] = useState([]);
    const [inOut, setInOut] = useState();
    const [plannedActivities, setPlannedActivities] = useState([]);

    //provide image dropdown options for skinType, plannedActivities and inOut
    const { SingleValue, Option } = components;

    //https://stackoverflow.com/questions/45940726/populate-react-select-with-image
    const ImgSingleValue = (props, data) => (
        <SingleValue {...props}>
            {/* <img src={props.data.image} alt={props.data.label} className="dropdown-img"/> */}
            {props.data.label}
        </SingleValue>
    );
    
    const ImgOption = (props, data) => (
        <Option {...props}>
            <img src={props.data.image} alt={data.label} className="dropdown-img"/>
            {props.data.label}
        </Option>
    );
    
    //dropdown options for form
    const skinTypeFormOptions = 
    [
          {value: '1', label: 'Skin Type 1', image: '/skintype1.png'},
          {value: '2', label: 'Skin Type 2', image: '/skintype2.png'},
          {value: '3', label: 'Skin Type 3', image: '/skintype3.png'},
          {value: '4', label: 'Skin Type 4', image: '/skintype4.png'},
          {value: '5', label: 'Skin Type 5', image: '/skintype5.png'},
          {value: '6', label: 'Skin Type 6', image: '/skintype6.png'},
    ];

    const indoorOutdoorFormOptions = 
    [
          {value: '1', label: 'Primarily Indoor'},
          {value: '2', label: 'Primarily Outdoor'},
          {value: '3', label: 'Equal Time Indoor/Outdoor'},
    ];

    const clothingChoiceFormOptions = 
    [
          
          {value: '3', label: 'Short Trousers/Skirts', image: '/Short_Bottoms.png'},
          {value: '2', label: 'Short Sleeves', image: '/Short_Sleeves.png'},
          {value: '1', label: 'Tank Top', image: '/Extra_Short_Sleeves.png'},
          {value: '4', label: 'Short Dress', image: '/Short_Dress.png'},
          {value: '11', label: 'Long Trousers/Skirts', image: '/Long_Bottoms.png'},
          {value: '15', label: 'Long Sleeves', image: '/Long_Sleeves.png'},
          {value: '10', label: 'Long Dress', image: '/Long_Dress.png'},   
    ];

    const plannedActivitiesFormOptions = 
    [
          {value: 'sand', label: 'Beach Day', image: '/beach.png'},
          {value: 'water', label: 'Indoor/Outdoor Swimming', image: '/swimming.png'},
          {value: 'sweat', label: 'Indoor Exercise', image: '/indoor_exercise.png'},
          {value: 'sweat+sun', label: 'Outdoor Exercise', image: '/outdoor_sports.webp'},
    ];

    const [isPending, setIsPending] = useState(false);
    const [result, setResult] = useState();
    const navigate = useNavigate();
    const { setLocalStorageData } = useLocalStorage();



    //post form answers
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = { id, height, weight, skinType, clothingChoice, inOut, plannedActivities };

        console.log(params);

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
            
            if(id){
                const localStorageData = {
                    amount: result.amount,
                    rateResult:result.rateResult,
                    timestamp: new Date().getTime()
                }
                setLocalStorageData(localStorageData);
                navigate(`/userpage/${id}/goals`)
            }
            
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div className="create">
            <h2>Daily Sunscreen Need</h2>
            {!result && (
                <form onSubmit={handleSubmit}>
                <br></br>
                    <div>
                        <label>Height (in cm):</label>
                        <input
                            className="form-fields"
                            id="number" 
                            required
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    <br></br>
                    <br></br>
                    <label>Weight (in kg):</label>
                    <input
                        className="form-fields"
                        type="number"
                        required
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <label>Age (in years):</label>
                    <input
                        className="form-fields"
                        type="number" 
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    </div>
                    <br></br>
                    <br></br>
                    <label htmlFor="dropdown">Skin Type:</label>
                    <Select 
                        className="form-fields"
                        options={skinTypeFormOptions}
                        value={skinTypeFormOptions.value}
                        onChange={(skinTypeFormOptions) => setSkinType(skinTypeFormOptions.value)}
                        components={{SingleValue: ImgSingleValue, Option: ImgOption }}
                        required
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="dropdown">Location during sun hours:</label>
                    <Select 
                        className="form-fields"
                        options={indoorOutdoorFormOptions}
                        value={indoorOutdoorFormOptions.value}
                        onChange={(indoorOutdoorFormOptions) => setInOut(indoorOutdoorFormOptions.value)}
                        isSearchable={false}
                        components={{SingleValue: ImgSingleValue, Option: ImgOption }}
                        required
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="dropdown">Clothing choice for the day:</label>
                    <Select 
                        className="form-fields"
                        options={clothingChoiceFormOptions}
                        value={clothingChoiceFormOptions.value}
                        onChange={(clothingChoiceFormOptions) => setClothingChoice([...clothingChoiceFormOptions])}
                        components={{SingleValue: ImgSingleValue, Option: ImgOption }}
                        isMulti
                        required
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="dropdown">Planned activities for the day:</label>
                    <Select 
                        className="form-fields"
                        options={plannedActivitiesFormOptions}
                        value={plannedActivitiesFormOptions.value}
                        onChange={(plannedActivitiesFormOptions) => setPlannedActivities([...plannedActivitiesFormOptions])}
                        components={{SingleValue: ImgSingleValue, Option: ImgOption }}
                        isMulti
                    />
                    { !isPending && <button>Calculate</button>}
                    { isPending && <button disabled>Calculating...</button>}
                </form>
            )}
            {result && (
                <div>
                    <div className="img">
                        <img src="sun.jpeg" alt="Sun Cartoon"></img>   
                    </div>
                    <div className="guest-results">
                        <h3>Recommendations of Today</h3>
                        <br></br>
                        <p>It seems you are currently in {result.city} 🌎</p>
                        <p>Based on {result.city}'s weather conditions you should...</p>
                        <br></br>
                        <p>😎...reapply sunscreen every { result.rateResult[0] } hour(s).</p>
                        <p>🌤...reapply { result.rateResult[1] } times.</p>
                        <p>🧴...use { result.amount } ml of sunscreen per reapplication.</p>
                        <br></br>
                        <button onClick={() => window.location.reload()}>Calculate again...</button>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default Calculate;