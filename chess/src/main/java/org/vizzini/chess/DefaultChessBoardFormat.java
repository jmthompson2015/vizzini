package org.vizzini.chess;


/**
 * Provides a chess board formatter.
 */
public final class DefaultChessBoardFormat implements ChessBoardFormat
{
    /**
     * @param board Board.
     * 
     * @return a string representation of the given parameter.
     */
    @Override
    public String format(final ChessEnvironment board)
    {
        final StringBuilder sb = new StringBuilder();

        final Dimensions dimensions = board.getDimensions();
        final int fileCount = dimensions.getFileCount();
        final int rankCount = dimensions.getRankCount();
        final int levelCount = dimensions.getLevelCount();
        final boolean is3D = dimensions.is3D();

        for (int l = levelCount - 1; l >= 0; l--)
        {
            if (is3D)
            {
                sb.append("\nLevel ").append(getLevelName(l)).append("\n");
            }

            for (int r = rankCount - 1; r >= 0; r--)
            {
                sb.append(getRankName(r)).append(" ");

                for (int f = 0; f < fileCount; f++)
                {
                    final int index = dimensions.coordsToIndex(f, r, l);
                    sb.append(determineName(board, index));

                    if (f < (fileCount - 1))
                    {
                        sb.append(" | ");
                    }
                }

                sb.append("\n");
            }
        }

        sb.append("  ");

        for (int f = 0; f < fileCount; f++)
        {
            sb.append(getFileName(f));
            sb.append("   ");
        }

        return sb.toString();
    }

    @Override
    public ChessEnvironment parse(final String boardString)
    {
        throw new RuntimeException("Not implemented.");
    }

    /**
     * @param board Board.
     * @param index Index.
     * 
     * @return token name.
     */
    private String determineName(final ChessEnvironment board, final int index)
    {
        String answer = " ";
        final ChessToken token = board.getTokenAt(index);
        if (token != null)
        {
            final TokenType type = token.getType();

            final ChessTeam color = (ChessTeam)token.getTeam();
            String name = type.getSymbol();

            if (color == ChessTeam.BLACK)
            {
                name = name.toLowerCase();
            }

            answer = name;
        }

        return answer;
    }

    /**
     * @param file File.
     * 
     * @return file name.
     */
    private char getFileName(final int file)
    {
        return (char)('a' + file);
    }

    /**
     * @param level Level.
     * 
     * @return level name.
     */
    private char getLevelName(final int level)
    {
        return (char)('A' + level);
    }

    /**
     * @param rank Rank.
     * 
     * @return rank name.
     */
    private String getRankName(final int rank)
    {
        return String.valueOf(rank + 1);
    }
}
