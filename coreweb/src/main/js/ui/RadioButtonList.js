/*
 * Provides a radio list component.
 */
var RadioButtonList = React.createClass(
{
    getInitialState: function() 
    {
        var initial = this.props.initialSelectedIndex;
        var index = (initial ? parseInt(initial) : 0);
        
        return {"selectedIndex": index};
    },
    
    handleChange: function(event)
    {
        this.setState({selectedIndex: event.target.value});
        
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
                
                return <tr key={index}><td>
                    <label>
                    <input type="radio" name={name} value={index} onChange={self.handleChange} defaultChecked={isSelected} />
                    {option}</label>
                    </td></tr>
            });
        
        return (<table className={panelClass} style={panelStyle}>{myRows}</table>);
    }
});
