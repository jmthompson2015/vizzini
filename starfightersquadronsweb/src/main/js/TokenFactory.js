define([ "DualToken", "Pilot", "Token" ], function(DualToken, Pilot, Token)
{
    "use strict";
    var TokenFactory =
    {
        create: function(store, pilotKey, agent, upgradeKeysFore, upgradeKeysAft)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("pilotKey", pilotKey);
            InputValidator.validateNotNull("agent", agent);

            var pilot = Pilot.properties[pilotKey];

            var answer;

            if (pilot.fore || pilot.aft)
            {
                answer = new DualToken(store, pilotKey, agent, upgradeKeysFore, upgradeKeysAft);
            }
            else
            {
                answer = new Token(store, pilotKey, agent, upgradeKeysFore);
            }

            return answer;
        },
    };

    return TokenFactory;
});
