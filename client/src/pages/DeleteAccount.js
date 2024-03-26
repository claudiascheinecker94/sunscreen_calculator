import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const ForgotPassword = () => {
    const [data, setData] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate(); 
    const { id } = useParams();

    const deleteAccount = async() => {

        setIsPending(true);
        
        try {
            const res = await fetch(`http://localhost:3000/userpage/${id}/deleteaccount`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json"},
            });

            const data = await res.json();
            setData(data);
            setIsPending(false);

            if(res.ok){
                navigate(`/logout`);
            }
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div>
            {!data && <div>
                <h2>Are you sure you want to delete your account?</h2>
                <p className="explanation-text">This action is irreversible, your data will be permanently deleted.</p>
                <div className="button-setup">
                    <button onClick={deleteAccount}>Proceed</button>
                    <button><Link to={`/userpage/${id}`}>Cancel</Link></button>
                </div>
            </div>}
            {data && <div>
                <p className="confirmation-text">{data}</p>
                <br></br>
                <p className="explanation-text">Please check your email inbox and spam folder.</p>
            </div>}
        </div>
     );
}
 
export default ForgotPassword;