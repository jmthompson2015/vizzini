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

            var input2 = React.DOM.input(
            {
                id: "backCountInput",
                type: "number",
                defaultValue: this.props.backCount,
                onChange: this.onBackCountChange,
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

            cells = [];
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, "Back Count:"));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, input2));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            if (this.props.additionalNumberControl)
            {
                var additionalNumberControl = this.props.additionalNumberControl;
                var input3 = React.DOM.input(
                {
                    id: additionalNumberControl.id,
                    type: "number",
                    defaultValue: additionalNumberControl.defaultValue,
                    onChange: additionalNumberControl.onChange,
                });

                cells = [];
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, additionalNumberControl.label));
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, input3));
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, cells));
            }

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

        onBackCountChange: function(event)
        {
            var backCount = Number(event.target.value);
            LOGGER.trace("ProblemControlsUI backCount = " + backCount);
            this.context.store.dispatch(Action.setBackCount(backCount));
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
        additionalNumberControl: React.PropTypes.object,
        backCount: React.PropTypes.number.isRequired,
        generationCount: React.PropTypes.number.isRequired,
        popSize: React.PropTypes.number.isRequired,
        submitFunction: React.PropTypes.func.isRequired,
    };

    return ProblemControlsUI;
});
