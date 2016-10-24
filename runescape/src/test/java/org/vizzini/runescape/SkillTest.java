package org.vizzini.runescape;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>Skill</code> class.
 */
public final class SkillTest
{
    /**
     * Test the <code>findByType()</code> method.
     */
    @Test
    public void findByType()
    {
        assertThat(Skill.findByType(SkillType.COMBAT).size(), is(8));
        assertThat(Skill.findByType(SkillType.GATHERING).size(), is(6));
        assertThat(Skill.findByType(SkillType.ARTISAN).size(), is(8));
        assertThat(Skill.findByType(SkillType.SUPPORT).size(), is(4));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        assertThat(Skill.values().length, is(26));
    }
}
