const Home = () => {

    return ( 
        <div>
            <div className="img">
                <img src="sun.jpeg" alt="Sun Cartoon"></img>   
            </div>
            <div className="home">
                <h1>Get Your Daily Dose of Sunscreen...</h1>
                <button onClick={() => window.location.reload()}>Calculate...</button>
            </div>
        </div>
     );
}
 
export default Home;