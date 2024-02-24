//fetch API
const fetchExternalData = async (apiURL, address) => {
    
    try {
        const response = await fetch(apiURL);

        if(!response.ok){
            throw new Error('Response not ok, check the API link');
        } else {
            const data = await response.json();
            //console.log(data);
            return data;
        } 
    } catch (error) {
        console.error("Error fetching the API " + error.message);
    }
};

module.exports = { fetchExternalData };