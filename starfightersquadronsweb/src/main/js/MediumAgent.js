define([ "Difficulty", "Maneuver", "ManeuverComputer", "ModifyAttackDiceAction", "ModifyDefenseDiceAction",
        "PlanningAction", "Position", "RangeRuler", "ShipAction", "SimpleAgent" ], function(Difficulty, Maneuver,
        ManeuverComputer, ModifyAttackDiceAction, ModifyDefenseDiceAction, PlanningAction, Position, RangeRuler,
        ShipAction, SimpleAgent)
{
    "use strict";
    function MediumAgent(name, teamKey)
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

    // Create a prototype object that inherits from the prototype of SimpleAgent.
    MediumAgent.prototype = Vizzini.inherit(SimpleAgent.prototype);

    // Now add properties to the prototype. These properties override the properties
    // of the same name from SimpleAgent.prototype.
    Vizzini.extend(MediumAgent.prototype,
    {
        getModifyAttackDiceAction: function(environment, adjudicator, attacker, attackDice, defender, callback)
        {
            // Maximize the hits and critical hits.
            var answer;
            var modification;

            if (attackDice.hitCount() + attackDice.criticalHitCount() === attackDice.size())
            {
                // All hits and critical hits. Pass.
            }
            else if (attacker.findTargetLockByDefender(defender))
            {
                modification = ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK;
                answer = new ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification);
            }
            else if (attacker.focus().count() > 0 && attackDice.focusCount() > 0)
            {
                modification = ModifyAttackDiceAction.Modification.SPEND_FOCUS;
                answer = new ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification);
            }

            callback(answer);
        },

        getModifyDefenseDiceAction: function(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                callback)
        {
            var answer;
            var totalHits = attackDice.hitCount() + attackDice.criticalHitCount();
            var modification;

            if (defenseDice.evadeCount() >= totalHits)
            {
                // Enough evades. Pass.
            }
            else if (defender.evade().count() > 0 && defenseDice.evadeCount() + 1 >= totalHits)
            {
                modification = ModifyDefenseDiceAction.Modification.SPEND_EVADE;
                answer = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
            }
            else if (defender.focus().count() > 0 && defenseDice.focusCount() > 0)
            {
                modification = ModifyDefenseDiceAction.Modification.SPEND_FOCUS;
                answer = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
            }
            else if (defender.evade().count() > 0)
            {
                modification = ModifyDefenseDiceAction.Modification.SPEND_EVADE;
                answer = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
            }

            callback(answer);
        },

        getPlanningAction: function(environment, adjudicator, callback)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("callback", callback);

            var team = this.teamKey();
            var tokens = environment.getTokensForTeam(team);
            var defenders = environment.getDefenders(team);
            var tokenToManeuver = {};

            tokens.forEach(function(token)
            {
                var fromPosition = environment.getPositionFor(token);
                var shipBase = token.pilot().shipTeam.ship.shipBaseKey;
                var maneuvers = token.maneuverKeys();
                LOGGER.trace("maneuvers.length = " + maneuvers.length + " for " + token);

                // Find the maneuvers which keep the ship on the battlefield.
                var validManeuvers = [];
                var closestManeuver;
                var minDistance;

                // Find the maneuvers which take the ship within range of a defender.
                var validManeuversR1 = [];
                var validManeuversR2 = [];
                var validManeuversR3 = [];

                maneuvers.forEach(function(maneuver)
                {
                    var toPosition = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

                    if (toPosition &&
                            Position.isPathInPlayArea(ManeuverComputer.computePolygon(shipBase, toPosition.x(),
                                    toPosition.y(), toPosition.heading())))
                    {
                        validManeuvers.push(maneuver);
                        var weapon = token.primaryWeapon();

                        for (var i = 0; i < defenders.length; i++)
                        {
                            var defender = defenders[i];
                            var defenderPosition = environment.getPositionFor(defender);

                            // Save the maneuver which has the minimum distance.
                            var distance = toPosition.computeDistance(defenderPosition);

                            if (!minDistance || distance < minDistance)
                            {
                                closestManeuver = maneuver;
                                minDistance = distance;
                            }

                            if (weapon.isDefenderTargetable(token, toPosition, defender, defenderPosition))
                            {
                                var range = RangeRuler.getRange(token, toPosition, defender, defenderPosition);

                                if (range === RangeRuler.ONE)
                                {
                                    validManeuversR1.push(maneuver);
                                }
                                else if (range === RangeRuler.TWO)
                                {
                                    validManeuversR2.push(maneuver);
                                }
                                else if (range === RangeRuler.THREE)
                                {
                                    validManeuversR3.push(maneuver);
                                }
                            }
                        }
                    }
                });

                var maneuver;

                if (token.isStressed())
                {
                    // Choose a green maneuver.
                    var greenManeuvers = validManeuvers.filter(function(maneuverKey)
                    {
                        return Maneuver.properties[maneuverKey].difficultyKey === Difficulty.GREEN;
                    });

                    maneuver = greenManeuvers.vizziniRandomElement();
                }

                if (!maneuver)
                {
                    LOGGER.trace("validManeuversR1.length = " + validManeuversR1.length + " for " + token);
                    maneuver = validManeuversR1.vizziniRandomElement();
                }

                if (!maneuver)
                {
                    LOGGER.trace("validManeuversR2.length = " + validManeuversR2.length + " for " + token);
                    maneuver = validManeuversR2.vizziniRandomElement();
                }

                if (!maneuver)
                {
                    LOGGER.trace("validManeuversR3.length = " + validManeuversR3.length + " for " + token);
                    maneuver = validManeuversR3.vizziniRandomElement();
                }

                if (!maneuver && closestManeuver)
                {
                    LOGGER.trace("closestManeuver = " + closestManeuver + " for " + token);
                    maneuver = closestManeuver;
                }

                if (!maneuver)
                {
                    LOGGER.trace("validManeuvers.length = " + validManeuvers.length + " for " + token);
                    maneuver = validManeuvers.vizziniRandomElement();
                }

                LOGGER.trace("0 maneuver = " + maneuver + " for " + token);

                if (!maneuver)
                {
                    // The ship fled the battlefield.
                    maneuver = maneuvers.vizziniRandomElement();
                    LOGGER.trace("1 maneuver = " + maneuver + " for " + token);
                }

                tokenToManeuver[token] = maneuver;
            });

            var answer = new PlanningAction(environment, this, tokenToManeuver);

            callback(answer);
        },

        getShipAction: function(environment, adjudicator, token, callback)
        {
            var answer;

            var shipActions = SimpleAgent.prototype.determineValidShipActions.call(this, environment, adjudicator,
                    token);
            var targetLocks = shipActions.filter(function(shipAction)
            {
                return shipAction.defender;
            });

            if (token.attackerTargetLocks().length === 0 && targetLocks.length > 0)
            {
                answer = targetLocks.vizziniRandomElement();
            }
            else if (token.focus().count() === 0 && shipActions.vizziniContains(ShipAction.FOCUS))
            {
                answer = ShipAction.FOCUS;
            }
            else if (token.evade().count() === 0 && shipActions.vizziniContains(ShipAction.EVADE))
            {
                answer = ShipAction.EVADE;
            }
            else
            {
                // answer = SimpleAgent.prototype.getShipAction.call(this, environment, adjudicator, token, callback);
                answer = shipActions.vizziniRandomElement();
            }

            callback(answer);
        },

        toString: function()
        {
            return this.name() + ", MediumAgent, " + this.teamKey();
        },
    });

    return MediumAgent;
});
