import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('resetToken');
    const [data, setData] = useState('');

    const [passwordError, setPasswordError] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [isResetSuccess, setIsResetSuccess] = useState(false);
    const navigate = useNavigate(); //https://stackoverflow.com/questions/63471931/using-history-with-react-router-dom-v6

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = { password, token };


        setIsPending(true);
        
        try {
            const res = await fetch('http://localhost:3000/resetpassword', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(params)
            });

            const data = await res.json();
            setIsPending(false);

            if(res.ok){
                setData(data);
                setIsResetSuccess(true);
                console.log(data);
            }

            if(data.errors) {
                setPasswordError(data.errors.password);
            }
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div>
            {!isResetSuccess && <div>
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>Password:</label>
                    <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    { !isPending && <button>Reset Password</button>}
                    { isPending && <button disabled>Resetting...</button>}
                    <br></br>
                    <br></br>
                    { passwordError && <p className="password error">{passwordError}</p> }
                </form>
            </div>}
            {isResetSuccess && <div>
                <p className="confirmation-text">{data}</p>
                <br></br>
                <p className="explanation-text">Please navigate to the <span>&nbsp;</span> <Link to={'/login'}> Login </Link> <span>&nbsp;</span> page.</p>
            </div>}
        </div>
    );
}
 
export default ResetPassword;