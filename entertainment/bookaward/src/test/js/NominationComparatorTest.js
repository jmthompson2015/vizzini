define(["Award", "Nomination", "NominationComparator"], function(Award, Nomination, NominationComparator)
{
    "use strict";
    QUnit.module("NominationComparator");

    QUnit.test("compare()", function(assert)
    {
        // Setup.
        var nomination0 = createNomination0();
        var nomination1 = createNomination1();
        var nomination2 = createNomination1();
        var nomination3 = createNomination3();
        var nomination4 = createNomination4();

        // Run / Verify.
        assert.equal(NominationComparator.compare(nomination0, nomination0), 0);
        assert.equal(NominationComparator.compare(nomination0, nomination1), -1);
        assert.equal(NominationComparator.compare(nomination0, nomination2), -1);
        assert.equal(NominationComparator.compare(nomination0, nomination3), -1);
        assert.equal(NominationComparator.compare(nomination0, nomination4), -1);

        assert.equal(NominationComparator.compare(nomination1, nomination0), 1);
        assert.equal(NominationComparator.compare(nomination1, nomination1), 0);
        assert.equal(NominationComparator.compare(nomination1, nomination2), 0);
        assert.equal(NominationComparator.compare(nomination1, nomination3), -1);
        assert.equal(NominationComparator.compare(nomination1, nomination4), -1);

        assert.equal(NominationComparator.compare(nomination2, nomination0), 1);
        assert.equal(NominationComparator.compare(nomination2, nomination1), 0);
        assert.equal(NominationComparator.compare(nomination2, nomination2), 0);
        assert.equal(NominationComparator.compare(nomination2, nomination3), -1);
        assert.equal(NominationComparator.compare(nomination2, nomination4), -1);

        assert.equal(NominationComparator.compare(nomination3, nomination0), 1);
        assert.equal(NominationComparator.compare(nomination3, nomination1), 1);
        assert.equal(NominationComparator.compare(nomination3, nomination2), 1);
        assert.equal(NominationComparator.compare(nomination3, nomination3), 0);
        assert.equal(NominationComparator.compare(nomination3, nomination4), -1);

        assert.equal(NominationComparator.compare(nomination4, nomination0), 1);
        assert.equal(NominationComparator.compare(nomination4, nomination1), 1);
        assert.equal(NominationComparator.compare(nomination4, nomination2), 1);
        assert.equal(NominationComparator.compare(nomination4, nomination3), 1);
        assert.equal(NominationComparator.compare(nomination4, nomination4), 0);
    });

    QUnit.test("equals()", function(assert)
    {
        // Setup.
        var nomination0 = createNomination0();
        var nomination1 = createNomination1();
        var nomination2 = createNomination1();
        var nomination3 = createNomination3();
        var nomination4 = createNomination4();

        // Run / Verify.
        assert.equal(NominationComparator.equals(nomination0, nomination0), true);
        assert.equal(NominationComparator.equals(nomination0, nomination1), false);
        assert.equal(NominationComparator.equals(nomination0, nomination2), false);
        assert.equal(NominationComparator.equals(nomination0, nomination3), false);
        assert.equal(NominationComparator.equals(nomination0, nomination4), false);

        assert.equal(NominationComparator.equals(nomination1, nomination0), false);
        assert.equal(NominationComparator.equals(nomination1, nomination1), true);
        assert.equal(NominationComparator.equals(nomination1, nomination2), true);
        assert.equal(NominationComparator.equals(nomination1, nomination3), false);
        assert.equal(NominationComparator.equals(nomination1, nomination4), false);

        assert.equal(NominationComparator.equals(nomination2, nomination0), false);
        assert.equal(NominationComparator.equals(nomination2, nomination1), true);
        assert.equal(NominationComparator.equals(nomination2, nomination2), true);
        assert.equal(NominationComparator.equals(nomination2, nomination3), false);
        assert.equal(NominationComparator.equals(nomination2, nomination4), false);

        assert.equal(NominationComparator.equals(nomination3, nomination0), false);
        assert.equal(NominationComparator.equals(nomination3, nomination1), false);
        assert.equal(NominationComparator.equals(nomination3, nomination2), false);
        assert.equal(NominationComparator.equals(nomination3, nomination3), true);
        assert.equal(NominationComparator.equals(nomination3, nomination4), false);

        assert.equal(NominationComparator.equals(nomination4, nomination0), false);
        assert.equal(NominationComparator.equals(nomination4, nomination1), false);
        assert.equal(NominationComparator.equals(nomination4, nomination2), false);
        assert.equal(NominationComparator.equals(nomination4, nomination3), false);
        assert.equal(NominationComparator.equals(nomination4, nomination4), true);
    });

    function createNomination0()
    {
        var awardKey = Award.AGATHA;
        var award = Award.properties[awardKey];
        var categoryKey = award.categories.FIRST;
        var category = award.categories.properties[categoryKey];
        var isWinner = true;

        return new Nomination(award, category, 2014, isWinner);
    }

    function createNomination1()
    {
        var awardKey = Award.AGATHA;
        var award = Award.properties[awardKey];
        var categoryKey = award.categories.FIRST;
        var category = award.categories.properties[categoryKey];

        return new Nomination(award, category, 2014);
    }

    function createNomination3()
    {
        var awardKey = Award.BARRY;
        var award = Award.properties[awardKey];
        var categoryKey = award.categories.FIRST;
        var category = award.categories.properties[categoryKey];

        return new Nomination(award, category, 2015);
    }

    function createNomination4()
    {
        var awardKey = Award.BARRY;
        var award = Award.properties[awardKey];
        var categoryKey = award.categories.FIRST;
        var category = award.categories.properties[categoryKey];

        return new Nomination(award, category, 2016);
    }
});
