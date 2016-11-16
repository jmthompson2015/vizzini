package org.vizzini.runescape;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides an enumeration of RuneScape skills.
 * 
 * @see "http://runescape.wikia.com/wiki/Skills"
 */
public enum Skill
{
    /** Skill. */
    ATTACK(SkillType.COMBAT),
    /** Skill. */
    STRENGTH(SkillType.COMBAT),
    /** Skill. */
    DEFENCE(SkillType.COMBAT),
    /** Skill. */
    RANGED(SkillType.COMBAT),
    /** Skill. */
    PRAYER(SkillType.COMBAT),
    /** Skill. */
    MAGIC(SkillType.COMBAT),
    /** Skill. */
    CONSTITUTION(SkillType.COMBAT),
    /** Skill. */
    CRAFTING(SkillType.ARTISAN),
    /** Skill. */
    MINING(SkillType.GATHERING),
    /** Skill. */
    SMITHING(SkillType.ARTISAN),
    /** Skill. */
    FISHING(SkillType.GATHERING),
    /** Skill. */
    COOKING(SkillType.ARTISAN),
    /** Skill. */
    FIREMAKING(SkillType.ARTISAN),
    /** Skill. */
    WOODCUTTING(SkillType.GATHERING),
    /** Skill. */
    RUNECRAFTING(SkillType.ARTISAN),
    /** Skill. */
    DUNGEONEERING(SkillType.SUPPORT),

    /** Skill. */
    AGILITY(false, SkillType.SUPPORT),
    /** Skill. */
    HERBLORE(false, SkillType.ARTISAN),
    /** Skill. */
    THIEVING(false, SkillType.SUPPORT),
    /** Skill. */
    FLETCHING(false, SkillType.ARTISAN),
    /** Skill. */
    SLAYER(false, SkillType.SUPPORT),
    /** Skill. */
    FARMING(false, SkillType.GATHERING),
    /** Skill. */
    CONSTRUCTION(false, SkillType.ARTISAN),
    /** Skill. */
    HUNTER(false, SkillType.GATHERING),
    /** Skill. */
    SUMMONING(false, SkillType.COMBAT),
    /** Skill. */
    DIVINATION(false, SkillType.GATHERING),
    /** Skill. */
    // INVENTOR(false)
    ;

    /**
     * @param skillType Primary skill type.
     * 
     * @return a list of skills of the given type.
     */
    public static List<Skill> findByType(final SkillType skillType)
    {
        final List<Skill> answer = new ArrayList<Skill>();

        for (final Skill skill : values())
        {
            if (skill.getSkillType() == skillType)
            {
                answer.add(skill);
            }
        }

        return answer;
    }

    /** Flag indicating if this is a free-to-play skill. */
    private final boolean isFreeToPlaySkill;

    /** Primary skill type. */
    private final SkillType skillType;

    /**
     * Construct this object.
     * 
     * @param isFreeToPlaySkill Flag indicating if this is a free-to-play skill.
     * @param skillType Primary skill type.
     */
    @SuppressWarnings("hiding")
    private Skill(final boolean isFreeToPlaySkill, final SkillType skillType)
    {
        this.isFreeToPlaySkill = isFreeToPlaySkill;
        this.skillType = skillType;
    }

    /**
     * Construct this object.
     * 
     * @param skillType Primary skill type.
     */
    @SuppressWarnings("hiding")
    private Skill(final SkillType skillType)
    {
        this(true, skillType);
    }

    /**
     * @return the skillType
     */
    public SkillType getSkillType()
    {
        return skillType;
    }

    /**
     * @return the isFreeToPlaySkill
     */
    public boolean isFreeToPlaySkill()
    {
        return isFreeToPlaySkill;
    }

    /**
     * @return the isFreeToPlaySkill
     */
    public boolean isMemberSkill()
    {
        return !isFreeToPlaySkill;
    }
}
