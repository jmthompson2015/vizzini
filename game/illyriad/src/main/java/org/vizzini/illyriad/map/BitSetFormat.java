package org.vizzini.illyriad.map;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.BitSet;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.Format;
import org.vizzini.illyriad.FileUtilities;

/**
 * Provides a formatter for a bit set.
 */
public final class BitSetFormat implements Format<BitSet>
{
    /** File utilities. */
    private final FileUtilities fileUtils = new FileUtilities();

    @Override
    public String format(final BitSet bitSet)
    {
        final StringBuilder sb = new StringBuilder();

        for (int bitIndex = bitSet.nextSetBit(0); bitIndex >= 0; bitIndex = bitSet.nextSetBit(bitIndex + 1))
        {
            sb.append(bitIndex).append("\n");
        }

        return sb.toString();
    }

    /**
     * @param reader Source reader.
     * 
     * @return a new, populated object.
     */
    public BitSet parse(final Reader reader)
    {
        if (reader == null)
        {
            throw new IllegalArgumentException("reader is null");
        }

        final BitSet answer = new BitSet();

        BufferedReader myReader = null;
        String line;

        try
        {
            myReader = new BufferedReader(reader);

            while ((line = myReader.readLine()) != null)
            {
                final int bitIndex = Integer.parseInt(line);
                answer.set(bitIndex);
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            fileUtils.close(myReader);
        }

        return answer;
    }

    @Override
    public BitSet parse(final String source)
    {
        if (StringUtils.isEmpty(source))
        {
            throw new IllegalArgumentException("source is null or empty");
        }

        return parse(new StringReader(source));
    }
}
