var CheckboxInputPanel = React.createClass(
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
        // Initially selected values.
        initialValues: PropTypes.oneOfType([ PropTypes.string, PropTypes.array,
                PropTypes.object ]),
        // Function which returns the label for a value. Defaults to simply return the value.
        labelFunction: PropTypes.func,
        name: PropTypes.string,
        // Panel CSS class.
        panelClass: PropTypes.string,
    },

    getInitialState: function()
    {
        var selected = [];

        if (this.props.initialValues)
        {
            selected = this.props.initialValues;
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
            type: "checkbox",
            values: this.props.values,
            idFunction: this.props.idFunction,
            labelFunction: this.props.labelFunction,
            initialValues: this.props.initialValues,
            onChange: this.handleChange,
            panelClass: this.props.panelClass,
            clientProps: this.props.clientProps,
        });
    },

    findById: function(values, id)
    {
        var answer;
        var idFunction = this.props.idFunction;

        for (var i = 0; i < values.length; i++)
        {
            var value = values[i];
            var myId = String(idFunction ? idFunction(value) : value);

            if (id === myId)
            {
                answer = value;
                break;
            }
        }

        return answer;
    },

    getSelected: function()
    {
        return this.state.selected;
    },

    handleChange: function(event)
    {
        LOGGER.trace("CheckboxInputPanel.handleChange() start");

        var source = event.target;
        var id = source.id;
        var value = this.findById(this.props.values, id);
        var selected = this.state.selected;
        (source.checked ? selected.push(value) : selected.vizziniRemove(value));

        this.setState(
        {
            selected: selected
        });

        var onChange = this.props.onChange;

        if (onChange)
        {
            onChange(event, selected);
        }

        LOGGER.trace("CheckboxInputPanel.handleChange() end");
    },
});
