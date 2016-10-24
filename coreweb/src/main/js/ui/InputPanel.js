var InputPanel = React.createClass(
{
    propTypes:
    {
        // Function called when the selection changes.
        onChange: React.PropTypes.func.isRequired,
        // Input type. (e.g. "checkbox", "radio", "text")
        type: React.PropTypes.string.isRequired,
        // Option values.
        values: React.PropTypes.array.isRequired,

        // Client properties.
        clientProps: React.PropTypes.object,
        // Function which returns the id for a value. Defaults to simply return the value.
        idFunction: React.PropTypes.func,
        // Initial values.
        initialValues: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.array,
                React.PropTypes.object ]),
        // Function which returns the label for a value. Defaults to simply return the value.
        labelFunction: React.PropTypes.func,
        // Button name. (required for radio)
        name: React.PropTypes.string,
        // Panel CSS class.
        panelClass: React.PropTypes.string,
    },

    render: function()
    {
        this.validateProps();

        var inputProps = this.createInputProps();
        var selectedIds = this.determineSelectedIds();
        var values = this.props.values;
        var rows = [];

        values.forEach(function(value)
        {
            rows.push(this.createRow(rows.length, value, inputProps, selectedIds));
        }, this);

        return React.DOM.table(
        {
            className: this.props.panelClass,
        }, React.DOM.tbody({}, rows));
    },

    createInputProps: function()
    {
        var answer =
        {
            name: this.props.name, // needed for radio
            onChange: this.props.onChange,
            type: this.props.type,
        };

        var clientProps = this.props.clientProps;

        if (clientProps)
        {
            Object.getOwnPropertyNames(clientProps).forEach(function(key)
            {
                answer[key] = clientProps[key];
            });
        }

        return answer;
    },

    createRow: function(key, value, inputProps, selectedIds)
    {
        var idFunction = this.props.idFunction;
        var id = String(idFunction ? idFunction(value) : value);
        var labelFunction = this.props.labelFunction;
        var label = (labelFunction ? labelFunction(value) : value);

        inputProps.id = id;

        var type = this.props.type;

        if (type === "checkbox" || type === "radio")
        {
            inputProps.defaultChecked = selectedIds.vizziniContains(id);
        }
        else if (type === "text")
        {
            inputProps.defaultValue = this.props.initialValues[id];
        }

        var input = React.DOM.input(inputProps);
        var cells = [];

        if (type === "checkbox" || type === "radio")
        {
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, React.DOM.label({}, input, " ", label)));
        }
        else if (type === "text")
        {
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, label));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, input));
        }

        return React.DOM.tr(
        {
            key: key,
        }, cells);
    },

    determineSelectedIds: function()
    {
        var answer;
        var type = this.props.type;
        var idFunction = this.props.idFunction;

        if (type === "checkbox")
        {
            var values = this.props.initialValues;

            answer = values.map(function(value)
            {
                return String(idFunction ? idFunction(value) : value);
            });
        }
        else if (type === "radio")
        {
            var value = this.props.initialValues;
            var id = String(idFunction ? idFunction(value) : value);
            answer = [ id ];
        }

        return answer;
    },

    validateProps: function()
    {
        if (this.props.type === "radio")
        {
            InputValidator.validateNotNull("name", this.props.name);
        }
    }
});
