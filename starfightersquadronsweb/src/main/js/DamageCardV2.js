define(
        [ "DamageCardTrait", "ShipState" ],
        function(DamageCardTrait, ShipState)
        {
            "use strict";
            var DamageCardV2 =
            {
                BLINDED_PILOT: "blindedPilot",
                CONSOLE_FIRE: "consoleFire",
                DAMAGED_COCKPIT: "damagedCockpit",
                DAMAGED_ENGINE: "damagedEngine",
                DAMAGED_SENSOR_ARRAY: "damagedSensorArray",
                DIRECT_HIT: "directHit",
                LOOSE_STABILIZER: "looseStablizer",
                MAJOR_EXPLOSION: "majorExplosion",
                MAJOR_HULL_BREACH: "majorHullBreach",
                SHAKEN_PILOT: "shakenPilot",
                STRUCTURAL_DAMAGE: "structuralDamage",
                STUNNED_PILOT: "stunnedPilot",
                THRUST_CONTROL_FIRE: "thrustControlFire",
                WEAPONS_FAILURE: "weaponsFailure",
                properties:
                {
                    "blindedPilot":
                    {
                        name: "Blinded Pilot",
                        trait: DamageCardTrait.PILOT,
                        description: "You cannot perform attacks. After your next opportunity to attack (even if there was no target for an attack), flip this card facedown.",
                        shipState: ShipState.ZERO,
                        value: "blindedPilot",
                    },
                    "consoleFire":
                    {
                        name: "Console Fire",
                        trait: DamageCardTrait.SHIP,
                        description: "At the start of each Combat phase, roll 1 attack die. On a Hit result, suffer 1 damage. Action: Flip this card facedown.",
                        shipState: ShipState.ZERO,
                        hasAction: true,
                        value: "consoleFire",
                    },
                    "damagedCockpit":
                    {
                        name: "Damaged Cockpit",
                        trait: DamageCardTrait.PILOT,
                        description: "Starting the round after you receive this card, treat your pilot skill value as \"0.\"",
                        shipState: ShipState.ZERO,
                        value: "damagedCockpit",
                    },
                    "damagedEngine":
                    {
                        name: "Damaged Engine",
                        trait: DamageCardTrait.SHIP,
                        description: "Treat all turn maneuvers (left turn or right turn) as red maneuvers.",
                        shipState: ShipState.ZERO,
                        value: "damagedEngine",
                    },
                    "damagedSensorArray":
                    {
                        name: "Damaged Sensor Array",
                        trait: DamageCardTrait.SHIP,
                        description: "You cannot perform any actions except actions listed on Damage cards. Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.",
                        shipState: ShipState.ZERO,
                        hasAction: true,
                        value: "damagedSensorArray",
                    },
                    "directHit":
                    {
                        name: "Direct Hit!",
                        trait: DamageCardTrait.SHIP,
                        description: "This card counts as 2 damage against your hull.",
                        shipState: new ShipState(0, 0, 0, -1, 0),
                        value: "directHit",
                    },
                    "looseStablizer":
                    {
                        name: "Loose Stabilizer",
                        trait: DamageCardTrait.SHIP,
                        description: "After you execute a white maneuver, receive 1 stress token. Action: Flip this card facedown.",
                        shipState: ShipState.ZERO,
                        hasAction: true,
                        value: "looseStablizer",
                    },
                    "majorExplosion":
                    {
                        name: "Major Explosion",
                        trait: DamageCardTrait.SHIP,
                        description: "Roll 1 attack die. On a Hit result, suffer 1 critical damage. Then flip this card facedown.",
                        shipState: ShipState.ZERO,
                        value: "majorExplosion",
                    },
                    "majorHullBreach":
                    {
                        name: "Major Hull Breach",
                        trait: DamageCardTrait.SHIP,
                        description: "Starting the round after you receive this card, all Damage cards dealt to you are dealt faceup. Action: Flip this card facedown.",
                        shipState: ShipState.ZERO,
                        hasAction: true,
                        value: "majorHullBreach",
                    },
                    "shakenPilot":
                    {
                        name: "Shaken Pilot",
                        trait: DamageCardTrait.PILOT,
                        description: "During the Planning phase, you cannot be assigned straight maneuvers. When you reveal a maneuver, flip this card facedown.",
                        shipState: ShipState.ZERO,
                        value: "shakenPilot",
                    },
                    "structuralDamage":
                    {
                        name: "Structural Damage",
                        trait: DamageCardTrait.SHIP,
                        description: "Reduce your agility value by 1 (to a minimum of \"0\"). Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.",
                        shipState: new ShipState(0, 0, -1, 0, 0),
                        hasAction: true,
                        value: "structuralDamage",
                    },
                    "stunnedPilot":
                    {
                        name: "Stunned Pilot",
                        trait: DamageCardTrait.PILOT,
                        description: "After you execute a maneuver, if you are touching another ship or overlapping an obstacle token, suffer 1 damage.",
                        shipState: ShipState.ZERO,
                        value: "stunnedPilot",
                    },
                    "thrustControlFire":
                    {
                        name: "Thrust Control Fire",
                        trait: DamageCardTrait.SHIP,
                        description: "Receive 1 stress token. Then flip this card facedown.",
                        shipState: ShipState.ZERO,
                        value: "thrustControlFire",
                    },
                    "weaponsFailure":
                    {
                        name: "Weapons Failure",
                        trait: DamageCardTrait.SHIP,
                        description: "When attacking, roll 1 fewer attack die. Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.",
                        shipState: new ShipState(0, -1, 0, 0, 0),
                        hasAction: true,
                        value: "weaponsFailure",
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

            return DamageCardV2;
        });
