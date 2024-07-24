// runtimeChart.js
import * as echarts from 'echarts';

export const updateRuntimeChart = (chartRef, data) => {
  if (!chartRef) return;

  const chart = echarts.init(chartRef);

  const options = {
    title: {
      text: 'Runtime Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Runtime Data',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: data.onTime.reduce((a, b) => a + b, 0), name: 'Run Time', itemStyle: { color: 'green' } },
          { value: data.idleTime.reduce((a, b) => a + b, 0), name: 'Idle Time', itemStyle: { color: 'orange' } },
          { value: data.offTime.reduce((a, b) => a + b, 0), name: 'Off Time', itemStyle: { color: 'red' } }
        ]
      }
    ]
  };

  chart.setOption(options);
};
