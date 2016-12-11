define(["Phase", "UpgradeHeader"],
    function(Phase, UpgradeHeader)
    {
        "use strict";
        var AbilityData = {};

        AbilityData.createAbilityData = function(ability, type)
        {
            InputValidator.validateNotNull("ability", ability);
            InputValidator.validateNotNull("type", type);

            var description = ability.description;
            var action;
            switch (type)
            {
                case "DamageCard":
                    if (ability.hasAction)
                    {
                        action = "Action: " + ability.actionDescription;
                    }
                    break;
                case "Pilot":
                    if (ability.isFlavorText)
                    {
                        description = undefined;
                    }
                    break;
                case "UpgradeCard":
                    if (ability.header !== undefined)
                    {
                        var header = UpgradeHeader.properties[ability.header];
                        description = undefined;
                        action = header.name + ": " + ability.description;
                    }
                    break;
            }
            var isImplemented = (ability.isImplemented !== undefined ? ability.isImplemented : false);
            var event = determineEvent(ability, description, action);

            return (
            {
                type: type,
                name: ability.name,
                description: description,
                action: action,
                isImplemented: isImplemented,
                event: event,
            });
        };

        var descriptionPatterns = [
            {
                patterns: ["squad point cost", "you may equip", "your action bar gains", /your.*upgrade bar gains/],
                event: "SquadBuilder",
            },
            {
                patterns: ["after acquiring a target lock", /after you acquire.*target lock/],
                event: "Event.targetLockAcquired",
            },
            // {
            //     patterns: [/after performing.*action/, /(after|when) you perform.*action/],
            //     event: "Event.actionPerformed",
            // },
            // {
            //     patterns: ["after you are destroyed", "the first time you would be destroyed", "when you are destroyed"],
            //     event: "Event.shipDestroyed",
            // },
            {
                patterns: [/when performing.*(boost|barrel roll|decloak)/, /when you.*(boost|barrel roll|decloak)/],
                event: "Event.afterExecuteManeuver",
            },
            {
                patterns: [/when you are dealt.*damage card/],
                event: "Event.receiveDamage",
            },
            // {
            //     patterns: [/each time you are assigned.*focus/],
            //     event: "Event.receiveFocus",
            // },
            {
                patterns: ["when you receive a stress token", /each time you are assigned.*stress/],
                event: "Event.receiveStress",
            },
            {
                patterns: ["after you remove a stress token"],
                event: "Event.removeStress",
            },
            // {
            //     patterns: ["after spending a focus token"],
            //     event: "Event.spendFocus",
            // },
            // {
            //     patterns: ["after spending your target lock", "after you spend a target lock"],
            //     event: "Event.spendTargetLock",
            // },
            {
                patterns: ["at the start of the activation phase"],
                event: "Phase.activationStart",
            },
            {
                patterns: [/when you reveal.*maneuver/],
                event: "Phase.activationRevealDial",
            },
            {
                patterns: [/you may execute.*maneuver/],
                event: "Phase.activationSetTemplate",
            },
            {
                patterns: [/treat.*maneuvers.*as (green|white|red) maneuvers/],
                event: "Phase.activationCheckPilotStress",
            },
            {
                patterns: [/after executing.*maneuver/, /after you execute.*maneuver/],
                event: "Phase.activationCleanUp",
            },
            {
                patterns: ["during your \"perform action\" step"],
                event: "Phase.activationPerformAction",
            },
            {
                patterns: ["at the end of the activation phase"],
                event: "Phase.activationEnd",
            },
            {
                patterns: [/at the start of (each|the) combat phase/],
                event: "Phase.combatStart",
            },
            {
                patterns: ["when attacking"],
                event: "Phase.combatModifyAttackDice",
            },
            {
                patterns: ["when defending"],
                event: "Phase.combatModifyDefenseDice",
            },
            {
                patterns: ["after performing an attack", /(after|when) you perform an attack/, "after defending"],
                event: "Phase.combatAfterDealDamage",
            },
            {
                patterns: ["at the end of the combat phase"],
                event: "Phase.combatEnd",
            },
            {
                patterns: ["at the start of the end phase"],
                event: "Phase.endStart",
            },
            {
                patterns: ["at the end of the end phase"],
                event: "Phase.endEnd",
            },
        ];

        function determineEvent(ability, description, action)
        {
            var answer;

            if (ability.header)
            {
                switch (ability.header)
                {
                    case UpgradeHeader.ACTION:
                        answer = "Phase.activationPerformAction";
                        break;
                    case UpgradeHeader.ATTACK:
                    case UpgradeHeader.ATTACK_ENERGY:
                    case UpgradeHeader.ATTACK_FOCUS:
                    case UpgradeHeader.ATTACK_TARGET_LOCK:
                        answer = "Phase.combatStart";
                        break;
                    case UpgradeHeader.ENERGY:
                        answer = "Phase.activationUseEnergy";
                        break;
                }
            }

            var myDescription = (description !== undefined ? description.toLowerCase() : description);

            if (answer === undefined && myDescription)
            {
                for (var i = 0; i < descriptionPatterns.length; i++)
                {
                    var descriptionPattern = descriptionPatterns[i];
                    var patterns = descriptionPattern.patterns;

                    for (var j = 0; j < patterns.length; j++)
                    {
                        var pattern = patterns[j];

                        if (myDescription.indexOf(pattern) >= 0 || (pattern.test && pattern.test(myDescription)))
                        {
                            answer = descriptionPattern.event;
                            break;
                        }
                    }
                }
            }

            return answer;
        }

        return AbilityData;
    });
