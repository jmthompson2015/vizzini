package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.Set;

/**
 * Defines methods required by a context in a genetic algorithm. The context provides the environment surrounding the
 * evaluation of a genome.
 */
public interface Context
{
    /**
     * @param name Variable name.
     * 
     * @return the variable with the given name.
     */
    Object getVariable(String name);

    /**
     * @return variable names.
     */
    Set<String> getVariableNames();

    /**
     * @param name Variable name.
     * @param value Value.
     * 
     * @return this object.
     */
    Context putVariable(String name, Object value);
}
