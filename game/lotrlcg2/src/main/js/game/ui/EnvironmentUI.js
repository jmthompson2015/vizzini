/*
 * @param round Round. (required)
 * @param phaseKey Phase key. (required)
 * @param firstAgentId First agent ID. (required)
 * @param activeQuest Active quest. (required)
 * @param stagingArea Staging area. (required)
 * @param agents Agents. (required)
 * 
 * @param activeAgentId Active agent ID. (optional)
 * @param activeLocation Active location. (optional)
 */
define([ "game/Selector", "game/ui/AgentUI", "game/ui/CardAreaUI", "game/ui/CardInstanceUI", "game/ui/StatusBarUI" ],
        function(Selector, AgentUI, CardAreaUI, CardInstanceUI, StatusBarUI)
        {
            "use strict";
            var EnvironmentUI = React.createClass(
            {
                render: function()
                {
                    InputValidator.validateNotNull("round", this.props.round);
                    InputValidator.validateNotNull("phaseKey", this.props.phaseKey);
                    InputValidator.validateNotNull("firstAgentId", this.props.firstAgentId);
                    InputValidator.validateNotNull("activeQuest", this.props.activeQuest);
                    InputValidator.validateNotNull("stagingArea", this.props.stagingArea);
                    InputValidator.validateNotNull("agents", this.props.agents);

                    var activeQuest = this.props.activeQuest;
                    var scenarioName = activeQuest.card.encounterSet.name;
                    var agents = this.props.agents;
                    var firstAgent = Selector.findById(agents, this.props.firstAgentId);
                    InputValidator.validateNotNull("firstAgent", firstAgent);
                    var activeAgent = Selector.findById(agents, this.props.activeAgentId);

                    var statusBarUI = React.createElement(StatusBarUI,
                    {
                        scenarioName: scenarioName,
                        round: this.props.round,
                        phaseKey: this.props.phaseKey,
                        firstAgentName: firstAgent.name,
                        activeAgentName: (activeAgent ? activeAgent.name : undefined),
                    });
                    var activeQuestUI = React.createElement(CardInstanceUI,
                    {
                        label: "Active Quest",
                        cardInstance: this.props.activeQuest,
                    });
                    var activeLocationUI = React.createElement(CardInstanceUI,
                    {
                        label: "Active Location",
                        cardInstance: this.props.activeLocation,
                    });
                    var stagingAreaUI = React.createElement(CardAreaUI,
                    {
                        label: "Staging Area",
                        area: this.props.stagingArea,
                    });

                    var rows = [];
                    rows.push(React.DOM.tr({}, React.DOM.td({}, statusBarUI)));

                    var cells = [];
                    cells.push(React.DOM.td(
                    {
                        className: "questPanel",
                    }, activeQuestUI));
                    cells.push(React.DOM.td(
                    {
                        className: "locationPanel",
                    }, activeLocationUI));
                    cells.push(React.DOM.td(
                    {
                        className: "stagingAreaPanel"
                    }, stagingAreaUI));
                    var topTable = React.DOM.table(
                    {
                        className: "environmentUITopTable",
                    }, React.DOM.tr({}, cells));
                    rows.push(React.DOM.tr({}, React.DOM.td({}, topTable)));

                    cells = [];
                    agents.forEach(function(agent)
                    {
                        var element = React.createElement(AgentUI,
                        {
                            agent: agent,
                        });
                        cells.push(React.DOM.td({}, element));
                    });
                    var agentTable = React.DOM.table(
                    {
                        className: "agentPanel",
                    }, React.DOM.tr({}, cells));
                    rows.push(React.DOM.tr({}, React.DOM.td({}, agentTable)));

                    return React.DOM.table(
                    {
                        className: "environmentUI",
                    }, rows);
                },
            });

            return EnvironmentUI;
        });
