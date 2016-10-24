package org.vizzini.core.game;

/**
 * Defines methods required by an action.
 */
public interface Action
{
    /**
     * Perform the command encapsulated by this object.
     * 
     * @return true if successful and can be undone.
     */
    boolean doIt();

    /**
     * @return agent
     */
    Agent getAgent();

    /**
     * @return environment
     */
    Environment getEnvironment();

    /**
     * Undo the last invocation of doIt().
     * 
     * @return true if the undo was successful.
     */
    boolean undoIt();
}
