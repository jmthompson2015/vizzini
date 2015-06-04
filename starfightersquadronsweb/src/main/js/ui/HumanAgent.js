/*
 * Provides a human agent for Starfighter Squadrons.
 */
function HumanAgent(name, team, squadBuilder, imageUtils)
{
    InputValidator.validateNotEmpty("name", name);
    InputValidator.validateNotNull("team", team);
    InputValidator.validateNotNull("squadBuilder", squadBuilder);
    InputValidator.validateNotNull("imageUtils", imageUtils);

    var callback;

    this.buildSquad = function()
    {
        return squadBuilder.buildSquad(this);
    }

    this.chooseWeaponAndDefender = function(environment, adjudicator, attacker,
            callbackIn)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("callback", callbackIn);

        callback = callbackIn;

        var choices = WeaponAndDefenderChooser.createWeaponAndRangeAndTokens(
                environment, attacker);

        if (choices.length > 0)
        {
            React.render(<WeaponAndDefenderChooser
                attacker={attacker}
                choices={choices}
                callback={this.finishWeaponAndDefender} />,
                document.getElementById("inputArea"));
            updateSizes();

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
        HtmlUtilities.removeClass(element, "dialog");
        element.innerHTML = "";
        LOGGER.trace("finishPlanningAction() end");

        callback(planningAction);
    }
    
    this.finishShipAction = function(shipAction)
    {
        LOGGER.trace("finishShipAction() start");
        
        // Handle the user response.
        var element = document.getElementById("inputArea");
        HtmlUtilities.removeClass(element, "dialog");
        element.innerHTML = "";
        LOGGER.trace("finishShipAction() end");
        
        callback(shipAction);
    }

    this.finishWeaponAndDefender = function(weapon, defender)
    {
        LOGGER.trace("finishWeaponAndDefender() start");

        // Handle the user response.
        var element = document.getElementById("inputArea");
        HtmlUtilities.removeClass(element, "dialog");
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
        var planningPanel = new PlanningPanel(environment, adjudicator, this,
                tokens, imageUtils, this.finishPlanningAction);
        var element = document.getElementById("inputArea");
        HtmlUtilities.addClass(element, "dialog");
        element.innerHTML = planningPanel.paintComponent();
        updateSizes();

        // Wait for the user to respond.
    }

    this.getModifyAttackDiceAction = function(environment, adjudicator,
            attacker, attackDice, defender)
    {
        var answer;

        // FIXME

        return answer;
    }

    this.getModifyDefenseDiceAction = function(environment, adjudicator,
            attacker, attackDice, defender, defenseDice)
    {
        var answer;

        // FIXME

        return answer;
    }

    this.getShipAction = function(environment, adjudicator, token, callbackIn)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("token", token);
    
        callback = callbackIn;
    
        var shipActions = token.getShipActions();
    
        React.render(<ShipActionChooser
                token={token} shipActions={shipActions} callback={this.finishShipAction} />,
                document.getElementById("inputArea"));
    
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
}

HumanAgent.prototype.toString = function()
{
    return this.getName() + ", HumanAgent, " + this.getTeam() + ", "
            + this.getSquadBuilder().getName();
}
