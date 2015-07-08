/*
 * Provides utilities for working with images.
 */
function ImageUtilities()
{
    var path;

    this.createBackgroundImage = function(callback)
    {
        var image = new Image();
        image.onload = function()
        {
            callback();
        };

        image.src = getPath() + "resources/images/pia13845.jpg";

        return image;
    }

    this.createExplosionImage = function(callback)
    {
        var image = new Image();
        image.onload = function()
        {
            callback();
        };

        image.src = getPath() + "resources/images/Explosion64.png";

        return image;
    }

    /**
     * @param bearing
     *            Bearing.
     * @param difficulty
     *            Difficulty.
     * 
     * @return a new image icon.
     */
    this.createManeuverIconSource = function(bearing, difficulty)
    {
        var bearingName = bearing.replace("L", "_l");
        bearingName = bearingName.replace("R", "_r");
        bearingName = bearingName.replace("kTurn", "koiogran_turn");
        var answer = getPath() + "resources/images/maneuver/"
                + bearingName + "_" + difficulty + "16.png";
        return answer;
    }

    /**
     * @param bearing
     *            Bearing.
     * @param difficulty
     *            Difficulty.
     * 
     * @return a new image icon.
     */
    this.createManeuverIconString = function(bearing, difficulty)
    {
        var bearingName = bearing.replace("L", "_l");
        bearingName = bearingName.replace("R", "_r");
        bearingName = bearingName.replace("kTurn", "koiogran_turn");
        var answer = "<img src='" + getPath() + "resources/images/maneuver/"
                + bearingName + "_" + difficulty + "16.png'/>";
        return answer;
    }

    this.createShipIcon = function(token, callback)
    {
        var image = new Image();
        image.id = token.getId();
        image.teamColor = this.getTeamColor(token);
        image.onload = function()
        {
            callback();
        };

        var filename = getShipFilename(token);
        image.src = getPath() + "resources/images/ship/" + filename;

        return image;
    }

    this.createTeamIconString = function(teamName)
    {
        var filename = teamName + "Icon24.png";
        var answer = "<img title='" + teamName + " Faction' src='" + getPath()
                + "resources/images/" + filename + "'/>";

        return answer;
    }

    this.getTeamColor = function(token)
    {
        var answer = "rgb(0, 255, 0)";

        if (token.getTeam() == Team.REBEL)
        {
            answer = "red";
        }

        return answer;
    }

    function getTokenString(title, path, width, count)
    {
        var answer;

        if (count == 1)
        {
            answer = getSingleTokenString(title, path);
        }
        else
        {
            answer = getCountTokenString(title, path, width, count);
        }

        return answer;
    }

    function getSingleTokenString(title, path)
    {
        var answer = "<img title='";
        answer += title;
        answer += "' src='";
        answer += path;
        answer += "'/>";

        return answer;
    }

    function getCountTokenString(title, path, width, count)
    {
        var answer = "<div title='";
        answer += title;
        answer += "' class='countTokenBox' style='width: ";
        answer += width;
        answer += "px; background-image: url(";
        answer += path;
        answer += ")'>";
        answer += "<p class='countTokenText'>";
        answer += count;
        answer += "</p>";
        answer += "</div>";

        return answer;
    }

    function getPath()
    {
        if (path == undefined)
        {
            path = createPath();
        }

        return path;
    }

    function createPath()
    {
        var answer = location.pathname;

        var key0 = "src/";

        var i = answer.lastIndexOf(key0);

        if (i < 0)
        {
            // Running as a web app.
            answer = answer.substring(0, i);
        }
        else
        {
            // Running locally.
            answer = answer.substring(0, i + key0.length) + "main/";
        }

        return answer;
    }

    function getShipFilename(token)
    {
        var shipTeam = token.getShipTeam();
        var filename = ShipTeam.properties[shipTeam].image;

        return filename;
    }
};
