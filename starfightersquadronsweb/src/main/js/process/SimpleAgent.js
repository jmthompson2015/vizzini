define(["Maneuver", "ManeuverComputer", "process/ModifyAttackDiceAction", "process/ModifyDefenseDiceAction", "PlayFormat", "RangeRuler", "Ship", "ShipAction", "process/ShipActionAction"],
    function(Maneuver, ManeuverComputer, ModifyAttackDiceAction, ModifyDefenseDiceAction, PlayFormat, RangeRuler, Ship, ShipAction, ShipActionAction)
    {
        "use strict";

        function SimpleAgent(name, teamKey)
        {
            InputValidator.validateNotEmpty("name", name);
            InputValidator.validateNotNull("teamKey", teamKey);

            this.name = function()
            {
                return name;
            };

            this.teamKey = function()
            {
                return teamKey;
            };
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
                var choices = environment.createWeaponToRangeToDefenders(attacker);

                if (choices.length > 0)
                {
                    for (var i = 0; i < choices.length; i++)
                    {
                        var weaponData = choices[i];
                        LOGGER.trace("weaponData = " + JSON.stringify(weaponData));
                        var myWeapon = weaponData.weapon;
                        LOGGER.trace("myWeapon = " + myWeapon);

                        if (myWeapon.isPrimary())
                        {
                            // The first entry should be the closest.
                            var rangeToDefenders = weaponData.rangeToDefenders;
                            LOGGER.trace("rangeToDefenders = " + JSON.stringify(rangeToDefenders));
                            LOGGER.trace("rangeToDefenders[0].range = " + rangeToDefenders[0].range);
                            LOGGER.trace("rangeToDefenders[0].defenders = " + rangeToDefenders[0].defenders);
                            var defenders = rangeToDefenders[0].defenders;
                            LOGGER.trace("defenders = " + defenders);
                            weapon = myWeapon;
                            defender = defenders[0];
                            break;
                        }
                    }
                }
            }

            callback(weapon, defender);
        };

        SimpleAgent.prototype.dealDamage = function(environment, adjudicator, attacker, attackDice, defender, defenseDice,
            damageDealer, callback)
        {
            // Nothing to do.
        };

        SimpleAgent.prototype.determineValidDecloakActions = function(environment, adjudicator, token)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("token", token);

            var answer = [];

            if (adjudicator.canDecloak(environment, token, Maneuver.BARREL_ROLL_LEFT_2_STANDARD))
            {
                answer.push(new ShipActionAction.Decloak(environment, token, Maneuver.BARREL_ROLL_LEFT_2_STANDARD));
            }

            if (adjudicator.canDecloak(environment, token, Maneuver.STRAIGHT_2_STANDARD))
            {
                answer.push(new ShipActionAction.Decloak(environment, token, Maneuver.STRAIGHT_2_STANDARD));
            }

            if (adjudicator.canDecloak(environment, token, Maneuver.BARREL_ROLL_RIGHT_2_STANDARD))
            {
                answer.push(new ShipActionAction.Decloak(environment, token, Maneuver.BARREL_ROLL_RIGHT_2_STANDARD));
            }

            return answer;
        };

        SimpleAgent.prototype.determineValidManeuvers = function(environment, token)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("token", token);

            var fromPosition = environment.getPositionFor(token);
            var shipBase = token.pilot().shipTeam.ship.shipBase;
            var maneuverKeys = token.maneuverKeys();
            LOGGER.trace("maneuverKeys.length = " + maneuverKeys.length + " for " + token);

            // Find the maneuvers which keep the ship on the battlefield.
            return maneuverKeys.filter(function(maneuverKey)
            {
                var maneuver = Maneuver.properties[maneuverKey];
                var toPosition = ManeuverComputer.computeToPosition(environment.playFormatKey(), maneuver, fromPosition,
                    shipBase);
                var polygon;

                if (toPosition)
                {
                    polygon = ManeuverComputer.computePolygon(shipBase, toPosition.x(), toPosition.y(), toPosition
                        .heading());
                }

                return (toPosition && PlayFormat.isPathInPlayArea(environment.playFormatKey(), polygon));
            });
        };

        SimpleAgent.prototype.determineValidShipActions = function(environment, adjudicator, token)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("token", token);

            var shipActions = token.shipActions();
            var answer = [];

            if (shipActions.vizziniContains(ShipAction.FOCUS))
            {
                answer.push(new ShipActionAction.Focus(environment.store(), token));
            }

            if (shipActions.vizziniContains(ShipAction.TARGET_LOCK))
            {
                var defenders = environment.getDefendersInRange(token);

                if (defenders && defenders.length > 0)
                {
                    var store = environment.store();

                    defenders.forEach(function(defender)
                    {
                        // Only put choices without a current target lock.
                        if (!token.findTargetLockByDefender(defender))
                        {
                            answer.push(new ShipActionAction.SAATargetLock(store, token, defender));
                        }
                    });
                }
            }

            if (shipActions.vizziniContains(ShipAction.BARREL_ROLL) &&
                adjudicator.canBarrelRoll(environment, token, Maneuver.BARREL_ROLL_LEFT_1_STANDARD))
            {
                answer.push(new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_LEFT_1_STANDARD));
            }

            if (shipActions.vizziniContains(ShipAction.BARREL_ROLL) &&
                adjudicator.canBarrelRoll(environment, token, Maneuver.BARREL_ROLL_RIGHT_1_STANDARD))
            {
                answer.push(new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_RIGHT_1_STANDARD));
            }

            if (shipActions.vizziniContains(ShipAction.BOOST) &&
                adjudicator.canBoost(environment, token, Maneuver.BANK_LEFT_1_STANDARD))
            {
                answer.push(new ShipActionAction.Boost(environment, token, Maneuver.BANK_LEFT_1_STANDARD));
            }

            if (shipActions.vizziniContains(ShipAction.BOOST) &&
                adjudicator.canBoost(environment, token, Maneuver.STRAIGHT_1_STANDARD))
            {
                answer.push(new ShipActionAction.Boost(environment, token, Maneuver.STRAIGHT_1_STANDARD));
            }

            if (shipActions.vizziniContains(ShipAction.BOOST) &&
                adjudicator.canBoost(environment, token, Maneuver.BANK_RIGHT_1_STANDARD))
            {
                answer.push(new ShipActionAction.Boost(environment, token, Maneuver.BANK_RIGHT_1_STANDARD));
            }

            if (shipActions.vizziniContains(ShipAction.SLAM))
            {
                var previousManeuver = token.activationState().maneuverAction().maneuver();
                var speed = previousManeuver.speed;
                var ship = token.pilot().shipTeam.ship;
                var maneuverKeys = ship.maneuverKeys;

                maneuverKeys.forEach(function(maneuverKey)
                {
                    // FIXME: check Adjudicator.canSlam()
                    if (Maneuver.properties[maneuverKey].speed === speed)
                    {
                        answer.push(new ShipActionAction.Slam(environment, token, maneuverKey));
                    }
                });
            }

            if (shipActions.vizziniContains(ShipAction.EVADE))
            {
                answer.push(new ShipActionAction.Evade(environment.store(), token));
            }

            if (shipActions.vizziniContains(ShipAction.CLOAK))
            {
                answer.push(new ShipActionAction.Cloak(environment.store(), token));
            }

            if (shipActions.vizziniContains(ShipAction.REINFORCE))
            {
                if (token.parent !== undefined)
                {
                    if (!token.parent.tokenFore().isDestroyed())
                    {
                        answer.push(new ShipActionAction.Reinforce(environment.store(), token.parent.tokenFore()));
                    }
                    if (!token.parent.tokenAft().isDestroyed())
                    {
                        answer.push(new ShipActionAction.Reinforce(environment.store(), token.parent.tokenAft()));
                    }
                }
                else
                {
                    answer.push(new ShipActionAction.Reinforce(environment.store(), token));
                }
            }

            var tokens;

            if (shipActions.vizziniContains(ShipAction.COORDINATE))
            {
                tokens = environment.getFriendlyTokensAtRange(token, RangeRuler.ONE);
                tokens.vizziniAddAll(environment.getFriendlyTokensAtRange(token, RangeRuler.TWO));

                tokens.forEach(function(myToken)
                {
                    if (myToken !== token && (token.parent === undefined || token.parent !== myToken))
                    {
                        answer.push(new ShipActionAction.Coordinate(myToken));
                    }
                });
            }

            if (shipActions.vizziniContains(ShipAction.JAM))
            {
                tokens = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE);
                tokens.vizziniAddAll(environment.getUnfriendlyTokensAtRange(token, RangeRuler.TWO));

                tokens.forEach(function(myToken)
                {
                    var isHuge = myToken.isHuge();

                    if (!isHuge && myToken.stressCount() < 2)
                    {
                        answer.push(new ShipActionAction.Jam(environment.store(), myToken));
                    }
                });
            }

            if (shipActions.vizziniContains(ShipAction.RECOVER))
            {
                if (token.parent !== undefined)
                {
                    if (!token.parent.tokenFore().isDestroyed())
                    {
                        answer.push(new ShipActionAction.Recover(token.parent.tokenFore()));
                    }
                    if (!token.parent.tokenAft().isDestroyed())
                    {
                        answer.push(new ShipActionAction.Recover(token.parent.tokenAft()));
                    }
                }
                else
                {
                    answer.push(new ShipActionAction.Recover(token));
                }
            }

            LOGGER.debug("SimpleAgent.determineValidShipActions() answer = " + answer);

            return answer;
        };

        SimpleAgent.prototype.getDecloakAction = function(environment, adjudicator, token, callback)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("callback", callback);

            var decloakActions = this.determineValidDecloakActions(environment, adjudicator, token);
            var answer = decloakActions.vizziniRandomElement();

            callback(answer);
        };

        SimpleAgent.prototype.getModifyAttackDiceAction = function(environment, adjudicator, attacker, attackDice,
            defender, callback)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("attackDice", attackDice);
            InputValidator.validateNotNull("defender", defender);
            InputValidator.validateNotNull("callback", callback);

            var modifications = [null];
            var store = environment.store();

            var targetLock = attacker.findTargetLockByDefender(defender);

            if (targetLock)
            {
                modifications.push(ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK);
            }

            if (attacker.focusCount() > 0)
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
        };

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

            var modifications = [null];
            var store = environment.store();

            if (defender.evadeCount() > 0)
            {
                modifications.push(ModifyDefenseDiceAction.Modification.SPEND_EVADE);
            }

            if (defender.focusCount() > 0)
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
        };

        SimpleAgent.prototype.getPlanningAction = function(environment, adjudicator, callback)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("callback", callback);

            var team = this.teamKey();
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
                    var maneuvers = token.maneuverKeys();
                    maneuver = maneuvers.vizziniRandomElement();
                    LOGGER.trace("1 maneuver = " + maneuver + " for " + token);
                }

                tokenToManeuver[token] = maneuver;
            }, this);

            callback(tokenToManeuver);
        };

        SimpleAgent.prototype.getShipAction = function(environment, adjudicator, token, callback)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("token", token);

            var shipActions = this.determineValidShipActions(environment, adjudicator, token);

            var answer = shipActions.vizziniRandomElement();

            callback(answer);
        };

        SimpleAgent.prototype.isComputerAgent = function()
        {
            return true;
        };

        SimpleAgent.prototype.toString = function()
        {
            return this.name() + ", SimpleAgent, " + this.teamKey();
        };

        return SimpleAgent;
    });
