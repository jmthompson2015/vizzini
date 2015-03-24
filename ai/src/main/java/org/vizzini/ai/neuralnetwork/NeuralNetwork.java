package org.vizzini.ai.neuralnetwork;

import java.util.List;

/**
 * Defines methods required by a neural network.
 */
public interface NeuralNetwork
{
    /**
     * Add the given connector.
     * 
     * @param connector Connector.
     * 
     * @return this object.
     */
    NeuralNetwork addConnector(Connector connector);

    /**
     * Add the given layer.
     * 
     * @param layer Layer.
     * 
     * @return this object.
     */
    NeuralNetwork addLayer(Layer layer);

    /**
     * @param fromLayer From layer.
     * 
     * @return a collection of connectors with the given from layer.
     */
    List<Connector> connectorsFromLayer(Layer fromLayer);

    /**
     * @param toLayer To layer.
     * 
     * @return a collection of connectors with the given to layer.
     */
    List<Connector> connectorsToLayer(Layer toLayer);

    /**
     * Apply the given inputs and return the output of the neural network.
     * 
     * @param inputs Inputs.
     * 
     * @return the output of the neural network.
     */
    double[] evaluate(double[] inputs);

    /**
     * Assign the given value to all weights of the neural network.
     * 
     * @param value Value.
     * 
     * @return this object.
     */
    NeuralNetwork fillWeights(double value);

    /**
     * @param index Index.
     * 
     * @return the connector at the given index.
     */
    Connector getConnector(int index);

    /**
     * @param fromLayerIndex From layer index.
     * @param toLayerIndex To layer index.
     * 
     * @return the connector for the given parameters.
     */
    Connector getConnector(int fromLayerIndex, int toLayerIndex);

    /**
     * @return the number of connectors.
     */
    int getConnectorCount();

    /**
     * @param index Index.
     * 
     * @return the layer at the given index.
     */
    Layer getLayer(int index);

    /**
     * @return the number of layers.
     */
    int getLayerCount();

    /**
     * @return the index of the output node with the maximum value.
     */
    int getMaxOutputValueIndex();

    /**
     * @param layer Layer index, where 0=input layer, and layerCount-1=output layer.
     * @param i Node index.
     * 
     * @return the node input value for the given parameters.
     */
    double getNodeInput(int layer, int i);

    /**
     * @param layer Layer index, where 0=input layer, and layerCount-1=output layer.
     * @param i Node index.
     * 
     * @return the node output value for the given parameters.
     */
    double getNodeOutput(int layer, int i);

    /**
     * @return the output layer index.
     */
    int getOutputLayerIndex();

    /**
     * @return the output layer node values.
     */
    double[] getOutputs();

    /**
     * @param fromLayer From layer index, where 0=input layer, and layerCount-1=output layer.
     * @param i From layer node index.
     * @param toLayer To layer index, where 0=input layer, and layerCount-1=output layer.
     * @param j To layer node index.
     * 
     * @return the weight for the given parameters.
     */
    double getWeight(int fromLayer, int i, int toLayer, int j);

    /**
     * @param fromLayer From layer index, where 0=input layer, and layerCount-1=output layer.
     * @param i From layer node index.
     * @param toLayer To layer index, where 0=input layer, and layerCount-1=output layer.
     * 
     * @return the weights for the given parameters.
     */
    double[] getWeights(int fromLayer, int i, int toLayer);

    /**
     * @param connector Connector.
     * 
     * @return the index of the given connector.
     */
    int indexOf(Connector connector);

    /**
     * @param layer Layer.
     * 
     * @return the index of the given layer.
     */
    int indexOf(Layer layer);

    /**
     * Assign random weights to the neural network.
     * 
     * @return this object.
     */
    NeuralNetwork randomizeWeights();

    /**
     * Assign random weights to the neural network.
     * 
     * @param range +/- Range of random weights around zero.
     * 
     * @return this object.
     */
    NeuralNetwork randomizeWeights(double range);

    /**
     * Assign zero weights to the neural network.
     * 
     * @return this object.
     */
    NeuralNetwork zeroWeights();
}
