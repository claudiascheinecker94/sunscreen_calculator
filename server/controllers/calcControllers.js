const User = require('../models/Users');
const { fetchExternalData } = require('../middleware/apiMiddleware');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
}

module.exports.calculate_post = async (req, res) => {

    //save form data
    const { 
        height, 
        weight,
        age,
        skinType,
        clothingChoice,
        inOut,
        plannedActivities
     } = req.body;  

     console.log(req.body);

    //calculate sunscreen amount
    //amount takes in surface are exposed, which includes
    //** height
    //** weight
    //** clothing Choice
    const minAmount = 2; //hard coded mg/cm2
    
    const surfaceCalc = (weight, height, clothingChoice) => {
        let bareSurface = weight * height;
        let coveredSurface = 0;

        for(i=0; i<req.body.clothingChoice.length; i++){
            var clothValue = Number(req.body.clothingChoice[i].value);
            coveredSurface += clothValue;
        }
       
        if(coveredSurface <= 4){
            exposedSurface = bareSurface * 0.9;
        } else if (coveredSurface <= 10){
            exposedSurface = bareSurface * 0.6;
        } else if (coveredSurface => 15){
            exposedSurface = bareSurface * 0.3;
        } else {
            console.log ('something went wrong');
        }
        return exposedSurface;
    }
    
    //get external data
    const geolocationUrl = 'http://ip-api.com/json/?fields=61439';
    const address = await fetchExternalData(geolocationUrl);
    const city = address.city.toString();

    const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=KZ8RMBZBZYDY64J2JVX4JTRA4&include=days&elements=temp,cloudcover,uvindex,sunrise,sunset`
    const currWeather = await fetchExternalData(weatherUrl);
    console.log(currWeather);


    //calculate reapplication rate
    //takes into consideration external factors, physical activity and physical location
    //** inOut
    //** planned Activities
    //** uv index
    //** cloud coverage
    //** sun hours
    const reapplicationRate = (inOut, plannedActivities, location) => {
        let minHours = 4;
        
        if(inOut === '1'){
            minHours = 0.66;
        } else if (inOut === '2' || plannedActivities === '2'){
            minHours = 1;
        } else if (inOut === '3' ){
            minHours = 2;
        } else {
            minHours;
        }
        return minHours;
    }


    try {
        const surface = surfaceCalc(weight,height,clothingChoice);
        const sunscreenResult = surface * minAmount;
        const rateResult = reapplicationRate(inOut, plannedActivities)
        //console.log(coveredSurface);
        //console.log(minAmount);
        console.log(sunscreenResult);
        console.log(rateResult);
        res.status(201).json({ sunscreenResult : sunscreenResult, rateResult : rateResult });
    }
    catch (err){
        const errors = handleErrors(err);
        console.log("error for the post request")
        res.status(400).json({ errors });
    }
}
