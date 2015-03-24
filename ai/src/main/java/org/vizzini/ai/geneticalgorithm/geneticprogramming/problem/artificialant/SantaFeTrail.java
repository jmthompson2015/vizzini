package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import java.awt.Dimension;
import java.util.Arrays;

/**
 * Provides a grid for the artificial ant problem.
 */
public final class SantaFeTrail
{
    /** Dimensions. */
    public static final Dimension DIMENSION = new Dimension(32, 32);

    /** Enumeration indicating an empty cell. */
    private static final int EMPTY = 0;

    /** Enumeration indicating food in a cell. */
    private static final int FOOD = 1;

    /** Enumeration indicating a footprint in a cell. */
    private static final int FOOTPRINT = 2;

    /** Grid data. */
    private int[][] data;

    /** Initial food count. */
    private int initialFoodCount;

    /**
     * Construct this object.
     */
    public SantaFeTrail()
    {
        createSantaFeTrail();
    }

    /**
     * @return the amount of food consumed from the grid.
     */
    public int foodConsumed()
    {
        return initialFoodCount - count(FOOD);
    }

    /**
     * @return the amount of food on the grid.
     */
    public int foodCount()
    {
        return count(FOOD);
    }

    /**
     * @return initialFoodCount.
     */
    public int getInitialFoodCount()
    {
        return initialFoodCount;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return true if the cell at the given coordinates contains food.
     */
    public boolean isEmpty(final int x, final int y)
    {
        return isType(x, y, EMPTY);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return true if the cell at the given coordinates contains a footprint.
     */
    public boolean isFood(final int x, final int y)
    {
        return isType(x, y, FOOD);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return true if the cell at the given coordinates contains food.
     */
    public boolean isFootprint(final int x, final int y)
    {
        return isType(x, y, FOOTPRINT);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     */
    public void placeAnt(final int x, final int y)
    {
        data[x][y] = FOOTPRINT;
    }

    /**
     * @param type Type.
     * 
     * @return the amount of the given item is on the grid.
     */
    private int count(final int type)
    {
        int answer = 0;
        final int size = size();

        for (int i = 0; i < size; i++)
        {
            for (int j = 0; j < size; j++)
            {
                if (isType(i, j, type))
                {
                    answer++;
                }
            }
        }

        return answer;
    }

    /**
     * Create the grid representing the Santa Fe Trail for the artificial ant problem.
     */
    private void createSantaFeTrail()
    {
        data = new int[DIMENSION.width][DIMENSION.height];

        for (int i = 0; i < data.length; i++)
        {
            Arrays.fill(data[i], EMPTY);
        }

        // Place food.
        final int[][] coordinates = { { 1, 0 },
                { 2, 0 },
                { 3, 0 },
                { 3, 1 },
                { 3, 2 },
                { 3, 3 },
                { 3, 4 },
                { 3, 5 },
                { 4, 5 },
                { 5, 5 }, // 10
                { 6, 5 }, { 8, 5 },
                { 9, 5 },
                { 10, 5 },
                { 11, 5 },
                { 12, 5 },
                { 12, 6 },
                { 12, 7 },
                { 12, 8 },
                { 12, 9 }, // 20
                { 12, 11 }, { 12, 12 }, { 12, 13 },
                { 12, 14 },
                { 12, 17 },
                { 12, 18 },
                { 12, 19 },
                { 12, 20 },
                { 12, 21 },
                { 12, 22 }, // 30
                { 12, 23 }, { 11, 24 }, { 10, 24 }, { 9, 24 },
                { 8, 24 },
                { 7, 24 },
                { 4, 24 },
                { 3, 24 },
                { 1, 25 },
                { 1, 26 }, // 40
                { 1, 27 }, { 1, 28 }, { 2, 30 }, { 3, 30 }, { 4, 30 },
                { 5, 30 },
                { 7, 29 },
                { 7, 28 },
                { 8, 27 },
                { 9, 27 }, // 50
                { 10, 27 }, { 11, 27 }, { 12, 27 }, { 13, 27 }, { 14, 27 }, { 16, 26 },
                { 16, 25 },
                { 16, 24 },
                { 16, 21 },
                { 16, 20 }, // 60
                { 16, 19 }, { 16, 18 }, { 17, 15 }, { 20, 14 }, { 20, 13 }, { 20, 10 }, { 20, 9 },
                { 20, 8 },
                { 20, 7 },
                { 21, 5 }, // 70
                { 22, 5 }, { 24, 4 }, { 24, 3 }, { 25, 2 }, { 26, 2 }, { 27, 2 }, { 29, 3 }, { 29, 4 },
                { 29, 6 },
                { 29, 9 }, // 80
                { 29, 12 }, { 28, 14 }, { 27, 14 }, { 26, 14 }, { 23, 15 }, { 24, 18 }, { 27, 19 }, { 26, 22 },
                { 23, 23 }, // 89
        };

        for (int i = 0; i < coordinates.length; i++)
        {
            final int x = coordinates[i][0];
            final int y = coordinates[i][1];
            setFood(x, y);
        }

        initialFoodCount = foodCount();
        placeAnt(0, 0);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return true if the given coordinates are on the grid.
     */
    private boolean isOnGrid(final int x, final int y)
    {
        return (0 <= x) && (x < DIMENSION.width) && (0 <= y) && (y < DIMENSION.height);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param type Cell content type.
     * 
     * @return true if the cell at the given coordinates contains the given type.
     */
    private boolean isType(final int x, final int y, final int type)
    {
        boolean answer = false;

        if (isOnGrid(x, y))
        {
            answer = (data[x][y] == type);
        }

        return answer;
    }

    /**
     * Set food at the given coordinates.
     * 
     * @param x X coordinate.
     * @param y Y coordinate.
     */
    private void setFood(final int x, final int y)
    {
        data[x][y] = FOOD;
    }

    /**
     * @return the size of one side of the square grid.
     */
    private int size()
    {
        return data.length;
    }
}
