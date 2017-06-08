define(["FiringArc", "ManeuverComputer", "RangeRuler", "UpgradeCard", "UpgradeHeader"],
   function(FiringArc, ManeuverComputer, RangeRuler, UpgradeCard, UpgradeHeader)
   {
      "use strict";

      function Weapon(name, weaponValue, rangeKeys, primaryFiringArcKey, auxiliaryFiringArcKey, isTurret, upgradeKey)
      {
         InputValidator.validateNotNull("name", name);
         InputValidator.validateNotNull("weaponValue", weaponValue);
         InputValidator.validateNotNull("rangeKeys", rangeKeys);
         InputValidator.validateNotNull("primaryFiringArcKey", primaryFiringArcKey);
         // auxiliaryFiringArcKey optional.
         // isTurret optional.
         // upgradeKey optional.

         this.name = function()
         {
            return name;
         };

         this.weaponValue = function()
         {
            return weaponValue;
         };

         this.rangeKeys = function()
         {
            return rangeKeys;
         };

         this.primaryFiringArcKey = function()
         {
            return primaryFiringArcKey;
         };

         this.auxiliaryFiringArcKey = function()
         {
            return auxiliaryFiringArcKey;
         };

         this.isTurret = function()
         {
            return isTurret;
         };

         this.upgradeKey = function()
         {
            return upgradeKey;
         };

         var primaryFiringArc = FiringArc.properties[primaryFiringArcKey];

         this.primaryFiringArc = function()
         {
            return primaryFiringArc;
         };

         var auxiliaryFiringArc = FiringArc.properties[auxiliaryFiringArcKey];

         this.auxiliaryFiringArc = function()
         {
            return auxiliaryFiringArc;
         };

         var upgrade = UpgradeCard.properties[upgradeKey];

         this.upgrade = function()
         {
            return upgrade;
         };
      }

      Weapon.prototype.isUsable = function(attacker, defender)
      {
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         var answer;
         var upgrade = this.upgrade();

         if (upgrade)
         {
            if (upgrade.isImplemented)
            {
               switch (upgrade.headerKey)
               {
                  case UpgradeHeader.ATTACK:
                     answer = true;
                     break;
                  case UpgradeHeader.ATTACK_FOCUS:
                     answer = (attacker.focusCount() > 0);
                     break;
                  case UpgradeHeader.ATTACK_TARGET_LOCK:
                     answer = (attacker.findTargetLockByDefender(defender) !== undefined);
                     break;
                  default:
                     throw "Unknown upgrade header: " + header;
               }
            }
            else
            {
               answer = false;
            }
         }
         else
         {
            // Primary weapon.
            answer = true;
         }

         return answer;
      };

      Weapon.prototype.isDefenderInFiringArc = function(attackerPosition, firingArc, defender, defenderPosition)
      {
         InputValidator.validateNotNull("attackerPosition", attackerPosition);
         InputValidator.validateNotNull("firingArc", firingArc);
         InputValidator.validateNotNull("defender", defender);
         InputValidator.validateNotNull("defenderPosition", defenderPosition);

         var bearing = attackerPosition.computeBearing(defenderPosition.x(), defenderPosition.y());
         var answer = firingArc.isInFiringArc(bearing);
         LOGGER.debug("weapon = " + this.name());
         LOGGER.debug("0 firingArc = " + firingArc.value + " bearing = " + bearing + " answer ? " + answer);

         if (!answer)
         {
            var shipBase = defender.pilot().shipTeam.ship.shipBase;
            var polygon = ManeuverComputer.computePolygon(shipBase, defenderPosition.x(), defenderPosition.y(),
               defenderPosition.heading());
            var points = polygon.points();

            for (var i = 0; i < points.length; i += 2)
            {
               bearing = attackerPosition.computeBearing(points[i], points[i + 1]);
               LOGGER.debug(i + " firingArc.isInFiringArc(" + bearing + ") ? " + firingArc.isInFiringArc(bearing));

               if (firingArc.isInFiringArc(bearing))
               {
                  answer = true;
                  LOGGER.debug(i + " firingArc = " + firingArc.value + " bearing = " + bearing + " answer ? " +
                     answer);
                  break;
               }
            }
         }

         return answer;
      };

      Weapon.prototype.isDefenderInRange = function(attacker, attackerPosition, defender, defenderPosition)
      {
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("attackerPosition", attackerPosition);
         InputValidator.validateNotNull("defender", defender);
         InputValidator.validateNotNull("defenderPosition", defenderPosition);

         var range = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

         return this.rangeKeys().vizziniContains(range);
      };

      Weapon.prototype.isDefenderTargetable = function(attacker, attackerPosition, defender, defenderPosition)
      {
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("attackerPosition", attackerPosition);
         InputValidator.validateNotNull("defender", defender);
         InputValidator.validateNotNull("defenderPosition", defenderPosition);

         return this.isUsable(attacker, defender) &&
            this.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition) &&
            (this.isTurret() ||
               this.isDefenderInFiringArc(attackerPosition, this.primaryFiringArc(), defender,
                  defenderPosition) || (this.auxiliaryFiringArc() && this.isDefenderInFiringArc(
                  attackerPosition, this.auxiliaryFiringArc(), defender, defenderPosition)));
      };

      Weapon.prototype.isPrimary = function()
      {
         return this.name() === "Primary Weapon";
      };

      Weapon.prototype.toString = function()
      {
         return this.name();
      };

      return Weapon;
   });
