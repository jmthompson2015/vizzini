package org.vizzini.example.boardgame.tictactoe;

/**
 * Provides statistics for tic-tac-toe.
 */
public final class Statistics
{
    /** Draw count. */
    private int drawCount = 0;

    /** Loss count. */
    private int lossCount = 0;

    /** Win count. */
    private int winCount = 0;

    /**
     * @return the drawCount
     */
    public int getDrawCount()
    {
        return drawCount;
    }

    /**
     * @return the lossCount
     */
    public int getLossCount()
    {
        return lossCount;
    }

    /**
     * @return the playCount
     */
    public int getPlayCount()
    {
        return winCount + drawCount + lossCount;
    }

    /**
     * @return the rating for this action.
     */
    public double getRating()
    {
        return (-1.0 * getLossCount()) / getPlayCount();
    }

    /**
     * @return the winCount
     */
    public int getWinCount()
    {
        return winCount;
    }

    /**
     * Increment the draw count.
     */
    public void incrementDraws()
    {
        drawCount++;
    }

    /**
     * Increment the loss count.
     */
    public void incrementLosses()
    {
        lossCount++;
    }

    /**
     * Increment the win count.
     */
    public void incrementWins()
    {
        winCount++;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getSimpleName());

        sb.append(" [");
        sb.append(getWinCount());
        sb.append("/");
        sb.append(getDrawCount());
        sb.append("/");
        sb.append(getLossCount());
        sb.append(" ");
        sb.append(getRating());
        sb.append("]");

        return sb.toString();
    }
}
