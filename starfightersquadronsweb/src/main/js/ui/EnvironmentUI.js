define([ "Engine", "Environment", "Phase", "ui/PilotsUI", "ui/PlayAreaUI", "ui/PlayState", "ui/SSPanel" ], function(
        Engine, Environment, Phase, PilotsUI, PlayAreaUI, PlayState, SSPanel)
{
    function EnvironmentUI(engine, environment)
    {
        var ssPanel = new SSPanel(environment);
        var playAreaUI = new PlayAreaUI(environment);
        var firstTokens = environment.getTokensForTeam(environment.getFirstTeam());
        var element = React.createElement(PilotsUI,
        {
            initialTokens: firstTokens
        });
        var firstPilots = React.render(element, document.getElementById("firstPilots"));
        var secondTokens = environment.getTokensForTeam(environment.getSecondTeam());
        var element = React.createElement(PilotsUI,
        {
            initialTokens: secondTokens
        });
        var secondPilots = React.render(element, document.getElementById("secondPilots"));
        var scale = 1.0;
        var previousPlayState;

        environment.bind(Environment.PHASE_EVENT, function(phase)
        {
            var round = environment.getRound();
            var activeToken = environment.getActiveToken();
            var tokenPositions = PlayState.createTokenPositions(environment);

            switch (phase)
            {
            case Phase.ACTIVATION_EXECUTE_MANEUVER:
                // Draw maneuver.
                var maneuverAction = activeToken.getManeuverAction();
                var playState = new PlayState(round, phase, activeToken, tokenPositions, maneuverAction);
                repaint(playState);
                break;
            case Phase.ACTIVATION_END:
                // End of Activation Phase: clear maneuver widgets.
                var playState = new PlayState(round, phase, activeToken, tokenPositions);
                repaint(playState);
                break;
            case Phase.COMBAT_DEAL_DAMAGE:
                // Draw laser beam.
                var combatAction = activeToken.getCombatAction();
                var playState = PlayState.createCombat(round, phase, activeToken, tokenPositions, combatAction);
                repaint(playState);
                break;
            case Phase.COMBAT_END:
                // End of Combat Phase: clear laser beam and explosion widgets.
                var playState = new PlayState(round, phase, activeToken, tokenPositions);
                repaint(playState);
                break;
            }
        });

        environment.bind(Environment.SHIP_DESTROYED_EVENT, function(shipDestroyedAction)
        {
            var round = environment.getRound();
            var phase = environment.getPhase();
            var activeToken = environment.getActiveToken();
            var tokenPositions = PlayState.createTokenPositions(environment);
            var playState = PlayState.createShipDestroyed(round, phase, activeToken, tokenPositions,
                    shipDestroyedAction);
            repaint(playState);
        });

        environment.bind(Environment.SHIP_FLED_EVENT, function(shipFledAction)
        {
            var round = environment.getRound();
            var phase = environment.getPhase();
            var activeToken = environment.getActiveToken();
            var tokenPositions = PlayState.createTokenPositions(environment);
            var playState = PlayState.createShipFled(round, phase, activeToken, tokenPositions, shipFledAction);
            repaint(playState);
        });

        environment.bind(Environment.UPDATE_TRIGGER_EVENT, function()
        {
            var round = environment.getRound();
            var phase = environment.getPhase();
            var activeToken = environment.getActiveToken();
            var tokenPositions = PlayState.createTokenPositions(environment);
            var playState = new PlayState(round, phase, activeToken, tokenPositions);
            repaint(playState);
        });

        engine.bind(Engine.WINNER_EVENT, function(winner)
        {
            var round = environment.getRound();
            var phase = environment.getPhase();
            var activeToken = environment.getActiveToken();
            var tokenPositions = PlayState.createTokenPositions(environment);
            var playState = PlayState.createWinner(round, phase, activeToken, tokenPositions, winner);
            repaint(playState);
        });

        this.setScale = function(value)
        {
            scale = value;

            if (previousPlayState && previousPlayState.getManeuverAction())
            {
                repaint(previousPlayState);
            }
            else
            {
                var phase = environment.getPhase();
                var round = environment.getRound();
                var activeToken = environment.getActiveToken();
                var tokenPositions = PlayState.createTokenPositions(environment);
                var playState = new PlayState(round, phase, activeToken, tokenPositions);
                repaint(playState);
            }
        }

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
                var shipFledAction = playState.getShipFledAction();
                var shipDestroyedAction = playState.getShipDestroyedAction();
                var combatAction = playState.getCombatAction();
                var winner = playState.getWinner();

                if (shipFledAction)
                {
                    var token = shipFledAction.token();
                    message = "Ship fled the battlefield: " + token;
                    firstPilots.setState(
                    {
                        tokens: environment.getTokensForTeam(environment.getFirstTeam()),
                    });
                    secondPilots.setState(
                    {
                        tokens: environment.getTokensForTeam(environment.getSecondTeam()),
                    });
                }
                else if (shipDestroyedAction)
                {
                    var token = shipDestroyedAction.token();
                    message = "Ship destroyed: " + token;
                    firstPilots.setState(
                    {
                        tokens: environment.getTokensForTeam(environment.getFirstTeam()),
                    });
                    secondPilots.setState(
                    {
                        tokens: environment.getTokensForTeam(environment.getSecondTeam()),
                    });
                }
                else if (combatAction)
                {
                    var attacker = combatAction.getAttacker();
                    var defender = combatAction.getDefender();
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
                        message = winner.getName() + " won! ";
                    }
                }
            }

            ssPanel.paintComponent(playState);
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
