define([ "Maneuver", "ModifyAttackDiceAction", "ModifyDefenseDiceAction", "PlanningAction", "Position", "RangeRuler",
        "Ship", "ShipAction", "ShipBase", "Weapon" ], function(Maneuver, ModifyAttackDiceAction,
        ModifyDefenseDiceAction, PlanningAction, Position, RangeRuler, Ship, ShipAction, ShipBase, Weapon)
{
    function SimpleAgent(name, team, squadBuilder)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("team", team);
        InputValidator.validateNotNull("squadBuilder", squadBuilder);

        this.name = function()
        {
            return name;
        }

        this.team = function()
        {
            return team;
        }

        this.squadBuilder = function()
        {
            return squadBuilder;
        }
    }

    SimpleAgent.prototype.buildSquad = function()
    {
        return this.squadBuilder().buildSquad(this);
    }

    SimpleAgent.prototype.chooseWeaponAndDefender = function(environment, adjudicator, attacker, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("callback", callback);

        var weapon;
        var defender;

        var attackerPosition = environment.getPositionFor(attacker);

        if (attackerPosition)
        {
            var myWeapon = attacker.primaryWeapon();
            var values = RangeRuler.values();

            for (var i = 0; i < values.length; i++)
            {
                var range = values[i];
                var rangeDefenders = environment.getTargetableDefendersAtRange(attacker, attackerPosition, myWeapon,
                        range);
                LOGGER.trace("range = " + range + " rangeDefenders.length = " + rangeDefenders.length);

                if (rangeDefenders.length > 0)
                {
                    var myDefender = rangeDefenders.vizziniRandomElement();

                    // if (myDefender)
                    // {
                    var defenderPosition = environment.getPositionFor(myDefender);

                    // if (defenderPosition)
                    // {
                    weapon = myWeapon;
                    defender = myDefender;
                    break;
                    // }
                    // }
                }
            }
        }

        callback(weapon, defender);
    }

    SimpleAgent.prototype.dealDamage = function(environment, adjudicator, attacker, attackDice, defender, defenseDice,
            damageDealer, callback, damageDealer)
    {
    // callback();
    }

    SimpleAgent.prototype.determineValidManeuvers = function(environment, token)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("token", token);

        var fromPosition = environment.getPositionFor(token);
        var shipBase = token.shipBase();
        var maneuvers = token.maneuvers();
        LOGGER.trace("maneuvers.length = " + maneuvers.length + " for " + token);

        // Find the maneuvers which keep the ship on the battlefield.
        return maneuvers.filter(function(maneuver)
        {
            var toPosition = Maneuver.computeToPosition(maneuver, fromPosition, shipBase);
            var polygon;

            if (toPosition)
            {
                polygon = Maneuver.computePolygon(shipBase, toPosition.x(), toPosition.y(), toPosition.heading());
            }

            return (toPosition && Position.isPathInPlayArea(polygon));
        });
    }

    SimpleAgent.prototype.determineValidShipActions = function(environment, adjudicator, token)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("token", token);

        var shipActions = token.shipActions();
        var answer = [];

        if (shipActions.vizziniContains(ShipAction.FOCUS))
        {
            answer.push(ShipAction.FOCUS);
        }

        if (shipActions.vizziniContains(ShipAction.TARGET_LOCK))
        {
            var defenders = environment.getDefendersInRange(token);

            if (defenders && defenders.length > 0)
            {
                defenders.forEach(function(defender)
                {
                    // Only put choices without a current target lock.
                    if (!token.findTargetLockByDefender(defender))
                    {
                        answer.push(ShipAction.createTargetLockShipAction(defender));
                    }
                });
            }
        }

        if (shipActions.vizziniContains(ShipAction.BARREL_ROLL_LEFT)
                && adjudicator.canBarrelRoll(environment, token,
                        ShipAction.properties[ShipAction.BARREL_ROLL_LEFT].maneuver))
        {
            answer.push(ShipAction.BARREL_ROLL_LEFT);
        }

        if (shipActions.vizziniContains(ShipAction.BARREL_ROLL_RIGHT)
                && adjudicator.canBarrelRoll(environment, token,
                        ShipAction.properties[ShipAction.BARREL_ROLL_RIGHT].maneuver))
        {
            answer.push(ShipAction.BARREL_ROLL_RIGHT);
        }

        if (shipActions.vizziniContains(ShipAction.BOOST_LEFT)
                && adjudicator.canBoost(environment, token, ShipAction.properties[ShipAction.BOOST_LEFT].maneuver))
        {
            answer.push(ShipAction.BOOST_LEFT);
        }

        if (shipActions.vizziniContains(ShipAction.BOOST_STRAIGHT)
                && adjudicator.canBoost(environment, token, ShipAction.properties[ShipAction.BOOST_STRAIGHT].maneuver))
        {
            answer.push(ShipAction.BOOST_STRAIGHT);
        }

        if (shipActions.vizziniContains(ShipAction.BOOST_RIGHT)
                && adjudicator.canBoost(environment, token, ShipAction.properties[ShipAction.BOOST_RIGHT].maneuver))
        {
            answer.push(ShipAction.BOOST_RIGHT);
        }

        if (shipActions.vizziniContains(ShipAction.SLAM))
        {
            var previousManeuver = token.activationState().maneuverAction().maneuver();
            var speed = Maneuver.properties[previousManeuver].speed;
            var ship = token.ship();
            var maneuvers = Ship.properties[ship].maneuvers;

            maneuvers.forEach(function(maneuver)
            {
                if (Maneuver.properties[maneuver].speed === speed)
                {
                    answer.push(ShipAction.createSlamShipAction(maneuver));
                }
            });
        }

        if (shipActions.vizziniContains(ShipAction.EVADE))
        {
            answer.push(ShipAction.EVADE);
        }

        if (shipActions.vizziniContains(ShipAction.CLOAK))
        {
            answer.push(ShipAction.CLOAK);
        }

        return answer;
    }

    SimpleAgent.prototype.getModifyAttackDiceAction = function(environment, adjudicator, attacker, attackDice,
            defender, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("callback", callback);

        var modifications = [ null ];

        var targetLock = attacker.findTargetLockByDefender(defender);

        if (targetLock)
        {
            modifications.push(ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK);
        }

        if (attacker.focus().count() > 0)
        {
            modifications.push(ModifyAttackDiceAction.Modification.SPEND_FOCUS);
        }

        var modification = modifications.vizziniRandomElement();
        var answer;

        if (modification)
        {
            answer = new ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification);
        }

        callback(answer);
    }

    SimpleAgent.prototype.getModifyDefenseDiceAction = function(environment, adjudicator, attacker, attackDice,
            defender, defenseDice, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenseDice", defenseDice);
        InputValidator.validateNotNull("callback", callback);

        var modifications = [ null ];

        if (defender.evade().count() > 0)
        {
            modifications.push(ModifyDefenseDiceAction.Modification.SPEND_EVADE);
        }

        if (defender.focus().count() > 0)
        {
            modifications.push(ModifyDefenseDiceAction.Modification.SPEND_FOCUS);
        }

        var modification = modifications.vizziniRandomElement();
        var answer;

        if (modification)
        {
            answer = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
        }

        callback(answer);
    }

    SimpleAgent.prototype.getPlanningAction = function(environment, adjudicator, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("callback", callback);

        var team = this.team();
        var tokens = environment.getTokensForTeam(team);
        var tokenToManeuver = {};

        tokens.forEach(function(token)
        {
            var validManeuvers = this.determineValidManeuvers(environment, token);

            LOGGER.trace("validManeuvers.length = " + validManeuvers.length + " for " + token);
            var maneuver = validManeuvers.vizziniRandomElement();

            LOGGER.trace("0 maneuver = " + maneuver + " for " + token);

            if (!maneuver)
            {
                // Ship fled the battlefield.
                var maneuvers = token.maneuvers();
                maneuver = maneuvers.vizziniRandomElement();
                LOGGER.trace("1 maneuver = " + maneuver + " for " + token);
            }

            tokenToManeuver[token] = maneuver;
        }, this);

        var answer = new PlanningAction(environment, this, tokenToManeuver);

        callback(answer);
    }

    SimpleAgent.prototype.getShipAction = function(environment, adjudicator, token, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("token", token);

        var shipActions = this.determineValidShipActions(environment, adjudicator, token);

        var answer;

        // if (shipActions.length > 0)
        // {
        answer = shipActions.vizziniRandomElement();
        // }

        callback(answer);
    }

    SimpleAgent.prototype.toString = function()
    {
        return this.name() + ", SimpleAgent, " + this.team() + ", " + this.squadBuilder().name();
    }

    return SimpleAgent;
});
