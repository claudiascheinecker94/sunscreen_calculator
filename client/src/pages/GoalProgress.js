import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useAuthStatus, useSecureRouting, useClearLocalStorage} from '../helpers/Helper';
import { useLocalStorage } from '../context/LocalStorageContext';
import  Heatmap from '../components/HeatmapComponent';
import LineChartComponent from '../components/LineChartComponent';

const GoalProgress = () => {
    const { id } = useParams();
    const { user } = useAuthStatus();
    useSecureRouting(user);

    const { localStorageData, setLocalStorageData} = useLocalStorage();
    const { amount, rateResult, timestamp} = localStorageData;  

    console.log(localStorageData); 
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
            setLocalStorageData(styleLocalStorageData);
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
            setLocalStorageData(styleLocalStorageData);
        }
    }, [success]);

    useEffect(() =>{
        if(localStorageData.style){
            setStyle(localStorageData.style)
            setButton(localStorageData.button)
        }
    }, []);
    
    //success/failure
    //if user clicks on success --> send success to db
    //if user clicks failure --> send failure to db
    //if user does not click on anything and cleared switches to true, send failure to db
    //edge case - If user refreshes calculation in < 24 hours, localStorage is reset, nothing is sent to the db

    
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
            { amount && <div className={style}><p>Result:</p>
            <p>You should reapply sunscreen every: { rateResult[0] } hour(s)</p>
            <p>Based on the sun hours of your location you need to reapply: { rateResult[1] } times today</p>
            <p>Sunscreen Dose (in ml): { amount }</p>
            <button className={button} onClick={() => setSuccess('true')}>I did it!</button>
            <button className={button} onClick={() => setSuccess('false')}>Oh no I forgot!</button>
            </div>}
            { !amount && <div>
                <p>There is currenly no calculation.</p>
            </div>}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <Heatmap />
                <LineChartComponent />
            </div>
        </div>
     );
}
 
export default GoalProgress;