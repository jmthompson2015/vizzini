define(["process/Action"],
   function(Action)
   {
      "use strict";

      function AttackDice(store, attackerId, sizeOrValues)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);

         this.store = function()
         {
            return store;
         };

         this.attackerId = function()
         {
            return attackerId;
         };

         if (typeof sizeOrValues === "number")
         {
            var size = sizeOrValues;
            var newValues = [];

            for (var i = 0; i < size; i++)
            {
               newValues.push(AttackDice.rollRandomValue());
            }

            this.save(newValues);
         }
         else if (Array.isArray(sizeOrValues))
         {
            this.save(sizeOrValues);
         }
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      AttackDice.prototype.blankCount = function()
      {
         return this.valueCount(AttackDice.Value.BLANK);
      };

      AttackDice.prototype.criticalHitCount = function()
      {
         return this.valueCount(AttackDice.Value.CRITICAL_HIT);
      };

      AttackDice.prototype.focusCount = function()
      {
         return this.valueCount(AttackDice.Value.FOCUS);
      };

      AttackDice.prototype.hitCount = function()
      {
         return this.valueCount(AttackDice.Value.HIT);
      };

      AttackDice.prototype.size = function()
      {
         return this.values().size;
      };

      AttackDice.prototype.sortedValues = function()
      {
         return this.values().sort(function(die0, die1)
         {
            var value0 = AttackDice.Value.properties[die0].sortOrder;
            var value1 = AttackDice.Value.properties[die1].sortOrder;

            return value0 - value1;
         });
      };

      AttackDice.prototype.toString = function()
      {
         var values = this.values();

         return "size = " + values.size + ", values = " + values.toArray();
      };

      AttackDice.prototype.value = function(index)
      {
         InputValidator.validateIsNumber("index", index);

         var values = this.values();

         return values.get(index);
      };

      AttackDice.prototype.valueCount = function(target)
      {
         InputValidator.validateNotNull("target", target);

         return this.values().reduce(function(accumulator, currentValue)
         {
            return accumulator + (currentValue === target ? 1 : 0);
         }, 0);
      };

      AttackDice.prototype.values = function()
      {
         var store = this.store();
         var attackerId = this.attackerId();

         return store.getState().tokenIdToAttackDice[attackerId];
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      AttackDice.prototype.addDie = function(value)
      {
         // value optional.

         var myValue = (value !== undefined ? value : AttackDice.rollRandomValue());
         var newValues = this.values().push(myValue);
         this.save(newValues);
      };

      AttackDice.prototype.changeAllToValue = function(oldValue, newValue)
      {
         var oldValues = this.values();
         var newValues = oldValues;

         for (var i = 0; i < oldValues.size; i++)
         {
            if (oldValues.get(i) === oldValue)
            {
               newValues = newValues.set(i, newValue);
            }
         }

         this.save(newValues);
      };

      AttackDice.prototype.changeOneToValue = function(oldValue, newValue)
      {
         var oldValues = this.values();
         var newValues = oldValues;

         for (var i = 0; i < oldValues.size; i++)
         {
            if (oldValues.get(i) === oldValue)
            {
               newValues = newValues.set(i, newValue);
               break;
            }
         }

         this.save(newValues);
      };

      AttackDice.prototype.rerollAllBlank = function()
      {
         var oldValues = this.values();
         var newValues = [];

         // Reroll all blank values.
         for (var i = 0; i < oldValues.size; i++)
         {
            var oldValue = oldValues.get(i);

            if (oldValue === AttackDice.Value.BLANK)
            {
               newValues.push(AttackDice.rollRandomValue());
            }
            else
            {
               newValues.push(oldValue);
            }
         }

         this.save(newValues);
      };

      AttackDice.prototype.rerollAllFocus = function()
      {
         var oldValues = this.values();
         var newValues = [];

         // Reroll all focus values.
         for (var i = 0; i < oldValues.size; i++)
         {
            var oldValue = oldValues.get(i);

            if (oldValue === AttackDice.Value.FOCUS)
            {
               newValues.push(AttackDice.rollRandomValue());
            }
            else
            {
               newValues.push(oldValue);
            }
         }

         this.save(newValues);
      };

      AttackDice.prototype.rerollBlank = function(count)
      {
         // count optional; default: 1

         this.rerollType(AttackDice.Value.BLANK, count);
      };

      AttackDice.prototype.rerollBlankAndFocus = function(count)
      {
         // count optional; default: 1

         var blankCount = this.blankCount();
         var focusCount = this.focusCount();

         if (blankCount >= count)
         {
            this.rerollBlank(count);
         }
         else
         {
            // 0 <= blankCount < count
            if (blankCount > 0)
            {
               this.rerollBlank(count);
            }

            var myCount = count - blankCount;

            if (myCount > 0)
            {
               this.rerollFocus(myCount);
            }
         }
      };

      AttackDice.prototype.rerollFocus = function(count)
      {
         // count optional; default: 1

         this.rerollType(AttackDice.Value.FOCUS, count);
      };

      AttackDice.prototype.rerollType = function(type, count)
      {
         InputValidator.validateNotNull("type", type);
         // count optional; default: 1

         // Reroll type values.
         var myCount = (count === undefined ? 1 : count);

         var oldValues = this.values();
         var newValues = oldValues;

         for (var i = 0; i < oldValues.size; i++)
         {
            var oldValue = oldValues.get(i);

            if (oldValue === type)
            {
               newValues = newValues.set(i, AttackDice.rollRandomValue());
               myCount--;

               if (myCount === 0)
               {
                  break;
               }
            }
         }

         this.save(newValues);
      };

      AttackDice.prototype.save = function(newValues)
      {
         var store = this.store();
         var attackerId = this.attackerId();
         var values = (Array.isArray(newValues) ? Immutable.List(newValues) : newValues);
         store.dispatch(Action.setTokenAttackDice(attackerId, values));
      };

      AttackDice.prototype.spendFocusToken = function()
      {
         // Change all focus results to hits.
         this.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
      };

      AttackDice.prototype.spendTargetLock = function()
      {
         // Reroll any blank or focus values.
         var oldValues = this.values();
         var newValues = oldValues;

         oldValues.forEach(function(oldValue, i)
         {
            if ([AttackDice.Value.BLANK, AttackDice.Value.FOCUS].includes(oldValue))
            {
               newValues = newValues.set(i, AttackDice.rollRandomValue());
            }
         });

         this.save(newValues);
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      AttackDice.get = function(store, attackerId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);

         return new AttackDice(store, attackerId);
      };

      AttackDice.rollRandomValue = function()
      {
         var min = 1;
         var max = 8;
         var roll = Math.floor(Math.random() * (max - min + 1)) + min;
         var value;

         // There are 2 focus, 3 hit, 1 critical hit, and 2 blank.
         switch (roll)
         {
            case 1:
            case 5:
               value = AttackDice.Value.FOCUS;
               break;
            case 2:
            case 6:
            case 8:
               value = AttackDice.Value.HIT;
               break;
            case 3:
               value = AttackDice.Value.CRITICAL_HIT;
               break;
            case 4:
            case 7:
               value = AttackDice.Value.BLANK;
               break;
            default:
               throw new RuntimeException("Unsupported roll: " + roll);
         }

         return value;
      };

      AttackDice.Value = {
         HIT: "hit",
         CRITICAL_HIT: "criticalHit",
         FOCUS: "focus",
         BLANK: "blank",

         properties:
         {
            "hit":
            {
               name: "Hit",
               sortOrder: 0,
            },
            "criticalHit":
            {
               name: "Critical Hit",
               sortOrder: 1,
            },
            "focus":
            {
               name: "Focus",
               sortOrder: 2,
            },
            "blank":
            {
               name: "Blank",
               sortOrder: 3,
            },
         },

         values: function()
         {
            return Object.getOwnPropertyNames(AttackDice.Value.properties);
         },
      };

      if (Object.freeze)
      {
         Object.freeze(AttackDice.Value);
      }

      return AttackDice;
   });
