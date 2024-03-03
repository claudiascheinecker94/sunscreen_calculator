import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate(); //https://stackoverflow.com/questions/63471931/using-history-with-react-router-dom-v6

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = { email, password };


        setIsPending(true);
        
        try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(params)
            });

            const data = await res.json();
            setData(data);
            console.log(data);
            setIsPending(false);

            if(data.errors) {
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            }
            if(data.user){
                navigate(`/userpage/${data.user}`);
                window.location.reload();
            }
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div className="create">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                { !isPending && <button>Login</button>}
                { isPending && <button disabled>Logging In...</button>}
                { emailError && <p className="email error">{emailError}</p> }
                { passwordError && <p className="password error">{passwordError}</p> }
            </form>
        </div>
     );
}
 
export default Login;