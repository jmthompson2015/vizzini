/*
 * Provides a token for Starfighter Squadrons. Can pass upgrade cards after the first two arguments.
 */
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

    // Initialize the upgrades.
    var upgrades = [];

    for (var i = 2; i < arguments.length; i++)
    {
        upgrades[upgrades.length] = arguments[i];
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

    this.getAgent = function()
    {
        return agent;
    }

    this.getAgilityValue = function()
    {
        return getShipState().getAgilityValue();
    }

    this.getAttackDice = function()
    {
        return attackDice;
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

        var criticalDamages = this.getCriticalDamages();

        for (var i = 0; i < criticalDamages.length; i++)
        {
            var damage = criticalDamages[i];
            answer += DamageCard.properties[damage].shipState.getHullValue();
        }

        // for (final UpgradeCard upgrade : getUpgrades())
        // {
        // if (!upgrade.hasAction() || isUpgradeActive(upgrade))
        // {
        // answer += upgrade.getHullValue();
        // }
        // }

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
            answer = Ship.properties[this.getShip()].maneuvers;
        }

        if (this.isCriticallyDamagedWith(DamageCard.DAMAGED_ENGINE))
        {
            answer = changeTurnManeuversToHard(answer);
        }

        // if (isUpgradedWith(UpgradeCard.NIEN_NUNB))
        // {
        // answer = changeManeuversToEasy(answer, Bearing.STRAIGHT);
        // }
        //
        // if (isUpgradedWith(UpgradeCard.R2_ASTROMECH))
        // {
        // answer = changeManeuversToEasy(answer, 1);
        // answer = changeManeuversToEasy(answer, 2);
        // }

        return answer;
    }

    this.getName = function()
    {
        var pilotName = Pilot.properties[pilot].name;
        var shipName = Ship.properties[Pilot.properties[pilot].ship].name;

        return id + " " + pilotName + " (" + shipName + ")";
    }

    this.getPilot = function()
    {
        return pilot;
    }

    this.getPilotName = function()
    {
        return id + " " + Pilot.properties[pilot].name;
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

        var criticalDamages = this.getCriticalDamages();

        for (var i = 0; i < criticalDamages.length; i++)
        {
            var damage = criticalDamages[i];
            answer += DamageCard.properties[damage].shipState
                    .getPilotSkillValue();
        }

        // for (final UpgradeCard upgrade : getUpgrades())
        // {
        // if (!upgrade.hasAction() || isUpgradeActive(upgrade))
        // {
        // answer += upgrade.getPilotSkillValue();
        // }
        // }

        return Math.max(answer, 0);
    }

    this.getPrimaryWeapon = function()
    {
        return Pilot.properties[pilot].primaryWeapon;
    }

    this.getPrimaryWeaponValue = function()
    {
        var answer = getShipState().getPrimaryWeaponValue();

        var criticalDamages = this.getCriticalDamages();

        for (var i = 0; i < criticalDamages.length; i++)
        {
            var damage = criticalDamages[i];
            answer += DamageCard.properties[damage].shipState
                    .getPrimaryWeaponValue();
        }

        // for (final UpgradeCard upgrade : getUpgrades())
        // {
        // if (!upgrade.hasAction() || isUpgradeActive(upgrade))
        // {
        // answer += upgrade.getPrimaryWeaponValue();
        // }
        // }

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
        return getShipState().getShieldValue();
    }

    this.getShip = function()
    {
        return Pilot.properties[pilot].ship;
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

    this.getStressCount = function()
    {
        return stressCount;
    }

    this.getTeam = function()
    {
        return Ship.properties[this.getShip()].team;
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
            var activeToken = environment.getActiveToken();
            if (this == activeToken)
            {
                var maneuverAction = this.getManeuverAction();
                if (maneuverAction)
                {
                    var maneuver = maneuverAction.getManeuver();
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

    this.setWeapon = function(value)
    {
        weapon = value;
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
        var answer = [];

        for (var i = 0; i < maneuvers.length; i++)
        {
            var maneuver = maneuvers[i];
            var properties = Maneuver.properties[maneuver];
            var bearing = properties.bearing;
            var speed = properties.speed;

            if (Bearing.properties[bearing].isTurn)
            {
                var newManeuver = Maneuver
                        .find(bearing, speed, Difficulty.HARD);
                answer[answer.length] = newManeuver;
            }
            else
            {
                answer[answer.length] = maneuver;
            }
        }

        return answer;
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
        var answer = [];

        var maneuvers = Ship.properties[that.getShip()].maneuvers;

        for (var i = 0; i < maneuvers.length; i++)
        {
            var maneuver = maneuvers[i];
            var properties = Maneuver.properties[maneuver];

            if (properties.difficulty != Difficulty.HARD)
            {
                answer[answer.length] = maneuver;
            }
        }

        return answer;
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
         // var oldValue = stressCount;
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
    var criticalDamages = this.getCriticalDamages();
    criticalDamages[criticalDamages.length] = damage;
    this.trigger("change");
}

Token.prototype.addDamage = function(damage)
{
    var damages = this.getDamages();
    damages[damages.length] = damage;
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

        if ((range == Range.ONE) && weapon.isPrimary())
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

    if ((range == Range.THREE) && weapon.isPrimary())
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
    // final Set<ShipAction> answer = new HashSet<ShipAction>();
    var answer = [];

    // final DamageCardList criticalDamages = getCriticalDamages();
    var criticalDamages = this.getCriticalDamages();

    // if (!criticalDamages.contains(DamageCard.DAMAGED_SENSOR_ARRAY))
    // if (!Array.Vizzini.contains(criticalDamages,
    // DamageCard.DAMAGED_SENSOR_ARRAY))
    if (!this.isCriticallyDamagedWith(DamageCard.DAMAGED_SENSOR_ARRAY))
    {
        // answer.addAll(this.getShip().getShipActions());
        // Array.prototype.push.apply(answer, this.getShip().getShipActions());
        // Array.Vizzini.addAll(answer, this.getShip().getShipActions());
        Array.Vizzini.addAll(answer,
                Ship.properties[this.getShip()].shipActions);
    }

    if (Array.Vizzini.contains(answer, ShipAction.CLOAK) && this.isCloaked())
    {
        Array.Vizzini.remove(answer, ShipAction.CLOAK);
    }

    if (this.isUpgradedWith(UpgradeCard.ENGINE_UPGRADE))
    {
        answer[answer.length] = ShipAction.BOOST;
    }

    if (this.isUpgradedWith(UpgradeCard.MILLENNIUM_FALCON))
    {
        answer[answer.length] = ShipAction.EVADE;
    }

    if (this.isUpgradedWith(UpgradeCard.TARGETING_COMPUTER))
    {
        answer[answer.length] = ShipAction.TARGET_LOCK;
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

    // if (!upgrades.isEmpty())
    if (upgrades.length > 0)
    {
        // for (final UpgradeCard upgrade : upgrades)
        for (var i = 0; i < upgrades.length; i++)
        {
            var upgrade = upgrades[i];

            if (upgrade.hasAction)
            {
                // answer.add(new UpgradeCardShipAction(upgrade));
                answer[answer.length] = new UpgradeCardShipAction(upgrade);
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
    return Array.Vizzini.contains(criticalDamages, damage);
}

/*
 * @return true if this ship is destroyed.
 */
Token.prototype.isDestroyed = function()
{
    return (this.getDamageCount() + this.getCriticalDamageCount()) >= this
            .getHullValue();
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
    return Array.Vizzini.contains(upgrades, upgrade);
}

/*
 * @param damage Critical damage.
 */
Token.prototype.removeCriticalDamage = function(damage)
{
    var criticalDamages = this.getCriticalDamages();
    Array.Vizzini.remove(criticalDamages, damage);
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
