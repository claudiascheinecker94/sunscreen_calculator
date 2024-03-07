import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

// Sample chart data

const annualData = [
    {name: "Jan" ,reapplication: 11},
    {name: "Feb" ,reapplication: 15},
    {name: "Mar" ,reapplication: 5},
    {name: "Apr" ,reapplication: 10},
    {name: "May" ,reapplication: 9},
    {name: "Jun" ,reapplication: 9},
    {name: "Jul" ,reapplication: 9},
    {name: "Aug" ,reapplication: 9},
    {name: "Sep" ,reapplication: 9},
    {name: "Oct" ,reapplication: 9},
    {name: "Nov" ,reapplication: 10},
    {name: "Dec" ,reapplication: 9},
];

const LineChartComponent = () => {
    const [readingResults, setReadingResults] = useState([]);
    const { id } = useParams();
    const jan = 0;
    const feb = 0;

    useEffect(() => {
        const fetchData = async() => {
          try {
            const response = await fetch(`http://localhost:3000/userpage/${id}/goals`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                const results = await response.json();
                console.log(results.totalCalculations)
                
            }
            
            // for(var i=0; i< results.totalCalculations.length; i++){
            //     var month = results.totalGoalProgress[i].date.substring(5,7);
            //      
            //     switch(month) {
                // case '01':
                //     jan += results.totalGoalProgress[i].reapplicationPerDay;
                //     break;
                //   case '02':
                //     feb += results.totalGoalProgress[i].reapplicationPerDay;
                //     break;
                //   default:
                //     console.log("error");
                // }
            //     if(results.totalGoalProgress[i].success === false){
            //         successIndicator = 0
            //     } else if (results.totalGoalProgress[i].success === true) {
            //         successIndicator = 1
            //     }
            //     arrSuccess.push(successIndicator)
                
            //     const month = results.totalGoalProgress[i].date.substring(5,7)
            //     const day = results.totalGoalProgress[i].marked_complete.substring(8,10)
            //     arrDate.push([month, day]);
            //  }
            //console.log(arrDate);
            //console.log(arrSuccess);
    
            // arrDate.forEach(([month, day], i) => {
            //     successIndicator = arrSuccess[i]
            //     if(successIndicator = 1){
            //         const monthIndex = month.charAt(1);
            //         const dayIndex = day.charAt(1);
            //         heatmapGridData[monthIndex-1][dayIndex-1] = successIndicator;
            //     }
            // })
    
            // setGoalResults(arrSuccess);
            // setGoalDate(arrDate);
            
          } catch (error) {
              console.log(error.message);
          }
        }
        fetchData();
      }, [id]);

    return (
      <div>
          <h2>This shows how often you should've reapplied your sunscreen...</h2>
            <ResponsiveContainer width="100%" aspect={2}>
                <LineChart data={annualData}>
                    <CartesianGrid />
                    <XAxis dataKey="name" interval={"preserveStartEnd"} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line
                        dataKey="reapplication"
                        stroke="black"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
      </div>
    );
  };
  
  export default LineChartComponent;