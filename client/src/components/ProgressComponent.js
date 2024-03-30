import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import {useAuthStatus, useSecureRouting, useClearLocalStorage} from '../helpers/Helper';
import { useLocalStorage } from '../context/LocalStorageContext';
import AccountDetails from './AccountDetailsComponent';

const ProgressComponent = () => {
    const { id } = useParams();
    const { user } = useAuthStatus();
    const [loading, setLoading] = useState(true); 
    useSecureRouting(user);

    console.log("id goals" + id);
    const { localStorageData, updateLocalStorageData } = useLocalStorage(id);
    const { amount, city, rateResult, timestamp} = localStorageData;  

    console.log("Goal Local storage ", localStorageData); 

    useClearLocalStorage();
    const [style, setStyle] = useState();
    const [button, setButton] = useState();
    const [success, setSuccess] = useState();

    //if there is no style set && success is true --> set style
    //if there is a style set && success is true --> keep style
    //if there is no style set && success if false --> set style
    //if there is a style set && success is false --> Keep style
    useEffect(() =>{
        submitGoal();
        if(!localStorageData.style && success === 'true'){
            setStyle('successDeactive')
            setButton('hide')
            const styleLocalStorageData = {
                ...localStorageData,
                style: 'successDeactive',
                button: 'hide',
                rateResult,
                amount,
                timestamp
            };
            updateLocalStorageData(id, styleLocalStorageData);
        } else if(!localStorageData.style && success === 'false') {
            setStyle('failureDeactive')
            setButton('hide')
            const styleLocalStorageData = {
                ...localStorageData,
                style: 'failureDeactive',
                button: 'hide',
                rateResult,
                amount,
                timestamp
            };
            updateLocalStorageData(id, styleLocalStorageData);
        }
    }, [success, localStorageData.style]);

    useEffect(() =>{
        if(localStorageData.style){
            setStyle(localStorageData.style)
            setButton(localStorageData.button)
        }
    }, [localStorageData]);
    
    // //success/failure
    // //if user clicks on success --> send success to db
    // //if user clicks failure --> send failure to db
    // //if user does not click on anything and cleared switches to true, send failure to db
    // //edge case - If user refreshes calculation in < 24 hours, localStorage is reset, nothing is sent to the db
    const submitGoal = async (e) => {
        const params = { success };
        console.log("Forwarded to server" + JSON.stringify(params));
        
        try {
            const res = await fetch(`http://localhost:3000/userpage/${id}/goals`, {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(params)
            });

            const result = await res.json();
            console.log(result);
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div>
            <AccountDetails />
            { amount && 
            <div className="user-results">
                <div className={style}>
                    <h3>Recommendations of Today</h3>
                    <br></br>
                    <p>It seems you are currently in {city} 🌎</p>
                    <p>Based on {city}'s weather conditions you should...</p>
                    <br></br>
                    <p>😎...reapply sunscreen every { rateResult[0] } hour(s).</p>
                    <p>🌤...reapply { rateResult[1] } times.</p>
                    <p>🧴...use { amount } ml of sunscreen per reapplication.</p>
                    <div className="button-setup">
                        <button className={button} onClick={() => setSuccess('true')}>I did it!</button>
                        <button className={button} onClick={() => setSuccess('false')}>Oh no I forgot!</button>
                    </div>
                </div>
            </div>}
            { !amount && <div className="user-results">
                <p>There are currenly no recommendations, please navigate to the "Calculate" page to calculate today's sunscreen recommendation.</p>
            </div>}
        </div>
     );
}
 
export default ProgressComponent;