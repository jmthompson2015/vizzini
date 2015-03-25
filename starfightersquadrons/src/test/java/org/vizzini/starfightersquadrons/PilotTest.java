package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.starfightersquadrons.AttackDice;
import org.vizzini.starfightersquadrons.DefenseDice;
import org.vizzini.starfightersquadrons.Phase;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
 * Provides tests for the <code>Pilot</code> class.
 */
public final class PilotTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void phaseEffectLukeSkywalker()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken attacker = TestData.findShip(environment.getAttackers(SSTeam.IMPERIAL), Ship.TIE_FIGHTER);
        final SSAgent rebelAgent = environment.getRebelAgent();
        final SSToken defender = new SSToken(Pilot.LUKE_SKYWALKER, rebelAgent);
        attacker.setDefender(defender);
        final DefenseDice defenseDice = new DefenseDice(5);
        attacker.setDefenseDice(defenseDice);

        // Make sure there is at least one focus result.
        int focusCount = defenseDice.getFocusCount();
        while (focusCount < 1)
        {
            defenseDice.rerollAll();
            focusCount = defenseDice.getFocusCount();
        }
        final int evadeCount = defenseDice.getEvadeCount();
        environment.setActiveToken(attacker);

        // Run.
        defender.getPilot().phaseEffect(environment, defender, Phase.COMBAT_ROLL_DEFENSE_DICE);

        // Verify.
        assertThat(defenseDice.getFocusCount(), is(focusCount - 1));
        assertThat(defenseDice.getEvadeCount(), is(evadeCount + 1));
    }

    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void phaseEffectMaulerMithel()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent imperialAgent = environment.getImperialAgent();
        final SSToken attacker = new SSToken(Pilot.MAULER_MITHEL, imperialAgent);
        environment.setActiveToken(attacker);
        attacker.setRange(Range.ONE);
        final int size = 5;
        final AttackDice attackDice = new AttackDice(size);
        attacker.setAttackDice(attackDice);

        // Run.
        attacker.getPilot().phaseEffect(environment, attacker, Phase.COMBAT_ROLL_ATTACK_DICE);

        // Verify.
        assertThat(attackDice.size(), is(size + 1));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        // Run.
        final Pilot[] result = Pilot.values();

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(83));
        assertThat(result[0].getName(), is("Academy Pilot"));
        assertThat(result[82].getName(), is("\"Winged Gundark\""));
    }

    /**
     * Test the <code>valuesByShip()</code> method.
     */
    @Test
    public void valuesByShipAWing()
    {
        // Setup.
        final Ship ship = Ship.A_WING;

        // Run.
        final Pilot[] result = Pilot.valuesByShip(ship);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(4));
        assertThat(result[0].getShip(), is(ship));
        assertThat(result[0].getName(), is("Arvel Crynyd"));
        assertThat(result[3].getShip(), is(ship));
        assertThat(result[3].getName(), is("Tycho Celchu"));
    }

    /**
     * Test the <code>valuesByShip()</code> method.
     */
    @Test
    public void valuesByShipFirespray31()
    {
        // Setup.
        final Ship ship = Ship.FIRESPRAY_31;

        // Run.
        final Pilot[] result = Pilot.valuesByShip(ship);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(4));
        assertThat(result[0].getShip(), is(ship));
        assertThat(result[0].getName(), is("Boba Fett"));
        assertThat(result[3].getShip(), is(ship));
        assertThat(result[3].getName(), is("Krassis Trelix"));
    }

    /**
     * Test the <code>valuesByShip()</code> method.
     */
    @Test
    public void valuesByShipTIEAdvanced()
    {
        // Setup.
        final Ship ship = Ship.TIE_ADVANCED;

        // Run.
        final Pilot[] result = Pilot.valuesByShip(ship);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(4));
        assertThat(result[0].getShip(), is(ship));
        assertThat(result[0].getName(), is("Darth Vader"));
        assertThat(result[3].getShip(), is(ship));
        assertThat(result[3].getName(), is("Tempest Squadron Pilot"));
    }

    /**
     * Test the <code>valuesByShip()</code> method.
     */
    @Test
    public void valuesByShipTIEFighter()
    {
        // Setup.
        final Ship ship = Ship.TIE_FIGHTER;

        // Run.
        final Pilot[] result = Pilot.valuesByShip(ship);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(9));
        assertThat(result[0].getShip(), is(ship));
        assertThat(result[0].getName(), is("Academy Pilot"));
        assertThat(result[8].getShip(), is(ship));
        assertThat(result[8].getName(), is("\"Winged Gundark\""));
    }

    /**
     * Test the <code>valuesByShip()</code> method.
     */
    @Test
    public void valuesByShipTIEInterceptor()
    {
        // Setup.
        final Ship ship = Ship.TIE_INTERCEPTOR;

        // Run.
        final Pilot[] result = Pilot.valuesByShip(ship);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(6));
        assertThat(result[0].getShip(), is(ship));
        assertThat(result[0].getName(), is("Alpha Squadron Pilot"));
        assertThat(result[5].getShip(), is(ship));
        assertThat(result[5].getName(), is("Turr Phennir"));
    }

    /**
     * Test the <code>valuesByShip()</code> method.
     */
    @Test
    public void valuesByShipXWing()
    {
        // Setup.
        final Ship ship = Ship.X_WING;

        // Run.
        final Pilot[] result = Pilot.valuesByShip(ship);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(10));
        assertThat(result[0].getShip(), is(ship));
        assertThat(result[0].getName(), is("Biggs Darklighter"));
        assertThat(result[9].getShip(), is(ship));
        assertThat(result[9].getName(), is("Wes Janson"));
    }

    /**
     * Test the <code>valuesByShip()</code> method.
     */
    @Test
    public void valuesByShipYT1300()
    {
        // Setup.
        final Ship ship = Ship.YT_1300;

        // Run.
        final Pilot[] result = Pilot.valuesByShip(ship);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(4));
        assertThat(result[0].getShip(), is(ship));
        assertThat(result[0].getName(), is("Chewbacca"));
        assertThat(result[3].getShip(), is(ship));
        assertThat(result[3].getName(), is("Outer Rim Smuggler"));
    }

    /**
     * Test the <code>valuesByShip()</code> method.
     */
    @Test
    public void valuesByShipYWing()
    {
        // Setup.
        final Ship ship = Ship.Y_WING;

        // Run.
        final Pilot[] result = Pilot.valuesByShip(ship);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(4));
        assertThat(result[0].getShip(), is(ship));
        assertThat(result[0].getName(), is("\"Dutch\" Vander"));
        assertThat(result[3].getShip(), is(ship));
        assertThat(result[3].getName(), is("Horton Salm"));
    }

    /**
     * Test the <code>valuesByTeam()</code> method.
     */
    @Test
    public void valuesByTeamImperial()
    {
        // Setup.
        final SSTeam team = SSTeam.IMPERIAL;

        // Run.
        final Pilot[] result = Pilot.valuesByTeam(team);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(45));
        assertThat(result[0].getName(), is("Academy Pilot"));
        assertThat(result[44].getName(), is("\"Winged Gundark\""));
    }

    /**
     * Test the <code>valuesByTeam()</code> method.
     */
    @Test
    public void valuesByTeamRebel()
    {
        // Setup.
        final SSTeam team = SSTeam.REBEL;

        // Run.
        final Pilot[] result = Pilot.valuesByTeam(team);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(38));
        assertThat(result[0].getName(), is("Airen Cracken"));
        assertThat(result[37].getName(), is("Wes Janson"));
    }
}
