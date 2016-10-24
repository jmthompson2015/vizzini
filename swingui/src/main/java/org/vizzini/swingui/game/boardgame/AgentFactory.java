package org.vizzini.swingui.game.boardgame;

import java.util.List;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Team;

/**
 * Defines methods required by a factory to create an agent.
 */
public interface AgentFactory
{
    /**
     * @param agentType Agent type.
     * @param name Agent name.
     * @param team Team.
     * 
     * @return a new agent.
     */
    Agent create(final Class<?> agentType, final String name, final Team team);

    /**
     * @param agentType Agent type.
     * @param team Team.
     * 
     * @return a new agent.
     */
    Agent create(final Class<?> agentType, final Team team);

    /**
     * @return agent types.
     */
    List<Class<?>> getAgentTypes();

    /**
     * @return the selected index.
     */
    int getFirstSelectedIndex();

    /**
     * @return the team.
     */
    Team getFirstTeam();

    /**
     * @return the selected index.
     */
    int getSecondSelectedIndex();

    /**
     * @return the team.
     */
    Team getSecondTeam();
}
