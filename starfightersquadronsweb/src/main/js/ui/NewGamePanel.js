/*
 * Provides a user interface to gather new game information.
 */
function NewGamePanel(imageUtils, callback)
{
    InputValidator.validateNotNull("imageUtils", imageUtils);

    /*
     * Provides an agent panel.
     */
    function AgentPanel(team)
    {
        InputValidator.validateNotNull("team", team);

        var that = this;
        var teamName = Team.properties[team].name;

        this.getAgent = function()
        {
            var name = getName();
            var type = getType();
            var squadBuilder = getSquadBuilder();

            var answer;

            if (type === SimpleAgent)
            {
                answer = new SimpleAgent(name, team, squadBuilder);
            }
            else if (type === HumanAgent)
            {
                answer = new HumanAgent(name, team, squadBuilder, imageUtils);
            }

            return answer;
        }

        this.paintComponent = function()
        {
            var answer = "";

            answer += "<table class='agentPanel'>";
            answer += "<tr>";
            answer += "<td class='agentTitle' colspan='3'>";
            answer += teamName;
            answer += " Agent";
            answer += "</td>";
            answer += "</tr>";
            answer += "<tr>";
            answer += "<td>";
            answer += "Name:";
            answer += "</td>";
            answer += "<td>";
            answer += "<input type='text' id='";
            answer += createPrefix();
            answer += ".nameInput' value='";
            answer += teamName;
            answer += " Agent'";
            answer += "></input>";
            answer += "</td>";
            answer += "<td rowspan='2'>";
            answer += imageUtils.createTeamIconString(teamName);
            answer += "</td>";
            answer += "</tr>";
            answer += "<tr>";
            answer += "<td>";
            answer += "Type:";
            answer += "</td>";
            answer += "<td>";
            answer += createTypeSelector();
            answer += "</td>";
            answer += "</tr>";
            answer += "<tr>";
            answer += "<td>";
            answer += "Squad";
            answer += "</td>";
            answer += "<td colspan='2'>";
            answer += "&nbsp;";
            answer += "</td>";
            answer += "</tr>";
            answer += "<tr>";
            answer += "<td colspan='3'>";
            answer += createSquadBuilderPanel();
            answer += "</td>";
            answer += "</tr>";
            answer += "</table>";

            return answer;
        }

        function createPrefix()
        {
            return team;
        }

        function createTypeSelector()
        {
            var answer = "";

            answer += "<select id='";
            answer += createPrefix();
            answer += ".typeSelector'>";

            var types = getTypes();

            for (var i = 0; i < types.length; i++)
            {
                var type = types[i];
                var typeName = type === SimpleAgent ? "Simple Agent"
                        : "Human Agent";

                answer += "<option";
                answer += " value=";
                answer += i;
                if ((team === Team.IMPERIAL && type === SimpleAgent)
                        || (team === Team.REBEL && type === HumanAgent))
                {
                    answer += " selected";
                }
                answer += ">";
                answer += typeName;
                answer += "</option>";
            }

            answer += "</select>"

            return answer;
        }

        function createSquadBuilderPanel()
        {
            var squadBuilders = getSquadBuilders();

            var answer = "";

            answer += "<table id='";
            answer += createPrefix();
            answer += ".squadBuilderPanel' class='squadBuilderPanel'>";

            for (var i = 0; i < squadBuilders.length; i++)
            {
                var squadBuilder = squadBuilders[i];

                answer += "<tr>";
                answer += "<td>";
                answer += "<input type='radio' name='";
                answer += teamName;
                answer += "' value=";
                answer += i;
                if (i === 0)
                {
                    answer += " checked='true'";
                }
                answer += ">";
                answer += squadBuilder.getName();
                answer += " (";
                answer += squadBuilder.getDescription();
                answer += ")";
                answer += "</input>";
                answer += "</td>";
                answer += "</tr>";
            }

            answer += "</table>";

            return answer;
        }

        function getSquadBuilders()
        {
            return team === Team.IMPERIAL ? SquadBuilder.getImperial()
                    : SquadBuilder.getRebel();
        }

        function getTypes()
        {
            return [ SimpleAgent, HumanAgent ];
        }

        function getName()
        {
            // HTMLInputElement
            var element = document
                    .getElementById(createPrefix() + ".nameInput");

            return element.value;
        }

        function getType()
        {
            // HTMLSelectElement
            var element = document.getElementById(createPrefix()
                    + ".typeSelector");

            var types = getTypes();

            return types[element.value];
        }

        function getSquadBuilder()
        {
            // HTMLTableElement
            var element = document.getElementById(createPrefix()
                    + ".squadBuilderPanel");

            var answer;

            // Walk the table rows to find the selected element.
            var rows = element.rows;
            for (var i = 0; i < rows.length; i++)
            {
                // HTMLTableRowElement
                var row = rows[i];
                // HTMLTableCellElement
                var cell = row.cells[0];
                // HTMLInputElement
                var radio = cell.firstElementChild;
                if (radio.checked)
                {
                    var squadBuilders = getSquadBuilders();
                    answer = squadBuilders[radio.value];
                    break;
                }
            }

            return answer;
        }
    }

    // First agent widget.
    var firstAgentUI = new AgentPanel(Team.IMPERIAL);

    // Second agent widget.
    var secondAgentUI = new AgentPanel(Team.REBEL);

    this.okActionPerformed = function()
    {
        var answer = [ firstAgentUI.getAgent(), secondAgentUI.getAgent() ];

        callback(answer);
    }

    this.paintComponent = function()
    {
        var answer = "";

        answer += "<table class='newGamePanel'>";
        answer += "<tr>";
        answer += "<td colspan='3' class='newGameTitle'>";
        answer += "New Game";
        answer += "</td>";
        answer += "</tr>";
        answer += "<tr>";
        answer += "<td class='newGamePanel'>";
        answer += firstAgentUI.paintComponent();
        answer += "</td>";
        answer += "<td class='newGamePanel'>";
        answer += secondAgentUI.paintComponent();
        answer += "</td>";

        answer += "<td class='newGameOk'>";
        answer += "<button type='button' onclick='NewGamePanel.instance.okActionPerformed()'>OK</button>";
        answer += "</td>";

        answer += "</tr>";
        answer += "</table>";

        return answer;
    }

    NewGamePanel.instance = this;
}
