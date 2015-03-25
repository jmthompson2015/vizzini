/**
 * Provides a user interface to create the planning action.
 */
function PlanningPanel(environmentIn, adjudicatorIn, agentIn, tokensIn,
        imageUtilsIn, callbackIn)
{
    var environment = environmentIn;
    var adjudicator = adjudicatorIn;
    var agent = agentIn;
    var tokens = tokensIn;
    var imageUtils = imageUtilsIn;
    var callback = callbackIn;

    var maneuverChoosers = [];

    this.maneuverClick = function(tokenId, maneuver)
    {
        LOGGER.trace("PlanningPanel.maneuverClick() for token " + tokenId
                + " selected maneuver = " + maneuver);
        var token = findToken(tokenId);
        var maneuverChooser = findManeuverChooser(token);
        maneuverChooser.setSelectedManeuver(maneuver);
    }

    this.okActionPerformed = function()
    {
        LOGGER.trace("PlanningPanel.okActionPerformed() start");

        var tokenToManeuver = {};

        for (var i = 0; i < maneuverChoosers.length; i++)
        {
            var chooser = maneuverChoosers[i];
            var token = chooser.getToken();
            var maneuver = chooser.getSelectedManeuver();
            tokenToManeuver[token] = maneuver;
        }

        var answer = new PlanningAction(environment, agent, tokenToManeuver);

        LOGGER.trace("PlanningPanel.okActionPerformed() end");
        callback(answer);
    }

    this.paintComponent = function()
    {
        LOGGER.trace("PlanningPanel.paintComponent() start");

        var answer = "";

        answer += "Planning: Select Maneuvers<br/>";
        answer += "<table id='planningTable'><tr>";

        for (var i = 0; i < tokens.length; i++)
        {
            var token = tokens[i];
            var maneuverChooser = findManeuverChooser(token);

            if (!maneuverChooser)
            {
                // Create it.
                maneuverChooser = new ManeuverChooser(token, imageUtils);
                maneuverChoosers[maneuverChoosers.length] = maneuverChooser;
            }

            answer += "<td class='planningTableCell'>";
            answer += maneuverChooser.paintComponent();
            answer += "</td>";
        }

        answer += "<td class='planningOk'>";
        answer += "<button type='button' onclick='PlanningPanel.instance.okActionPerformed()'>OK</button>";
        answer += "</td>";
        answer += "</tr></table>";

        LOGGER.trace("PlanningPanel.paintComponent() end");

        return answer;
    }

    function findToken(tokenId)
    {
        var answer;

        for (var i = 0; i < tokens.length; i++)
        {
            var token = tokens[i];

            if (token.getId() == tokenId)
            {
                answer = token;
                break;
            }
        }

        // LOGGER.info("PlanningPanel.findToken(" + tokenId + ") answer = " +
        // answer);
        return answer;
    }

    function findManeuverChooser(token)
    {
        var answer;

        for (var i = 0; i < maneuverChoosers.length; i++)
        {
            var chooser = maneuverChoosers[i];

            if (chooser.getToken() === token)
            {
                answer = chooser;
                break;
            }
        }

        // LOGGER.info("PlanningPanel.findManeuverChooser(" + token + ") answer
        // = " + answer);
        return answer;
    }

    PlanningPanel.instance = this;
}
