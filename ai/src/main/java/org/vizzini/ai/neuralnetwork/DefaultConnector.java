package org.vizzini.ai.neuralnetwork;

import java.util.Arrays;

/**
 * Provides a connector between layers in a neural network.
 */
public final class DefaultConnector implements Connector
{
    /** From layer. */
    private Layer fromLayer;

    /** To layer. */
    private Layer toLayer;

    /** Weights. */
    private double[][] weights;

    /**
     * Construct this object with the given parameters.
     * 
     * @param fromLayer From layer.
     * @param toLayer To layer.
     */
    @SuppressWarnings("hiding")
    public DefaultConnector(final Layer fromLayer, final Layer toLayer)
    {
        setFromLayer(fromLayer);
        setToLayer(toLayer);

        final int fromCount = fromLayer.getNodeCount();
        final int toCount = toLayer.getNodeCount();
        weights = new double[fromCount][];

        for (int i = 0; i < fromCount; i++)
        {
            weights[i] = new double[toCount];
        }
    }

    @Override
    public Connector adjustWeights(final double[][] deltaWeights)
    {
        if (deltaWeights == null)
        {
            throw new IllegalArgumentException("deltaWeights == null");
        }

        for (int i = 0; i < weights.length; i++)
        {
            for (int j = 0; j < weights[i].length; j++)
            {
                if (!Double.isInfinite(deltaWeights[i][j]) && !Double.isNaN(deltaWeights[i][j]))
                {
                    weights[i][j] += deltaWeights[i][j];
                }
            }
        }

        return this;
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final DefaultConnector another = (DefaultConnector)object;

            answer = fromLayer.equals(another.fromLayer);

            if (answer)
            {
                answer = toLayer.equals(another.toLayer);
            }

            if (answer)
            {
                for (int i = 0; answer && (i < weights.length); i++)
                {
                    answer = Arrays.equals(weights[i], another.weights[i]);
                }
            }
        }

        return answer;
    }

    @Override
    public Connector fillWeights(final double value)
    {
        if (weights == null)
        {
            throw new IllegalStateException("_weights == null");
        }

        for (int i = 0; i < weights.length; i++)
        {
            for (int j = 0; j < weights[i].length; j++)
            {
                weights[i][j] = value;
            }
        }

        return this;
    }

    @Override
    public Layer getFromLayer()
    {
        return fromLayer;
    }

    @Override
    public Layer getToLayer()
    {
        return toLayer;
    }

    @Override
    public double getWeight(final int i, final int j)
    {
        return weights[i][j];
    }

    @Override
    public int getWeightCount()
    {
        if (weights == null)
        {
            throw new IllegalStateException("_weights == null");
        }

        int count = 0;

        for (int i = 0; i < weights.length; i++)
        {
            count += weights[i].length;
        }

        return count;
    }

    @Override
    public double[] getWeights(final int i)
    {
        return weights[i];
    }

    @Override
    public int hashCode()
    {
        int answer = fromLayer.hashCode();

        answer += 3 * toLayer.hashCode();

        double sum = 0.0;

        for (int i = 0; i < weights.length; i++)
        {
            for (int j = 0; j < weights[i].length; j++)
            {
                sum += weights[i][j];
            }
        }

        answer += 5 * sum;

        return answer;
    }

    @Override
    public Connector randomizeWeights()
    {
        final double range = 0.1;
        randomizeWeights(range);

        return this;
    }

    @Override
    public Connector randomizeWeights(final double range)
    {
        final double min = -0.5 * range;

        for (int i = 0; i < weights.length; i++)
        {
            for (int j = 0; j < weights[i].length; j++)
            {
                weights[i][j] = (range * Math.random()) + min;
            }
        }

        return this;
    }

    @Override
    public Connector setWeight(final int i, final int j, final double weight)
    {
        weights[i][j] = weight;

        return this;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getName());

        final String lineSeparator = System.getProperty("line.separator");

        sb.append("[");
        sb.append("fromLayer=").append(fromLayer).append(",").append(lineSeparator);

        sb.append("weights=[");

        for (int i = 0; i < weights.length; i++)
        {
            sb.append(Arrays.toString(weights[i]));
        }

        sb.append("],").append(lineSeparator);

        sb.append("toLayer=").append(toLayer);
        sb.append("]");

        return sb.toString();
    }

    @Override
    public Connector zeroWeights()
    {
        fillWeights(0.0);

        return this;
    }

    /**
     * @param fromLayer The fromLayer to set.
     */
    @SuppressWarnings("hiding")
    private void setFromLayer(final Layer fromLayer)
    {
        this.fromLayer = fromLayer;
    }

    /**
     * @param toLayer The toLayer to set.
     */
    @SuppressWarnings("hiding")
    private void setToLayer(final Layer toLayer)
    {
        this.toLayer = toLayer;
    }
}
