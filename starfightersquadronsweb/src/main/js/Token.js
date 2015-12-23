/*
 * Provides a token for Starfighter Squadrons. Can pass upgrade cards after the first two arguments.
 */
define([ "Bearing", "DamageCard", "Difficulty", "Maneuver", "Phase", "Pilot", "RangeRuler", "Ship", "ShipAction",
        "ShipTeam", "UpgradeCard" ], function(Bearing, DamageCard, Difficulty, Maneuver, Phase, Pilot, RangeRuler,
        Ship, ShipAction, ShipTeam, UpgradeCard)
{
    function Token(pilot, agent)
    {
        var that = this;

        var id = Token.nextId();

        InputValidator.validateNotNull("pilot", pilot);
        InputValidator.validateNotNull("agent", agent);

        var cloakCount = 0;
        var criticalDamages = [];
        var damages = [];
        var evadeCount = 0;
        var focusCount = 0;
        var ionCount = 0;
        var shieldCount = Pilot.properties[pilot].shipState.getShieldValue();
        var stressCount = 0;
        var attackerTargetLocks = [];
        var defenderTargetLocks = [];

        // Initialize the upgrades.
        var upgrades = [];

        for (var i = 2; i < arguments.length; i++)
        {
            upgrades.push(arguments[i]);
        }

        // Activation state.
        var isTouching = false;
        var maneuverAction;
        var shipActionAction;

        // Combat state.
        var attackDice;
        var combatAction;
        var defender;
        var defenseDice;
        var isDefenderHit;
        var range;
        var weapon;

        this.addAttackerTargetLock = function(targetLock)
        {
            InputValidator.validateNotNull("targetLock", targetLock);

            attackerTargetLocks.push(targetLock);
            this.trigger("change");
        }

        this.addDefenderTargetLock = function(targetLock)
        {
            InputValidator.validateNotNull("targetLock", targetLock);

            defenderTargetLocks.push(targetLock);
            this.trigger("change");
        }

        /*
         * Clear the cloak tokens.
         */
        this.clearCloakCount = function()
        {
            setCloakCount(0);
        }

        /*
         * Clear the evade tokens.
         */
        this.clearEvadeCount = function()
        {
            setEvadeCount(0);
        }

        /*
         * Clear the focus tokens.
         */
        this.clearFocusCount = function()
        {
            setFocusCount(0);
        }

        /*
         * Decrease the cloak token count.
         */
        this.decreaseCloakCount = function()
        {
            setCloakCount(cloakCount - 1);
        }

        /*
         * Decrease the evade token count.
         */
        this.decreaseEvadeCount = function()
        {
            setEvadeCount(evadeCount - 1);
        }

        /*
         * Decrease the focus token count.
         */
        this.decreaseFocusCount = function()
        {
            setFocusCount(focusCount - 1);
        }

        /*
         * Decrease the ion token count.
         */
        this.decreaseIonCount = function()
        {
            setIonCount(ionCount - 1);
        }

        /*
         * Decrease the shield token count.
         */
        this.decreaseShieldCount = function()
        {
            setShieldCount(shieldCount - 1);
        }

        /*
         * Decrease the stress token count.
         */
        this.decreaseStressCount = function()
        {
            setStressCount(stressCount - 1);
        }

        this.equals = function(other)
        {
            return id == other.getId() && pilot == other.getPilot();
        }

        this.findTargetLockByDefender = function(defender)
        {
            var answer;

            for (var i = 0; i < attackerTargetLocks.length; i++)
            {
                var targetLock = attackerTargetLocks[i];

                if (targetLock.getDefender() === defender)
                {
                    answer = targetLock;
                    break;
                }
            }

            return answer;
        }

        this.getAgent = function()
        {
            return agent;
        }

        this.getAgilityValue = function()
        {
            var answer = getShipState().getAgilityValue();

            this.getUpgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getAgilityValue();
                }
            });

            return answer;
        }

        this.getAttackDice = function()
        {
            return attackDice;
        }

        this.getAttackerTargetLocks = function()
        {
            return attackerTargetLocks.slice();
        }

        this.getCloakCount = function()
        {
            return cloakCount;
        }

        this.getCombatAction = function()
        {
            return combatAction;
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

        this.getDefender = function()
        {
            return defender;
        }

        this.getDefenderTargetLocks = function()
        {
            return defenderTargetLocks.slice();
        }

        this.getDefenseDice = function()
        {
            return defenseDice;
        }

        this.getEvadeCount = function()
        {
            return evadeCount;
        }

        this.getFocusCount = function()
        {
            return focusCount;
        }

        this.getHullValue = function()
        {
            var answer = getShipState().getHullValue();

            answer = criticalDamages.reduce(function(sum, damage)
            {
                return sum + DamageCard.properties[damage].shipState.getHullValue();
            }, answer);

            this.getUpgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getHullValue();
                }
            });

            return Math.max(answer, 0);
        }

        this.getId = function()
        {
            return id;
        }

        this.getIonCount = function()
        {
            return ionCount;
        }

        this.getManeuverAction = function()
        {
            return maneuverAction;
        }

        this.getManeuvers = function()
        {
            var answer;

            if (this.isStressed())
            {
                answer = getNonHardManeuvers();
            }
            else
            {
                answer = Ship.properties[this.getShip()].maneuvers.slice();
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

        this.getName = function()
        {
            var pilotName = Pilot.properties[pilot].name;
            var shipTeam = Pilot.properties[pilot].shipTeam;
            var shipName = Ship.properties[ShipTeam.properties[shipTeam].ship].name;

            return id + " " + pilotName + " (" + shipName + ")";
        }

        this.getPilot = function()
        {
            return pilot;
        }

        this.getPilotName = function()
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

            this.getUpgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getPilotSkillValue();
                }
            });

            return Math.max(answer, 0);
        }

        this.getPrimaryWeapon = function()
        {
            return Pilot.properties[pilot].primaryWeapon;
        }

        this.getPrimaryWeaponValue = function()
        {
            var answer = getShipState().getPrimaryWeaponValue();

            answer = criticalDamages.reduce(function(sum, damage)
            {
                return sum + DamageCard.properties[damage].shipState.getPrimaryWeaponValue();
            }, answer);

            this.getUpgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getPrimaryWeaponValue();
                }
            });

            return Math.max(answer, 0);
        }

        this.getRange = function()
        {
            return range;
        }

        this.getSecondaryWeapons = function()
        {
            // FIXME
            return [];
        }

        this.getShieldCount = function()
        {
            return shieldCount;
        }

        this.getShieldValue = function()
        {
            var answer = getShipState().getShieldValue();

            this.getUpgrades().forEach(function(upgrade)
            {
                var shipState = UpgradeCard.properties[upgrade].shipState;

                if (shipState)
                {
                    answer += shipState.getShieldValue();
                }
            });

            return answer;
        }

        this.getShip = function()
        {
            var shipTeam = this.getShipTeam();
            return ShipTeam.properties[shipTeam].ship;
        }

        this.getShipBase = function()
        {
            return Ship.properties[this.getShip()].shipBase;
        }

        this.getShipName = function()
        {
            return Ship.properties[this.getShip()].name;
        }

        this.getShipPrimaryFiringArc = function()
        {
            return Ship.properties[this.getShip()].primaryFiringArc;
        }

        this.getShipTeam = function()
        {
            return Pilot.properties[pilot].shipTeam;
        }

        this.getStressCount = function()
        {
            return stressCount;
        }

        this.getTeam = function()
        {
            return ShipTeam.properties[this.getShipTeam()].team;
        }

        this.getTeamName = function()
        {
            return Team.properties[this.getTeam()].name;
        }

        this.getUpgrades = function()
        {
            return upgrades;
        }

        this.getWeapon = function()
        {
            return weapon;
        }

        /*
         * Increase the cloak token count.
         */
        this.increaseCloakCount = function()
        {
            setCloakCount(cloakCount + 1);
        }

        /*
         * Increase the evade token count.
         */
        this.increaseEvadeCount = function()
        {
            setEvadeCount(evadeCount + 1);
        }

        /*
         * Increase the focus token count.
         */
        this.increaseFocusCount = function()
        {
            setFocusCount(focusCount + 1);
        }

        /*
         * Increase the ion token count.
         */
        this.increaseIonCount = function()
        {
            setIonCount(ionCount + 1);
        }

        /*
         * Increase the shield token count.
         */
        this.increaseShieldCount = function()
        {
            setShieldCount(shieldCount + 1);
        }

        /*
         * Increase the stress token count.
         */
        this.increaseStressCount = function()
        {
            setStressCount(stressCount + 1);
        }

        this.isTouching = function()
        {
            return isTouching;
        }

        /*
         * @return the isDefenderHit
         */
        Token.isDefenderHit = function()
        {
            return isDefenderHit;
        }

        this.phaseEffect = function(environment, token, phase)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("phase", phase);

            if (token != this) { throw "token does not equal this"; }

            switch (phase)
            {
            case Phase.ACTIVATION_START:
                clearActivationState();
                break;
            case Phase.ACTIVATION_EXECUTE_MANEUVER:
                var activeToken = environment.activeToken();
                if (this == activeToken)
                {
                    var maneuverAction = this.getManeuverAction();
                    if (maneuverAction)
                    {
                        var maneuver = maneuverAction.maneuver();
                        maneuverEffect(maneuver);
                    }
                }
                break;
            case Phase.COMBAT_START:
                clearCombatState();
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
            // UpgradeCardList(getUpgrades());
            //
            // for (final UpgradeCard upgrade : myUpgrades)
            // {
            // upgrade.phaseEffect(environment, this, phase);
            // }
        }

        this.removeAllTargetLocks = function()
        {
            // Remove target locks which have this as the defender.
            var targetLocks = this.getDefenderTargetLocks();
            targetLocks.forEach(function(targetLock)
            {
                var attacker = targetLock.getAttacker();
                attacker.removeAttackerTargetLock(targetLock);
                this.removeDefenderTargetLock(targetLock);
            }, this);

            // Remove target locks in which this is the attacker.
            var targetLocks = this.getAttackerTargetLocks();
            targetLocks.forEach(function(targetLock)
            {
                var defender = targetLock.getDefender();
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

        this.setAttackDice = function(value)
        {
            attackDice = value;
        }

        this.setCombatAction = function(value)
        {
            combatAction = value;
        }

        this.setDefender = function(value)
        {
            defender = value;
        }

        /*
         * @param isDefenderHit the isDefenderHit to set
         */
        this.setDefenderHit = function(value)
        {
            isDefenderHit = value;
            LOGGER.trace("isDefenderHit ? " + isDefenderHit);
        }

        this.setDefenseDice = function(value)
        {
            defenseDice = value;
        }

        this.setManeuverAction = function(value)
        {
            maneuverAction = value;
        }

        this.setRange = function(value)
        {
            range = value;
        }

        this.setTouching = function(value)
        {
            isTouching = value;
        }

        this.setWeapon = function(value)
        {
            weapon = value;
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

        /*
         * Change the turn maneuvers to hard difficulty.
         * 
         * @param maneuvers Maneuvers.
         * 
         * @return maneuvers.
         */
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

        /*
         * Clear the activation state.
         */
        function clearActivationState()
        {
            isTouching = false;
            maneuverAction = undefined;
            shipActionAction = undefined;
        }

        /*
         * Clear the combat state.
         */
        function clearCombatState()
        {
            attackDice = undefined;
            combatAction = undefined;
            defender = undefined;
            defenseDice = undefined;
            isDefenderHit = false;
            range = undefined;
        }

        /*
         * @return maneuvers.
         */
        function getNonHardManeuvers()
        {
            var maneuvers = Ship.properties[that.getShip()].maneuvers;

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

        /*
         * @param maneuver Maneuver.
         */
        function maneuverEffect(maneuver)
        {
            InputValidator.validateNotNull("maneuver", maneuver);

            LOGGER.trace(that.getName() + ".maneuverEffect()");

            var difficulty = Maneuver.properties[maneuver].difficulty;
            LOGGER.trace("difficulty = " + difficulty);

            if (difficulty == Difficulty.EASY)
            {
                LOGGER.trace("calling decreaseStressCount()")
                that.decreaseStressCount();
            }
            else if (difficulty == Difficulty.HARD)
            {
                LOGGER.trace("calling increaseStressCount()")
                that.increaseStressCount();
            }
        }

        /*
         * @param newValue the cloakCount to set
         */
        function setCloakCount(newValue)
        {
            if (newValue >= 0)
            {
                cloakCount = newValue;
                that.trigger("change");
            }
        }

        /*
         * @param newValue the evadeCount to set
         */
        function setEvadeCount(newValue)
        {
            if (newValue >= 0)
            {
                evadeCount = newValue;
                that.trigger("change");
            }
        }

        /*
         * @param newValue the focusCount to set
         */
        function setFocusCount(newValue)
        {
            if (newValue >= 0)
            {
                focusCount = newValue;
                that.trigger("change");
            }
        }

        /*
         * @param newValue the ionCount to set
         */
        function setIonCount(newValue)
        {
            if (newValue >= 0)
            {
                ionCount = newValue;
                that.trigger("change");
            }
        }

        /*
         * @param newValue the shieldCount to set
         */
        function setShieldCount(newValue)
        {
            if (newValue >= 0)
            {
                shieldCount = newValue;
                that.trigger("change");
            }
        }

        /*
         * @param newValue the stressCount to set
         */
        function setStressCount(newValue)
        {
            if (newValue >= 0)
            {
                stressCount = newValue;
                that.trigger("change");
            }
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
        if (this.getPilot() === Pilot.CHEWBACCA)
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

    /*
     * @return the shipActions
     */
    Token.prototype.getShipActions = function()
    {
        var answer = [];

        var criticalDamages = this.getCriticalDamages();

        if (!this.isCriticallyDamagedWith(DamageCard.DAMAGED_SENSOR_ARRAY))
        {
            answer.vizziniAddAll(Ship.properties[this.getShip()].shipActions);
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

        var upgrades = this.getUpgrades();

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

    Token.prototype.isCloaked = function()
    {
        return this.getCloakCount() > 0;
    }

    /*
     * @param damage Damage.
     * 
     * @return true if this is critically damaged with the given damage.
     */
    Token.prototype.isCriticallyDamagedWith = function(damage)
    {
        var criticalDamages = this.getCriticalDamages();
        return criticalDamages.vizziniContains(damage);
    }

    /*
     * @return true if this ship is destroyed.
     */
    Token.prototype.isDestroyed = function()
    {
        return (this.getDamageCount() + this.getCriticalDamageCount()) >= this.getHullValue();
    }

    Token.prototype.isStressed = function()
    {
        return this.getStressCount() > 0;
    }

    /*
     * @param upgrade Upgrade.
     * 
     * @return true if this is upgraded with the given upgrade.
     */
    Token.prototype.isUpgradedWith = function(upgrade)
    {
        var upgrades = this.getUpgrades();
        return upgrades.vizziniContains(upgrade);
    }

    /*
     * @param damage Critical damage.
     */
    Token.prototype.removeCriticalDamage = function(damage)
    {
        var criticalDamages = this.getCriticalDamages();
        criticalDamages.vizziniRemove(damage);
        this.trigger("change");
    }

    /*
     * @return a string representation of this object.
     */
    Token.prototype.toString = function()
    {
        return this.getName();
    }

    MicroEvent.mixin(Token);

    return Token;
});
