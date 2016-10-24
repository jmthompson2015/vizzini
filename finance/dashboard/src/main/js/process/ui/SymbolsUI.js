define(function()
{
    "use strict";
    var SymbolsUI = React.createClass(
    {
        getInitialState: function()
        {
            LOGGER.debug("SymbolsUI.getInitialState()");

            var initialSymbolString = (this.props.initialSymbolString ? this.props.initialSymbolString
                    : "AAPL,AMZN,INTC,KO,T,TRV,VSMGX");

            return (
            {
                symbolString: initialSymbolString,
            });
        },

        render: function()
        {
            LOGGER.debug("SymbolsUI.render()");

            var symbolsInput = React.DOM.input(
            {
                id: "symbolsUI",
                type: "text",
                value: this.state.symbolString,
                onChange: this.handleChange,
            });

            var submitButton = React.DOM.button(
            {
                onClick: this.handleSubmit,
            }, "Submit");

            var rows = [];
            var cells = [];

            cells.push(React.DOM.td({}, "Symbols: "));
            cells.push(React.DOM.td({}, symbolsInput));
            cells.push(React.DOM.td({}, submitButton));
            rows.push(React.DOM.tr({}, cells));

            rows.push(React.DOM.tr({}, React.DOM.td(
            {
                className: "example",
                colSpan: 3,
            }, "Example: AAPL,AMZN,INTC,KO,T,TRV,VSMGX")));

            return React.DOM.table({}, rows);
        },

        handleChange: function(event)
        {
            LOGGER.debug("SymbolsUI.handleChange()");

            this.setState(
            {
                symbolString: event.target.value,
            });
        },

        handleSubmit: function(event)
        {
            LOGGER.debug("SymbolsUI.handleSubmit()");

            this.props.callback(this.state.symbolString);
        },
    });

    return SymbolsUI;
});
