package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;

/**
 * Provides a target lock for Starfighter Squadrons.
 */
public final class TargetLock
{
    /**
     * @param attacker Attacker.
     *
     * @return the target lock with the given attacker.
     */
    public static TargetLock findForAttacker(final SSToken attacker)
    {
        InputValidator.validateNotNull("attacker", attacker);

        TargetLock answer = null;

        for (final Entry<String, TargetLock> entry : NAME_TO_TARGET_LOCK.entrySet())
        {
            final TargetLock targetLock = entry.getValue();
            final SSToken myAttacker = targetLock.getAttacker();

            if (myAttacker == attacker)
            {
                answer = targetLock;
                break;
            }
        }

        return answer;
    }

    /**
     * @param targetLock Target lock.
     */
    public static void freeInstance(final TargetLock targetLock)
    {
        InputValidator.validateNotNull("targetLock", targetLock);

        targetLock.getAttacker().setAttackerTargetLock(null);
        targetLock.getDefender().removeDefenderTargetLock(targetLock);

        NAME_TO_TARGET_LOCK.remove(targetLock.getName());
    }

    /**
     * @param attacker Attacker.
     * @param defender Defender.
     *
     * @return a configured target lock.
     */
    public static TargetLock getInstance(final SSToken attacker, final SSToken defender)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        // Clear any current attacker target lock.
        final TargetLock attackerTargetLock = attacker.getAttackerTargetLock();

        if (attackerTargetLock != null)
        {
            freeInstance(attackerTargetLock);
        }

        final TargetLock answer = new TargetLock(attacker, defender);

        attacker.setAttackerTargetLock(answer);
        defender.addDefenderTargetLock(answer);

        NAME_TO_TARGET_LOCK.put(answer.getName(), answer);

        return answer;
    }

    /**
     * @param defender Defender.
     *
     * @return a list of target locks with the given defender.
     */
    public static List<TargetLock> valuesForDefender(final SSToken defender)
    {
        InputValidator.validateNotNull("defender", defender);

        final List<TargetLock> answer = new ArrayList<TargetLock>();

        for (final Entry<String, TargetLock> entry : NAME_TO_TARGET_LOCK.entrySet())
        {
            final TargetLock targetLock = entry.getValue();
            final SSToken myDefender = targetLock.getDefender();

            if (myDefender == defender)
            {
                answer.add(targetLock);
            }
        }

        return answer;
    }

    /**
     * @return the next name.
     */
    private static String nextName()
    {
        char nextName = 'A';

        for (final Entry<String, TargetLock> entry : NAME_TO_TARGET_LOCK.entrySet())
        {
            final String name = entry.getKey();

            if (String.valueOf(nextName).equals(name))
            {
                nextName++;
            }
        }

        return String.valueOf(nextName);
    }

    /** Map of name to target lock. */
    private static final Map<String, TargetLock> NAME_TO_TARGET_LOCK = new TreeMap<String, TargetLock>();

    /** Attacker. */
    private final SSToken attacker;

    /** Defender. */
    private final SSToken defender;

    /** Name. */
    private final String name;

    /**
     * Construct this object.
     *
     * @param attacker Attacker.
     * @param defender Defender.
     */
    @SuppressWarnings("hiding")
    private TargetLock(final SSToken attacker, final SSToken defender)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        if (attacker.getTeam() == defender.getTeam())
        {
            throw new IllegalArgumentException("attacker and defender are on the same team.");
        }

        this.name = nextName();
        this.attacker = attacker;
        this.defender = defender;
    }

    /**
     * @return the attacker
     */
    public SSToken getAttacker()
    {
        return attacker;
    }

    /**
     * @return the defender
     */
    public SSToken getDefender()
    {
        return defender;
    }

    /**
     * @return the name
     */
    public String getName()
    {
        return name;
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("name", getName());
        builder.append("attacker", getAttacker().getName());
        builder.append("defender", getDefender().getName());

        return builder.toString();
    }
}
