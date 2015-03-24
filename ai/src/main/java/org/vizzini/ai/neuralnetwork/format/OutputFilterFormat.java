package org.vizzini.ai.neuralnetwork.format;

import org.vizzini.ai.neuralnetwork.OutputFilter;
import org.vizzini.core.Format;

/**
 * Defines methods required by a formatter for an input filter.
 * 
 * @param <O> Output type.
 */
public interface OutputFilterFormat<O> extends Format<OutputFilter<O>>
{
    // Nothing to do.
}
