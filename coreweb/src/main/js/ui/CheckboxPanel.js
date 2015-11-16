// require("Logger");
// require("InputValidator");
// require("ArrayAugments");

/*
 * Provides a checkbox panel component.
 * 
 * @param values Option values. (required)
 * @param idFunction Function which returns the id for a value. Defaults to simply return the value. (optional)
 * @param labelFunction Function which returns the label for a value. Defaults to simply return the value. (optional)
 * @param initialSelectedValues Initially selected values. (optional)
 * @param onChange Function called when the selection changes. (optional)
 * @param panelClass Panel class. (optional)
 * @param clientProps Client properties. (optional)
 */
var CheckboxPanel = React.createClass(
{
    getInitialState: function()
    {
        var selected = [];

        if (this.props.initialSelectedValues)
        {
            var initialSelectedValues = this.props.initialSelectedValues;
            var idFunction = this.props.idFunction;

            selected = initialSelectedValues.map(function(value)
            {
                return (idFunction ? idFunction(value) : value);
            });
        }

        var answer =
        {
            selected: selected,
        };

        return answer;
    },

    handleChange: function(event)
    {
        var id = event.target.id;
        var selected = this.state.selected;

        if (event.target.checked)
        {
            selected.push(id);
        }
        else
        {
            selected.vizziniRemove(id);
        }

        LOGGER.debug("selected = " + selected);

        this.setState(
        {
            selected: selected
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

        var panelClass = this.props.panelClass;
        var idFunction = this.props.idFunction;
        var labelFunction = this.props.labelFunction;

        var checkboxProps =
        {
            onChange: this.handleChange,
            type: "checkbox",
        };

        var clientProps = this.props.clientProps;
        // LOGGER.debug("clientProps = " + JSON.stringify(clientProps));

        if (clientProps)
        {
            Object.getOwnPropertyNames(clientProps).forEach(function(key)
            {
                checkboxProps[key] = clientProps[key];
            });
        }

        var rows = [];

        values.forEach(function(value)
        {
            var id = (idFunction ? idFunction(value) : value);
            var label = (labelFunction ? labelFunction(value) : value);

            checkboxProps.id = id;
            checkboxProps.checked = this.state.selected.vizziniContains(id);

            var checkbox = React.DOM.input(checkboxProps, " ", label);

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, checkbox)));
        }, this);

        return React.DOM.table(
        {
            className: panelClass,
        }, React.DOM.tbody({}, rows));
    },

    getSelected: function()
    {
        return this.state.selected;
    }
});
