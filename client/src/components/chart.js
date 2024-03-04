import React from 'react';
//import HeatmapGrid from 'react-heatmap-grid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

// const data = [
//     [1, 2, 3, 4, 5],
//     [6, 7, 8, 9, 10],
//     [11, 12, 13, 14, 15],
//     [16, 17, 18, 19, 20],
//     [16, 17, 18, 19, 20],
//     [16, 17, 18, 19, 20],
//   ];


//   const labels = {
//     xLabels: ['X1', 'X2', 'X3', 'X4', 'X5'],
//     yLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//   };

const Heatmap = () => {
  const [goalResults, setGoalResults] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`http://localhost:3000/userpage/${id}/goals`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            const results = await response.json();
            setGoalResults(goalResults);
            console.log(goalResults)
        }
        
      } catch (error) {
          console.log(error.message);
      }
    }
    fetchData();
  });
  

  return (
    <div>
        <h2>Basic Heatmap Example</h2>
        <div>{goalResults}</div>
        {/* <HeatmapGrid
            data={data}
            xLabels={labels.xLabels}
            yLabels={labels.yLabels}
            squares
            height={30}
            onClick={(x, y) => alert(`Clicked on cell (${x}, ${y}) with value ${data[y][x]}`)}
        /> */}
    </div>
  );
};

export default Heatmap;