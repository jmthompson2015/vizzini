define([ "Environment", "Phase", "ui/PlayState" ], function(Environment, Phase, PlayState)
{
    "use strict";
    function SSPanel(environment)
    {
        var that = this;

        environment.bind(Environment.ROUND_EVENT, function(round)
        {
            updateFromEnvironment();
        });

        environment.bind(Environment.PHASE_EVENT, function(phase)
        {
            updateFromEnvironment();
        });

        environment.bind(Environment.ACTIVE_TOKEN_EVENT, function(activeToken)
        {
            updateFromEnvironment();
        });

        // TODO: convert to React
        this.paintComponent = function(playState)
        {
            LOGGER.trace("SSPanel.paintComponent() start");

            var answer = "";

            if (playState)
            {
                var round = playState.round();
                var phase = playState.phase();
                var activeToken = playState.activeToken();
                LOGGER.trace("round = " + round + " phase = " + phase + " activeToken = " + activeToken);

                answer += "Round: ";
                answer += round;

                if (phase)
                {
                    answer += " Phase: ";
                    answer += Phase.properties[phase].name;
                }

                if (activeToken)
                {
                    answer += " Active Ship: ";
                    answer += activeToken.name();
                }
            }

            var component = document.getElementById("ssPanel");
            component.innerHTML = answer;

            LOGGER.trace("SSPanel.paintComponent() end");
        };

        function updateFromEnvironment()
        {
            var round = environment.round();
            var phase = environment.phase();
            var activeToken = environment.activeToken();

            var playState = new PlayState(round, phase, activeToken);
            that.paintComponent(playState);
        }
    }

    return SSPanel;
});
