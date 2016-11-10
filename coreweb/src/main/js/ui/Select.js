/*
 * Provides an HTML select with options derived from values and the label function.
 * Optionally provide client properties which can be retrieved from the event in your onChange function.
 */
"use strict";
var Select = React.createClass(
{
    getInitialState: function()
    {
        return (
        {
            selectedValue: this.props.initialSelectedValue,
        });
    },

    handleChange: function(event)
    {
        this.setState(
        {
            selectedValue: event.target.value,
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

        var selectProps = {
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
                value: value,
            }, label));
        }

        return React.DOM.select(selectProps, options);
    },
});

Select.propTypes = {
    // Option values. (required)
    values: React.PropTypes.array.isRequired,

    // Client properties. (optional)
    clientProps: React.PropTypes.object,
    // Initially selected value. (optional)
    initialSelectedValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    // Function which returns the label for a value. Defaults to simply return the value. (optional)
    labelFunction: React.PropTypes.func,
    // Function called when the selection changes. (optional)
    onChange: React.PropTypes.func,
};
