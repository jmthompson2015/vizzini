define(function()
{
    "use strict";
    function SimpleAgent(name)
    {
        InputValidator.validateNotEmpty("name", name);

        this.name = function()
        {
            return name;
        };
    }

    SimpleAgent.prototype.planningAction = function(environment, adjudicator, callback)
    {
        // FIXME: implement planningAction()
        callback();
    };

    SimpleAgent.prototype.questAction = function(environment, adjudicator, callback)
    {
        var characters = environment.characters(this).filter(function(token)
        {
            return token.card().willpower > 0;
        });

        callback(characters);
    };

    SimpleAgent.prototype.travelAction = function(environment, adjudicator, callback)
    {
        var answer;
        var locations = environment.locations();

        if (locations.length > 0)
        {
            answer = locations.vizziniRandomElement();
        }

        callback(answer);
    };

    SimpleAgent.prototype.encounterAction = function(environment, adjudicator, callback)
    {
        var answer;
        var enemies = environment.enemies();

        if (enemies.length > 0)
        {
            enemies.sort(function(enemy0, enemy1)
            {
                var engagementCost0 = enemy0.card().engagementCost;
                var engagementCost1 = enemy1.card().engagementCost;

                return engagementCost1 - engagementCost0;
            });

            var threatLevel = environment.threatLevel(this);
            LOGGER.debug("threatLevel = " + threatLevel);

            for (var i = 0; i < enemies.length; i++)
            {
                var enemy = enemies[i];
                LOGGER.debug("enemy.card().engagementCost = " + enemy.card().engagementCost);

                if (enemy.card().engagementCost <= threatLevel)
                {
                    answer = enemy;
                    break;
                }
            }
        }

        callback(answer);
    };

    SimpleAgent.prototype.combatAction = function(environment, adjudicator, callback)
    {
        // FIXME: implement combatAction()
        callback();
    };

    SimpleAgent.prototype.toString = function()
    {
        return "SimpleAgent " + this.name();
    };

    return SimpleAgent;
});
