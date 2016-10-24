package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

/**
 * Provides an enumeration of directions.
 */
public enum Direction
{
    /** Direction. */
    NORTH(0, -1),

    /** Direction. */
    EAST(1, 0),

    /** Direction. */
    SOUTH(0, 1),

    /** Direction. */
    WEST(-1, 0);

    /** Delta X. */
    private final int dx;

    /** Delta Y. */
    private final int dy;

    /**
     * Construct this object.
     * 
     * @param dx Delta X.
     * @param dy Delta Y.
     */
    @SuppressWarnings("hiding")
    private Direction(final int dx, final int dy)
    {
        this.dx = dx;
        this.dy = dy;
    }

    /**
     * @return the dx
     */
    public int getDx()
    {
        return dx;
    }

    /**
     * @return the dy
     */
    public int getDy()
    {
        return dy;
    }

    /**
     * @return the left
     */
    public Direction left()
    {
        Direction answer = null;

        switch (this)
        {
        case NORTH:
            answer = Direction.WEST;
            break;
        case EAST:
            answer = Direction.NORTH;
            break;
        case SOUTH:
            answer = Direction.EAST;
            break;
        case WEST:
            answer = Direction.SOUTH;
            break;
        }

        return answer;
    }

    /**
     * @return the right
     */
    public Direction right()
    {
        Direction answer = null;

        switch (this)
        {
        case NORTH:
            answer = Direction.EAST;
            break;
        case EAST:
            answer = Direction.SOUTH;
            break;
        case SOUTH:
            answer = Direction.WEST;
            break;
        case WEST:
            answer = Direction.NORTH;
            break;
        }

        return answer;
    }
}
