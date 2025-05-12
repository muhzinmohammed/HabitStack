import React from 'react'
import { Chart, BarController, BarElement,CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'


Chart.register(BarController, BarElement,CategoryScale, LinearScale)
const BarGraph = (props) => {
    const BarData = {
        labels: props.category,
        datasets: [{
            label: " ",
            barThickness: 20,
            backgroundColor: [
                "rgb(83, 172, 255,0.2)",
                "rgb(255, 200, 83,0.2)",
                "rgb(0, 0, 0,0.2)",
                "rgb(113, 255, 120,0.2)",
                "rgb(83, 172, 255,0.2)"
            ],
            borderColor: ["rgb(83, 172, 255)"],
            borderColor: ["rgb(113, 255, 120)"],
            borderWidth: 1,
            borderRadius:6,
            data: props.count
        }] 
    }
    const option = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                },
                max: Math.max(...props.count)+1
            }
        },
        plugins: {
            legend: {
              display: false
            }
        }
    };
  return (
    <div className='bar'>
      <Bar data = {BarData} options={option} width = {300} height = {200}/>
    </div>
  )
}

export default BarGraph
