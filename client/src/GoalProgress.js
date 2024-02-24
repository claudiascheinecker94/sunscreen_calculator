import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {useAuthStatus, useSecureRouting} from './Helper';

const GoalProgress = () => {

    const { user } = useAuthStatus();
    useSecureRouting(user);



    return ( 
        <div>
        </div>
     );
}
 
export default GoalProgress;