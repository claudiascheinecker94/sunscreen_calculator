import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const DeleteAccount = () => {
    const [data, setData] = useState('');
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate(); 
    const { id } = useParams();

    const deleteAccount = async() => {
        
        try {
            const res = await fetch(`http://localhost:3000/userpage/${id}/deleteaccount`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json"},
            });

            const data = await res.json();
            setData(data);

            if(res.ok){
                setDeleting(true);
                setTimeout(() => {
                    navigate(`/logout`);
                }, 2000);
                //localstorage cleared only after 24h
            }
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div>
            {!deleting && <div>
                <h2>Are you sure you want to delete your account?</h2>
                <p className="explanation-text">This action is irreversible, your data will be permanently deleted.</p>
                <div className="button-setup">
                    <button onClick={deleteAccount}>Proceed</button>
                    <button><Link to={`/userpage/${id}`}>Cancel</Link></button>
                </div>
            </div>}
            {deleting && <div>
                <p className="confirmation-text">We are deleting your account...</p>
            </div>}
        </div>
     );
}
 
export default DeleteAccount;