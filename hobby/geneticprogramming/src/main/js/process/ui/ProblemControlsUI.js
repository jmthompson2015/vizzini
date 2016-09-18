define([ "process/Action" ], function(Action)
{
    "use strict";
    var ProblemControlsUI = React.createClass(
    {
        render: function()
        {
            var input0 = React.DOM.input(
            {
                id: "popSizeInput",
                type: "number",
                defaultValue: this.props.popSize,
                onChange: this.onPopSizeChange,
            });

            var input1 = React.DOM.input(
            {
                id: "generationCountInput",
                type: "number",
                defaultValue: this.props.generationCount,
                onChange: this.onGenerationCountChange,
            });

            var button = React.DOM.button(
            {
                onClick: this.props.submitFunction,
            }, "Submit");

            var rows = [];
            var cells = [];
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, "Population Size:"));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, input0));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, "Generation Count:"));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, input1));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            var cell = React.DOM.td(
            {
                className: "buttonsPanel",
                colSpan: 2,
            }, button);
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cell));

            return React.DOM.table({}, React.DOM.tbody({}, rows));
        },

        onGenerationCountChange: function(event)
        {
            var generationCount = Number(event.target.value);
            LOGGER.trace("ProblemControlsUI generationCount = " + generationCount);
            this.context.store.dispatch(Action.setGenerationCount(generationCount));
        },

        onPopSizeChange: function(event)
        {
            var popSize = Number(event.target.value);
            LOGGER.trace("ProblemControlsUI popSize = " + popSize);
            this.context.store.dispatch(Action.setPopSize(popSize));
        },
    });

    ProblemControlsUI.contextTypes =
    {
        store: React.PropTypes.object.isRequired,
    };

    ProblemControlsUI.propTypes =
    {
        generationCount: React.PropTypes.number.required,
        popSize: React.PropTypes.number.required,
        submitFunction: React.PropTypes.func.required,
    };

    return ProblemControlsUI;
});
