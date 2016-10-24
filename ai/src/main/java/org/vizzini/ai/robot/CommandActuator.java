package org.vizzini.ai.robot;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Provides a command implementation of an actuator. This implementation uses a ProcessBuilder.
 * 
 * @see java.lang.ProcessBuilder
 */
public final class CommandActuator implements Actuator<String[], String>
{
    /** Delegate. */
    private final DefaultActuator<String[], String> delegate;

    /**
     * Construct this object.
     * 
     * @param name Name.
     */
    public CommandActuator(final String name)
    {
        delegate = new DefaultActuator<String[], String>(name);
    }

    @Override
    public String actuate(final String[] input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        String answer = null;

        final ProcessBuilder builder = new ProcessBuilder(input);

        BufferedReader reader = null;

        try
        {
            final Process process = builder.start();

            reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            final StringBuilder sb = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null)
            {
                sb.append(line).append("\n");
            }

            process.waitFor();
            answer = sb.toString();
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        catch (final InterruptedException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
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

        return answer;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }
}
