package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

/**
 * Provides a default implementation of a context.
 */
public final class DefaultContext implements Context
{
    /** Map of variable name to value. */
    private final Map<String, Object> nameToValue;

    /** Variable names. */
    private final Set<String> variableNames = new TreeSet<String>();

    /**
     * Construct this object.
     */
    public DefaultContext()
    {
        this.nameToValue = new TreeMap<String, Object>();
    }

    @Override
    public Object getVariable(final String name)
    {
        return nameToValue.get(name);
    }

    @Override
    public Set<String> getVariableNames()
    {
        return new TreeSet<String>(variableNames);
    }

    @Override
    public Context putVariable(final String name, final Object value)
    {
        nameToValue.put(name, value);
        variableNames.add(name);

        return this;
    }
}
