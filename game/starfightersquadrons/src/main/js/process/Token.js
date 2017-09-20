define(["Ability", "Bearing", "Count", "DamageCard", "Difficulty", "Event", "FiringArc", "Maneuver", "Pilot", "RangeRuler", "ShipAction", "ShipBase", "UpgradeCard", "Value", "Weapon",
  "process/Action", "process/TokenAction"],
   function(Ability, Bearing, Count, DamageCard, Difficulty, Event, FiringArc, Maneuver, Pilot, RangeRuler, ShipAction, ShipBase, UpgradeCard, Value, Weapon,
      Action, TokenAction)
   {
      function Token(store, pilotKeyIn, agent, upgradeKeysIn, idIn, isNewIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("pilotKeyIn", pilotKeyIn);
         InputValidator.validateNotNull("agent", agent);
         // upgradeKeys optional.
         // idIn optional. default: determined from store
         // isNewIn optional. default: true

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

         var id = idIn;

         if (isNaN(id))
         {
            id = store.getState().nextTokenId;
            store.dispatch(TokenAction.incrementNextTokenId());
         }

         this.store = function()
         {
            return store;
         };

         this.id = function()
         {
            return id;
         };

         this.pilot = function()
         {
            return pilot;
         };

         this.pilotKey = function()
         {
            return pilotKey;
         };

         this.agent = function()
         {
            return agent;
         };

         var isNew = (isNewIn !== undefined ? isNewIn : true);

         if (isNew)
         {
            var upgradeKeys = (upgradeKeysIn ? upgradeKeysIn : Immutable.List());
            this._save(upgradeKeys);
         }
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      Token.prototype.agilityValue = function()
      {
         var answer = this.value(Value.AGILITY);

         if (this.isCloaked())
         {
            answer += 2;
         }

         if (this.isUpgradedWith(UpgradeCard.COMMANDER_KENKIRK) && this.shieldCount() === 0 && (this.damageCount() > 0 || this.criticalDamageCount() > 0))
         {
            answer++;
         }

         if (this.isAbilityUsed(UpgradeCard, UpgradeCard.EXPOSE))
         {
            answer--;
         }

         if (this.isAbilityUsed(UpgradeCard, UpgradeCard.R2_F2))
         {
            answer++;
         }

         if (this.tractorBeamCount)
         {
            var tractorBeamCount = this.tractorBeamCount();

            if (tractorBeamCount !== undefined)
            {
               answer -= tractorBeamCount;
            }
         }

         return answer;
      };

      Token.prototype.cloakCount = function()
      {
         return this.count(Count.CLOAK);
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

      Token.prototype.count = function(property)
      {
         InputValidator.validateNotNull("property", property);

         var state = this.state();
         var id = this.id();
         var counts = state.tokenIdToCounts.get(id);
         var answer;

         if (counts)
         {
            answer = counts.get(property);
         }

         return answer;
      };

      Token.prototype.criticalDamageCount = function()
      {
         return this.criticalDamageKeys().size;
      };

      Token.prototype.criticalDamageKeys = function()
      {
         var state = this.state();
         var id = this.id();
         var answer = state.tokenIdToCriticalDamages.get(id);

         return (answer ? answer : Immutable.List());
      };

      Token.prototype.criticalDamages = function()
      {
         return this.criticalDamageKeys().map(function(damageKey)
         {
            return DamageCard.properties[damageKey];
         });
      };

      Token.prototype.damageCount = function()
      {
         return this.damageKeys().size;
      };

      Token.prototype.damageKeys = function()
      {
         var state = this.state();
         var id = this.id();
         var answer = state.tokenIdToDamages.get(id);

         return (answer ? answer : Immutable.List());
      };

      Token.prototype.energyCount = function()
      {
         return this.count(Count.ENERGY);
      };

      Token.prototype.energyValue = function()
      {
         var value = this.value(Value.ENERGY);

         return (value !== undefined ? value : null);
      };

      Token.prototype.equals = function(other)
      {
         var answer = false;

         if (other)
         {
            answer = this.id() == other.id() && this.pilotKey() == other.pilotKey();
         }

         return answer;
      };

      Token.prototype.evadeCount = function()
      {
         return this.count(Count.EVADE);
      };

      Token.prototype.focusCount = function()
      {
         return this.count(Count.FOCUS);
      };

      Token.prototype.hullValue = function()
      {
         return this.value(Value.HULL);
      };

      Token.prototype.ionCount = function()
      {
         return this.count(Count.ION);
      };

      Token.prototype.isAbilityUsed = function(source, sourceKey)
      {
         InputValidator.validateNotNull("source", source);
         InputValidator.validateNotNull("sourceKey", sourceKey);

         var state = this.state();
         var usedAbilities = state.tokenIdToUsedAbilities[this.id()];
         var answer = false;

         for (var i = 0; !answer && i < usedAbilities.length; i++)
         {
            var ability = usedAbilities[i];
            answer = (ability.source() === source && ability.sourceKey() === sourceKey);
         }

         return answer;
      };

      Token.prototype.isCloaked = function()
      {
         return this.cloakCount() > 0;
      };

      Token.prototype.isCriticallyDamagedWith = function(damageKey)
      {
         var criticalDamageKeys = this.criticalDamageKeys();

         return criticalDamageKeys.includes(damageKey);
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

      Token.prototype.isPerRoundAbilityUsed = function(source, sourceKey)
      {
         InputValidator.validateNotNull("source", source);
         InputValidator.validateNotNull("sourceKey", sourceKey);

         var state = this.state();
         var usedAbilities = state.tokenIdToUsedPerRoundAbilities[this.id()];
         var answer = false;

         for (var i = 0; !answer && i < usedAbilities.length; i++)
         {
            var ability = usedAbilities[i];
            answer = (ability.source() === source && ability.sourceKey() === sourceKey);
         }

         return answer;
      };

      Token.prototype.isStressed = function()
      {
         return this.stressCount() > 0;
      };

      Token.prototype.isUpgradedWith = function(upgradeKey)
      {
         return this.upgradeKeys().includes(upgradeKey);
      };

      Token.prototype.maneuverKeys = function()
      {
         var answer;

         if (this.isIonized())
         {
            answer = [Maneuver.STRAIGHT_1_STANDARD];
         }
         else
         {
            var ship = this.ship();
            answer = ship.maneuverKeys.slice();

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
               answer = this._changeBearingManeuversToDifficulty(answer, Bearing.TURN_LEFT, Difficulty.HARD);
               answer = this._changeBearingManeuversToDifficulty(answer, Bearing.TURN_RIGHT, Difficulty.HARD);
            }

            if (this.pilotKey() === Pilot.ELLO_ASTY && !this.isStressed())
            {
               answer = this._changeBearingManeuversToDifficulty(answer, Bearing.TALLON_ROLL_LEFT, Difficulty.STANDARD);
               answer = this._changeBearingManeuversToDifficulty(answer, Bearing.TALLON_ROLL_RIGHT, Difficulty.STANDARD);
            }

            if (this.isUpgradedWith(UpgradeCard.NIEN_NUNB))
            {
               answer = this._changeBearingManeuversToDifficulty(answer, Bearing.STRAIGHT, Difficulty.EASY);
            }

            if (this.isUpgradedWith(UpgradeCard.R2_ASTROMECH))
            {
               answer = this._changeSpeedManeuversToDifficulty(answer, 1, Difficulty.EASY);
               answer = this._changeSpeedManeuversToDifficulty(answer, 2, Difficulty.EASY);
            }

            if (this.isUpgradedWith(UpgradeCard.TWIN_ION_ENGINE_MK_II))
            {
               answer = this._changeBearingManeuversToDifficulty(answer, Bearing.BANK_LEFT, Difficulty.EASY);
               answer = this._changeBearingManeuversToDifficulty(answer, Bearing.BANK_RIGHT, Difficulty.EASY);
            }

            if (this.isUpgradedWith(UpgradeCard.UNHINGED_ASTROMECH))
            {
               answer = this._changeSpeedManeuversToDifficulty(answer, 3, Difficulty.EASY);
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
            answer += "\u2022 ";
         }

         answer += this.pilot().name;

         return answer;
      };

      Token.prototype.pilotSkillValue = function()
      {
         var answer = this.value(Value.PILOT_SKILL);

         if (this.pilotKey() === Pilot.EPSILON_ACE)
         {
            var damageCount = this.damageCount();
            var criticalDamageCount = this.criticalDamageCount();
            if (damageCount === 0 && criticalDamageCount === 0)
            {
               answer = 12;
            }
         }

         if (this.isCriticallyDamagedWith(DamageCard.DAMAGED_COCKPIT) || this.isCriticallyDamagedWith(DamageCard.INJURED_PILOT))
         {
            answer = 0;
         }

         return answer;
      };

      Token.prototype.primaryWeapon = function()
      {
         var state = this.state();
         var id = this.id();

         return state.tokenIdToPrimaryWeapon.get(id);
      };

      Token.prototype.primaryWeaponValue = function()
      {
         var answer = this.value(Value.PRIMARY_WEAPON);

         if (this.isAbilityUsed(UpgradeCard, UpgradeCard.EXPOSE))
         {
            answer++;
         }

         return answer;
      };

      Token.prototype.reinforceCount = function()
      {
         return this.count(Count.REINFORCE);
      };

      Token.prototype.secondaryWeapons = function()
      {
         var state = this.state();
         var id = this.id();
         var answer = state.tokenIdToSecondaryWeapons.get(id);

         return (answer !== undefined ? answer : Immutable.List());
      };

      Token.prototype.shieldCount = function()
      {
         return this.count(Count.SHIELD);
      };

      Token.prototype.shieldValue = function()
      {
         return this.value(Value.SHIELD);
      };

      Token.prototype.ship = function()
      {
         var pilot = this.pilot();
         var ship = pilot.shipTeam.ship;

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

         return ship;
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

      Token.prototype.shipState = function(property)
      {
         InputValidator.validateNotNull("property", property);

         var propertyName = property + "Value";
         var pilot = this.pilot();
         var ship = this.ship();
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

      Token.prototype.squadPointCost = function()
      {
         var answer = this.upgrades().reduce(function(accumulator, upgrade)
         {
            return accumulator + upgrade.squadPointCost;
         }, this.pilot().squadPointCost);

         return answer;
      };

      Token.prototype.state = function()
      {
         var store = this.store();

         return store.getState();
      };

      Token.prototype.stressCount = function()
      {
         return this.count(Count.STRESS);
      };

      Token.prototype.toString = function()
      {
         return this.name();
      };

      Token.prototype.totalDamage = function()
      {
         var answer = this.damageCount();

         answer += this.criticalDamageKeys().reduce(function(accumulator, currentValue)
         {
            return accumulator + ([DamageCard.DIRECT_HIT, DamageCard.DIRECT_HIT_V2].includes(currentValue) ? 2 : 1);
         }, 0);

         return answer;
      };

      Token.prototype.tractorBeamCount = function()
      {
         return this.count(Count.TRACTOR_BEAM);
      };

      Token.prototype.upgradeKeys = function()
      {
         var state = this.state();
         var id = this.id();
         var answer = state.tokenIdToUpgrades.get(id);

         return (answer !== undefined ? answer : Immutable.List());
      };

      Token.prototype.upgrades = function()
      {
         return this.upgradeKeys().map(function(upgradeKey)
         {
            return UpgradeCard.properties[upgradeKey];
         });
      };

      Token.prototype.usableAbilities = function(source, sourceKeys, usedKeys, abilityType, abilityKey)
      {
         InputValidator.validateNotNull("source", source);
         InputValidator.validateNotNull("sourceKeys", sourceKeys);
         InputValidator.validateNotNull("usedKeys", usedKeys);
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("abilityKey", abilityKey);

         var answer = [];
         var store = this.store();

         sourceKeys.forEach(function(sourceKey)
         {
            if (!usedKeys.includes(sourceKey) && abilityType[abilityKey] !== undefined && abilityType[abilityKey][sourceKey] !== undefined)
            {
               var myAbility = abilityType[abilityKey][sourceKey];

               if (myAbility.condition(store, this))
               {
                  answer.push(new Ability(source, sourceKey, abilityType, abilityKey));
               }
            }
         }, this);

         return answer;
      };

      Token.prototype.usableDamageAbilities = function(abilityType, abilityKey)
      {
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("abilityKey", abilityKey);

         var store = this.store();
         var sourceKeys = this.criticalDamageKeys();
         var usedKeys = this.usedAbilityKeys(DamageCard);
         usedKeys = usedKeys.concat(this.usedPerRoundAbilityKeys(DamageCard));

         return this.usableAbilities(DamageCard, sourceKeys, usedKeys, abilityType, abilityKey);
      };

      Token.prototype.usablePilotAbilities = function(abilityType, abilityKey)
      {
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("abilityKey", abilityKey);

         var store = this.store();
         var sourceKeys = [this.pilotKey()];
         var usedKeys = this.usedAbilityKeys(Pilot);
         usedKeys = usedKeys.concat(this.usedPerRoundAbilityKeys(Pilot));

         return this.usableAbilities(Pilot, sourceKeys, usedKeys, abilityType, abilityKey);
      };

      Token.prototype.usableUpgradeAbilities = function(abilityType, abilityKey)
      {
         InputValidator.validateNotNull("abilityType", abilityType);
         InputValidator.validateNotNull("abilityKey", abilityKey);

         var store = this.store();
         var sourceKeys = this.upgradeKeys();
         var usedKeys = this.usedAbilityKeys(UpgradeCard);
         usedKeys = usedKeys.concat(this.usedPerRoundAbilityKeys(UpgradeCard));

         return this.usableAbilities(UpgradeCard, sourceKeys, usedKeys, abilityType, abilityKey);
      };

      Token.prototype.usedAbilities = function(source, sourceKey)
      {
         var state = this.state();
         var answer = state.tokenIdToUsedAbilities[this.id()];

         if (source)
         {
            var usedAbilities = answer;
            answer = [];

            for (var i = 0; i < usedAbilities.length; i++)
            {
               var ability = usedAbilities[i];

               if (ability.source() === source && (sourceKey === undefined || ability.sourceKey() === sourceKey))
               {
                  answer.push(ability);
               }
            }
         }

         return (answer !== undefined ? answer : []);
      };

      Token.prototype.usedAbilityKeys = function(source, sourceKey)
      {
         var state = this.state();
         var answer = [];
         var usedAbilities = state.tokenIdToUsedAbilities[this.id()];

         for (var i = 0; i < usedAbilities.length; i++)
         {
            var ability = usedAbilities[i];

            if ((source === undefined || ability.source() === source) && (sourceKey === undefined || ability.sourceKey() === sourceKey))
            {
               answer.push(ability.sourceKey());
            }
         }

         return answer;
      };

      Token.prototype.usedPerRoundAbilities = function(source, sourceKey)
      {
         var state = this.state();
         var answer = state.tokenIdToUsedPerRoundAbilities[this.id()];

         if (source)
         {
            var usedAbilities = answer;
            answer = [];

            for (var i = 0; i < usedAbilities.length; i++)
            {
               var ability = usedAbilities[i];

               if (ability.source() === source && (sourceKey === undefined || ability.sourceKey() === sourceKey))
               {
                  answer.push(ability);
               }
            }
         }

         return (answer !== undefined ? answer : []);
      };

      Token.prototype.usedPerRoundAbilityKeys = function(source, sourceKey)
      {
         var state = this.state();
         var answer = [];
         var usedAbilities = state.tokenIdToUsedPerRoundAbilities[this.id()];

         for (var i = 0; i < usedAbilities.length; i++)
         {
            var ability = usedAbilities[i];

            if ((source === undefined || ability.source() === source) && (sourceKey === undefined || ability.sourceKey() === sourceKey))
            {
               answer.push(ability.sourceKey());
            }
         }

         return answer;
      };

      Token.prototype.value = function(property)
      {
         InputValidator.validateNotNull("property", property);

         var propertyName = property + "Value";
         var pilot = this.pilot();
         var answer = pilot[propertyName];

         if (answer === undefined)
         {
            var ship = this.ship();

            if (ship.fore)
            {
               ship = ship.fore;
            }

            answer = ship[propertyName];
         }

         this.upgrades().forEach(function(upgrade)
         {
            if (upgrade[propertyName] !== undefined)
            {
               answer += upgrade[propertyName];
            }
         });

         this.criticalDamages().forEach(function(damage)
         {
            if (damage[propertyName] !== undefined)
            {
               answer += damage[propertyName];
            }
         });

         return answer;
      };

      Token.prototype.weaponsDisabledCount = function()
      {
         return this.count(Count.WEAPONS_DISABLED);
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      Token.prototype.discardUpgrade = function(upgradeKey)
      {
         InputValidator.validateNotNull("upgradeKey", upgradeKey);

         var store = this.store();
         store.dispatch(TokenAction.removeTokenUpgrade(this, upgradeKey));
         var upgrade = UpgradeCard.properties[upgradeKey];

         if (upgrade.weaponValue !== undefined)
         {
            var secondaryWeapons = this.secondaryWeapons();

            for (var i = 0; i < secondaryWeapons.size; i++)
            {
               var weapon = secondaryWeapons.get(i);

               if (weapon.upgradeKey() === upgradeKey)
               {
                  store.dispatch(TokenAction.removeSecondaryWeapon(this, weapon));
               }
            }
         }
      };

      Token.prototype.flipDamageCardFacedown = function(damageKey)
      {
         InputValidator.validateNotNull("damageKey", damageKey);

         this.removeCriticalDamage(damageKey);
         this.store().dispatch(TokenAction.addTokenDamage(this, damageKey));
      };

      Token.prototype.receiveCriticalDamage = function(damageKey)
      {
         InputValidator.validateNotNull("damageKey", damageKey);

         LOGGER.info("Token.receiveCriticalDamage() damageKey = " + damageKey);

         if (this.pilotKey() === Pilot.CHEWBACCA)
         {
            this.receiveDamage(damageKey);
         }
         else
         {
            this.store().dispatch(TokenAction.addTokenCriticalDamage(this, damageKey));
            var eventContext = {
               damageKey: damageKey,
            };
            this.store().dispatch(Action.enqueueEvent(Event.RECEIVE_CRITICAL_DAMAGE, this, undefined, eventContext));
         }
      };

      Token.prototype.receiveDamage = function(damageKey)
      {
         InputValidator.validateNotNull("damageKey", damageKey);

         this.store().dispatch(TokenAction.addTokenDamage(this, damageKey));
         var eventContext = {
            damageKey: damageKey,
         };
         this.store().dispatch(Action.enqueueEvent(Event.RECEIVE_DAMAGE, this, undefined, eventContext));
      };

      Token.prototype.receiveStress = function()
      {
         this.store().dispatch(TokenAction.addStressCount(this));
         this.store().dispatch(Action.enqueueEvent(Event.RECEIVE_STRESS, this));
      };

      Token.prototype.recoverShield = function()
      {
         if (this.shieldCount() < this.shieldValue())
         {
            this.store().dispatch(TokenAction.addShieldCount(this));
            this.store().dispatch(Action.enqueueEvent(Event.RECOVER_SHIELD, this));
         }
      };

      Token.prototype.removeCriticalDamage = function(damageKey)
      {
         InputValidator.validateNotNull("damageKey", damageKey);

         this.store().dispatch(TokenAction.removeTokenCriticalDamage(this, damageKey));
      };

      Token.prototype.removeShield = function(count)
      {
         if (this.shieldCount() > 0)
         {
            var myCount = (count !== undefined ? count : 1);
            this.store().dispatch(TokenAction.addShieldCount(this, -myCount));
            this.store().dispatch(Action.enqueueEvent(Event.REMOVE_SHIELD, this));
         }
      };

      Token.prototype.removeStress = function()
      {
         if (this.stressCount() > 0)
         {
            this.store().dispatch(TokenAction.addStressCount(this, -1));
            this.store().dispatch(Action.enqueueEvent(Event.REMOVE_STRESS, this));
         }
      };

      Token.prototype._save = function(upgradeKeys)
      {
         InputValidator.validateNotNull("upgradeKeys", upgradeKeys);

         var store = this.store();
         var id = this.id();
         var pilotKey = this.pilotKey();
         var agent = this.agent();

         store.dispatch(TokenAction.setToken(id, pilotKey, agent));

         upgradeKeys.forEach(function(upgradeKey)
         {
            store.dispatch(TokenAction.addTokenUpgrade(this, upgradeKey));
         }, this);

         Count.values().forEach(function(property)
         {
            var value;

            switch (property)
            {
               case Count.ENERGY:
                  value = this.shipState(Value.ENERGY);
                  store.dispatch(TokenAction.setEnergyCount(this, value));
                  break;
               case Count.SHIELD:
                  value = this.shipState(Value.SHIELD);
                  store.dispatch(TokenAction.setShieldCount(this, value));
                  break;
               default:
                  store.dispatch(TokenAction.setCount(this, property));
            }
         }, this);

         if (this.shipState(Value.PRIMARY_WEAPON) !== null)
         {
            var primaryWeapon = this._createPrimaryWeapon();
            store.dispatch(TokenAction.setPrimaryWeapon(this, primaryWeapon));
         }

         // Initialize the upgrades.
         this.upgrades().forEach(function(upgrade)
         {
            if (upgrade.weaponValue)
            {
               var weapon = this._createSecondaryWeapon(upgrade);
               store.dispatch(TokenAction.addSecondaryWeapon(this, weapon));
            }
         }, this);

         store.dispatch(TokenAction.clearTokenUsedAbilities(this));
         store.dispatch(TokenAction.clearTokenUsedPerRoundAbilities(this));
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      Token.prototype.newInstance = function(store, agent)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("agent", agent);

         var pilotKey = this.pilotKey();
         var answer = new Token(store, pilotKey, agent);

         this.upgrades().forEach(function(upgrade)
         {
            store.dispatch(TokenAction.addTokenUpgrade(answer, upgrade.value));

            if (upgrade.weaponValue)
            {
               store.dispatch(TokenAction.addSecondaryWeapon(answer, this._createSecondaryWeapon(upgrade)));
            }
         }, this);

         return answer;
      };

      Token.prototype._changeBearingManeuversToDifficulty = function(maneuverKeys, bearingKey, difficultyKey)
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
      };

      Token.prototype._changeSpeedManeuversToDifficulty = function(maneuverKeys, speed, difficultyKey)
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
      };

      Token.prototype._createPrimaryWeapon = function()
      {
         var primaryWeaponValue = this.shipState(Value.PRIMARY_WEAPON);
         var ship = this.ship();

         return new Weapon("Primary Weapon", primaryWeaponValue, ship.primaryWeaponRanges, ship.primaryFiringArcKey, ship.auxiliaryFiringArcKey, ship.isPrimaryWeaponTurret);
      };

      Token.prototype._createSecondaryWeapon = function(upgrade)
      {
         return new Weapon(upgrade.name, upgrade.weaponValue, upgrade.rangeKeys, upgrade.firingArcKey, undefined,
            upgrade.isWeaponTurret, upgrade.value);
      };

      Token.get = function(store, id)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("id", id);

         var values = store.getState().tokens.get(id);
         var answer;

         if (values !== undefined)
         {
            var pilotKey = values.get("pilotKey");

            if (pilotKey.endsWith(".fore"))
            {
               pilotKey = pilotKey.substring(0, pilotKey.length - ".fore".length);
               pilotKey = Pilot.properties[pilotKey].fore;
            }
            else if (pilotKey.endsWith(".aft"))
            {
               pilotKey = pilotKey.substring(0, pilotKey.length - ".aft".length);
               pilotKey = Pilot.properties[pilotKey].aft;
            }

            var agent = values.get("agent");
            var upgradeKeys = store.getState().tokenIdToUpgrades.get(id);
            var isNew = false;

            answer = new Token(store, pilotKey, agent, upgradeKeys, id, isNew);
         }

         return answer;
      };

      return Token;
   });
