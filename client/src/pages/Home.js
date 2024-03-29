import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate(); 

    return ( 
        <div>
            <div className="img">
                <img src="sun.jpeg" alt="Sun Cartoon"></img>   
            </div>
            <div className="home">
                <h1>Get Your Daily Dose of Sunscreen...</h1>
                <button onClick={() => navigate('/calculate')}>Calculate...</button>
            </div>
        </div>
     );
}
 
export default Home;