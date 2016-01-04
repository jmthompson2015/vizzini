/*
 * Provides a human agent for Starfighter Squadrons.
 */
define([ "ModifyAttackDiceAction", "ModifyDefenseDiceAction", "SimpleAgent", "ShipAction", "ui/CombatUI",
        "ui/PlanningPanel", "ui/ShipActionChooser", "ui/WeaponAndDefenderChooser" ], function(ModifyAttackDiceAction,
        ModifyDefenseDiceAction, SimpleAgent, ShipAction, CombatUI, PlanningPanel, ShipActionChooser,
        WeaponAndDefenderChooser)
{
    function HumanAgent(name, teamKey)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("teamKey", teamKey);

        this.name = function()
        {
            return name;
        }

        this.teamKey = function()
        {
            return teamKey;
        }

        var environment;
        var attacker;
        var attackDice;
        var defender;
        var defenseDice;
        var planningCallback;
        var shipActionCallback;
        var weaponAndDefenderCallback;
        var modifyAttackCallback;
        var modifyDefenseCallback;
        var dealDamageCallback;

        this.chooseWeaponAndDefender = function(environment, adjudicator, attacker, callback)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("callback", callback);

            weaponAndDefenderCallback = callback;

            var choices = environment.createWeaponToRangeToDefenders(attacker);

            if (choices.length > 0)
            {
                var element = React.createElement(WeaponAndDefenderChooser,
                {
                    attacker: attacker,
                    choices: choices,
                    callback: finishWeaponAndDefender
                });
                React.render(element, document.getElementById("inputArea"));
                window.dispatchEvent(new Event('resize'));

                // Wait for the user to respond.
            }
            else
            {
                weaponAndDefenderCallback();
            }
        }

        this.dealDamage = function(environment, adjudicator, attacker, attackDice, defender, defenseDice, damageDealer,
                callback)
        {
            InputValidator.validateNotNull("damageDealer", damageDealer);
            InputValidator.validateNotNull("callback", callback);

            dealDamageCallback = callback;

            var element = React.createElement(CombatUI,
            {
                phase: environment.phase(),
                attacker: attacker,
                attackDice: attackDice,
                defender: defender,
                defenseDice: defenseDice,
                hitCount: damageDealer.hits(),
                criticalHitCount: damageDealer.criticalHits(),
                okFunction: finishDealDamage,
            });

            React.render(element, document.getElementById("inputArea"));
            window.dispatchEvent(new Event('resize'));
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

            if (attacker.focus().count() > 0)
            {
                modifications.push(ModifyAttackDiceAction.Modification.SPEND_FOCUS);
            }

            if (modifications.length > 1)
            {
                var element = React.createElement(CombatUI,
                {
                    phase: environment.phase(),
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
                modifyAttackCallback();
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

            if (defender.evade().count() > 0)
            {
                modifications.push(ModifyDefenseDiceAction.Modification.SPEND_EVADE);
            }

            if (defender.focus().count() > 0)
            {
                modifications.push(ModifyDefenseDiceAction.Modification.SPEND_FOCUS);
            }

            if (modifications.length > 1)
            {
                var element = React.createElement(CombatUI,
                {
                    phase: environment.phase(),
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
                modifyDefenseCallback();
            }
        }

        this.getPlanningAction = function(environment, adjudicator, callback)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("callback", callback);

            planningCallback = callback;

            var tokens = environment.getTokensForTeam(teamKey);
            tokens.sort(function(token0, token1)
            {
                var id0 = token0.id();
                var id1 = token1.id();
                return id0 - id1;
            });
            var self = this;
            var element = React.createElement(PlanningPanel,
            {
                environment: environment,
                agent: self,
                tokens: tokens,
                callback: finishPlanningAction
            });
            React.render(element, document.getElementById("inputArea"));
            window.dispatchEvent(new Event('resize'));

            // Wait for the user to respond.
        }

        this.getShipAction = function(environment, adjudicator, token, callback)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("token", token);

            shipActionCallback = callback;

            var shipActions = SimpleAgent.prototype.determineValidShipActions.call(this, environment, adjudicator,
                    token);

            var element = React.createElement(ShipActionChooser,
            {
                token: token,
                shipActions: shipActions,
                callback: finishShipAction
            });
            React.render(element, document.getElementById("inputArea"));
            window.dispatchEvent(new Event('resize'));

            // Wait for the user to respond.
        }

        function finishDealDamage()
        {
            LOGGER.trace("finishDealDamage() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            window.dispatchEvent(new Event('resize'));
            LOGGER.trace("finishDealDamage() end");

            dealDamageCallback();
        }

        function finishModifyAttackDice(modification)
        {
            var answer;
            LOGGER.info("HumanAgent.finishModifyAttackDice() modification = " + modification);

            if (modification && modification !== null && modification !== "null")
            {
                answer = new ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification);
            }
            LOGGER.info("HumanAgent.finishModifyAttackDice() answer = " + answer);

            modifyAttackCallback(answer);
        }

        function finishModifyDefenseDice(modification)
        {
            var answer;

            if (modification && modification !== null && modification !== "null")
            {
                answer = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
            }

            modifyDefenseCallback(answer);
        }

        function finishPlanningAction(planningAction)
        {
            LOGGER.trace("finishPlanningAction() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            window.dispatchEvent(new Event('resize'));
            LOGGER.trace("finishPlanningAction() end");

            planningCallback(planningAction);
        }

        function finishShipAction(shipAction)
        {
            LOGGER.trace("finishShipAction() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            window.dispatchEvent(new Event('resize'));
            LOGGER.trace("finishShipAction() end");

            shipActionCallback(shipAction);
        }

        function finishWeaponAndDefender(weapon, defender)
        {
            LOGGER.trace("finishWeaponAndDefender() start");

            // Handle the user response.
            var element = document.getElementById("inputArea");
            element.innerHTML = "";
            window.dispatchEvent(new Event('resize'));
            LOGGER.trace("finishWeaponAndDefender() end");

            weaponAndDefenderCallback(weapon, defender);
        }
    }

    HumanAgent.prototype.toString = function()
    {
        return this.name() + ", HumanAgent, " + this.teamKey();
    }

    return HumanAgent;
});
