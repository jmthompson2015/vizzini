/*
 * Provides a pilots user interface for Starfighter Squadrons.
 */
function PilotsUI(team, imageUtils)
{
    var tokenUIs = [];

    this.paintComponent = function(playState)
    {
        var tokens = createTokensArray(playState);

        if (tokenUIs.length == 0)
        {
            setTokens(tokens);
        }
        else
        {
            if (tokenUIs.length > tokens.length)
            {
                for (var i = 0; i < tokenUIs.length; i++)
                {
                    var tokenUI = tokenUIs[i];
                    var token = tokenUI.getToken();

                    if (!ArrayUtilities.contains(tokens, token))
                    {
                        var componentId = "token" + token.getId()
                                + ".pilotCard";
                        var component = document.getElementById(componentId);
                        component.innerHTML = "";

                        // Remove it.
                        tokenUIs.splice(i, 1);
                    }
                }
            }

            for (var i = 0; i < tokenUIs.length; i++)
            {
                var tokenUI = tokenUIs[i];
                tokenUI.updateComponent();
            }
        }
    }

    function createTokensArray(playState)
    {
        var tokens = [];

        if (playState)
        {
            var tokenPositions = playState.getTokenPositions();

            for (var i = 0; i < tokenPositions.length; i++)
            {
                var tokenPosition = tokenPositions[i];
                var token = tokenPosition.token;

                if (token.getTeam() === team)
                {
                    tokens[tokens.length] = token;
                }
            }
        }

        return tokens;
    }

    /*
     * @param tokens Tokens.
     */
    function setTokens(tokens)
    {
        var sb = "";

        sb += "<table>";

        for (var i = 0; i < tokens.length; i++)
        {
            sb += "<tr>";
            sb += "<td>";
            var token = tokens[i];
            var tokenUI = new PilotCardUI(token, imageUtils);
            tokenUIs[tokenUIs.length] = tokenUI;
            sb += tokenUI.paintComponent();
            sb += "</td>";
            sb += "</tr>";
        }

        sb += "</table>";

        var componentId = Team.properties[team].name.toLowerCase() + "Pilots";
        var component = document.getElementById(componentId);
        component.innerHTML = sb;
    }
}
