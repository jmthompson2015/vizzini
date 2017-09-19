/*
 * Provides upgrade abilities for the End Phase.
 */
define(["Phase", "UpgradeCard", "process/Action", "process/AttackDice", "process/Selector", "process/TokenAction"],
   function(Phase, UpgradeCard, Action, AttackDice, Selector, TokenAction)
   {
      "use strict";
      var UpgradeAbility4 = {};

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility4[Phase.END_CLEAN_UP] = {};

      UpgradeAbility4[Phase.END_CLEAN_UP][UpgradeCard.QUANTUM_STORM] = {
         // At the start of the End phase, if you have 1 or fewer energy tokens, gain 1 energy token.
         condition: function(store, token)
         {
            return isActiveToken(store, token) && token.energyCount() <= 1;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addEnergyCount(token));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility4[Phase.END_ROUND_END] = {};

      UpgradeAbility4[Phase.END_ROUND_END][UpgradeCard.CLOAKING_DEVICE] = {
         // Action: Perform a free cloak action. At the end of each round, if you are cloaked, roll 1 attack die. On a focus result, discard this card, then decloak or discard your cloak token.
         condition: function(store, token)
         {
            var upgradeKey = UpgradeCard.CLOAKING_DEVICE;
            return isActiveToken(store, token) && token.isCloaked() && token.isPerRoundAbilityUsed(UpgradeCard, upgradeKey);
         },
         consequent: function(store, token, callback)
         {
            if (AttackDice.rollRandomValue() === AttackDice.Value.FOCUS)
            {
               token.discardUpgrade(upgradeKey);

               var agent = token.agent();
               var environment = store.getState().environment;
               var adjudicator = store.getState().adjudicator;
               var shipActions0 = [ShipAction.DECLOAK];
               var that = this;
               var finishCallback = function(shipActionAbility)
               {
                  that.finishConsequent(store, token, shipActionAbility, callback);
               };
               agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

               // Wait for agent to respond.
            }
            else
            {
               callback();
            }
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            store.dispatch(TokenAction.addIonCount(token));
            if (shipActionAbility)
            {
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function getActiveToken(store)
      {
         InputValidator.validateNotNull("store", store);

         return Selector.activeToken(store.getState());
      }

      function isActiveToken(store, token)
      {
         var activeToken = getActiveToken(store);

         return token.equals(activeToken);
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
