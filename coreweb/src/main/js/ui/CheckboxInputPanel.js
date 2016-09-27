var CheckboxInputPanel = React.createClass(
{
    propTypes:
    {
        // Function called when the selection changes.
        onChange: React.PropTypes.func.isRequired,
        // Option values.
        values: React.PropTypes.array.isRequired,

        // Client properties.
        clientProps: React.PropTypes.object,
        // Function which returns the id for a value. Defaults to simply return the value.
        idFunction: React.PropTypes.func,
        // Initially selected values.
        initialValues: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.array,
                React.PropTypes.object ]),
        // Function which returns the label for a value. Defaults to simply return the value.
        labelFunction: React.PropTypes.func,
        name: React.PropTypes.string,
        // Panel CSS class.
        panelClass: React.PropTypes.string,
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
            onChange(selected);
        }

        LOGGER.trace("CheckboxInputPanel.handleChange() end");
    },
});
