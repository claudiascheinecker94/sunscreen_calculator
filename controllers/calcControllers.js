const User = require('../models/Users');
const { fetchExternalData } = require('../middleware/calcMiddleware');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
}

module.exports.calculate_post = async (req, res) => {

    //save form data
    const { 
        height, 
        weight,
        clothingChoice,
        indoorOutdoorSelection,
        plannedActivities,
     } = req.body;  
     
    //get external data
    const geolocationUrl = 'http://ip-api.com/json/?fields=61439';
    const address = await fetchExternalData(geolocationUrl);
    console.log(typeof address.city);
    const city = address.city.toString();

    const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=KZ8RMBZBZYDY64J2JVX4JTRA4&include=days&elements=temp,cloudcover,uvindex,sunrise,sunset`
    const currWeather = await fetchExternalData(weatherUrl);
    console.log(currWeather);

    //calculate sunscreen amount
    const minAmount = 2;
    
    const surfaceCalc = (weight, height, clothingChoice) => {
        let bareSurface = weight * height;
        let exposedSurface = 0;
       
        if(clothingChoice === 'minCover'){
            exposedSurface = bareSurface * 0.9;
        } else if (clothingChoice === 'medCover'){
            exposedSurface = bareSurface * 0.6;
        } else if (clothingChoice === 'maxCover'){
            exposedSurface = bareSurface * 0.3;
        } else {
            console.log ('something went wrong');
        }
        return exposedSurface;
    }
    
    const reapplicationRate = (indoorOutdoorSelection, plannedActivities, location) => {
        let minHours = 4;
        
        if(plannedActivities && indoorOutdoorSelection === 'mostlyOutside'){
            minHours = 0.66;
        } else if (plannedActivities && indoorOutdoorSelection === 'mostlyInside' || indoorOutdoorSelection === 'mostlyOutside'){
            minHours = 1;
        } else if (indoorOutdoorSelection === 'half/half' ){
            minHours = 2;
        } else {
            minHours;
        }
        return minHours;
    }


    try {
        const coveredSurface = surfaceCalc(weight,height,clothingChoice);
        const sunscreenResult = coveredSurface * minAmount;
        const rateResult = reapplicationRate(indoorOutdoorSelection, plannedActivities)
        console.log(coveredSurface);
        console.log(minAmount);
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

/*router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog Details', blog: result });
        })
        .catch((err) =>{
            console.log(err);
        });
})*/