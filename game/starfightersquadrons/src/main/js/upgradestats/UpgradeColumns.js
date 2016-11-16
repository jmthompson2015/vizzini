define(function()
{
    "use strict";
    var UpgradeColumns = [
        {
            key: "typeKey",
            label: "Type",
        },
        {
            key: "name",
            label: "Name",
            className: "textCell",
        },
        {
            key: "restrictionKeys",
            label: "Restrictions",
            className: "textCell",
        },
        {
            key: "headerKey",
            label: "Header",
            className: "textCell",
        },
        {
            key: "description",
            label: "Description",
            className: "textCell",
        },
        {
            key: "isImplemented",
            label: "Implemented",
        },
        {
            key: "weaponValue",
            label: "Weapon Value",
            className: "numberCell",
        },
        {
            key: "rangeKeys",
            label: "Ranges",
            className: "rangesCell",
        },
        {
            key: "firingArcKey",
            label: "Firing Arc",
            className: "textCell",
        },
        {
            key: "squadPointCost",
            label: "Squad Point Cost",
            className: "numberCell",
        },
    ];

    return UpgradeColumns;
});
