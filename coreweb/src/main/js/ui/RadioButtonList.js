/*
 * Provides a radio list component.
 */
var RadioButtonList = React.createClass(
{
    getInitialState: function()
    {
        LOGGER.warn("Deprecated: RadioButtonList; please use InputPanel or RadioInputPanel instead.");
        
        var initial = this.props.initialSelectedIndex;
        var index = (initial ? parseInt(initial) : 0);

        return (
        {
            "selectedIndex": index
        });
    },

    handleChange: function(event)
    {
        this.setState(
        {
            selectedIndex: event.target.value
        });

        var onChange = this.props.onChange;

        if (onChange)
        {
            event.currentTarget.parent = this;
            onChange(event);
        }
    },

    render: function()
    {
        var options = this.props.options;
        var panelClass = this.props.panelClass;
        var panelStyle = this.props.panelStyle;
        var name = this.props.name;
        var self = this;

        var myRows = options.map(function(option, index)
        {
            var isSelected = (index === self.state.selectedIndex);

            var input = React.DOM.input(
            {
                key: 0,
                type: "radio",
                name: name,
                value: index,
                onChange: self.handleChange,
                defaultChecked: isSelected
            });
            var span = React.DOM.span(
            {
                key: 1
            }, option);
            var label = React.DOM.label({}, [ input, span ]);
            var cell = React.DOM.td({}, label);
            return React.DOM.tr(
            {
                key: index
            }, cell);
        });

        return React.DOM.table(
        {
            className: panelClass,
            style: panelStyle
        }, myRows);
    }
});
