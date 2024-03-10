const User = require('../models/Users');
const Reading = require('../models/Readings');
const { fetchExternalData } = require('../middleware/apiMiddleware');
const { checkUser } = require('../middleware/authMiddleware');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
}

module.exports.calculate_post = async (req, res) => {

    //save form data
    const { 
        id,
        height, 
        weight,
        age,
        skinType,
        clothingChoice,
        inOut,
        plannedActivities
     } = req.body;  

     console.log(req.body);
     console.log("Params" + JSON.stringify(req.params));

    //calculate sunscreen amount
    //amount takes in surface are exposed, which includes
    //** height
    //** weight
    //** clothing Choice
    const minAmount = 0.002; //hard coded mg/cm2
    
    const surfaceCalc = (weight, height, clothingChoice) => {
        let bareSurface = weight * height;
        console.log(bareSurface);
        let coveredSurface = 0;

        for(i=0; i<req.body.clothingChoice.length; i++){
            var clothValue = Number(req.body.clothingChoice[i].value);
            coveredSurface += clothValue;
        }

        //console.log(coveredSurface);
       
        if(coveredSurface <= 4){
            exposedSurface = bareSurface * 0.9;
        } else if (coveredSurface <= 11){
            exposedSurface = bareSurface * 0.6;
        } else if (coveredSurface => 12){
            exposedSurface = bareSurface * 0.3;
        } else {
            console.log ('something went wrong');
        }
        return exposedSurface;
    }
    
    //get external data
    const geolocationUrl = 'http://ip-api.com/json/?fields=status,message,country,city,offset,query';
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

    //** ----Considerations----:
    //** Sunscreen is removed from the skin by sweat, water and sand - reaplication of 40 - 80 minutes recommended (https://www.colorescience.com/blogs/blog/how-often-to-reapply-sunscreen )
    //** General outdoor without physical activity - reapplication fo 2 hours recommended 
    //** General indoor withour physical activity - 4-6  hours
    //** UV index < 3 - no reapplication
    //** UV index > 3 reapplication every 2 hours (https://19january2017snapshot.epa.gov/sunsafety/uv-index-scale-1_.html)// https://pdskin.com/blogs/uv-index-the-sun-safety-scale/
    //** Take sunset + sunrise hours to calculate sun hours for reapplication time frame

    const reapplicationRate = (inOut, plannedActivities, currWeather) => {
        let inOutHours;
        let plannedActivitiesHours = 3;
        let sunHours;
        let reapplicationRate;
        
        //calculate how long the sun will be out for the given day
        let sunset = currWeather.days[0].sunset;
        let sunrise = currWeather.days[0].sunrise;

        let sunsetHour = Number(sunset.substring(0,2));
        //console.log(typeof sunsetHour)
        //console.log(sunsetHour)
        let sunriseHour = Number(sunrise.substring(0,2));
        //console.log(typeof sunriseHour)
        //console.log(sunriseHour)

        sunHours = sunsetHour - sunriseHour;
        console.log("Sun hours: " + sunHours);

        //takes in user input and considers recommended reapplication rate based on above considerations
        switch(inOut){
            case '1': 
                inOutHours = 4
                break;
            case '2':
                inOutHours = 1
                break;
            case '3':
                inOutHours = 2
                break;
            default:
                console.log("could not calculate inOutConsiderations")
        }
        
        //consider sweat/water/sand based experiences in application rate
        if(plannedActivities.length > 0){
            console.log(plannedActivities[0].value)
            plannedActivitiesHours = 1;
        } 
        //adjusting reapplication based on uvindex
        let uvindex = Number(currWeather.days[0].uvindex);
        console.log("uvindex: " + uvindex);
        if(uvindex <= 2){
            if(inOutHours = 4 || 2) {
                inOutHours = 6;
            }
        } else if(uvindex <= 5){
            if(inOutHours = 4) {
                inOutHours = 3;
            }
        } else if(uvindex > 5){
            if(inOutHours = 1){
                inOutHours = 2;
            }
        }
        console.log("reapplication rate based on Indoor/Outdoor Location " + inOutHours)
        console.log("reapplication rate based on Planned Activities " + plannedActivitiesHours)

        reapplicationRate = Math.round(((inOutHours + plannedActivitiesHours)/2))
        reapplicationTimes = Math.round(sunHours/reapplicationRate)
        console.log("Reapplication Rate: " + reapplicationRate)
        console.log("Reapplication Times: " + reapplicationTimes)
        return [reapplicationRate, reapplicationTimes]
    }

    try {
        const surface = surfaceCalc(weight,height,clothingChoice);
        //https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
        const amount = Math.round((surface * minAmount)*100)/100;
        const rateResult = reapplicationRate(inOut, plannedActivities, currWeather)

        if(id){
            const userId = id;
            const reapplicationRate = rateResult[1];
            const reapplicationPerDay = rateResult[0];
            const date = new Date();
            const reading = await Reading.create({ userId, date, amount, reapplicationRate, reapplicationPerDay });
        }
        //console.log(amount);
        //console.log(rateResult[0]);
        console.log(city);
        res.status(201).json({ amount : amount, rateResult : rateResult, city: city });
    }
    catch (err){
        const errors = handleErrors(err);
        console.log("error for the post request")
        res.status(400).json({ errors });
    }
}
