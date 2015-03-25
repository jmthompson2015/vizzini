/*
 * Provides a user interface to choose a weapon and defender.
 */
function WeaponAndDefenderChooser(attackerIn, choicesIn, callbackIn)
{
    InputValidator.validateNotNull("attackerIn", attackerIn);
    InputValidator.validateNotNull("choicesIn", choicesIn);
    InputValidator.validateNotNull("callbackIn", callbackIn);

    var attacker = attackerIn;
    var choices = choicesIn;
    var callback = callbackIn;

    var selectedWeapon;
    var selectedDefender;

    this.defenderClick = function(tokenId)
    {
        selectedWeapon = findWeapon(tokenId);
        selectedDefender = findDefender(tokenId);
    }

    this.okActionPerformed = function()
    {
        LOGGER.trace("WeaponAndDefenderChooser.okActionPerformed() start");

        var answer =
        {
            weapon: selectedWeapon,
            defender: selectedDefender
        };

        LOGGER.trace("WeaponAndDefenderChooser.okActionPerformed() end");
        callback(answer);
    }

    this.paintComponent = function()
    {
        var answer = "";

        answer += "Combat: Select Weapon and Defender<br/>";
        answer += "<table id='combatTable'>";
        answer += "<tr>";
        answer += "<td id='attackerTitle'>";
        answer += "Attacker: ";
        answer += attacker;
        answer += "</td>";
        answer += "</tr>";

        answer += "<tr>";
        answer += "<td id='weaponAndDefenderChooser'>";

        for (var i = 0; i < choices.length; i++)
        {
            var weaponAndRangeAndTokens = choices[i];
            var weapon = weaponAndRangeAndTokens.weapon;
            var weaponName = weapon.getName();

            answer += "<span class='weaponName'>";
            answer += weaponName;
            answer += "</span><br/>";
            answer += "<div class='weaponPanel'>";

            var rangeAndTokensArray = weaponAndRangeAndTokens.rangeAndTokens;

            for (var j = 0; j < rangeAndTokensArray.length; j++)
            {
                var rangeAndTokens = rangeAndTokensArray[j];
                var range = rangeAndTokens.range;
                var rangeName = Range.properties[range].getDisplayName();

                answer += "Range ";
                answer += rangeName;
                answer += "<br/>";
                answer += "<div class='rangePanel'>";

                var tokens = rangeAndTokens.tokens;

                if (tokens)
                {
                    for (var k = 0; k < tokens.length; k++)
                    {
                        var token = tokens[k];

                        answer += "<input type='radio' onclick=\"WeaponAndDefenderChooser.instance.defenderClick('";
                        answer += token.getId();
                        answer += "');\" name='";
                        answer += weapon.getName();
                        answer += "'>";
                        answer += token;
                        answer += "</input>";
                        answer += "<br/>";
                    }
                }

                answer += "</div>";
            }

            answer += "</div>";
        }

        answer += "</td>";
        answer += "<td class='planningOk'>";
        answer += "<button type='button' onclick='WeaponAndDefenderChooser.instance.okActionPerformed()'>OK</button>";
        answer += "</td>";
        answer += "</tr></table>";

        return answer;
    }

    function findDefender(tokenId)
    {
        var answer;

        for (var i = 0; i < choices.length; i++)
        {
            var weaponAndRangeAndTokens = choices[i];

            var rangeAndTokensArray = weaponAndRangeAndTokens.rangeAndTokens;

            for (var j = 0; j < rangeAndTokensArray.length; j++)
            {
                var rangeAndTokens = rangeAndTokensArray[j];

                var tokens = rangeAndTokens.tokens;

                if (tokens)
                {
                    for (var k = 0; k < tokens.length; k++)
                    {
                        var token = tokens[k];

                        if (token.getId() == tokenId)
                        {
                            answer = token;
                            break;
                        }
                    }
                }
            }
        }

        return answer;
    }

    function findWeapon(tokenId)
    {
        var answer;

        for (var i = 0; i < choices.length; i++)
        {
            var weaponAndRangeAndTokens = choices[i];
            var weapon = weaponAndRangeAndTokens.weapon;

            var rangeAndTokensArray = weaponAndRangeAndTokens.rangeAndTokens;

            for (var j = 0; j < rangeAndTokensArray.length; j++)
            {
                var rangeAndTokens = rangeAndTokensArray[j];

                var tokens = rangeAndTokens.tokens;

                if (tokens)
                {
                    for (var k = 0; k < tokens.length; k++)
                    {
                        var token = tokens[k];

                        if (token.getId() == tokenId)
                        {
                            answer = weapon;
                            break;
                        }
                    }
                }
            }
        }

        return answer;
    }

    WeaponAndDefenderChooser.instance = this;
}

/*
 * @param environment Environment. @param attacker Attacker. @param
 * attackerPosition Attacker position. @param weapon Weapon.
 * 
 * @return a new map of range to defenders.
 */
WeaponAndDefenderChooser.createRangeAndTokens = function(environment, attacker,
        attackerPosition, weapon)
{
    var answer = [];

    for (var i = 0; i < Range.values.length; i++)
    {
        var range = Range.values[i];
        LOGGER.trace("WeaponAndDefenderChooser.createRangeAndTokens() range = "
                + range);
        var rangeDefenders = environment.getTargetableDefendersAtRange(
                attacker, attackerPosition, weapon, range);
        LOGGER
                .trace("WeaponAndDefenderChooser.createRangeAndTokens() rangeDefenders.length = "
                        + rangeDefenders.length);

        if (rangeDefenders.length > 0)
        {
            answer[answer.length] =
            {
                range: range,
                tokens: rangeDefenders
            }
        }
    }

    return answer;
}

/*
 * @param environment Environment. @param attacker Attacker.
 * 
 * @return a new map of weapon to range to defenders.
 */
WeaponAndDefenderChooser.createWeaponAndRangeAndTokens = function(environment,
        attacker)
{
    var answer = [];

    var attackerPosition = environment.getPositionFor(attacker);

    if (attackerPosition != null)
    {
        var primaryWeapon = attacker.getPrimaryWeapon();
        var rangeAndTokens = WeaponAndDefenderChooser.createRangeAndTokens(
                environment, attacker, attackerPosition, primaryWeapon);

        if (rangeAndTokens.length > 0)
        {
            answer[answer.length] =
            {
                weapon: primaryWeapon,
                rangeAndTokens: rangeAndTokens
            }
        }

        var weapons = attacker.getSecondaryWeapons();

        for (var i = 0; i < weapons.length; i++)
        {
            var weapon = weapons[i];
            rangeAndTokens = WeaponAndDefenderChooser.createRangeAndTokens(
                    environment, attacker, attackerPosition, weapon);

            if (rangeAndTokens.length > 0)
            {
                answer[answer.length] =
                {
                    weapon: primaryWeapon,
                    rangeAndTokens: rangeAndTokens
                }
            }
        }
    }

    return answer;
}
