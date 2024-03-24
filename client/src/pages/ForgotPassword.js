import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [data, setData] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = {email};

        setIsPending(true);
        
        try {
            const res = await fetch('http://localhost:3000/forgotpassword', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(params)
            });

            const data = await res.json();
            setIsPending(false);

            if(res.ok){
                setData(data);
                console.log(data);
            }

            if(res.status === 400) {
                setEmailError(data);
                setEmail('');
            }
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div>
            {!data && <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                { !isPending && <button>Send Link</button>}
                { isPending && <button disabled>Sending...</button>}
                <br></br>
                <br></br>
                { emailError && <p className="email error">{emailError}</p> }
            </form>
            <p className="explanation-text">We will send a password reset link to the email address provided above.</p>
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