package org.vizzini.core;

import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.Writer;

/**
 * Provides utilities for a file.
 */
public final class FileUtilities
{
    /**
     * @param inputStream Input stream.
     */
    public void close(final InputStream inputStream)
    {
        if (inputStream != null)
        {
            try
            {
                inputStream.close();
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * @param reader Reader.
     */
    public void close(final Reader reader)
    {
        if (reader != null)
        {
            try
            {
                reader.close();
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * @param writer Writer.
     */
    public void close(final Writer writer)
    {
        if (writer != null)
        {
            try
            {
                writer.flush();
                writer.close();
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }
        }
    }
}
