package org.vizzini.example.boardgame.tictactoe;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Provides a persistent agent memory for tic-tac-toe.
 */
public final class AgentMemory
{
    /** Memory filename. */
    private static final String MEMORY_FILENAME = "tttLearningAgent.txt";

    /** Map of board string to actions. */
    private final Map<String, List<PotentialAction>> _boardToActions = new HashMap<String, List<PotentialAction>>();

    /**
     * Construct this object with the given parameters.
     * 
     * @param environment Environment.
     */
    public AgentMemory(final TTTEnvironment environment)
    {
        readMemory(environment);
        printMemoryReport("initial memory: ");
    }

    /**
     * @param boardString Board string.
     * 
     * @return the actions for the given parameter.
     */
    public List<PotentialAction> get(final String boardString)
    {
        return _boardToActions.get(boardString);
    }

    /**
     * @param title Title.
     */
    public void printMemoryReport(final String title)
    {
        System.out.print(title);

        final int boardCount = _boardToActions.size();
        final int actionCount = computeActionCount();
        final double actionPerBoard = (double)actionCount / boardCount;

        System.out.println("board count = " + boardCount + " action count = " + actionCount + " action/board = "
                + actionPerBoard);
    }

    /**
     * @param boardString Board string.
     * @param actions Actions.
     */
    public void put(final String boardString, final List<PotentialAction> actions)
    {
        _boardToActions.put(boardString, actions);
    }

    /**
     * Write the memory to a file.
     */
    public void writeMemory()
    {
        final List<String> boards = new ArrayList<String>(_boardToActions.keySet());
        Collections.sort(boards);

        final File file = new File(MEMORY_FILENAME);
        FileWriter writer = null;

        try
        {
            writer = new FileWriter(file);

            for (final String boardString : boards)
            {
                final List<PotentialAction> actions = _boardToActions.get(boardString);

                for (final PotentialAction action : actions)
                {
                    writeAction(writer, boardString, action);
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            if (writer != null)
            {
                try
                {
                    writer.flush();
                    writer.close();
                }
                catch (final IOException ignore)
                {
                    // Nothing to do.
                }
            }
        }
    }

    /**
     * @return the total number of actions.
     */
    private int computeActionCount()
    {
        int answer = 0;

        for (final List<PotentialAction> actions : _boardToActions.values())
        {
            answer += actions.size();
        }

        return answer;
    }

    /**
     * @param environment Environment.
     */
    private void readMemory(final TTTEnvironment environment)
    {
        final File file = new File(MEMORY_FILENAME);
        FileReader fileReader = null;
        BufferedReader reader = null;

        try
        {
            fileReader = new FileReader(file);
            reader = new BufferedReader(fileReader);

            String line;

            while ((line = reader.readLine()) != null)
            {
                final String[] parts = line.split(",");
                final String boardString = parts[0];
                final int x = Integer.valueOf(parts[1]);
                final int y = Integer.valueOf(parts[2]);
                final int winCount = Integer.valueOf(parts[3]);
                final int lossCount = Integer.valueOf(parts[4]);
                final int drawCount = Integer.valueOf(parts[5]);

                System.out.println(boardString + " (" + x + ", " + y + ") " + winCount + "/" + lossCount + "/"
                        + drawCount);

                final TTTPosition toPosition = TTTPosition.findByCoordinates(x, y);
                final TTTToken token = TTTToken.X;
                final TTTAction tAction = new TTTAction(environment, toPosition, token);
                final PotentialAction action = new PotentialAction(tAction);

                for (int i = 0; i < winCount; i++)
                {
                    action.getStatistics().incrementWins();
                }

                for (int i = 0; i < lossCount; i++)
                {
                    action.getStatistics().incrementLosses();
                }

                for (int i = 0; i < drawCount; i++)
                {
                    action.getStatistics().incrementDraws();
                }

                List<PotentialAction> actions = _boardToActions.get(boardString);

                if (actions == null)
                {
                    actions = new ArrayList<PotentialAction>();
                    _boardToActions.put(boardString, actions);
                }

                actions.add(action);
            }
        }
        catch (final FileNotFoundException e)
        {
            System.err.println(e.getMessage());
        }
        catch (final IOException e)
        {
            System.err.println(e.getMessage());
        }
        finally
        {
            if (fileReader != null)
            {
                try
                {
                    fileReader.close();
                }
                catch (final IOException ignore)
                {
                    // Nothing to do.
                }
            }

            if (reader != null)
            {
                try
                {
                    reader.close();
                }
                catch (final IOException ignore)
                {
                    // Nothing to do.
                }
            }
        }
    }

    /**
     * @param writer Writer.
     * @param boardString Board string.
     * @param action Action.
     */
    private void writeAction(final Writer writer, final String boardString, final PotentialAction action)
    {
        try
        {
            writer.write(boardString);
            writer.write(",");
            writer.write(String.valueOf(action.getAction().getPosition().getX()));
            writer.write(",");
            writer.write(String.valueOf(action.getAction().getPosition().getY()));
            writer.write(",");
            writer.write(String.valueOf(action.getStatistics().getWinCount()));
            writer.write(",");
            writer.write(String.valueOf(action.getStatistics().getLossCount()));
            writer.write(",");
            writer.write(String.valueOf(action.getStatistics().getDrawCount()));
            writer.write("\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
