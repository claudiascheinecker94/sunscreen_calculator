import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useAuthStatus, useSecureRouting, useClearLocalStorage} from '../helpers/Helper';
import { useLocalStorage } from '../context/LocalStorageContext';
import  Heatmap from '../components/chart';
import HeatmapGrid from 'react-heatmap-grid';

const GoalProgress = () => {
    const { id } = useParams();
    const { user } = useAuthStatus();
    useSecureRouting(user);

    const { localStorageData } = useLocalStorage();
    const { amount, rateResult } = localStorageData;   
    const cleared = useClearLocalStorage();
    console.log(cleared);
    const [success, setSuccess] = useState('');
    const [style, setStyle] = useState('active');
    const [button, setButton] = useState('show');

    if(cleared){
        setSuccess('false');
    }

    useEffect(() =>{
        submitGoal();
        if(success === 'true'){
            setStyle('successDeactive')
            setButton('hide')
        } else if(success === 'false') {
            setStyle('failureDeactive')
            setButton('hide')
        }
    }, [success]);

    console.log(style);
    
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
        <div className={style}>
            { amount && <div><p>Result:</p>
            <p>You should reapply sunscreen every: { rateResult[0] } hour(s)</p>
            <p>Based on the sun hours of your location you need to reapply: { rateResult[1] } times today</p>
            <p>Sunscreen Dose (in ml): { amount }</p>
            <button className={button} onClick={() => setSuccess('true')}>I did it!</button>
            <button className={button} onClick={() => setSuccess('false')}>Oh no I forgot!</button>
            </div>}
            { !amount && <div>
                <p>There is currenly no calculation.</p>
            </div>}
            <div>
                <Heatmap />
            </div>
            
        </div>
     );
}
 
export default GoalProgress;