define(function()
{
    "use strict";
    function ScenarioDeck(questInstances, encounterInstances)
    {
        InputValidator.validateNotNull("questInstances", questInstances);
        InputValidator.validateNotNull("encounterInstances", encounterInstances);

        this.questInstances = function()
        {
            return questInstances;
        };

        this.encounterInstances = function()
        {
            return encounterInstances;
        };
    }

    return ScenarioDeck;
});
