// require("Logger");
// require("InputValidator");
// require("ArrayAugments");
// require("InputPanel");

/*
 * Provides a text input panel component.
 * 
 * @param values Option values. (required)
 * @param idFunction Function which returns the id for a value. Defaults to simply return the value. (optional)
 * @param labelFunction Function which returns the label for a value. Defaults to simply return the value. (optional)
 * @param initialValues Initial map of id to value. (optional)
 * @param onChange Function called when the selection changes. (optional)
 * @param panelClass Panel class. (optional)
 * @param clientProps Client properties. (optional)
 */
var TextInputPanel = React.createClass(
{
    getInitialState: function()
    {
        var values = {};

        if (this.props.initialValues)
        {
            var initialValues = this.props.initialValues;

            Object.getOwnPropertyNames(initialValues).forEach(function(id)
            {
                values[id] = initialValues[id];
            });
        }

        var answer =
        {
            values: values,
        };

        return answer;
    },

    render: function()
    {
        return React.createElement(InputPanel,
        {
            type: "text",
            values: this.props.values,
            idFunction: this.props.idFunction,
            labelFunction: this.props.labelFunction,
            initialValues: this.props.initialValues,
            onChange: this.handleChange,
            panelClass: this.props.panelClass,
            clientProps: this.props.clientProps,
        });
    },

    getValues: function()
    {
        return this.state.values;
    },

    handleChange: function(event)
    {
        LOGGER.trace("TextInputPanel.handleChange() start");

        var source = event.target;
        var id = source.id;
        var value = source.value;
        var values = this.state.values;
        values[id] = value;

        this.setState(
        {
            values: values,
        });

        var onChange = this.props.onChange;

        if (onChange)
        {
            onChange(event);
        }

        LOGGER.trace("TextInputPanel.handleChange() end");
    },
});
