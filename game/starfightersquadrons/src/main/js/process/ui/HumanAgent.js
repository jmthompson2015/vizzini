define(["DamageCard", "DamageCardV2", "Phase", "Pilot", "UpgradeCard", "process/ManeuverAction", "process/SimpleAgent", "process/ui/AbilityChooser", "process/ui/CombatUI", "process/ui/PlanningPanel", "process/ui/ShipActionChooser", "process/ui/WeaponAndDefenderChooser"],
    function(DamageCard, DamageCardV2, Phase, Pilot, UpgradeCard, ManeuverAction, SimpleAgent, AbilityChooser, CombatUI, PlanningPanel, ShipActionChooser, WeaponAndDefenderChooser)
    {
        "use strict";

        function HumanAgent(name, teamKey, imageBase)
        {
            InputValidator.validateNotEmpty("name", name);
            InputValidator.validateNotNull("teamKey", teamKey);
            InputValidator.validateNotNull("imageBase", imageBase);

            this.name = function()
            {
                return name;
            };

            this.teamKey = function()
            {
                return teamKey;
            };

            this.imageBase = function()
            {
                return imageBase;
            };

            this.isComputerAgent = function()
            {
                return false;
            };

            var environment;
            var attacker;
            var attackDice;
            var defender;
            var defenseDice;
            var planningCallback;
            var decloakActionCallback;
            var shipActionCallback;
            var weaponAndDefenderCallback;
            var modifyAttackCallback;
            var modifyDefenseCallback;
            var dealDamageCallback;
            var chooseAbilityCallback;

            this.chooseAbility = function(environment, damageAbilities, pilotAbilities, upgradeAbilities, callback)
            {
                InputValidator.validateNotNull("environment", environment);
                InputValidator.validateNotNull("damageAbilities", damageAbilities);
                InputValidator.validateNotNull("pilotAbilities", pilotAbilities);
                InputValidator.validateNotNull("upgradeAbilities", upgradeAbilities);
                InputValidator.validateNotNull("callback", callback);

                chooseAbilityCallback = callback;

                if (damageAbilities.length > 0 || pilotAbilities.length > 0 || upgradeAbilities.length > 0)
                {
                    var element = React.createElement(AbilityChooser,
                    {
                        damages: damageAbilities,
                        imageBase: imageBase,
                        onChange: finishChooseAbility,
                        pilots: pilotAbilities,
                        token: environment.activeToken(),
                        upgrades: upgradeAbilities,
                    });
                    ReactDOM.render(element, document.getElementById("inputArea"));
                    window.dispatchEvent(new Event('resize'));

                    // Wait for the user to respond.
                }
                else
                {
                    setTimeout(finishChooseAbility, 100);
                }
            };

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
                    ReactDOM.render(element, document.getElementById("inputArea"));
                    window.dispatchEvent(new Event('resize'));

                    // Wait for the user to respond.
                }
                else
                {
                    weaponAndDefenderCallback();
                }
            };

            this.dealDamage = function(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                damageDealer, callback)
            {
                InputValidator.validateNotNull("damageDealer", damageDealer);
                InputValidator.validateNotNull("callback", callback);

                dealDamageCallback = callback;

                var element = React.createElement(CombatUI,
                {
                    attacker: attacker,
                    attackDice: attackDice,
                    criticalHitCount: damageDealer.criticalHits(),
                    defender: defender,
                    defenseDice: defenseDice,
                    hitCount: damageDealer.hits(),
                    imageBase: imageBase,
                    okFunction: finishDealDamage,
                    phase: Phase.properties[environment.phase()],
                });

                ReactDOM.render(element, document.getElementById("inputArea"));
                window.dispatchEvent(new Event('resize'));
            };

            this.getDecloakAction = function(environmentIn, adjudicator, tokenIn, callback)
            {
                InputValidator.validateNotNull("environment", environmentIn);
                InputValidator.validateNotNull("adjudicator", adjudicator);
                InputValidator.validateNotNull("token", tokenIn);
                InputValidator.validateNotNull("callback", callback);

                environment = environmentIn;
                attacker = tokenIn;
                decloakActionCallback = callback;

                var decloakActions = SimpleAgent.prototype.determineValidDecloakActions(environment, adjudicator,
                    attacker);

                var element = React.createElement(ShipActionChooser,
                {
                    imageBase: imageBase,
                    token: attacker,
                    shipActions: decloakActions,
                    callback: function(decloakAction)
                    {
                        finishDecloakAction(attacker, decloakAction);
                    }
                });
                ReactDOM.render(element, document.getElementById("inputArea"));
                window.dispatchEvent(new Event('resize'));

                // Wait for the user to respond.
            };

            this.getModifyAttackDiceAction = function(environmentIn, adjudicator, attackerIn, attackDiceIn,
                defenderIn, callback)
            {
                InputValidator.validateNotNull("environment", environmentIn);
                InputValidator.validateNotNull("adjudicator", adjudicator);
                InputValidator.validateNotNull("attacker", attackerIn);
                InputValidator.validateNotNull("attackDice", attackDiceIn);
                InputValidator.validateNotNull("defender", defenderIn);
                InputValidator.validateNotNull("callback", callback);

                environment = environmentIn;
                attacker = attackerIn;
                attackDice = attackDiceIn;
                defender = defenderIn;
                modifyAttackCallback = callback;

                var modifications = SimpleAgent.prototype.determineValidModifyAttackDiceActions.call(this, environment, attacker, attackDice, defender);

                if (modifications.length > 0)
                {
                    var element = React.createElement(CombatUI,
                    {
                        attacker: attacker,
                        attackDice: attackDice,
                        defender: defender,
                        imageBase: imageBase,
                        modifications: modifications,
                        okFunction: finishModifyAttackDice,
                        phase: Phase.properties[environment.phase()],
                    });
                    ReactDOM.render(element, document.getElementById("inputArea"));
                    window.dispatchEvent(new Event('resize'));

                    // Wait for the user to respond.
                }
                else
                {
                    modifyAttackCallback();
                }
            };

            this.getModifyDefenseDiceAction = function(environmentIn, adjudicator, attacker, attackDice,
                defenderIn, defenseDiceIn, callback)
            {
                environment = environmentIn;
                defender = defenderIn;
                defenseDice = defenseDiceIn;
                modifyDefenseCallback = callback;

                var modifications = SimpleAgent.prototype.determineValidModifyDefenseDiceActions.call(this, environment, attacker, attackDice, defender, defenseDice);

                if (modifications.length > 0)
                {
                    var element = React.createElement(CombatUI,
                    {
                        attacker: attacker,
                        attackDice: attackDice,
                        defender: defender,
                        defenseDice: defenseDice,
                        imageBase: imageBase,
                        modifications: modifications,
                        okFunction: finishModifyDefenseDice,
                        phase: Phase.properties[environment.phase()],
                    });
                    ReactDOM.render(element, document.getElementById("inputArea"));
                    window.dispatchEvent(new Event('resize'));

                    // Wait for the user to respond.
                }
                else
                {
                    modifyDefenseCallback();
                }
            };

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
                    agent: self,
                    callback: finishPlanningAction,
                    environment: environment,
                    imageBase: imageBase,
                    tokens: tokens,
                });
                ReactDOM.render(element, document.getElementById("inputArea"));
                window.dispatchEvent(new Event('resize'));

                // Wait for the user to respond.
            };

            this.getShipAction = function(environment, adjudicator, token, callback, shipActions0)
            {
                InputValidator.validateNotNull("environment", environment);
                InputValidator.validateNotNull("adjudicator", adjudicator);
                InputValidator.validateNotNull("token", token);

                shipActionCallback = callback;

                var shipActions = SimpleAgent.prototype.determineValidShipActions.call(this, environment, adjudicator, token, shipActions0);

                if (shipActions.length > 0)
                {
                    var element = React.createElement(ShipActionChooser,
                    {
                        callback: finishShipAction,
                        imageBase: imageBase,
                        shipActions: shipActions,
                        token: token,
                    });
                    ReactDOM.render(element, document.getElementById("inputArea"));
                    window.dispatchEvent(new Event('resize'));

                    // Wait for the user to respond.
                }
                else
                {
                    setTimeout(finishShipAction, 1000);
                }
            };

            function finishChooseAbility(ability, isAccepted)
            {
                LOGGER.trace("HumanAgent.finishChooseAbility() start");

                // Handle the user response.
                var element = document.getElementById("inputArea");
                element.innerHTML = "";
                window.dispatchEvent(new Event('resize'));
                LOGGER.trace("HumanAgent.finishChooseAbility() end");

                chooseAbilityCallback(ability, isAccepted);
            }

            function finishDealDamage()
            {
                LOGGER.trace("HumanAgent.finishDealDamage() start");

                // Handle the user response.
                var element = document.getElementById("inputArea");
                element.innerHTML = "";
                window.dispatchEvent(new Event('resize'));
                LOGGER.trace("HumanAgent.finishDealDamage() end");

                dealDamageCallback();
            }

            function finishDecloakAction(token, decloakAction)
            {
                LOGGER.trace("HumanAgent.finishDecloakAction() start");
                LOGGER.debug("decloakAction = " + decloakAction);
                LOGGER.debug("decloakAction.maneuverKey() = " + decloakAction.maneuverKey());

                var answer = new ManeuverAction(environment, attacker, decloakAction.maneuverKey());

                // Handle the user response.
                var element = document.getElementById("inputArea");
                element.innerHTML = "";
                window.dispatchEvent(new Event('resize'));
                LOGGER.trace("HumanAgent.finishDecloakAction() end");

                decloakActionCallback(token, answer);
            }

            function finishModifyAttackDice(modification)
            {
                var answer;

                if (modification && modification !== null && modification !== "null")
                {
                    answer = modification;
                }

                modifyAttackCallback(answer);
            }

            function finishModifyDefenseDice(modification)
            {
                var answer;

                if (modification && modification !== null && modification !== "null")
                {
                    answer = modification;
                }

                modifyDefenseCallback(answer);
            }

            function finishPlanningAction(tokenToManeuver)
            {
                LOGGER.trace("HumanAgent.finishPlanningAction() start");

                // Handle the user response.
                var element = document.getElementById("inputArea");
                element.innerHTML = "";
                window.dispatchEvent(new Event('resize'));
                LOGGER.trace("HumanAgent.finishPlanningAction() end");

                planningCallback(tokenToManeuver);
            }

            function finishShipAction(shipAction)
            {
                LOGGER.trace("HumanAgent.finishShipAction() start");

                // Handle the user response.
                var element = document.getElementById("inputArea");
                element.innerHTML = "";
                window.dispatchEvent(new Event('resize'));
                LOGGER.trace("HumanAgent.finishShipAction() end");

                shipActionCallback(shipAction);
            }

            function finishWeaponAndDefender(weapon, defender)
            {
                LOGGER.trace("HumanAgent.finishWeaponAndDefender() start");

                // Handle the user response.
                var element = document.getElementById("inputArea");
                element.innerHTML = "";
                window.dispatchEvent(new Event('resize'));
                LOGGER.trace("HumanAgent.finishWeaponAndDefender() end");

                weaponAndDefenderCallback(weapon, defender);
            }
        }

        HumanAgent.prototype.toString = function()
        {
            return this.name() + ", HumanAgent, " + this.teamKey();
        };

        return HumanAgent;
    });
