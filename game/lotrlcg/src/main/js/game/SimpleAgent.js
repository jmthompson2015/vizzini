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

    SimpleAgent.prototype.combatDefendAction = function(environment, adjudicator, callback)
    {
        var answer = {};
        var attackers = environment.agentData(this).engagementArea().slice();

        if (attackers.length > 0)
        {
            attackers.sort(function(token0, token1)
            {
                var attack0 = token0.card().attack;
                var attack1 = token1.card().attack;
                return attack1 - attack0;
            });

            var characters = environment.characters(this).filter(function(character)
            {
                return !character.exhaustState().isExhausted();
            });;
            characters.sort(function(token0, token1)
            {
                var defense0 = token0.card().defense;
                var defense1 = token1.card().defense;
                var answer = defense1 - defense0;
                if (answer === 0)
                {
                    var attack0 = token0.card().attack;
                    var attack1 = token1.card().attack;
                    answer = attack0 - attack1;
                }
                return answer;
            });
            LOGGER.debug("characters = " + characters);

            for (var i = 0; i < attackers.length; i++)
            {
                var attacker = attackers[i];
                var defender = (characters.length > i ? characters[i] : undefined);

                if (defender)
                {
                    answer[attacker.id()] = defender;
                }
            }
        }

        callback(answer);
    };

    SimpleAgent.prototype.combatAttackAction = function(environment, adjudicator, callback)
    {
        var answer = {};
        var enemies = environment.agentData(this).engagementArea().slice();

        if (enemies.length > 0)
        {
            enemies.sort(function(token0, token1)
            {
                var defense0 = token0.card().defense + token0.card().hitPoints - token0.woundState().wounds().count();
                var defense1 = token1.card().defense + token1.card().hitPoints - token1.woundState().wounds().count();
                return defense1 - defense0;
            });

            var characters = environment.characters(this).filter(function(character)
            {
                return !character.exhaustState().isExhausted();
            });
            characters.sort(function(token0, token1)
            {
                var attack0 = token0.card().attack;
                var attack1 = token1.card().attack;
                return attack1 - attack0;
            });
            LOGGER.debug("characters = " + characters);

            for (var i = 0; i < enemies.length; i++)
            {
                var enemy = enemies[i];
                var attackers = [];
                answer[enemy.id()] = attackers;
                var attacker = (characters.length > i ? characters[i] : undefined);

                if (attacker)
                {
                    attackers.push(attacker);
                }
            }
        }

        callback(answer);
    };

    SimpleAgent.prototype.toString = function()
    {
        return "SimpleAgent " + this.name();
    };

    return SimpleAgent;
});
