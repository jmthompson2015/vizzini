define(["Event", "ShipAction", "process/Action", "process/Selector"],
   function(Event, ShipAction, Action, Selector)
   {
      "use strict";

      function TargetLock(store, attackerId, defenderId, isNewIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);
         InputValidator.validateIsNumber("defenderId", defenderId);
         // isNew optional. default: true

         this.store = function()
         {
            return store;
         };

         this.attackerId = function()
         {
            return attackerId;
         };

         this.defenderId = function()
         {
            return defenderId;
         };

         var isNew = (isNewIn !== undefined ? isNewIn : true);

         if (isNew)
         {
            // Initialize ID.
            var newId = TargetLock.nextId(store);

            var values = Immutable.Map(
            {
               attackerId: attackerId,
               defenderId: defenderId,
               id: newId,
            });

            store.dispatch(Action.addTargetLock(values));
            store.dispatch(Action.setEvent(Event.TARGET_LOCK_ACQUIRED, attackerId, ShipAction.TARGET_LOCK));
         }
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      TargetLock.prototype.attacker = function()
      {
         var store = this.store();
         var attackerId = this.attackerId();

         return Selector.token(store.getState(), attackerId);
      };

      TargetLock.prototype.defender = function()
      {
         var store = this.store();
         var defenderId = this.defenderId();

         return Selector.token(store.getState(), defenderId);
      };

      TargetLock.prototype.id = function()
      {
         var values = this.values();

         return values.get("id");
      };

      TargetLock.prototype.values = function()
      {
         var store = this.store();
         var attackerId = this.attackerId();
         var defenderId = this.defenderId();

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

      TargetLock.get = function(store, attackerId, defenderId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);
         InputValidator.validateIsNumber("defenderId", defenderId);

         var tlValues = store.getState().targetLocks;
         var isNew = false;

         return tlValues.toArray().filter(function(values)
         {
            return values.get("attackerId") === attackerId && values.get("defenderId") === defenderId;
         }).map(function(values)
         {
            return new TargetLock(store, attackerId, defenderId, isNew);
         });
      };

      TargetLock.getByAttacker = function(store, attackerId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);

         var tlValues = store.getState().targetLocks;
         var isNew = false;

         return tlValues.toArray().filter(function(values)
         {
            return values.get("attackerId") === attackerId;
         }).map(function(values)
         {
            var defenderId = values.get("defenderId");
            return new TargetLock(store, attackerId, defenderId, isNew);
         });
      };

      TargetLock.getByDefender = function(store, defenderId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("defenderId", defenderId);

         var tlValues = store.getState().targetLocks;
         var isNew = false;

         return tlValues.toArray().filter(function(values)
         {
            return values.get("defenderId") === defenderId;
         }).map(function(values)
         {
            var attackerId = values.get("attackerId");
            return new TargetLock(store, attackerId, defenderId, isNew);
         });
      };

      TargetLock.getFirst = function(store, attackerId, defenderId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);
         InputValidator.validateIsNumber("defenderId", defenderId);

         var answer = TargetLock.get(store, attackerId, defenderId);

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

      TargetLock.removeAllTargetLocks = function(store, tokenId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("tokenId", tokenId);

         var tlValues = store.getState().targetLocks.filter(function(targetLock)
         {
            return targetLock.get("attackerId") === tokenId || targetLock.get("defenderId") === tokenId;
         });

         for (var i = 0; i < tlValues.size; i++)
         {
            var values = tlValues.get(i);
            store.dispatch(Action.removeTargetLock(values));
         }
      };

      return TargetLock;
   });
