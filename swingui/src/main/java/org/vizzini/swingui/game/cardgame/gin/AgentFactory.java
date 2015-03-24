package org.vizzini.swingui.game.cardgame.gin;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.game.Agent;
import org.vizzini.example.cardgame.gin.GinTeam;
import org.vizzini.example.cardgame.gin.MediumAgent;
import org.vizzini.example.cardgame.gin.SimpleAgent;

/**
 * Provides a factory to create an agent.
 */
public final class AgentFactory
{
    /**
     * @param agentType Agent type.
     * @param team Team.
     * 
     * @return a new agent.
     */
    public Agent create(final Class<?> agentType, final GinTeam team)
    {
        return create(agentType, null, team);
    }

    /**
     * @param agentType Agent type.
     * @param name Agent name.
     * @param team Team.
     * 
     * @return a new agent.
     */
    public Agent create(final Class<?> agentType, final String name, final GinTeam team)
    {
        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        String agentName = name;

        if (StringUtils.isEmpty(name))
        {
            agentName = team.getName();
        }

        Agent answer = null;

        if (agentType == MediumAgent.class)
        {
            answer = new MediumAgent(agentName, team);
        }
        else if (agentType == MouseAgent.class)
        {
            answer = new MouseAgent(agentName, agentName, team);
        }
        else if (agentType == SimpleAgent.class)
        {
            answer = new SimpleAgent(agentName, team);
        }
        else
        {
            throw new RuntimeException("Unknown agent type: " + agentType);
        }

        return answer;
    }
}
