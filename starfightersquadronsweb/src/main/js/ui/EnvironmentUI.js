define([ "Engine", "Environment", "Phase", "process/ui/Connector", "process/ui/StatusBarUI", "ui/PilotsUI",
        "ui/PlayAreaUI", "ui/PlayState" ], function(Engine, Environment, Phase, Connector, StatusBarUI, PilotsUI,
        PlayAreaUI, PlayState)
{
    "use strict";
    function EnvironmentUI(engine, environment)
    {
        InputValidator.validateNotNull("engine", engine);
        InputValidator.validateNotNull("environment", environment);

        this.engine = function()
        {
            return engine;
        };

        this.environment = function()
        {
            return environment;
        };

        var connector0 = ReactRedux.connect(Connector.StatusBarUI.mapStateToProps)(StatusBarUI);
        var statusBarElement = React.createElement(ReactRedux.Provider,
        {
            store: environment.store(),
        }, React.createElement(connector0,
        {
            environment: environment,
        }));
        var statusBarUI = ReactDOM.render(statusBarElement, document.getElementById("statusBar"));
        var playAreaUI = new PlayAreaUI(environment);
        var firstTokens = environment.getTokensForTeam(environment.firstTeam());
        var element = React.createElement(PilotsUI,
        {
            initialTokens: firstTokens
        });
        var firstPilots = ReactDOM.render(element, document.getElementById("firstPilots"));
        var secondTokens = environment.getTokensForTeam(environment.secondTeam());
        element = React.createElement(PilotsUI,
        {
            initialTokens: secondTokens
        });
        var secondPilots = ReactDOM.render(element, document.getElementById("secondPilots"));
        var scale = 1.0;
        var previousPlayState;

        environment.bind(Environment.PHASE_EVENT, function(phase)
        {
            var round = environment.round();
            var activeToken = environment.activeToken();
            var tokenPositions = PlayState.createTokenPositions(environment);
            var playState;

            switch (phase)
            {
            case Phase.ACTIVATION_EXECUTE_MANEUVER:
                // Draw maneuver.
                var maneuverAction = activeToken.activationState().maneuverAction();
                playState = new PlayState(round, phase, activeToken, tokenPositions, maneuverAction);
                repaint(playState);
                break;
            case Phase.ACTIVATION_END:
                // End of Activation Phase: clear maneuver widgets.
                playState = new PlayState(round, phase, activeToken, tokenPositions);
                repaint(playState);
                break;
            case Phase.COMBAT_DEAL_DAMAGE:
                // Draw laser beam.
                var combatAction = activeToken.combatState().combatAction();
                playState = PlayState.createCombat(round, phase, activeToken, tokenPositions, combatAction);
                repaint(playState);
                break;
            case Phase.COMBAT_END:
                // End of Combat Phase: clear laser beam and explosion widgets.
                playState = new PlayState(round, phase, activeToken, tokenPositions);
                repaint(playState);
                break;
            }
        });

        environment.bind(Environment.SHIP_DESTROYED_EVENT, function(shipDestroyedAction)
        {
            var round = environment.round();
            var phase = environment.phase();
            var activeToken = environment.activeToken();
            var tokenPositions = PlayState.createTokenPositions(environment);
            var playState = PlayState.createShipDestroyed(round, phase, activeToken, tokenPositions,
                    shipDestroyedAction);
            repaint(playState);
        });

        environment.bind(Environment.SHIP_FLED_EVENT, function(shipFledAction)
        {
            var round = environment.round();
            var phase = environment.phase();
            var activeToken = environment.activeToken();
            var tokenPositions = PlayState.createTokenPositions(environment);
            var playState = PlayState.createShipFled(round, phase, activeToken, tokenPositions, shipFledAction);
            repaint(playState);
        });

        environment.bind(Environment.UPDATE_TRIGGER_EVENT, function()
        {
            var round = environment.round();
            var phase = environment.phase();
            var activeToken = environment.activeToken();
            var tokenPositions = PlayState.createTokenPositions(environment);
            var playState = new PlayState(round, phase, activeToken, tokenPositions);
            repaint(playState);
        });

        engine.bind(Engine.WINNER_EVENT, function(winner)
        {
            var round = environment.round();
            var phase = environment.phase();
            var activeToken = environment.activeToken();
            var tokenPositions = PlayState.createTokenPositions(environment);
            var playState = PlayState.createWinner(round, phase, activeToken, tokenPositions, winner);
            repaint(playState);
        });

        this.setScale = function(value)
        {
            scale = value;

            if (previousPlayState && previousPlayState.maneuverAction())
            {
                repaint(previousPlayState);
            }
            else
            {
                var phase = environment.phase();
                var round = environment.round();
                var activeToken = environment.activeToken();
                var tokenPositions = PlayState.createTokenPositions(environment);
                var playState = new PlayState(round, phase, activeToken, tokenPositions);
                repaint(playState);
            }
        };

        function repaint(playState)
        {
            LOGGER.trace("EnvironmentUI.repaint() start");

            var canvas = document.getElementById("playAreaCanvas");
            var context = canvas.getContext("2d");
            context.save();
            context.scale(scale, scale);

            var message;
            var input;

            if (playState)
            {
                var shipFledAction = playState.shipFledAction();
                var shipDestroyedAction = playState.shipDestroyedAction();
                var combatAction = playState.combatAction();
                var winner = playState.winner();
                var token;

                if (shipFledAction)
                {
                    token = shipFledAction.token();
                    message = "Ship fled the battlefield: " + token;
                    firstPilots.setState(
                    {
                        tokens: environment.getTokensForTeam(environment.firstTeam()),
                    });
                    secondPilots.setState(
                    {
                        tokens: environment.getTokensForTeam(environment.secondTeam()),
                    });
                }
                else if (shipDestroyedAction)
                {
                    token = shipDestroyedAction.token();
                    message = "Ship destroyed: " + token;
                    firstPilots.setState(
                    {
                        tokens: environment.getTokensForTeam(environment.firstTeam()),
                    });
                    secondPilots.setState(
                    {
                        tokens: environment.getTokensForTeam(environment.secondTeam()),
                    });
                }
                else if (combatAction)
                {
                    var attacker = combatAction.attacker();
                    var defender = combatAction.defender();
                    message = attacker + " fires upon " + defender;
                }
                else if (winner)
                {
                    if (winner === "")
                    {
                        message = "Game is a draw.";
                    }
                    else
                    {
                        message = winner.name() + " won! ";
                    }
                }
            }

            playAreaUI.paintComponent(context, playState);

            context.restore();

            showMessage(message);

            previousPlayState = playState;

            LOGGER.trace("EnvironmentUI.repaint() end");
        }

        function showMessage(message)
        {
            var messageArea = document.getElementById("messageArea");

            if (message)
            {
                messageArea.innerHTML = message;
            }
            else
            {
                messageArea.innerHTML = "";
            }
        }
    }

    return EnvironmentUI;
});
