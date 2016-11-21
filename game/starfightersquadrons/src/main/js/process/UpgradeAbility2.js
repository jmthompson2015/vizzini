/*
 * Provides upgrade abilities for the Activation Phase.
 */
define(["Maneuver", "Phase", "UpgradeCard", "process/Action", "process/Selector"],
    function(Maneuver, Phase, UpgradeCard, Action, Selector)
    {
        "use strict";
        var UpgradeAbility2 = {};

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP] = {};

        UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP][UpgradeCard.TIE_X7] = {
            // Your upgrade bar loses the Cannon and Missile upgrade icons. After executing a 3-, 4-, or 5-speed maneuver, you may assign 1 evade token to your ship.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                var maneuver = getManeuver(activeToken);
                return token === activeToken && [3, 4, 5].vizziniContains(maneuver.speed);
            },
            consequent: function(store, token)
            {
                store.dispatch(Action.addEvadeCount(token));
            },
        };

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

            return token.activationState().maneuverAction().maneuverKey();
        }

        if (Object.freeze)
        {
            Object.freeze(UpgradeAbility2);
        }

        return UpgradeAbility2;
    });
