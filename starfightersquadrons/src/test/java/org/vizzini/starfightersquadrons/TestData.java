package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.Agent;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SimpleAgent;
import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SquadStatistics;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides test data.
 */
public final class TestData
{
    /** Start position. */
    public static final int IMPERIAL_START_Y = 21;

    /** Start position. */
    public static final int REBEL_START_Y = SSPosition.MAX_Y - 21;

    /** Center X. */
    public static final int CENTER_X = SSPosition.MAX_X / 2;

    /** Start position. */
    public static final SSPosition IMPERIAL_START_POSITION0 = new SSPosition(CENTER_X - 100, IMPERIAL_START_Y, 90);

    /** Start position. */
    public static final SSPosition IMPERIAL_START_POSITION1 = new SSPosition(CENTER_X + 100,
            IMPERIAL_START_Y + 20, 90);

    /** Start position. */
    public static final SSPosition REBEL_START_POSITION0 = new SSPosition(CENTER_X - 100, REBEL_START_Y, -90);

    /** Start position. */
    public static final SSPosition REBEL_START_POSITION1 = new SSPosition(CENTER_X + 100, REBEL_START_Y - 20, -90);

    /**
     * @param tokens Tokens.
     * @param ship Ship.
     * 
     * @return the first token which matches the given ship.
     */
    public static SSToken findShip(final List<SSToken> tokens, final Ship ship)
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

    /**
     * @return a new collection of agents.
     */
    public List<Agent> createAgents()
    {
        final List<Agent> agents = new ArrayList<Agent>();

        agents.add(createImperialAgent());
        agents.add(createRebelAgent());

        return agents;
    }

    /**
     * @return a new environment.
     */
    public SSEnvironment createEnvironment()
    {
        final SSEnvironment answer = new SSEnvironment();

        final List<Agent> agents = createAgents();
        answer.placeInitialTokens(agents);

        final Agent imperialAgent = answer.getImperialAgent();
        final Agent rebelAgent = answer.getRebelAgent();

        final SSToken imperialToken0 = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final SSToken imperialToken1 = new SSToken(Pilot.BOUNTY_HUNTER, imperialAgent);
        final SSToken rebelToken0 = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent);
        final SSToken rebelToken1 = new SSToken(Pilot.OUTER_RIM_SMUGGLER, rebelAgent);

        answer.placeToken(IMPERIAL_START_POSITION0, imperialToken0);
        answer.placeToken(IMPERIAL_START_POSITION1, imperialToken1);
        answer.placeToken(REBEL_START_POSITION0, rebelToken0);
        answer.placeToken(REBEL_START_POSITION1, rebelToken1);

        return answer;
    }

    /**
     * @return a new agent.
     */
    public SSAgent createImperialAgent()
    {
        return new SimpleAgent("Imperial", SSTeam.IMPERIAL, createSquadBuilderImperial());
    }

    /**
     * @return a new agent.
     */
    public SSAgent createRebelAgent()
    {
        return new SimpleAgent("Rebel", SSTeam.REBEL, createSquadBuilderRebel());
    }

    /**
     * @return a new squad builder.
     */
    public SquadBuilder createSquadBuilderImperial()
    {
        return new SquadBuilder()
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                // TIE Interceptors.
                answer.add(new SSToken(Pilot.CARNOR_JAX, agent));
                answer.add(new SSToken(Pilot.SOONTIR_FEL, agent));
                answer.add(new SSToken(Pilot.ALPHA_SQUADRON_PILOT, agent));

                // TIE Fighters.
                answer.add(new SSToken(Pilot.MAULER_MITHEL, agent));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));

                return answer;
            }

            @Override
            public String getDescription()
            {
                return "Waves 1&2 (TIE Fighters x2/Interceptors x3)";
            }

            @Override
            public SquadStatistics getSquadStatistics(final SSAgent agent)
            {
                return new SquadStatistics(buildSquad(agent));
            }

            @Override
            public SSTeam getTeam()
            {
                return SSTeam.IMPERIAL;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    public SquadBuilder createSquadBuilderRebel()
    {
        return new SquadBuilder()
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                // A-Wings.
                answer.add(new SSToken(Pilot.ARVEL_CRYNYD, agent));
                answer.add(new SSToken(Pilot.TYCHO_CELCHU, agent));

                // X-Wings.
                answer.add(new SSToken(Pilot.LUKE_SKYWALKER, agent));
                answer.add(new SSToken(Pilot.RED_SQUADRON_PILOT, agent));

                return answer;
            }

            @Override
            public String getDescription()
            {
                return "Waves 1&2 (A-Wings x2/X-Wings x2)";
            }

            @Override
            public SquadStatistics getSquadStatistics(final SSAgent agent)
            {
                return new SquadStatistics(buildSquad(agent));
            }

            @Override
            public SSTeam getTeam()
            {
                return SSTeam.REBEL;
            }
        };
    }
}
