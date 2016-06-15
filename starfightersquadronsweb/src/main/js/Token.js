define([ "ActivationState", "Bearing", "Count", "DamageCard", "DamageCardV2", "Difficulty", "Maneuver", "Pilot",
        "RangeRuler", "ShipAction", "ShipBase", "UpgradeCard", "UpgradeType", "Weapon", "process/Action",
        "process/Selector" ], function(ActivationState, Bearing, Count, DamageCard, DamageCardV2, Difficulty, Maneuver,
        Pilot, RangeRuler, ShipAction, ShipBase, UpgradeCard, UpgradeType, Weapon, Action, Selector)
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

                if (pilot.value.endsWith("fore"))
                {
                    ship = ship.fore;
                }
                else if (pilot.value.endsWith("aft"))
                {
                    ship = ship.aft;
                }
                else if (pilot.value.endsWith("crippledFore"))
                {
                    ship = ship.crippledFore;
                }
                else if (pilot.value.endsWith("crippledAft"))
                {
                    ship = ship.crippledAft;
                }
            }

            return ship;
        };

        var that = this;
        var id = store.getState().nextTokenId;
        store.dispatch(Action.incrementNextTokenId());

        Count.values().forEach(function(count)
        {
            var value;
            switch (count)
            {
            case Count.ENERGY:
                var energyValue = pilot.shipState.energyValue();
                value = (energyValue ? energyValue : 0);
                store.dispatch(Action.setEnergyCount(id, value));
                break;
            case Count.SHIELD:
                value = pilot.shipState.shieldValue();
                store.dispatch(Action.setShieldCount(id, value));
                break;
            default:
                store.dispatch(Action.setCount(id, count));
            }
        });

        var primaryWeapon = (pilot.shipState.primaryWeaponValue() !== null ? createPrimaryWeapon() : undefined);
        var secondaryWeapons = [];

        // Initialize the upgrades.
        if (upgradeKeysIn)
        {
            upgradeKeysIn.forEach(function(upgradeKey)
            {
                store.dispatch(Action.addTokenUpgrade(id, upgradeKey));
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
                    store.dispatch(Action.setTokenUpgradeEnergy(id, upgradeKey, upgrade.energyLimit));
                }
            });
        }

        var activationState = new ActivationState();
        var combatState = new CombatState();

        this.activationState = function()
        {
            return activationState;
        };

        this.addAttackerTargetLock = function(targetLock)
        {
            InputValidator.validateNotNull("targetLock", targetLock);

            var attackerTargetLocks = this.attackerTargetLocks();

            if (attackerTargetLocks.length > 0)
            {
                // Remove previous target lock.
                var previous = attackerTargetLocks[0];
                this.removeAttackerTargetLock(previous);
            }

            store.dispatch(Action.addTargetLock(targetLock));
        };

        this.agilityValue = function()
        {
            var answer = getShipState().agilityValue();

            if (answer !== null)
            {
                this.upgradeKeys().forEach(function(upgradeKey)
                {
                    var shipState = UpgradeCard.properties[upgradeKey].shipState;

                    if (shipState)
                    {
                        answer += shipState.agilityValue();
                    }
                });

                if (this.isCloaked())
                {
                    answer += 2;
                }
            }

            return answer;
        };

        this.attackerTargetLocks = function()
        {
            return Selector.attackerTargetLocks(store.getState(), this);
        };

        this.cloakCount = function()
        {
            return Selector.cloakCount(store.getState(), id);
        };

        this.combatState = function()
        {
            return combatState;
        };

        this.criticalDamageCount = function()
        {
            return this.criticalDamages().length;
        };

        this.criticalDamages = function()
        {
            return Selector.criticalDamages(store.getState(), id);
        };

        this.damageCount = function()
        {
            return this.damages().length;
        };

        this.damages = function()
        {
            return Selector.damages(store.getState(), id);
        };

        this.defenderTargetLocks = function()
        {
            return Selector.defenderTargetLocks(store.getState(), this);
        };

        this.discardUpgrade = function(upgradeKey)
        {
            InputValidator.validateNotNull("upgradeKey", upgradeKey);

            store.dispatch(Action.removeTokenUpgrade(id, upgradeKey));
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

        this.energyCount = function()
        {
            return Selector.energyCount(store.getState(), id);
        };

        this.energyLimit = function()
        {
            var answer = pilot.shipState.energyValue();

            if (answer !== null)
            {
                answer = this.criticalDamages().reduce(function(sum, damageKey)
                {
                    return sum + DamageCard.properties[damageKey].shipState.energyValue();
                }, answer);

                this.upgradeKeys().forEach(function(upgradeKey)
                {
                    var shipState = UpgradeCard.properties[upgradeKey].shipState;

                    if (shipState)
                    {
                        answer += shipState.energyValue();
                    }
                });

                answer = Math.max(answer, 0);
            }

            return answer;
        };

        this.upgradeKeys = function()
        {
            return Selector.upgrades(store.getState(), id);
        };

        // Initialize the energy.
        store.dispatch(Action.setEnergyCount(id, this.energyLimit()));

        this.equals = function(other)
        {
            return id == other.id() && pilotKey == other.pilotKey();
        };

        this.evadeCount = function()
        {
            return Selector.evadeCount(store.getState(), id);
        };

        this.findTargetLockByDefender = function(defender)
        {
            return Selector.targetLock(store.getState().targetLocks, this, defender);
        };

        this.focusCount = function()
        {
            return Selector.focusCount(store.getState(), id);
        };

        this.hullValue = function()
        {
            var answer = getShipState().hullValue();

            if (answer !== null)
            {
                answer = this.criticalDamages().reduce(function(sum, damageKey)
                {
                    return sum + DamageCard.properties[damageKey].shipState.hullValue();
                }, answer);

                this.upgradeKeys().forEach(function(upgradeKey)
                {
                    var shipState = UpgradeCard.properties[upgradeKey].shipState;

                    if (shipState)
                    {
                        answer += shipState.hullValue();
                    }
                });

                answer = Math.max(answer, 0);
            }

            return answer;
        };

        this.id = function()
        {
            return id;
        };

        this.ionCount = function()
        {
            return Selector.ionCount(store.getState(), id);
        };

        this.maneuverKeys = function()
        {
            var answer;

            if (this.isIonized())
            {
                answer = [ Maneuver.STRAIGHT_1_STANDARD ];
            }
            else
            {
                answer = pilot.shipTeam.ship.maneuverKeys.slice();

                if (this.isCriticallyDamagedWith(DamageCard.DAMAGED_ENGINE) ||
                        this.isCriticallyDamagedWith(DamageCardV2.DAMAGED_ENGINE))
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
                        return Maneuver.properties[maneuverKey].difficultyKey !== Difficulty.HARD;
                    });
                }
            }

            return answer;
        };

        this.name = function()
        {
            var pilotName = pilot.name;
            var shipName = pilot.shipTeam.ship.name;
            var answer = id + " " + pilotName;

            if (!pilotName.startsWith(shipName))
            {
                answer += " (" + shipName + ")";
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
                store.dispatch(Action.addTokenUpgrade(answer.id(), upgradeKey));
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

        this.pilotSkillValue = function()
        {
            var answer;

            if (pilotKey === Pilot.EPSILON_ACE && this.damageCount() === 0 && this.criticalDamageCount() === 0)
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

                answer = this.criticalDamages().reduce(function(sum, damageKey)
                {
                    return sum + DamageCard.properties[damageKey].shipState.pilotSkillValue();
                }, answer);

                this.upgradeKeys().forEach(function(upgradeKey)
                {
                    var shipState = UpgradeCard.properties[upgradeKey].shipState;

                    if (shipState)
                    {
                        answer += shipState.pilotSkillValue();
                    }
                });
            }

            return Math.max(answer, 0);
        };

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
        };

        this.primaryFiringArcKey = function()
        {
            return pilot.shipTeam.ship.primaryFiringArcKey;
        };

        this.primaryWeapon = function()
        {
            return primaryWeapon;
        };

        this.primaryWeaponValue = function()
        {
            var answer = getShipState().primaryWeaponValue();

            if (answer !== null)
            {
                answer = this.criticalDamages().reduce(function(sum, damageKey)
                {
                    return sum + DamageCard.properties[damageKey].shipState.primaryWeaponValue();
                }, answer);

                this.upgradeKeys().forEach(function(upgradeKey)
                {
                    var shipState = UpgradeCard.properties[upgradeKey].shipState;

                    if (shipState)
                    {
                        answer += shipState.primaryWeaponValue();
                    }
                });

                answer = Math.max(answer, 0);
            }

            return answer;
        };

        this.receiveStress = function()
        {
            store.dispatch(Action.addStressCount(id));

            if (pilotKey === Pilot.SOONTIR_FEL)
            {
                store.dispatch(Action.addFocusCount(id));
            }
        };

        this.recoverShield = function()
        {
            if (this.shieldCount() < this.shieldValue())
            {
                store.dispatch(Action.addShieldCount(id));
            }
        };

        this.reinforceCount = function()
        {
            return Selector.reinforceCount(store.getState(), id);
        };

        this.removeAllTargetLocks = function()
        {
            // Remove target locks which have this as the defender.
            var targetLocks = this.defenderTargetLocks();
            targetLocks.forEach(function(targetLock)
            {
                var attacker = targetLock.attacker();
                attacker.removeAttackerTargetLock(targetLock);
            }, this);

            // Remove target locks in which this is the attacker.
            targetLocks = this.attackerTargetLocks();
            targetLocks.forEach(function(targetLock)
            {
                var defender = targetLock.defender();
                this.removeAttackerTargetLock(targetLock);
            }, this);
        };

        this.removeAttackerTargetLock = function(targetLock)
        {
            InputValidator.validateNotNull("targetLock", targetLock);

            store.dispatch(Action.removeTargetLock(targetLock));
        };

        this.removeStress = function()
        {
            if (this.stressCount() > 0)
            {
                store.dispatch(Action.addStressCount(id, -1));

                if (this.isUpgradedWith(UpgradeCard.KYLE_KATARN))
                {
                    store.dispatch(Action.addFocusCount(id));
                }
            }
        };

        this.secondaryWeapons = function()
        {
            return secondaryWeapons;
        };

        this.shieldCount = function()
        {
            return Selector.shieldCount(store.getState(), id);
        };

        this.shieldValue = function()
        {
            var answer = getShipState().shieldValue();

            if (answer !== null)
            {
                this.upgradeKeys().forEach(function(upgradeKey)
                {
                    var shipState = UpgradeCard.properties[upgradeKey].shipState;

                    if (shipState)
                    {
                        answer += shipState.shieldValue();
                    }
                });
            }

            return answer;
        };

        this.shipName = function()
        {
            return pilot.shipTeam.ship.name;
        };

        this.stressCount = function()
        {
            return Selector.stressCount(store.getState(), id);
        };

        this.teamName = function()
        {
            return pilot.shipTeam.team.name;
        };

        this.upgradeTypeKeys = function()
        {
            var answer = pilot.upgradeTypeKeys.slice();

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
        };

        this.weaponsDisabledCount = function()
        {
            return Selector.weaponsDisabledCount(store.getState(), id);
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
                    if (!answer) { throw "Unknown maneuver: " + bearingKey + " " + speed + " " + difficultyKey; }
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
                    if (!answer) { throw "Unknown maneuver: " + bearingKey + " " + speed + " " + difficultyKey; }
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
            var ship = that.ship();

            if (!ship.primaryFiringArcKey)
            {
                LOGGER.info("pilot.value = " + pilot.value);
                LOGGER.info("ship.value = " + ship.value);
                LOGGER.info("ship.primaryFiringArcKey = " + ship.primaryFiringArcKey);
            }

            return new Weapon("Primary Weapon", shipState.primaryWeaponValue(), ship.primaryWeaponRanges,
                    ship.primaryFiringArcKey, ship.auxiliaryFiringArcKey, ship.isPrimaryWeaponTurret);
        }

        function createSecondaryWeapon(upgrade)
        {
            return new Weapon(upgrade.name, upgrade.weaponValue, upgrade.ranges, upgrade.firingArcKey, undefined,
                    upgrade.isWeaponTurret, upgrade.value);
        }

        function getShipState()
        {
            return pilot.shipState;
        }
    }

    Token.prototype.addCriticalDamage = function(damageKey)
    {
        if (this.pilotKey() === Pilot.CHEWBACCA)
        {
            this.addDamage(damageKey);
        }
        else
        {
            this.store().dispatch(Action.addTokenCriticalDamage(this.id(), damageKey));
        }
    };

    Token.prototype.addDamage = function(damageKey)
    {
        this.store().dispatch(Action.addTokenDamage(this.id(), damageKey));
    };

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

                if (this.pilotKey() === Pilot.TALONBANE_COBRA)
                {
                    answer++;
                }
            }

            if (this.pilotKey() === Pilot.EADEN_VRILL && weapon.isPrimary() && defender.isStressed())
            {
                answer++;
            }

            if (this.pilotKey() === Pilot.MAULER_MITHEL && range === RangeRuler.ONE)
            {
                answer++;
            }

            if (weapon.upgradeKey() === UpgradeCard.PROTON_ROCKETS)
            {
                answer += Math.min(this.agilityValue(), 3);
            }
        }

        return answer;
    };

    Token.prototype.computeDefenseDiceCount = function(weapon, range)
    {
        var answer = this.agilityValue();

        if ([ RangeRuler.THREE, RangeRuler.FOUR, RangeRuler.FIVE ].vizziniContains(range) && weapon.isPrimary())
        {
            // Bonus defense die at range three, four, and five.
            answer++;

            if (this.pilotKey() === Pilot.TALONBANE_COBRA)
            {
                answer++;
            }
        }

        return answer;
    };

    Token.prototype.flipDamageCardFacedown = function(damageKey)
    {
        this.removeCriticalDamage(damageKey);
        this.addDamage(damageKey);
    };

    Token.prototype.isCloaked = function()
    {
        return this.cloakCount() > 0;
    };

    Token.prototype.isCriticallyDamagedWith = function(damageKey)
    {
        var criticalDamages = this.criticalDamages();
        return criticalDamages.vizziniContains(damageKey);
    };

    Token.prototype.isDestroyed = function()
    {
        return (this.damageCount() + this.criticalDamageCount()) >= this.hullValue();
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
        return this.upgradeKeys().vizziniContains(upgradeKey);
    };

    Token.prototype.removeCriticalDamage = function(damageKey)
    {
        this.store().dispatch(Action.removeTokenCriticalDamage(this.id(), damageKey));
    };

    Token.prototype.shipActions = function()
    {
        var answer = [];

        var criticalDamages = this.criticalDamages();

        if (!this.isCriticallyDamagedWith(DamageCard.DAMAGED_SENSOR_ARRAY))
        {
            answer.vizziniAddAll(this.ship().shipActionKeys);
        }

        if (answer.vizziniContains(ShipAction.CLOAK) && this.isCloaked())
        {
            answer.vizziniRemove(ShipAction.CLOAK);
        }

        if (this.isUpgradedWith(UpgradeCard.ENGINE_UPGRADE))
        {
            answer.push(ShipAction.BOOST);
        }

        if (this.isUpgradedWith(UpgradeCard.MILLENNIUM_FALCON))
        {
            answer.push(ShipAction.EVADE);
        }

        if (this.isUpgradedWith(UpgradeCard.TARGETING_COMPUTER))
        {
            answer.push(ShipAction.TARGET_LOCK);
        }

        criticalDamages = this.criticalDamages();

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
    };

    Token.prototype.toString = function()
    {
        return this.name();
    };

    function CombatState()
    {
        var attackDice;
        var combatAction;
        var defenseDice;
        var isDefenderHit;
        var range;

        this.attackDice = function(value)
        {
            if (value !== undefined)
            {
                attackDice = value;
            }

            return attackDice;
        };

        this.clear = function()
        {
            attackDice = undefined;
            combatAction = undefined;
            defenseDice = undefined;
            isDefenderHit = false;
            range = undefined;
        };

        this.combatAction = function(value)
        {
            if (value !== undefined)
            {
                combatAction = value;
            }

            return combatAction;
        };

        this.defenseDice = function(value)
        {
            if (value !== undefined)
            {
                defenseDice = value;
            }

            return defenseDice;
        };

        this.isDefenderHit = function(value)
        {
            if (value === true || value === false)
            {
                isDefenderHit = value;
            }

            return isDefenderHit;
        };

        this.range = function(value)
        {
            if (value !== undefined)
            {
                range = value;
            }

            return range;
        };
    }

    return Token;
});
