/*
 * Provides a user interface for genetic algorithm controls.
 */
var ProblemControlsUI = React.createClass(
{
    render: function()
    {
        var popSize = this.props.popSize;
        var generationCount = this.props.generationCount;
        var backCount = this.props.backCount;

        var rows = [];

        var input0 = React.DOM.input(
        {
            id: "popSizeInput",
            type: "number",
            defaultValue: popSize
        });
        rows.push(React.DOM.tr(
        {
            key: 0
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
            key: 1
        }, [ React.DOM.td(
        {
            key: 0
        }, "Generation Count:"), React.DOM.td(
        {
            key: 1
        }, input1) ]));

        var input2 = React.DOM.input(
        {
            id: "backCountInput",
            type: "number",
            defaultValue: backCount
        });
        rows.push(React.DOM.tr(
        {
            key: 2
        }, [ React.DOM.td(
        {
            key: 0
        }, "Back Count:"), React.DOM.td(
        {
            key: 1
        }, input2) ]));

        var button = React.DOM.button(
        {
            onClick: submitActionPerformed
        }, "Submit");
        rows.push(React.DOM.tr(
        {
            key: 3
        }, React.DOM.td(
        {
            colSpan: 2,
            className: "buttonsPanel"
        }, button)));

        return React.DOM.table({}, rows);
    },

    getPopSize: function()
    {
        return this.getNumber("popSizeInput");
    },

    getGenerationCount: function()
    {
        return this.getNumber("generationCountInput");
    },

    getBackCount: function()
    {
        return this.getNumber("backCountInput");
    },

    getNumber: function(elementId)
    {
        var value = document.getElementById(elementId).value;

        return Number(value);
    },
});
