define(function()
{
    "use strict";
    var ProblemControlsUI = React.createClass(
    {
        render: function()
        {
            var popSize = this.props.popSize;
            var generationCount = this.props.generationCount;

            var rows = [];

            var input0 = React.DOM.input(
            {
                id: "popSizeInput",
                type: "number",
                defaultValue: popSize
            });
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, [ React.DOM.td(
            {
                key: 0
            }, "Population Size:"), React.DOM.td(
            {
                key: 1
            }, input0) ]));

            var input1 = React.DOM.input(
            {
                id: "generationCountInput",
                type: "number",
                defaultValue: generationCount
            });
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, [ React.DOM.td(
            {
                key: 0
            }, "Generation Count:"), React.DOM.td(
            {
                key: 1
            }, input1) ]));

            var button = React.DOM.button(
            {
                onClick: this.props.submitFunction,
            }, "Submit");
            rows.push(React.DOM.tr(
            {
                key: 3
            }, React.DOM.td(
            {
                colSpan: 2,
                className: "buttonsPanel"
            }, button)));

            return React.DOM.table({}, React.DOM.tbody({}, rows));
        },

        getPopSize: function()
        {
            return this.getNumber("popSizeInput");
        },

        getGenerationCount: function()
        {
            return this.getNumber("generationCountInput");
        },

        getNumber: function(elementId)
        {
            var value = document.getElementById(elementId).value;

            return Number(value);
        },
    });

    return ProblemControlsUI;
});
