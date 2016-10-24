define(function()
{
    "use strict";
    var Connector = {};

    /*
     * @param chartCanvasId
     * 
     * @param entityName
     * 
     * @param propertyNames || propertyName
     * 
     * @param backgroundColors || backgroundColor
     */
    Connector.BarChart =
    {
        mapStateToProps: function(state, ownProps)
        {
            var datasets = [];
            var symbols = state.symbols;
            var entityName = ownProps.entityName;
            var useLegend = (ownProps.useLegend ? ownProps.useLegend : false);
            var stepSize = (ownProps.stepSize?ownProps.stepSize: 10);
            var labels = ownProps.labels;
            var propertyNames = ownProps.propertyNames ? ownProps.propertyNames : [ ownProps.propertyName ];
            var backgroundColors = ownProps.backgroundColors ? ownProps.backgroundColors : [ ownProps.backgroundColor ];
            propertyNames.forEach(function(propertyName, i)
            {
                var dataset = createDataset(state, entityName, symbols, propertyName, backgroundColors[i]);

                if (labels)
                {
                    dataset.label = labels[i];
                }

                datasets.push(dataset);
            });

            var data =
            {
                labels: symbols,
                datasets: datasets,
            };
            var options =
            {
                legend:
                {
                    labels:
                    {
                        boxWidth: 12,
                    },
                    display: useLegend,
                },
                scales:
                {
                    xAxes: [
                    {
                        gridLines:
                        {
                            display: false,
                        },
                    }, ],
                    yAxes: [
                    {
                        gridLines:
                        {
                            color: "black",
                        },
                        ticks:
                        {
                            stepSize: stepSize,
                            suggestedMin: 0,
                        },
                    }, ],
                },
            };

            return (
            {
                chartCanvasId: ownProps.chartCanvasId,
                data: data,
                options: options,
            });

            function createDataset(state, entityName, symbols, propertyName, backgroundColor)
            {
                var answer = [];

                symbols.forEach(function(symbol)
                {
                    answer.push(getPropertyValue(state, entityName, symbol, propertyName));
                });

                return (
                {
                    backgroundColor: backgroundColor,
                    data: answer,
                });
            }

            function getPropertyValue(state, entityName, symbol, propertyName)
            {
                var answer = 0;
                var myEntity = state[entityName];

                if (myEntity)
                {
                    var myData = myEntity[symbol];

                    if (myData)
                    {
                        answer = myData[propertyName];
                    }
                }

                return answer;
            }
        },
    };

    Connector.DataTable =
    {
        mapStateToProps: function(state, ownProps)
        {
            return (
            {
                symbols: state.symbols,
                keyStatistics: state.keyStatistics,
                performance: state.performance,
            });
        },
    };

    return Connector;
});
