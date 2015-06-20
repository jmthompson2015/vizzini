/*
 * Provides an evaluator for a JavaScript based genome.
 */
function JSEvaluator(inputs, outputs, phenotypeFactory, isMatches,
        errorThreshold, idealGenomeLength)
{
    InputValidator.validateNotEmpty("inputs", inputs);
    InputValidator.validateNotEmpty("outputs", outputs);
    InputValidator.validateNotNull("phenotypeFactory", phenotypeFactory);

    var idealEvaluation = 1000;

    this.getInputs = function()
    {
        return inputs;
    }

    this.getOutputs = function()
    {
        return outputs;
    }

    this.getPhenotypeFactory = function()
    {
        return phenotypeFactory;
    }

    this.isMatches = function()
    {
        return isMatches;
    }

    this.getErrorThreshold = function()
    {
        return errorThreshold;
    }

    this.getIdealGenomeLength = function()
    {
        return idealGenomeLength;
    }

    this.computeMatches = function(phenotype)
    {
        InputValidator.validateNotNull("phenotype", phenotype);

        var answer = 0;

        for (var i = 0; i < inputs.length; i++)
        {
            try
            {
                var result = execute(phenotype, inputs[i]);

                if (result === outputs[i])
                {
                    answer++;
                }
            }
            catch (ignore)
            {}
        }

        return answer;
    }

    this.computeSumError = function(phenotype)
    {
        InputValidator.validateNotNull("phenotype", phenotype);

        var sumError = 0.0;

        for (var i = 0; i < inputs.length; i++)
        {
            try
            {
                var result = execute(phenotype, inputs[i]);

                if (isNaN(result))
                {
                    sumError += 10.0;
                }
                else
                {
                    sumError += Math.abs(outputs[i] - result);
                }
            }
            catch (e)
            {
                sumError += 10.0;
            }
        }

        return sumError;
    }

    this.evaluate = function(population)
    {
        InputValidator.validateNotEmpty("population", population);

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            genome.fitness = 0.0;
            genome.phenotype = phenotypeFactory.create(genome);

            if (genome.phenotype)
            {
                // Valid function.
                genome.fitness = 500.0;

                if (isMatches)
                {
                    this.evaluateMatches(genome);
                }
                else
                {
                    this.evaluateNumericError(genome);
                }
            }
            else
            {
                // Invalid function.
                this.evaluateInvalidFunction(genome);
            }
        }
    }

    this.evaluateInvalidFunction = function(genome)
    {
        var errorCount = genome.errorCount;

        if (!isNaN(errorCount))
        {
            genome.fitness += 300.0 / (errorCount + 1);
        }

        var warningCount = genome.warningCount;

        if (!isNaN(warningCount))
        {
            genome.fitness += 100.0 / (warningCount + 1);
        }
    }

    this.evaluateMatches = function(genome)
    {
        var matches = this.computeMatches(genome.phenotype);

        if (matches === outputs.length)
        {
            // Perfect evaluation.
            genome.fitness = idealEvaluation;

            if (idealGenomeLength)
            {
                // Add pressure for the shortest genome.
                genome.fitness += idealGenomeLength - genome.length;
            }
        }
        else
        {
            genome.fitness += matches * (400.0 / outputs.length);
        }
    }

    this.evaluateNumericError = function(genome)
    {
        var sumError = this.computeSumError(genome.phenotype);

        if (sumError <= errorThreshold)
        {
            // Perfect evaluation.
            genome.fitness = idealEvaluation;

            if (idealGenomeLength)
            {
                // Add pressure for the shortest genome.
                genome.fitness += idealGenomeLength - genome.length;
            }
        }
        else
        {
            genome.fitness += 400.0 / sumError;
        }
    }

    function execute(phenotype, input)
    {
        var answer;

        if (Array.isArray(input))
        {
            if (input.length === 2)
            {
                answer = phenotype(input[0], input[1]);
            }
            else
            {
                throw "Unhandled number of inputs: " + input.length;
            }
        }
        else
        {
            answer = phenotype(input);
        }

        return answer;
    }
}
