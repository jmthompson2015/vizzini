package org.vizzini.example.boardgame.hexchess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>HexChessActionGenerator</code> class.
 */
public final class HexChessActionGeneratorTest
{
    /** Bishop to positions. */
    private static final List<HexChessPosition> BISHOP_TO_POSITIONS = Arrays.asList(new HexChessPosition[] {
            HexChessPosition.d2, HexChessPosition.b4, HexChessPosition.e4, HexChessPosition.h2, HexChessPosition.d5,
            HexChessPosition.g4, HexChessPosition.e7, HexChessPosition.h5, HexChessPosition.d8, HexChessPosition.g7,
            HexChessPosition.k4, HexChessPosition.h8, });

    /** Rook to positions. */
    private static final List<HexChessPosition> ROOK_TO_POSITIONS = Arrays
            .asList(new HexChessPosition[] { HexChessPosition.a1, HexChessPosition.f1, HexChessPosition.b2,
                    HexChessPosition.f2, HexChessPosition.c3, HexChessPosition.f3, HexChessPosition.d4,
                    HexChessPosition.f4, HexChessPosition.e5, HexChessPosition.f5, HexChessPosition.a6,
                    HexChessPosition.b6, HexChessPosition.c6, HexChessPosition.d6, HexChessPosition.e6,
                    HexChessPosition.g5, HexChessPosition.h4, HexChessPosition.i3, HexChessPosition.k2,
                    HexChessPosition.l1, HexChessPosition.f7, HexChessPosition.g6, HexChessPosition.f8,
                    HexChessPosition.h6, HexChessPosition.f9, HexChessPosition.i6, HexChessPosition.f10,
                    HexChessPosition.k6, HexChessPosition.f11, HexChessPosition.l6, });

    /**
     * Test the <code>generateActions()</code> method.
     */
    @Test
    public void generateActionsBishop()
    {
        // Setup.
        final HexChessEnvironment environment = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        environment.placeToken(fromPosition, HexChessToken.WHITE_BISHOP.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();
        final HexChessActionGenerator actionGenerator = new HexChessActionGenerator();

        // Run.
        final List<Action> result = actionGenerator.generateActions(environment, adjudicator, agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(12));
        verifyActionsBishop(result);
    }

    /**
     * Test the <code>generateActions()</code> method.
     */
    @Test
    public void generateActionsKing()
    {
        // Setup.
        final HexChessEnvironment environment = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        environment.placeToken(fromPosition, HexChessToken.WHITE_KING.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();
        final HexChessActionGenerator actionGenerator = new HexChessActionGenerator();

        // Run.
        final List<Action> result = actionGenerator.generateActions(environment, adjudicator, agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(12));
        verifyActionsKing(result);
    }

    /**
     * Test the <code>generateActions()</code> method.
     */
    @Test
    public void generateActionsKnight()
    {
        // Setup.
        final HexChessEnvironment environment = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        environment.placeToken(fromPosition, HexChessToken.WHITE_KNIGHT.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();
        final HexChessActionGenerator actionGenerator = new HexChessActionGenerator();

        // Run.
        final List<Action> result = actionGenerator.generateActions(environment, adjudicator, agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(12));
        verifyActionsKnight(result);
    }

    /**
     * Test the <code>generateActions()</code> method.
     */
    @Test
    public void generateActionsPerformance()
    {
        // Setup.
        final HexChessEnvironment environment = new HexChessEnvironment();
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(new DefaultAgent("White", "agent white", HexChessTeam.WHITE));
        agents.add(new DefaultAgent("Black", "agent black", HexChessTeam.BLACK));
        environment.placeInitialTokens(agents);
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();
        final HexChessActionGenerator actionGenerator = new HexChessActionGenerator();

        // Run / Verify.
        final long start = System.currentTimeMillis();

        actionGenerator.generateActions(environment, adjudicator, environment.getFirstAgent());

        final long end = System.currentTimeMillis();
        final long threshold = 15;
        System.out.println("HexChessActionGenerator generateActions() performance: " + (end - start) + " ms");
        assertTrue("generateActions() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>generateActions()</code> method.
     */
    @Test
    public void generateActionsQueen()
    {
        // Setup.
        final HexChessEnvironment environment = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        environment.placeToken(fromPosition, HexChessToken.WHITE_QUEEN.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();
        final HexChessActionGenerator actionGenerator = new HexChessActionGenerator();

        // Run.
        final List<Action> result = actionGenerator.generateActions(environment, adjudicator, agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(42));
        verifyActionsQueen(result);
    }

    /**
     * Test the <code>generateActions()</code> method.
     */
    @Test
    public void generateActionsRook()
    {
        // Setup.
        final HexChessEnvironment environment = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        environment.placeToken(fromPosition, HexChessToken.WHITE_ROOK.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();
        final HexChessActionGenerator actionGenerator = new HexChessActionGenerator();

        // Run.
        final List<Action> result = actionGenerator.generateActions(environment, adjudicator, agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(30));
        verifyActionsRook(result);
    }

    /**
     * @param actions Actions.
     */
    private void verifyActionsBishop(final List<Action> actions)
    {
        for (int i = 0; i < 12; i++)
        {
            final HexChessPosition position = BISHOP_TO_POSITIONS.get(i);
            assertThat(((HexChessAction)actions.get(i)).getToPosition(), is(position));
        }
    }

    /**
     * @param actions Actions.
     */
    private void verifyActionsKing(final List<Action> actions)
    {
        final HexChessPosition[] positions = { HexChessPosition.e4, HexChessPosition.d5, HexChessPosition.e5,
                HexChessPosition.f5, HexChessPosition.g4, HexChessPosition.e6, HexChessPosition.g5,
                HexChessPosition.e7, HexChessPosition.f7, HexChessPosition.g6, HexChessPosition.h5,
                HexChessPosition.g7, };

        for (int i = 0; i < 12; i++)
        {
            final HexChessPosition position0 = positions[i];
            assertThat(((HexChessAction)actions.get(i)).getToPosition(), is(position0));
        }
    }

    /**
     * @param actions Actions.
     */
    private void verifyActionsKnight(final List<Action> actions)
    {
        final HexChessPosition[] positions = { HexChessPosition.d3, HexChessPosition.e3, HexChessPosition.c4,
                HexChessPosition.g3, HexChessPosition.c5, HexChessPosition.h3, HexChessPosition.d7,
                HexChessPosition.i4, HexChessPosition.e8, HexChessPosition.i5, HexChessPosition.g8,
                HexChessPosition.h7, };

        for (int i = 0; i < 12; i++)
        {
            final HexChessPosition position0 = positions[i];
            assertThat(((HexChessAction)actions.get(i)).getToPosition(), is(position0));
        }
    }

    /**
     * @param actions Actions.
     */
    private void verifyActionsQueen(final List<Action> actions)
    {
        for (int i = 0; i < 30; i++)
        {
            final HexChessPosition position = ROOK_TO_POSITIONS.get(i);
            assertThat(String.valueOf(i), ((HexChessAction)actions.get(i)).getToPosition(), is(position));
        }

        for (int i = 0; i < 12; i++)
        {
            final HexChessPosition position = BISHOP_TO_POSITIONS.get(i);
            assertThat(String.valueOf(i), ((HexChessAction)actions.get(i + 30)).getToPosition(), is(position));
        }
    }

    /**
     * @param actions Actions.
     */
    private void verifyActionsRook(final List<Action> actions)
    {
        for (int i = 0; i < 30; i++)
        {
            final HexChessPosition position = ROOK_TO_POSITIONS.get(i);
            assertThat(((HexChessAction)actions.get(i)).getToPosition(), is(position));
        }
    }
}
