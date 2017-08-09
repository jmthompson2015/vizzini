define(["Event", "Maneuver", "process/ManeuverAction", "ShipAction", "process/Action", "process/TargetLock"],
   function(Event, Maneuver, ManeuverAction, ShipAction, Action, TargetLock)
   {
      "use strict";

      function BarrelRoll(environment, token, maneuverKey)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("maneuverKey", maneuverKey);

         this.shipActionKey = function()
         {
            return ShipAction.BARREL_ROLL;
         };

         this.environment = function()
         {
            return environment;
         };

         this.token = function()
         {
            return token;
         };

         this.maneuverKey = function()
         {
            return maneuverKey;
         };
      }

      BarrelRoll.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var store = this.environment().store();
         var token = this.token();
         var maneuverAction = new ManeuverAction(store, token.id(), this.maneuverKey());
         maneuverAction.doIt();
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      BarrelRoll.prototype.toString = function()
      {
         return Maneuver.properties[this.maneuverKey()].bearing.name;
      };

      //////////////////////////////////////////////////////////////////////////

      function Boost(environment, token, maneuverKey)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("maneuverKey", maneuverKey);

         this.shipActionKey = function()
         {
            return ShipAction.BOOST;
         };

         this.environment = function()
         {
            return environment;
         };

         this.token = function()
         {
            return token;
         };

         this.maneuverKey = function()
         {
            return maneuverKey;
         };
      }

      Boost.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var store = this.environment().store();
         var token = this.token();
         var maneuverAction = new ManeuverAction(store, token.id(), this.maneuverKey());
         maneuverAction.doIt();
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      Boost.prototype.toString = function()
      {
         var parts = Maneuver.properties[this.maneuverKey()].bearing.name.split(" ");

         return "Boost " + parts[parts.length - 1];
      };

      //////////////////////////////////////////////////////////////////////////

      function Cloak(store, token)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);

         this.shipActionKey = function()
         {
            return ShipAction.CLOAK;
         };

         this.store = function()
         {
            return store;
         };

         this.token = function()
         {
            return token;
         };
      }

      Cloak.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var store = this.store();
         var token = this.token();
         store.dispatch(Action.addCloakCount(token));
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      Cloak.prototype.toString = function()
      {
         return "Cloak";
      };

      //////////////////////////////////////////////////////////////////////////

      function Coordinate(store, token)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);

         this.shipActionKey = function()
         {
            return ShipAction.COORDINATE;
         };

         this.store = function()
         {
            return store;
         };

         this.token = function()
         {
            return token;
         };
      }

      Coordinate.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         LOGGER.warn("Coordinate.doIt() not yet implemented.");
         var store = this.store();
         var token = this.token();
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      Coordinate.prototype.toString = function()
      {
         return "Coordinate: " + this.token().name();
      };

      //////////////////////////////////////////////////////////////////////////

      function Decloak(environment, token, maneuverKey)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("maneuverKey", maneuverKey);

         this.shipActionKey = function()
         {
            return ShipAction.DECLOAK;
         };

         this.environment = function()
         {
            return environment;
         };

         this.token = function()
         {
            return token;
         };

         this.maneuverKey = function()
         {
            return maneuverKey;
         };
      }

      Decloak.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var maneuverAction = new ManeuverAction(this.environment().store(), this.token().id(), this.maneuverKey());
         maneuverAction.doIt();
         var store = this.environment().store();
         var token = this.token();
         store.dispatch(Action.addCloakCount(token, -1));
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      Decloak.prototype.toString = function()
      {
         var maneuver = Maneuver.properties[this.maneuverKey()];

         return "Decloak: " + maneuver.bearing.name + " " + maneuver.speed;
      };

      //////////////////////////////////////////////////////////////////////////

      function Evade(store, token)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);

         this.shipActionKey = function()
         {
            return ShipAction.EVADE;
         };

         this.store = function()
         {
            return store;
         };

         this.token = function()
         {
            return token;
         };
      }

      Evade.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var store = this.store();
         var token = this.token();
         store.dispatch(Action.addEvadeCount(token));
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      Evade.prototype.toString = function()
      {
         return "Evade";
      };

      //////////////////////////////////////////////////////////////////////////

      function Focus(store, token)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);

         this.shipActionKey = function()
         {
            return ShipAction.FOCUS;
         };

         this.store = function()
         {
            return store;
         };

         this.token = function()
         {
            return token;
         };
      }

      Focus.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var store = this.store();
         var token = this.token();
         store.dispatch(Action.addFocusCount(token));
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      Focus.prototype.toString = function()
      {
         return "Focus";
      };

      //////////////////////////////////////////////////////////////////////////

      function Jam(store, attacker, defender)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         this.shipActionKey = function()
         {
            return ShipAction.JAM;
         };

         this.store = function()
         {
            return store;
         };

         this.attacker = function()
         {
            return attacker;
         };

         this.defender = function()
         {
            return defender;
         };
      }

      Jam.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var store = this.store();
         var attacker = this.attacker();
         var defender = this.defender();

         if (defender.stressCount() < 2)
         {
            defender.receiveStress();
         }
         if (defender.stressCount() < 2)
         {
            defender.receiveStress();
         }

         notifyEvent(store, attacker, eventCallback, this.shipActionKey());
      };

      Jam.prototype.toString = function()
      {
         return "Jam: " + this.defender().name();
      };

      //////////////////////////////////////////////////////////////////////////

      function Recover(store, token)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);

         this.shipActionKey = function()
         {
            return ShipAction.RECOVER;
         };

         this.store = function()
         {
            return store;
         };

         this.token = function()
         {
            return token;
         };
      }

      Recover.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         LOGGER.warn("Recover.doIt() not yet implemented.");
         var store = this.store();
         var token = this.token();
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      Recover.prototype.toString = function()
      {
         var answer = "Recover";

         if (this.token().parent !== undefined)
         {
            answer += ": " + this.token().name();
         }

         return answer;
      };

      //////////////////////////////////////////////////////////////////////////

      function Reinforce(store, token)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);

         this.shipActionKey = function()
         {
            return ShipAction.REINFORCE;
         };

         this.store = function()
         {
            return store;
         };

         this.token = function()
         {
            return token;
         };
      }

      Reinforce.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var store = this.store();
         var token = this.token();
         store.dispatch(Action.addReinforceCount(token));
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      Reinforce.prototype.toString = function()
      {
         var answer = "Reinforce";

         if (this.token().parent !== undefined)
         {
            answer += ": " + this.token().name();
         }

         return answer;
      };

      //////////////////////////////////////////////////////////////////////////

      function SAADamageCard(store, token, ability)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("ability", ability);

         this.shipActionKey = function()
         {
            return "criticalDamage";
         };

         this.store = function()
         {
            return store;
         };

         this.token = function()
         {
            return token;
         };

         this.ability = function()
         {
            return ability;
         };

         this.damage = function()
         {
            return ability.sourceObject();
         };
      }

      SAADamageCard.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         // callback optional.

         var store = this.store();
         var token = this.token();
         var ability = this.ability();

         if (ability !== undefined && ability.consequent() !== undefined)
         {
            var shipActionKey = this.shipActionKey();
            var callback = function()
            {
               notifyEvent(store, token, eventCallback, shipActionKey);
            };
            ability.consequent()(store, token, callback);
         }
      };

      SAADamageCard.prototype.toString = function()
      {
         var damage = this.damage();

         return "Damage Action: " + damage.name;
      };

      //////////////////////////////////////////////////////////////////////////

      function SAATargetLock(store, attacker, defender)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         this.shipActionKey = function()
         {
            return ShipAction.TARGET_LOCK;
         };

         this.store = function()
         {
            return store;
         };

         this.attacker = function()
         {
            return attacker;
         };

         this.defender = function()
         {
            return defender;
         };
      }

      SAATargetLock.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var store = this.store();
         var attacker = this.attacker();
         var defender = this.defender();
         var targetLock = TargetLock.newInstance(store, attacker, defender);
         notifyEvent(store, attacker, eventCallback, this.shipActionKey());
      };

      SAATargetLock.prototype.toString = function()
      {
         return "Target Lock: " + this.defender().name();
      };

      //////////////////////////////////////////////////////////////////////////

      function SAAUpgradeCard(store, token, ability)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("ability", ability);

         this.shipActionKey = function()
         {
            return "upgrade";
         };

         this.store = function()
         {
            return store;
         };

         this.token = function()
         {
            return token;
         };

         this.ability = function()
         {
            return ability;
         };

         this.upgrade = function()
         {
            return ability.sourceObject();
         };

         this.upgradeType = function()
         {
            return this.upgrade().type;
         };
      }

      SAAUpgradeCard.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var store = this.store();
         var token = this.token();
         var ability = this.ability();

         if (ability !== undefined && ability.consequent() !== undefined)
         {
            var shipActionKey = this.shipActionKey();
            var callback = function()
            {
               notifyEvent(store, token, eventCallback, shipActionKey);
            };
            ability.consequent()(store, token, callback);
         }
      };

      SAAUpgradeCard.prototype.toString = function()
      {
         var upgrade = this.upgrade();

         return "Upgrade Action: " + upgrade.name;
      };

      //////////////////////////////////////////////////////////////////////////

      function Slam(environment, token, maneuverKey)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("maneuverKey", maneuverKey);

         this.shipActionKey = function()
         {
            return ShipAction.SLAM;
         };

         this.environment = function()
         {
            return environment;
         };

         this.token = function()
         {
            return token;
         };

         this.maneuverKey = function()
         {
            return maneuverKey;
         };
      }

      Slam.prototype.doIt = function(eventCallback)
      {
         InputValidator.validateNotNull("eventCallback", eventCallback);

         var maneuverAction = new ManeuverAction(this.environment().store(), this.token().id(), this.maneuverKey());
         maneuverAction.doIt();
         var store = this.environment().store();
         var token = this.token();
         store.dispatch(Action.addWeaponsDisabledCount(token));
         notifyEvent(store, token, eventCallback, this.shipActionKey());
      };

      Slam.prototype.toString = function()
      {
         var maneuver = Maneuver.properties[this.maneuverKey()];

         return "SLAM: " + maneuver.bearing.name + " " + maneuver.speed;
      };

      function notifyEvent(store, eventToken, eventCallback, shipActionKey)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("eventToken", eventToken);
         InputValidator.validateNotNull("eventCallback", eventCallback);
         InputValidator.validateNotNull("shipActionKey", shipActionKey);

         // Mark as used.
         store.dispatch(Action.addTokenUsedShipAction(eventToken, shipActionKey));

         // Issue event.
         var eventKey = Event.SHIP_ACTION_PERFORMED;
         var eventContext = {
            shipActionKey: shipActionKey,
         };
         store.dispatch(Action.enqueueEvent(eventKey, eventToken, eventCallback, eventContext));
      }

      return (
      {
         BarrelRoll: BarrelRoll,
         Boost: Boost,
         Cloak: Cloak,
         Coordinate: Coordinate,
         Decloak: Decloak,
         Evade: Evade,
         Focus: Focus,
         Jam: Jam,
         Recover: Recover,
         Reinforce: Reinforce,
         SAADamageCard: SAADamageCard,
         SAATargetLock: SAATargetLock,
         SAAUpgradeCard: SAAUpgradeCard,
         Slam: Slam,
      });
   });
