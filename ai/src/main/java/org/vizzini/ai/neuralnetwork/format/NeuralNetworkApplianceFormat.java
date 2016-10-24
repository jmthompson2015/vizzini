package org.vizzini.ai.neuralnetwork.format;

import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.core.Format;

/**
 * Defines methods required by a formatter for a neural network appliance.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public interface NeuralNetworkApplianceFormat<I, O> extends Format<NeuralNetworkAppliance<I, O>>
{
    // Nothing to do.
}
