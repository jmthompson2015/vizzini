/*
 * Provides a user interface for an environment for Starfighter Squadrons.
 */
function EnvironmentUI(engine, environment)
{
    var imageUtils = new ImageUtilities();
    var ssPanel = new SSPanel(environment);
    var playAreaUI = new PlayAreaUI(environment, imageUtils);
    var imperialTokens = environment.getTokensForTeam(Team.IMPERIAL);
    var element = React.createElement(PilotsUI,
    {
        initialTokens: imperialTokens
    });
    var imperialPilots = React.render(element, document
            .getElementById("imperialPilots"));
    var rebelTokens = environment.getTokensForTeam(Team.REBEL);
    var element = React.createElement(PilotsUI,
    {
        initialTokens: rebelTokens
    });
    var rebelPilots = React.render(element, document
            .getElementById("rebelPilots"));
    var scale = 1.0;

    environment.addPhaseListener(this);
    environment.addShipDestroyedListener(this);
    environment.addShipFledListener(this);
    environment.addUpdateTriggerListener(this);

    engine.addWinnerListener(this);

    this.phaseChange = function(source, oldValue, newValue)
    {
        var phase = newValue;
        var myEnvironment = source;
        var round = myEnvironment.getRound();
        var activeToken = myEnvironment.getActiveToken();
        var tokenPositions = PlayState.createTokenPositions(myEnvironment);

        switch (phase)
        {
        case Phase.ACTIVATION_EXECUTE_MANEUVER:
            // Draw maneuver.
            var maneuverAction = activeToken.getManeuverAction();
            var playState = new PlayState(round, phase, activeToken,
                    tokenPositions, maneuverAction);
            repaint(playState);
            break;
        case Phase.ACTIVATION_END:
            // End of Activation Phase: clear maneuver widgets.
            var playState = new PlayState(round, phase, activeToken,
                    tokenPositions);
            repaint(playState);
            break;
        case Phase.COMBAT_DEAL_DAMAGE:
            // Draw laser beam.
            var combatAction = activeToken.getCombatAction();
            var playState = PlayState.createCombat(round, phase, activeToken,
                    tokenPositions, combatAction);
            repaint(playState);
            break;
        case Phase.COMBAT_END:
            // End of Combat Phase: clear laser beam and explosion widgets.
            var playState = new PlayState(round, phase, activeToken,
                    tokenPositions);
            repaint(playState);
            break;
        }
    }

    this.setScale = function(value)
    {
        scale = value;

        var phase = environment.getPhase();
        var round = environment.getRound();
        var activeToken = environment.getActiveToken();
        var tokenPositions = PlayState.createTokenPositions(environment);
        var playState = new PlayState(round, phase, activeToken, tokenPositions);
        repaint(playState);
    }

    this.shipDestroyed = function(source, shipDestroyedAction)
    {
        var myEnvironment = source;
        var round = myEnvironment.getRound();
        var phase = myEnvironment.getPhase();
        var activeToken = myEnvironment.getActiveToken();
        var tokenPositions = PlayState.createTokenPositions(myEnvironment);
        var playState = PlayState.createShipDestroyed(round, phase,
                activeToken, tokenPositions, shipDestroyedAction);
        repaint(playState);
    }

    this.shipFled = function(source, shipFledAction)
    {
        var myEnvironment = source;
        var round = myEnvironment.getRound();
        var phase = myEnvironment.getPhase();
        var activeToken = myEnvironment.getActiveToken();
        var tokenPositions = PlayState.createTokenPositions(myEnvironment);
        var playState = PlayState.createShipFled(round, phase, activeToken,
                tokenPositions, shipFledAction);
        repaint(playState);
    }

    this.updateTrigger = function(source)
    {
        var myEnvironment = source;
        var round = myEnvironment.getRound();
        var phase = myEnvironment.getPhase();
        var activeToken = myEnvironment.getActiveToken();
        var tokenPositions = PlayState.createTokenPositions(myEnvironment);
        var playState = new PlayState(round, phase, activeToken, tokenPositions);
        repaint(playState);
    }

    this.winnerChange = function(source, winner)
    {
        var myEnvironment = source.getEnvironment();
        var round = myEnvironment.getRound();
        var phase = myEnvironment.getPhase();
        var activeToken = myEnvironment.getActiveToken();
        var tokenPositions = PlayState.createTokenPositions(myEnvironment);
        var playState = PlayState.createWinner(round, phase, activeToken,
                tokenPositions, winner);
        repaint(playState);
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
                var token = shipFledAction.getToken();
                message = "Ship fled the battlefield: " + token;
                imperialPilots.setState(
                {
                    tokens: environment.getTokensForTeam(Team.IMPERIAL)
                });
                rebelPilots.setState(
                {
                    tokens: environment.getTokensForTeam(Team.REBEL)
                });
            }
            else if (shipDestroyedAction)
            {
                var token = shipDestroyedAction.getToken();
                message = "Ship destroyed: " + token;
                imperialPilots.setState(
                {
                    tokens: environment.getTokensForTeam(Team.IMPERIAL)
                });
                rebelPilots.setState(
                {
                    tokens: environment.getTokensForTeam(Team.REBEL)
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

        LOGGER.trace("EnvironmentUI.repaint() end");
    }

    function showMessage(message)
    {
        var messageArea = document.getElementById("messageArea");

        if (message)
        {
            messageArea.innerHTML = message;
            HtmlUtilities.removeClass(messageArea, "hidden");
        }
        else
        {
            messageArea.innerHTML = "";
            HtmlUtilities.addClass(messageArea, "hidden");
        }
    }
}
