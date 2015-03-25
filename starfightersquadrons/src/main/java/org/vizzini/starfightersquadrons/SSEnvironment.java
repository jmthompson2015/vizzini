package org.vizzini.starfightersquadrons;

import java.awt.geom.Area;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultEnvironment;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;
import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
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
public final class SSEnvironment implements Environment
{
    /** Active token property name. */
    private static final String ACTIVE_TOKEN_PROPERTY = "activeToken";

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Phase property name. */
    private static final String PHASE_PROPERTY = "phase";

    /** Round property name. */
    private static final String ROUND_PROPERTY = "round";

    /** Ship destroyed action property name. */
    private static final String SHIP_DESTROYED_ACTION_PROPERTY = "shipDestroyedAction";

    /** Ship fled action property name. */
    private static final String SHIP_FLED_ACTION_PROPERTY = "shipFledAction";

    /** Update trigger property name. */
    private static final String UPDATE_TRIGGER_PROPERTY = "updateTrigger";

    /** Active token. */
    private SSToken activeToken;

    /** Damage deck. */
    private final List<DamageCard> damageDeck;

    /** Damage discard pile. */
    private final List<DamageCard> damageDiscardPile = new ArrayList<DamageCard>();

    /** Delegate. */
    private final Environment delegate;

    /** Imperial agent. */
    private SSAgent imperialAgent;

    /** Phase. */
    private Phase phase;

    /** Property change support. */
    private transient PropertyChangeSupport propertyChangeSupport;

    /** Range ruler. */
    private final RangeRuler rangeRuler = new RangeRuler();

    /** Rebel agent. */
    private SSAgent rebelAgent;

    /** Round. */
    private int round = 0;

    /** Shape utilities. */
    private final ShapeUtilities shapeUtilities = new ShapeUtilities();

    /** Token activation comparator. */
    private final TokenActivationComparator tokenActivationComparator = new TokenActivationComparator();

    /** Token combat comparator. */
    private final TokenCombatComparator tokenCombatComparator = new TokenCombatComparator();

    /** Map of token to position. */
    private final Map<SSToken, SSPosition> tokenToPosition = new HashMap<SSToken, SSPosition>();

    /**
     * Construct this object.
     */
    public SSEnvironment()
    {
        this(DamageCard.createDeck());
    }

    /**
     * Construct this object.
     *
     * @param damageDeck Damage card deck.
     */
    @SuppressWarnings("hiding")
    public SSEnvironment(final List<DamageCard> damageDeck)
    {
        InputValidator.validateNotEmpty("damageDeck", damageDeck);

        this.damageDeck = damageDeck;

        final String name = "X-Wing play area";
        final String description = "An Starfighter Squadrons play area.";

        delegate = new DefaultEnvironment(name, description);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addActiveTokenListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(ACTIVE_TOKEN_PROPERTY, listener);
    }

    @Deprecated
    @Override
    public void addDoActionListener(final PropertyChangeListener listener)
    {
        throw new RuntimeException("method not used");
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addPhaseListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(PHASE_PROPERTY, listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addRoundListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(ROUND_PROPERTY, listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addShipDestroyedActionListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(SHIP_DESTROYED_ACTION_PROPERTY, listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addShipFledActionListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(SHIP_FLED_ACTION_PROPERTY, listener);
    }

    @Deprecated
    @Override
    public void addUndoActionListener(final PropertyChangeListener listener)
    {
        throw new RuntimeException("method not used");
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addUpdateTriggerListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(UPDATE_TRIGGER_PROPERTY, listener);
    }

    @Override
    public void clear()
    {
        delegate.clear();

        tokenToPosition.clear();

        fireUpdateTrigger();
    }

    @Override
    public Environment copy()
    {
        throw new RuntimeException("method not implemented");
    }

    /**
     * @param damages Damage cards.
     */
    public void discardAllDamage(final DamageCardList damages)
    {
        damageDiscardPile.addAll(damages);
    }

    /**
     * @param damage Damage.
     */
    public void discardDamage(final DamageCard damage)
    {
        damageDiscardPile.add(damage);
    }

    /**
     * @return a damage card from the damage deck.
     */
    public DamageCard drawDamage()
    {
        DamageCard answer = null;

        if (damageDeck.isEmpty())
        {
            // Replenish the damage deck from the discard pile.
            LOGGER.debug("Damage deck empty. Shuffling " + damageDiscardPile.size() + " discards into damage deck.");
            damageDeck.addAll(damageDiscardPile);
            damageDiscardPile.clear();
            Collections.shuffle(damageDeck);
        }

        LOGGER.trace("damageDeck.size() = " + damageDeck.size());
        answer = damageDeck.remove(0);

        return answer;
    }

    @Deprecated
    @Override
    public void fireDoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        throw new RuntimeException("method not used");
    }

    /**
     * Report a bound property update to any registered listeners. No event is fired if old and new are equal and
     * non-null.
     *
     * @param oldValue The old value of the property.
     * @param newValue The new value of the property.
     */
    public void fireShipDestroyedActionPropertyChange(final ShipDestroyedAction oldValue,
            final ShipDestroyedAction newValue)
    {
        getPropertyChangeSupport().firePropertyChange(SHIP_DESTROYED_ACTION_PROPERTY, oldValue, newValue);

        final SSToken token = newValue.getToken();
        discardAllDamage(token.getCriticalDamages());
        discardAllDamage(token.getDamages());

        fireUpdateTrigger();
    }

    /**
     * Report a bound property update to any registered listeners. No event is fired if old and new are equal and
     * non-null.
     *
     * @param oldValue The old value of the property.
     * @param newValue The new value of the property.
     */
    public void fireShipFledActionPropertyChange(final ShipFledAction oldValue, final ShipFledAction newValue)
    {
        getPropertyChangeSupport().firePropertyChange(SHIP_FLED_ACTION_PROPERTY, oldValue, newValue);

        final SSToken token = newValue.getToken();
        discardAllDamage(token.getCriticalDamages());
        discardAllDamage(token.getDamages());

        fireUpdateTrigger();
    }

    @Deprecated
    @Override
    public void fireUndoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        throw new RuntimeException("method not used");
    }

    /**
     * Report a bound property update to any registered listeners. No event is fired if old and new are equal and
     * non-null.
     */
    public void fireUpdateTrigger()
    {
        getPropertyChangeSupport().firePropertyChange(UPDATE_TRIGGER_PROPERTY, null, ManeuverAction.UPDATE_TRIGGER);
    }

    /**
     * @return the activeToken
     */
    public SSToken getActiveToken()
    {
        return activeToken;
    }

    /**
     * @param attackerTeam Attacker team.
     *
     * @return tokens belonging to the team.
     */
    public List<SSToken> getAttackers(final SSTeam attackerTeam)
    {
        InputValidator.validateNotNull("attackerTeam", attackerTeam);

        return getTokensForTeam(attackerTeam);
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     *
     * @return the closest defender.
     */
    public SSToken getClosestDefender(final SSToken attacker, final SSPosition attackerPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);

        final SSTeam attackerTeam = attacker.getTeam();
        final List<SSToken> defenders = getDefenders(attackerTeam);

        return findClosest(attackerPosition, defenders);
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     *
     * @return the closest defender.
     */
    public SSToken getClosestInRangeDefender(final SSToken attacker, final SSPosition attackerPosition,
            final Weapon weapon)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);

        final List<SSToken> defenders = getInRangeDefenders(attacker, attackerPosition, weapon);

        return findClosest(attackerPosition, defenders);
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     *
     * @return the closest defender.
     */
    public SSToken getClosestTargetableDefender(final SSToken attacker, final SSPosition attackerPosition,
            final Weapon weapon)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);

        final List<SSToken> defenders = getTargetableDefenders(attacker, attackerPosition, weapon);

        return findClosest(attackerPosition, defenders);
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     *
     * @return the closest defender.
     */
    public SSToken getClosestVulnerableDefender(final SSToken attacker, final SSPosition attackerPosition,
            final Weapon weapon)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);

        final List<SSToken> defenders = getVulnerableDefenders(attacker, attackerPosition, weapon);

        return findClosest(attackerPosition, defenders);
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param range Range.
     *
     * @return tokens belonging to the opposite team at range.
     */
    public List<SSToken> getDefendersAtRange(final SSToken attacker, final SSPosition attackerPosition,
            final Range range)
            {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("range", range);

        final SSTeam attackerTeam = attacker.getTeam();
        final List<SSToken> answer = getDefenders(attackerTeam);
        filterAtRange(attacker, attackerPosition, answer, range);

        return answer;
            }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    /**
     * @return the imperialAgent
     */
    public SSAgent getImperialAgent()
    {
        return imperialAgent;
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     *
     * @return in range defenders.
     */
    public List<SSToken> getInRangeDefenders(final SSToken attacker, final SSPosition attackerPosition,
            final Weapon weapon)
            {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);

        final SSTeam attackerTeam = attacker.getTeam();
        final List<SSToken> answer = getDefenders(attackerTeam);
        filterInRange(attacker, attackerPosition, weapon, answer);

        return answer;
            }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    /**
     * @return the phase
     */
    public Phase getPhase()
    {
        return phase;
    }

    /**
     * @param token Token.
     *
     * @return the position for the given token.
     */
    public SSPosition getPositionFor(final SSToken token)
    {
        InputValidator.validateNotNull("token", token);

        return tokenToPosition.get(token);
    }

    /**
     * @return the rebelAgent
     */
    public SSAgent getRebelAgent()
    {
        return rebelAgent;
    }

    /**
     * @return the round
     */
    public int getRound()
    {
        return round;
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     *
     * @return targetable defenders.
     */
    public List<SSToken> getTargetableDefenders(final SSToken attacker, final SSPosition attackerPosition,
            final Weapon weapon)
            {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);

        final SSTeam attackerTeam = attacker.getTeam();
        final List<SSToken> answer = getDefenders(attackerTeam);
        LOGGER.trace("0 defenders = " + answer);
        filterTargetable(attacker, attackerPosition, weapon, answer);
        LOGGER.trace("1 targetable defenders = " + answer);

        return answer;
            }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     * @param range Range.
     *
     * @return tokens belonging to the opposite team at range.
     */
    public List<SSToken> getTargetableDefendersAtRange(final SSToken attacker,
            final SSPosition attackerPosition, final Weapon weapon, final Range range)
            {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("range", range);

        final List<SSToken> answer = getTargetableDefenders(attacker, attackerPosition, weapon);
        LOGGER.trace("0 targetable defenders = " + answer);
        filterAtRange(attacker, attackerPosition, answer, range);
        LOGGER.trace("1 targetable defenders = " + answer);

        return answer;
            }

    @Override
    public SSToken getTokenAt(final Position<?> position)
    {
        return (SSToken)delegate.getTokenAt(position);
    }

    @Override
    public int getTokenCount()
    {
        return delegate.getTokenCount();
    }

    @Override
    public int getTokenCountFor(final Agent agent)
    {
        return delegate.getTokenCountFor(agent);
    }

    @Override
    public int getTokenCountFor(final Team team)
    {
        return delegate.getTokenCountFor(team);
    }

    /**
     * @return a collection of tokens ordered for the activation phase.
     */
    public List<SSToken> getTokensForActivation()
    {
        final List<SSToken> answer = new ArrayList<SSToken>();

        answer.addAll(tokenToPosition.keySet());
        Collections.sort(answer, tokenActivationComparator);

        return answer;
    }

    /**
     * @return a collection of tokens ordered for the combat phase.
     */
    public List<SSToken> getTokensForCombat()
    {
        final List<SSToken> answer = new ArrayList<SSToken>();

        answer.addAll(tokenToPosition.keySet());
        Collections.sort(answer, tokenCombatComparator);

        return answer;
    }

    /**
     * @param team Team.
     *
     * @return tokens belonging to the team.
     */
    public List<SSToken> getTokensForTeam(final SSTeam team)
    {
        InputValidator.validateNotNull("team", team);

        final List<SSToken> answer = new ArrayList<SSToken>();

        for (final SSToken token : tokenToPosition.keySet())
        {
            if (token.getTeam() == team)
            {
                answer.add(token);
            }
        }

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a set of tokens touching the given token.
     */
    public Set<SSToken> getTokensTouching(final SSToken token)
    {
        InputValidator.validateNotNull("token", token);

        final Set<SSToken> answer = new HashSet<SSToken>();

        final ShipBase shipBase = token.getShip().getShipBase();
        final SSPosition tokenPosition = getPositionFor(token);
        final Area area = new Area(shipBase.computePolygon(tokenPosition, 1));

        for (final SSToken token2 : getTokensForActivation())
        {
            if (token == token2)
            {
                continue;
            }

            final ShipBase shipBase2 = token2.getShip().getShipBase();
            final SSPosition tokenPosition2 = getPositionFor(token2);
            final Area area2 = new Area(shipBase2.computePolygon(tokenPosition2));

            if (shapeUtilities.doAreasCollide(area, area2))
            {
                answer.add(token2);
            }
        }

        return answer;
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     *
     * @return vulnerable defenders.
     */
    public List<SSToken> getVulnerableDefenders(final SSToken attacker, final SSPosition attackerPosition,
            final Weapon weapon)
            {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);

        final SSTeam attackerTeam = attacker.getTeam();
        final List<SSToken> answer = getDefenders(attackerTeam);
        filterVulnerable(attacker, attackerPosition, weapon, answer);

        return answer;
            }

    /**
     * Increment the round.
     */
    public void incrementRound()
    {
        final int oldValue = round;
        round++;

        fireRoundPropertyChange(oldValue, round);
    }

    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        InputValidator.validateNotNull("agents", agents);

        imperialAgent = (SSAgent)agents.get(0);
        rebelAgent = (SSAgent)agents.get(1);
    }

    @Override
    public void placeToken(final Position<?> position, final Token token)
    {
        InputValidator.validateNotNull("position", position);
        InputValidator.validateNotNull("token", token);

        if (token.getAgent() == null)
        {
            throw new RuntimeException("token has no agent!");
        }

        tokenToPosition.put((SSToken)token, (SSPosition)position);

        delegate.placeToken(position, token);
    }

    @Deprecated
    @Override
    public void removeDoActionListener(final PropertyChangeListener listener)
    {
        throw new RuntimeException("method not used");
    }

    @Override
    public void removeToken(final Position<?> position)
    {
        InputValidator.validateNotNull("position", position);

        final SSToken token = getTokenAt(position);
        tokenToPosition.remove(token);

        delegate.removeToken(position);
    }

    @Deprecated
    @Override
    public void removeUndoActionListener(final PropertyChangeListener listener)
    {
        throw new RuntimeException("method not used");
    }

    /**
     * @param activeToken the activeToken to set
     */
    @SuppressWarnings("hiding")
    public void setActiveToken(final SSToken activeToken)
    {
        final SSToken oldValue = this.activeToken;
        this.activeToken = activeToken;

        fireActiveTokenPropertyChange(oldValue, activeToken);
    }

    /**
     * @param phase the phase to set
     */
    @SuppressWarnings("hiding")
    public void setPhase(final Phase phase)
    {
        final Phase oldValue = this.phase;
        this.phase = phase;

        LOGGER.info("Phase: " + phase.name());
        firePhasePropertyChange(oldValue, phase);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param defenders Collection to filter.
     * @param range Range.
     */
    private void filterAtRange(final SSToken attacker, final SSPosition attackerPosition,
            final List<SSToken> defenders, final Range range)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defenders", defenders);
        InputValidator.validateNotNull("range", range);

        final Iterator<SSToken> iter = defenders.iterator();

        while (iter.hasNext())
        {
            final SSToken defender = iter.next();
            final SSPosition defenderPosition = getPositionFor(defender);
            final Range r = rangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

            if (r != range)
            {
                iter.remove();
            }
        }
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     * @param defenders Collection to filter.
     */
    private void filterInRange(final SSToken attacker, final SSPosition attackerPosition, final Weapon weapon,
            final List<SSToken> defenders)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("defenders", defenders);

        final Iterator<SSToken> iter = defenders.iterator();

        while (iter.hasNext())
        {
            final SSToken defender = iter.next();
            final SSPosition defenderPosition = getPositionFor(defender);

            if (!isInRange(attacker, attackerPosition, weapon, defender, defenderPosition))
            {
                iter.remove();
            }
        }
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     * @param defenders Collection to filter.
     */
    private void filterTargetable(final SSToken attacker, final SSPosition attackerPosition, final Weapon weapon,
            final List<SSToken> defenders)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("defenders", defenders);

        final Iterator<SSToken> iter = defenders.iterator();

        while (iter.hasNext())
        {
            final SSToken defender = iter.next();
            final SSPosition defenderPosition = getPositionFor(defender);

            if (!isTargetable(attacker, attackerPosition, weapon, defender, defenderPosition))
            {
                iter.remove();
            }
        }
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     * @param defenders Collection to filter.
     */
    private void filterVulnerable(final SSToken attacker, final SSPosition attackerPosition, final Weapon weapon,
            final List<SSToken> defenders)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("defenders", defenders);

        final Iterator<SSToken> iter = defenders.iterator();

        while (iter.hasNext())
        {
            final SSToken defender = iter.next();
            final SSPosition defenderPosition = getPositionFor(defender);

            if (!isVulnerable(attacker, attackerPosition, weapon, defender, defenderPosition))
            {
                iter.remove();
            }
        }
    }

    /**
     * @param attackerPosition Attacker position.
     * @param defenders Defenders.
     *
     * @return the closest defender.
     */
    private SSToken findClosest(final SSPosition attackerPosition, final List<SSToken> defenders)
    {
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defenders", defenders);

        SSToken answer = null;

        int minDistance = Integer.MAX_VALUE;

        for (final SSToken defender : defenders)
        {
            final SSPosition defenderPosition = getPositionFor(defender);
            final int distance = attackerPosition.computeDistance(defenderPosition);

            if (distance < minDistance)
            {
                minDistance = distance;
                answer = defender;
            }
        }

        return answer;
    }

    /**
     * Report a bound property update to any registered listeners. No event is fired if old and new are equal and
     * non-null.
     *
     * @param oldValue The old value of the property.
     * @param newValue The new value of the property.
     */
    private void fireActiveTokenPropertyChange(final SSToken oldValue, final SSToken newValue)
    {
        getPropertyChangeSupport().firePropertyChange(ACTIVE_TOKEN_PROPERTY, oldValue, newValue);
    }

    /**
     * Report a bound property update to any registered listeners. No event is fired if old and new are equal and
     * non-null.
     *
     * @param oldValue The old value of the property.
     * @param newValue The new value of the property.
     */
    private void firePhasePropertyChange(final Phase oldValue, final Phase newValue)
    {
        getPropertyChangeSupport().firePropertyChange(PHASE_PROPERTY, oldValue, newValue);

        performTokenPhaseEffects(newValue);
    }

    /**
     * Report a bound property update to any registered listeners. No event is fired if old and new are equal and
     * non-null.
     *
     * @param oldValue The old value of the property.
     * @param newValue The new value of the property.
     */
    private void fireRoundPropertyChange(final int oldValue, final int newValue)
    {
        getPropertyChangeSupport().firePropertyChange(ROUND_PROPERTY, oldValue, newValue);
    }

    /**
     * @param attackerTeam Attacker team.
     *
     * @return tokens belonging to the opposite team.
     */
    private List<SSToken> getDefenders(final SSTeam attackerTeam)
    {
        InputValidator.validateNotNull("attackerTeam", attackerTeam);

        final SSTeam defenderTeam = attackerTeam.opposite();

        return getTokensForTeam(defenderTeam);
    }

    /**
     * @return propertyChangeSupport
     */
    private PropertyChangeSupport getPropertyChangeSupport()
    {
        if (propertyChangeSupport == null)
        {
            propertyChangeSupport = new PropertyChangeSupport(this);
        }

        return propertyChangeSupport;
    }

    /**
     * @param phase Phase.
     *
     * @return tokens.
     */
    @SuppressWarnings("hiding")
    private List<SSToken> getTokensForPhase(final Phase phase)
    {
        final List<SSToken> tokens;

        switch (phase)
        {
        case PLANNING_START:
        case PLANNING_END:
            tokens = getTokensForActivation();
            break;
        case ACTIVATION_START:
        case ACTIVATION_REVEAL_DIAL:
        case ACTIVATION_EXECUTE_MANEUVER:
        case ACTIVATION_PERFORM_ACTION:
        case ACTIVATION_END:
            tokens = getTokensForActivation();
            break;
        case COMBAT_START:
        case COMBAT_DECLARE_TARGET:
        case COMBAT_ROLL_ATTACK_DICE:
        case COMBAT_MODIFY_ATTACK_DICE:
        case COMBAT_ROLL_DEFENSE_DICE:
        case COMBAT_MODIFY_DEFENSE_DICE:
        case COMBAT_DEAL_DAMAGE:
        case COMBAT_END:
            tokens = getTokensForCombat();
            break;
        case END_START:
        case END_END:
            tokens = getTokensForCombat();
            break;
        default:
            throw new RuntimeException("Unknown phase: " + phase);
        }

        return tokens;
    }

    /**
     * @param attacker Attacking token.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     * @param defender Defending token.
     * @param defenderPosition Defender position.
     *
     * @return true if the defender is in range of the attacker.
     */
    private boolean isInRange(final SSToken attacker, final SSPosition attackerPosition, final Weapon weapon,
            final SSToken defender, final SSPosition defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        return weapon.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition);
    }

    /**
     * @param attacker Attacking token.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     * @param defender Defending token.
     * @param defenderPosition Defender position.
     *
     * @return true if the defender is vulnerable to the attacker.
     */
    private boolean isTargetable(final SSToken attacker, final SSPosition attackerPosition, final Weapon weapon,
            final SSToken defender, final SSPosition defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        if (LOGGER.isTraceEnabled())
        {
            LOGGER.trace("weapon.isDefenderTargetable() ? "
                    + weapon.isDefenderTargetable(attacker, attackerPosition, defender, defenderPosition));
            LOGGER.trace("isTouching()                  ? " + isTouching(attacker, defender));
        }

        return weapon.isDefenderTargetable(attacker, attackerPosition, defender, defenderPosition)
                && !isTouching(attacker, defender);
    }

    /**
     * @param attacker Attacking token.
     * @param defender Defending token.
     *
     * @return true if the attacker is touching the defender.
     */
    private boolean isTouching(final SSToken attacker, final SSToken defender)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        final Set<SSToken> touches = getTokensTouching(attacker);

        return touches.contains(defender);
    }

    /**
     * @param attacker Attacking token.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     * @param defender Defending token.
     * @param defenderPosition Defender position.
     *
     * @return true if the defender is vulnerable to the attacker.
     */
    private boolean isVulnerable(final SSToken attacker, final SSPosition attackerPosition, final Weapon weapon,
            final SSToken defender, final SSPosition defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        return weapon.isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition);
    }

    /**
     * @param phase Phase.
     */
    @SuppressWarnings("hiding")
    private void performTokenPhaseEffects(final Phase phase)
    {
        final List<SSToken> tokens = getTokensForPhase(phase);

        for (final SSToken token : tokens)
        {
            token.phaseEffect(this, token, phase);
        }
    }
}
