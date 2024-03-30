import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useAuthStatus, useSecureRouting, useClearLocalStorage} from '../helpers/Helper';
import { LocalStorageProvider } from '../context/LocalStorageContext';
import  Heatmap from '../components/HeatmapComponent';
import LineChartComponent from '../components/LineChartComponent';
import AccountDetails from '../components/AccountDetailsComponent';
import ProgressComponent from '../components/ProgressComponent';

const GoalProgress = () => {
    const { id } = useParams();
    const { user } = useAuthStatus();
    useSecureRouting(user);

    return ( 
        <LocalStorageProvider id={id}>
            <div>
                <AccountDetails />
                <ProgressComponent />
                <Heatmap />
                <LineChartComponent />
            </div>
        </LocalStorageProvider>  
     );
}
 
export default GoalProgress;