var TextInputPanel = React.createClass(
{
    propTypes:
    {
        // Function called when the selection changes.
        onChange: PropTypes.func.isRequired,
        // Option values.
        values: PropTypes.array.isRequired,

        // Client properties.
        clientProps: PropTypes.object,
        // Function which returns the id for a value. Defaults to simply return the value.
        idFunction: PropTypes.func,
        // Initial values.
        initialValues: PropTypes.oneOfType([ PropTypes.string, PropTypes.array,
                PropTypes.object ]),
        // Function which returns the label for a value. Defaults to simply return the value.
        labelFunction: PropTypes.func,
        // Button name. (required for radio)
        name: PropTypes.string,
        // Panel CSS class.
        panelClass: PropTypes.string,
    },

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
