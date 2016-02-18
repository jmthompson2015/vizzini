/*
 * Provides an environment for Starfighter Squadrons.
 * <dl>
 * <dt>heading</dt>
 * <dd>Absolute angle in degrees from the +X axis measured clockwise. Angle is normalized to [0,360).
 * <dt>bearing</dt>
 * <dd>Relative angle in degrees from a ship's heading measured clockwise. Angle is normalized to [0,360).
 * <dt>in range</dt>
 * <dd>Distance to target has a non-null range (ONE, TWO, or THREE) from the <code>RangeRuler</code>.
 * <dt>in firing arc</dt>
 * <dd>Defender's bearing is within the attacker's primary weapon firing arc (typically +/-45 deg forward).
 * <dt>vulnerable</dt>
 * <dd>The attacker's primary weapon can be brought to bear on the defender, although the defender may be out of range.
 * Typically this is the same as in firing arc.</dd>
 * <dt>targetable</dt>
 * <dd>Defender can be hit by the attacker's primary weapon. Typically this means the target is in range and vulnerable,
 * but not touching.
 * </dl>
 */
define([ "DamageCard", "ManeuverComputer", "Phase", "Position", "RangeRuler", "RectanglePath", "Team", "Token", ],
        function(DamageCard, ManeuverComputer, Phase, Position, RangeRuler, RectanglePath, Team, Token)
        {
            "use strict";
            function Environment(team1, team2)
            {
                InputValidator.validateNotNull("team1", team1);
                InputValidator.validateNotNull("team2", team2);

                var that = this;

                var activeToken;
                var firstAgent;
                var phase;
                var secondAgent;
                var round = 0;

                var positionToToken = {};
                var tokenToPosition = {};

                var damageDeck = DamageCard.createDeck();
                var damageDiscardPile = [];

                this.activeToken = function(newActiveToken)
                {
                    if (newActiveToken)
                    {
                        var oldValue = activeToken;
                        activeToken = newActiveToken;

                        LOGGER.info("Active Token: " + activeToken);
                        this.trigger(Environment.ACTIVE_TOKEN_EVENT, activeToken);
                    }

                    return activeToken;
                };

                this.createWeaponToRangeToDefenders = function(attacker)
                {
                    var answer = [];

                    var attackerPosition = this.getPositionFor(attacker);

                    if (attackerPosition)
                    {
                        var primaryWeapon = attacker.primaryWeapon();
                        var rangeToDefenders = createRangeToDefenders(attacker, attackerPosition, primaryWeapon);

                        if (rangeToDefenders.length > 0)
                        {
                            answer.push(createWeaponData(primaryWeapon, rangeToDefenders));
                        }

                        var weapons = attacker.secondaryWeapons();

                        weapons.forEach(function(weapon)
                        {
                            rangeToDefenders = createRangeToDefenders(attacker, attackerPosition, weapon);

                            if (rangeToDefenders.length > 0)
                            {
                                answer.push(createWeaponData(weapon, rangeToDefenders));
                            }
                        });
                    }

                    return answer;
                };

                this.discardAllDamage = function(damages)
                {
                    Array.prototype.push.apply(damageDiscardPile, damages);
                };

                this.discardDamage = function(damage)
                {
                    damageDiscardPile.push(damage);
                };

                this.drawDamage = function()
                {
                    var answer;

                    if (damageDeck.length === 0)
                    {
                        // Replenish the damage deck from the discard pile.
                        LOGGER.debug("Damage deck empty. Shuffling " + damageDiscardPile.length +
                                " discards into damage deck.");
                        Array.prototype.push.apply(damageDeck, damageDiscardPile);
                        damageDiscardPile = [];
                        damageDeck.vizziniShuffle();
                    }

                    LOGGER.trace("damageDeck.length = " + damageDeck.length);
                    answer = damageDeck[0];
                    damageDeck.splice(0, 1);

                    return answer;
                };

                this.firstAgent = function()
                {
                    return firstAgent;
                };

                this.firstTeam = function()
                {
                    return team1;
                };

                this.getDefenders = function(attackerTeam)
                {
                    InputValidator.validateNotNull("attackerTeam", attackerTeam);

                    var defenderTeam;

                    if (attackerTeam === team1)
                    {
                        defenderTeam = team2;
                    }
                    else if (attackerTeam === team2)
                    {
                        defenderTeam = team1;
                    }
                    else
                    {
                        throw "Can't find defenderTeam for attackerTeam = " + attackerTeam;
                    }

                    return this.getTokensForTeam(defenderTeam);
                };

                this.getDefendersInRange = function(attacker)
                {
                    InputValidator.validateNotNull("attacker", attacker);

                    var answer;
                    var attackerPosition = this.getPositionFor(attacker);

                    if (attackerPosition)
                    {
                        var defenders = this.getDefenders(attacker.pilot().shipTeam.teamKey);

                        if (defenders && defenders.length > 0)
                        {
                            answer = defenders.filter(
                                    function(defender)
                                    {
                                        var defenderPosition = this.getPositionFor(defender);
                                        var range = RangeRuler.getRange(attacker, attackerPosition, defender,
                                                defenderPosition);
                                        return (range !== undefined);
                                    }, this);
                        }
                    }

                    return answer;
                };

                this.getFriendlyTokensAtRange = function(token0, range)
                {
                    return this.getTokensAtRange(token0, range).filter(function(token)
                    {
                        return token.agent().teamKey() === token0.agent().teamKey();
                    });
                };

                this.getPositionFor = function(token)
                {
                    return tokenToPosition[token];
                };

                this.getTargetableDefenders = function(attacker, attackerPosition, weapon)
                {
                    InputValidator.validateNotNull("attacker", attacker);
                    InputValidator.validateNotNull("attackerPosition", attackerPosition);
                    InputValidator.validateNotNull("weapon", weapon);

                    var attackerTeam = attacker.pilot().shipTeam.teamKey;
                    var answer = this.getDefenders(attackerTeam);
                    LOGGER.trace("0 defenders = " + answer);
                    answer = answer.filter(function(defender)
                    {
                        var defenderPosition = this.getPositionFor(defender);
                        return isTargetable(attacker, attackerPosition, weapon, defender, defenderPosition);
                    }, this);
                    LOGGER.trace("1 targetable defenders = " + answer);

                    return answer;
                };

                this.getTargetableDefendersAtRange = function(attacker, attackerPosition, weapon, range)
                {
                    InputValidator.validateNotNull("attacker", attacker);
                    InputValidator.validateNotNull("attackerPosition", attackerPosition);
                    InputValidator.validateNotNull("weapon", weapon);
                    InputValidator.validateNotNull("range", range);

                    var answer = this.getTargetableDefenders(attacker, attackerPosition, weapon);
                    LOGGER.trace("0 targetable defenders = " + answer);
                    answer = answer.filter(function(defender)
                    {
                        var defenderPosition = this.getPositionFor(defender);
                        var myRange = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
                        return (myRange === range);
                    }, this);
                    LOGGER.trace("1 targetable defenders = " + answer);

                    return answer;
                };

                this.getTokenAt = function(position)
                {
                    return positionToToken[position];
                };

                this.getTokenCountFor = function(team)
                {
                    return this.getTokensForTeam(team).length;
                };

                this.getTokensAtRange = function(token0, range)
                {
                    InputValidator.validateNotNull("token0", token0);
                    InputValidator.validateNotNull("range", range);

                    var position0 = this.getPositionFor(token0);

                    return this.tokens().filter(function(token)
                    {
                        var answer;
                        if (token === token0)
                        {
                            answer = false;
                        }
                        else
                        {
                            var position = this.getPositionFor(token);
                            var myRange = RangeRuler.getRange(token0, position0, token, position);
                            answer = (myRange === range);
                        }
                        return answer;
                    }, this);
                };

                this.getTokensForActivation = function()
                {
                    return this.tokens().sort(function(token0, token1)
                    {
                        var skill0 = token0.pilotSkillValue();
                        var skill1 = token1.pilotSkillValue();
                        var answer = skill0 - skill1;

                        if (answer === 0)
                        {
                            var team0 = token0.pilot().shipTeam.teamKey;
                            var team1 = token1.pilot().shipTeam.teamKey;

                            if (team0 === team1)
                            {
                                answer = 0;
                            }
                            else if (team0 === Team.IMPERIAL)
                            {
                                answer = 1;
                            }
                            else
                            {
                                answer = 1;
                            }
                        }

                        return answer;
                    });
                };

                this.getTokensForCombat = function()
                {
                    return this.tokens().sort(function(token0, token1)
                    {
                        var skill0 = token0.pilotSkillValue();
                        var skill1 = token1.pilotSkillValue();
                        var answer = skill1 - skill0;

                        if (answer === 0)
                        {
                            var team0 = token0.pilot().shipTeam.teamKey;
                            var team1 = token1.pilot().shipTeam.teamKey;

                            if (team0 === team1)
                            {
                                answer = 0;
                            }
                            else if (team0 === Team.IMPERIAL)
                            {
                                answer = 1;
                            }
                            else
                            {
                                answer = 1;
                            }
                        }

                        if (answer === 0)
                        {
                            answer = token0.id() - token1.id();
                        }

                        return answer;
                    });
                };

                this.getTokensForTeam = function(teamKey)
                {
                    var answer = [];

                    for ( var position in positionToToken)
                    {
                        var token = positionToToken[position];

                        if (token.pilot().shipTeam.teamKey === teamKey)
                        {
                            answer[answer.length] = token;
                        }
                    }

                    return answer;
                };

                this.getTokensTouching = function(token)
                {
                    InputValidator.validateNotNull("token", token);

                    var answer = [];

                    var shipBase = token.pilot().shipTeam.ship.shipBase;
                    var tokenPosition = this.getPositionFor(token);
                    var polygon = ManeuverComputer.computePolygon(shipBase, tokenPosition.x(), tokenPosition.y(),
                            tokenPosition.heading());
                    var tokens = this.getTokensForActivation();

                    tokens.forEach(function(token2)
                    {
                        if (token !== token2)
                        {
                            var shipBase2 = token2.pilot().shipTeam.ship.shipBase;
                            var tokenPosition2 = this.getPositionFor(token2);
                            var polygon2 = ManeuverComputer.computePolygon(shipBase2, tokenPosition2.x(),
                                    tokenPosition2.y(), tokenPosition2.heading());

                            if (RectanglePath.doPolygonsCollide(polygon, polygon2))
                            {
                                answer.push(token2);
                            }
                        }
                    }, this);

                    return answer;
                };

                this.incrementRound = function()
                {
                    round++;

                    LOGGER.info("Round: " + round);
                    this.trigger(Environment.ROUND_EVENT, round);
                };

                this.phase = function(newPhase)
                {
                    if (newPhase)
                    {
                        var oldValue = phase;
                        phase = newPhase;

                        if (oldValue !== phase)
                        {
                            LOGGER.info("Phase: " + Phase.properties[phase].displayName);
                            this.trigger(Environment.PHASE_EVENT, phase);
                        }
                    }

                    return phase;
                };

                this.placeInitialTokens = function(agent1, squad1, agent2, squad2)
                {
                    InputValidator.validateNotNull("agent1", agent1);
                    InputValidator.validateNotNull("squad1", squad1);
                    InputValidator.validateNotNull("agent2", agent2);
                    InputValidator.validateNotNull("squad2", squad2);

                    firstAgent = agent1;
                    secondAgent = agent2;

                    Token.resetNextId();
                    var firstSquad = squad1.map(function(token)
                    {
                        return token.newInstance(agent1);
                    });
                    var secondSquad = squad2.map(function(token)
                    {
                        return token.newInstance(agent2);
                    });

                    placeTokens(firstSquad, true);
                    placeTokens(secondSquad, false);
                };

                this.placeToken = function(position, token)
                {
                    positionToToken[position] = token;
                    tokenToPosition[token] = position;
                };

                this.removeToken = function(position)
                {
                    var token = positionToToken[position];
                    delete positionToToken[position];
                    delete tokenToPosition[token];
                };

                this.round = function()
                {
                    return round;
                };

                this.secondAgent = function()
                {
                    return secondAgent;
                };

                this.secondTeam = function()
                {
                    return team2;
                };

                this.tokens = function()
                {
                    var answer = [];

                    for ( var position in positionToToken)
                    {
                        answer.push(positionToToken[position]);
                    }

                    return answer;
                };

                this.toString = function()
                {
                    var answer = "";

                    for ( var position in positionToToken)
                    {
                        answer += position.toString() + " " + positionToToken[position].toString() + "\n";
                    }

                    return answer;
                };

                function createRangeData(range, defenders)
                {
                    InputValidator.validateNotNull("range", range);
                    InputValidator.validateNotNull("defenders", defenders);
                    InputValidator.validateNotEmpty("defenders", defenders);

                    return (
                    {
                        range: range,
                        defenders: defenders,
                    });
                }

                function createRangeToDefenders(attacker, attackerPosition, weapon)
                {
                    var answer = [];

                    var ranges = weapon.ranges();

                    ranges.forEach(function(range)
                    {
                        LOGGER.trace("Environment.createRangeToDefenders() range = " + range);
                        var defenders = that.getTargetableDefendersAtRange(attacker, attackerPosition, weapon, range);
                        LOGGER.trace("Environment.createRangeToDefenders() defenders.length = " + defenders.length);

                        if (defenders.length > 0)
                        {
                            answer.push(createRangeData(range, defenders));
                        }
                    });

                    return answer;
                }

                function createWeaponData(weapon, rangeToDefenders)
                {
                    InputValidator.validateNotNull("weapon", weapon);
                    InputValidator.validateNotNull("rangeToDefenders", rangeToDefenders);

                    return (
                    {
                        weapon: weapon,
                        rangeToDefenders: rangeToDefenders,
                    });
                }

                function getTokensForPhase(phase)
                {
                    var answer;

                    switch (phase)
                    {
                    case Phase.PLANNING_START:
                    case Phase.PLANNING_END:
                        answer = that.getTokensForActivation();
                        break;
                    case Phase.ACTIVATION_START:
                    case Phase.ACTIVATION_REVEAL_DIAL:
                    case Phase.ACTIVATION_EXECUTE_MANEUVER:
                    case Phase.ACTIVATION_PERFORM_ACTION:
                    case Phase.ACTIVATION_END:
                        answer = that.getTokensForActivation();
                        break;
                    case Phase.COMBAT_START:
                    case Phase.COMBAT_DECLARE_TARGET:
                    case Phase.COMBAT_ROLL_ATTACK_DICE:
                    case Phase.COMBAT_MODIFY_ATTACK_DICE:
                    case Phase.COMBAT_ROLL_DEFENSE_DICE:
                    case Phase.COMBAT_MODIFY_DEFENSE_DICE:
                    case Phase.COMBAT_DEAL_DAMAGE:
                    case Phase.COMBAT_END:
                        answer = that.getTokensForCombat();
                        break;
                    case Phase.END_START:
                    case Phase.END_END:
                        answer = that.getTokensForCombat();
                        break;
                    default:
                        throw "Unknown phase: " + phase;
                    }

                    return answer;
                }

                function isTargetable(attacker, attackerPosition, weapon, defender, defenderPosition)
                {
                    InputValidator.validateNotNull("attacker", attacker);
                    InputValidator.validateNotNull("attackerPosition", attackerPosition);
                    InputValidator.validateNotNull("weapon", weapon);
                    InputValidator.validateNotNull("defender", defender);
                    InputValidator.validateNotNull("defenderPosition", defenderPosition);

                    // if (LOGGER.isTraceEnabled())
                    // {
                    // LOGGER.trace("weapon.isDefenderTargetable() ? "
                    // + weapon.isDefenderTargetable(attacker, attackerPosition,
                    // defender, defenderPosition));
                    // LOGGER.trace("isTouching() ? "
                    // + isTouching(attacker, defender));
                    // }

                    return weapon.isDefenderTargetable(attacker, attackerPosition, defender, defenderPosition) &&
                            !isTouching(attacker, defender);
                }

                function isTouching(attacker, defender)
                {
                    InputValidator.validateNotNull("attacker", attacker);
                    InputValidator.validateNotNull("defender", defender);

                    var touches = that.getTokensTouching(attacker);

                    return touches.vizziniContains(defender);
                }

                function makePhaseHandler(token)
                {
                    return function(phase)
                    {
                        token.phaseEffect(that, phase);
                    };
                }

                function placeTokens(tokens, isTop)
                {
                    var size = tokens.length;
                    var dx = Position.MAX_X / (size + 1);
                    var heading = isTop ? 90 : -90;

                    for (var i = 1; i <= tokens.length; i++)
                    {
                        var token = tokens[i - 1];
                        var shipBase = token.pilot().shipTeam.ship.shipBase;
                        var x = i * dx;
                        var y = (shipBase.height / 2);

                        if (!isTop)
                        {
                            y = Position.MAX_Y - y;
                        }

                        var position = new Position(x, y, heading);
                        that.placeToken(position, token);
                        that.bind(Environment.PHASE_EVENT, makePhaseHandler(token));
                    }
                }
            }

            Environment.ACTIVE_TOKEN_EVENT = "activeToken";
            Environment.PHASE_EVENT = "phase";
            Environment.ROUND_EVENT = "round";
            Environment.SHIP_DESTROYED_EVENT = "shipDestroyed";
            Environment.SHIP_FLED_EVENT = "shipFled";
            Environment.UPDATE_TRIGGER_EVENT = "updateTrigger";

            MicroEvent.mixin(Environment);

            return Environment;
        });
