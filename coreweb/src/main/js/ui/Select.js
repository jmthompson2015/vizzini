/*
 * Provides an HTML select with options derived from values and the label function.
 * Optionally provide client properties which can be retrieved from the event in your onChange function.
 * 
 * @param values Option values. (required)
 * @param labelFunction Function which returns the label for a value. Defaults to simply return the value. (optional)
 * @param initialSelectedValue Initially selected value. (optional)
 * @param onChange Function called when the selection changes. (optional)
 * @param clientProps Client properties. (optional)
 */
var Select = React.createClass(
{
    getInitialState: function()
    {
        return (
        {
            selectedValue: this.props.initialSelectedValue
        });
    },

    handleChange: function(event)
    {
        this.setState(
        {
            selectedValue: event.target.value
        });

        var onChange = this.props.onChange;

        if (onChange)
        {
            onChange(event);
        }
    },

    render: function()
    {
        var values = this.props.values;
        InputValidator.validateNotEmpty("values", values);

        var selectProps =
        {
            value: this.state.selectedValue,
            onChange: this.handleChange,
        };

        var clientProps = this.props.clientProps;

        if (clientProps)
        {
            Object.getOwnPropertyNames(clientProps).forEach(function(key)
            {
                selectProps[key] = clientProps[key];
            });
        }

        var labelFunction = this.props.labelFunction;
        var options = [];

        for (var i = 0; i < values.length; i++)
        {
            var value = values[i];
            var label = (labelFunction ? labelFunction(value) : value);

            options.push(React.DOM.option(
            {
                key: i,
                value: value
            }, label));
        }

        return React.DOM.select(selectProps, options);
    },
});
