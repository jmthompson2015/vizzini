define(["Event", "ShipAction", "process/Action", "process/Selector"],
   function(Event, ShipAction, Action, Selector)
   {
      "use strict";

      function TargetLock(attacker, defender)
      {
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         this.attacker = function()
         {
            return attacker;
         };

         this.defender = function()
         {
            return defender;
         };
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      TargetLock.prototype.id = function()
      {
         var values = this.values();

         return values.get("id");
      };

      TargetLock.prototype.store = function()
      {
         var attacker = this.attacker();

         return attacker.store();
      };

      TargetLock.prototype.values = function()
      {
         var store = this.store();
         var attackerId = this.attacker().id();
         var defenderId = this.defender().id();

         var targetLocks = store.getState().targetLocks;

         for (var i = 0; i < targetLocks.size; i++)
         {
            var values = targetLocks.get(i);

            if (values.get("attackerId") === attackerId && values.get("defenderId") === defenderId)
            {
               return values;
            }
         }
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      TargetLock.prototype.delete = function()
      {
         var store = this.store();
         var values = this.values();

         store.dispatch(Action.removeTargetLock(values));
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      TargetLock.newInstance = function(store, attacker, defender, eventCallback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);
         // eventCallback optional.

         var answer = new TargetLock(attacker, defender);

         // Initialize ID.
         var newId = TargetLock.nextId(store);

         var values = Immutable.Map(
         {
            attackerId: attacker.id(),
            defenderId: defender.id(),
            id: newId,
         });

         store.dispatch(Action.addTargetLock(values));

         var eventContext = {
            defenderId: defender.id(),
            id: newId,
            shipActionKey: ShipAction.TARGET_LOCK,
         };

         store.dispatch(Action.setEvent(Event.TARGET_LOCK_ACQUIRED, attacker, eventCallback, eventContext));

         return answer;
      };

      TargetLock.get = function(store, attacker, defender)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         var tlValues = store.getState().targetLocks;
         var attackerId = attacker.id();
         var defenderId = defender.id();

         return tlValues.toArray().filter(function(values)
         {
            return values.get("attackerId") === attackerId && values.get("defenderId") === defenderId;
         }).map(function(values)
         {
            return new TargetLock(attacker, defender);
         });
      };

      TargetLock.getByAttacker = function(store, attacker)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);

         var tlValues = store.getState().targetLocks;
         var attackerId = attacker.id();

         return tlValues.toArray().filter(function(values)
         {
            return values.get("attackerId") === attackerId;
         }).map(function(values)
         {
            var defenderId = values.get("defenderId");
            var defender = Selector.token(store.getState(), defenderId);
            return new TargetLock(attacker, defender);
         });
      };

      TargetLock.getByDefender = function(store, defender)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("defender", defender);

         var tlValues = store.getState().targetLocks;
         var defenderId = defender.id();

         return tlValues.toArray().filter(function(values)
         {
            return values.get("defenderId") === defenderId;
         }).map(function(values)
         {
            var attackerId = values.get("attackerId");
            var attacker = Selector.token(store.getState(), attackerId);
            return new TargetLock(attacker, defender);
         });
      };

      TargetLock.getFirst = function(store, attacker, defender)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         var answer = TargetLock.get(store, attacker, defender);

         if (answer.length === 0)
         {
            answer = undefined;
         }
         else
         {
            answer = answer[0];
         }

         return answer;
      };

      TargetLock.nextId = function(store)
      {
         InputValidator.validateNotNull("store", store);

         var isDoubling = (store.getState().nextTargetLockId > 25);
         var offset = store.getState().nextTargetLockId - (isDoubling ? 26 : 0);
         var letter = String.fromCharCode(65 + offset);
         var answer = (isDoubling ? letter + letter : letter);
         store.dispatch(Action.incrementNextTargetLockId());

         return answer;
      };

      TargetLock.removeAllTargetLocks = function(store, token)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);

         var tlValues = store.getState().targetLocks.filter(function(targetLock)
         {
            return targetLock.get("attackerId") === token.id() || targetLock.get("defenderId") === token.id();
         });

         for (var i = 0; i < tlValues.size; i++)
         {
            var values = tlValues.get(i);
            store.dispatch(Action.removeTargetLock(values));
         }
      };

      return TargetLock;
   });
