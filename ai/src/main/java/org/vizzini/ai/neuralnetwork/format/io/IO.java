package org.vizzini.ai.neuralnetwork.format.io;

import java.io.InputStream;
import java.io.Reader;
import java.io.Writer;

/**
 * Defines methods required by input/output classes.
 * 
 * @param <T> Type.
 */
public interface IO<T>
{
    /**
     * @param inputStream Input stream.
     * 
     * @return a new object configured from the given parameter.
     */
    T read(final InputStream inputStream);

    /**
     * @param reader Reader.
     * 
     * @return a new object configured from the given parameter.
     */
    T read(final Reader reader);

    /**
     * @param object Object.
     * @param writer Writer.
     */
    void write(final T object, final Writer writer);
}
