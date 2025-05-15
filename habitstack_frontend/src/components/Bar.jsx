import React from 'react'
import { Chart, BarController, BarElement,CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'


Chart.register(BarController, BarElement,CategoryScale, LinearScale)
const BarGraph = (props) => {
    const BarData = {
        labels: props.category,
        datasets: [{
            label: " ",
            barThickness: 15,
            CategoryScale: 100,
            backgroundColor: [
                "#DD614A",
                "#1E555C",
                "#FF6B6B",
                "#73A580",
                "#F15152"
            ],
            borderWidth: 1,
            borderRadius:6,
            data: props.count
        }] 
    }
    const option = {
        indexAxis: 'y',
        scales: {
            x: {
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
      <Bar data = {BarData} options={option} width = {310} height = {180}/>
    </div>
  )
}

export default BarGraph
