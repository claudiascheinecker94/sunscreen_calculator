import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = { email, password };

        setIsPending(true);
        
        try {
            const res = await fetch('http://localhost:3000/signup', {
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
                navigate(`/accountsetup/${data.user}`);
            }
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div className="create">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <br></br>
                <label>Password:</label>
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                { !isPending && <button>Sign Up</button>}
                { isPending && <button disabled>Logging In...</button>}
                <br></br>
                <br></br>
                { emailError && <p className="email error">{emailError}</p> }
                { passwordError && <p className="password error">{passwordError}</p> }
            </form>
        </div>
     );
}
 
export default Signup;