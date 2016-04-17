define(
        [ "CardType", "Sphere", "game/Selector" ],
        function(CardType, Sphere, Selector)
        {
            "use strict";
            var SimpleAgent = {};
            var delay = 500; // ms

            SimpleAgent.planningAction = function(store, agent, adjudicator, callback)
            {
                LOGGER.trace("SimpleAgent.planningAction() start");

                var answer = [];
                var state = store.getState();
                var sphereKeys = Sphere.values();

                sphereKeys
                        .forEach(
                                function(sphereKey)
                                {
                                    var sum = 0;
                                    var heroes = Selector.heroes(state, agent.playAreaIds);
                                    heroes.forEach(function(hero)
                                    {
                                        if (hero.card.sphereKey === sphereKey)
                                        {
                                            sum += hero.resourceCount;
                                        }
                                    });

                                    if (sum > 0)
                                    {
                                        LOGGER.debug("heroes = " + heroes);
                                        LOGGER.debug("sphereKey = " + sphereKey + " sum = " + sum);

                                        var hand = Selector.cardInstances(state, agent.handIds);
                                        var cards = hand
                                                .filter(function(cardInstance)
                                                {
                                                    return cardInstance.card.sphereKey === sphereKey &&
                                                            (cardInstance.card.cardTypeKey === CardType.ALLY || cardInstance.card.cardTypeKey === CardType.ATTACHMENT) &&
                                                            cardInstance.card.cost <= sum;
                                                });
                                        LOGGER.debug("cards = " + cards);

                                        if (cards.length > 0)
                                        {
                                            answer.push(cards.vizziniRandomElement());
                                        }
                                    }
                                }, this);

                LOGGER.debug("answer = " + answer);
                LOGGER.trace("SimpleAgent.planningAction() end");

                setTimeout(function()
                {
                    callback(answer);
                }, delay);
            };

            SimpleAgent.questAction = function(store, agent, adjudicator, callback)
            {
                var state = store.getState();

                var characters = Selector.characters(state, agent.playAreaIds).filter(function(token)
                {
                    return token.card.willpower > 0;
                });

                setTimeout(function()
                {
                    callback(characters);
                }, delay);
            };

            SimpleAgent.travelAction = function(store, adjudicator, callback)
            {
                var answer;
                var state = store.getState();
                var locations = Selector.locations(state, state.stagingAreaIds);

                if (locations.length > 0)
                {
                    answer = locations.vizziniRandomElement();
                }

                setTimeout(function()
                {
                    callback(answer);
                }, delay);
            };

            SimpleAgent.encounterAction = function(store, agent, adjudicator, callback)
            {
                var answer;
                var state = store.getState();
                var enemies = Selector.enemies(state, state.stagingAreaIds);

                if (enemies.length > 0)
                {
                    enemies.sort(function(enemy0, enemy1)
                    {
                        var engagementCost0 = enemy0.card.engagementCost;
                        var engagementCost1 = enemy1.card.engagementCost;

                        return engagementCost1 - engagementCost0;
                    });

                    var threatLevel = agent.threatLevel;
                    LOGGER.debug("threatLevel = " + threatLevel);

                    for (var i = 0; i < enemies.length; i++)
                    {
                        var enemy = enemies[i];
                        LOGGER.debug("enemy.card.engagementCost = " + enemy.card.engagementCost);

                        if (enemy.card.engagementCost <= threatLevel)
                        {
                            answer = enemy;
                            break;
                        }
                    }
                }

                setTimeout(function()
                {
                    callback(answer);
                }, delay);
            };

            SimpleAgent.combatDefendAction = function(store, agent, adjudicator, callback)
            {
                var answer = {};
                var state = store.getState();
                var attackerIds = agent.engagementAreaIds.slice();
                var attackers = Selector.cardInstances(state, attackerIds);

                if (attackers.length > 0)
                {
                    attackers.sort(function(token0, token1)
                    {
                        var attack0 = token0.card.attack;
                        var attack1 = token1.card.attack;
                        return attack1 - attack0;
                    });

                    var characters = Selector.characters(state, agent.playAreaIds).filter(function(character)
                    {
                        return !character.isExhausted;
                    });
                    characters.sort(function(token0, token1)
                    {
                        var defense0 = token0.card.defense;
                        var defense1 = token1.card.defense;
                        var answer = defense1 - defense0;
                        if (answer === 0)
                        {
                            var attack0 = token0.card.attack;
                            var attack1 = token1.card.attack;
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
                            answer[attacker.id] = defender;
                        }
                    }
                }

                setTimeout(function()
                {
                    callback(answer);
                }, delay);
            };

            SimpleAgent.combatAttackAction = function(store, agent, adjudicator, callback)
            {
                var answer = {};
                var state = store.getState();
                var enemies = Selector.cardInstances(state, agent.engagementAreaIds);

                if (enemies.length > 0)
                {
                    enemies.sort(function(token0, token1)
                    {
                        var defense0 = token0.card.defense + token0.card.hitPoints - token0.woundCount;
                        var defense1 = token1.card.defense + token1.card.hitPoints - token1.woundCount;
                        return defense1 - defense0;
                    });

                    var characters = Selector.characters(state, agent.playAreaIds).filter(function(character)
                    {
                        return !character.isExhausted;
                    });
                    characters.sort(function(token0, token1)
                    {
                        var attack0 = token0.card.attack;
                        var attack1 = token1.card.attack;
                        return attack1 - attack0;
                    });
                    LOGGER.debug("characters = " + characters);

                    for (var i = 0; i < enemies.length; i++)
                    {
                        var enemy = enemies[i];
                        var attackers = [];
                        answer[enemy.id] = attackers;
                        var attacker = (characters.length > i ? characters[i] : undefined);

                        if (attacker)
                        {
                            attackers.push(attacker);
                        }
                    }
                }

                setTimeout(function()
                {
                    callback(answer);
                }, delay);
            };

            return SimpleAgent;
        });
