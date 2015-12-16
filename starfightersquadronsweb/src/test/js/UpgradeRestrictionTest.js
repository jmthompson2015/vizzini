define([ "Pilot", "UpgradeRestriction" ], function(Pilot, UpgradeRestriction)
{
    QUnit.module("UpgradeRestriction");

    QUnit.test("UpgradeRestriction", function(assert)
    {
        var properties = Object.getOwnPropertyNames(UpgradeRestriction);
        var values = UpgradeRestriction.values();
        assert.equal(properties.length - 1 // properties
        - 1 // passes
        - 1, // values
        values.length);
    });

    QUnit.test("values()", function(assert)
    {
        var result = UpgradeRestriction.values();
        assert.ok(result);
        assert.equal(result.length, 22);
        assert.equal(result[0], UpgradeRestriction.A_WING_ONLY);
        assert.equal(result[20], UpgradeRestriction.YT_2400_ONLY);
        assert.equal(result[21], UpgradeRestriction.Y_WING_ONLY);
    });

    QUnit.test("passes()", function(assert)
    {
        assert.ok(UpgradeRestriction.passes([ UpgradeRestriction.IMPERIAL_ONLY ], Pilot.DARTH_VADER));
        assert.ok(!UpgradeRestriction.passes([ UpgradeRestriction.IMPERIAL_ONLY ], Pilot.LUKE_SKYWALKER));

        assert.ok(!UpgradeRestriction.passes([ UpgradeRestriction.REBEL_ONLY ], Pilot.DARTH_VADER));
        assert.ok(UpgradeRestriction.passes([ UpgradeRestriction.REBEL_ONLY ], Pilot.LUKE_SKYWALKER));

        assert.ok(UpgradeRestriction.passes(
                [ UpgradeRestriction.IMPERIAL_ONLY, UpgradeRestriction.TIE_INTERCEPTOR_ONLY ],
                Pilot.ALPHA_SQUADRON_PILOT));
        assert
                .ok(!UpgradeRestriction.passes(
                        [ UpgradeRestriction.REBEL_ONLY, UpgradeRestriction.TIE_INTERCEPTOR_ONLY ],
                        Pilot.ALPHA_SQUADRON_PILOT));
        assert.ok(!UpgradeRestriction.passes([ UpgradeRestriction.IMPERIAL_ONLY, UpgradeRestriction.Y_WING_ONLY ],
                Pilot.ALPHA_SQUADRON_PILOT));
        assert.ok(!UpgradeRestriction.passes([ UpgradeRestriction.REBEL_ONLY, UpgradeRestriction.Y_WING_ONLY ],
                Pilot.ALPHA_SQUADRON_PILOT));

        assert.ok(!UpgradeRestriction.passes([ UpgradeRestriction.IMPERIAL_ONLY,
                UpgradeRestriction.TIE_INTERCEPTOR_ONLY ], Pilot.DUTCH_VANDER));
        assert.ok(!UpgradeRestriction.passes(
                [ UpgradeRestriction.REBEL_ONLY, UpgradeRestriction.TIE_INTERCEPTOR_ONLY ], Pilot.DUTCH_VANDER));
        assert.ok(!UpgradeRestriction.passes([ UpgradeRestriction.IMPERIAL_ONLY, UpgradeRestriction.Y_WING_ONLY ],
                Pilot.DUTCH_VANDER));
        assert.ok(UpgradeRestriction.passes([ UpgradeRestriction.REBEL_ONLY, UpgradeRestriction.Y_WING_ONLY ],
                Pilot.DUTCH_VANDER));

        assert.ok(UpgradeRestriction.passes(undefined, Pilot.DUTCH_VANDER));
        assert.ok(UpgradeRestriction.passes([], Pilot.DUTCH_VANDER));
    });
});
