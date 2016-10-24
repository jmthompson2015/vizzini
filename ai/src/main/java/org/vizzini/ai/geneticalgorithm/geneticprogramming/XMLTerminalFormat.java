package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.core.Format;
import org.vizzini.core.XMLFormat;

/**
 * Defines methods required by an XML formatter for a terminal.
 * 
 * @param <T> Type.
 */
public interface XMLTerminalFormat<T> extends Format<Terminal<T>>
{
    /**
     * @return the xmlFormatter
     */
    XMLFormat getXmlFormatter();
}
