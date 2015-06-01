/*
 * Provides a React component which emulates a Java
 * <a href="http://docs.oracle.com/javase/6/docs/api/javax/swing/JOptionPane.html">JOptionPane</a>.
 */
var OptionPane = React.createClass(
{
    getInitialState: function() 
    {
        return {input: this.props.initialInput};
    },
    
    render: function() 
    {
        var panelClass = this.props.panelClass;
        var panelStyle = this.props.panelStyle;
        var titleClass = this.props.titleClass;
        var titleStyle = this.props.titleStyle;
        var iconClass = this.props.iconClass;
        var iconStyle = this.props.iconStyle;
        var messageClass = this.props.messageClass;
        var messageStyle = this.props.messageStyle;
        var inputClass = this.props.inputClass;
        var inputStyle = this.props.inputStyle;
        var buttonsClass = this.props.buttonsClass;
        var buttonsStyle = this.props.buttonsStyle;
        
        return (
            <table className={panelClass} style={panelStyle}>
            <tr>
            <td colSpan="2" className={titleClass} style={titleStyle}>{this.props.title}</td>
            </tr>
            <tr>
            <td rowSpan="2" className={iconClass} style={iconStyle}>{this.props.icon}</td>
            <td className={messageClass} style={messageStyle}>{this.props.message}</td>
            </tr>
            <tr>
            <td className={inputClass} style={inputStyle}>{this.state.input}</td>
            </tr>
            <tr>
            <td colSpan="2" className={buttonsClass} style={buttonsStyle}>{this.props.buttons}</td>
            </tr>
            </table>
        );
    }
});
