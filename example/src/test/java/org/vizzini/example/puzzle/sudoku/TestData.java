package org.vizzini.example.puzzle.sudoku;

import java.util.Collections;
import java.util.List;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides test data for Sudoku.
 */
public class TestData
{
    /** Formatter. */
    private final SudokuFormat formatter = new SudokuFormat();

    /**
     * @return a new agent.
     */
    public Agent createAgent()
    {
        return new DefaultAgent("Puzzler", "A Sudoku agent.", SudokuTeam.TEAM);
    }

    /**
     * @return a new collection of agents.
     */
    public List<Agent> createAgents()
    {
        final Agent agent = createAgent();

        return Collections.singletonList(agent);
    }

    /**
     * @return a new environment.
     */
    public SudokuEnvironment createEnvironmentComplete()
    {
        final SudokuEnvironment answer = new SudokuEnvironment();

        final List<Agent> agents = createAgents();
        answer.placeInitialTokens(agents);

        // for(SudokuPosition position:SudokuPosition.values())
        for (int j = 0; j < SudokuPosition.MAX_Y; j++)
        {
            final int yOffset = j / 3;

            for (int i = 0; i < SudokuPosition.MAX_X; i++)
            {
                final SudokuPosition position = SudokuPosition.findByCoordinates(i, j);
                int xOffset = 3 * (j % 3);

                if ((xOffset + i + yOffset) > 8)
                {
                    xOffset -= 9;
                }

                final SudokuToken token = SudokuToken.findByName(String.valueOf(xOffset + i + 1 + yOffset));
                answer.placeToken(position, token);
            }
        }

        // System.out.println("TestData.createEnvironmentComplete():\n" + answer);

        return answer;
    }

    /**
     * From Sudoku To Go, Volume 12, 2008. Puzzle 1.
     * 
     * @return a new environment.
     */
    public SudokuEnvironment createEnvironmentEasy()
    {
        final String source = "" // Puzzle
                + " ,  , 6,  ,  , 8,  , 7, 4,\n" // 0
                + " ,  , 5,  ,  ,  , 1,  , 9,\n" // 1
                + "9,  , 7, 4,  , 1, 6,  , 5,\n" // 2
                + " , 3,  , 1,  ,  ,  , 4, 6,\n" // 3
                + " ,  ,  ,  ,  ,  ,  ,  ,  ,\n" // 4
                + "1, 6,  ,  ,  , 9,  , 2,  ,\n" // 5
                + "2,  , 3, 6,  , 5, 4,  , 8,\n" // 6
                + "7,  , 4,  ,  ,  , 9,  ,  ,\n" // 7
                + "6, 8,  , 9,  ,  , 3,  ,  ,\n" // 8
        ;

        final SudokuEnvironment answer = formatter.parse(source);

        final List<Agent> agents = createAgents();
        answer.placeInitialTokens(agents);

        return answer;
    }

    /**
     * From Sudoku To Go, Volume 12, 2008. Puzzle 1.
     * 
     * @return a new environment.
     */
    public SudokuEnvironment createEnvironmentEasy0()
    {
        final SudokuEnvironment answer = new SudokuEnvironment();

        final List<Agent> agents = createAgents();
        answer.placeInitialTokens(agents);

        // Block 0.
        answer.placeToken(SudokuPosition.a1, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.a2, SudokuToken.SEVEN);
        answer.placeToken(SudokuPosition.a3, SudokuToken.TWO);
        answer.placeToken(SudokuPosition.b1, SudokuToken.EIGHT);
        answer.placeToken(SudokuPosition.c2, SudokuToken.FOUR);
        answer.placeToken(SudokuPosition.c3, SudokuToken.THREE);

        // Block 1.
        answer.placeToken(SudokuPosition.d1, SudokuToken.NINE);
        answer.placeToken(SudokuPosition.d3, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.f3, SudokuToken.FIVE);

        // Block 2.
        answer.placeToken(SudokuPosition.g1, SudokuToken.THREE);
        answer.placeToken(SudokuPosition.g2, SudokuToken.NINE);
        answer.placeToken(SudokuPosition.g3, SudokuToken.FOUR);
        answer.placeToken(SudokuPosition.i3, SudokuToken.EIGHT);

        // Block 3.
        answer.placeToken(SudokuPosition.a4, SudokuToken.ONE);
        answer.placeToken(SudokuPosition.b4, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.b6, SudokuToken.THREE);

        // Block 4.
        answer.placeToken(SudokuPosition.d6, SudokuToken.ONE);
        answer.placeToken(SudokuPosition.f4, SudokuToken.NINE);

        // Block 5.
        answer.placeToken(SudokuPosition.h4, SudokuToken.TWO);
        answer.placeToken(SudokuPosition.h6, SudokuToken.FOUR);
        answer.placeToken(SudokuPosition.i6, SudokuToken.SIX);

        // Block 6.
        answer.placeToken(SudokuPosition.a7, SudokuToken.NINE);
        answer.placeToken(SudokuPosition.c7, SudokuToken.SEVEN);
        answer.placeToken(SudokuPosition.c8, SudokuToken.FIVE);
        answer.placeToken(SudokuPosition.c9, SudokuToken.SIX);

        // Block 7.
        answer.placeToken(SudokuPosition.d7, SudokuToken.FOUR);
        answer.placeToken(SudokuPosition.f7, SudokuToken.ONE);
        answer.placeToken(SudokuPosition.f9, SudokuToken.EIGHT);

        // Block 8.
        answer.placeToken(SudokuPosition.g7, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.g8, SudokuToken.ONE);
        answer.placeToken(SudokuPosition.h9, SudokuToken.SEVEN);
        answer.placeToken(SudokuPosition.i7, SudokuToken.FIVE);
        answer.placeToken(SudokuPosition.i8, SudokuToken.NINE);
        answer.placeToken(SudokuPosition.i9, SudokuToken.FOUR);

        // System.out.println("TestData.createEnvironmentEasy():\n" + answer);
        final String result = formatter.format(answer);
        System.out.println("Easy:\n" + result);

        return answer;
    }

    /**
     * From Sudoku To Go, Volume 12, 2008. Puzzle 66.
     * 
     * @return a new environment.
     */
    public SudokuEnvironment createEnvironmentHard()
    {
        final String source = "" // Puzzle
                + " , 8, 7, 6, 2,  ,  ,  , 5,\n" // 0
                + " ,  ,  , 3, 1,  ,  ,  ,  ,\n" // 1
                + " ,  , 6,  ,  , 7,  ,  ,  ,\n" // 2
                + "7, 1,  ,  ,  ,  , 5,  , 8,\n" // 3
                + " , 6,  ,  ,  ,  ,  , 7,  ,\n" // 4
                + "8,  , 4,  ,  ,  ,  , 1, 3,\n" // 5
                + " ,  ,  , 7,  ,  , 3,  ,  ,\n" // 6
                + " ,  ,  ,  , 9, 3,  ,  ,  ,\n" // 7
                + "5,  ,  ,  , 8, 6, 9, 2,  ,\n" // 8
        ;

        final SudokuEnvironment answer = formatter.parse(source);

        final List<Agent> agents = createAgents();
        answer.placeInitialTokens(agents);

        return answer;
    }

    /**
     * From Sudoku To Go, Volume 12, 2008. Puzzle 66.
     * 
     * @return a new environment.
     */
    public SudokuEnvironment createEnvironmentHard0()
    {
        final SudokuEnvironment answer = new SudokuEnvironment();

        final List<Agent> agents = createAgents();
        answer.placeInitialTokens(agents);

        // Block 0.
        answer.placeToken(SudokuPosition.a1, SudokuToken.FIVE);

        // Block 1.
        answer.placeToken(SudokuPosition.d3, SudokuToken.SEVEN);
        answer.placeToken(SudokuPosition.e1, SudokuToken.EIGHT);
        answer.placeToken(SudokuPosition.e2, SudokuToken.NINE);
        answer.placeToken(SudokuPosition.f1, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.f2, SudokuToken.THREE);

        // Block 2.
        answer.placeToken(SudokuPosition.g1, SudokuToken.NINE);
        answer.placeToken(SudokuPosition.g3, SudokuToken.THREE);
        answer.placeToken(SudokuPosition.h1, SudokuToken.TWO);

        // Block 3.
        answer.placeToken(SudokuPosition.a4, SudokuToken.EIGHT);
        answer.placeToken(SudokuPosition.a6, SudokuToken.SEVEN);
        answer.placeToken(SudokuPosition.b5, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.b6, SudokuToken.ONE);
        answer.placeToken(SudokuPosition.c4, SudokuToken.FOUR);

        // Block 4.

        // Block 5.
        answer.placeToken(SudokuPosition.g6, SudokuToken.FIVE);
        answer.placeToken(SudokuPosition.h4, SudokuToken.ONE);
        answer.placeToken(SudokuPosition.h5, SudokuToken.SEVEN);
        answer.placeToken(SudokuPosition.i4, SudokuToken.THREE);
        answer.placeToken(SudokuPosition.i6, SudokuToken.EIGHT);

        // Block 6.
        answer.placeToken(SudokuPosition.b9, SudokuToken.EIGHT);
        answer.placeToken(SudokuPosition.c7, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.c9, SudokuToken.SEVEN);

        // Block 7.
        answer.placeToken(SudokuPosition.d8, SudokuToken.THREE);
        answer.placeToken(SudokuPosition.d9, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.e8, SudokuToken.ONE);
        answer.placeToken(SudokuPosition.e9, SudokuToken.TWO);
        answer.placeToken(SudokuPosition.f7, SudokuToken.SEVEN);

        // Block 8.
        answer.placeToken(SudokuPosition.i9, SudokuToken.FIVE);

        // System.out.println("TestData.createEnvironmentHard():\n" + answer);
        final String result = formatter.format(answer);
        System.out.println("Hard:\n" + result);

        return answer;
    }

    /**
     * From Sudoku To Go, Volume 12, 2008. Puzzle 31.
     * 
     * @return a new environment.
     */
    public SudokuEnvironment createEnvironmentMedium()
    {
        final String source = "" // Puzzle
                + " ,  ,  ,  ,  ,  ,  , 8, 9,\n" // 0
                + "9,  ,  , 4, 8, 7,  ,  , 5,\n" // 1
                + " ,  ,  ,  ,  ,  , 3, 6,  ,\n" // 2
                + "5, 3,  ,  ,  , 9,  , 2,  ,\n" // 3
                + "1,  ,  , 2,  , 5,  ,  , 6,\n" // 4
                + " , 7,  , 6,  ,  ,  , 4, 3,\n" // 5
                + " , 2, 7,  ,  ,  ,  ,  ,  ,\n" // 6
                + "8,  ,  , 5, 6, 3,  ,  , 2,\n" // 7
                + "6, 1,  ,  ,  ,  ,  ,  ,  ,\n" // 8
        ;

        final SudokuEnvironment answer = formatter.parse(source);

        final List<Agent> agents = createAgents();
        answer.placeInitialTokens(agents);

        return answer;
    }

    /**
     * From Sudoku To Go, Volume 12, 2008. Puzzle 31.
     * 
     * @return a new environment.
     */
    public SudokuEnvironment createEnvironmentMedium0()
    {
        final SudokuEnvironment answer = new SudokuEnvironment();

        final List<Agent> agents = createAgents();
        answer.placeInitialTokens(agents);

        // Block 0.
        answer.placeToken(SudokuPosition.a1, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.a2, SudokuToken.EIGHT);
        answer.placeToken(SudokuPosition.b1, SudokuToken.ONE);
        answer.placeToken(SudokuPosition.b3, SudokuToken.TWO);
        answer.placeToken(SudokuPosition.c3, SudokuToken.SEVEN);

        // Block 1.
        answer.placeToken(SudokuPosition.d2, SudokuToken.FIVE);
        answer.placeToken(SudokuPosition.e2, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.f2, SudokuToken.THREE);

        // Block 2.
        answer.placeToken(SudokuPosition.i2, SudokuToken.TWO);

        // Block 3.
        answer.placeToken(SudokuPosition.a5, SudokuToken.ONE);
        answer.placeToken(SudokuPosition.a6, SudokuToken.FIVE);
        answer.placeToken(SudokuPosition.b4, SudokuToken.SEVEN);
        answer.placeToken(SudokuPosition.b6, SudokuToken.THREE);

        // Block 4.
        answer.placeToken(SudokuPosition.d4, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.d5, SudokuToken.TWO);
        answer.placeToken(SudokuPosition.f5, SudokuToken.FIVE);
        answer.placeToken(SudokuPosition.f6, SudokuToken.NINE);

        // Block 5.
        answer.placeToken(SudokuPosition.h4, SudokuToken.FOUR);
        answer.placeToken(SudokuPosition.h6, SudokuToken.TWO);
        answer.placeToken(SudokuPosition.i4, SudokuToken.THREE);
        answer.placeToken(SudokuPosition.i5, SudokuToken.SIX);

        // Block 6.
        answer.placeToken(SudokuPosition.a8, SudokuToken.NINE);

        // Block 7.
        answer.placeToken(SudokuPosition.d8, SudokuToken.FOUR);
        answer.placeToken(SudokuPosition.e8, SudokuToken.EIGHT);
        answer.placeToken(SudokuPosition.f8, SudokuToken.SEVEN);

        // Block 8.
        answer.placeToken(SudokuPosition.g7, SudokuToken.THREE);
        answer.placeToken(SudokuPosition.h7, SudokuToken.SIX);
        answer.placeToken(SudokuPosition.h9, SudokuToken.EIGHT);
        answer.placeToken(SudokuPosition.i8, SudokuToken.FIVE);
        answer.placeToken(SudokuPosition.i9, SudokuToken.NINE);

        System.out.println("TestData.createEnvironmentMedium():\n" + answer);

        return answer;
    }
}
