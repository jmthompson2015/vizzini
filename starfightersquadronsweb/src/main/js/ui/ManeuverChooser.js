/*
 * Provides a display panel of a ship's maneuvers.
 */
function ManeuverChooser(tokenIn, imageUtilsIn)
{
    var token = tokenIn;
    var imageUtils = imageUtilsIn;

    var maneuvers = token.getManeuvers();
    var selectedManeuver;

    this.getSelectedManeuver = function()
    {
        return selectedManeuver;
    }

    this.getToken = function()
    {
        return token;
    }

    this.paintComponent = function()
    {
        var answer = "";

        var pilotName = token.getPilotName();
        var shipName = token.getShipName();
        var minSpeed = getMinimumSpeed();
        var maxSpeed = getMaximumSpeed();
        var bearingValues = Bearing.values;
        var prefix = createIdPrefix();

        answer += "<table id='";
        answer += prefix;
        answer += "maneuverTable' class='maneuverTable'>";

        if (pilotName)
        {
            answer += "<tr id='pilotName'><td colspan='"
                    + (bearingValues.length + 1) + "'>";
            answer += pilotName;
            answer += "</td></tr>";
        }

        if (shipName)
        {
            answer += "<tr id='shipName'><td colspan='"
                    + (bearingValues.length + 1) + "'>";
            answer += shipName;
            answer += "</td></tr>";
        }

        for (var speed = maxSpeed; speed >= minSpeed; speed--)
        {
            answer += "<tr>";
            answer += "<td>" + speed + "</td>";

            for (var i = 0; i < bearingValues.length; i++)
            {
                var bearing = bearingValues[i];
                var maneuver = findManeuver(bearing, speed);

                if (maneuver)
                {
                    answer += "<td id='";
                    answer += prefix;
                    answer += maneuver;
                    answer += "Button' onclick=\"PlanningPanel.instance.maneuverClick('";
                    answer += prefix;
                    answer += "', '";
                    answer += maneuver;
                    answer += "')\">";
                    var difficulty = Maneuver.properties[maneuver].difficulty;
                    answer += imageUtils.createManeuverIconString(bearing,
                            difficulty);
                }
                else
                {
                    answer += "<td>&nbsp;";
                }

                answer += "</td>";
            }

            answer += "</tr>";
        }

        answer += "</table>";

        return answer;
    }

    this.setSelectedManeuver = function(maneuver)
    {
        var prefix = createIdPrefix();

        if (selectedManeuver)
        {
            var elementId = prefix + selectedManeuver + "Button";
            var element = document.getElementById(elementId);
            HtmlUtilities.removeClass(element, "highlight");
        }

        selectedManeuver = maneuver;

        var elementId = prefix + selectedManeuver + "Button";
        var element = document.getElementById(elementId);
        HtmlUtilities.addClass(element, "highlight");
    }

    function createIdPrefix()
    {
        return token.getId();
    }

    function findManeuver(bearing, speed)
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
    }

    function getMaximumSpeed()
    {
        var answer = -10000;

        for (var i = 0; i < maneuvers.length; i++)
        {
            var maneuver = maneuvers[i];
            var speed = Maneuver.properties[maneuver].speed;
            answer = Math.max(speed, answer);
        }

        return answer;
    }

    function getMinimumSpeed()
    {
        var answer = 10000;

        for (var i = 0; i < maneuvers.length; i++)
        {
            var maneuver = maneuvers[i];
            var speed = Maneuver.properties[maneuver].speed;
            answer = Math.min(speed, answer);
        }

        return answer;
    }
}
