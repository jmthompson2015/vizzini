/*
 * Provides upgrade abilities for the End Phase.
 */
define(["AttackDice", "Phase", "UpgradeCard", "process/Action", "process/Selector"],
    function(AttackDice, Phase, UpgradeCard, Action, Selector)
    {
        "use strict";
        var UpgradeAbility4 = {};

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility4[Phase.END_CLEAN_UP] = {};

        UpgradeAbility4[Phase.END_CLEAN_UP][UpgradeCard.QUANTUM_STORM] = {
            // At the start of the End phase, if you have 1 or fewer energy tokens, gain 1 energy token.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken && token.energyCount() <= 1;
            },
            consequent: function(store, token, callback)
            {
                store.dispatch(Action.addEnergyCount(token));
                callback();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility4[Phase.END_ROUND_END] = {};

        UpgradeAbility4[Phase.END_ROUND_END][UpgradeCard.CLOAKING_DEVICE] = {
            // Action: Perform a free cloak action. At the end of each round, if you are cloaked, roll 1 attack die. On a focus result, discard this card, then decloak or discard your cloak token.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                var usedUpgrade = token.activationState().usedUpgrades().vizziniContains(UpgradeCard.CLOAKING_DEVICE);
                return token === activeToken && usedUpgrade && token.isCloaked();
            },
            consequent: function(store, token, callback)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.focusCount() === 1)
                {
                    token.discardUpgrade(upgradeKey);

                    var agent = token.agent();
                    var environment = store.getState().environment;
                    var adjudicator = new Adjudicator();
                    var shipActions0 = [ShipAction.DECLOAK];
                    var that = this;
                    var finishCallback = function(shipActionAction)
                    {
                        that.finishConsequent(shipActionAction, callback);
                    };
                    agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

                    // Wait for agent to respond.
                }
                else
                {
                    callback();
                }
            },
            finishConsequent: function(shipActionAction, callback)
            {
                if (shipActionAction)
                {
                    shipActionAction.doIt();
                }
                store.dispatch(Action.addIonCount(token));
                callback();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        function getActiveToken(store)
        {
            InputValidator.validateNotNull("store", store);

            return Selector.activeToken(store.getState());
        }

        UpgradeAbility4.toString = function()
        {
            return "UpgradeAbility4";
        };

        if (Object.freeze)
        {
            Object.freeze(UpgradeAbility4);
        }

        return UpgradeAbility4;
    });
