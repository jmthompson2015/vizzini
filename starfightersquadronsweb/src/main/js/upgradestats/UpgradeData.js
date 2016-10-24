define(["UpgradeCard"], function(UpgradeCard)
{
    "use strict";
    var UpgradeData = {};

    UpgradeData.createUpgradeData = function(upgrade)
    {
        InputValidator.validateNotNull("upgrade", upgrade);

        var restrictionKeys = (upgrade.restrictions !== undefined ? upgrade.restrictions : []);
        var rangeKeys = (upgrade.ranges !== undefined ? upgrade.ranges : []);
        var isImplemented = (upgrade.isImplemented !== undefined ? upgrade.isImplemented : false);

        return (
        {
            typeKey: upgrade.type,
            name: upgrade.name,
            restrictionKeys: restrictionKeys,
            headerKey: upgrade.header,
            weaponValue: upgrade.weaponValue,
            rangeKeys: rangeKeys,
            firingArcKey: upgrade.firingArcKey,
            description: upgrade.description,
            squadPointCost: upgrade.squadPointCost,
            isImplemented: isImplemented,
        });
    };

    return UpgradeData;
});
