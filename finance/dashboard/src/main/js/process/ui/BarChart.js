define(function()
{
    "use strict";
    var BarChart = React.createClass(
    {
        componentDidMount: function()
        {
            this.initializeChart(this.props);
        },

        componentWillUnmount: function()
        {
            var chart = this.state.chart;
            chart.destroy();
        },

        componentWillReceiveProps: function(nextProps)
        {
            var chart = this.state.chart;
            chart.destroy();
            this.initializeChart(nextProps);
        },

        getInitialState: function()
        {
            return {};
        },

        render: function()
        {
            InputValidator.validateNotNull("chartCanvasId", this.props.chartCanvasId);
            InputValidator.validateNotNull("data", this.props.data);
            InputValidator.validateNotNull("options", this.props.options);

            var chartCanvasId = this.props.chartCanvasId;

            return React.DOM.canvas(
            {
                id: chartCanvasId,
                className: "chart",
                width: 300,
                height: 200,
            });
        },

        initializeChart: function(nextProps)
        {
            var element = ReactDOM.findDOMNode(this);
            var ctx = element.getContext("2d");
            var chart = new Chart(ctx,
            {
                type: "bar",
                data: nextProps.data,
                options: nextProps.options,
            });
            this.state.chart = chart;
        },

        updatePoints: function(nextProps, chart)
        {
            nextProps.data.datasets.forEach(function(dataset, setIndex)
            {
                dataset.data.forEach(function(point, pointIndex)
                {
                    chart.data.datasets[setIndex].data[pointIndex] = point;
                }, this);
            }, this);
        },
    });

    return BarChart;
});
