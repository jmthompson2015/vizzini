define(["DamageCardTrait"],
    function(DamageCardTrait)
    {
        "use strict";
        var DamageCardV2 = {
            BLINDED_PILOT: "blindedPilotV2",
            CONSOLE_FIRE: "consoleFireV2",
            DAMAGED_COCKPIT: "damagedCockpitV2",
            DAMAGED_ENGINE: "damagedEngineV2",
            DAMAGED_SENSOR_ARRAY: "damagedSensorArrayV2",
            DIRECT_HIT: "directHitV2",
            LOOSE_STABILIZER: "looseStablizerV2",
            MAJOR_EXPLOSION: "majorExplosionV2",
            MAJOR_HULL_BREACH: "majorHullBreachV2",
            SHAKEN_PILOT: "shakenPilotV2",
            STRUCTURAL_DAMAGE: "structuralDamageV2",
            STUNNED_PILOT: "stunnedPilotV2",
            THRUST_CONTROL_FIRE: "thrustControlFireV2",
            WEAPONS_FAILURE: "weaponsFailureV2",
            properties:
            {
                "blindedPilotV2":
                {
                    name: "Blinded Pilot",
                    trait: DamageCardTrait.PILOT,
                    description: "You cannot perform attacks. After your next opportunity to attack (even if there was no target for an attack), flip this card facedown.",
                    value: "blindedPilotV2",
                },
                "consoleFireV2":
                {
                    name: "Console Fire",
                    trait: DamageCardTrait.SHIP,
                    description: "At the start of each Combat phase, roll 1 attack die. On a Hit result, suffer 1 damage.",
                    hasAction: true,
                    actionDescription: "Flip this card facedown.",
                    isImplemented: true,
                    value: "consoleFireV2",
                },
                "damagedCockpitV2":
                {
                    name: "Damaged Cockpit",
                    trait: DamageCardTrait.PILOT,
                    description: "Starting the round after you receive this card, treat your pilot skill value as \"0.\"",
                    value: "damagedCockpitV2",
                },
                "damagedEngineV2":
                {
                    name: "Damaged Engine",
                    trait: DamageCardTrait.SHIP,
                    description: "Treat all turn maneuvers (left turn or right turn) as red maneuvers.",
                    isImplemented: true,
                    value: "damagedEngineV2",
                },
                "damagedSensorArrayV2":
                {
                    name: "Damaged Sensor Array",
                    trait: DamageCardTrait.SHIP,
                    description: "You cannot perform any actions except actions listed on Damage cards.",
                    hasAction: true,
                    actionDescription: "Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.",
                    isImplemented: true,
                    value: "damagedSensorArrayV2",
                },
                "directHitV2":
                {
                    name: "Direct Hit!",
                    trait: DamageCardTrait.SHIP,
                    description: "This card counts as 2 damage against your hull.",
                    isImplemented: true,
                    value: "directHitV2",
                },
                "looseStablizerV2":
                {
                    name: "Loose Stabilizer",
                    trait: DamageCardTrait.SHIP,
                    description: "After you execute a white maneuver, receive 1 stress token.",
                    hasAction: true,
                    actionDescription: "Flip this card facedown.",
                    isImplemented: true,
                    value: "looseStablizerV2",
                },
                "majorExplosionV2":
                {
                    name: "Major Explosion",
                    trait: DamageCardTrait.SHIP,
                    description: "Roll 1 attack die. On a Hit result, suffer 1 critical damage. Then flip this card facedown.",
                    isImplemented: true,
                    value: "majorExplosionV2",
                },
                "majorHullBreachV2":
                {
                    name: "Major Hull Breach",
                    trait: DamageCardTrait.SHIP,
                    description: "Starting the round after you receive this card, all Damage cards dealt to you are dealt faceup.",
                    hasAction: true,
                    actionDescription: "Flip this card facedown.",
                    value: "majorHullBreachV2",
                },
                "shakenPilotV2":
                {
                    name: "Shaken Pilot",
                    trait: DamageCardTrait.PILOT,
                    description: "During the Planning phase, you cannot be assigned straight maneuvers. When you reveal a maneuver, flip this card facedown.",
                    isImplemented: true,
                    value: "shakenPilotV2",
                },
                "structuralDamageV2":
                {
                    name: "Structural Damage",
                    trait: DamageCardTrait.SHIP,
                    description: "Reduce your agility value by 1 (to a minimum of \"0\").",
                    agilityValue: -1,
                    hasAction: true,
                    actionDescription: "Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.",
                    isImplemented: true,
                    value: "structuralDamageV2",
                },
                "stunnedPilotV2":
                {
                    name: "Stunned Pilot",
                    trait: DamageCardTrait.PILOT,
                    description: "After you execute a maneuver, if you are touching another ship or overlapping an obstacle token, suffer 1 damage.",
                    value: "stunnedPilotV2",
                },
                "thrustControlFireV2":
                {
                    name: "Thrust Control Fire",
                    trait: DamageCardTrait.SHIP,
                    description: "Receive 1 stress token. Then flip this card facedown.",
                    isImplemented: true,
                    value: "thrustControlFireV2",
                },
                "weaponsFailureV2":
                {
                    name: "Weapons Failure",
                    trait: DamageCardTrait.SHIP,
                    description: "When attacking, roll 1 fewer attack die.",
                    hasAction: true,
                    actionDescription: "Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.",
                    isImplemented: true,
                    value: "weaponsFailureV2",
                },
            },

            values: function()
            {
                return Object.getOwnPropertyNames(DamageCardV2.properties);
            },
        };

        DamageCardV2.createDeck = function()
        {
            var answer = [];

            // There are two of each, except seven of Direct Hit!
            var values = DamageCardV2.values();

            values.forEach(function(damage)
            {
                answer.push(damage);
                answer.push(damage);
            });

            for (var i = 0; i < 5; i++)
            {
                answer.push(DamageCardV2.DIRECT_HIT);
            }

            answer.vizziniShuffle();

            return answer;
        };

        DamageCardV2.toString = function()
        {
            return "DamageCardV2";
        };

        return DamageCardV2;
    });
