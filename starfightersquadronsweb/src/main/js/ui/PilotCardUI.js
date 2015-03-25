/*
 * Provides a token user interface for Starfighter Squadrons.
 */
function PilotCardUI(tokenIn, imageUtilsIn)
{
    var token = tokenIn;
    var imageUtils = imageUtilsIn;

    this.getToken = function()
    {
        return token;
    }

    this.paintComponent = function()
    {
        LOGGER.trace("PilotCardUI.paintComponent() start");

        var answer = "";

        answer += "<table id='"
        answer += createIdPrefix();
        answer += "pilotCard' class='pilotCard'>";
        answer += "<tr>";
        answer += "<td>";
        answer += createNamePanel();
        answer += "</td>";
        answer += "</tr>";
        answer += "<tr>";
        answer += "<td>";
        answer += createStatsPanel();
        answer += "</td>";
        answer += "</tr>";
        answer += "<tr>";
        answer += "<td>";
        answer += createDamagePanel();
        answer += "</td>";
        answer += "</tr>";
        answer += "<tr>";
        answer += "<td>";
        answer += createTokensPanel();
        answer += "</td>";
        answer += "</tr>";
        answer += "</table>";

        LOGGER.trace("PilotCardUI.paintComponent() end");
        return answer;
    }

    this.updateComponent = function()
    {
        LOGGER.trace("PilotCardUI.updateComponent() start");

        var prefix = createIdPrefix();

        setValue(prefix + "pilotSkillValue", token.getPilotSkillValue());

        setValue(prefix + "primaryWeaponValue", token.getPrimaryWeaponValue());
        setValue(prefix + "agilityValue", token.getAgilityValue());
        setValue(prefix + "hullValue", token.getHullValue());
        setValue(prefix + "shieldValue", token.getShieldValue());

        setValue(prefix + "damageCount", token.getDamageCount());
        setValue(prefix + "criticalDamageCount", token.getCriticalDamageCount());

        setValue(prefix + "tokensPanel", createTokensTable());

        var element = document.getElementById(prefix + ".damageTable");
        if (token.getDamageCount() === 0
                && token.getCriticalDamageCount() === 0)
        {
            HtmlUtilities.addClass(element, "hidden");
        }
        else
        {
            HtmlUtilities.removeClass(element, "hidden");
        }

        LOGGER.trace("PilotCardUI.updateComponent() end");
    }

    function createDamagePanel()
    {
        var prefix = createIdPrefix();

        var answer = "";

        answer += "<div id='damagePanel'>"
        answer += "<table id='";
        answer += prefix;
        answer += ".damageTable' class='damageTable'>";
        answer += "<tr>";
        answer += "<td title='Damage'>";
        answer += imageUtils.createDamageIconString();
        answer += "</td>";
        answer += "<td id='";
        answer += prefix;
        answer += "damageCount' title='Damage'>";
        answer += token.getDamageCount();
        answer += "</td>";
        answer += "<td title='Critical Damage'>";
        answer += imageUtils.createCriticalDamageIconString();
        answer += "</td>";
        answer += "<td id='";
        answer += prefix;
        answer += "criticalDamageCount' title='Critical Damage'>";
        answer += token.getCriticalDamageCount();
        answer += "</td>";
        answer += "</tr>";

        // FIXME: add critical damages area

        answer += "</table>";
        answer += "</div>";

        return answer;
    }

    function createIdPrefix()
    {
        return "token" + token.getId() + ".";
    }

    function createNamePanel()
    {
        var answer = "";

        answer += "<table id='nameTable'>";
        answer += "<tr>";
        answer += "<td id='";
        answer += createIdPrefix();
        answer += "pilotSkillValue' title='Pilot Skill' class='namePanel pilotSkillValue' rowspan='2'>";
        answer += token.getPilotSkillValue();
        answer += "</td>";
        answer += "<td title='Name' class='namePanel'>";
        answer += token.getPilotName();
        answer += "</td>";
        answer += "<td class='namePanel' rowspan='2'>";
        answer += imageUtils.createTeamIconString(token.getTeamName());
        answer += "</td>";
        answer += "</tr>";
        answer += "<tr>";
        answer += "<td title='Ship' class='namePanel'>";
        answer += token.getShipName();
        answer += "</td>";
        answer += "</tr>";
        answer += "</table>";

        return answer;
    }

    function createStatsPanel()
    {
        var prefix = createIdPrefix();

        var answer = "";

        answer += "<table id='statsTable'>";

        answer += "<tr>";
        answer += "<td class='primaryWeaponValue' title='Primary Weapon'>";
        answer += imageUtils.createWeaponIconString();
        answer += "</td>";
        answer += "<td id='";
        answer += prefix;
        answer += "primaryWeaponValue' class='primaryWeaponValue' title='Primary Weapon'>";
        answer += token.getPrimaryWeaponValue();
        answer += "</td>";

        answer += "<td class='agilityValue' title='Agility'>";
        answer += imageUtils.createAgilityIconString();
        answer += "</td>";
        answer += "<td id='";
        answer += prefix;
        answer += "agilityValue' class='agilityValue' title='Agility'>";
        answer += token.getAgilityValue();
        answer += "</td>";

        answer += "<td class='hullValue' title='Hull'>";
        answer += imageUtils.createHullIconString();
        answer += "</td>";
        answer += "<td id='";
        answer += prefix;
        answer += "hullValue' class='hullValue' title='Hull'>";
        answer += token.getHullValue();
        answer += "</td>";

        answer += "<td class='shieldValue' title='Shield'>";
        answer += imageUtils.createShieldIconString();
        answer += "</td>";
        answer += "<td id='";
        answer += prefix;
        answer += "shieldValue' class='shieldValue' title='Shield'>";
        answer += token.getShieldValue();
        answer += "</td>";
        answer += "</tr>";

        answer += "</table>";

        return answer;
    }

    function createTokensPanel()
    {
        var answer = "<div id='";
        answer += createIdPrefix();
        answer += "tokensPanel' class='tokensPanel'>";
        answer += createTokensTable();
        answer += "</div>";

        return answer;
    }

    function createTokensTable()
    {
        var answer = "<table id='tokensTable'><tr>";

        if (token.getCloakCount() > 0)
        {
            answer += "<td>";
            answer += imageUtils.createCloakTokenString(token.getCloakCount());
            answer += "</td>";
        }

        if (token.getEvadeCount() > 0)
        {
            answer += "<td>";
            answer += imageUtils.createEvadeTokenString(token.getEvadeCount());
            answer += "</td>";
        }

        if (token.getFocusCount() > 0)
        {
            answer += "<td>";
            answer += imageUtils.createFocusTokenString(token.getFocusCount());
            answer += "</td>";
        }

        if (token.getIonCount() > 0)
        {
            answer += "<td>";
            answer += imageUtils.createIonTokenString(token.getIonCount());
            answer += "</td>";
        }

        if (token.getShieldCount() > 0)
        {
            answer += "<td>";
            answer += imageUtils
                    .createShieldTokenString(token.getShieldCount());
            answer += "</td>";
        }

        if (token.getStressCount() > 0)
        {
            answer += "<td>";
            answer += imageUtils
                    .createStressTokenString(token.getStressCount());
            answer += "</td>";
        }

        answer += "</tr></table>";

        return answer;
    }

    function setValue(componentId, value)
    {
        var component = document.getElementById(componentId);
        if (!component)
        {
            LOGGER.error("missing component for componentId = " + componentId);
        }
        component.innerHTML = value;
    }
}
