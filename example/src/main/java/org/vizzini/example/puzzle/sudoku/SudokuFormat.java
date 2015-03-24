package org.vizzini.example.puzzle.sudoku;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;

import org.vizzini.core.FileUtilities;
import org.vizzini.core.Format;

/**
 * Provides a formatter for a Sudoku environment.
 */
public class SudokuFormat implements Format<SudokuEnvironment>
{
    @Override
    public String format(final SudokuEnvironment object)
    {
        final StringBuilder sb = new StringBuilder();

        for (int rank = SudokuPosition.MAX_Y - 1; rank >= 0; rank--)
        {
            for (int file = 0; file < SudokuPosition.MAX_X; file++)
            {
                final SudokuPosition position = SudokuPosition.findByCoordinates(file, rank);
                final SudokuToken token = object.getTokenAt(position);

                if (token != null)
                {
                    sb.append(token.getName());
                }
                else
                {
                    sb.append(" ");
                }

                sb.append(", ");
            }

            sb.append("\n");
        }

        return sb.toString();
    }

    @Override
    public SudokuEnvironment parse(final String source)
    {
        final SudokuEnvironment answer = new SudokuEnvironment();

        StringReader reader = null;
        BufferedReader myReader = null;

        try
        {
            reader = new StringReader(source);
            myReader = new BufferedReader(reader);
            String line;
            int rank = SudokuPosition.MAX_Y - 1;

            while (((line = myReader.readLine()) != null) && (rank >= 0))
            {
                final String[] parts = line.split("[,]");

                for (int file = 0; file < 9; file++)
                {
                    final SudokuToken token = SudokuToken.findByName(parts[file].trim());

                    if (token != null)
                    {
                        final SudokuPosition position = SudokuPosition.findByCoordinates(file, rank);
                        answer.placeToken(position, token);
                    }
                }

                rank--;
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(myReader);
            fileUtils.close(reader);
        }

        return answer;
    }
}
