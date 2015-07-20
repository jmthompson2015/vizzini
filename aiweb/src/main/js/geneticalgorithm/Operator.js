/*
 * Provides an operator for a genetic algorithm.
 */
function Operator(ratio, argCount, executor)
{
    InputValidator.validateInRange("ratio", ratio, 0.0, 1.0);
    InputValidator.validateInRange("argCount", argCount, 1, 2);
    InputValidator.validateNotNull("executor", executor);

    this.getRatio = function()
    {
        return ratio;
    }

    this.getArgCount = function()
    {
        return argCount;
    }

    this.getExecutor = function()
    {
        return executor;
    }
}
