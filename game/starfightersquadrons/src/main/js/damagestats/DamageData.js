define(function()
{
    "use strict";
    var DamageData = {};

    DamageData.createDamageData = function(damage, version)
    {
        InputValidator.validateNotNull("damage", damage);
        InputValidator.validateNotNull("version", version);

        var action = (damage.hasAction !== undefined && damage.hasAction ? damage.actionDescription : undefined);
        var isImplemented = (damage.isImplemented !== undefined ? damage.isImplemented : false);

        return (
        {
            version: version,
            trait: damage.trait,
            name: damage.name,
            action: action,
            description: damage.description,
            isImplemented: isImplemented,
        });
    };

    return DamageData;
});
