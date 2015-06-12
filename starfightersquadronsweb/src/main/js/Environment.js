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
function Environment()
{
    var that = this;

    var activeToken;
    var imperialAgent;
    var phase;
    var rebelAgent;
    var round = 0;

    var positionToToken = {};
    var tokenToPosition = {};

    var activeTokenListeners = [];
    var damageDeck = DamageCard.createDeck();
    var damageDiscardPile = [];
    var phaseListeners = [];
    var rangeRuler = new RangeRuler();
    var roundListeners = [];
    var shipDestroyedListeners = [];
    var shipFledListeners = [];
    var updateTriggerListeners = [];

    /*
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    this.addActiveTokenListener = function(listener)
    {
        activeTokenListeners[activeTokenListeners.length] = listener;
    }

    /*
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    this.addPhaseListener = function(listener)
    {
        phaseListeners[phaseListeners.length] = listener;
    }

    /*
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    this.addRoundListener = function(listener)
    {
        roundListeners[roundListeners.length] = listener;
    }

    this.addShipDestroyedListener = function(listener)
    {
        shipDestroyedListeners[shipDestroyedListeners.length] = listener;
    }

    this.addShipFledListener = function(listener)
    {
        shipFledListeners[shipFledListeners.length] = listener;
    }

    this.addUpdateTriggerListener = function(listener)
    {
        updateTriggerListeners[updateTriggerListeners.length] = listener;
    }

    /*
     * @param damages Damage cards.
     */
    this.discardAllDamage = function(damages)
    {
        Array.prototype.push.apply(damageDiscardPile, damages);
    }

    /*
     * @return a damage card from the damage deck.
     */
    this.drawDamage = function()
    {
        var answer;

        if (damageDeck.length == 0)
        {
            // Replenish the damage deck from the discard pile.
            LOGGER.debug("Damage deck empty. Shuffling "
                    + damageDiscardPile.size() + " discards into damage deck.");
            Array.prototype.push.apply(damageDeck, damageDiscardPile);
            damageDiscardPile = [];
            Array.Vizzini.shuffle(damageDeck);
        }

        LOGGER.trace("damageDeck.length = " + damageDeck.length);
        answer = damageDeck[0];
        damageDeck.splice(0, 1);

        return answer;
    }

    this.fireShipDestroyed = function(shipDestroyedAction)
    {
        for (var i = 0; i < shipDestroyedListeners.length; i++)
        {
            shipDestroyedListeners[i].shipDestroyed(that, shipDestroyedAction);
        }
    }

    this.fireShipFled = function(shipFledAction)
    {
        for (var i = 0; i < shipFledListeners.length; i++)
        {
            shipFledListeners[i].shipFled(that, shipFledAction);
        }
    }

    this.fireUpdateTrigger = function()
    {
        for (var i = 0; i < updateTriggerListeners.length; i++)
        {
            updateTriggerListeners[i].updateTrigger(that);
        }
    }

    this.getActiveToken = function()
    {
        return activeToken;
    }

    this.getDefenders = function(attackerTeam)
    {
        var defenderTeam = Team.properties[attackerTeam].opposite;

        return this.getTokensForTeam(defenderTeam);
    }

    this.getImperialAgent = function()
    {
        return imperialAgent;
    }

    this.getPhase = function()
    {
        return phase;
    }

    this.getPositionFor = function(token)
    {
        return tokenToPosition[token];
    }

    this.getRebelAgent = function()
    {
        return rebelAgent;
    }

    this.getRound = function()
    {
        return round;
    }

    /*
     * @param attacker Attacker. @param attackerPosition Attacker position.
     * @param weapon Weapon.
     * 
     * @return targetable defenders.
     */
    this.getTargetableDefenders = function(attacker, attackerPosition, weapon)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);

        var attackerTeam = attacker.getTeam();
        var answer = this.getDefenders(attackerTeam);
        LOGGER.trace("0 defenders = " + answer);
        filterTargetable(attacker, attackerPosition, weapon, answer);
        LOGGER.trace("1 targetable defenders = " + answer);

        return answer;
    }

    /*
     * @param attacker Attacker. @param attackerPosition Attacker position.
     * @param weapon Weapon. @param range Range.
     * 
     * @return tokens belonging to the opposite team at range.
     */
    this.getTargetableDefendersAtRange = function(attacker, attackerPosition,
            weapon, range)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("range", range);

        var answer = this.getTargetableDefenders(attacker, attackerPosition,
                weapon);
        LOGGER.trace("0 targetable defenders = " + answer);
        filterAtRange(attacker, attackerPosition, answer, range);
        LOGGER.trace("1 targetable defenders = " + answer);

        return answer;
    }

    this.getTokenAt = function(position)
    {
        return positionToToken[position];
    }

    this.getTokenCountFor = function(team)
    {
        return this.getTokensForTeam(team).length;
    }

    this.getTokens = function()
    {
        var answer = [];

        for (position in positionToToken)
        {
            var token = positionToToken[position];
            answer[answer.length] = token;
        }

        return answer;
    }

    this.getTokensForActivation = function()
    {
        return this.getTokens().sort(function(token0, token1)
        {
            var skill0 = token0.getPilotSkillValue();
            var skill1 = token1.getPilotSkillValue();
            var answer = skill0 - skill1;

            if (answer === 0)
            {
                var team0 = token0.getTeam();
                var team1 = token1.getTeam();

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
    }

    this.getTokensForCombat = function()
    {
        return this.getTokens().sort(function(token0, token1)
        {
            var skill0 = token0.getPilotSkillValue();
            var skill1 = token1.getPilotSkillValue();
            var answer = skill1 - skill0;

            if (answer === 0)
            {
                var team0 = token0.getTeam();
                var team1 = token1.getTeam();

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
                answer = token0.getId() - token1.getId();
            }

            return answer;
        });
    }

    this.getTokensForTeam = function(team)
    {
        var answer = [];

        for (position in positionToToken)
        {
            var token = positionToToken[position];

            if (token.getTeam() === team)
            {
                answer[answer.length] = token;
            }
        }

        return answer;
    }

    /*
     * @param token Token.
     * 
     * @return a set of tokens touching the given token.
     */
    this.getTokensTouching = function(token)
    {
        InputValidator.validateNotNull("token", token);

        var answer = [];
        // var answer = new HashSet<Token>();
        //
        // var shipBase = token.getShip().getShipBase();
        // var tokenPosition = getPositionFor(token);
        // var area = new Area(shipBase.computePolygon(tokenPosition, 1));
        //
        // for (var token2 : getTokensForActivation())
        // {
        // if (token == token2)
        // {
        // continue;
        // }
        //
        // var shipBase2 = token2.getShip().getShipBase();
        // var tokenPosition2 = getPositionFor(token2);
        // var area2 = new Area(shipBase2.computePolygon(tokenPosition2));
        //
        // if (shapeUtilities.doAreasCollide(area, area2))
        // {
        // answer.add(token2);
        // }
        // }

        return answer;
    }

    /*
     * Increment the round.
     */
    this.incrementRound = function()
    {
        var oldValue = round;
        round++;

        LOGGER.info("Round: " + round);
        fireRoundChange(oldValue, round);
    }

    this.placeInitialTokens = function(agents)
    {
        InputValidator.validateNotNull("agents", agents);
        if (agents.length !== 2) { throw "Environment.placeInitialTokens() must have two agents."; }

        imperialAgent = agents[0];
        rebelAgent = agents[1];

        var imperialSquad = imperialAgent.buildSquad();
        var rebelSquad = rebelAgent.buildSquad();

        placeTokens(imperialSquad);
        placeTokens(rebelSquad);
    }

    this.placeToken = function(position, token)
    {
        positionToToken[position] = token;
        tokenToPosition[token] = position;
    }

    this.removeToken = function(position)
    {
        var token = positionToToken[position];
        delete positionToToken[position];
        delete tokenToPosition[token];
    }

    this.setActiveToken = function(value)
    {
        var oldValue = activeToken;
        activeToken = value;

        LOGGER.info("Active Token: " + activeToken);
        fireActiveTokenChange(oldValue, activeToken);
    }

    this.setPhase = function(value)
    {
        var oldValue = phase;
        phase = value;

        if (oldValue != phase)
        {
            LOGGER.info("Phase: " + Phase.properties[phase].displayName);
            firePhaseChange(oldValue, phase);
        }
    }

    this.toString = function()
    {
        var answer = "";

        for (position in positionToToken)
        {
            answer += position.toString() + " "
                    + positionToToken[position].toString() + "\n";
        }

        return answer;
    }

    /*
     * @param attacker Attacker. @param attackerPosition Attacker position.
     * @param defenders Collection to filter. @param range Range.
     */
    function filterAtRange(attacker, attackerPosition, defenders, range)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defenders", defenders);
        InputValidator.validateNotNull("range", range);

        for (var i = 0; i < defenders.length; i++)
        {
            var defender = defenders[i];
            var defenderPosition = that.getPositionFor(defender);
            var r = rangeRuler.getRange(attacker, attackerPosition, defender,
                    defenderPosition);

            if (r != range)
            {
                defenders.splice(i, 1);
                i--;
            }
        }
    }

    /*
     * @param attacker Attacker. @param attackerPosition Attacker position.
     * @param weapon Weapon. @param defenders Collection to filter.
     */
    function filterTargetable(attacker, attackerPosition, weapon, defenders)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("defenders", defenders);

        for (var i = 0; i < defenders.length; i++)
        {
            var defender = defenders[i];
            var defenderPosition = that.getPositionFor(defender);

            if (!isTargetable(attacker, attackerPosition, weapon, defender,
                    defenderPosition))
            {
                defenders.splice(i, 1);
                i--;
            }
        }
    }

    /*
     * Report a bound property update to any registered listeners. No event is
     * fired if old and new are equal and non-null.
     * 
     * @param oldValue The old value of the property. @param newValue The new
     * value of the property.
     */
    function fireActiveTokenChange(oldValue, newValue)
    {
        for (var i = 0; i < activeTokenListeners.length; i++)
        {
            activeTokenListeners[i].activeTokenChange(that, oldValue, newValue);
        }
    }

    /*
     * Report a bound property update to any registered listeners. No event is
     * fired if old and new are equal and non-null.
     * 
     * @param oldValue The old value of the property. @param newValue The new
     * value of the property.
     */
    function firePhaseChange(oldValue, newValue)
    {
        for (var i = 0; i < phaseListeners.length; i++)
        {
            phaseListeners[i].phaseChange(that, oldValue, newValue);
        }

        performTokenPhaseEffects(newValue);
    }

    /*
     * Report a bound property update to any registered listeners. No event is
     * fired if old and new are equal and non-null.
     * 
     * @param oldValue The old value of the property. @param newValue The new
     * value of the property.
     */
    function fireRoundChange(oldValue, newValue)
    {
        for (var i = 0; i < roundListeners.length; i++)
        {
            roundListeners[i].roundChange(that, oldValue, newValue);
        }
    }

    /*
     * @param phase Phase.
     * 
     * @return tokens.
     */
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

    /*
     * @param attacker Attacking token. @param attackerPosition Attacker
     * position. @param weapon Weapon. @param defender Defending token. @param
     * defenderPosition Defender position.
     * 
     * @return true if the defender is vulnerable to the attacker.
     */
    function isTargetable(attacker, attackerPosition, weapon, defender,
            defenderPosition)
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

        return weapon.isDefenderTargetable(attacker, attackerPosition,
                defender, defenderPosition)
                && !isTouching(attacker, defender);
    }

    /*
     * @param attacker Attacking token. @param defender Defending token.
     * 
     * @return true if the attacker is touching the defender.
     */
    function isTouching(attacker, defender)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        var touches = that.getTokensTouching(attacker);

        return Array.Vizzini.contains(touches, defender);
    }

    /*
     * @param phase Phase.
     */
    function performTokenPhaseEffects(phase)
    {
        var tokens = getTokensForPhase(phase);

        for (var i = 0; i < tokens.length; i++)
        {
            var token = tokens[i];
            token.phaseEffect(that, token, phase);
        }
    }

    /**
     * @param environment
     *            Environment.
     * @param tokens
     *            Tokens.
     */
    function placeTokens(tokens)
    {
        var isImperial = tokens[0].getTeam() === Team.IMPERIAL;

        var size = tokens.length;
        var dx = Position.MAX_X / (size + 1);
        var heading = isImperial ? 90 : -90;

        for (var i = 1; i <= tokens.length; i++)
        {
            var token = tokens[i - 1];
            var shipBase = token.getShipBase();
            var x = i * dx;
            var y = (ShipBase.properties[shipBase].height / 2);

            if (!isImperial)
            {
                y = Position.MAX_Y - y;
            }

            var position = new Position(x, y, heading);
            that.placeToken(position, token);
        }
    }
};

Environment.createCoreSetEnvironment = function()
{
    // Create initial agents and tokens.
    var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL,
            CoreSetImperialSquadBuilder);
    var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL,
            CoreSetRebelSquadBuilder, new ImageUtilities());

    var answer = new Environment();

    answer.placeInitialTokens([ imperialAgent, rebelAgent ]);

    return answer;
}

Environment.createJmtEnvironment = function()
{
    // Create initial agents and tokens.
    var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL,
            JMTImperialSquadBuilder);
    var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL,
            JMTRebelSquadBuilder, new ImageUtilities());

    var answer = new Environment();

    answer.placeInitialTokens([ imperialAgent, rebelAgent ]);

    return answer;
}
