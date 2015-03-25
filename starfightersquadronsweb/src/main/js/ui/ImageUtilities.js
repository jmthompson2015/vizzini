/*
 * Provides utilities for working with images.
 */
function ImageUtilities()
{
    var path;

    this.createAgilityIconString = function()
    {
        var answer = "<img src='" + getPath()
                + "resources/images/pilotCard/AgilityIcon24.jpg'/>";
        return answer;
    }

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

    this.createCloakTokenString = function(count)
    {
        var path = getPath() + "resources/images/token/CloakToken32.png";

        return getTokenString("Cloak", path, 36, count);
    }

    this.createCriticalDamageIconString = function()
    {
        var answer = "<img src='" + getPath()
                + "resources/images/pilotCard/CriticalHit24.jpg'/>";
        return answer;
    }

    this.createDamageIconString = function()
    {
        var answer = "<img src='" + getPath()
                + "resources/images/pilotCard/Hit24.jpg'/>";
        return answer;
    }

    this.createEvadeTokenString = function(count)
    {
        var path = getPath() + "resources/images/token/EvadeToken32.png";

        return getTokenString("Evade", path, 32, count);
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

    this.createFocusTokenString = function(count)
    {
        var path = getPath() + "resources/images/token/FocusToken32.png";

        return getTokenString("Focus", path, 32, count);
    }

    this.createHullIconString = function()
    {
        var answer = "<img src='" + getPath()
                + "resources/images/pilotCard/HullIcon24.jpg'/>";
        return answer;
    }

    this.createIonTokenString = function(count)
    {
        var path = getPath() + "resources/images/token/IonToken32.png";

        return getTokenString("Ion", path, 32, count);
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

    this.createShieldIconString = function()
    {
        var answer = "<img src='" + getPath()
                + "resources/images/pilotCard/ShieldIcon24.jpg'/>";
        return answer;
    }

    this.createShieldTokenString = function(count)
    {
        var path = getPath() + "resources/images/token/ShieldToken32.png"

        return getTokenString("Shield", path, 32, count);
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

    this.createStressTokenString = function(count)
    {
        var path = getPath() + "resources/images/token/StressToken32.png";

        return getTokenString("Stress", path, 32, count);
    }

    this.createTeamIconString = function(teamName)
    {
        var filename = teamName + "Icon24.png";
        var answer = "<img title='" + teamName + " Faction' src='" + getPath()
                + "resources/images/" + filename + "'/>";

        return answer;
    }

    this.createWeaponIconString = function()
    {
        var answer = "<img src='" + getPath()
                + "resources/images/pilotCard/WeaponIcon24.jpg'/>";
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
        var filename = token.getShipName() + ".png";
        filename = filename.replace(" ", "_");

        return filename;
    }
};
