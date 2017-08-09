define(["Ability", "Bearing", "Count", "DamageCard", "Difficulty", "Event", "FiringArc", "Maneuver", "Pilot", "RangeRuler", "ShipAction", "ShipBase", "UpgradeCard", "UpgradeType", "Value", "Weapon", "process/Action", "process/ActivationAction", "process/Selector"],
   function(Ability, Bearing, Count, DamageCard, Difficulty, Event, FiringArc, Maneuver, Pilot, RangeRuler, ShipAction, ShipBase, UpgradeCard, UpgradeType, Value, Weapon, Action, ActivationAction, Selector)
   {
      "use strict";

      function Token(store, pilotKeyIn, agent, upgradeKeysIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("pilotKeyIn", pilotKeyIn);
         InputValidator.validateNotNull("agent", agent);

         this.store = function()
         {
            return store;
         };

         var pilotKey, pilot;

         if (typeof pilotKeyIn === "string")
         {
            pilotKey = pilotKeyIn;
            pilot = Pilot.properties[pilotKey];
         }
         else
         {
            pilot = pilotKeyIn;
            pilotKey = pilot.value;
         }

         this.agent = function()
         {
            return agent;
         };

         var ship;

         this.ship = function()
         {
            if (!ship)
            {
               ship = pilot.shipTeam.ship;

               if (pilot.value.endsWith(".fore"))
               {
                  ship = ship.fore;
               }
               else if (pilot.value.endsWith(".aft"))
               {
                  ship = ship.aft;
               }
               else if (pilot.value.endsWith(".crippledFore"))
               {
                  ship = ship.crippledFore;
               }
               else if (pilot.value.endsWith(".crippledAft"))
               {
                  ship = ship.crippledAft;
               }
            }

            return ship;
         };

         this.discardUpgrade = function(upgradeKey)
         {
            InputValidator.validateNotNull("upgradeKey", upgradeKey);

            store.dispatch(Action.removeTokenUpgrade(this, upgradeKey));
            var upgrade = UpgradeCard.properties[upgradeKey];

            if (upgrade.weaponValue !== undefined)
            {
               for (var i = 0; i < secondaryWeapons.length; i++)
               {
                  var weapon = secondaryWeapons[i];

                  if (weapon.upgradeKey() === upgradeKey)
                  {
                     secondaryWeapons.vizziniRemove(weapon);
                  }
               }
            }
         };

         this.id = function()
         {
            return id;
         };

         this.maneuverKeys = function()
         {
            var answer;

            if (this.isIonized())
            {
               answer = [Maneuver.STRAIGHT_1_STANDARD];
            }
            else
            {
               answer = pilot.shipTeam.ship.maneuverKeys.slice();

               if (this.isCriticallyDamagedWith(DamageCard.SHAKEN_PILOT_V2))
               {
                  // During the Planning phase, you cannot be assigned straight maneuvers. When you reveal a maneuver, flip this card facedown.
                  answer = answer.filter(function(maneuverKey)
                  {
                     var maneuver = Maneuver.properties[maneuverKey];
                     return maneuver.bearing !== Bearing.STRAIGHT;
                  });
               }

               if (this.isCriticallyDamagedWith(DamageCard.DAMAGED_ENGINE) ||
                  this.isCriticallyDamagedWith(DamageCard.DAMAGED_ENGINE_V2))
               {
                  answer = changeBearingManeuversToDifficulty(answer, Bearing.TURN_LEFT, Difficulty.HARD);
                  answer = changeBearingManeuversToDifficulty(answer, Bearing.TURN_RIGHT, Difficulty.HARD);
               }

               if (this.pilotKey() === Pilot.ELLO_ASTY && !this.isStressed())
               {
                  answer = changeBearingManeuversToDifficulty(answer, Bearing.TALLON_ROLL_LEFT, Difficulty.STANDARD);
                  answer = changeBearingManeuversToDifficulty(answer, Bearing.TALLON_ROLL_RIGHT, Difficulty.STANDARD);
               }

               if (this.isUpgradedWith(UpgradeCard.NIEN_NUNB))
               {
                  answer = changeBearingManeuversToDifficulty(answer, Bearing.STRAIGHT, Difficulty.EASY);
               }

               if (this.isUpgradedWith(UpgradeCard.R2_ASTROMECH))
               {
                  answer = changeSpeedManeuversToDifficulty(answer, 1, Difficulty.EASY);
                  answer = changeSpeedManeuversToDifficulty(answer, 2, Difficulty.EASY);
               }

               if (this.isUpgradedWith(UpgradeCard.TWIN_ION_ENGINE_MK_II))
               {
                  answer = changeBearingManeuversToDifficulty(answer, Bearing.BANK_LEFT, Difficulty.EASY);
                  answer = changeBearingManeuversToDifficulty(answer, Bearing.BANK_RIGHT, Difficulty.EASY);
               }

               if (this.isUpgradedWith(UpgradeCard.UNHINGED_ASTROMECH))
               {
                  answer = changeSpeedManeuversToDifficulty(answer, 3, Difficulty.EASY);
               }

               if (this.isStressed() && !this.isUpgradedWith(UpgradeCard.HERA_SYNDULLA))
               {
                  answer = answer.filter(function(maneuverKey)
                  {
                     return Maneuver.properties[maneuverKey].difficultyKey !== Difficulty.HARD;
                  });
               }
            }

            return answer;
         };

         this.newInstance = function(store, agent)
         {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("agent", agent);

            var answer = new Token(store, pilotKey, agent);

            this.upgradeKeys().forEach(function(upgradeKey)
            {
               store.dispatch(Action.addTokenUpgrade(answer, upgradeKey));
               var upgrade = UpgradeCard.properties[upgradeKey];

               if (upgrade.weaponValue)
               {
                  answer.secondaryWeapons().push(createSecondaryWeapon(upgrade));
               }
            });

            return answer;
         };

         this.pilot = function()
         {
            return pilot;
         };

         this.pilotKey = function()
         {
            return pilotKey;
         };

         this.primaryWeapon = function()
         {
            return primaryWeapon;
         };

         this.secondaryWeapons = function()
         {
            return secondaryWeapons;
         };

         this.shipState = function(property)
         {
            InputValidator.validateNotNull("property", property);

            var propertyName = property + "Value";
            var ship = that.ship();

            var answer = pilot[propertyName];

            if (answer === undefined)
            {
               answer = ship[propertyName];
            }

            if (answer === undefined && ship.fore)
            {
               answer = ship.fore[propertyName];
            }

            if (answer === undefined && ship.aft)
            {
               answer = ship.aft[propertyName];
            }

            return (answer !== undefined ? answer : null);
         };

         this.squadPointCost = function()
         {
            var answer = this.upgradeKeys().reduce(function(accumulator, upgradeKey)
            {
               var upgrade = UpgradeCard.properties[upgradeKey];
               return accumulator + upgrade.squadPointCost;
            }, this.pilot().squadPointCost);

            return answer;
         };

         function changeBearingManeuversToDifficulty(maneuverKeys, bearingKey, difficultyKey)
         {
            return maneuverKeys.map(function(maneuverKey)
            {
               var maneuver = Maneuver.properties[maneuverKey];
               var myBearingKey = maneuver.bearingKey;

               if (myBearingKey === bearingKey)
               {
                  var speed = maneuver.speed;
                  var answer = Maneuver.find(bearingKey, speed, difficultyKey);
                  if (!answer)
                  {
                     throw "Unknown maneuver: " + bearingKey + " " + speed + " " + difficultyKey;
                  }
                  return answer;
               }
               else
               {
                  return maneuverKey;
               }
            });
         }

         function changeSpeedManeuversToDifficulty(maneuverKeys, speed, difficultyKey)
         {
            return maneuverKeys.map(function(maneuverKey)
            {
               var maneuver = Maneuver.properties[maneuverKey];
               var mySpeed = maneuver.speed;

               if (mySpeed === speed)
               {
                  var bearingKey = maneuver.bearingKey;
                  var answer = Maneuver.find(bearingKey, speed, difficultyKey);
                  if (!answer)
                  {
                     throw "Unknown maneuver: " + bearingKey + " " + speed + " " + difficultyKey;
                  }
                  return answer;
               }
               else
               {
                  return maneuverKey;
               }
            });
         }

         function createPrimaryWeapon()
         {
            var primaryWeaponValue = that.shipState(Value.PRIMARY_WEAPON);
            var ship = that.ship();

            return new Weapon("Primary Weapon", primaryWeaponValue, ship.primaryWeaponRanges, ship.primaryFiringArcKey,
               ship.auxiliaryFiringArcKey, ship.isPrimaryWeaponTurret);
         }

         function createSecondaryWeapon(upgrade)
         {
            return new Weapon(upgrade.name, upgrade.weaponValue, upgrade.rangeKeys, upgrade.firingArcKey, undefined,
               upgrade.isWeaponTurret, upgrade.value);
         }

         // /////////////////////////////////////////////////////////////////////
         // Initialize.
         var that = this;
         var id = store.getState().nextTokenId;
         store.dispatch(Action.incrementNextTokenId());
         store.dispatch(Action.clearAttackerUsedDamages(this));
         store.dispatch(Action.clearAttackerUsedPilots(this));
         store.dispatch(Action.clearAttackerUsedUpgrades(this));
         store.dispatch(Action.clearDefenderUsedDamages(this));
         store.dispatch(Action.clearDefenderUsedPilots(this));
         store.dispatch(Action.clearDefenderUsedUpgrades(this));
         store.dispatch(Action.clearTokenUsedDamages(this));
         store.dispatch(Action.clearTokenUsedPilots(this));
         store.dispatch(Action.clearTokenUsedShipActions(this));
         store.dispatch(Action.clearTokenUsedUpgrades(this));

         Value.values().forEach(function(property)
         {
            store.dispatch(Action.setValue(this, property, this.shipState(property)));
         }, this);

         Count.values().forEach(function(property)
         {
            var value;

            switch (property)
            {
               case Count.ENERGY:
                  value = this.shipState(Value.ENERGY);
                  store.dispatch(Action.setEnergyCount(that, value));
                  break;
               case Count.SHIELD:
                  value = this.shipState(Value.SHIELD);
                  store.dispatch(Action.setShieldCount(that, value));
                  break;
               default:
                  store.dispatch(Action.setCount(that, property));
            }
         }, this);

         var primaryWeapon = (this.shipState(Value.PRIMARY_WEAPON) !== null ? createPrimaryWeapon() : undefined);
         var secondaryWeapons = [];

         // Initialize the upgrades.
         if (upgradeKeysIn)
         {
            upgradeKeysIn.forEach(function(upgradeKey)
            {
               store.dispatch(Action.addTokenUpgrade(that, upgradeKey));
               var upgrade = UpgradeCard.properties[upgradeKey];

               if (upgrade.weaponValue)
               {
                  secondaryWeapons.push(createSecondaryWeapon(upgrade));
               }
            });
         }

         if (upgradeKeysIn)
         {
            upgradeKeysIn.forEach(function(upgradeKey)
            {
               var upgrade = UpgradeCard.properties[upgradeKey];

               if (upgrade.energyLimit !== undefined)
               {
                  store.dispatch(Action.setTokenUpgradeEnergy(this, upgradeKey, upgrade.energyLimit));
               }
            }, this);
         }
      }

      Token.prototype.activationAction = function()
      {
         return ActivationAction.get(this.store(), this.id());
      };

      Token.prototype.agilityValue = function()
      {
         return Selector.agilityValue(this.store().getState(), this.id());
      };

      Token.prototype.cloakCount = function()
      {
         return Selector.cloakCount(this.store().getState(), this.id());
      };

      Token.prototype.combatAction = function()
      {
         return Selector.combatAction(this.store().getState(), this);
      };

      Token.prototype.computeAttackDiceCount = function(environment, weapon, defender, rangeKey)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("weapon", weapon);
         InputValidator.validateNotNull("defender", defender);
         InputValidator.validateNotNull("rangeKey", rangeKey);

         var answer;

         if (this.isCriticallyDamagedWith(DamageCard.BLINDED_PILOT))
         {
            answer = 0;
            this.flipDamageCardFacedown(DamageCard.BLINDED_PILOT);
         }
         else
         {
            answer = weapon.weaponValue();

            if (rangeKey === RangeRuler.ONE && weapon.isPrimary() && defender.pilotKey() !== Pilot.ZERTIK_STROM)
            {
               // Bonus attack die at range one.
               answer++;

               if (this.pilotKey() === Pilot.TALONBANE_COBRA)
               {
                  answer++;
               }
            }

            var attackerPosition = environment.getPositionFor(this);
            var defenderPosition = environment.getPositionFor(defender);
            var firingArc, isInFiringArc;

            if (this.pilotKey() === Pilot.BACKSTABBER)
            {
               firingArc = FiringArc.FORWARD;
               isInFiringArc = weapon.isDefenderInFiringArc(defenderPosition, firingArc, this, attackerPosition);

               if (!isInFiringArc)
               {
                  answer++;
               }
            }

            if (this.pilotKey() === Pilot.EADEN_VRILL && weapon.isPrimary() && defender.isStressed())
            {
               answer++;
            }

            if (this.pilotKey() === Pilot.FENN_RAU && rangeKey === RangeRuler.ONE)
            {
               answer++;
            }

            if (this.pilotKey() === Pilot.KAVIL)
            {
               firingArc = weapon.primaryFiringArc();
               isInFiringArc = weapon.isDefenderInFiringArc(attackerPosition, firingArc, defender, defenderPosition);

               if (!isInFiringArc)
               {
                  answer++;
               }
            }

            if (this.pilotKey() === Pilot.MAULER_MITHEL && rangeKey === RangeRuler.ONE)
            {
               answer++;
            }

            if (this.pilotKey() === Pilot.NDRU_SUHLAK && environment.getFriendlyTokensAtRange(this, RangeRuler.ONE).length === 0 && environment.getFriendlyTokensAtRange(this, RangeRuler.TWO).length === 0)
            {
               answer++;
            }

            if (this.pilotKey() === Pilot.SCOURGE && (defender.damageCount() > 0 || defender.criticalDamageCount() > 0))
            {
               answer++;
            }

            if (weapon.upgradeKey() === UpgradeCard.DORSAL_TURRET && rangeKey === RangeRuler.ONE)
            {
               answer++;
            }

            if (weapon.upgradeKey() === UpgradeCard.PROTON_ROCKETS)
            {
               answer += Math.min(this.agilityValue(), 3);
            }

            if (this.isCriticallyDamagedWith(DamageCard.WEAPONS_FAILURE_V2))
            {
               answer -= 1;
            }
         }

         return answer;
      };

      Token.prototype.computeDefenseDiceCount = function(environment, attacker, weapon, rangeKey)
      {
         var answer = this.agilityValue();

         if ([RangeRuler.THREE, RangeRuler.FOUR, RangeRuler.FIVE].includes(rangeKey) && weapon.isPrimary())
         {
            // Bonus defense die at range three, four, and five.
            answer++;

            if (this.pilotKey() === Pilot.TALONBANE_COBRA)
            {
               answer++;
            }
         }

         if (this.pilotKey() === Pilot.FENN_RAU && rangeKey === RangeRuler.ONE)
         {
            answer++;
         }

         if (this.pilotKey() === Pilot.GRAZ_THE_HUNTER)
         {
            var attackerPosition = environment.getPositionFor(attacker);
            var defenderPosition = environment.getPositionFor(this);
            var firingArc = FiringArc.FORWARD;
            var isInFiringArc = weapon.isDefenderInFiringArc(defenderPosition, firingArc, attacker, attackerPosition);

            if (!isInFiringArc)
            {
               answer++;
            }
         }

         return answer;
      };

      Token.prototype.criticalDamageCount = function()
      {
         return this.criticalDamages().length;
      };

      Token.prototype.criticalDamages = function()
      {
         return Selector.criticalDamages(this.store().getState(), this.id());
      };

      Token.prototype.damageCount = function()
      {
         return this.damages().length;
      };

      Token.prototype.damages = function()
      {
         return Selector.damages(this.store().getState(), this.id());
      };

      Token.prototype.energyCount = function()
      {
         return Selector.energyCount(this.store().getState(), this.id());
      };

      Token.prototype.energyValue = function()
      {
         var value = Selector.energyValue(this.store().getState(), this.id());

         return (value !== undefined ? value : null);
      };

      Token.prototype.equals = function(other)
      {
         return this.id() == other.id() && this.pilotKey() == other.pilotKey();
      };

      Token.prototype.evadeCount = function()
      {
         return Selector.evadeCount(this.store().getState(), this.id());
      };

      Token.prototype.flipDamageCardFacedown = function(damageKey)
      {
         this.removeCriticalDamage(damageKey);
         this.store().dispatch(Action.addTokenDamage(this, damageKey));
      };

      Token.prototype.focusCount = function()
      {
         return Selector.focusCount(this.store().getState(), this.id());
      };

      Token.prototype.hullValue = function()
      {
         return Selector.hullValue(this.store().getState(), this.id());
      };

      Token.prototype.ionCount = function()
      {
         return Selector.ionCount(this.store().getState(), this.id());
      };

      Token.prototype.isCloaked = function()
      {
         return this.cloakCount() > 0;
      };

      Token.prototype.isCriticallyDamagedWith = function(damageKey)
      {
         var criticalDamages = this.criticalDamages();
         return criticalDamages.includes(damageKey);
      };

      Token.prototype.isDestroyed = function()
      {
         return this.totalDamage() >= this.hullValue();
      };

      Token.prototype.isHuge = function()
      {
         return ShipBase.isHuge(this.ship().shipBaseKey) || (this.parent !== undefined);
      };

      Token.prototype.isIonized = function()
      {
         return this.ionCount() > 0;
      };

      Token.prototype.isStressed = function()
      {
         return this.stressCount() > 0;
      };

      Token.prototype.isUpgradedWith = function(upgradeKey)
      {
         return this.upgradeKeys().includes(upgradeKey);
      };

      Token.prototype.maneuver = function()
      {
         return Selector.maneuver(this.store().getState(), this);
      };

      // Token.prototype.maneuverAction = function()
      // {
      //  return Selector.maneuverAction(this.store().getState(), this);
      //    var values = this.store().getState().tokenIdToManeuverAction[this.id()];
      //    return ManeuverAction.get(this.store(), this.id());
      // };

      Token.prototype.name = function()
      {
         var pilotName = this.pilot().name;
         var shipName = this.pilot().shipTeam.ship.name;
         var answer = this.id() + " " + pilotName;

         if (!pilotName.startsWith(shipName))
         {
            answer += " (" + shipName + ")";
         }

         return answer;
      };

      Token.prototype.pilotName = function()
      {
         var answer = this.id() + " ";

         if (this.pilot().isUnique)
         {
            answer += "\u25CF ";
         }

         answer += this.pilot().name;

         return answer;
      };

      Token.prototype.pilotSkillValue = function()
      {
         return Selector.pilotSkillValue(this.store().getState(), this.id());
      };

      Token.prototype.primaryFiringArcKey = function()
      {
         return this.pilot().shipTeam.ship.primaryFiringArcKey;
      };

      Token.prototype.primaryWeaponValue = function()
      {
         var value = Selector.primaryWeaponValue(this.store().getState(), this.id());

         return (value !== undefined ? value : null);
      };

      Token.prototype.receiveCriticalDamage = function(damageKey)
      {
         InputValidator.validateNotNull("damageKey", damageKey);

         if (this.pilotKey() === Pilot.CHEWBACCA)
         {
            this.receiveDamage(damageKey);
         }
         else
         {
            this.store().dispatch(Action.addTokenCriticalDamage(this, damageKey));
            this.store().dispatch(Action.enqueueEvent(Event.RECEIVE_CRITICAL_DAMAGE, this));
         }
      };

      Token.prototype.receiveDamage = function(damageKey)
      {
         InputValidator.validateNotNull("damageKey", damageKey);

         this.store().dispatch(Action.addTokenDamage(this, damageKey));
         this.store().dispatch(Action.enqueueEvent(Event.RECEIVE_DAMAGE, this));
      };

      Token.prototype.receiveStress = function()
      {
         this.store().dispatch(Action.addStressCount(this));
         this.store().dispatch(Action.enqueueEvent(Event.RECEIVE_STRESS, this));
      };

      Token.prototype.recoverShield = function()
      {
         if (this.shieldCount() < this.shieldValue())
         {
            this.store().dispatch(Action.addShieldCount(this));
            this.store().dispatch(Action.enqueueEvent(Event.RECOVER_SHIELD, this));
         }
      };

      Token.prototype.reinforceCount = function()
      {
         return Selector.reinforceCount(this.store().getState(), this.id());
      };

      Token.prototype.removeCriticalDamage = function(damageKey)
      {
         InputValidator.validateNotNull("damageKey", damageKey);

         this.store().dispatch(Action.removeTokenCriticalDamage(this, damageKey));
      };

      Token.prototype.removeShield = function(count)
      {
         if (this.shieldCount() > 0)
         {
            var myCount = (count !== undefined ? count : 1);
            this.store().dispatch(Action.addShieldCount(this, -myCount));
            this.store().dispatch(Action.enqueueEvent(Event.REMOVE_SHIELD, this));
         }
      };

      Token.prototype.removeStress = function()
      {
         if (this.stressCount() > 0)
         {
            this.store().dispatch(Action.addStressCount(this, -1));
            this.store().dispatch(Action.enqueueEvent(Event.REMOVE_STRESS, this));
         }
      };

      Token.prototype.shieldCount = function()
      {
         return Selector.shieldCount(this.store().getState(), this.id());
      };

      Token.prototype.shieldValue = function()
      {
         return Selector.shieldValue(this.store().getState(), this.id());
      };

      Token.prototype.shipActions = function()
      {
         var answer = [];

         var store = this.store();

         if (!this.isCriticallyDamagedWith(DamageCard.DAMAGED_SENSOR_ARRAY_V2))
         {
            if (!this.isCriticallyDamagedWith(DamageCard.DAMAGED_SENSOR_ARRAY))
            {
               answer.vizziniAddAll(this.ship().shipActionKeys);
            }

            if (answer.includes(ShipAction.CLOAK) && this.isCloaked())
            {
               answer.vizziniRemove(ShipAction.CLOAK);
            }

            if (this.isUpgradedWith(UpgradeCard.MIST_HUNTER))
            {
               answer.push(ShipAction.BARREL_ROLL);
            }

            if (this.isUpgradedWith(UpgradeCard.ENGINE_UPGRADE))
            {
               answer.push(ShipAction.BOOST);
            }

            if (this.isUpgradedWith(UpgradeCard.MILLENNIUM_FALCON))
            {
               answer.push(ShipAction.EVADE);
            }

            if (this.isUpgradedWith(UpgradeCard.BROADCAST_ARRAY))
            {
               answer.push(ShipAction.JAM);
            }

            if (this.isUpgradedWith(UpgradeCard.TARGETING_COMPUTER))
            {
               answer.push(ShipAction.TARGET_LOCK);
            }
         }

         return answer;
      };

      Token.prototype.shipName = function()
      {
         return this.pilot().shipTeam.ship.name;
      };

      Token.prototype.stressCount = function()
      {
         return Selector.stressCount(this.store().getState(), this.id());
      };

      Token.prototype.teamName = function()
      {
         return this.pilot().shipTeam.team.name;
      };

      Token.prototype.toString = function()
      {
         return this.name();
      };

      Token.prototype.totalDamage = function()
      {
         var answer = this.damageCount();

         answer += this.criticalDamages().reduce(function(accumulator, currentValue)
         {
            return accumulator + ([DamageCard.DIRECT_HIT, DamageCard.DIRECT_HIT_V2].includes(currentValue) ? 2 : 1);
         }, 0);

         return answer;
      };

      Token.prototype.tractorBeamCount = function()
      {
         return Selector.tractorBeamCount(this.store().getState(), this.id());
      };

      Token.prototype.usableAbilities = function(source, sourceKeys, usedKeys, abilityType, eventOrPhaseKey)
      {
         InputValidator.validateNotNull("source", source);
         InputValidator.validateNotNull("sourceKeys", sourceKeys);
         InputValidator.validateNotNull("usedKeys", usedKeys);
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("eventOrPhaseKey", eventOrPhaseKey);

         var answer = [];
         var store = this.store();

         sourceKeys.forEach(function(sourceKey)
         {
            if (!usedKeys.includes(sourceKey) && abilityType[eventOrPhaseKey] !== undefined && abilityType[eventOrPhaseKey][sourceKey] !== undefined)
            {
               var myAbility = abilityType[eventOrPhaseKey][sourceKey];

               if (myAbility.condition(store, this))
               {
                  answer.push(new Ability(source, sourceKey, abilityType, eventOrPhaseKey));
               }
            }
         }, this);

         return answer;
      };

      Token.prototype.usableAttackerDamageAbilities = function(abilityType, eventOrPhaseKey)
      {
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("eventOrPhaseKey", eventOrPhaseKey);

         var store = this.store();
         var damageKeys = this.criticalDamages();
         var usedDamages = Selector.attackerUsedDamages(store.getState(), this);

         return this.usableAbilities(DamageCard, damageKeys, usedDamages, abilityType, eventOrPhaseKey);
      };

      Token.prototype.usableAttackerPilotAbilities = function(abilityType, eventOrPhaseKey)
      {
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("eventOrPhaseKey", eventOrPhaseKey);

         var store = this.store();
         var pilotKeys = [this.pilotKey()];
         var usedPilots = Selector.attackerUsedPilots(store.getState(), this);

         return this.usableAbilities(Pilot, pilotKeys, usedPilots, abilityType, eventOrPhaseKey);
      };

      Token.prototype.usableAttackerUpgradeAbilities = function(abilityType, eventOrPhaseKey)
      {
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("eventOrPhaseKey", eventOrPhaseKey);

         var store = this.store();
         var upgradeKeys = this.upgradeKeys();
         var usedUpgrades = Selector.attackerUsedUpgrades(store.getState(), this);

         return this.usableAbilities(UpgradeCard, upgradeKeys, usedUpgrades, abilityType, eventOrPhaseKey);
      };

      Token.prototype.usableDamageAbilities = function(abilityType, eventOrPhaseKey)
      {
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("eventOrPhaseKey", eventOrPhaseKey);

         var store = this.store();
         var damageKeys = this.criticalDamages();
         var usedDamages = Selector.usedDamages(store.getState(), this);

         return this.usableAbilities(DamageCard, damageKeys, usedDamages, abilityType, eventOrPhaseKey);
      };

      Token.prototype.usablePilotAbilities = function(abilityType, eventOrPhaseKey)
      {
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("eventOrPhaseKey", eventOrPhaseKey);

         var store = this.store();
         var pilotKeys = [this.pilotKey()];
         var usedPilots = Selector.usedPilots(store.getState(), this);

         return this.usableAbilities(Pilot, pilotKeys, usedPilots, abilityType, eventOrPhaseKey);
      };

      Token.prototype.usableUpgradeAbilities = function(abilityType, eventOrPhaseKey)
      {
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("eventOrPhaseKey", eventOrPhaseKey);

         var store = this.store();
         var upgradeKeys = this.upgradeKeys();
         var usedUpgrades = Selector.usedUpgrades(store.getState(), this);

         return this.usableAbilities(UpgradeCard, upgradeKeys, usedUpgrades, abilityType, eventOrPhaseKey);
      };

      Token.prototype.upgradeKeys = function()
      {
         return Selector.upgrades(this.store().getState(), this.id());
      };

      Token.prototype.upgradeTypeKeys = function()
      {
         var answer = this.pilot().upgradeTypeKeys.slice();

         if (UpgradeCard.valuesByPilotAndType(this.pilotKey(), UpgradeType.TITLE).length > 0)
         {
            answer.unshift(UpgradeType.TITLE);
         }

         if (UpgradeCard.valuesByPilotAndType(this.pilotKey(), UpgradeType.MODIFICATION).length > 0)
         {
            answer.push(UpgradeType.MODIFICATION);

            if (this.isUpgradedWith(UpgradeCard.ROYAL_GUARD_TIE))
            {
               answer.push(UpgradeType.MODIFICATION);
            }
         }

         if (this.isUpgradedWith(UpgradeCard.A_WING_TEST_PILOT))
         {
            answer.push(UpgradeType.ELITE);
         }

         if (this.isUpgradedWith(UpgradeCard.R2_D6))
         {
            answer.push(UpgradeType.ELITE);
         }

         if (this.isUpgradedWith(UpgradeCard.ANDRASTA))
         {
            answer.push(UpgradeType.BOMB);
            answer.push(UpgradeType.BOMB);
         }

         if (this.isUpgradedWith(UpgradeCard.B_WING_E2))
         {
            answer.push(UpgradeType.CREW);
         }

         if (this.isUpgradedWith(UpgradeCard.TANTIVE_IV))
         {
            answer.push(UpgradeType.CREW);
            answer.push(UpgradeType.TEAM);
         }

         if (this.isUpgradedWith(UpgradeCard.BOMB_LOADOUT))
         {
            answer.push(UpgradeType.BOMB);
         }

         if (this.isUpgradedWith(UpgradeCard.SLAVE_I))
         {
            answer.push(UpgradeType.TORPEDO);
         }

         if (this.isUpgradedWith(UpgradeCard.TIE_X1))
         {
            answer.push(UpgradeType.SYSTEM);
         }

         if (this.isUpgradedWith(UpgradeCard.VIRAGO))
         {
            answer.push(UpgradeType.SYSTEM);
            answer.push(UpgradeType.ILLICIT);
         }

         return answer;
      };

      Token.prototype.weaponsDisabledCount = function()
      {
         return Selector.weaponsDisabledCount(this.store().getState(), this.id());
      };

      return Token;
   });
