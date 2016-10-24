function ForwardPEChart(chartCanvasId, symbols)
{
    InputValidator.validateNotEmpty("chartCanvasId", chartCanvasId);
    InputValidator.validateNotEmpty("symbols", symbols);

    var defaultData = [];

    for (var i = 0; i < symbols.length; i++)
    {
        defaultData.push(0);
    }

    var data =
    {
        labels: symbols,
        datasets: [
        {
            fillColor: "blue",
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

    var myBarChart;

    this.receiveData = function(keyStats)
    {
        InputValidator.validateNotNull("keyStats", keyStats);

        LOGGER.trace("keyStats = " + keyStats.getSymbol() + " " + keyStats.getPrice().label + " " +
                keyStats.getPrice().value + " " + keyStats.getPrice().number);
        var symbol = keyStats.getSymbol();
        LOGGER.trace("symbol = " + symbol);
        var index = data.labels.indexOf(symbol);
        LOGGER.trace("index = " + index);

        if (index >= 0)
        {
            var forwardPE = (keyStats.getForwardPE() ? keyStats.getForwardPE().number : undefined);
            LOGGER.trace(symbol + " forwardPE = " + forwardPE);

            if (forwardPE && !isNaN(forwardPE))
            {
                data.datasets[0].data[index] = forwardPE;

                // Destroy old chart.
                myBarChart && myBarChart.destroy();

                // Hack because destroy() doesn't work.
                var container = document.getElementById(chartCanvasId + "Container");
                container.innerHTML = "&nbsp;";
                container.innerHTML = "<canvas id=\"" + chartCanvasId +
                        "\" class=\"chart\" width=\"300\" height=\"200\"></canvas>";

                // Create new chart.
                var ctx = document.getElementById(chartCanvasId).getContext("2d");
                myBarChart = new Chart(ctx).Bar(data, options);
            }
        }
    }
}
