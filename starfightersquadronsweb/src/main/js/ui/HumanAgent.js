/*
 * Provides a human agent for Starfighter Squadrons.
 */
define([ "ModifyAttackDiceAction", "ModifyDefenseDiceAction", "ShipAction", "ui/CombatUI", "ui/PlanningPanel",
        "ui/ShipActionChooser", "ui/WeaponAndDefenderChooser" ], function(ModifyAttackDiceAction,
        ModifyDefenseDiceAction, ShipAction, CombatUI, PlanningPanel, ShipActionChooser, WeaponAndDefenderChooser)
{
    function HumanAgent(name, team, squadBuilder)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("team", team);
        InputValidator.validateNotNull("squadBuilder", squadBuilder);

        var callback;
        var environment;
        var attacker;
        var attackDice;
        var defender;
        var defenseDice;
        var modifyAttackCallback;
        var modifyDefenseCallback;
        var dealDamageCallback;

        this.buildSquad = function()
        {
            return squadBuilder.buildSquad(this);
        }

        this.chooseWeaponAndDefender = function(environment, adjudicator, attacker, callbackIn)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("callback", callbackIn);

            callback = callbackIn;

            var choices = WeaponAndDefenderChooser.createWeaponAndRangeAndTokens(environment, attacker);

            if (choices.length > 0)
            {
                var element = React.createElement(WeaponAndDefenderChooser,
                {
                    attacker: attacker,
                    choices: choices,
                    callback: this.finishWeaponAndDefender
                });
                React.render(element, document.getElementById("inputArea"));
                window.dispatchEvent(new Event('resize'));

                // Wait for the user to respond.
            }
            else
            {
                callback();
            }
        }

        this.dealDamage = function(environment, adjudicator, attacker, attackDice, defender, defenseDice, damageDealer,
                callbackIn)
        {
            InputValidator.validateNotNull("damageDealer", damageDealer);
            InputValidator.validateNotNull("callback", callbackIn);

            dealDamageCallback = callbackIn;

            var element = React.createElement(CombatUI,
            {
                phase: environment.getPhase(),
                attacker: attacker,
                attackDice: attackDice,
                defender: defender,
                defenseDice: defenseDice,
                hitCount: damageDealer.getHits(),
                criticalHitCount: damageDealer.getCriticalHits(),
                okFunction: this.finishDealDamage,
            });

            React.render(element, document.getElementById("inputArea"));
            window.dispatchEvent(new Event('resize'));
        }

        this.finishDealDamage = function()
        {
            LOGGER.trace("finishDealDamage() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            window.dispatchEvent(new Event('resize'));
            LOGGER.trace("finishDealDamage() end");

            dealDamageCallback();
        }

        this.finishPlanningAction = function(planningAction)
        {
            LOGGER.trace("finishPlanningAction() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            window.dispatchEvent(new Event('resize'));
            LOGGER.trace("finishPlanningAction() end");

            callback(planningAction);
        }

        this.finishShipAction = function(shipAction)
        {
            LOGGER.trace("finishShipAction() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            window.dispatchEvent(new Event('resize'));
            LOGGER.trace("finishShipAction() end");

            callback(shipAction);
        }

        this.finishWeaponAndDefender = function(weapon, defender)
        {
            LOGGER.trace("finishWeaponAndDefender() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            window.dispatchEvent(new Event('resize'));
            LOGGER.trace("finishWeaponAndDefender() end");

            callback(weapon, defender);
        }

        this.getName = function()
        {
            return name;
        }

        /*
         * @param environment Environment. @param adjudicator Adjudicator.
         * 
         * @return a new action.
         */
        this.getPlanningAction = function(environment, adjudicator, callbackIn)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("callback", callbackIn);

            callback = callbackIn;

            var tokens = environment.getTokensForTeam(team);
            tokens.sort(function(token0, token1)
            {
                var id0 = token0.getId();
                var id1 = token1.getId();
                var answer = id0 - id1;

                return answer;
            });
            var self = this;
            var element = React.createElement(PlanningPanel,
            {
                environment: environment,
                agent: self,
                tokens: tokens,
                callback: self.finishPlanningAction
            });
            React.render(element, document.getElementById("inputArea"));
            window.dispatchEvent(new Event('resize'));

            // Wait for the user to respond.
        }

        this.getModifyAttackDiceAction = function(environmentIn, adjudicator, attackerIn, attackDiceIn, defenderIn,
                callback)
        {
            environment = environmentIn;
            attacker = attackerIn;
            attackDice = attackDiceIn;
            defender = defenderIn;
            modifyAttackCallback = callback;

            var modifications = [ null ];
            var targetLock = attacker.findTargetLockByDefender(defender);

            if (targetLock)
            {
                modifications.push(ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK);
            }

            if (attacker.getFocusCount() > 0)
            {
                modifications.push(ModifyAttackDiceAction.Modification.SPEND_FOCUS);
            }

            if (modifications.length > 1)
            {
                var element = React.createElement(CombatUI,
                {
                    phase: environment.getPhase(),
                    attacker: attacker,
                    attackDice: attackDice,
                    defender: defender,
                    modifications: modifications,
                    okFunction: finishModifyAttackDice,
                });
                React.render(element, document.getElementById("inputArea"));
                window.dispatchEvent(new Event('resize'));

                // Wait for the user to respond.
            }
            else
            {
                callback();
            }
        }

        this.getModifyDefenseDiceAction = function(environmentIn, adjudicator, attacker, attackDice, defenderIn,
                defenseDiceIn, callback)
        {
            environment = environmentIn;
            defender = defenderIn;
            defenseDice = defenseDiceIn;
            modifyDefenseCallback = callback;

            var modifications = [ null ];

            if (defender.getEvadeCount() > 0)
            {
                modifications.push(ModifyDefenseDiceAction.Modification.SPEND_EVADE);
            }

            if (defender.getFocusCount() > 0)
            {
                modifications.push(ModifyDefenseDiceAction.Modification.SPEND_FOCUS);
            }

            if (modifications.length > 1)
            {
                var element = React.createElement(CombatUI,
                {
                    phase: environment.getPhase(),
                    attacker: attacker,
                    attackDice: attackDice,
                    defender: defender,
                    defenseDice: defenseDice,
                    modifications: modifications,
                    okFunction: finishModifyDefenseDice,
                });
                React.render(element, document.getElementById("inputArea"));
                window.dispatchEvent(new Event('resize'));

                // Wait for the user to respond.
            }
            else
            {
                callback();
            }
        }

        this.getShipAction = function(environment, adjudicator, token, callbackIn)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("token", token);

            callback = callbackIn;

            var shipActions = token.getShipActions();

            if (shipActions.vizziniContains(ShipAction.TARGET_LOCK))
            {
                var defenders = environment.getDefendersInRange(token);

                shipActions.vizziniRemove(ShipAction.TARGET_LOCK);

                if (defenders && defenders.length > 0)
                {
                    defenders.forEach(function(defender)
                    {
                        // Only put choices without a current target lock.
                        if (!token.findTargetLockByDefender(defender))
                        {
                            shipActions.push(ShipAction.createTargetLockShipAction(defender));
                        }
                    });
                }
            }

            var element = React.createElement(ShipActionChooser,
            {
                token: token,
                shipActions: shipActions,
                callback: this.finishShipAction
            });
            React.render(element, document.getElementById("inputArea"));
            window.dispatchEvent(new Event('resize'));

            // Wait for the user to respond.
        }

        this.getSquadBuilder = function()
        {
            return squadBuilder;
        }

        this.getTeam = function()
        {
            return team;
        }

        function finishModifyAttackDice(modification)
        {
            var answer;

            if (modification)
            {
                answer = new ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification);
            }

            modifyAttackCallback(answer);
        }

        function finishModifyDefenseDice(modification)
        {
            var answer;

            if (modification)
            {
                answer = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
            }

            modifyDefenseCallback(answer);
        }
    }

    HumanAgent.prototype.toString = function()
    {
        return this.getName() + ", HumanAgent, " + this.getTeam() + ", " + this.getSquadBuilder().getName();
    }

    return HumanAgent;
});
