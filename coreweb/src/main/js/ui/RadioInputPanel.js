// require("Logger");
// require("InputValidator");
// require("ArrayAugments");
// require("InputPanel");

/*
 * Provides a radio button input panel component.
 * 
 * @param values Option values. (required)
 * @param idFunction Function which returns the id for a value. Defaults to simply return the value. (optional)
 * @param labelFunction Function which returns the label for a value. Defaults to simply return the value. (optional)
 * @param initialValue Initially selected value. (optional)
 * @param onChange Function called when the selection changes. (optional)
 * @param panelClass Panel class. (optional)
 * @param clientProps Client properties. (optional)
 */
var RadioInputPanel = React.createClass(
{
    getInitialState: function()
    {
        var selected;

        if (this.props.initialValue)
        {
            var value = this.props.initialValue;
            var idFunction = this.props.idFunction;
            selected = (idFunction ? idFunction(value) : value);
        }

        var answer =
        {
            selected: selected,
        };

        return answer;
    },

    render: function()
    {
        return React.createElement(InputPanel,
        {
            type: "radio",
            values: this.props.values,
            name: this.props.name,
            idFunction: this.props.idFunction,
            labelFunction: this.props.labelFunction,
            initialValues: this.props.initialValue,
            onChange: this.handleChange,
            panelClass: this.props.panelClass,
            clientProps: this.props.clientProps,
        });
    },

    handleChange: function(event)
    {
        LOGGER.trace("RadioInputPanel.handleChange() start");

        var source = event.target;
        var selected = source.id;

        this.setState(
        {
            selected: selected,
        });

        var onChange = this.props.onChange;

        if (onChange)
        {
            onChange(selected);
        }

        LOGGER.trace("RadioInputPanel.handleChange() end");
    },
});
