/*
 * Provides a display panel of a ship's maneuvers.
 */
var ManeuverChooser = React.createClass(
{
    findManeuver: function(maneuvers, bearing, speed)
    {
        var answer;

        for (var i = 0; i < maneuvers.length; i++)
        {
            var maneuver = maneuvers[i];
            var properties = Maneuver.properties[maneuver];

            if (properties.bearing === bearing && properties.speed === speed)
            {
                answer = maneuver;
                break;
            }
        }

        return answer;
    },

    getInitialState: function() 
    {
        return {element: undefined, maneuver: undefined};
    },

    getMaximumSpeed: function(maneuvers)
    {
        var answer = -10000;

        for (var i = 0; i < maneuvers.length; i++)
        {
            var maneuver = maneuvers[i];
            var speed = Maneuver.properties[maneuver].speed;
            answer = Math.max(speed, answer);
        }

        return answer;
    },

    getMinimumSpeed: function(maneuvers)
    {
        var answer = 10000;

        for (var i = 0; i < maneuvers.length; i++)
        {
            var maneuver = maneuvers[i];
            var speed = Maneuver.properties[maneuver].speed;
            answer = Math.min(speed, answer);
        }

        return answer;
    },
    
    getSelectedManeuver:function()
    {
        return this.state.maneuver;
    },
    
    getToken:function()
    {
        return this.props.token;
    },
    
    render: function() 
    {
        var token = this.props.token;
        var imageUtils = this.props.imageUtils;
        var pilotName = token.getPilotName();
        var shipName = token.getShipName();
        var maneuvers = token.getManeuvers();
        var minSpeed = this.getMinimumSpeed(maneuvers);
        var maxSpeed = this.getMaximumSpeed(maneuvers);
        var bearingValues = Bearing.values;
        var self = this;

        var myHtml = [];

        if (pilotName)
        {
            myHtml[myHtml.length] = <tr key={myHtml.length} id="pilotName">
                <td colSpan={bearingValues.length + 1}>
                {pilotName}
                </td>
                </tr>;
        }

        if (shipName)
        {
            myHtml[myHtml.length] = <tr key={myHtml.length} id="shipName">
                <td colSpan={bearingValues.length + 1}>
                {shipName}
                </td>
                </tr>
        }

        for (var speed = maxSpeed; speed >= minSpeed; speed--)
        {
            var cells = [];
            cells[cells.length] = <td key={cells.length}>{speed}</td>;

            for (var i = 0; i < bearingValues.length; i++)
            {
                var bearing = bearingValues[i];
                var maneuver = this.findManeuver(maneuvers, bearing, speed);

                if (maneuver)
                {
                    var difficulty = Maneuver.properties[maneuver].difficulty;
                    var iconSrc = imageUtils.createManeuverIconSource(bearing, difficulty);
                    cells[cells.length] = <td key={cells.length}
                        className="maneuverCell"
                        onClick={self.selectionChanged}
                        data-token={token}
                        data-maneuver={maneuver} >
                        <img src={iconSrc} />
                        </td>;
                }
                else
                {
                    cells[cells.length] = <td key={cells.length}>&nbsp;</td>;
                }
            }

            myHtml[myHtml.length] = <tr key={myHtml.length}>{cells}</tr>;
        }
        
        return (
            <table
            className="maneuverTable">
            {myHtml}
            </table>
            );
    },

    selectionChanged: function(event)
    {
        var oldElement = this.state.element;
        
        if (oldElement)
        {
            HtmlUtilities.removeClass(oldElement, "highlight");
        }
        
        var element = event.currentTarget;
        var token = element.dataset.token;
        var maneuver = element.dataset.maneuver;
        LOGGER.debug("selectionChanged() maneuver = " + maneuver);
        this.setState({element: element, maneuver: maneuver});
        HtmlUtilities.addClass(element, "highlight");
        
        var callback = this.props.callback;
        
        if (callback)
        {
            callback(token, maneuver);
        }
    },
});
