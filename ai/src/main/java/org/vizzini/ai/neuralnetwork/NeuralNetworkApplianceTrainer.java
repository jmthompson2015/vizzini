package org.vizzini.ai.neuralnetwork;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides a trainer for a neural network appliance.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public final class NeuralNetworkApplianceTrainer<I, O>
{
    /** Neural network appliance. */
    private final NeuralNetworkAppliance<I, O> appliance;

    /** Examples. */
    private final List<ApplianceExample<I, O>> examples;

    /** Neural network trainer. */
    private final NeuralNetworkTrainer trainer;

    /**
     * Construct this object.
     * 
     * @param appliance Neural network appliance.
     * @param examples Examples.
     * @param isBatchUsed Flag indicating whether to use batch or continuous training.
     * @param isVerbose Flag indicating whether test output is verbose.
     * @param alpha Momentum constant.
     * @param beta Learning constant.
     */
    @SuppressWarnings("hiding")
    public NeuralNetworkApplianceTrainer(final NeuralNetworkAppliance<I, O> appliance,
            final List<ApplianceExample<I, O>> examples, final boolean isBatchUsed, final boolean isVerbose,
            final double alpha, final double beta)
    {
        if (appliance == null)
        {
            throw new IllegalArgumentException("appliance is null");
        }

        if (examples == null)
        {
            throw new IllegalArgumentException("examples is null");
        }

        this.appliance = appliance;
        this.examples = examples;

        final List<Example> nnExamples = createExamples();
        trainer = createTrainer(nnExamples, isBatchUsed, isVerbose, alpha, beta);
    }

    /**
     * Train this network with the given training sets.
     * 
     * @param maxError Maximum error for a stopping condition.
     * @param maxCount Maximum loop count for a stopping condition.
     * @param printFrequency Loop count frequency when error is printed.
     * 
     * @return the sum squared error.
     */
    public double runTrainingLoop(final double maxError, final int maxCount, final int printFrequency)
    {
        return trainer.runTrainingLoop(maxError, maxCount, printFrequency);
    }

    /**
     * Train this network with the given training sets.
     * 
     * @return the sum squared error.
     */
    public double train()
    {
        return trainer.train();
    }

    /**
     * @return a new array of examples.
     */
    private List<Example> createExamples()
    {
        final double[][] nnIns = createInputs();
        final double[][] nnOuts = createOutputs();

        final List<Example> answer = new ArrayList<Example>(nnIns.length);

        for (int i = 0; i < nnIns.length; i++)
        {
            answer.add(new Example(nnIns[i], nnOuts[i]));
        }

        return answer;
    }

    /**
     * @return a new array of neural network inputs.
     */
    private double[][] createInputs()
    {
        final double[][] answer = new double[examples.size()][];
        final InputFilter<I> inputFilter = appliance.getInputFilter();

        for (int i = 0; i < examples.size(); i++)
        {
            if (inputFilter == null)
            {
                answer[i] = (double[])examples.get(i).getInput();
            }
            else
            {
                answer[i] = inputFilter.filter(examples.get(i).getInput());
            }
        }

        return answer;
    }

    /**
     * @return a new array of neural network outputs.
     */
    private double[][] createOutputs()
    {
        final double[][] answer = new double[examples.size()][];
        final OutputFilter<O> outputFilter = appliance.getOutputFilter();

        for (int i = 0; i < examples.size(); i++)
        {
            if (outputFilter == null)
            {
                answer[i] = (double[])examples.get(i).getOutput();
            }
            else
            {
                answer[i] = outputFilter.reverseFilter(examples.get(i).getOutput());
            }
        }

        return answer;
    }

    /**
     * @param nnExamples Neural network examples.
     * @param isBatchUsed Flag indicating whether to use batch or continuous training.
     * @param isVerbose Flag indicating whether test output is verbose.
     * @param alpha Momentum constant.
     * @param beta Learning constant.
     * 
     * @return a new neural network trainer.
     */
    private NeuralNetworkTrainer createTrainer(final List<Example> nnExamples, final boolean isBatchUsed,
            final boolean isVerbose, final double alpha, final double beta)
    {
        final NeuralNetworkTrainer answer;

        if (isBatchUsed)
        {
            answer = new NeuralNetworkBatchTrainer(appliance.getNeuralNetwork(), nnExamples, isVerbose, alpha, beta);
        }
        else
        {
            answer = new NeuralNetworkContinuousTrainer(appliance.getNeuralNetwork(), nnExamples, isVerbose, alpha,
                    beta);
        }

        return answer;
    }
}
