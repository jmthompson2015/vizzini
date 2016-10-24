package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.List;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.example.boardgame.tictactoe.Statistics;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironment;
import org.vizzini.example.boardgame.tictactoe.TTTGameInjector;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;

/**
 * Provides a simulator for the tic-tac-toe problem.
 */
public final class Simulator
{
    /** Flag indicating whether to print verbose output. */
    private static final boolean IS_VERBOSE = false;

    /**
     * @param agentX Agent X.
     * @param statisticsX Statistics for agent X.
     * @param agentO Agent O.
     * @param statisticsO Statistics for agent O.
     */
    public void run(final Agent agentX, final Statistics statisticsX, final Agent agentO, final Statistics statisticsO)
    {
        if (agentX == null)
        {
            throw new IllegalArgumentException("agentX is null");
        }

        if (statisticsX == null)
        {
            throw new IllegalArgumentException("statisticsX is null");
        }

        if (agentO == null)
        {
            throw new IllegalArgumentException("agentO is null");
        }

        if (statisticsO == null)
        {
            throw new IllegalArgumentException("statisticsO is null");
        }

        final TTTGameInjector injector = new TTTGameInjector();
        final Game game = injector.injectGame();
        final List<Agent> agents = game.getAgents();

        agents.add(agentX);
        agents.add(agentO);

        final TTTEnvironment environment = (TTTEnvironment)game.getEnvironment();
        environment.placeInitialTokens(agents);
        if (IS_VERBOSE)
        {
            environment.addDoActionListener(new PropertyChangeListener()
            {
                @Override
                public void propertyChange(final PropertyChangeEvent event)
                {
                    System.out.println("Board change");
                    final TTTEnvironment myEnvironment = (TTTEnvironment)event.getSource();
                    System.out.println(myEnvironment);
                }
            });
        }

        final SynchronousEngine engine = (SynchronousEngine)game.getEngine();
        engine.addPropertyChangeListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                if (IS_VERBOSE)
                {
                    System.out.println("Game over");
                }

                if (SynchronousEngine.WINNER_PROPERTY.equals(event.getPropertyName()))
                {
                    final Agent winner = (Agent)event.getNewValue();
                    updateStatistics(winner, statisticsX, statisticsO);
                }
            }
        });

        game.start();
    }

    /**
     * @param winner Winner.
     * @param statisticsX Statistics for agent X.
     * @param statisticsO Statistics for agent O.
     */
    void updateStatistics(final Agent winner, final Statistics statisticsX, final Statistics statisticsO)
    {
        if (IS_VERBOSE)
        {
            System.out.println("updateStatistics() winner = " + winner);
        }

        if (winner == null)
        {
            statisticsX.incrementDraws();
            statisticsO.incrementDraws();
        }
        else
        {
            if (winner.getTeam() == TTTTeam.X)
            {
                statisticsX.incrementWins();
                statisticsO.incrementLosses();
            }
            else if (winner.getTeam() == TTTTeam.O)
            {
                statisticsX.incrementLosses();
                statisticsO.incrementWins();
            }
            else
            {
                throw new RuntimeException("Unknown winner team: " + winner.getTeam());
            }
        }

        if (IS_VERBOSE)
        {
            System.out.println("statisticsX = " + statisticsX);
            System.out.println("statisticsO = " + statisticsO);
        }
    }
}
