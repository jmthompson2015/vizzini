define(["Pilot", "UpgradeRestriction"], function(Pilot, UpgradeRestriction)
{
    "use strict";
    QUnit.module("UpgradeRestriction");

    QUnit.test("UpgradeRestriction", function(assert)
    {
        var properties = Object.getOwnPropertyNames(UpgradeRestriction);
        var values = UpgradeRestriction.values();
        assert.equal(properties.length - 1 - // properties
            1 - // passes
            1, // values
            values.length);
    });

    QUnit.test("UpgradeRestriction properties A-Wing only", function(assert)
    {
        var restriction = UpgradeRestriction.A_WING_ONLY;
        var props = UpgradeRestriction.properties[restriction];

        assert.equal(props.name, "A-Wing only.");
        assert.ok(!props.passes(Pilot.ACADEMY_PILOT));
        assert.ok(props.passes(Pilot.ARVEL_CRYNYD));
    });

    QUnit.test("UpgradeRestriction properties Imperial only", function(assert)
    {
        var restriction = UpgradeRestriction.IMPERIAL_ONLY;
        var props = UpgradeRestriction.properties[restriction];

        assert.equal(props.name, "Imperial only.");
        assert.ok(props.passes(Pilot.ACADEMY_PILOT));
        assert.ok(!props.passes(Pilot.ARVEL_CRYNYD));
    });

    QUnit.test("UpgradeRestriction properties Large ship only", function(assert)
    {
        var restriction = UpgradeRestriction.LARGE_SHIP_ONLY;
        var props = UpgradeRestriction.properties[restriction];

        assert.equal(props.name, "Large ship only.");
        assert.ok(!props.passes(Pilot.ACADEMY_PILOT));
        assert.ok(props.passes(Pilot.BOBA_FETT_IMPERIAL));
    });

    QUnit.test("UpgradeRestriction properties Pilot Skill above 3", function(assert)
    {
        var restriction = UpgradeRestriction.PILOT_SKILL_ABOVE_3;
        var props = UpgradeRestriction.properties[restriction];

        assert.equal(props.name, "Pilot Skill above \"3\".");
        assert.ok(!props.passes(Pilot.ACADEMY_PILOT));
        assert.ok(props.passes(Pilot.BOBA_FETT_IMPERIAL));
    });

    QUnit.test("passes()", function(assert)
    {
        assert.ok(UpgradeRestriction.passes([UpgradeRestriction.IMPERIAL_ONLY], Pilot.DARTH_VADER));
        assert.ok(!UpgradeRestriction.passes([UpgradeRestriction.IMPERIAL_ONLY], Pilot.LUKE_SKYWALKER));

        assert.ok(!UpgradeRestriction.passes([UpgradeRestriction.REBEL_ONLY], Pilot.DARTH_VADER));
        assert.ok(UpgradeRestriction.passes([UpgradeRestriction.REBEL_ONLY], Pilot.LUKE_SKYWALKER));

        assert.ok(UpgradeRestriction.passes(
                [UpgradeRestriction.IMPERIAL_ONLY, UpgradeRestriction.TIE_INTERCEPTOR_ONLY],
            Pilot.ALPHA_SQUADRON_PILOT));
        assert
            .ok(!UpgradeRestriction.passes(
                        [UpgradeRestriction.REBEL_ONLY, UpgradeRestriction.TIE_INTERCEPTOR_ONLY],
                Pilot.ALPHA_SQUADRON_PILOT));
        assert.ok(!UpgradeRestriction.passes([UpgradeRestriction.IMPERIAL_ONLY, UpgradeRestriction.Y_WING_ONLY],
            Pilot.ALPHA_SQUADRON_PILOT));
        assert.ok(!UpgradeRestriction.passes([UpgradeRestriction.REBEL_ONLY, UpgradeRestriction.Y_WING_ONLY],
            Pilot.ALPHA_SQUADRON_PILOT));

        assert.ok(!UpgradeRestriction.passes([UpgradeRestriction.IMPERIAL_ONLY,
                UpgradeRestriction.TIE_INTERCEPTOR_ONLY], Pilot.DUTCH_VANDER));
        assert.ok(!UpgradeRestriction.passes(
                [UpgradeRestriction.REBEL_ONLY, UpgradeRestriction.TIE_INTERCEPTOR_ONLY], Pilot.DUTCH_VANDER));
        assert.ok(!UpgradeRestriction.passes([UpgradeRestriction.IMPERIAL_ONLY, UpgradeRestriction.Y_WING_ONLY],
            Pilot.DUTCH_VANDER));
        assert.ok(UpgradeRestriction.passes([UpgradeRestriction.REBEL_ONLY, UpgradeRestriction.Y_WING_ONLY],
            Pilot.DUTCH_VANDER));

        assert.ok(UpgradeRestriction.passes(undefined, Pilot.DUTCH_VANDER));
        assert.ok(UpgradeRestriction.passes([], Pilot.DUTCH_VANDER));
    });

    QUnit.test("passes() TIE only", function(assert)
    {
        var restriction = UpgradeRestriction.properties[UpgradeRestriction.TIE_ONLY];

        assert.ok(restriction.passes(Pilot.DARTH_VADER)); // TIE Advanced.
        assert.ok(restriction.passes(Pilot.CAPTAIN_JONUS)); // TIE Bomber.
        assert.ok(restriction.passes(Pilot.COLONEL_VESSERY)); // TIE Defender.
        assert.ok(restriction.passes(Pilot.ACADEMY_PILOT)); // TIE Fighter.
        assert.ok(restriction.passes(Pilot.EPSILON_ACE)); // TIE/fo Fighter.
        assert.ok(restriction.passes(Pilot.ALPHA_SQUADRON_PILOT)); // TIE Interceptor.
        assert.ok(restriction.passes(Pilot.ECHO)); // TIE Phantom.
        assert.ok(restriction.passes(Pilot.BLACK_EIGHT_SQ_PILOT)); // TIE Punisher.

        assert.ok(!restriction.passes(Pilot.AIREN_CRACKEN));
        assert.ok(!restriction.passes(Pilot.ARVEL_CRYNYD));
        assert.ok(!restriction.passes(Pilot.BANDIT_SQUADRON_PILOT));
        assert.ok(!restriction.passes(Pilot.LUKE_SKYWALKER));
    });

    QUnit.test("passes() X-Wing only", function(assert)
    {
        var restriction = UpgradeRestriction.properties[UpgradeRestriction.X_WING_ONLY];

        // T-65 X-Wings.
        assert.ok(restriction.passes(Pilot.BIGGS_DARKLIGHTER));
        assert.ok(restriction.passes(Pilot.GARVEN_DREIS));
        assert.ok(restriction.passes(Pilot.HOBBIE_KLIVIAN));
        assert.ok(restriction.passes(Pilot.JEK_PORKINS));
        assert.ok(restriction.passes(Pilot.LUKE_SKYWALKER));
        assert.ok(restriction.passes(Pilot.RED_SQUADRON_PILOT));
        assert.ok(restriction.passes(Pilot.ROOKIE_PILOT));
        assert.ok(restriction.passes(Pilot.TARN_MISON));
        assert.ok(restriction.passes(Pilot.WEDGE_ANTILLES));
        assert.ok(restriction.passes(Pilot.WES_JANSON));

        // T-70 X-Wings.
        assert.ok(restriction.passes(Pilot.BLUE_ACE));
        assert.ok(restriction.passes(Pilot.BLUE_SQUADRON_NOVICE));
        assert.ok(restriction.passes(Pilot.ELLO_ASTY));
        assert.ok(restriction.passes(Pilot.POE_DAMERON));
        assert.ok(restriction.passes(Pilot.RED_ACE));
        assert.ok(restriction.passes(Pilot.RED_SQUADRON_VETERAN));

        // Other.
        assert.ok(!restriction.passes(Pilot.DARTH_VADER));
        assert.ok(!restriction.passes(Pilot.CAPTAIN_JONUS));
        assert.ok(!restriction.passes(Pilot.COLONEL_VESSERY));
        assert.ok(!restriction.passes(Pilot.ACADEMY_PILOT));
    });

    QUnit.test("values()", function(assert)
    {
        var result = UpgradeRestriction.values();
        assert.ok(result);
        var length = 42;
        assert.equal(result.length, length);
        var i = 0;
        assert.equal(result[i++], UpgradeRestriction.A_WING_ONLY);
        assert.equal(result[i++], UpgradeRestriction.AGGRESSOR_ONLY);
        assert.equal(result[i++], UpgradeRestriction.ARC_170_ONLY);
        assert.equal(result[i++], UpgradeRestriction.B_WING_ONLY);
        assert.equal(result[i++], UpgradeRestriction.CR90_ONLY);
        assert.equal(result[i++], UpgradeRestriction.FIRESPRAY_31_ONLY);
        assert.equal(result[i++], UpgradeRestriction.G_1A_STARFIGHTER_ONLY);
        assert.equal(result[i++], UpgradeRestriction.GOZANTI_CLASS_CRUISER_ONLY);
        assert.equal(result[i++], UpgradeRestriction.GR_75_ONLY);
        assert.equal(result[i++], UpgradeRestriction.HUGE_SHIP_ONLY);
        assert.equal(result[i++], UpgradeRestriction.HWK_290_ONLY);
        assert.equal(result[i++], UpgradeRestriction.IMPERIAL_ONLY);
        assert.equal(result[i++], UpgradeRestriction.JUMPMASTER_5000_ONLY);
        assert.equal(result[i++], UpgradeRestriction.LAMBDA_CLASS_SHUTTLE_ONLY);
        assert.equal(result[i++], UpgradeRestriction.LARGE_SHIP_ONLY);
        assert.equal(result[i++], UpgradeRestriction.LIMITED);
        assert.equal(result[i++], UpgradeRestriction.M3_A_INTERCEPTOR_ONLY);
        assert.equal(result[i++], UpgradeRestriction.PILOT_SKILL_ABOVE_1);
        assert.equal(result[i++], UpgradeRestriction.PILOT_SKILL_ABOVE_2);
        assert.equal(result[i++], UpgradeRestriction.PILOT_SKILL_ABOVE_3);
        assert.equal(result[i++], UpgradeRestriction.PILOT_SKILL_ABOVE_4);
        assert.equal(result[i++], UpgradeRestriction.PROTECTORATE_STARFIGHTER_ONLY);
        assert.equal(result[i++], UpgradeRestriction.RAIDER_CLASS_CORVETTE_AFT_SECTION_ONLY);
        assert.equal(result[i++], UpgradeRestriction.REBEL_ONLY);
        assert.equal(result[i++], UpgradeRestriction.SCUM_ONLY);
        assert.equal(result[i++], UpgradeRestriction.SMALL_SHIP_ONLY);
        assert.equal(result[i++], UpgradeRestriction.STAR_VIPER_ONLY);
        assert.equal(result[i++], UpgradeRestriction.TIE_ADVANCED_ONLY);
        assert.equal(result[i++], UpgradeRestriction.TIE_ADVANCED_PROTOTYPE_ONLY);
        assert.equal(result[i++], UpgradeRestriction.TIE_BOMBER_ONLY);
        assert.equal(result[i++], UpgradeRestriction.TIE_DEFENDER_ONLY);
        assert.equal(result[i++], UpgradeRestriction.TIE_INTERCEPTOR_ONLY);
        assert.equal(result[i++], UpgradeRestriction.TIE_ONLY);
        assert.equal(result[i++], UpgradeRestriction.TIE_PHANTOM_ONLY);
        assert.equal(result[i++], UpgradeRestriction.TIE_SF_ONLY);
        assert.equal(result[i++], UpgradeRestriction.VCX_100_ONLY);
        assert.equal(result[i++], UpgradeRestriction.VT_49_DECIMATOR_ONLY);
        assert.equal(result[i++], UpgradeRestriction.X_WING_ONLY);
        assert.equal(result[i++], UpgradeRestriction.YT_1300_ONLY);
        assert.equal(result[i++], UpgradeRestriction.YT_2400_ONLY);
        assert.equal(result[i++], UpgradeRestriction.Y_WING_ONLY);
        assert.equal(result[i++], UpgradeRestriction.YV_666_ONLY);
    });
});
