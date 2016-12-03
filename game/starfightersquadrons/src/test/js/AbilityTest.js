define(["Ability", "Event", "UpgradeCard", "process/UpgradeAbility0"],
    function(Ability, Event, UpgradeCard, UpgradeAbility0)
    {
        "use strict";
        QUnit.module("Ability");

        QUnit.test("Ability properties", function(assert)
        {
            // Setup.
            var source = UpgradeCard;
            var sourceKey = UpgradeCard.RECON_SPECIALIST;
            var type = UpgradeAbility0;
            var eventOrPhaseKey = Event.FOCUS_ACTION_PERFORMED;
            var ability = new Ability(source, sourceKey, type, eventOrPhaseKey);

            // Run / Verify.
            assert.equal(ability.source(), source);
            assert.equal(ability.sourceKey(), sourceKey);
            assert.equal(ability.type(), type);
            assert.equal(ability.eventOrPhaseKey(), eventOrPhaseKey);

            assert.ok(ability.sourceObject());
            assert.ok(ability.ability());
            assert.ok(ability.condition());
            assert.ok(ability.consequent());
        });

        QUnit.test("toString()", function(assert)
        {
            // Setup.
            var ability = new Ability(UpgradeCard, UpgradeCard.RECON_SPECIALIST, UpgradeAbility0, Event.FOCUS_ACTION_PERFORMED);

            // Run.
            var result = ability.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Ability source=UpgradeCard,sourceKey=reconSpecialist,type=UpgradeAbility0,eventOrPhaseKey=focusActionPerformed");
        });
    });
