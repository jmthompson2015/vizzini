package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.InputValidator;
import org.vizzini.core.RandomGenerator;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.starfightersquadrons.Maneuver.BarrelRollManeuver;
import org.vizzini.starfightersquadrons.Maneuver.Bearing;
import org.vizzini.starfightersquadrons.Maneuver.BoostManeuver;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.RangeRuler.Range;
import org.vizzini.starfightersquadrons.ShipAction.DamageCardShipAction;
import org.vizzini.starfightersquadrons.ShipAction.UpgradeCardShipAction;
import org.vizzini.starfightersquadrons.swingui.WeaponAndDefenderChooser.WeaponAndDefender;

/**
 * Provides a simple implementation of a computer agent for Starfighter Squadrons.
 */
public final class SimpleAgent implements SSAgent
{
    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Name. */
    private final String name;

    /** Random generator. */
    private final RandomGenerator randomGenerator = new DefaultRandomGenerator();

    /** Range ruler. */
    private final RangeRuler rangeRuler = new RangeRuler();

    /** Squad builder. */
    private final SquadBuilder squadBuilder;

    /** Team. */
    private final SSTeam team;

    /**
     * Construct this object.
     *
     * @param name Name. (required)
     * @param team Team. (required)
     * @param squadBuilder Squad builder. (required)
     */
    @SuppressWarnings("hiding")
    public SimpleAgent(final String name, final SSTeam team, final SquadBuilder squadBuilder)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("team", team);
        InputValidator.validateNotNull("squadBuilder", squadBuilder);

        this.name = name;
        this.team = team;
        this.squadBuilder = squadBuilder;
    }

    @Override
    public List<SSToken> buildSquad()
    {
        return squadBuilder.buildSquad(this);
    }

    @Override
    public Maneuver chooseDecloakManeuver(final SSEnvironment environment, final SSAdjudicator adjudicator,
            final SSToken token)
    {
        Maneuver answer = null;

        final int choice = randomGenerator.generateInt(0, 2);

        switch (choice)
        {
        case 0:
            answer = BarrelRollManeuver.BARREL_ROLL_LEFT_2;
            break;
        case 1:
            answer = Maneuver.STRAIGHT_2_STANDARD;
            break;
        case 2:
            answer = BarrelRollManeuver.BARREL_ROLL_RIGHT_2;
            break;
        }

        return answer;
    }

    @Override
    public WeaponAndDefender chooseWeaponAndDefender(final SSEnvironment environment,
            final SSAdjudicator adjudicator, final SSToken attacker)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);

        WeaponAndDefender answer = null;

        final SSToken defender = chooseTarget(environment, adjudicator, attacker);

        if (defender != null)
        {
            answer = new WeaponAndDefender(attacker.getPrimaryWeapon(), defender);
        }

        return answer;
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final SimpleAgent another = (SimpleAgent)object;

            answer = name.equals(another.name);

            if (answer)
            {
                answer = team.equals(another.team);
            }
        }

        return answer;
    }

    @Deprecated
    @Override
    public Action getAction(final Environment environment, final Adjudicator adjudicator)
    {
        throw new RuntimeException("method not used");
    }

    @Override
    public String getDescription()
    {
        return "This agent moves and attacks in a simple manner.";
    }

    @Override
    public ModifyAttackDiceAction getModifyAttackDiceAction(final SSEnvironment environment,
            final SSAdjudicator adjudicator, final SSToken attacker, final AttackDice attackDice,
            final SSToken defender)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);

        if (attacker.getAgent() != this)
        {
            throw new IllegalArgumentException("token does not belong to this agent");
        }

        ModifyAttackDiceAction answer = null;

        if ((attackDice.getHitCount() + attackDice.getCriticalHitCount()) < attackDice.size())
        {
            if (attacker.getFocusCount() > 0)
            {
                answer = new ModifyAttackDiceAction(environment, attacker, attackDice,
                        ModifyAttackDiceAction.Modification.SPEND_FOCUS);
            }
            else if ((attacker.getAttackerTargetLock() != null)
                    && (attacker.getAttackerTargetLock().getDefender() == defender))
            {
                answer = new ModifyAttackDiceAction(environment, attacker, attackDice,
                        ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK);
            }
        }

        return answer;
    }

    @Override
    public ModifyDefenseDiceAction getModifyDefenseDiceAction(final SSEnvironment environment,
            final SSAdjudicator adjudicator, final SSToken attacker, final AttackDice attackDice,
            final SSToken defender, final DefenseDice defenseDice)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenseDice", defenseDice);

        if (defender.getAgent() != this)
        {
            throw new IllegalArgumentException("token does not belong to this agent");
        }

        ModifyDefenseDiceAction answer = null;

        final int hitCount = attackDice.getHitCount() + attackDice.getCriticalHitCount();

        if (hitCount > defenseDice.getEvadeCount())
        {
            if ((defender.getFocusCount() > 0) && (defenseDice.getFocusCount() > 0))
            {
                answer = new ModifyDefenseDiceAction(environment, defender, defenseDice,
                        ModifyDefenseDiceAction.Modification.SPEND_FOCUS);
            }
            else if (defender.getEvadeCount() > 0)
            {
                answer = new ModifyDefenseDiceAction(environment, defender, defenseDice,
                        ModifyDefenseDiceAction.Modification.SPEND_EVADE);
            }
        }

        return answer;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public PlanningAction getPlanningAction(final SSEnvironment environment, final SSAdjudicator adjudicator)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);

        final Map<SSToken, Maneuver> tokenToManeuver = new HashMap<SSToken, Maneuver>();
        final List<SSToken> attackers = environment.getAttackers(team);

        for (final SSToken attacker : attackers)
        {
            final SSPosition fromPosition = environment.getPositionFor(attacker);
            final Ship ship = attacker.getShip();
            final ShipBase shipBase = ship.getShipBase();
            final ManeuverSet possibleManeuvers = attacker.getManeuvers();

            Maneuver maneuver = null;

            final Map<Maneuver, SSPosition> maneuverToPosition = createManeuverToPositionMap(fromPosition, shipBase,
                    possibleManeuvers);

            if (maneuverToPosition.isEmpty())
            {
                // Ship is fleeing the battlefield. (boo!)
                maneuver = possibleManeuvers.findByBearingAndSpeed(Bearing.STRAIGHT, 1);

                if (maneuver == null)
                {
                    maneuver = possibleManeuvers.findByBearingAndSpeed(Bearing.STRAIGHT, 2);

                    if (maneuver == null)
                    {
                        maneuver = possibleManeuvers.findByBearingAndSpeed(Bearing.STRAIGHT, 3);
                    }
                }

                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace(attacker.getShip().getName() + " 0 maneuver = " + maneuver);
                }
            }
            else if (maneuverToPosition.size() == 1)
            {
                // Only one choice. Take it.
                maneuver = maneuverToPosition.keySet().iterator().next();

                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace(attacker.getShip().getName() + " 1 maneuver = " + maneuver);
                }
            }

            if (maneuver == null)
            {
                maneuver = selectManeuverTargetable(environment, attacker, maneuverToPosition);
                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace(attacker.getShip().getName() + " 2 maneuver = " + maneuver);
                }
            }

            if (maneuver == null)
            {
                maneuver = selectManeuverVulnerable(environment, attacker, maneuverToPosition);
                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace(attacker.getShip().getName() + " 3 maneuver = " + maneuver);
                }
            }

            if (maneuver == null)
            {
                maneuver = selectManeuver(environment, attacker, maneuverToPosition);
                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace(attacker.getShip().getName() + " 4 maneuver = " + maneuver);
                }
            }

            tokenToManeuver.put(attacker, maneuver);
        }

        return new PlanningAction(environment, this, tokenToManeuver);
    }

    @Override
    public ShipActionAction getShipActionAction(final SSEnvironment environment, final SSAdjudicator adjudicator,
            final SSToken attacker)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);

        ShipActionAction answer = null;

        final List<ShipAction> shipActions = new ArrayList<ShipAction>(attacker.getShipActions());

        if (!shipActions.isEmpty())
        {
            final int size = shipActions.size();

            while (answer == null)
            {
                final int choice = (size == 1) ? 0 : randomGenerator.generateInt(0, size - 1);
                final ShipAction shipAction = shipActions.get(choice);

                if (shipAction == ShipAction.BARREL_ROLL)
                {
                    answer = getBarrelRollShipActionAction(environment, adjudicator, attacker);
                }
                else if (shipAction == ShipAction.BOOST)
                {
                    answer = getBoostShipActionAction(environment, adjudicator, attacker);
                }
                else if (shipAction == ShipAction.CLOAK)
                {
                    answer = new ShipActionAction(environment, attacker, shipAction);
                }
                else if ((shipAction == ShipAction.EVADE) || (shipAction == ShipAction.FOCUS))
                {
                    answer = new ShipActionAction(environment, attacker, shipAction);
                }
                else if (shipAction == ShipAction.TARGET_LOCK)
                {
                    answer = getTargetLockShipActionAction(environment, adjudicator, attacker);
                }
                else if (shipAction instanceof DamageCardShipAction)
                {
                    // TODO: implement damage card ship action
                }
                else if (shipAction instanceof UpgradeCardShipAction)
                {
                    // TODO: implement upgrade card ship action
                }
                else
                {
                    throw new RuntimeException("Unknown ship action: " + shipAction);
                }
            }
        }

        return answer;
    }

    @Override
    public SSTeam getTeam()
    {
        return team;
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, };
        int i = 0;

        answer += primes[i++] * name.hashCode();
        answer += primes[i++] * team.hashCode();

        return answer;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("name", getName());
        builder.append("team", getTeam());

        return builder.toString();
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param attacker Attacker.
     *
     * @return a target token.
     */
    private SSToken chooseTarget(final SSEnvironment environment, final SSAdjudicator adjudicator,
            final SSToken attacker)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);

        SSToken answer = null;

        if (adjudicator.canAttack(attacker))
        {
            final SSPosition attackerPosition = environment.getPositionFor(attacker);

            if (attackerPosition != null)
            {
                final SSToken defender = environment.getClosestTargetableDefender(attacker, attackerPosition,
                        attacker.getPrimaryWeapon());

                if (defender != null)
                {
                    LOGGER.debug("closest defender = " + defender);
                    final SSPosition defenderPosition = environment.getPositionFor(defender);
                    final Range range = rangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

                    if (range != null)
                    {
                        LOGGER.debug("range = " + range);
                        answer = defender;
                    }
                }
            }
        }

        return answer;
    }

    /**
     * @param fromPosition From position.
     * @param shipBase Ship base.
     * @param possibleManeuvers Possible maneuvers.
     *
     * @return a new map of maneuver to to position.
     */
    private Map<Maneuver, SSPosition> createManeuverToPositionMap(final SSPosition fromPosition,
            final ShipBase shipBase, final ManeuverSet possibleManeuvers)
            {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);
        InputValidator.validateNotNull("possibleManeuvers", possibleManeuvers);

        final Map<Maneuver, SSPosition> answer = new HashMap<Maneuver, SSPosition>();

        for (final Maneuver m : possibleManeuvers)
        {
            final SSPosition toPosition = m.computeToPosition(fromPosition, shipBase);

            if (toPosition != null)
            {
                answer.put(m, toPosition);
            }
        }

        return answer;
            }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param attacker Attacker.
     *
     * @return a new action.
     */
    private ShipActionAction getBarrelRollShipActionAction(final SSEnvironment environment,
            final SSAdjudicator adjudicator, final SSToken attacker)
    {
        ShipActionAction answer = null;

        final int directionChoice = randomGenerator.generateInt(0, 1);
        final Maneuver maneuver = directionChoice == 0 ? BarrelRollManeuver.BARREL_ROLL_LEFT_1
                : BarrelRollManeuver.BARREL_ROLL_RIGHT_1;
        final SSPosition fromPosition = environment.getPositionFor(attacker);

        if (fromPosition != null)
        {
            final ShipBase shipBase = attacker.getShip().getShipBase();
            final ManeuverAction maneuverAction = new ManeuverAction(environment, maneuver, fromPosition, shipBase);
            answer = new ShipActionAction(environment, attacker, ShipAction.BARREL_ROLL, null, maneuverAction);
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param attacker Attacker.
     *
     * @return a new action.
     */
    private ShipActionAction getBoostShipActionAction(final SSEnvironment environment,
            final SSAdjudicator adjudicator, final SSToken attacker)
    {
        ShipActionAction answer = null;

        final int directionChoice = randomGenerator.generateInt(0, 2);
        Maneuver maneuver;

        switch (directionChoice)
        {
        case 0:
            maneuver = BoostManeuver.BOOST_BANK_LEFT_1_STANDARD;
            break;
        case 1:
            maneuver = BoostManeuver.BOOST_STRAIGHT_1_STANDARD;
            break;
        case 2:
            maneuver = BoostManeuver.BOOST_BANK_RIGHT_1_STANDARD;
            break;
        default:
            maneuver = null;
            break;
        }

        final SSPosition fromPosition = environment.getPositionFor(attacker);

        if (fromPosition != null)
        {
            final ShipBase shipBase = attacker.getShip().getShipBase();
            final ManeuverAction maneuverAction = new ManeuverAction(environment, maneuver, fromPosition, shipBase);
            answer = new ShipActionAction(environment, attacker, ShipAction.BOOST, null, maneuverAction);
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param attacker Attacker.
     *
     * @return a new action.
     */
    private ShipActionAction getTargetLockShipActionAction(final SSEnvironment environment,
            final SSAdjudicator adjudicator, final SSToken attacker)
    {
        ShipActionAction answer = null;

        if (attacker.getAttackerTargetLock() == null)
        {
            final SSPosition attackerPosition = environment.getPositionFor(attacker);

            if (attackerPosition != null)
            {
                final SSToken defender = environment.getClosestInRangeDefender(attacker, attackerPosition,
                        attacker.getPrimaryWeapon());

                if (defender != null)
                {
                    answer = new ShipActionAction(environment, attacker, ShipAction.TARGET_LOCK, defender, null);
                }
            }
        }

        return answer;
    }

    /**
     * @param environment Enviroment.
     * @param attacker Attacker.
     * @param maneuverToPosition Map of maneuver to to position.
     *
     * @return the best maneuver.
     */
    private Maneuver selectManeuver(final SSEnvironment environment, final SSToken attacker,
            final Map<Maneuver, SSPosition> maneuverToPosition)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("maneuverToPosition", maneuverToPosition);

        Maneuver maneuver = null;

        int minDistance = Integer.MAX_VALUE;
        Difficulty minDifficulty = Difficulty.HARD;

        for (final Entry<Maneuver, SSPosition> entry : maneuverToPosition.entrySet())
        {
            final SSPosition toPosition = entry.getValue();
            final SSToken defender = environment.getClosestDefender(attacker, toPosition);
            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace("defender = " + defender);
            }
            final SSPosition defenderPosition = environment.getPositionFor(defender);
            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace("defenderPosition = " + defenderPosition);
            }
            final int distance = toPosition.computeDistance(defenderPosition);
            final Maneuver m = entry.getKey();

            if (distance == minDistance)
            {
                // At the same distance, prefer the easier maneuver.
                final Difficulty difficulty = m.getDifficulty();

                if (difficulty.compareTo(minDifficulty) <= 0)
                {
                    minDistance = distance;
                    minDifficulty = difficulty;
                    maneuver = m;
                }
            }
            else if (distance < minDistance)
            {
                minDistance = distance;
                minDifficulty = m.getDifficulty();
                maneuver = m;
            }
        }

        if (LOGGER.isTraceEnabled())
        {
            LOGGER.trace(attacker.getShip().getName() + " 3 maneuver = " + maneuver);
        }

        return maneuver;
    }

    /**
     * @param environment Enviroment.
     * @param attacker Attacker.
     * @param maneuverToPosition Map of maneuver to to position.
     *
     * @return the best maneuver.
     */
    private Maneuver selectManeuverTargetable(final SSEnvironment environment, final SSToken attacker,
            final Map<Maneuver, SSPosition> maneuverToPosition)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("maneuverToPosition", maneuverToPosition);

        Maneuver maneuver = null;

        int minDistance = Integer.MAX_VALUE;
        Difficulty minDifficulty = Difficulty.HARD;

        for (final Entry<Maneuver, SSPosition> entry : maneuverToPosition.entrySet())
        {
            final SSPosition toPosition = entry.getValue();
            final SSToken defender = environment.getClosestTargetableDefender(attacker, toPosition,
                    attacker.getPrimaryWeapon());
            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace("defender = " + defender);
            }

            if (defender != null)
            {
                final SSPosition defenderPosition = environment.getPositionFor(defender);
                final int distance = toPosition.computeDistance(defenderPosition);
                final Maneuver m = entry.getKey();
                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace("m = " + m);
                    LOGGER.trace("distance = " + distance + " minDistance = " + minDistance);
                }

                if (distance == minDistance)
                {
                    // At the same distance, prefer the easier maneuver.
                    final Difficulty difficulty = m.getDifficulty();
                    if (LOGGER.isTraceEnabled())
                    {
                        LOGGER.trace("difficulty.compareTo(minDifficulty) = " + difficulty.compareTo(minDifficulty)
                                + " minDifficulty = " + minDifficulty);
                    }

                    if (difficulty.compareTo(minDifficulty) <= 0)
                    {
                        minDistance = distance;
                        minDifficulty = difficulty;
                        maneuver = m;
                    }
                }
                else if (distance < minDistance)
                {
                    minDistance = distance;
                    minDifficulty = m.getDifficulty();
                    maneuver = m;
                }
            }
        }

        if (maneuver != null)
        {
            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace(attacker.getShip().getName() + " 2 maneuver = " + maneuver);
            }
        }

        return maneuver;
    }

    /**
     * @param environment Enviroment.
     * @param attacker Attacker.
     * @param maneuverToPosition Map of maneuver to to position.
     *
     * @return the best maneuver.
     */
    private Maneuver selectManeuverVulnerable(final SSEnvironment environment, final SSToken attacker,
            final Map<Maneuver, SSPosition> maneuverToPosition)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("maneuverToPosition", maneuverToPosition);

        Maneuver maneuver = null;

        int minDistance = Integer.MAX_VALUE;
        Difficulty minDifficulty = Difficulty.HARD;

        for (final Entry<Maneuver, SSPosition> entry : maneuverToPosition.entrySet())
        {
            final SSPosition toPosition = entry.getValue();
            final SSToken defender = environment.getClosestVulnerableDefender(attacker, toPosition,
                    attacker.getPrimaryWeapon());
            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace("defender = " + defender);
            }

            if (defender != null)
            {
                final SSPosition defenderPosition = environment.getPositionFor(defender);
                final int distance = toPosition.computeDistance(defenderPosition);
                final Maneuver m = entry.getKey();
                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace("m = " + m);
                    LOGGER.trace("distance = " + distance + " minDistance = " + minDistance);
                }

                if (distance == minDistance)
                {
                    // At the same distance, prefer the easier maneuver.
                    final Difficulty difficulty = m.getDifficulty();
                    if (LOGGER.isTraceEnabled())
                    {
                        LOGGER.trace("difficulty.compareTo(minDifficulty) = " + difficulty.compareTo(minDifficulty)
                                + " minDifficulty = " + minDifficulty);
                    }

                    if (difficulty.compareTo(minDifficulty) <= 0)
                    {
                        minDistance = distance;
                        minDifficulty = difficulty;
                        maneuver = m;
                    }
                }
                else if (distance < minDistance)
                {
                    minDistance = distance;
                    minDifficulty = m.getDifficulty();
                    maneuver = m;
                }
            }
        }

        if (maneuver != null)
        {
            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace(attacker.getShip().getName() + " 2 maneuver = " + maneuver);
            }
        }

        return maneuver;
    }
}
