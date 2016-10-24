package org.vizzini.starfightersquadrons.swingui;

import java.util.ArrayList;
import java.util.List;

import javax.swing.JFrame;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Team;
import org.vizzini.starfightersquadrons.SimpleAgent;
import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSTeam;

/**
 * Provides a factory to create an Starfighter Squadrons.
 */
public final class SSAgentFactory
{
    /**
     * @param agentType Agent type.
     * @param name Agent name.
     * @param team Team.
     * @param parentComponent Parent component.
     * @param squadBuilder Squad builder.
     *
     * @return a new agent.
     */
    public SSAgent create(final Class<?> agentType, final String name, final Team team,
            final JFrame parentComponent, final SquadBuilder squadBuilder)
    {
        InputValidator.validateNotNull("agentType", agentType);
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("team", team);
        InputValidator.validateNotNull("squadBuilder", squadBuilder);

        String agentName = name;

        if (StringUtils.isEmpty(name))
        {
            agentName = team.getName();
        }

        SSAgent answer = null;

        if (agentType == HumanAgent.class)
        {
            answer = new HumanAgent(agentName, (SSTeam)team, parentComponent);
        }
        else if (agentType == SimpleAgent.class)
        {
            answer = new SimpleAgent(agentName, (SSTeam)team, squadBuilder);
        }
        else
        {
            throw new RuntimeException("Unknown agent type: " + agentType);
        }

        return answer;
    }

    /**
     * @return agent types.
     */
    public List<Class<?>> getAgentTypes()
    {
        final List<Class<?>> answer = new ArrayList<Class<?>>();

        answer.add(SimpleAgent.class);
        answer.add(HumanAgent.class);

        return answer;
    }

    /**
     * @return the selected index.
     */
    public int getFirstSelectedIndex()
    {
        return 0;
    }

    /**
     * @return the team.
     */
    public SSTeam getFirstTeam()
    {
        return SSTeam.IMPERIAL;
    }

    /**
     * @return the selected index.
     */
    public int getSecondSelectedIndex()
    {
        return 1;
    }

    /**
     * @return the team.
     */
    public SSTeam getSecondTeam()
    {
        return SSTeam.REBEL;
    }
}
