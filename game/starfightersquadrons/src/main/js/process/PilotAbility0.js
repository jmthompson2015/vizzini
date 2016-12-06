/*
 * Provides pilot abilities for Events.
 */
define(["Event", "Maneuver", "Pilot", "process/Action"],
    function(Event, Maneuver, Pilot, Action)
    {
        "use strict";
        var PilotAbility0 = {};

        ////////////////////////////////////////////////////////////////////////
        PilotAbility0[Event.AFTER_EXECUTE_MANEUVER] = {};

        PilotAbility0[Event.AFTER_EXECUTE_MANEUVER][Pilot.NIGHT_BEAST] = {
            // After executing a green maneuver, you may perform a free focus action.
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                var maneuver = getManeuver(token);
                return token === eventToken && maneuver !== undefined && maneuver.difficultyKey === Difficulty.EASY;
            },
            consequent: function(store, token)
            {
                var focusAction = new ShipActionAction.Focus(store, token);
                focusAction.doIt();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        PilotAbility0[Event.RECEIVE_STRESS] = {};

        PilotAbility0[Event.RECEIVE_STRESS][Pilot.SOONTIR_FEL] = {
            // When you receive a stress token, you may assign 1 focus token to your ship.
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                return token === eventToken;
            },
            consequent: function(store, token)
            {
                store.dispatch(Action.addFocusCount(token));
            },
        };

        ////////////////////////////////////////////////////////////////////////
        function getActivationAction(token)
        {
            InputValidator.validateNotNull("token", token);

            return token.activationState().activationAction();
        }

        function getEventToken(store)
        {
            InputValidator.validateNotNull("store", store);

            return store.getState().eventToken;
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

            var answer;
            var activationAction = getActivationAction(token);

            if (activationAction)
            {
                answer = activationAction.maneuverKey();
            }

            return answer;
        }

        PilotAbility0.toString = function()
        {
            return "PilotAbility0";
        };

        if (Object.freeze)
        {
            Object.freeze(PilotAbility0);
        }

        return PilotAbility0;
    });
