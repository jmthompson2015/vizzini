package org.vizzini.ai.neuralnetwork.format.io;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Writer;

import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkFormat;

/**
 * Provides input/output operations for a neural network.
 */
public final class NeuralNetworkIO implements IO<NeuralNetwork>
{
    /** Formatter. */
    private final NeuralNetworkFormat formatter;

    /**
     * Construct this object.
     * 
     * @param formatter Formatter.
     */
    @SuppressWarnings("hiding")
    public NeuralNetworkIO(final NeuralNetworkFormat formatter)
    {
        if (formatter == null)
        {
            throw new IllegalArgumentException("formatter is null");
        }

        this.formatter = formatter;
    }

    @Override
    public NeuralNetwork read(final InputStream inputStream)
    {
        if (inputStream == null)
        {
            throw new IllegalArgumentException("inputStream is null");
        }

        final Reader reader = new InputStreamReader(inputStream);

        return read(reader);
    }

    @Override
    public NeuralNetwork read(final Reader reader)
    {
        final String content = readContent(reader);

        return formatter.parse(content);
    }

    @Override
    public void write(final NeuralNetwork neuralNetwork, final Writer writer)
    {
        if (neuralNetwork == null)
        {
            throw new IllegalArgumentException("neuralNetwork is null");
        }

        if (writer == null)
        {
            throw new IllegalArgumentException("writer is null");
        }

        try
        {
            writer.write(formatter.format(neuralNetwork));
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            try
            {
                writer.flush();
            }
            catch (final IOException ignore)
            {
                // Nothing to do.
            }

            try
            {
                writer.close();
            }
            catch (final IOException ignore)
            {
                // Nothing to do.
            }
        }
    }

    /**
     * @param reader Reader.
     * 
     * @return the content of the given parameter.
     */
    private String readContent(final Reader reader)
    {
        if (reader == null)
        {
            throw new IllegalArgumentException("reader is null");
        }

        final BufferedReader myReader = new BufferedReader(reader);
        final StringBuilder sb = new StringBuilder();
        String line;

        try
        {
            while ((line = myReader.readLine()) != null)
            {
                sb.append(line).append("\n");
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        return sb.toString();
    }
}
