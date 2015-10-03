function TotalReturnChart(chartCanvasId, symbols)
{
    InputValidator.validateNotEmpty("chartCanvasId", chartCanvasId);
    InputValidator.validateNotEmpty("symbols", symbols);

    this.receiveData = function(performance)
    {
        InputValidator.validateNotNull("performance", performance);

        var symbol = performance.getSymbol();
        LOGGER.trace("symbol = " + symbol);
        var index = data.labels.indexOf(symbol);
        LOGGER.trace("index = " + index);

        if (index >= 0)
        {
            myBarChart.datasets[0].bars[index].value = performance
                    .getOneYearTotalReturn();
            myBarChart.datasets[1].bars[index].value = performance
                    .getThreeYearTotalReturn();
            myBarChart.datasets[2].bars[index].value = performance
                    .getFiveYearTotalReturn();
            myBarChart.datasets[3].bars[index].value = performance
                    .getTenYearTotalReturn();
            myBarChart.update();
        }
    }

    var defaultData = [];

    for (var i = 0; i < symbols.length; i++)
    {
        defaultData.push(0);
    }

    var ctx = document.getElementById(chartCanvasId).getContext("2d");
    var data =
    {
        labels: symbols,
        datasets: [
        {
            label: "1-Year",
            fillColor: "Cyan",
            data: defaultData
        },
        {
            label: "3-Year",
            fillColor: "DarkTurquoise",
            data: defaultData
        },
        {
            label: "5-Year",
            fillColor: "LightSeaGreen",
            data: defaultData
        },
        {
            label: "10-Year",
            fillColor: "DarkCyan",
            data: defaultData
        } ]
    };
    var options =
    {
        // Boolean - Whether the scale should start at zero, or an order of
        // magnitude down from the lowest value
        scaleBeginAtZero: false,
        // Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,
        // String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,0.8)",
        // Number - Width of the grid lines
        scaleGridLineWidth: 1,
        // Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        // Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: false,
        // String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\">"
                + "<% for (var i=0; i<datasets.length; i++){%>"
                + "<li><span style=\"-moz-border-radius:7px 7px 7px 7px; border-radius:7px 7px 7px 7px; margin-right:10px;width:15px;height:15px;display:inline-block;background-color:<%=datasets[i].fillColor%>\"></span>"
                + "<%if(datasets[i].label){%><%=datasets[i].label%>"
                + "<%}%></li><%}%></ul>"
    };

    var myBarChart = new Chart(ctx).Bar(data, options);
    document.getElementById("chart4Legend").innerHTML = myBarChart
            .generateLegend();
}
