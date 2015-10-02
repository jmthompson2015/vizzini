function FreeCashFlowChart(chartCanvasId, symbols)
{
    InputValidator.validateNotEmpty("chartCanvasId", chartCanvasId);
    InputValidator.validateNotEmpty("symbols", symbols);

    this.receiveData = function(keyStats)
    {
        InputValidator.validateNotNull("keyStats", keyStats);

        LOGGER.trace("keyStats = " + keyStats.getSymbol() + " "
                + keyStats.getPrice().label + " " + keyStats.getPrice().value
                + " " + keyStats.getPrice().number);
        var symbol = keyStats.getSymbol();
        LOGGER.trace("symbol = " + symbol);
        var index = data.labels.indexOf(symbol);
        LOGGER.trace("index = " + index);

        if (index >= 0)
        {
            var freeCashFlow = keyStats.getFreeCashFlow().number;
            LOGGER.trace(symbol + " freeCashFlow = " + freeCashFlow);

            if (freeCashFlow && !isNaN(freeCashFlow))
            {
                myBarChart.datasets[0].bars[index].value = freeCashFlow;
                myBarChart.update();
            }
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
            fillColor: "green",
            data: defaultData
        } ]
    };
    var options =
    {
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
    };

    var myBarChart = new Chart(ctx).Bar(data, options);
}
