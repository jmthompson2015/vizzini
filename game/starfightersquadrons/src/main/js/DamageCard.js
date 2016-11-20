define(["DamageCardTrait"],
    function(DamageCardTrait)
    {
        "use strict";
        var DamageCard = {
            BLINDED_PILOT: "blindedPilot",
            CONSOLE_FIRE: "consoleFire",
            DAMAGED_COCKPIT: "damagedCockpit",
            DAMAGED_ENGINE: "damagedEngine",
            DAMAGED_SENSOR_ARRAY: "damagedSensorArray",
            DIRECT_HIT: "directHit",
            INJURED_PILOT: "injuredPilot",
            MINOR_EXPLOSION: "minorExplosion",
            MINOR_HULL_BREACH: "minorHullBreach",
            MUNITIONS_FAILURE: "munitionsFailure",
            STRUCTURAL_DAMAGE: "structuralDamage",
            STUNNED_PILOT: "stunnedPilot",
            THRUST_CONTROL_FIRE: "thrustControlFire",
            WEAPON_MALFUNCTION: "weaponMalfunction",
            properties:
            {
                "blindedPilot":
                {
                    name: "Blinded Pilot",
                    trait: DamageCardTrait.PILOT,
                    description: "The next time you attack, do not roll any attack dice. Then flip this card facedown.",
                    hasAction: false,
                    value: "blindedPilot",
                },
                "consoleFire":
                {
                    name: "Console Fire",
                    trait: DamageCardTrait.SHIP,
                    description: "At the start of each Combat phase, roll 1 attack die. On a hit result, suffer 1 damage.",
                    hasAction: true,
                    actionDescription: "Flip this card facedown.",
                    value: "consoleFire",
                },
                "damagedCockpit":
                {
                    name: "Damaged Cockpit",
                    trait: DamageCardTrait.PILOT,
                    description: "After the round in which you receive this card, treat your pilot skill value as \"0.\"",
                    hasAction: false,
                    value: "damagedCockpit",
                },
                "damagedEngine":
                {
                    name: "Damaged Engine",
                    trait: DamageCardTrait.SHIP,
                    description: "Treat all turn maneuvers (left turn or right turn) as red maneuvers.",
                    hasAction: false,
                    value: "damagedEngine",
                },
                "damagedSensorArray":
                {
                    name: "Damaged Sensor Array",
                    trait: DamageCardTrait.SHIP,
                    description: "You cannot perform the actions listed in your action bar.",
                    hasAction: true,
                    actionDescription: "Roll 1 attack die. On a hit result, flip this card facedown.",
                    value: "damagedSensorArray",
                },
                "directHit":
                {
                    name: "Direct Hit!",
                    trait: DamageCardTrait.SHIP,
                    description: "This card counts as 2 damage against your hull.",
                    hasAction: false,
                    value: "directHit",
                },
                "injuredPilot":
                {
                    name: "Injured Pilot",
                    trait: DamageCardTrait.PILOT,
                    description: "All players must ignore your pilot ability and all of your Elite Upgrade cards.",
                    hasAction: false,
                    value: "injuredPilot",
                },
                "minorExplosion":
                {
                    name: "Minor Explosion",
                    trait: DamageCardTrait.SHIP,
                    description: "Immediately roll 1 attack die. On a hit result, suffer 1 damage. Then flip this card facedown.",
                    hasAction: false,
                    value: "minorExplosion",
                },
                "minorHullBreach":
                {
                    name: "Minor Hull Breach",
                    trait: DamageCardTrait.SHIP,
                    description: "After executing a red maneuver, roll 1 attack die. On a hit result, suffer 1 damage.",
                    hasAction: false,
                    value: "minorHullBreach",
                },
                "munitionsFailure":
                {
                    name: "Munitions Failure",
                    trait: DamageCardTrait.SHIP,
                    description: "Immediately choose 1 of your secondary weapon Upgrade cards and discard it. Then flip this Damage card facedown.",
                    hasAction: false,
                    value: "munitionsFailure",
                },
                "structuralDamage":
                {
                    name: "Structural Damage",
                    trait: DamageCardTrait.SHIP,
                    description: "Reduce your agility value by 1 (to a minimum of \"0\").",
                    agilityValue: -1,
                    hasAction: true,
                    actionDescription: "Roll 1 attack die. On a hit result, flip this card facedown.",
                    value: "structuralDamage",
                },
                "stunnedPilot":
                {
                    name: "Stunned Pilot",
                    trait: DamageCardTrait.PILOT,
                    description: "After you execute a maneuver that causes you to overlap either another ship or an obstacle token, suffer 1 damage.",
                    hasAction: false,
                    value: "stunnedPilot",
                },
                "thrustControlFire":
                {
                    name: "Thrust Control Fire",
                    trait: DamageCardTrait.SHIP,
                    description: "Immediately receive 1 stress token. Then flip this card facedown.",
                    hasAction: false,
                    value: "thrustControlFire",
                },
                "weaponMalfunction":
                {
                    name: "Weapon Malfunction",
                    trait: DamageCardTrait.SHIP,
                    description: "Reduce your primary weapon value by 1 (to a minimum of \"0\").",
                    primaryWeaponValue: -1,
                    hasAction: true,
                    actionDescription: "Roll 1 attack die. On a hit or critical hit result, flip this card facedown.",
                    value: "weaponMalfunction",
                },
            },

            values: function()
            {
                return Object.getOwnPropertyNames(DamageCard.properties);
            },
        };

        DamageCard.createDeck = function()
        {
            var answer = [];

            // There are two of each, except seven of Direct Hit!
            var values = DamageCard.values();

            values.forEach(function(damage)
            {
                answer.push(damage);
                answer.push(damage);
            });

            for (var i = 0; i < 5; i++)
            {
                answer.push(DamageCard.DIRECT_HIT);
            }

            answer.vizziniShuffle();

            return answer;
        };

        return DamageCard;
    });
