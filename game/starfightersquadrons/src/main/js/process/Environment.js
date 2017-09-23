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
"use strict";

define(["DamageCard", "ManeuverComputer", "PlayFormat", "Position", "RangeRuler", "RectanglePath", "Team",
  "process/Action", "process/EnvironmentAction", "process/Squad", "process/TokenFactory"],
   function(DamageCard, ManeuverComputer, PlayFormat, Position, RangeRuler, RectanglePath, Team,
      Action, EnvironmentAction, Squad, TokenFactory)
   {
      function Environment(store, agent1, squad1, agent2, squad2, positions1, positions2)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("agent1", agent1);
         InputValidator.validateNotNull("squad1", squad1);
         InputValidator.validateNotNull("agent2", agent2);
         InputValidator.validateNotNull("squad2", squad2);
         // positions1 optional.
         // positions2 optional.

         this.store = function()
         {
            return store;
         };

         store.dispatch(Action.setEnvironment(this));

         // Initialize the damage deck.
         store.dispatch(EnvironmentAction.setDamageDeck(DamageCard.createDeckV2()));

         this._placeInitialTokens(agent1, squad1, agent2, squad2, positions1, positions2);
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      Environment.prototype.activeToken = function()
      {
         var store = this.store();
         var activeTokenId = store.getState().activeTokenId;

         return (activeTokenId !== undefined ? this.getTokenById(activeTokenId) : undefined);
      };

      Environment.prototype.createTokenPositions = function()
      {
         var answer = [];

         var tokens = this.tokens();

         tokens.forEach(function(token)
         {
            var position = this.getPositionFor(token);
            answer.push(
            {
               token: token,
               position: position
            });
         }, this);

         return answer;
      };

      Environment.prototype.createWeaponToRangeToDefenders = function(attacker, weaponIn)
      {
         InputValidator.validateNotNull("attacker", attacker);
         // weaponIn optional.

         var answer = [];

         var attackerPosition = this.getPositionFor(attacker);

         if (attackerPosition)
         {
            var primaryWeapon = attacker.primaryWeapon();

            if (primaryWeapon && (!weaponIn || weaponIn === primaryWeapon))
            {
               var rangeToDefenders = this._createRangeToDefenders(attacker, attackerPosition, primaryWeapon);

               if (rangeToDefenders.length > 0)
               {
                  answer.push(this._createWeaponData(primaryWeapon, rangeToDefenders));
               }
            }

            var weapons = attacker.secondaryWeapons();

            weapons.forEach(function(weapon)
            {
               if (!weaponIn || weaponIn === weapon)
               {
                  rangeToDefenders = this._createRangeToDefenders(attacker, attackerPosition, weapon);

                  if (rangeToDefenders.length > 0)
                  {
                     answer.push(this._createWeaponData(weapon, rangeToDefenders));
                  }
               }
            }, this);
         }

         return answer;
      };

      Environment.prototype.firstAgent = function()
      {
         var store = this.store();

         return store.getState().firstAgent;
      };

      Environment.prototype.firstSquad = function()
      {
         var store = this.store();

         return store.getState().firstSquad;
      };

      Environment.prototype.getDefenders = function(attacker0)
      {
         InputValidator.validateNotNull("attacker", attacker0);

         var attacker = (attacker0.parent !== undefined ? attacker0.parent : attacker0);
         var answer = [];
         var firstTokens = this.firstSquad().tokens();
         var firstTokenIds = firstTokens.map(function(token)
         {
            return token.id();
         });
         var secondTokens = this.secondSquad().tokens();
         var secondTokenIds = secondTokens.map(function(token)
         {
            return token.id();
         });

         if (firstTokenIds.includes(attacker.id()))
         {
            answer = secondTokens.filter(function(token)
            {
               return !token.isDestroyed() && this.getPositionFor(token) !== undefined;
            }, this);
         }
         else if (secondTokenIds.includes(attacker.id()))
         {
            answer = firstTokens.filter(function(token)
            {
               return !token.isDestroyed() && this.getPositionFor(token) !== undefined;
            }, this);
         }
         else
         {
            throw "Can't find defenders for attacker = " + attacker;
         }

         return answer;
      };

      Environment.prototype.getDefendersInRange = function(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var answer = [];
         var attackerPosition = this.getPositionFor(attacker);

         if (attackerPosition)
         {
            var defenders = this.getDefenders(attacker);

            if (defenders && defenders.length > 0)
            {
               answer = defenders.filter(function(defender)
               {
                  var defenderPosition = this.getPositionFor(defender);
                  var range = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
                  return (RangeRuler.STANDARD_RANGES.includes(range));
               }, this);
            }
         }

         return answer;
      };

      Environment.prototype.getFriendlyTokensAtRange = function(token0, range)
      {
         return this.getTokensAtRange(token0, range).filter(function(token)
         {
            return Team.isFriendly(token.agent().teamKey(), token0.agent().teamKey());
         });
      };

      Environment.prototype.getPositionFor = function(token)
      {
         InputValidator.validateNotNull("token", token);
         InputValidator.validateIsFunction("token.id", token.id);

         var store = this.store();
         var answer;

         if (token.parent)
         {
            var parentPosition = this.getPositionFor(token.parent);

            if (parentPosition)
            {
               var angle = parentPosition.heading() * Math.PI / 180.0;
               var length = 72;
               var x, y;

               if (token.pilot().value.endsWith(".fore"))
               {
                  x = parentPosition.x() + length * Math.cos(angle);
                  y = parentPosition.y() + length * Math.sin(angle);
               }
               else
               {
                  x = parentPosition.x() - length * Math.cos(angle);
                  y = parentPosition.y() - length * Math.sin(angle);
               }

               if (PlayFormat.isPointInPlayArea(store.getState().playFormatKey, x, y))
               {
                  answer = new Position(x, y, parentPosition.heading());
               }
            }
         }
         else
         {
            answer = store.getState().tokenIdToPosition[token.id()];
         }

         return answer;
      };

      Environment.prototype.getTargetableDefenders = function(attacker, attackerPosition, weapon)
      {
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("attackerPosition", attackerPosition);
         InputValidator.validateNotNull("weapon", weapon);

         var answer = this.getDefenders(attacker);
         LOGGER.trace("Environment.getTargetableDefenders() 0 defenders = " + answer);
         answer = answer.filter(function(defender)
         {
            var defenderPosition = this.getPositionFor(defender);
            return this._isTargetable(attacker, attackerPosition, weapon, defender, defenderPosition);
         }, this);
         LOGGER.trace("Environment.getTargetableDefenders() 1 targetable defenders = " + answer);

         return answer;
      };

      Environment.prototype.getTargetableDefendersAtRange = function(attacker, attackerPosition, weapon, range)
      {
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("attackerPosition", attackerPosition);
         InputValidator.validateNotNull("weapon", weapon);
         InputValidator.validateNotNull("range", range);

         var answer = this.getTargetableDefenders(attacker, attackerPosition, weapon);
         LOGGER.trace("Environment.getTargetableDefendersAtRange() 0 targetable defenders = " + answer);
         answer = answer.filter(function(defender)
         {
            var defenderPosition = this.getPositionFor(defender);
            var myRange = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
            return (myRange === range);
         }, this);
         LOGGER.trace("Environment.getTargetableDefendersAtRange() 1 targetable defenders = " + answer);

         return answer;
      };

      Environment.prototype.getTokenAt = function(position)
      {
         InputValidator.validateNotNull("position", position);

         var store = this.store();
         var answer;
         var tokenId = store.getState().positionToTokenId[position];

         if (tokenId !== undefined)
         {
            answer = this.getTokenById(tokenId);
         }

         return answer;
      };

      Environment.prototype.getTokenById = function(tokenId)
      {
         var answer;

         if (tokenId !== undefined)
         {
            var store = this.store();
            answer = TokenFactory.get(store, tokenId);
         }

         return answer;
      };

      Environment.prototype.getTokensAtRange = function(token0, range)
      {
         InputValidator.validateNotNull("token0", token0);
         InputValidator.validateNotNull("range", range);

         var position0 = this.getPositionFor(token0);

         return this.tokens().filter(function(token)
         {
            var answer;

            if (token.equals(token0))
            {
               answer = false;
            }
            else
            {
               var position = this.getPositionFor(token);

               if (position0 !== undefined && position !== undefined)
               {
                  var myRange = RangeRuler.getRange(token0, position0, token, position);
                  answer = (myRange === range);
               }
               else
               {
                  answer = false;
               }
            }

            return answer;
         }, this);
      };

      Environment.prototype.getTokensForActivation = function(isPure)
      {
         return this.tokens(isPure).sort(
            function(token0, token1)
            {
               var answer;
               var isHuge0 = token0.isHuge();
               var isHuge1 = token1.isHuge();

               if (isHuge0 === isHuge1)
               {
                  answer = 0;
               }
               else if (isHuge0 && !isHuge1)
               {
                  answer = 1;
               }
               else
               {
                  answer = -1;
               }

               if (answer === 0)
               {
                  var skill0 = (token0.pilotSkillValue ? token0.pilotSkillValue() : token0.tokenFore().pilotSkillValue());
                  var skill1 = (token1.pilotSkillValue ? token1.pilotSkillValue() : token1.tokenFore().pilotSkillValue());
                  answer = skill0 - skill1;

                  if (answer === 0)
                  {
                     var teamKey0 = token0.pilot().shipTeam.teamKey;
                     var teamKey1 = token1.pilot().shipTeam.teamKey;

                     if (Team.isFriendly(teamKey0, teamKey1))
                     {
                        answer = 0;
                     }
                     else if (Team.isFriendly(teamKey0, Team.IMPERIAL))
                     {
                        answer = -1;
                     }
                     else
                     {
                        answer = 1;
                     }
                  }
               }

               return answer;
            });
      };

      Environment.prototype.getTokensForCombat = function()
      {
         var isPure = true;

         return this.tokens(isPure).sort(function(token0, token1)
         {
            var skill0 = token0.pilotSkillValue();
            var skill1 = token1.pilotSkillValue();
            var answer = skill1 - skill0;

            if (answer === 0)
            {
               var teamKey0 = token0.pilot().shipTeam.teamKey;
               var teamKey1 = token1.pilot().shipTeam.teamKey;

               if (Team.isFriendly(teamKey0, teamKey1))
               {
                  answer = 0;
               }
               else if (Team.isFriendly(teamKey0, Team.IMPERIAL))
               {
                  answer = -1;
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

      Environment.prototype.getTokensForTeam = function(teamKey, isPure)
      {
         return this.tokens(isPure).filter(function(token)
         {
            return Team.isFriendly(token.pilot().shipTeam.teamKey, teamKey);
         });
      };

      Environment.prototype.getTokensTouching = function(token)
      {
         InputValidator.validateNotNull("token", token);

         var answer = [];

         var shipBase = token.pilot().shipTeam.ship.shipBase;
         var tokenPosition = this.getPositionFor(token);
         var polygon = ManeuverComputer.computePolygon(shipBase, tokenPosition.x(), tokenPosition.y(), tokenPosition.heading());
         var tokens = this.getTokensForActivation(false);

         tokens.forEach(function(token2)
         {
            if (!token.equals(token2))
            {
               var shipBase2 = token2.pilot().shipTeam.ship.shipBase;
               var tokenPosition2 = this.getPositionFor(token2);
               var polygon2 = ManeuverComputer.computePolygon(shipBase2, tokenPosition2.x(), tokenPosition2.y(), tokenPosition2.heading());

               if (RectanglePath.doPolygonsCollide(polygon, polygon2))
               {
                  answer.push(token2);
               }
            }
         }, this);

         return answer;
      };

      Environment.prototype.getUnfriendlyTokensAtRange = function(token0, range)
      {
         return this.getTokensAtRange(token0, range).filter(function(token)
         {
            return !Team.isFriendly(token.agent().teamKey(), token0.agent().teamKey());
         });
      };

      Environment.prototype.isTouching = function(token)
      {
         InputValidator.validateNotNull("token", token);

         var store = this.store();
         var answer = store.getState().tokenIdToIsTouching[token.id()];

         return (answer !== undefined ? answer : false);
      };

      Environment.prototype.playFormat = function()
      {
         return PlayFormat.properties[this.playFormatKey()];
      };

      Environment.prototype.playFormatKey = function()
      {
         var store = this.store();
         return store.getState().playFormatKey;
      };

      Environment.prototype.round = function()
      {
         var store = this.store();

         return store.getState().round;
      };

      Environment.prototype.secondAgent = function()
      {
         var store = this.store();

         return store.getState().secondAgent;
      };

      Environment.prototype.secondSquad = function()
      {
         var store = this.store();

         return store.getState().secondSquad;
      };

      Environment.prototype.toString = function()
      {
         var store = this.store();
         var tokens = store.getState().tokens;
         var callback = function(accumulator, tokenId)
         {
            var myTokenId = parseInt(tokenId);
            var token = this.getTokenById(myTokenId);
            var position = this.getPositionFor(token);
            return accumulator + position.toString() + " " + token.toString() + "\n";
         };

         return tokens.keySeq().reduce(callback.bind(this), "");
      };

      Environment.prototype.tokens = function(isPure)
      {
         var store = this.store();
         var tokens = store.getState().tokens;

         return tokens.keySeq().reduce(function(accumulator, tokenId)
         {
            var id = parseInt(tokenId);
            var token = TokenFactory.get(store, id);

            if (token)
            {
               var pilotKey = token.pilotKey();

               if (isPure && token.tokenFore && token.tokenAft)
               {
                  accumulator.push(token.tokenFore());
                  accumulator.push(token.tokenAft());
               }
               else if (!(pilotKey.endsWith(".fore") || pilotKey.endsWith(".aft")))
               {
                  accumulator.push(token);
               }
            }

            return accumulator;
         }, []);
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      Environment.prototype.discardAllDamage = function(damages)
      {
         InputValidator.validateNotNull("damages", damages);

         damages.forEach(function(damage)
         {
            this.discardDamage(damage);
         }, this);
      };

      Environment.prototype.discardDamage = function(damage)
      {
         InputValidator.validateNotNull("damage", damage);

         var store = this.store();
         store.dispatch(EnvironmentAction.discardDamage(damage));
      };

      Environment.prototype.drawDamage = function()
      {
         var answer;
         var store = this.store();

         if (store.getState().damageDeck.length === 0)
         {
            // Replenish the damage deck from the discard pile.
            LOGGER.debug("Damage deck empty. Shuffling " + store.getState().damageDiscardPile.length + " discards into damage deck.");
            store.dispatch(EnvironmentAction.replenishDamageDeck());
         }

         LOGGER.trace("damageDeck.length = " + store.getState().damageDeck.length);
         answer = store.getState().damageDeck[0];
         store.dispatch(EnvironmentAction.drawDamage(answer));

         return answer;
      };

      Environment.prototype.incrementRound = function()
      {
         var store = this.store();
         store.dispatch(EnvironmentAction.addRound());
      };

      Environment.prototype.moveToken = function(fromPosition, toPosition)
      {
         InputValidator.validateNotNull("fromPosition", fromPosition);
         InputValidator.validateNotNull("toPosition", toPosition);

         var store = this.store();
         store.dispatch(EnvironmentAction.moveToken(fromPosition, toPosition));
      };

      Environment.prototype.removeToken = function(token)
      {
         InputValidator.validateNotNull("token", token);

         var store = this.store();
         store.dispatch(EnvironmentAction.removeToken(token));
      };

      // Environment.prototype.removeTokenAt = function(position)
      // {
      //    InputValidator.validateNotNull("position", position);
      //
      //    var store = this.store();
      //    store.dispatch(EnvironmentAction.removeTokenAt(position));
      // };

      Environment.prototype.setActiveToken = function(newActiveToken)
      {
         var store = this.store();
         store.dispatch(EnvironmentAction.setActiveToken(newActiveToken));
      };

      Environment.prototype.setPlayAreaScale = function(scale)
      {
         InputValidator.validateNotNull("scale", scale);

         var store = this.store();
         store.dispatch(EnvironmentAction.setPlayAreaScale(scale));
      };

      Environment.prototype.setTokenTouching = function(token, isTouching)
      {
         InputValidator.validateNotNull("token", token);
         InputValidator.validateIsBoolean("isTouching", isTouching);

         var store = this.store();
         store.dispatch(EnvironmentAction.setTokenTouching(token, isTouching));
      };

      Environment.prototype._placeInitialTokens = function(agent1, squad1, agent2, squad2, positions1, positions2)
      {
         InputValidator.validateNotNull("agent1", agent1);
         InputValidator.validateNotNull("squad1", squad1);
         InputValidator.validateNotNull("agent2", agent2);
         InputValidator.validateNotNull("squad2", squad2);
         // positions1 optional.
         // positions2 optional.

         var store = this.store();
         store.dispatch(EnvironmentAction.setFirstAgent(agent1));
         store.dispatch(EnvironmentAction.setSecondAgent(agent2));

         var firstTokens = squad1.tokens().map(function(token)
         {
            return token.newInstance(store, agent1);
         });
         var secondTokens = squad2.tokens().map(function(token)
         {
            return token.newInstance(store, agent2);
         });

         var firstSquad = new Squad(squad1.factionKey(), squad1.name(), squad1.year(), squad1.description(), firstTokens);
         store.dispatch(EnvironmentAction.setFirstSquad(firstSquad));
         var secondSquad = new Squad(squad2.factionKey(), squad2.name(), squad2.year(), squad2.description(), secondTokens);
         store.dispatch(EnvironmentAction.setSecondSquad(secondSquad));

         // Determine the play format.
         var tokens = [];
         tokens.vizziniAddAll(squad1.tokens());
         tokens.vizziniAddAll(squad2.tokens());
         var playFormatKey = this._determinePlayFormat(tokens);
         store.dispatch(EnvironmentAction.setPlayFormat(playFormatKey));

         this._placeTokens(firstTokens, true, positions1);
         this._placeTokens(secondTokens, false, positions2);
      };

      Environment.prototype._placeToken = function(position, token)
      {
         InputValidator.validateNotNull("position", position);
         InputValidator.validateNotNull("token", token);

         var store = this.store();
         store.dispatch(EnvironmentAction.placeToken(position, token));
      };

      Environment.prototype._placeTokens = function(tokens, isTop, positions)
      {
         InputValidator.validateNotNull("tokens", tokens);
         InputValidator.validateNotNull("isTop", isTop);
         // positions optional.

         var size = tokens.length;
         var dx = this.playFormat().width / (size + 1);
         var heading = isTop ? 90 : -90;

         for (var i = 1; i <= tokens.length; i++)
         {
            var position;
            var token = tokens[i - 1];

            if (positions !== undefined)
            {
               position = positions[i - 1];
            }
            else
            {
               var shipBase = token.pilot().shipTeam.ship.shipBase;
               var x = i * dx;
               var y = (shipBase.width / 2);

               if (!isTop)
               {
                  y = this.playFormat().height - y;
               }

               position = new Position(x, y, heading);
            }

            this._placeToken(position, token);
         }
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      Environment.prototype._createRangeData = function(range, defenders)
      {
         InputValidator.validateNotNull("range", range);
         InputValidator.validateNotNull("defenders", defenders);
         InputValidator.validateNotEmpty("defenders", defenders);

         return (
         {
            range: range,
            defenders: defenders,
         });
      };

      Environment.prototype._createRangeToDefenders = function(attacker, attackerPosition, weapon)
      {
         var answer = [];

         var rangeKeys = weapon.rangeKeys();

         rangeKeys.forEach(function(range)
         {
            LOGGER.trace("Environment.createRangeToDefenders() range = " + range);
            var defenders = this.getTargetableDefendersAtRange(attacker, attackerPosition, weapon, range);
            LOGGER.trace("Environment.createRangeToDefenders() defenders.length = " + defenders.length);

            if (defenders.length > 0)
            {
               answer.push(this._createRangeData(range, defenders));
            }
         }, this);

         return answer;
      };

      Environment.prototype._createWeaponData = function(weapon, rangeToDefenders)
      {
         InputValidator.validateNotNull("weapon", weapon);
         InputValidator.validateNotNull("rangeToDefenders", rangeToDefenders);

         return (
         {
            weapon: weapon,
            rangeToDefenders: rangeToDefenders,
         });
      };

      Environment.prototype._determinePlayFormat = function(tokens)
      {
         InputValidator.validateNotNull("tokens", tokens);

         var answer;

         if (tokens.length > 0)
         {
            answer = PlayFormat.STANDARD;

            for (var i = 0; i < tokens.length; i++)
            {
               var token = tokens[i];

               if (token.isHuge())
               {
                  answer = PlayFormat.EPIC;
                  break;
               }
            }
         }

         return answer;
      };

      Environment.prototype._isTargetable = function(attacker, attackerPosition, weapon, defender, defenderPosition)
      {
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("attackerPosition", attackerPosition);
         InputValidator.validateNotNull("weapon", weapon);
         InputValidator.validateNotNull("defender", defender);
         InputValidator.validateNotNull("defenderPosition", defenderPosition);

         return weapon.isDefenderTargetable(attacker, attackerPosition, defender, defenderPosition) && !this._isTouching(attacker, defender);
      };

      Environment.prototype._isTouching = function(attacker, defender)
      {
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         var touches = this.getTokensTouching(attacker);

         return touches.includes(defender);
      };

      return Environment;
   });
