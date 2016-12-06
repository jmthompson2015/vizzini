/*
 * Provides pilot abilities for the Activation Phase.
 */
define(["Bearing", "Maneuver", "Phase", "Pilot", "UpgradeCard", "process/Selector"],
    function(Bearing, Maneuver, Phase, Pilot, UpgradeCard, Selector)
    {
        "use strict";
        var PilotAbility2 = {};

        ////////////////////////////////////////////////////////////////////////
        PilotAbility2[Phase.ACTIVATION_REVEAL_DIAL] = {};

        PilotAbility2[Phase.ACTIVATION_REVEAL_DIAL][Pilot.COUNTESS_RYAD] = {
            // When you reveal a Straight maneuver, you may treat it as a K-Turn maneuver.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                var maneuver = getManeuver(activeToken);
                return token === activeToken && maneuver.bearingKey === Bearing.STRAIGHT;
            },
            consequent: function(store, token)
            {
                var oldManeuver = getManeuver(token);
                var newManeuverKey = Maneuver.find(Bearing.KOIOGRAN_TURN, oldManeuver.speed, oldManeuver.difficultyKey);
                if (newManeuverKey === undefined)
                {
                    throw "Can't find K-Turn maneuver for oldManeuver = " + oldManeuver.bearingKey + " " + oldManeuver.speed + " " + oldManeuver.difficultyKey;
                }
                token.activationState().activationAction().maneuverKey(newManeuverKey);
            },
        };

        PilotAbility2[Phase.ACTIVATION_REVEAL_DIAL][UpgradeCard.BOBA_FETT_IMPERIAL] = {
            // When you reveal a bank maneuver, you may rotate your dial to the other bank maneuver of the same speed.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                var maneuver = getManeuver(activeToken);
                return token === activeToken && [Bearing.BANK_LEFT, Bearing.BANK_RIGHT].vizziniContains(maneuver.bearingKey);
            },
            consequent: function(store, token)
            {
                var environment = store.getState().environment;
                var oldManeuver = getManeuver(token);
                var newBearingKey;
                switch (oldManeuver.bearingKey)
                {
                    case Bearing.BANK_LEFT:
                        newBearingKey = Bearing.BANK_RIGHT;
                        break;
                    case Bearing.BANK_RIGHT:
                        newBearingKey = Bearing.BANK_LEFT;
                        break;
                }
                var newManeuverKey = findManeuverByBearingSpeed(token, newBearingKey, oldManeuver.speed);
                token.activationState().activationAction().maneuverKey(newManeuverKey);
            },
        };

        ////////////////////////////////////////////////////////////////////////
        function findManeuverByBearingSpeed(token, bearing, speed)
        {
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("bearing", bearing);
            InputValidator.validateNotNull("speed", speed);

            var answer;
            var maneuverKeys = token.pilot().shipTeam.ship.maneuverKeys;

            for (var i = 0; i < maneuverKeys.length; i++)
            {
                var maneuverKey = maneuverKeys[i];
                var maneuver = Maneuver.properties[maneuverKey];

                if (maneuver.bearingKey === bearing && maneuver.speed === speed)
                {
                    answer = maneuverKey;
                    break;
                }
            }

            return answer;
        }

        function getActivationAction(token)
        {
            InputValidator.validateNotNull("token", token);

            return token.activationState().activationAction();
        }

        function getActiveToken(store)
        {
            InputValidator.validateNotNull("store", store);

            return Selector.activeToken(store.getState());
        }

        function getManeuver(token)
        {
            InputValidator.validateNotNull("token", token);

            var maneuverKey = getManeuverKey(token);
            return Maneuver.properties[maneuverKey];
        }

        function getManeuverKey(token)
        {
            InputValidator.validateNotNull("token", token);

            var activationAction = getActivationAction(token);
            return activationAction.maneuverKey();
        }

        PilotAbility2.toString = function()
        {
            return "PilotAbility2";
        };

        if (Object.freeze)
        {
            Object.freeze(PilotAbility2);
        }

        return PilotAbility2;
    });
