/*
 * Provides a human agent for Starfighter Squadrons.
 */
define([ "ModifyAttackDiceAction", "ModifyDefenseDiceAction", "ui/CombatUI", "ui/PlanningPanel",
        "ui/ShipActionChooser", "ui/WeaponAndDefenderChooser" ], function(ModifyAttackDiceAction,
        ModifyDefenseDiceAction, CombatUI, PlanningPanel, ShipActionChooser, WeaponAndDefenderChooser)
{
    function HumanAgent(name, team, squadBuilder, imageUtils)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("team", team);
        InputValidator.validateNotNull("squadBuilder", squadBuilder);
        InputValidator.validateNotNull("imageUtils", imageUtils);

        var callback;
        var environment;
        var attacker;
        var attackDice;
        var defender;
        var defenseDice;
        var modifyAttackCallback;
        var modifyDefenseCallback;

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
                // updateSizes();

                // Wait for the user to respond.
            }
            else
            {
                callback();
            }
        }

        this.finishPlanningAction = function(planningAction)
        {
            LOGGER.trace("finishPlanningAction() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            LOGGER.trace("finishPlanningAction() end");

            callback(planningAction);
        }

        this.finishShipAction = function(shipAction)
        {
            LOGGER.trace("finishShipAction() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            LOGGER.trace("finishShipAction() end");

            callback(shipAction);
        }

        this.finishWeaponAndDefender = function(weapon, defender)
        {
            LOGGER.trace("finishWeaponAndDefender() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
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
                imageUtils: imageUtils,
                callback: self.finishPlanningAction
            });
            React.render(element, document.getElementById("inputArea"));
            window.dispatchEvent(new Event('resize'));

            // Wait for the user to respond.
        }

        this.getModifyAttackDiceAction = function(environmentIn, adjudicator, attackerIn, attackDiceIn, defender,
                callback)
        {
            environment = environmentIn;
            attacker = attackerIn;
            attackDice = attackDiceIn;
            modifyAttackCallback = callback;

            var modifications = [ null ];

            // TODO: implement Target Lock

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
                // updateSizes();

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
                // updateSizes();

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
            var element = React.createElement(ShipActionChooser,
            {
                token: token,
                shipActions: shipActions,
                callback: this.finishShipAction
            });
            React.render(element, document.getElementById("inputArea"));

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
                answer = new ModifyAttackDiceAction(environment, attacker, attackDice, modification);
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
