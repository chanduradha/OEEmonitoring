import Highcharts from 'highcharts';

export const updateMachineStateChart = (chartContainer, machineStateData) => {
  const chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Machine State Trend'
    },
    xAxis: {
      categories: machineStateData.dates,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Time (minutes)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} min</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        stacking: 'normal', // Enable stacking
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'On Time',
      data: machineStateData.onTime,
      color: 'green'
    }, {
      name: 'Idle Time',
      data: machineStateData.idleTime,
      color: 'orange'
    }, {
      name: 'Off Time',
      data: machineStateData.offTime,
      color: 'red'
    }]
  };

  if (chartContainer && Highcharts) {
    Highcharts.chart(chartContainer, chartOptions);
  }
};
