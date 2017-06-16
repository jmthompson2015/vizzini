define(function()
{
    "use strict";
    var InputPanel2 = React.createClass(
    {
        propTypes:
        {
            // Function called when the selection changes.
            onChange: PropTypes.func.isRequired,
            // Input type. (e.g. "checkbox", "radio", "text")
            type: PropTypes.string.isRequired,
            // Option values.
            values: PropTypes.array.isRequired,

            // Client properties.
            clientProps: PropTypes.object,
            // Initial values.
            initialValues: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
            // Function which returns the label for a value. Defaults to simply return the value.
            labelFunction: PropTypes.func,
            // Button name. (required for radio)
            name: PropTypes.string,
            // Panel CSS class.
            panelClass: PropTypes.string,
        },

        getInitialState: function()
        {
            var selected;

            switch (this.props.type)
            {
                case InputPanel2.Type.CHECKBOX:
                    selected = [];
                    break;
                case InputPanel2.Type.TEXT:
                    selected = {};
                    break;
            }

            if (this.props.initialValues)
            {
                switch (this.props.type)
                {
                    case InputPanel2.Type.CHECKBOX:
                        selected.vizziniAddAll(this.props.initialValues);
                        break;
                    case InputPanel2.Type.RADIO:
                        selected = this.props.initialValues;
                        break;
                    case InputPanel2.Type.TEXT:
                        Object.vizziniMerge(selected, this.props.initialValues);
                        break;
                    default:
                        throw "Unknown input type: " + type;
                }
            }

            return (
            {
                selected: selected,
            });
        },

        render: function()
        {
            this.validateProps();

            var inputProps = this.createInputProps();
            var values = this.props.values;

            var rows = values.map(function(value, i)
            {
                return this.createRow(i, value, inputProps);
            }, this);

            return React.DOM.table(
            {
                className: this.props.panelClass,
            }, React.DOM.tbody(
            {}, rows));
        },

        createInputProps: function()
        {
            var answer = {
                name: this.props.name, // needed for radio
                onChange: this.handleChange,
                type: this.props.type,
            };

            var clientProps = this.props.clientProps;

            if (clientProps)
            {
                Object.vizziniMerge(answer, clientProps);
            }

            return answer;
        },

        createRow: function(i, value, inputProps)
        {
            var selected = this.state.selected;
            var labelFunction = this.props.labelFunction;
            var label = (labelFunction ? labelFunction(value) : value);
            var type = this.props.type;

            inputProps.id = i;

            switch (type)
            {
                case InputPanel2.Type.CHECKBOX:
                    inputProps.defaultChecked = selected.vizziniContains(value);
                    break;
                case InputPanel2.Type.RADIO:
                    inputProps.defaultChecked = (value === selected);
                    break;
                case InputPanel2.Type.TEXT:
                    inputProps.defaultValue = selected[i];
                    break;
                default:
                    throw "Unknown input type: " + type;
            }

            var input = React.DOM.input(inputProps);
            var cells = [];

            if (type === InputPanel2.Type.CHECKBOX || type === InputPanel2.Type.RADIO)
            {
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, React.DOM.label(
                {}, input, " ", label)));
            }
            else if (type === InputPanel2.Type.TEXT)
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
                key: "row" + value + i,
            }, cells);
        },

        handleChange: function(event)
        {
            var source = event.target;
            var id = event.target.id;
            var selected = this.state.selected;

            switch (this.props.type)
            {
                case InputPanel2.Type.CHECKBOX:
                    var mySelected = this.props.values[id];
                    if (source.checked)
                    {
                        selected.push(mySelected);
                    }
                    else
                    {
                        selected.vizziniRemove(mySelected);
                    }
                    break;
                case InputPanel2.Type.RADIO:
                    selected = this.props.values[id];
                    break;
                case InputPanel2.Type.TEXT:
                    selected[id] = source.value;
                    break;
                default:
                    throw "Unknown input type: " + type;
            }

            this.setState(
                {
                    selected: selected,
                },
                this.props.onChange(event, selected));
        },

        validateProps: function()
        {
            if (this.props.type === InputPanel2.Type.RADIO)
            {
                InputValidator.validateNotNull("name", this.props.name);
            }
        }
    });

    InputPanel2.Type = {
        CHECKBOX: "checkbox",
        RADIO: "radio",
        TEXT: "text",
    };

    return InputPanel2;
});
