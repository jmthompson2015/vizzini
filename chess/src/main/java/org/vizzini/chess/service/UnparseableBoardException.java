package org.vizzini.chess.service;

/**
 * Provides a runtime exception for an unparseable board condition.
 */
public final class UnparseableBoardException extends RuntimeException
{
    /**
     * Constructs a new runtime exception with null as its detail message. The cause is not initialized, and may
     * subsequently be initialized by a call to Throwable.initCause(java.lang.Throwable).
     */
    public UnparseableBoardException()
    {
        super();
    }

    /**
     * Constructs a new runtime exception with the specified detail message. The cause is not initialized, and may
     * subsequently be initialized by a call to Throwable.initCause(java.lang.Throwable).
     * 
     * @param message the detail message. The detail message is saved for later retrieval by the Throwable.getMessage()
     *            method.
     */
    public UnparseableBoardException(final String message)
    {
        super(message);
    }
}
