package org.vizzini.starfightersquadrons;

import java.beans.PropertyChangeListener;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Token;
import org.vizzini.starfightersquadrons.DamageCard.Trait;
import org.vizzini.starfightersquadrons.Maneuver.Bearing;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.RangeRuler.Range;
import org.vizzini.starfightersquadrons.ShipAction.DamageCardShipAction;
import org.vizzini.starfightersquadrons.ShipAction.UpgradeCardShipAction;
import org.vizzini.starfightersquadrons.UpgradeCard.UpgradeRestriction;

/**
 * Provides a token for Starfighter Squadrons.
 */
public final class SSToken implements GameStepReactor, ShipState, Token, TokenState
{
    /**
     * Provides a state for the activation phase.
     */
    private static class ActivationState
    {
        /** Flag indicating if the attacker is touching another ship during this maneuver. */
        private boolean isTouching;

        /** Maneuver action. */
        private ManeuverAction maneuverAction;

        /** Ship action action. */
        private ShipActionAction shipActionAction;

        /**
         * Clear the state.
         */
        public void clear()
        {
            isTouching = false;
            maneuverAction = null;
            shipActionAction = null;
        }

        /**
         * @return the maneuverAction
         */
        public ManeuverAction getManeuverAction()
        {
            return maneuverAction;
        }

        /**
         * @return the shipActionAction
         */
        public ShipActionAction getShipActionAction()
        {
            return shipActionAction;
        }

        /**
         * @return the isTouching
         */
        public boolean isTouching()
        {
            return isTouching;
        }

        /**
         * @param maneuverAction the maneuverAction to set
         */
        @SuppressWarnings("hiding")
        public void setManeuverAction(final ManeuverAction maneuverAction)
        {
            this.maneuverAction = maneuverAction;
        }

        /**
         * @param shipActionAction the shipActionAction to set
         */
        @SuppressWarnings("hiding")
        public void setShipActionAction(final ShipActionAction shipActionAction)
        {
            this.shipActionAction = shipActionAction;
        }

        /**
         * @param isTouching the isTouching to set
         */
        @SuppressWarnings("hiding")
        public void setTouching(final boolean isTouching)
        {
            this.isTouching = isTouching;
        }
    }

    /**
     * Provides a state for the combat phase.
     */
    private static class CombatState
    {
        /** Attack dice. */
        private AttackDice attackDice;

        /** Combat action. */
        private CombatAction combatAction;

        /** Defender. */
        private SSToken defender;

        /** Defense dice. */
        private DefenseDice defenseDice;

        /** Flag indicating if the defender was hit during this combat. */
        private boolean isDefenderHit;

        /** Range. */
        private Range range;

        /** Weapon. */
        private Weapon weapon;

        /**
         * Clear the state.
         */
        public void clear()
        {
            attackDice = null;
            combatAction = null;
            defender = null;
            defenseDice = null;
            isDefenderHit = false;
            range = null;
        }

        /**
         * @return the attackDice
         */
        public AttackDice getAttackDice()
        {
            return attackDice;
        }

        /**
         * @return the combatAction
         */
        public CombatAction getCombatAction()
        {
            return combatAction;
        }

        /**
         * @return the defender
         */
        public SSToken getDefender()
        {
            SSToken answer = null;

            if (combatAction != null)
            {
                answer = combatAction.getDefender();
            }
            else
            {
                answer = defender;
            }

            return answer;
        }

        /**
         * @return the defenseDice
         */
        public DefenseDice getDefenseDice()
        {
            return defenseDice;
        }

        /**
         * @return the range
         */
        public Range getRange()
        {
            return range;
        }

        /**
         * @return the weapon
         */
        public Weapon getWeapon()
        {
            return weapon;
        }

        /**
         * @return the isDefenderHit
         */
        public boolean isDefenderHit()
        {
            return isDefenderHit;
        }

        /**
         * @param attackDice the attackDice to set
         */
        @SuppressWarnings("hiding")
        public void setAttackDice(final AttackDice attackDice)
        {
            this.attackDice = attackDice;
        }

        /**
         * @param combatAction the combatAction to set
         */
        @SuppressWarnings("hiding")
        public void setCombatAction(final CombatAction combatAction)
        {
            this.combatAction = combatAction;
        }

        /**
         * @param defender the defender to set
         */
        @SuppressWarnings("hiding")
        public void setDefender(final SSToken defender)
        {
            this.defender = defender;
        }

        /**
         * @param isDefenderHit the isDefenderHit to set
         */
        @SuppressWarnings({ "hiding", "synthetic-access" })
        public void setDefenderHit(final boolean isDefenderHit)
        {
            this.isDefenderHit = isDefenderHit;
            LOGGER.trace("isDefenderHit ? " + isDefenderHit);
        }

        /**
         * @param defenseDice the defenseDice to set
         */
        @SuppressWarnings("hiding")
        public void setDefenseDice(final DefenseDice defenseDice)
        {
            this.defenseDice = defenseDice;
        }

        /**
         * @param range the range to set
         */
        @SuppressWarnings("hiding")
        public void setRange(final Range range)
        {
            this.range = range;
        }

        /**
         * @param weapon the weapon to set
         */
        @SuppressWarnings("hiding")
        public void setWeapon(final Weapon weapon)
        {
            this.weapon = weapon;
        }
    }

    /**
     * Reset the next ID.
     */
    public static void resetNextId()
    {
        nextId = 1;
    }

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Next ID. */
    private static int nextId = 1;

    /** Activation phase state. */
    @SuppressWarnings("synthetic-access")
    private ActivationState activationState = new ActivationState();

    /** Active upgrades. */
    private final List<UpgradeCard> activeUpgrades = new ArrayList<UpgradeCard>();

    /** Combat phase state. */
    @SuppressWarnings("synthetic-access")
    private CombatState combatState = new CombatState();

    /** Delegate. */
    private final Token delegate;

    /** ID. */
    private final int id;

    /** Pilot. */
    private final Pilot pilot;

    /** Ship state. */
    private final ShipState shipState;

    /** Token state. */
    private final MutableTokenState tokenState;

    /** Upgrades. */
    private final UpgradeCardList upgrades;

    /**
     * Construct this object.
     *
     * @param pilot Pilot.
     * @param agent Agent.
     */
    @SuppressWarnings("hiding")
    public SSToken(final Pilot pilot, final Agent agent)
    {
        this(pilot, agent, new UpgradeCardList());
    }

    /**
     * Construct this object.
     *
     * @param pilot Pilot.
     * @param agent Agent.
     * @param upgrades Upgrades.
     */
    @SuppressWarnings("hiding")
    public SSToken(final Pilot pilot, final Agent agent, final UpgradeCard... upgrades)
    {
        this(pilot, agent, new UpgradeCardList(upgrades));
    }

    /**
     * Construct this object.
     *
     * @param pilot Pilot.
     * @param agent Agent.
     * @param upgrades Upgrades.
     */
    @SuppressWarnings("hiding")
    public SSToken(final Pilot pilot, final Agent agent, final UpgradeCardList upgrades)
    {
        InputValidator.validateNotNull("pilot", pilot);
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("upgrades", upgrades);

        if (pilot.getShip().getTeam() != agent.getTeam())
        {
            throw new IllegalArgumentException("ship and agent have different teams");
        }

        final String name = nextId + " " + pilot.getName() + " (" + pilot.getShip().getName() + ")";
        final String description = pilot.getDescription();
        final SSTeam team = pilot.getShip().getTeam();
        delegate = new DefaultToken(name, description, team, agent);

        this.id = nextId++;
        this.pilot = pilot;
        this.upgrades = upgrades;

        final ShipState state = pilot.getShipState();
        this.shipState = new ImmutableShipState(state);
        this.tokenState = new MutableTokenState(state.getShieldValue());

        verifyUpgrades(upgrades);
    }

    /**
     * @param upgrade Upgrade card.
     */
    public void activateUpgrade(final UpgradeCard upgrade)
    {
        activeUpgrades.add(upgrade);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addAttackerTargetLockListener(final PropertyChangeListener listener)
    {
        tokenState.addAttackerTargetLockListener(listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addCloakListener(final PropertyChangeListener listener)
    {
        tokenState.addCloakListener(listener);
    }

    /**
     * @param damage Critical damage.
     */
    public void addCriticalDamage(final DamageCard damage)
    {
        LOGGER.info(getName() + " added: " + damage);
        tokenState.addCriticalDamage(damage);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addCriticalDamageListener(final PropertyChangeListener listener)
    {
        tokenState.addCriticalDamageListener(listener);
    }

    /**
     * @param damage Damage.
     */
    public void addDamage(final DamageCard damage)
    {
        tokenState.addDamage(damage);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addDamageListener(final PropertyChangeListener listener)
    {
        tokenState.addDamageListener(listener);
    }

    /**
     * @param targetLock the targetLock to add
     */
    public void addDefenderTargetLock(final TargetLock targetLock)
    {
        tokenState.addDefenderTargetLock(targetLock);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addDefenderTargetLockListener(final PropertyChangeListener listener)
    {
        tokenState.addDefenderTargetLockListener(listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addEvadeListener(final PropertyChangeListener listener)
    {
        tokenState.addEvadeListener(listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addFocusListener(final PropertyChangeListener listener)
    {
        tokenState.addFocusListener(listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addIonListener(final PropertyChangeListener listener)
    {
        tokenState.addIonListener(listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addShieldListener(final PropertyChangeListener listener)
    {
        tokenState.addShieldListener(listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addStressListener(final PropertyChangeListener listener)
    {
        tokenState.addStressListener(listener);
    }

    /**
     * Clear the evade tokens.
     */
    public void clearEvadeCount()
    {
        tokenState.clearEvadeCount();
    }

    /**
     * Clear the focus tokens.
     */
    public void clearFocusCount()
    {
        tokenState.clearFocusCount();
    }

    /**
     * @param environment Environment.
     * @param weapon Weapon.
     * @param range Range.
     *
     * @return the number of dice to use.
     */
    public int computeAttackDiceCount(final SSEnvironment environment, final Weapon weapon, final Range range)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("range", range);

        int answer;

        if (isCriticallyDamagedWith(DamageCard.BLINDED_PILOT))
        {
            answer = 0;
            DamageCard.BLINDED_PILOT.flipThisCardFacedown(environment, this);
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

    /**
     * @param weapon Weapon.
     * @param range Range.
     *
     * @return the number of dice to use.
     */
    public int computeDefenseDiceCount(final Weapon weapon, final Range range)
    {
        InputValidator.validateNotNull("range", range);

        int answer = getAgilityValue();

        if ((range == Range.THREE) && weapon.isPrimary())
        {
            // Bonus defense die at range three.
            answer++;
        }

        return answer;
    }

    /**
     * @param upgrade Upgrade card.
     */
    public void deactivateUpgrade(final UpgradeCard upgrade)
    {
        activeUpgrades.remove(upgrade);
    }

    /**
     * Decrease the cloak token count.
     */
    public void decreaseCloakCount()
    {
        tokenState.decreaseCloakCount();
    }

    /**
     * Decrease the evade token count.
     */
    public void decreaseEvadeCount()
    {
        tokenState.decreaseEvadeCount();
    }

    /**
     * Decrease the focus token count.
     */
    public void decreaseFocusCount()
    {
        tokenState.decreaseFocusCount();
    }

    /**
     * Decrease the ion token count.
     */
    public void decreaseIonCount()
    {
        tokenState.decreaseIonCount();
    }

    /**
     * Decrease the shield token count.
     */
    public void decreaseShieldCount()
    {
        tokenState.decreaseShieldCount();
    }

    /**
     * Decrease the stress token count.
     */
    public void decreaseStressCount()
    {
        tokenState.decreaseStressCount();
    }

    /**
     * @return the activeUpgrades
     */
    public List<UpgradeCard> getActiveUpgrades()
    {
        return activeUpgrades;
    }

    @Override
    public SSAgent getAgent()
    {
        return (SSAgent)delegate.getAgent();
    }

    @Override
    public int getAgilityValue()
    {
        int answer = shipState.getAgilityValue();

        for (final DamageCard damage : getCriticalDamages())
        {
            answer += damage.getAgilityValue();
        }

        for (final UpgradeCard upgrade : getUpgrades())
        {
            if (!upgrade.hasAction() || isUpgradeActive(upgrade))
            {
                answer += upgrade.getAgilityValue();
            }
        }

        if (isUpgradedWith(UpgradeCard.STEALTH_DEVICE))
        {
            answer++;
        }

        if (isCloaked())
        {
            // Cloak bonus.
            answer += 2;
        }

        return Math.max(answer, 0);
    }

    /**
     * @return the attackDice
     */
    public AttackDice getAttackDice()
    {
        return combatState.getAttackDice();
    }

    /**
     * @return the attackerTargetLock
     */
    public TargetLock getAttackerTargetLock()
    {
        return tokenState.getAttackerTargetLock();
    }

    @Override
    public int getCloakCount()
    {
        return tokenState.getCloakCount();
    }

    /**
     * @return the combatAction
     */
    public CombatAction getCombatAction()
    {
        return combatState.getCombatAction();
    }

    @Override
    public int getCriticalDamageCount()
    {
        return tokenState.getCriticalDamageCount();
    }

    /**
     * @return the criticalDamages
     */
    public DamageCardList getCriticalDamages()
    {
        return tokenState.getCriticalDamages();
    }

    /**
     * @param trait Trait.
     *
     * @return critical damages with the given trait.
     */
    public DamageCardList getCriticalDamagesWithTrait(final Trait trait)
    {
        final DamageCardList answer = new DamageCardList();

        for (final DamageCard damage : getCriticalDamages())
        {
            if (damage.getTrait() == trait)
            {
                answer.add(damage);
            }
        }

        return answer;
    }

    @Override
    public int getDamageCount()
    {
        return tokenState.getDamageCount();
    }

    /**
     * @return the damages
     */
    public DamageCardList getDamages()
    {
        return tokenState.getDamages();
    }

    /**
     * @return the defender
     */
    public SSToken getDefender()
    {
        return combatState.getDefender();
    }

    /**
     * @return the defenderTargetLocks
     */
    public List<TargetLock> getDefenderTargetLocks()
    {
        return tokenState.getDefenderTargetLocks();
    }

    /**
     * @return the defenseDice
     */
    public DefenseDice getDefenseDice()
    {
        return combatState.getDefenseDice();
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    @Override
    public int getEvadeCount()
    {
        return tokenState.getEvadeCount();
    }

    @Override
    public int getFocusCount()
    {
        return tokenState.getFocusCount();
    }

    @Override
    public int getHullValue()
    {
        int answer = shipState.getHullValue();

        for (final DamageCard damage : getCriticalDamages())
        {
            answer += damage.getHullValue();
        }

        for (final UpgradeCard upgrade : getUpgrades())
        {
            if (!upgrade.hasAction() || isUpgradeActive(upgrade))
            {
                answer += upgrade.getHullValue();
            }
        }

        return Math.max(answer, 0);
    }

    /**
     * @return the id
     */
    public int getId()
    {
        return id;
    }

    @Override
    public int getIonCount()
    {
        return tokenState.getIonCount();
    }

    /**
     * @return the maneuverAction
     */
    public ManeuverAction getManeuverAction()
    {
        return activationState.getManeuverAction();
    }

    /**
     * @return the maneuvers
     */
    public ManeuverSet getManeuvers()
    {
        ManeuverSet answer = getShip().getManeuvers();

        if (tokenState.isStressed())
        {
            answer = answer.getNonHardManeuvers();
        }

        if (isCriticallyDamagedWith(DamageCard.DAMAGED_ENGINE))
        {
            answer = changeTurnManeuversToHard(answer);
        }

        if (isUpgradedWith(UpgradeCard.NIEN_NUNB))
        {
            answer = changeManeuversToEasy(answer, Bearing.STRAIGHT);
        }

        if (isUpgradedWith(UpgradeCard.R2_ASTROMECH))
        {
            answer = changeManeuversToEasy(answer, 1);
            answer = changeManeuversToEasy(answer, 2);
        }

        return answer;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    /**
     * @return the pilot
     */
    public Pilot getPilot()
    {
        return pilot;
    }

    /**
     * @return the pilotName
     */
    public String getPilotName()
    {
        return getId() + " " + getPilot().getName();
    }

    @Override
    public int getPilotSkillValue()
    {
        int answer;

        if (isCriticallyDamagedWith(DamageCard.DAMAGED_COCKPIT))
        {
            answer = 0;
        }
        else if (isCriticallyDamagedWith(DamageCard.INJURED_PILOT))
        {
            answer = 0;
        }
        else
        {
            answer = shipState.getPilotSkillValue();
        }

        for (final DamageCard damage : getCriticalDamages())
        {
            answer += damage.getPilotSkillValue();
        }

        for (final UpgradeCard upgrade : getUpgrades())
        {
            if (!upgrade.hasAction() || isUpgradeActive(upgrade))
            {
                answer += upgrade.getPilotSkillValue();
            }
        }

        return Math.max(answer, 0);
    }

    /**
     * @return the primaryWeapon
     */
    public Weapon getPrimaryWeapon()
    {
        return pilot.getPrimaryWeapon();
    }

    @Override
    public int getPrimaryWeaponValue()
    {
        int answer = shipState.getPrimaryWeaponValue();

        for (final DamageCard damage : getCriticalDamages())
        {
            answer += damage.getPrimaryWeaponValue();
        }

        for (final UpgradeCard upgrade : getUpgrades())
        {
            if (!upgrade.hasAction() || isUpgradeActive(upgrade))
            {
                answer += upgrade.getPrimaryWeaponValue();
            }
        }

        return Math.max(answer, 0);
    }

    /**
     * @return the range
     */
    public Range getRange()
    {
        return combatState.getRange();
    }

    /**
     * @return a new list of secondary weapon upgrade cards.
     */
    public Set<Weapon> getSecondaryWeapons()
    {
        return upgrades.getSecondaryWeapons();
    }

    /**
     * @return a new list of secondary weapon upgrade cards.
     */
    public UpgradeCardList getSecondaryWeaponUpgrades()
    {
        return upgrades.getSecondaryWeaponUpgrades();
    }

    @Override
    public int getShieldCount()
    {
        return tokenState.getShieldCount();
    }

    @Override
    public int getShieldValue()
    {
        int answer = shipState.getShieldValue();

        for (final DamageCard damage : getCriticalDamages())
        {
            answer += damage.getShieldValue();
        }

        for (final UpgradeCard upgrade : getUpgrades())
        {
            if (!upgrade.hasAction() || isUpgradeActive(upgrade))
            {
                answer += upgrade.getShieldValue();
            }
        }

        return Math.max(answer, 0);
    }

    /**
     * @return the ship
     */
    public Ship getShip()
    {
        return pilot.getShip();
    }

    /**
     * @return the shipActionAction
     */
    public ShipActionAction getShipActionAction()
    {
        return activationState.getShipActionAction();
    }

    /**
     * @return the shipActions
     */
    public Set<ShipAction> getShipActions()
    {
        final Set<ShipAction> answer = new HashSet<ShipAction>();

        final DamageCardList criticalDamages = getCriticalDamages();

        if (!criticalDamages.contains(DamageCard.DAMAGED_SENSOR_ARRAY))
        {
            answer.addAll(getShip().getShipActions());
        }

        if (answer.contains(ShipAction.CLOAK) && isCloaked())
        {
            answer.remove(ShipAction.CLOAK);
        }

        if (isUpgradedWith(UpgradeCard.ENGINE_UPGRADE))
        {
            answer.add(ShipAction.BOOST);
        }

        if (isUpgradedWith(UpgradeCard.MILLENNIUM_FALCON))
        {
            answer.add(ShipAction.EVADE);
        }

        if (isUpgradedWith(UpgradeCard.TARGETING_COMPUTER))
        {
            answer.add(ShipAction.TARGET_LOCK);
        }

        if (!criticalDamages.isEmpty())
        {
            for (final DamageCard damage : criticalDamages)
            {
                if (damage.hasAction())
                {
                    answer.add(new DamageCardShipAction(damage));
                }
            }
        }

        if (!upgrades.isEmpty())
        {
            for (final UpgradeCard upgrade : upgrades)
            {
                if (upgrade.hasAction())
                {
                    answer.add(new UpgradeCardShipAction(upgrade));
                }
            }
        }

        return answer;
    }

    /**
     * @return the squadPointCost
     */
    public int getSquadPointCost()
    {
        int answer = pilot.getSquadPointCost();

        for (final UpgradeCard upgrade : getUpgrades())
        {
            answer += upgrade.getSquadPointCost();
        }

        return answer;
    }

    @Override
    public int getStressCount()
    {
        return tokenState.getStressCount();
    }

    @Override
    public SSTeam getTeam()
    {
        return (SSTeam)delegate.getTeam();
    }

    /**
     * @return the number of upgrades.
     */
    public int getUpgradeCount()
    {
        return getUpgrades().size();
    }

    /**
     * @return the upgrades
     */
    public UpgradeCardList getUpgrades()
    {
        UpgradeCardList answer;

        if (isCriticallyDamagedWith(DamageCard.INJURED_PILOT))
        {
            answer = clearEliteUpgradeCards(upgrades);
        }
        else
        {
            answer = upgrades;
        }

        return answer;
    }

    /**
     * @return the upgradeTypes
     */
    public List<UpgradeType> getUpgradeTypes()
    {
        List<UpgradeType> answer;

        if (isUpgradedWith(UpgradeCard.R2_D6))
        {
            answer = new ArrayList<UpgradeType>(pilot.getUpgradeTypes());
            answer.add(UpgradeType.ELITE);
        }
        else if (isUpgradedWith(UpgradeCard.SLAVE_I))
        {
            answer = new ArrayList<UpgradeType>(pilot.getUpgradeTypes());
            answer.add(UpgradeType.TORPEDO);
        }
        else
        {
            answer = pilot.getUpgradeTypes();
        }

        return answer;
    }

    /**
     * @return the weapon
     */
    public Weapon getWeapon()
    {
        return combatState.getWeapon();
    }

    /**
     * @return a new list of secondary weapon upgrade cards.
     */
    public List<Weapon> getWeapons()
    {
        final List<Weapon> answer = new ArrayList<Weapon>();

        answer.add(getPrimaryWeapon());
        answer.addAll(upgrades.getSecondaryWeapons());

        return answer;
    }

    @Override
    public boolean hasAction()
    {
        return false;
    }

    /**
     * Increase the cloak token count.
     */
    public void increaseCloakCount()
    {
        tokenState.increaseCloakCount();
    }

    /**
     * Increase the evade token count.
     */
    public void increaseEvadeCount()
    {
        tokenState.increaseEvadeCount();
    }

    /**
     * Increase the focus token count.
     */
    public void increaseFocusCount()
    {
        tokenState.increaseFocusCount();
    }

    /**
     * Increase the ion token count.
     */
    public void increaseIonCount()
    {
        tokenState.increaseIonCount();
    }

    /**
     * Increase the shield token count.
     */
    public void increaseShieldCount()
    {
        tokenState.increaseShieldCount();
    }

    /**
     * Increase the stress token count.
     */
    public void increaseStressCount()
    {
        tokenState.increaseStressCount();
    }

    @Override
    public boolean isCloaked()
    {
        return tokenState.isCloaked();
    }

    /**
     * @param damage Damage.
     *
     * @return true if this is critically damaged with the given damage.
     */
    public boolean isCriticallyDamagedWith(final DamageCard damage)
    {
        return getCriticalDamages().contains(damage);
    }

    /**
     * @return the isDefenderHit
     */
    public boolean isDefenderHit()
    {
        return combatState.isDefenderHit();
    }

    /**
     * @return true if this ship is destroyed.
     */
    public boolean isDestroyed()
    {
        return (getDamageCount() + getCriticalDamageCount()) >= getHullValue();
    }

    @Override
    public boolean isStressed()
    {
        return tokenState.isStressed();
    }

    /**
     * @return the isTouching
     */
    public boolean isTouching()
    {
        return activationState.isTouching();
    }

    /**
     * @param upgrade Upgrade.
     *
     * @return true if this is upgraded with the given upgrade, and it is active.
     */
    public boolean isUpgradeActive(final UpgradeCard upgrade)
    {
        return isUpgradedWith(upgrade) && getActiveUpgrades().contains(upgrade);
    }

    /**
     * @param upgrade Upgrade.
     *
     * @return true if this is upgraded with the given upgrade.
     */
    public boolean isUpgradedWith(final UpgradeCard upgrade)
    {
        return getUpgrades().contains(upgrade);
    }

    @Override
    public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("phase", phase);

        if (LOGGER.isTraceEnabled())
        {
            LOGGER.trace(getName());
        }

        if (token != this)
        {
            throw new IllegalArgumentException("token does not equal this");
        }

        if (phase == Phase.ACTIVATION_START)
        {
            activationState.clear();
        }
        else if (phase == Phase.ACTIVATION_EXECUTE_MANEUVER)
        {
            final ManeuverAction maneuverAction = getManeuverAction();
            if (maneuverAction != null)
            {
                final Maneuver maneuver = maneuverAction.getManeuver();
                maneuverEffect(maneuver);
            }
        }
        else if (phase == Phase.COMBAT_START)
        {
            combatState.clear();
        }

        // Pilot.
        pilot.phaseEffect(environment, this, phase);

        // Damages.
        for (final DamageCard damage : getCriticalDamages())
        {
            damage.phaseEffect(environment, this, phase);
        }

        // Upgrades.
        final UpgradeCardList myUpgrades = new UpgradeCardList(getUpgrades());

        for (final UpgradeCard upgrade : myUpgrades)
        {
            upgrade.phaseEffect(environment, this, phase);
        }
    }

    /**
     * @param damage Critical damage.
     */
    public void removeCriticalDamage(final DamageCard damage)
    {
        tokenState.removeCriticalDamage(damage);
        LOGGER.info(getName() + " removed: " + damage);
    }

    /**
     * @param damage Damage.
     */
    public void removeDamage(final DamageCard damage)
    {
        tokenState.removeDamage(damage);
    }

    /**
     * @param targetLock the targetLock to remove
     */
    public void removeDefenderTargetLock(final TargetLock targetLock)
    {
        tokenState.removeDefenderTargetLock(targetLock);
    }

    /**
     * @param upgrade Upgrade.
     */
    public void removeUpgrade(final UpgradeCard upgrade)
    {
        upgrades.remove(upgrade);
        LOGGER.trace("removed " + upgrade.getName());
    }

    /**
     * @param attackDice the attackDice to set
     */
    public void setAttackDice(final AttackDice attackDice)
    {
        combatState.setAttackDice(attackDice);
    }

    /**
     * @param targetLock the targetLock to set
     */
    public void setAttackerTargetLock(final TargetLock targetLock)
    {
        tokenState.setAttackerTargetLock(targetLock);
    }

    /**
     * @param combatAction the combatAction to set
     */
    public void setCombatAction(final CombatAction combatAction)
    {
        combatState.setCombatAction(combatAction);
    }

    /**
     * @param defender the defender to set
     */
    public void setDefender(final SSToken defender)
    {
        combatState.setDefender(defender);
    }

    /**
     * @param isDefenderHit the isDefenderHit to set
     */
    public void setDefenderHit(final boolean isDefenderHit)
    {
        combatState.setDefenderHit(isDefenderHit);
    }

    /**
     * @param defenseDice the defenseDice to set
     */
    public void setDefenseDice(final DefenseDice defenseDice)
    {
        combatState.setDefenseDice(defenseDice);
    }

    /**
     * @param maneuverAction the maneuverAction to set
     */
    public void setManeuverAction(final ManeuverAction maneuverAction)
    {
        activationState.setManeuverAction(maneuverAction);
    }

    /**
     * @param range the range to set
     */
    public void setRange(final Range range)
    {
        combatState.setRange(range);
    }

    /**
     * @param shipActionAction the shipActionAction to set
     */
    public void setShipActionAction(final ShipActionAction shipActionAction)
    {
        activationState.setShipActionAction(shipActionAction);
    }

    /**
     * @param isTouching the isTouching to set
     */
    public void setTouching(final boolean isTouching)
    {
        activationState.setTouching(isTouching);
    }

    /**
     * @param weapon the weapon to set
     */
    public void setWeapon(final Weapon weapon)
    {
        combatState.setWeapon(weapon);
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("id", getId());
        builder.append("name", getName());
        builder.append("pilot", getPilot().getName());
        builder.append("ship", getPilot().getShip().getName());
        builder.append("upgrades", getUpgrades());

        return builder.toString();
    }

    @Override
    public Token withAgent(final Agent agent)
    {
        InputValidator.validateNotNull("agent", agent);

        return new SSToken(getPilot(), agent, getUpgrades());
    }

    /**
     * Change the maneuvers with the given bearing to easy difficulty.
     *
     * @param maneuvers Maneuvers.
     * @param bearing Bearing.
     *
     * @return maneuvers.
     */
    private ManeuverSet changeManeuversToEasy(final ManeuverSet maneuvers, final Bearing bearing)
    {
        final ManeuverSet newManeuvers = new ManeuverSet();

        for (final Maneuver maneuver : maneuvers)
        {
            if ((maneuver.getBearing() == bearing) && (maneuver.getDifficulty() != Difficulty.EASY))
            {
                final Maneuver newManeuver = Maneuver.find(bearing, maneuver.getSpeed(), Difficulty.EASY);
                newManeuvers.add(newManeuver);
            }
            else
            {
                newManeuvers.add(maneuver);
            }
        }

        return newManeuvers;
    }

    /**
     * Change the maneuvers at the given speed to easy difficulty.
     *
     * @param maneuvers Maneuvers.
     * @param speed Speed.
     *
     * @return maneuvers.
     */
    private ManeuverSet changeManeuversToEasy(final ManeuverSet maneuvers, final int speed)
    {
        final ManeuverSet newManeuvers = new ManeuverSet();

        for (final Maneuver maneuver : maneuvers)
        {
            if ((maneuver.getSpeed() == speed) && (maneuver.getDifficulty() != Difficulty.EASY))
            {
                final Maneuver newManeuver = Maneuver.find(maneuver.getBearing(), speed, Difficulty.EASY);
                newManeuvers.add(newManeuver);
            }
            else
            {
                newManeuvers.add(maneuver);
            }
        }

        return newManeuvers;
    }

    /**
     * Change the turn maneuvers to hard difficulty.
     *
     * @param maneuvers Maneuvers.
     *
     * @return maneuvers.
     */
    private ManeuverSet changeTurnManeuversToHard(final ManeuverSet maneuvers)
    {
        final ManeuverSet newManeuvers = new ManeuverSet();

        for (final Maneuver maneuver : maneuvers)
        {
            if (maneuver.getBearing().isTurn())
            {
                final Maneuver newManeuver = Maneuver.find(maneuver.getBearing(), maneuver.getSpeed(), Difficulty.HARD);
                newManeuvers.add(newManeuver);
            }
            else
            {
                newManeuvers.add(maneuver);
            }
        }

        return newManeuvers;
    }

    /**
     * Clear any elite upgrade cards.
     *
     * @param upgrades Upgrades.
     *
     * @return upgrades.
     */
    @SuppressWarnings("hiding")
    private UpgradeCardList clearEliteUpgradeCards(final UpgradeCardList upgrades)
    {
        final UpgradeCardList answer = new UpgradeCardList();

        for (final UpgradeCard upgrade : upgrades)
        {
            if (upgrade.getType() != UpgradeType.ELITE)
            {
                answer.add(upgrade);
            }
        }

        return answer;
    }

    /**
     * @param maneuver Maneuver.
     */
    private void maneuverEffect(final Maneuver maneuver)
    {
        InputValidator.validateNotNull("maneuver", maneuver);

        LOGGER.trace(getName() + ".maneuverEffect()");

        if (maneuver.getDifficulty() == Difficulty.EASY)
        {
            decreaseStressCount();
        }
        else if (maneuver.getDifficulty() == Difficulty.HARD)
        {
            increaseStressCount();
        }
    }

    /**
     * Verify the given upgrades can be applied to this ship.
     *
     * @param upgrades Upgrades.
     */
    @SuppressWarnings("hiding")
    private void verifyUpgrades(final UpgradeCardList upgrades)
    {
        if (!upgrades.isEmpty())
        {
            // Up to 1 modification per ship.
            if (upgrades.valuesByType(UpgradeType.MODIFICATION).size() > 1)
            {
                throw new IllegalArgumentException("Multiple modifications are not allowed.");
            }

            // Up to 1 title per ship.
            if (upgrades.valuesByType(UpgradeType.TITLE).size() > 1)
            {
                throw new IllegalArgumentException("Multiple titles are not allowed.");
            }

            final Ship ship = pilot.getShip();

            for (final UpgradeCard upgrade : upgrades)
            {
                // Check against the allowed types in the upgrade bar.
                final UpgradeType upgradeType = upgrade.getType();

                if ((upgradeType == UpgradeType.MODIFICATION) || (upgradeType == UpgradeType.TITLE))
                {
                    // These do not appear in the upgrade bar.
                }
                else if (!getUpgradeTypes().contains(upgradeType))
                {
                    throw new IllegalArgumentException("Unsupported upgrade type: " + upgrade.getType());
                }

                // Check against the upgrade restrictions.
                final Set<UpgradeRestriction> restrictions = upgrade.getRestrictions();

                if (!restrictions.isEmpty())
                {
                    for (final UpgradeRestriction restriction : restrictions)
                    {
                        if (!restriction.passes(ship))
                        {
                            throw new IllegalArgumentException("Restricted upgrade: " + upgrade.getName());
                        }
                    }
                }

                if (upgrade == UpgradeCard.R2_D6)
                {
                    if (pilot.getUpgradeTypes().contains(UpgradeType.ELITE))
                    {
                        throw new IllegalArgumentException("Upgrade bar already contains Elite: " + upgrade.getName());
                    }
                    else if (getPilotSkillValue() <= 2)
                    {
                        throw new IllegalArgumentException("Pilot skill value is 2 or lower: " + upgrade.getName());
                    }
                }
            }
        }
    }
}
