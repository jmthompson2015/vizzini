/*
 * Provides a token for Starfighter Squadrons. Can pass upgrade cards after the first two arguments.
 */
define([ "Bearing", "DamageCard", "Difficulty", "FiringArc", "Maneuver", "Phase", "Pilot", "RangeRuler", "Ship",
        "ShipAction", "ShipTeam", "UpgradeCard", "UpgradeType", "Weapon" ], function(Bearing, DamageCard, Difficulty,
        FiringArc, Maneuver, Phase, Pilot, RangeRuler, Ship, ShipAction, ShipTeam, UpgradeCard, UpgradeType, Weapon)
{
    function Token(pilotKey, agent)
    {
        InputValidator.validateNotNull("pilotKey", pilotKey);
        InputValidator.validateNotNull("agent", agent);

        this.pilotKey = function()
        {
            return pilotKey;
        }

        this.agent = function()
        {
            return agent;
        }

        var that = this;
        var id = Token.nextId();
        var pilot = Pilot.properties[pilotKey];
        var shipTeam = ShipTeam.properties[pilot.shipTeam];
        var ship = Ship.properties[shipTeam.ship];

        var cloakCount = new Token.Count();
        cloakCount.bind("change", function()
        {
            that.trigger("change");
        });
        var criticalDamages = [];
        var damages = [];
        var evadeCount = new Token.Count();
        evadeCount.bind("change", function()
        {
            that.trigger("change");
        });
        var focusCount = new Token.Count();
        focusCount.bind("change", function()
        {
            that.trigger("change");
        });
        var ionCount = new Token.Count();
        ionCount.bind("change", function()
        {
            that.trigger("change");
        });
        var shieldCount = new Token.Count(pilot.shipState.shieldValue());
        shieldCount.bind("change", function()
        {
            that.trigger("change");
        });
        var stressCount = new Token.Count();
        stressCount.bind("change", function()
        {
            that.trigger("change");
        });
        var weaponsDisabledCount = new Token.Count();
        weaponsDisabledCount.bind("change", function()
        {
            that.trigger("change");
        });
        var primaryWeapon = createPrimaryWeapon();
        var secondaryWeapons = [];
        var attackerTargetLocks = [];
        var defenderTargetLocks = [];

        // Initialize the upgrades.
        var upgradeKeys = [];

        for (var i = 2; i < arguments.length; i++)
        {
            var upgradeKey = arguments[i];
            upgradeKeys.push(upgradeKey);
            var upgrade = UpgradeCard.properties[upgradeKey];

            if (upgrade.weaponValue)
            {
                secondaryWeapons.push(createSecondaryWeapon(upgrade));
            }
        }

        var activationState = new Token.ActivationState();
        var combatState = new Token.CombatState();

        this.activationState = function()
        {
            return activationState;
        }

        this.addAttackerTargetLock = function(targetLock)
        {
            InputValidator.validateNotNull("targetLock", targetLock);

            if (attackerTargetLocks.length > 0)
            {
                // Remove previous target lock.
                var previous = attackerTargetLocks[0];
                previous.defender().removeDefenderTargetLock(previous);
                this.removeAttackerTargetLock(previous);
            }

            attackerTargetLocks.push(targetLock);
            this.trigger("change");
        }

        this.addDefenderTargetLock = function(targetLock)
        {
            InputValidator.validateNotNull("targetLock", targetLock);

            defenderTargetLocks.push(targetLock);
            this.trigger("change");
        }

        this.agilityValue = function()
        {
            var answer = getShipState().agilityValue();

            upgradeKeys.forEach(function(upgradeKey)
            {
                var shipState = UpgradeCard.properties[upgradeKey].shipState;

                if (shipState)
                {
                    answer += shipState.agilityValue();
                }
            });

            return answer;
        }

        this.attackerTargetLocks = function()
        {
            return attackerTargetLocks.slice();
        }

        this.cloak = function()
        {
            return cloakCount;
        }

        this.combatState = function()
        {
            return combatState;
        }

        this.criticalDamageCount = function()
        {
            return criticalDamages.length;
        }

        this.criticalDamages = function()
        {
            return criticalDamages;
        }

        this.damageCount = function()
        {
            return damages.length;
        }

        this.damages = function()
        {
            return damages;
        }

        this.defenderTargetLocks = function()
        {
            return defenderTargetLocks.slice();
        }

        this.discardUpgrade = function(upgradeKey)
        {
            InputValidator.validateNotNull("upgradeKey", upgradeKey);

            upgradeKeys.vizziniRemove(upgradeKey);
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
        }

        this.equals = function(other)
        {
            return id == other.id() && pilotKey == other.pilotKey();
        }

        this.evade = function()
        {
            return evadeCount;
        }

        this.findTargetLockByDefender = function(defender)
        {
            var answer;

            for (var i = 0; i < attackerTargetLocks.length; i++)
            {
                var targetLock = attackerTargetLocks[i];

                if (targetLock.defender() === defender)
                {
                    answer = targetLock;
                    break;
                }
            }

            return answer;
        }

        this.focus = function()
        {
            return focusCount;
        }

        this.hullValue = function()
        {
            var answer = getShipState().hullValue();

            answer = criticalDamages.reduce(function(sum, damageKey)
            {
                return sum + DamageCard.properties[damageKey].shipState.hullValue();
            }, answer);

            upgradeKeys.forEach(function(upgradeKey)
            {
                var shipState = UpgradeCard.properties[upgradeKey].shipState;

                if (shipState)
                {
                    answer += shipState.hullValue();
                }
            });

            return Math.max(answer, 0);
        }

        this.id = function()
        {
            return id;
        }

        this.ion = function()
        {
            return ionCount;
        }

        this.maneuverEffect = function(maneuverKey)
        {
            LOGGER.trace("Token.maneuverEffect() start");
            InputValidator.validateNotNull("maneuverKey", maneuverKey);

            var difficulty = Maneuver.properties[maneuverKey].difficulty;
            LOGGER.trace("difficulty = " + difficulty);

            if (difficulty === Difficulty.EASY)
            {
                LOGGER.trace("calling that.stress().decrease()")
                that.stress().decrease();
            }
            else if (difficulty === Difficulty.HARD)
            {
                LOGGER.trace("calling stress().increase() for " + that.toString());
                that.stress().increase();
            }

            LOGGER.trace("Token.maneuverEffect() end");
        }

        this.maneuverKeys = function()
        {
            var answer = ship.maneuvers.slice();

            if (this.isCriticallyDamagedWith(DamageCard.DAMAGED_ENGINE))
            {
                answer = changeBearingManeuversToDifficulty(answer, Bearing.TURN_LEFT, Difficulty.HARD);
                answer = changeBearingManeuversToDifficulty(answer, Bearing.TURN_RIGHT, Difficulty.HARD);
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

            if (this.isStressed())
            {
                answer = answer.filter(function(maneuverKey)
                {
                    return Maneuver.properties[maneuverKey].difficulty !== Difficulty.HARD;
                });
            }

            return answer;
        }

        this.name = function()
        {
            var pilotName = pilot.name;
            var shipName = ship.name;

            return id + " " + pilotName + " (" + shipName + ")";
        }

        this.newInstance = function(agent)
        {
            var answer = new Token(pilotKey, agent);

            upgradeKeys.forEach(function(upgradeKey)
            {
                answer.upgradeKeys().push(upgradeKey);
                var upgrade = UpgradeCard.properties[upgradeKey];

                if (upgrade.weaponValue)
                {
                    answer.secondaryWeapons().push(createSecondaryWeapon(upgrade));
                }
            });

            return answer;
        }

        this.phaseEffect = function(environment, phase)
        {
            LOGGER.trace("Token.phaseEffect() phase = " + phase);
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("phase", phase);

            switch (phase)
            {
            case Phase.ACTIVATION_START:
                activationState.clear();
                break;
            case Phase.COMBAT_START:
                combatState.clear();
                break;
            }

            // Pilot.
            // pilot.phaseEffect(environment, this, phase);

            // Damages.
            // var criticalDamages = getCriticalDamages();
            //
            // for (var i = 0; i < criticalDamages.length; i++)
            // {
            // var damage = criticalDamages[i];
            // damage.phaseEffect(source, oldValue, newValue);
            // }

            // Upgrades.
            // final UpgradeCardList myUpgrades = new
            // UpgradeCardList(upgrades());
            //
            // for (final UpgradeCard upgrade : myUpgrades)
            // {
            // upgrade.phaseEffect(environment, this, phase);
            // }
        }

        this.pilotSkillValue = function()
        {
            var answer;

            if (pilotKey === Pilot.EPSILON_ACE && this.damageCount() === 0 && criticalDamageCount() === 0)
            {
                answer = 12;
            }
            else
            {
                if (this.isCriticallyDamagedWith(DamageCard.DAMAGED_COCKPIT))
                {
                    answer = 0;
                }
                else if (this.isCriticallyDamagedWith(DamageCard.INJURED_PILOT))
                {
                    answer = 0;
                }
                else
                {
                    answer = getShipState().pilotSkillValue();
                }

                answer = criticalDamages.reduce(function(sum, damageKey)
                {
                    return sum + DamageCard.properties[damageKey].shipState.pilotSkillValue();
                }, answer);

                upgradeKeys.forEach(function(upgradeKey)
                {
                    var shipState = UpgradeCard.properties[upgradeKey].shipState;

                    if (shipState)
                    {
                        answer += shipState.pilotSkillValue();
                    }
                });
            }

            return Math.max(answer, 0);
        }

        this.pilotName = function()
        {
            var properties = pilot;
            var isUnique = properties.isUnique;
            var answer = id + " ";

            if (isUnique)
            {
                answer += "\u25CF ";
            }

            answer += properties.name;

            return answer;
        }

        this.primaryFiringArc = function()
        {
            return ship.primaryFiringArc;
        }

        this.primaryWeapon = function()
        {
            return primaryWeapon;
        }

        this.primaryWeaponValue = function()
        {
            var answer = getShipState().primaryWeaponValue();

            answer = criticalDamages.reduce(function(sum, damageKey)
            {
                return sum + DamageCard.properties[damageKey].shipState.primaryWeaponValue();
            }, answer);

            upgradeKeys.forEach(function(upgradeKey)
            {
                var shipState = UpgradeCard.properties[upgradeKey].shipState;

                if (shipState)
                {
                    answer += shipState.primaryWeaponValue();
                }
            });

            return Math.max(answer, 0);
        }

        this.removeAllTargetLocks = function()
        {
            // Remove target locks which have this as the defender.
            var targetLocks = this.defenderTargetLocks();
            targetLocks.forEach(function(targetLock)
            {
                var attacker = targetLock.attacker();
                attacker.removeAttackerTargetLock(targetLock);
                this.removeDefenderTargetLock(targetLock);
            }, this);

            // Remove target locks in which this is the attacker.
            var targetLocks = this.attackerTargetLocks();
            targetLocks.forEach(function(targetLock)
            {
                var defender = targetLock.defender();
                this.removeAttackerTargetLock(targetLock);
                defender.removeDefenderTargetLock(targetLock);
            }, this);
        }

        this.removeAttackerTargetLock = function(targetLock)
        {
            InputValidator.validateNotNull("targetLock", targetLock);

            attackerTargetLocks.vizziniRemove(targetLock);
            this.trigger("change");
        }

        this.removeDefenderTargetLock = function(targetLock)
        {
            InputValidator.validateNotNull("targetLock", targetLock);

            defenderTargetLocks.vizziniRemove(targetLock);
            this.trigger("change");
        }

        this.secondaryWeapons = function()
        {
            return secondaryWeapons;
        }

        this.shield = function()
        {
            return shieldCount;
        }

        this.shieldValue = function()
        {
            var answer = getShipState().shieldValue();

            upgradeKeys.forEach(function(upgradeKey)
            {
                var shipState = UpgradeCard.properties[upgradeKey].shipState;

                if (shipState)
                {
                    answer += shipState.shieldValue();
                }
            });

            return answer;
        }

        this.shipKey = function()
        {
            return shipTeam.ship;
        }

        this.shipBaseKey = function()
        {
            return ship.shipBase;
        }

        this.shipName = function()
        {
            return ship.name;
        }

        this.shipTeamKey = function()
        {
            return pilot.shipTeam;
        }

        this.stress = function()
        {
            return stressCount;
        }

        this.teamKey = function()
        {
            return shipTeam.team;
        }

        this.teamName = function()
        {
            return Team.properties[this.teamKey()].name;
        }

        this.upgradeKeys = function()
        {
            return upgradeKeys;
        }

        this.upgradeTypeKeys = function()
        {
            var answer = pilot.upgradeTypes.slice();

            if (UpgradeCard.valuesByPilotAndType(pilotKey, UpgradeType.TITLE).length > 0)
            {
                answer.unshift(UpgradeType.TITLE);
            }

            if (UpgradeCard.valuesByPilotAndType(pilotKey, UpgradeType.MODIFICATION).length > 0)
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

            if (this.isUpgradedWith(UpgradeCard.ANDRASTA))
            {
                answer.push(UpgradeType.BOMB);
                answer.push(UpgradeType.BOMB);
            }

            if (this.isUpgradedWith(UpgradeCard.B_WING_E2))
            {
                answer.push(UpgradeType.CREW);
            }

            if (this.isUpgradedWith(UpgradeCard.BOMB_LOADOUT))
            {
                answer.push(UpgradeType.BOMB);
            }

            if (this.isUpgradedWith(UpgradeCard.SLAVE_I))
            {
                answer.push(UpgradeType.TORPEDO);
            }

            if (this.isUpgradedWith(UpgradeCard.VIRAGO))
            {
                answer.push(UpgradeType.SYSTEM);
                answer.push(UpgradeType.ILLICIT);
            }

            return answer;
        }

        this.weaponsDisabled = function()
        {
            return weaponsDisabledCount;
        }

        function changeBearingManeuversToDifficulty(maneuvers, bearing, difficulty)
        {
            return maneuvers.map(function(maneuverKey)
            {
                var properties = Maneuver.properties[maneuverKey];
                var myBearing = properties.bearing;

                if (myBearing === bearing)
                {
                    var speed = properties.speed;
                    var answer = Maneuver.find(bearing, speed, difficulty);
                    if (!answer) { throw "Unknown maneuver: " + bearing + " " + speed + " " + difficulty; }
                    return answer;
                }
                else
                {
                    return maneuverKey;
                }
            });
        }

        function changeSpeedManeuversToDifficulty(maneuvers, speed, difficulty)
        {
            return maneuvers.map(function(maneuverKey)
            {
                var properties = Maneuver.properties[maneuverKey];
                var mySpeed = properties.speed;

                if (mySpeed === speed)
                {
                    var bearing = properties.bearing;
                    var answer = Maneuver.find(bearing, speed, difficulty);
                    if (!answer) { throw "Unknown maneuver: " + bearing + " " + speed + " " + difficulty; }
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
            var shipState = pilot.shipState;

            return new Weapon("Primary Weapon", shipState.primaryWeaponValue(), [ RangeRuler.ONE, RangeRuler.TWO,
                    RangeRuler.THREE ], ship.primaryFiringArc);
        }

        function createSecondaryWeapon(upgrade)
        {
            return new Weapon(upgrade.name, upgrade.weaponValue, upgrade.ranges, upgrade.firingArc, upgrade.value);
        }

        function getShipState()
        {
            return pilot.shipState;
        }
    }

    Token.nextIdValue = 1;

    Token.nextId = function()
    {
        return Token.nextIdValue++;
    }

    Token.resetNextId = function()
    {
        Token.nextIdValue = 1;
    }

    Token.prototype.addCriticalDamage = function(damageKey)
    {
        if (this.pilotKey() === Pilot.CHEWBACCA)
        {
            this.addDamage(damageKey);
        }
        else
        {
            var criticalDamages = this.criticalDamages();
            criticalDamages.push(damageKey);
            this.trigger("change");
        }
    }

    Token.prototype.addDamage = function(damageKey)
    {
        var damages = this.damages();
        damages.push(damageKey);
        this.trigger("change");
    }

    Token.prototype.computeAttackDiceCount = function(environment, weapon, defender, range)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("range", range);

        var answer;

        if (this.isCriticallyDamagedWith(DamageCard.BLINDED_PILOT))
        {
            answer = 0;
            this.flipDamageCardFacedown(DamageCard.BLINDED_PILOT);
        }
        else
        {
            answer = weapon.weaponValue();

            if ((range === RangeRuler.ONE) && weapon.isPrimary())
            {
                // Bonus attack die at range one.
                answer++;
            }

            if (this.pilotKey() === Pilot.EADEN_VRILL && weapon.isPrimary() && defender.isStressed())
            {
                answer++;
            }

            if (weapon.upgradeKey() === UpgradeCard.PROTON_ROCKETS)
            {
                answer += Math.min(this.agilityValue(), 3);
            }
        }

        return answer;
    }

    Token.prototype.computeDefenseDiceCount = function(weapon, range)
    {
        var answer = this.agilityValue();

        if ((range == RangeRuler.THREE) && weapon.isPrimary())
        {
            // Bonus defense die at range three.
            answer++;
        }

        return answer;
    }

    Token.prototype.flipDamageCardFacedown = function(damageKey)
    {
        this.removeCriticalDamage(damageKey);
        this.addDamage(damageKey);
    }

    Token.prototype.isCloaked = function()
    {
        return this.cloak().count() > 0;
    }

    Token.prototype.isCriticallyDamagedWith = function(damageKey)
    {
        var criticalDamages = this.criticalDamages();
        return criticalDamages.vizziniContains(damageKey);
    }

    Token.prototype.isDestroyed = function()
    {
        return (this.damageCount() + this.criticalDamageCount()) >= this.hullValue();
    }

    Token.prototype.isStressed = function()
    {
        return this.stress().count() > 0;
    }

    Token.prototype.isUpgradedWith = function(upgradeKey)
    {
        return this.upgradeKeys().vizziniContains(upgradeKey);
    }

    Token.prototype.removeCriticalDamage = function(damageKey)
    {
        var criticalDamages = this.criticalDamages();
        criticalDamages.vizziniRemove(damageKey);
        this.trigger("change");
    }

    Token.prototype.shipActions = function()
    {
        var answer = [];

        var criticalDamages = this.criticalDamages();

        if (!this.isCriticallyDamagedWith(DamageCard.DAMAGED_SENSOR_ARRAY))
        {
            answer.vizziniAddAll(Ship.properties[this.shipKey()].shipActions);
        }

        if (answer.vizziniContains(ShipAction.CLOAK) && this.isCloaked())
        {
            answer.vizziniRemove(ShipAction.CLOAK);
        }

        if (this.isUpgradedWith(UpgradeCard.ENGINE_UPGRADE))
        {
            answer.push(ShipAction.BOOST_LEFT);
            answer.push(ShipAction.BOOST_STRAIGHT);
            answer.push(ShipAction.BOOST_RIGHT);
        }

        if (this.isUpgradedWith(UpgradeCard.MILLENNIUM_FALCON))
        {
            answer.push(ShipAction.EVADE);
        }

        if (this.isUpgradedWith(UpgradeCard.TARGETING_COMPUTER))
        {
            answer.push(ShipAction.TARGET_LOCK);
        }

        var criticalDamages = this.criticalDamages();

        criticalDamages.forEach(function(damage)
        {
        // FIXME: add damage card actions.
        // if (damage.hasAction())
        // {
        // answer[answer.length] = new DamageCardShipAction(damage);
        // }
        });

        var upgradeKeys = this.upgradeKeys();

        upgradeKeys.forEach(function(upgradeKey)
        {
            var upgrade = UpgradeCard.properties[upgradeKey];

            // FIXME: add upgrade card actions.
            // if (upgrade.hasAction)
            // {
            // answer.push(new UpgradeCardShipAction(upgradeKey));
            // }
        });

        return answer;
    }

    Token.prototype.toString = function()
    {
        return this.name();
    }

    Token.ActivationState = function()
    {
        var isTouching = false;
        var maneuverAction;

        this.clear = function()
        {
            LOGGER.info("Token.ActivationState.clear()");
            isTouching = false;
            maneuverAction = undefined;
        }

        this.isTouching = function(value)
        {
            if (value === true || value === false)
            {
                isTouching = value;
            }

            return isTouching;
        }

        this.maneuverAction = function(value)
        {
            if (value)
            {
                maneuverAction = value;
            }

            return maneuverAction;
        }
    }

    Token.CombatState = function()
    {
        var attackDice;
        var combatAction;
        var defenseDice;
        var isDefenderHit;
        var range;

        this.attackDice = function(value)
        {
            if (value)
            {
                attackDice = value;
            }

            return attackDice;
        }

        this.clear = function()
        {
            attackDice = undefined;
            combatAction = undefined;
            defender = undefined;
            defenseDice = undefined;
            isDefenderHit = false;
            range = undefined;
        }

        this.combatAction = function(value)
        {
            if (value)
            {
                combatAction = value;
            }

            return combatAction;
        }

        this.defenseDice = function(value)
        {
            if (value)
            {
                defenseDice = value;
            }

            return defenseDice;
        }

        this.isDefenderHit = function(value)
        {
            if (value)
            {
                isDefenderHit = value;
            }

            return isDefenderHit;
        }

        this.range = function(value)
        {
            if (value)
            {
                range = value;
            }

            return range;
        }
    }

    Token.Count = function(initialCount)
    {
        var that = this;
        var count = (initialCount ? initialCount : 0);

        this.clear = function()
        {
            setCount(0);
        }

        this.count = function()
        {
            return count;
        }

        this.decrease = function()
        {
            setCount(count - 1);
        };

        this.increase = function()
        {
            setCount(count + 1);
        };

        function setCount(newValue)
        {
            if (newValue >= 0)
            {
                count = newValue;
                that.trigger("change");
            }
        }

        MicroEvent.mixin(Token.Count);
    }

    MicroEvent.mixin(Token);

    return Token;
});
