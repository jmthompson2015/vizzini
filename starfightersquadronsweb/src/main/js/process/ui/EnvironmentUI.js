define(["process/ui/Connector", "process/ui/MessageAreaUI", "process/ui/PlayAreaUI", "process/ui/StatusBarUI", "process/ui/PilotsUI"],
    function(Connector, MessageAreaUI, PlayAreaUI, StatusBarUI, PilotsUI)
    {
        "use strict";
        var EnvironmentUI = React.createClass(
        {
            render: function()
            {
                InputValidator.validateNotNull("engine", this.props.engine);
                InputValidator.validateNotNull("environment", this.props.environment);

                var engine = this.props.engine;
                var environment = this.props.environment;

                // Status bar.
                var connector0 = ReactRedux.connect(Connector.StatusBarUI.mapStateToProps)(StatusBarUI);
                var statusBarElement = React.createElement(connector0,
                {
                    environment: environment,
                });

                // First pilots.
                var connector1 = ReactRedux.connect(Connector.PilotsUI.mapStateToProps)(PilotsUI);
                var firstPilotsElement = React.createElement(connector1,
                {
                    environment: environment,
                    team: environment.firstTeam(),
                });

                // Play area.
                var connector2 = ReactRedux.connect(Connector.PlayAreaUI.mapStateToProps)(PlayAreaUI);
                var playAreaElement = React.createElement(connector2,
                {
                    environment: environment,
                });

                // Second pilots.
                var secondPilotsElement = React.createElement(connector1,
                {
                    environment: environment,
                    team: environment.secondTeam(),
                });

                // Message area.
                var connector3 = ReactRedux.connect(Connector.MessageAreaUI.mapStateToProps)(MessageAreaUI);
                var messageAreaElement = React.createElement(connector3,
                {});

                var rows = [];
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {
                    colSpan: 3,
                }, statusBarElement)));

                var cells = [];
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                    id: "firstPilots",
                    rowSpan: 2,
                }, firstPilotsElement));
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                    id: "playArea",
                }, playAreaElement));
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                    id: "secondPilots",
                    rowSpan: 2,
                }, secondPilotsElement));
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, cells));

                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {
                    id: "messageArea",
                }, messageAreaElement)));

                return React.DOM.table(
                {}, React.DOM.tbody(
                {}, rows));
            },
        });

        return EnvironmentUI;
    });
