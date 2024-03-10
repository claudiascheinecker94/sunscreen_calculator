//https://www.geeksforgeeks.org/create-a-line-chart-using-recharts-in-reactjs/
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
    {name: "Jan" ,reapplication: 0, hourInterval: 0},
    {name: "Feb" ,reapplication: 0, hourInterval: 0},
    {name: "Mar" ,reapplication: 0, hourInterval: 0},
    {name: "Apr" ,reapplication: 0, hourInterval: 0},
    {name: "May" ,reapplication: 0, hourInterval: 0},
    {name: "Jun" ,reapplication: 0, hourInterval: 0},
    {name: "Jul" ,reapplication: 0, hourInterval: 0},
    {name: "Aug" ,reapplication: 0, hourInterval: 0},
    {name: "Sep" ,reapplication: 0, hourInterval: 0},
    {name: "Oct" ,reapplication: 0, hourInterval: 0},
    {name: "Nov" ,reapplication: 0, hourInterval: 0},
    {name: "Dec" ,reapplication: 0, hourInterval: 0},
];

const LineChartComponent = () => {
    const [reapplications, setReapplications] = useState([]);
    const [amount, setAmount] = useState([]);
    const { id } = useParams();
    var readingCount = [0,0,0,0,0,0,0,0,0,0,0,0];
    var sumHourInterval = [0,0,0,0,0,0,0,0,0,0,0,0];
    var sumReapplications = [0,0,0,0,0,0,0,0,0,0,0,0];
    var sumAmount = 0;

    useEffect(() => {
        const fetchData = async() => {
          try {
            const response = await fetch(`http://localhost:3000/userpage/${id}/goals`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                const results = await response.json();
                //console.log(results.totalCalculations); 
                
                for(var i=0; i< results.totalCalculations.length; i++){
                    var month = results.totalCalculations[i].date.substring(5,7);
                    var numReapplications = results.totalCalculations[i].reapplicationPerDay;
                    var hourInterval = results.totalCalculations[i].reapplicationRate;
                    var amount = results.totalCalculations[i].amount;
                     
                    switch(month) {
                    case '01':
                        readingCount[0]++;
                        sumHourInterval[0] = hourInterval;
                        sumReapplications[0] += numReapplications;
                        break;
                      case '02':
                        readingCount[1]++;
                        sumHourInterval[1] += hourInterval;
                        sumReapplications[1] += numReapplications;
                        break;
                      case '03':
                        readingCount[2]++;
                        sumHourInterval[2] += hourInterval;
                        sumReapplications[2] += numReapplications;
                        break;
                      case '04':
                        readingCount[3]++;
                        sumHourInterval[3] += hourInterval;
                        sumReapplications[3] += numReapplications;
                        break;
                      case '05':
                        readingCount[4]++;
                        sumHourInterval[4] += hourInterval;
                        sumReapplications[4] += numReapplications;
                        break;
                      case '06':
                        readingCount[5]++;
                        sumHourInterval[5] += hourInterval;
                        sumReapplications[5] += numReapplications;
                        break;
                      case '07':
                        readingCount[6]++;
                        sumHourInterval[6] += hourInterval;
                        sumReapplications[6] += numReapplications;
                        break;
                      case '08':
                        readingCount[7]++;
                        sumHourInterval[7] += hourInterval;
                        sumReapplications[7] += numReapplications;
                        break;
                      case '09':
                        readingCount[8]++;
                        sumHourInterval[8] += hourInterval;
                        sumReapplications[8] += numReapplications;
                        break;
                      case '10':
                        readingCount[9]++;
                        sumHourInterval[9] += hourInterval;
                        sumReapplications[9] += numReapplications;
                        break;
                      case '11':
                        readingCount[10]++;
                        sumHourInterval[10] += hourInterval;
                        sumReapplications[10] += numReapplications;
                        break;
                      case '12':
                        readingCount[11]++;
                        sumHourInterval[11] += hourInterval;
                        sumReapplications[11] += numReapplications;
                        break;
                      default:
                        console.log("error");
                    }

                    sumAmount += amount;
                }
                
                // console.log(readingCount);
                // console.log(sumReapplications);
                // console.log(sumHourInterval);
                for(var i=0; i<readingCount.length; i++){
                    if(readingCount[i] != 0){
                        annualData[i].reapplication = sumReapplications[i]/readingCount[i];
                        annualData[i].hourInterval = sumHourInterval[i]/readingCount[i];
                    } else {
                        annualData[i].reapplication = 0;
                        annualData[i].hourInterval = 0;
                    }   
                }
                //console.log(annualData)
                setReapplications(annualData);
                setAmount(sumAmount);


            }  
          } catch (error) {
              console.log(error.message);
          }
        }
        fetchData();
      }, [id]);

    return (
      <div>
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
                            name="Avg. reapplications/day"
                            dataKey="reapplication"
                            stroke="black"
                            activeDot={{ r: 8 }}
                        />
                        <Line
                            name="Avg. h btw reapplications"
                            dataKey="hourInterval"
                            stroke="red"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>  
            <div>
                <h2>This total amount of sunscreen already used this year...</h2>
                <p>{amount}</p>
            </div>
      </div>
    );
  };
  
  export default LineChartComponent;