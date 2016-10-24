package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverAction;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.Maneuver.BarrelRollManeuver;
import org.vizzini.starfightersquadrons.Maneuver.BoostManeuver;
import org.vizzini.starfightersquadrons.Maneuver.StationaryManeuver;

/**
 * Provides tests for the <code>ManeuverAction</code> class.
 */
public final class ManeuverActionTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBankLeftOne0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.BANK_LEFT_1_EASY;
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() - 38));
        assertThat(result.getY(), is(fromPosition.getY() - 93));
        assertThat(result.getHeading(), is(225));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBankLeftThree0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.BANK_LEFT_3_STANDARD;
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() - 66));
        assertThat(result.getY(), is(fromPosition.getY() - 160));
        assertThat(result.getHeading(), is(225));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBankLeftTwo0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.BANK_LEFT_2_EASY;
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() - 51));
        assertThat(result.getY(), is(fromPosition.getY() - 124));
        assertThat(result.getHeading(), is(225));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBankRightOne0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.BANK_RIGHT_1_EASY;
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 38));
        assertThat(result.getY(), is(fromPosition.getY() - 93));
        assertThat(result.getHeading(), is(315));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBankRightOne90()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        SSPosition fromPosition = environment.getPositionFor(token);
        environment.removeToken(fromPosition);
        fromPosition = new SSPosition(fromPosition.getX(), fromPosition.getY() - 200, 90);
        environment.placeToken(fromPosition, token);

        final Maneuver maneuver = Maneuver.BANK_RIGHT_1_EASY;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() - 38));
        assertThat(result.getY(), is(fromPosition.getY() + 93));
        assertThat(result.getHeading(), is(135));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBankRightOneCollide()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.BANK_RIGHT_1_EASY;
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition.getX() + 58, fromPosition.getY() - 113, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 24));
        assertThat(result.getY(), is(fromPosition.getY() - 78));
        assertThat(result.getHeading(), is(313));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBankRightThree0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.BANK_RIGHT_3_STANDARD;
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 66));
        assertThat(result.getY(), is(fromPosition.getY() - 160));
        assertThat(result.getHeading(), is(315));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBankRightTwo0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.BANK_RIGHT_2_EASY;
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 51));
        assertThat(result.getY(), is(fromPosition.getY() - 124));
        assertThat(result.getHeading(), is(315));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBarrelRollLeft0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_LEFT_1;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() - 80));
        assertThat(result.getY(), is(fromPosition.getY()));
        assertThat(result.getHeading(), is(270));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBarrelRollLeft0Collide()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        {
            final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
            final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
            SSPosition position = environment.getPositionFor(imperialToken);
            environment.removeToken(position);
            position = new SSPosition(position.getX() - 60, fromPosition.getY(), position.getHeading());
            environment.placeToken(position, imperialToken);
        }

        final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_LEFT_1;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertThat(result, is(fromPosition));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBarrelRollRight0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_RIGHT_1;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 80));
        assertThat(result.getY(), is(fromPosition.getY()));
        assertThat(result.getHeading(), is(270));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBarrelRollRight0Collide()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        {
            final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
            final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
            SSPosition position = environment.getPositionFor(imperialToken);
            environment.removeToken(position);
            position = new SSPosition(position.getX() + 60, fromPosition.getY(), position.getHeading());
            environment.placeToken(position, imperialToken);
        }

        final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_RIGHT_1;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertThat(result, is(fromPosition));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBoostBankLeftOne0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        final Maneuver maneuver = BoostManeuver.BOOST_BANK_LEFT_1_STANDARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() - 38));
        assertThat(result.getY(), is(fromPosition.getY() - 93));
        assertThat(result.getHeading(), is(225));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBoostBankRightOne0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        final Maneuver maneuver = BoostManeuver.BOOST_BANK_RIGHT_1_STANDARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 38));
        assertThat(result.getY(), is(fromPosition.getY() - 93));
        assertThat(result.getHeading(), is(315));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBoostStraightOne0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        final Maneuver maneuver = BoostManeuver.BOOST_STRAIGHT_1_STANDARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 0));
        assertThat(result.getY(), is(fromPosition.getY() - 80));
        assertThat(result.getHeading(), is(270));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItBoostStraightOne0Collide()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        {
            final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
            final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
            SSPosition position = environment.getPositionFor(imperialToken);
            environment.removeToken(position);
            position = new SSPosition(position.getX(), fromPosition.getY() - 60, position.getHeading());
            environment.placeToken(position, imperialToken);
        }

        final Maneuver maneuver = BoostManeuver.BOOST_STRAIGHT_1_STANDARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 0));
        assertThat(result.getY(), is(fromPosition.getY() + 0));
        assertThat(result.getHeading(), is(270));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStationaryZero()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        final Maneuver maneuver = StationaryManeuver.STATIONARY_0_HARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 0));
        assertThat(result.getY(), is(fromPosition.getY() - 0));
        assertThat(result.getHeading(), is(270));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightFive0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        SSPosition fromPosition = environment.getPositionFor(token);
        environment.removeToken(fromPosition);
        fromPosition = new SSPosition(fromPosition.getX(), fromPosition.getY() - 100, 0);
        environment.placeToken(fromPosition, token);

        final Maneuver maneuver = Maneuver.STRAIGHT_5_STANDARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 240));
        assertThat(result.getY(), is(fromPosition.getY()));
        assertThat(result.getHeading(), is(0));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightFive0ShipFled()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        SSPosition fromPosition = environment.getPositionFor(token);
        environment.removeToken(fromPosition);
        fromPosition = new SSPosition(fromPosition.getX(), fromPosition.getY(), 90);
        environment.placeToken(fromPosition, token);

        final Maneuver maneuver = Maneuver.STRAIGHT_5_STANDARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNull(result);
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightFive30()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        SSPosition fromPosition = environment.getPositionFor(token);
        environment.removeToken(fromPosition);
        fromPosition = new SSPosition(fromPosition.getX(), fromPosition.getY(), -30);
        environment.placeToken(fromPosition, token);

        final Maneuver maneuver = Maneuver.STRAIGHT_5_STANDARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 208));
        assertThat(result.getY(), is(fromPosition.getY() - 120));
        assertThat(result.getHeading(), is(330));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightFiveCollide()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.STRAIGHT_5_STANDARD;
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition.getX(), fromPosition.getY() - 260, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 0));
        assertThat(result.getY(), is(fromPosition.getY() - 220));
        assertThat(result.getHeading(), is(270));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightFour30()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        SSPosition fromPosition = environment.getPositionFor(token);
        environment.removeToken(fromPosition);
        fromPosition = new SSPosition(fromPosition.getX(), fromPosition.getY(), -30);
        environment.placeToken(fromPosition, token);

        final Maneuver maneuver = Maneuver.STRAIGHT_4_STANDARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 173));
        assertThat(result.getY(), is(fromPosition.getY() - 100));
        assertThat(result.getHeading(), is(330));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightOne30()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        SSPosition fromPosition = environment.getPositionFor(token);
        environment.removeToken(fromPosition);
        fromPosition = new SSPosition((915 / 2) - 100, 915 - 21, -30);
        environment.placeToken(fromPosition, token);

        final Maneuver maneuver = Maneuver.STRAIGHT_1_EASY;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 69));
        assertThat(result.getY(), is(fromPosition.getY() - 40));
        assertThat(result.getHeading(), is(330));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightThree30()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        SSPosition fromPosition = environment.getPositionFor(token);
        environment.removeToken(fromPosition);
        fromPosition = new SSPosition(fromPosition.getX(), fromPosition.getY(), -30);
        environment.placeToken(fromPosition, token);

        final Maneuver maneuver = Maneuver.STRAIGHT_3_STANDARD;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 139));
        assertThat(result.getY(), is(fromPosition.getY() - 80));
        assertThat(result.getHeading(), is(330));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightTwo30()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Adjust the ship position.
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        SSPosition fromPosition = environment.getPositionFor(token);
        environment.removeToken(fromPosition);
        fromPosition = new SSPosition(fromPosition.getX(), fromPosition.getY(), -30);
        environment.placeToken(fromPosition, token);

        final Maneuver maneuver = Maneuver.STRAIGHT_2_EASY;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 104));
        assertThat(result.getY(), is(fromPosition.getY() - 60));
        assertThat(result.getHeading(), is(330));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightTwoCollide()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.STRAIGHT_2_EASY;
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition.getX(), fromPosition.getY() - 40, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Move imperial in front of rebel.
        final SSToken imperialToken2 = findShip(imperialTokens, Ship.FIRESPRAY_31);
        SSPosition imperialPosition2 = environment.getPositionFor(imperialToken2);
        environment.removeToken(imperialPosition2);
        imperialPosition2 = new SSPosition(fromPosition.getX(), fromPosition.getY() - 140, 90);
        environment.placeToken(imperialPosition2, imperialToken2);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 0));
        assertThat(result.getY(), is(fromPosition.getY() - 0));
        assertThat(result.getHeading(), is(270));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItStraightTwoCollideOverlap()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.STRAIGHT_2_EASY;
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition.getX(), fromPosition.getY() - 38, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Move imperial in front of rebel.
        final SSToken imperialToken2 = findShip(imperialTokens, Ship.FIRESPRAY_31);
        SSPosition imperialPosition2 = environment.getPositionFor(imperialToken2);
        environment.removeToken(imperialPosition2);
        imperialPosition2 = new SSPosition(fromPosition.getX(), fromPosition.getY() - 140, 90);
        environment.placeToken(imperialPosition2, imperialToken2);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 0));
        assertThat(result.getY(), is(fromPosition.getY() - 0));
        assertThat(result.getHeading(), is(270));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItTurnRightOne0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.TURN_RIGHT_1_STANDARD;
        final List<SSToken> tokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(tokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 54));
        assertThat(result.getY(), is(fromPosition.getY() - 54));
        assertThat(result.getHeading(), is(0));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItTurnRightOneCollide()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Maneuver maneuver = Maneuver.TURN_RIGHT_1_STANDARD;
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition.getX() + 54, fromPosition.getY() - 74, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        action.doIt();

        // Verify.
        final SSPosition result = environment.getPositionFor(token);
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 15));
        assertThat(result.getY(), is(fromPosition.getY() - 48));
        assertThat(result.getHeading(), is(323));
    }

    /**
     * @param tokens Tokens.
     * @param ship Ship.
     * 
     * @return the first token which matches the given ship.
     */
    private SSToken findShip(final List<SSToken> tokens, final Ship ship)
    {
        SSToken token = null;

        for (final SSToken t : tokens)
        {
            if (t.getShip() == ship)
            {
                token = t;
                break;
            }
        }

        return token;
    }
}
