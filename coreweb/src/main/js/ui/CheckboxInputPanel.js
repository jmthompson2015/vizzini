// require("Logger");
// require("InputValidator");
// require("ArrayAugments");
// require("InputPanel");

/*
 * Provides a checkbox input panel component.
 * 
 * @param values Option values. (required)
 * @param idFunction Function which returns the id for a value. Defaults to simply return the value. (optional)
 * @param labelFunction Function which returns the label for a value. Defaults to simply return the value. (optional)
 * @param initialValues Initially selected values. (optional)
 * @param onChange Function called when the selection changes. (optional)
 * @param panelClass Panel class. (optional)
 * @param clientProps Client properties. (optional)
 */
var CheckboxInputPanel = React.createClass(
{
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
