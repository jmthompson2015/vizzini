/*
 * @param round Round. (required)
 * @param phaseKey Phase key. (required)
 * @param activeQuestId Active quest ID. (required)
 * @param stagingAreaIds Staging area IDs. (required)
 * @param agents Agents. (required)
 *
 * @param activeLocation Active location. (optional)
 */
define(
        [ "game/ui/AgentUI", "game/ui/CardAreaUI", "game/ui/CardInstanceUI", "game/ui/Connector", "game/ui/StatusBarUI" ],
        function(AgentUI, CardAreaUI, CardInstanceUI, Connector, StatusBarUI)
        {
            "use strict";
            var EnvironmentUI = React.createClass(
            {
                render: function()
                {
                    InputValidator.validateNotNull("round", this.props.round);
                    InputValidator.validateNotNull("phaseKey", this.props.phaseKey);
                    InputValidator.validateNotNull("activeQuestId", this.props.activeQuestId);
                    InputValidator.validateNotNull("stagingAreaIds", this.props.stagingAreaIds);
                    InputValidator.validateNotNull("agents", this.props.agents);

                    var connector = ReactRedux.connect(Connector.StatusBarUI.mapStateToProps)(StatusBarUI);
                    var statusBarUI = React.createElement(connector);

                    connector = ReactRedux.connect(Connector.CardInstanceUI.mapStateToProps)(CardInstanceUI);
                    var activeQuestUI = React.createElement(connector,
                    {
                        label: "Active Quest",
                        cardInstanceId: this.props.activeQuestId,
                    });
                    var activeLocationUI = React.createElement(connector,
                    {
                        label: "Active Location",
                        cardInstanceId: this.props.activeLocationId,
                    });

                    connector = ReactRedux.connect(Connector.CardAreaUI.mapStateToProps)(CardAreaUI);
                    var stagingAreaUI = React.createElement(connector,
                    {
                        label: "Staging Area",
                        cardInstanceIds: this.props.stagingAreaIds,
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
                    connector = ReactRedux.connect(Connector.AgentUI.mapStateToProps)(AgentUI);
                    this.props.agents.forEach(function(agent)
                    {
                        var element = React.createElement(connector,
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
