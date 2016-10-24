define(function()
{
    "use strict";
    function Operator(ratio, argCount, executor)
    {
        InputValidator.validateInRange("ratio", ratio, 0.0, 1.0);
        InputValidator.validateInRange("argCount", argCount, 1, 2);
        InputValidator.validateNotNull("executor", executor);

        this.ratio = function()
        {
            return ratio;
        };

        this.argCount = function()
        {
            return argCount;
        };

        this.executor = function()
        {
            return executor;
        };
    }

    return Operator;
});
