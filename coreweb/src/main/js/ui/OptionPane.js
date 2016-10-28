/*
 * Provides a React component which emulates a Java
 * <a href="http://docs.oracle.com/javase/6/docs/api/javax/swing/JOptionPane.html">JOptionPane</a>.
 */
var OptionPane = React.createClass(
{
    propTypes:
    {
        buttons: React.PropTypes.object.isRequired,
        message: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,

        initialInput: React.PropTypes.object,
        buttonsClass: React.PropTypes.string,
        buttonsStyle: React.PropTypes.object,
        icon: React.PropTypes.object,
        iconClass: React.PropTypes.string,
        iconStyle: React.PropTypes.object,
        inputClass: React.PropTypes.string,
        inputStyle: React.PropTypes.object,
        messageClass: React.PropTypes.string,
        messageStyle: React.PropTypes.object,
        panelClass: React.PropTypes.string,
        panelStyle: React.PropTypes.object,
        titleClass: React.PropTypes.string,
        titleStyle: React.PropTypes.object,
    },

    getInitialState: function()
    {
        return (
        {
            input: this.props.initialInput
        });
    },

    render: function()
    {
        var rows = [];

        var cell0 = React.DOM.td(
        {
            colSpan: 2,
            className: this.props.titleClass,
            style: this.props.titleStyle
        }, this.props.title);
        rows.push(React.DOM.tr(
        {
            key: 0
        }, cell0));

        var cell10 = React.DOM.td(
        {
            key: 0,
            rowSpan: 2,
            className: this.props.iconClass,
            style: this.props.iconStyle
        }, this.props.icon);
        var cell11 = React.DOM.td(
        {
            key: 1,
            className: this.props.messageClass,
            style: this.props.messageStyle
        }, this.props.message);
        rows.push(React.DOM.tr(
        {
            key: 1
        }, [cell10, cell11]));

        var cell2 = React.DOM.td(
        {
            className: this.props.inputClass,
            style: this.props.inputStyle
        }, this.state.input);
        rows.push(React.DOM.tr(
        {
            key: 2
        }, cell2));

        var cell3 = React.DOM.td(
        {
            colSpan: 2,
            className: this.props.buttonsClass,
            style: this.props.buttonsStyle
        }, this.props.buttons);
        rows.push(React.DOM.tr(
        {
            key: 3
        }, cell3));

        return React.DOM.table(
        {
            className: this.props.panelClass,
            style: this.props.panelStyle
        }, React.DOM.tbody(
        {}, rows));
    }
});
