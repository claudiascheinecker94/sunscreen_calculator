import React from 'react';
import HeatmapGrid from 'react-heatmap-grid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

//empty 2d array that represents month + day
const heatmapGridData = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];

//labels representing month + day
const labels = {
  xLabels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28','29', '30', '31'],
  yLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
};

const Heatmap = () => {
  const [goalResults, setGoalResults] = useState([]);
  const [goalDate, setGoalDate] = useState([]);
  const { id } = useParams();
  var successIndicator;
  var arrSuccess = [];
  var arrDate = [];

  //fetch necessary data for statistics from the database. In this case we need
  //* Dates and Success/Failure indicators from the Goals Schema
  //* Total amount of sunscreen calculations from the Readings Schema
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`http://localhost:3000/userpage/${id}/goals`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            const results = await response.json();
            console.log(results.totalGoalProgress[0].success)
            
            for(var i=0; i< results.totalGoalProgress.length; i++){
                if(results.totalGoalProgress[i].success === false){
                    successIndicator = 0
                } else if (results.totalGoalProgress[i].success === true) {
                    successIndicator = 1
                }
                arrSuccess.push(successIndicator)
                const month = results.totalGoalProgress[i].marked_complete.substring(5,7)
                const day = results.totalGoalProgress[i].marked_complete.substring(8,10)
                arrDate.push([month, day]);
             }
        }

        //console.log("ArrDate " + arrDate);
        //console.log("ArrSuccess "  + arrSuccess);

        arrDate.forEach(([month, day], i) => {
            successIndicator = arrSuccess[i]
            if(successIndicator = 1){
                const monthIndex = parseInt(month);
                const dayIndex = parseInt(day);
                heatmapGridData[monthIndex-1][dayIndex-1] = successIndicator;
            }
        })

        setGoalResults(arrSuccess);
        setGoalDate(arrDate);
        
      } catch (error) {
          console.log(error.message);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div>
        <h3 className='chart-title'>Look at how diligently you were with your sunscreen use...</h3>
        <br></br>
        <div className="chart-box">
          <HeatmapGrid
              data={heatmapGridData}
              xLabels={labels.xLabels}
              yLabels={labels.yLabels}
              squares
              unit={"success"}
              xLabelsLocation={"bottom"}
              background={"#f0efeb"}
              cellStyle={(background, value, min, max, data, x, y) => ({
                  background: `rgba(247, 185, 14, ${1 - (max - value)})`,
                })}
              height={30}
          />
        </div>
    </div>
  );
};

export default Heatmap;