/*
 * Provides a token for Starfighter Squadrons. Can pass upgrade cards after the first two arguments.
 */
define([ "Bearing", "DamageCard", "Difficulty", "Maneuver", "Phase", "Pilot", "RangeRuler", "Ship", "ShipAction",
        "ShipTeam", "UpgradeCard" ], function(Bearing, DamageCard, Difficulty, Maneuver, Phase, Pilot, RangeRuler,
        Ship, ShipAction, ShipTeam, UpgradeCard)
{
    function Token(pilot, agent)
    {
        InputValidator.validateNotNull("pilot", pilot);
        InputValidator.validateNotNull("agent", agent);

        this.pilot = function()
        {
            return pilot;
        }

        this.agent = function()
        {
            return agent;
        }

        var that = this;
        var id = Token.nextId();
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
        var shieldCount = new Token.Count(Pilot.properties[pilot].shipState.getShieldValue());
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
        var attackerTargetLocks = [];
        var defenderTargetLocks = [];

        // Initialize the upgrades.
        var upgrades = [];

        for (var i = 2; i < arguments.length; i++)
        {
            upgrades.push(arguments[i]);
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

        this.defenderTargetLocks = function()
        {
            return defenderTargetLocks.slice();
        }

        this.equals = function(other)
        {
            return id == other.id() && pilot == other.pilot();
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

        this.getAgilityValue = function()
        {
            var answer = getShipState().getAgilityValue();

            this.upgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getAgilityValue();
                }
            });

            return answer;
        }

        this.getCriticalDamageCount = function()
        {
            return criticalDamages.length;
        }

        this.getCriticalDamages = function()
        {
            return criticalDamages;
        }

        this.getDamageCount = function()
        {
            return damages.length;
        }

        this.getDamages = function()
        {
            return damages;
        }

        this.getHullValue = function()
        {
            var answer = getShipState().getHullValue();

            answer = criticalDamages.reduce(function(sum, damage)
            {
                return sum + DamageCard.properties[damage].shipState.getHullValue();
            }, answer);

            this.upgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getHullValue();
                }
            });

            return Math.max(answer, 0);
        }

        this.getPilotSkillValue = function()
        {
            var answer;

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
                answer = getShipState().getPilotSkillValue();
            }

            answer = criticalDamages.reduce(function(sum, damage)
            {
                return sum + DamageCard.properties[damage].shipState.getPilotSkillValue();
            }, answer);

            this.upgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getPilotSkillValue();
                }
            });

            return Math.max(answer, 0);
        }

        this.getPrimaryWeaponValue = function()
        {
            var answer = getShipState().getPrimaryWeaponValue();

            answer = criticalDamages.reduce(function(sum, damage)
            {
                return sum + DamageCard.properties[damage].shipState.getPrimaryWeaponValue();
            }, answer);

            this.upgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getPrimaryWeaponValue();
                }
            });

            return Math.max(answer, 0);
        }

        this.getShieldValue = function()
        {
            var answer = getShipState().getShieldValue();

            this.upgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getShieldValue();
                }
            });

            return answer;
        }

        this.id = function()
        {
            return id;
        }

        this.ion = function()
        {
            return ionCount;
        }

        this.maneuverEffect = function(maneuver)
        {
            LOGGER.trace("Token.maneuverEffect() start");
            InputValidator.validateNotNull("maneuver", maneuver);

            var difficulty = Maneuver.properties[maneuver].difficulty;
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

        this.maneuvers = function()
        {
            var answer;

            if (this.isStressed())
            {
                answer = getNonHardManeuvers();
            }
            else
            {
                answer = Ship.properties[this.ship()].maneuvers.slice();
            }

            if (this.isCriticallyDamagedWith(DamageCard.DAMAGED_ENGINE))
            {
                answer = changeTurnManeuversToHard(answer);
            }

            if (this.isUpgradedWith(UpgradeCard.NIEN_NUNB))
            {
                answer = changeBearingManeuversToEasy(answer, Bearing.STRAIGHT);
            }

            if (this.isUpgradedWith(UpgradeCard.R2_ASTROMECH))
            {
                answer = changeSpeedManeuversToEasy(answer, 1);
                answer = changeSpeedManeuversToEasy(answer, 2);
            }

            return answer;
        }

        this.name = function()
        {
            var pilotName = Pilot.properties[pilot].name;
            var shipTeam = Pilot.properties[pilot].shipTeam;
            var shipName = Ship.properties[ShipTeam.properties[shipTeam].ship].name;

            return id + " " + pilotName + " (" + shipName + ")";
        }

        this.newInstance = function(agent)
        {
            var answer = new Token(pilot, agent);

            upgrades.forEach(function(upgrade)
            {
                answer.upgrades().push(upgrade);
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

        this.pilotName = function()
        {
            var properties = Pilot.properties[pilot];
            var isUnique = properties.isUnique;
            var answer = id + " ";

            if (isUnique)
            {
                answer += "\u25CF ";
            }

            answer += properties.name;

            return answer;
        }

        this.primaryWeapon = function()
        {
            return Pilot.properties[pilot].primaryWeapon;
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
            // FIXME: find secondary weapons.
            return [];
        }

        this.shield = function()
        {
            return shieldCount;
        }

        this.ship = function()
        {
            var shipTeam = this.shipTeam();
            return ShipTeam.properties[shipTeam].ship;
        }

        this.shipBase = function()
        {
            return Ship.properties[this.ship()].shipBase;
        }

        this.shipName = function()
        {
            return Ship.properties[this.ship()].name;
        }

        this.shipPrimaryFiringArc = function()
        {
            return Ship.properties[this.ship()].primaryFiringArc;
        }

        this.shipTeam = function()
        {
            return Pilot.properties[pilot].shipTeam;
        }

        this.stress = function()
        {
            return stressCount;
        }

        this.team = function()
        {
            return ShipTeam.properties[this.shipTeam()].team;
        }

        this.teamName = function()
        {
            return Team.properties[this.getTeam()].name;
        }

        this.upgrades = function()
        {
            return upgrades;
        }

        this.weaponsDisabled = function()
        {
            return weaponsDisabledCount;
        }

        function changeBearingManeuversToEasy(maneuvers, bearing)
        {
            return maneuvers.map(function(maneuver)
            {
                var properties = Maneuver.properties[maneuver];
                var myBearing = properties.bearing;

                if (myBearing === bearing)
                {
                    var speed = properties.speed;
                    return Maneuver.find(bearing, speed, Difficulty.EASY);
                }
                else
                {
                    return maneuver;
                }
            });
        }

        function changeSpeedManeuversToEasy(maneuvers, speed)
        {
            return maneuvers.map(function(maneuver)
            {
                var properties = Maneuver.properties[maneuver];
                var mySpeed = properties.speed;

                if (mySpeed === speed)
                {
                    var bearing = properties.bearing;
                    return Maneuver.find(bearing, speed, Difficulty.EASY);
                }
                else
                {
                    return maneuver;
                }
            });
        }

        function changeTurnManeuversToHard(maneuvers)
        {
            return maneuvers.map(function(maneuver)
            {
                var properties = Maneuver.properties[maneuver];
                var bearing = properties.bearing;

                if (Bearing.properties[bearing].isTurn)
                {
                    var speed = properties.speed;
                    return Maneuver.find(bearing, speed, Difficulty.HARD);
                }
                else
                {
                    return maneuver;
                }
            });
        }

        function getNonHardManeuvers()
        {
            var maneuvers = Ship.properties[that.ship()].maneuvers;

            return maneuvers.filter(function(maneuver)
            {
                var properties = Maneuver.properties[maneuver];
                return properties.difficulty != Difficulty.HARD;
            });
        }

        function getShipState()
        {
            return Pilot.properties[pilot].shipState;
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

    Token.prototype.addCriticalDamage = function(damage)
    {
        if (this.pilot() === Pilot.CHEWBACCA)
        {
            this.addDamage(damage);
        }
        else
        {
            var criticalDamages = this.getCriticalDamages();
            criticalDamages.push(damage);
            this.trigger("change");
        }
    }

    Token.prototype.addDamage = function(damage)
    {
        var damages = this.getDamages();
        damages.push(damage);
        this.trigger("change");
    }

    Token.prototype.computeAttackDiceCount = function(environment, weapon, range)
    {
        var answer;

        if (this.isCriticallyDamagedWith(DamageCard.BLINDED_PILOT))
        {
            answer = 0;
            this.flipDamageCardFacedown(DamageCard.BLINDED_PILOT);
        }
        else
        {
            answer = weapon.getWeaponValue();

            if ((range == RangeRuler.ONE) && weapon.isPrimary())
            {
                // Bonus attack die at range one.
                answer++;
            }
        }

        return answer;
    }

    Token.prototype.computeDefenseDiceCount = function(weapon, range)
    {
        var answer = this.getAgilityValue();

        if ((range == RangeRuler.THREE) && weapon.isPrimary())
        {
            // Bonus defense die at range three.
            answer++;
        }

        return answer;
    }

    Token.prototype.flipDamageCardFacedown = function(damage)
    {
        this.removeCriticalDamage(damage);
        this.addDamage(damage);
    }

    Token.prototype.isCloaked = function()
    {
        return this.cloak().count() > 0;
    }

    Token.prototype.isCriticallyDamagedWith = function(damage)
    {
        var criticalDamages = this.getCriticalDamages();
        return criticalDamages.vizziniContains(damage);
    }

    Token.prototype.isDestroyed = function()
    {
        return (this.getDamageCount() + this.getCriticalDamageCount()) >= this.getHullValue();
    }

    Token.prototype.isStressed = function()
    {
        return this.stress().count() > 0;
    }

    Token.prototype.isUpgradedWith = function(upgrade)
    {
        var upgrades = this.upgrades();
        return upgrades.vizziniContains(upgrade);
    }

    Token.prototype.removeCriticalDamage = function(damage)
    {
        var criticalDamages = this.getCriticalDamages();
        criticalDamages.vizziniRemove(damage);
        this.trigger("change");
    }

    Token.prototype.shipActions = function()
    {
        var answer = [];

        var criticalDamages = this.getCriticalDamages();

        if (!this.isCriticallyDamagedWith(DamageCard.DAMAGED_SENSOR_ARRAY))
        {
            answer.vizziniAddAll(Ship.properties[this.ship()].shipActions);
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

        if (criticalDamages.length > 0)
        {
            for (var i = 0; i < criticalDamages.length; i++)
            {
                var damage = criticalDamages[i];

                // FIXME
                // if (damage.hasAction())
                // {
                // answer[answer.length] = new DamageCardShipAction(damage);
                // }
            }
        }

        var upgrades = this.upgrades();

        if (upgrades.length > 0)
        {
            for (var i = 0; i < upgrades.length; i++)
            {
                var upgrade = upgrades[i];

                if (upgrade.hasAction)
                {
                    answer.push(new UpgradeCardShipAction(upgrade));
                }
            }
        }

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
        var defender;
        var defenseDice;
        var isDefenderHit;
        var range;
        var weapon;

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

        this.defender = function(value)
        {
            if (value)
            {
                defender = value;
            }

            return defender;
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

        this.weapon = function(value)
        {
            if (value)
            {
                weapon = value;
            }

            return weapon;
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
