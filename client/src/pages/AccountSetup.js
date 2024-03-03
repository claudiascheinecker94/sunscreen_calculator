import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountSetup = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [skin, setSkin] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [result, setResult] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = { height, weight, age, skin };

        setIsPending(true);
        
        try {
            const res = await fetch('http://localhost:3000/accountsetup', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(params)
            });

            const result = await res.json();
            setResult(result);
            console.log(result);
            setIsPending(false);
            navigate(`/userpage/${result.detail}`);
            window.location.reload();
    
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div className="create">
            <h2>Account Setup</h2>
            <form onSubmit={handleSubmit}>
                <label>Height:</label>
                <input type="number" required value={height} onChange={(e) => setHeight(e.target.value)}/>
                <label>Weight:</label>
                <input type="number" required value={weight} onChange={(e) => setWeight(e.target.value)}/>
                <label>Age:</label>
                <input type="number" required value={age} onChange={(e) => setAge(e.target.value)}/>
                <label>Skin:</label>
                <input type="number" required value={skin} onChange={(e) => setSkin(e.target.value)}/>
                {/* <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="claudia">Claudia</option>
                    <option value="art">Art</option>
                </select> */}
                { !isPending && <button>Submit</button>}
                { isPending && <button disabled>Submitting...</button>}
            </form>
        </div>
     );
}
 
export default AccountSetup;