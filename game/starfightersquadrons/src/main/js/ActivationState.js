define(function()
{
    "use strict";

    function ActivationState()
    {
        var activationAction;
        var isTouching = false;
        var maneuverAction;
        var usedPilots = [];
        var usedUpgrades = [];

        this.activationAction = function(value)
        {
            if (value !== undefined)
            {
                activationAction = value;
            }

            return activationAction;
        };

        this.clear = function()
        {
            LOGGER.debug("ActivationState.clear()");
            activationAction = undefined;
            isTouching = false;
            maneuverAction = undefined;
            usedPilots = [];
            usedUpgrades = [];
        };

        this.isTouching = function(value)
        {
            if (value === true || value === false)
            {
                isTouching = value;
            }

            return isTouching;
        };

        this.maneuverAction = function(value)
        {
            if (value)
            {
                maneuverAction = value;
            }

            return maneuverAction;
        };

        this.usedPilots = function(pilotKey)
        {
            if (pilotKey !== undefined)
            {
                usedPilots.push(pilotKey);
            }

            return usedPilots;
        };

        this.usedUpgrades = function(upgradeKey)
        {
            if (upgradeKey !== undefined)
            {
                usedUpgrades.push(upgradeKey);
            }

            return usedUpgrades;
        };
    }

    return ActivationState;
});
