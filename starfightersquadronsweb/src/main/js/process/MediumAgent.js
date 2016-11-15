define(["Difficulty", "Maneuver", "ManeuverComputer", "process/ModifyAttackDiceAction", "process/ModifyDefenseDiceAction", "PlayFormat", "RangeRuler", "ShipAction", "process/SimpleAgent"],
    function(Difficulty, Maneuver, ManeuverComputer, ModifyAttackDiceAction, ModifyDefenseDiceAction, PlayFormat, RangeRuler, ShipAction, SimpleAgent)
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
                // FIXME: Maximize the hits and critical hits.
                // var store = environment.store();
                // var bestModification;
                // var bestHits = -1;
                // var modifications = SimpleAgent.prototype.determineValidModifyAttackDiceActions.call(this, environment, attacker, attackDice, defender);
                //
                // modifications.forEach(function(modification)
                // {
                //     var mockDice = attackDice.newInstance();
                //     var mockAttacker = attacker.newInstance(store, attacker.agent());
                //     var mockDefender = defender.newInstance(store, defender.agent());
                //     var mod = new ModifyAttackDiceAction(environment, mockAttacker, mockDice, mockDefender, modification.modificationKey(), modification.upgradeKey());
                //     mod.doIt();
                //     var hits = mockDice.hitCount() + mockDice.criticalHitCount();
                //
                //     if (hits > bestHits)
                //     {
                //         bestModification = modification;
                //         bestHits = hits;
                //     }
                // });

                var modifications = SimpleAgent.prototype.determineValidModifyAttackDiceActions.call(this, environment, attacker, attackDice, defender);
                var bestModification = modifications.vizziniRandomElement();

                callback(bestModification);
            },

            getModifyDefenseDiceAction: function(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                callback)
            {
                // FIXME: Maximize the evades.
                // var store = environment.store();
                // var bestModification;
                // var bestEvades;
                // var modifications = SimpleAgent.prototype.determineValidModifyDefenseDiceActions.call(this, environment, attacker, attackDice, defender, defenseDice);
                //
                // modifications.forEach(function(modification)
                // {
                //     var mockDice = defenseDice.newInstance();
                //     var mockDefender = defender.newInstance(store, defender.agent());
                //     var mod = new ModifyDefenseDiceAction(environment, mockDefender, mockDice, modification.modificationKey(), modification.upgradeKey());
                //     mod.doIt();
                //     var evades = mockDice.evadeCount();
                //
                //     if (evades > bestEvades)
                //     {
                //         bestModification = modification;
                //         bestEvades = evades;
                //     }
                // });

                var modifications = SimpleAgent.prototype.determineValidModifyDefenseDiceActions.call(this, environment, attacker, attackDice, defender, defenseDice);
                var bestModification = modifications.vizziniRandomElement();

                callback(bestModification);
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
                var store = environment.store();

                tokens.forEach(function(token)
                {
                    var fromPosition = environment.getPositionFor(token);
                    var shipBase = token.pilot().shipTeam.ship.shipBase;
                    var maneuverKeys = token.maneuverKeys();
                    LOGGER.trace("maneuverKeys.length = " + maneuverKeys.length + " for " + token);

                    // Find the maneuvers which keep the ship on the battlefield.
                    var validManeuvers = [];
                    var closestManeuver;
                    var minDistance;

                    // Find the maneuvers which take the ship within range of a defender.
                    var validManeuversR1 = [];
                    var validManeuversR2 = [];
                    var validManeuversR3 = [];

                    maneuverKeys.forEach(function(maneuverKey)
                    {
                        var maneuver = Maneuver.properties[maneuverKey];
                        var toPosition = ManeuverComputer.computeToPosition(environment.playFormatKey(), maneuver,
                            fromPosition, shipBase);

                        if (toPosition &&
                            PlayFormat.isPathInPlayArea(environment.playFormatKey(), ManeuverComputer.computePolygon(
                                shipBase, toPosition.x(), toPosition.y(), toPosition.heading())))
                        {
                            validManeuvers.push(maneuverKey);
                            var weapon = token.primaryWeapon();

                            if (weapon)
                            {
                                for (var i = 0; i < defenders.length; i++)
                                {
                                    var defender = defenders[i];
                                    var defenderPosition = environment.getPositionFor(defender);

                                    // Save the maneuver which has the minimum distance.
                                    var distance = toPosition.computeDistance(defenderPosition);

                                    if (!minDistance || distance < minDistance)
                                    {
                                        closestManeuver = maneuverKey;
                                        minDistance = distance;
                                    }

                                    if (weapon.isDefenderTargetable(token, toPosition, defender, defenderPosition))
                                    {
                                        var range = RangeRuler.getRange(token, toPosition, defender, defenderPosition);

                                        if (range === RangeRuler.ONE)
                                        {
                                            validManeuversR1.push(maneuverKey);
                                        }
                                        else if (range === RangeRuler.TWO)
                                        {
                                            validManeuversR2.push(maneuverKey);
                                        }
                                        else if (range === RangeRuler.THREE)
                                        {
                                            validManeuversR3.push(maneuverKey);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    var myManeuver;

                    if (token.isStressed())
                    {
                        // Choose a green maneuver.
                        var greenManeuvers = validManeuvers.filter(function(maneuverKey)
                        {
                            return Maneuver.properties[maneuverKey].difficultyKey === Difficulty.GREEN;
                        });

                        myManeuver = greenManeuvers.vizziniRandomElement();
                    }

                    if (!myManeuver)
                    {
                        LOGGER.trace("validManeuversR1.length = " + validManeuversR1.length + " for " + token);
                        myManeuver = validManeuversR1.vizziniRandomElement();
                    }

                    if (!myManeuver)
                    {
                        LOGGER.trace("validManeuversR2.length = " + validManeuversR2.length + " for " + token);
                        myManeuver = validManeuversR2.vizziniRandomElement();
                    }

                    if (!myManeuver)
                    {
                        LOGGER.trace("validManeuversR3.length = " + validManeuversR3.length + " for " + token);
                        myManeuver = validManeuversR3.vizziniRandomElement();
                    }

                    if (!myManeuver && closestManeuver)
                    {
                        LOGGER.trace("closestManeuver = " + closestManeuver + " for " + token);
                        myManeuver = closestManeuver;
                    }

                    if (!myManeuver)
                    {
                        LOGGER.trace("validManeuvers.length = " + validManeuvers.length + " for " + token);
                        myManeuver = validManeuvers.vizziniRandomElement();
                    }

                    LOGGER.trace("0 myManeuver = " + myManeuver + " for " + token);

                    if (!myManeuver)
                    {
                        // The ship fled the battlefield.
                        myManeuver = maneuverKeys.vizziniRandomElement();
                        LOGGER.trace("1 myManeuver = " + myManeuver + " for " + token);
                    }

                    tokenToManeuver[token] = myManeuver;
                });

                callback(tokenToManeuver);
            },

            getShipAction: function(environment, adjudicator, token, callback)
            {
                var answer;

                var store = environment.store();
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
                else if (token.focusCount() === 0 && shipActions.vizziniContains(ShipAction.FOCUS))
                {
                    answer = ShipAction.FOCUS;
                }
                else if (token.evadeCount() === 0 && shipActions.vizziniContains(ShipAction.EVADE))
                {
                    answer = ShipAction.EVADE;
                }
                else
                {
                    answer = shipActions.vizziniRandomElement();
                }

                LOGGER.info("shipAction for " + token.name() + ": " + answer);

                callback(answer);
            },

            toString: function()
            {
                return this.name() + ", MediumAgent, " + this.teamKey();
            },
        });

        return MediumAgent;
    });
