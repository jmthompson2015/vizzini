/*
 * Provides upgrade abilities for Events.
 */
define(["Difficulty", "Event", "Maneuver", "ShipAction", "UpgradeCard", "process/Action", "process/Adjudicator", "process/Selector", "process/ShipActionAction"],
    function(Difficulty, Event, Maneuver, ShipAction, UpgradeCard, Action, Adjudicator, Selector, ShipActionAction)
    {
        "use strict";
        var UpgradeAbility0 = {};

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility0[Event.AFTER_EXECUTE_MANEUVER] = {};

        UpgradeAbility0[Event.AFTER_EXECUTE_MANEUVER][UpgradeCard.OUTLAW_TECH] = {
            // After you execute a red maneuver, you may assign 1 Focus token to your ship.
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                var maneuver = getManeuver(token);
                return token === eventToken && maneuver !== undefined && maneuver.difficultyKey === Difficulty.HARD;
            },
            consequent: function(store, token)
            {
                store.dispatch(Action.addFocusCount(token));
            },
        };

        // UpgradeAbility0[Event.AFTER_EXECUTE_MANEUVER][UpgradeCard.K4_SECURITY_DROID] = {
        //     // After executing a green maneuver, you may acquire a Target Lock.
        //     condition: function(store, token)
        //     {
        //         LOGGER.info("UpgradeAbility0 K4_SECURITY_DROID condition");
        //         var activeToken = getActiveToken(store);
        //         var maneuver = getManeuver(token);
        //         return token === activeToken && maneuver !== undefined && maneuver.difficultyKey === Difficulty.EASY;
        //     },
        //     consequent: function(store, token)
        //     {
        //         LOGGER.info("UpgradeAbility0 K4_SECURITY_DROID consequent");
        //         var agent = token.agent();
        //         var environment = store.getState().environment;
        //         var adjudicator = new Adjudicator();
        //         var shipActions0 = [ShipAction.TARGET_LOCK];
        //         agent.getShipAction(environment, adjudicator, token, this.finishConsequent, shipActions0);
        //     },
        //     finishConsequent: function(shipActionAction)
        //     {
        //         LOGGER.info("UpgradeAbility0 K4_SECURITY_DROID finishConsequent");
        //         if (shipActionAction)
        //         {
        //             shipActionAction.doIt();
        //         }
        //     },
        // };

        UpgradeAbility0[Event.AFTER_EXECUTE_MANEUVER][UpgradeCard.R2_D2] = {
            // After executing a green maneuver, you may recover 1 shield (up to your shield value).
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                var maneuver = getManeuver(token);
                return token === eventToken && maneuver !== undefined && maneuver.difficultyKey === Difficulty.EASY;
            },
            consequent: function(store, token)
            {
                token.recoverShield();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility0[Event.FOCUS_ACTION_PERFORMED] = {};

        UpgradeAbility0[Event.FOCUS_ACTION_PERFORMED][UpgradeCard.RECON_SPECIALIST] = {
            // When you perform a Focus action, assign 1 additional Focus token to your ship.
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
        UpgradeAbility0[Event.REMOVE_STRESS] = {};

        UpgradeAbility0[Event.REMOVE_STRESS][UpgradeCard.KYLE_KATARN] = {
            // After you remove a stress token from your ship, you may assign a Focus token to your ship.
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
        UpgradeAbility0[Event.TARGET_LOCK_ACQUIRED] = {};

        UpgradeAbility0[Event.TARGET_LOCK_ACQUIRED][UpgradeCard.TIE_V1] = {
            // After you acquire a target lock, you may perform a free evade action.
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                return token === eventToken;
            },
            consequent: function(store, token)
            {
                var evadeAction = new ShipActionAction.Evade(store, token);
                evadeAction.doIt();
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

        if (Object.freeze)
        {
            Object.freeze(UpgradeAbility0);
        }

        return UpgradeAbility0;
    });
