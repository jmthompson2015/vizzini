define(function()
{
    "use strict";
    function AASimulator()
    {
        this.run = function(context, genome)
        {
            var environment = context.environment;
            var isDone = false;
            var count = 0;

            while (!isDone)
            {
                count++;

                try
                {
                    genome.evaluate(context);

                    if (environment.foodConsumed() === environment.initialFoodCount())
                    {
                        isDone = true;
                    }
                }
                catch (e)
                {
                    isDone = true;
                }

                if (context.time > 420)
                {
                    isDone = true;
                }

                if (count > 400)
                {
                    isDone = true;
                }
            }

            return environment.foodConsumed();
        };
    }

    return AASimulator;
});
