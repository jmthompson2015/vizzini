var RadioInputPanel = React.createClass(
{
    propTypes:
    {
        // Button name.
        name: React.PropTypes.string.isRequired,
        // Function called when the selection changes.
        onChange: React.PropTypes.func.isRequired,
        // Option values.
        values: React.PropTypes.array.isRequired,

        // Client properties.
        clientProps: React.PropTypes.object,
        // Function which returns the id for a value. Defaults to simply return the value.
        idFunction: React.PropTypes.func,
        // Initial value.
        initialValue: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.object ]),
        // Function which returns the label for a value. Defaults to simply return the value.
        labelFunction: React.PropTypes.func,
        // Panel CSS class.
        panelClass: React.PropTypes.string,
    },

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
