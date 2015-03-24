package org.vizzini.ai.robot;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides a launch application command implementation of an actuator. This implementation is specifically for
 * Macintosh OS X only.
 * 
 * @see java.lang.ProcessBuilder
 */
public final class MacLaunchAppActuator implements Actuator<String, String>
{
    /** Delegate. */
    private final CommandActuator delegate;

    /**
     * Construct this object.
     * 
     * @param name Name.
     */
    public MacLaunchAppActuator(final String name)
    {
        delegate = new CommandActuator(name);
    }

    @Override
    public String actuate(final String input)
    {
        if (StringUtils.isEmpty(input))
        {
            throw new IllegalArgumentException("input is null or empty");
        }

        final String[] command = { "open", "-a", input, };

        return delegate.actuate(command);
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }
}
