define([ "DualToken", "Pilot", "Token" ], function(DualToken, Pilot, Token)
{
    "use strict";
    var TokenFactory =
    {
        create: function(pilotKey, agent, upgradeKeysFore, upgradeKeysAft)
        {
            InputValidator.validateNotNull("pilotKey", pilotKey);
            InputValidator.validateNotNull("agent", agent);

            var pilot = Pilot.properties[pilotKey];

            var answer;

            if (pilot.fore || pilot.aft)
            {
                answer = new DualToken(pilotKey, agent, upgradeKeysFore, upgradeKeysAft);
            }
            else
            {
                answer = new Token(pilotKey, agent, upgradeKeysFore);
            }

            return answer;
        },
    };

    return TokenFactory;
});
