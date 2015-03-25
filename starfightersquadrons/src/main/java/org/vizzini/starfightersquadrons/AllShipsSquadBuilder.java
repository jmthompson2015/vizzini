package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Agent;

/**
 * Provides a squad builder which creates one of each ship with the lowest skill pilot.
 */
public final class AllShipsSquadBuilder extends DefaultSquadBuilder
{
    /**
     * @return a new squad builder.
     */
    public static final SquadBuilder createImperial()
    {
        return new AllShipsSquadBuilder(SSTeam.IMPERIAL);
    }

    /**
     * @return a new squad builder.
     */
    public static final SquadBuilder createRebel()
    {
        return new AllShipsSquadBuilder(SSTeam.REBEL);
    }

    /**
     * Construct this object.
     * 
     * @param team Team.
     */
    private AllShipsSquadBuilder(final SSTeam team)
    {
        super("One Of Each Ship (lowest pilot skill)", team);
    }

    @Override
    public List<SSToken> buildSquad(final SSAgent agent)
    {
        InputValidator.validateNotNull("agent", agent);

        if (!getTeam().equals(agent.getTeam()))
        {
            throw new IllegalArgumentException("Agent does not belong to team: " + agent + " " + getTeam());
        }

        final Pilot[] pilots0 = Pilot.valuesByTeam(getTeam());
        final List<Pilot> pilots = createLowestPilotSkillPerShipList(pilots0);

        final List<SSToken> answer = createTokens(agent, pilots);

        return answer;
    }

    /**
     * @param pilots Pilots.
     * 
     * @return a map of each ship to the lowest pilot skill pilot.
     */
    private List<Pilot> createLowestPilotSkillPerShipList(final Pilot[] pilots)
    {
        final Map<Ship, Pilot> shipToPilot = new TreeMap<Ship, Pilot>();

        for (final Pilot pilot : pilots)
        {
            final Ship ship = pilot.getShip();
            final Pilot p = shipToPilot.get(ship);

            if (p == null)
            {
                shipToPilot.put(ship, pilot);
            }
            else if (pilot.getPilotSkillValue() < p.getPilotSkillValue())
            {
                shipToPilot.put(ship, pilot);
            }
        }

        final List<Pilot> answer = new ArrayList<Pilot>();

        for (final Ship ship : shipToPilot.keySet())
        {
            answer.add(shipToPilot.get(ship));
        }

        return answer;
    }

    /**
     * @param pilots Pilots.
     * @param agent Agent.
     * 
     * @return a list of new tokens.
     */
    private List<SSToken> createTokens(final Agent agent, final List<Pilot> pilots)
    {
        final List<SSToken> answer = new ArrayList<SSToken>();

        for (final Pilot pilot : pilots)
        {
            final SSToken token = new SSToken(pilot, agent);
            answer.add(token);
        }

        return answer;
    }
}
