define(
        [ "Pilot", "UpgradeCard", "UpgradeRestriction", "UpgradeType" ],
        function(Pilot, UpgradeCard, UpgradeRestriction, UpgradeType)
        {
            QUnit.module("UpgradeCard");

            QUnit
                    .test(
                            "UpgradeCard properties Adrenaline Rush",
                            function(assert)
                            {
                                var upgrade = UpgradeCard.ADRENALINE_RUSH;
                                var properties = UpgradeCard.properties[upgrade];
                                assert.equal(properties.name, "Adrenaline Rush");
                                assert.equal(properties.type, UpgradeType.ELITE);
                                assert.ok(!properties.restrictions);
                                assert
                                        .equal(
                                                properties.description,
                                                "When you reveal a red maneuver, you may discard this card to treat that maneuver as a white maneuver until the end of the Activation phase.");
                                assert.equal(properties.squadPointCost, 1);
                                assert.equal(properties.value, "adrenalineRush");
                            });

            QUnit
                    .test(
                            "UpgradeCard properties C-3PO",
                            function(assert)
                            {
                                // Setup.
                                var upgradeCard = UpgradeCard.C_3PO;

                                // Run.
                                var result = UpgradeCard.properties[upgradeCard];

                                // Verify.
                                assert.ok(result);
                                assert.equal(result.name, "C-3PO");
                                assert.equal(result.type, UpgradeType.CREW);
                                assert.ok(result.restrictions);
                                assert.equal(result.restrictions.length, 1);
                                assert.equal(result.restrictions[0], UpgradeRestriction.REBEL_ONLY);
                                assert
                                        .equal(
                                                result.description,
                                                "Once per round, before you roll 1 or more defense dice, you may guess aloud a number of Evade results. If you roll that many Evade results (before modifying dice), add 1 Evade result.");
                                assert.equal(result.squadPointCost, 3);
                                assert.equal(result.hasAction, false);
                                assert.equal(result.value, upgradeCard);
                            });

            QUnit.test("getName()", function(assert)
            {
                assert.equal(UpgradeCard.getName(UpgradeCard.DETERMINATION), "Determination");
                assert.equal(UpgradeCard.getName(UpgradeCard.R2_D2), "\u25CF R2-D2");
            });

            QUnit.test("keys and values", function(assert)
            {
                // Setup.

                // Run.
                var result = UpgradeCard.values();
                var ownPropertyNames = Object.getOwnPropertyNames(UpgradeCard);

                // Verify.
                ownPropertyNames.forEach(function(key)
                {
                    if (key !== "properties" && typeof key !== "function")
                    {
                        assert.ok(UpgradeCard[key], "Missing value for key = " + key);
                    }
                });

                result.forEach(function(value)
                {
                    var p = ownPropertyNames.filter(function(key)
                    {
                        return UpgradeCard[key] === value;
                    });

                    assert.equal(p.length, 1, "Missing key for value = " + value);
                });
            });

            QUnit.test("values()", function(assert)
            {
                // Setup.
                var expected = Object.getOwnPropertyNames(UpgradeCard).length - 1 // properties
                - 1 // getName
                - 3 // values
                ;

                // Run.
                var result = UpgradeCard.values();

                // Verify.
                assert.ok(result);
                assert.equal(result.length, expected);
                assert.equal(result[0], UpgradeCard.A_WING_TEST_PILOT);
                assert.equal(result[144], UpgradeCard.PROTON_ROCKETS);
                assert.equal(result[145], UpgradeCard.PROTON_TORPEDOES);
            });

            QUnit.test("valuesByPilotAndType() Astromech", function(assert)
            {
                // Run.
                var result = UpgradeCard.valuesByPilotAndType(Pilot.LUKE_SKYWALKER, UpgradeType.ASTROMECH);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 12);
                assert.equal(result[0], UpgradeCard.R2_ASTROMECH);
                assert.equal(result[11], UpgradeCard.R7_T1);
            });

            QUnit.test("valuesByPilotAndType() Boba Fett Modification", function(assert)
            {
                // Run.
                var result = UpgradeCard.valuesByPilotAndType(Pilot.BOBA_FETT_IMPERIAL, UpgradeType.MODIFICATION);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 13);
                var i = 0;
                assert.equal(result[i++], UpgradeCard.ANTI_PURSUIT_LASERS);
                assert.equal(result[i++], UpgradeCard.AUTOTHRUSTERS);
                assert.equal(result[i++], UpgradeCard.COMBAT_RETROFIT);
                assert.equal(result[i++], UpgradeCard.COUNTERMEASURES);
                assert.equal(result[i++], UpgradeCard.ENGINE_UPGRADE);
                assert.equal(result[i++], UpgradeCard.EXPERIMENTAL_INTERFACE);
                assert.equal(result[i++], UpgradeCard.HULL_UPGRADE);
                assert.equal(result[i++], UpgradeCard.MUNITIONS_FAILSAFE);
                assert.equal(result[i++], UpgradeCard.SHIELD_UPGRADE);
                assert.equal(result[i++], UpgradeCard.STEALTH_DEVICE);
                assert.equal(result[i++], UpgradeCard.STYGIUM_PARTICLE_ACCELERATOR);
                assert.equal(result[i++], UpgradeCard.TACTICAL_JAMMER);
                assert.equal(result[i++], UpgradeCard.TARGETING_COMPUTER);
            });

            QUnit.test("valuesByPilotAndType() Boba Fett Title", function(assert)
            {
                // Run.
                var result = UpgradeCard.valuesByPilotAndType(Pilot.BOBA_FETT_IMPERIAL, UpgradeType.TITLE);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 2);
                var i = 0;
                assert.equal(result[i++], UpgradeCard.ANDRASTA);
                assert.equal(result[i++], UpgradeCard.SLAVE_I);
            });

            QUnit.test("valuesByPilotAndType() Elite", function(assert)
            {
                // Run.
                var result = UpgradeCard.valuesByPilotAndType(Pilot.DARTH_VADER, UpgradeType.ELITE);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 25);
                var i = 0;
                assert.equal(result[i++], UpgradeCard.ADRENALINE_RUSH);
                assert.equal(result[i++], UpgradeCard.CALCULATION);
                assert.equal(result[i++], UpgradeCard.CRACK_SHOT);
                assert.equal(result[i++], UpgradeCard.DAREDEVIL);
                assert.equal(result[i++], UpgradeCard.DEADEYE);
                assert.equal(result[i++], UpgradeCard.DECOY);
                assert.equal(result[i++], UpgradeCard.DETERMINATION);
                assert.equal(result[i++], UpgradeCard.DRAW_THEIR_FIRE);
                assert.equal(result[i++], UpgradeCard.ELUSIVENESS);
                assert.equal(result[i++], UpgradeCard.EXPERT_HANDLING);
                assert.equal(result[i++], UpgradeCard.EXPOSE);
                assert.equal(result[i++], UpgradeCard.INTIMIDATION);
                assert.equal(result[i++], UpgradeCard.LIGHTNING_REFLEXES);
                assert.equal(result[i++], UpgradeCard.LONE_WOLF);
                assert.equal(result[i++], UpgradeCard.MARKSMANSHIP);
                assert.equal(result[i++], UpgradeCard.OPPORTUNIST);
                assert.equal(result[i++], UpgradeCard.OUTMANEUVER);
                assert.equal(result[i++], UpgradeCard.PREDATOR);
                assert.equal(result[i++], UpgradeCard.PUSH_THE_LIMIT);
                assert.equal(result[i++], UpgradeCard.RUTHLESSNESS);
                assert.equal(result[i++], UpgradeCard.SQUAD_LEADER);
                assert.equal(result[i++], UpgradeCard.STAY_ON_TARGET);
                assert.equal(result[i++], UpgradeCard.SWARM_TACTICS);
                assert.equal(result[i++], UpgradeCard.VETERAN_INSTINCTS);
                assert.equal(result[i++], UpgradeCard.WINGMAN);
            });

            QUnit.test("valuesByType() Astromech", function(assert)
            {
                // Run.
                var result = UpgradeCard.valuesByType(UpgradeType.ASTROMECH);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 12);
                assert.equal(result[0], UpgradeCard.R2_ASTROMECH);
                assert.equal(result[11], UpgradeCard.R7_T1);
            });

            QUnit.test("valuesByType() Elite", function(assert)
            {
                // Run.
                var result = UpgradeCard.valuesByType(UpgradeType.ELITE);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 26);
                assert.equal(result[0], UpgradeCard.ADRENALINE_RUSH);
                assert.equal(result[25], UpgradeCard.WINGMAN);
            });
        });
