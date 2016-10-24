define(["UpgradeRestriction", "UpgradeType", "upgradestats/Action", "upgradestats/EntityFilter", "upgradestats/InitialState", "upgradestats/RangeFilter", "upgradestats/Reducer"],
    function(UpgradeRestriction, UpgradeType, Action, EntityFilter, InitialState, RangeFilter, Reducer)
    {
        "use strict";
        QUnit.module("Reducer");

        QUnit.test("filterUpgradeData()", function(assert)
        {
            // Setup.
            var upgradeData = [];
            upgradeData.push(
            {
                typeKey: UpgradeType.ASTROMECH,
                squadPointCost: 5,
            });
            upgradeData.push(
            {
                typeKey: UpgradeType.ASTROMECH,
                squadPointCost: 2,
            });
            upgradeData.push(
            {
                typeKey: UpgradeType.CANNON,
                squadPointCost: 5,
            });
            var filters = createFilters1();

            // Run.
            var result = Reducer.filterUpgradeData(upgradeData, filters);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 1);
        });

        QUnit.test("passes()", function(assert)
        {
            // Setup.
            var filters = createFilters1();

            // Run / Verify.
            assert.ok(Reducer.passes(
            {
                typeKey: UpgradeType.ASTROMECH,
                squadPointCost: 5,
            }, filters));
            assert.ok(!Reducer.passes(
            {
                typeKey: UpgradeType.ASTROMECH,
                squadPointCost: 2,
            }, filters));
            assert.ok(!Reducer.passes(
            {
                typeKey: UpgradeType.CANNON,
                squadPointCost: 5,
            }, filters));
        });

        QUnit.test("passes() restriction", function(assert)
        {
            // Setup.
            var filters = createFilters2();

            // Run / Verify.
            assert.ok(Reducer.passes(
            {
                restrictionKeys: [UpgradeRestriction.A_WING_ONLY],
            }, filters));
            assert.ok(Reducer.passes(
            {
                restrictionKeys: [UpgradeRestriction.REBEL_ONLY],
            }, filters));
            assert.ok(!Reducer.passes(
            {
                restrictionKeys: [UpgradeRestriction.B_WING_ONLY],
            }, filters));
            assert.ok(Reducer.passes(
            {
                restrictionKeys: [UpgradeRestriction.A_WING_ONLY, UpgradeRestriction.REBEL_ONLY],
            }, filters));
            assert.ok(Reducer.passes(
            {
                restrictionKeys: [UpgradeRestriction.A_WING_ONLY, UpgradeRestriction.IMPERIAL_ONLY],
            }, filters));
            assert.ok(Reducer.passes(
            {
                restrictionKeys: [UpgradeRestriction.A_WING_ONLY, UpgradeRestriction.IMPERIAL_ONLY],
            },
            {
                restrictionKeys: new EntityFilter("restrictionKeys", []),
            }));
        });

        QUnit.test("removeFilters()", function(assert)
        {
            // Setup.
            var state = new InitialState();
            assert.equal(Object.getOwnPropertyNames(state.filters).length, 7);
            assert.equal(state.upgradeData.length, 238);
            assert.equal(state.filteredUpgradeData.length, 238);
            var action = Action.removeFilters();

            // Run.
            var result = Reducer.root(state, action);

            // Verify.
            assert.ok(result);
            assert.equal(Object.getOwnPropertyNames(state.filters).length, 7);
            assert.equal(result.upgradeData.length, 238);
            assert.equal(result.filteredUpgradeData.length, 238);
        });

        QUnit.test("setDefaultFilters()", function(assert)
        {
            // Setup.
            var state = new InitialState();
            assert.equal(Object.getOwnPropertyNames(state.filters).length, 7);
            assert.equal(state.upgradeData.length, 238);
            assert.equal(state.filteredUpgradeData.length, 238);
            var action = Action.setDefaultFilters();

            // Run.
            var result = Reducer.root(state, action);

            // Verify.
            assert.ok(result);
            assert.equal(Object.getOwnPropertyNames(state.filters).length, 7);
            assert.equal(result.upgradeData.length, 238);
            assert.equal(result.filteredUpgradeData.length, 238);

            // Cleanup.
            localStorage.removeItem("filters");
        });

        QUnit.test("setFilters()", function(assert)
        {
            // Setup.
            var state = new InitialState();
            assert.equal(Object.getOwnPropertyNames(state.filters).length, 7);
            assert.equal(state.upgradeData.length, 238);
            assert.equal(state.filteredUpgradeData.length, 238);
            var filters = createFilters1();
            var action = Action.setFilters(filters);

            // Run.
            var result = Reducer.root(state, action);

            // Verify.
            assert.ok(result);
            assert.ok(result.filters.typeKey);
            assert.ok(result.filters.squadPointCost);
            assert.equal(Object.getOwnPropertyNames(state.filters).length, 7);
            assert.equal(result.upgradeData.length, 238);
            assert.equal(result.filteredUpgradeData.length, 10);

            // Cleanup.
            localStorage.removeItem("filters");
        });

        function createEntityFilter1()
        {
            var columnKey = "typeKey";
            var values = [UpgradeType.ASTROMECH, UpgradeType.BOMB];

            return new EntityFilter(columnKey, values);
        }

        function createEntityFilter2()
        {
            var columnKey = "restrictionKeys";
            var values = [UpgradeRestriction.A_WING_ONLY, UpgradeRestriction.REBEL_ONLY];

            return new EntityFilter(columnKey, values);
        }

        function createFilters1()
        {
            var filters = {};
            var filter0 = createEntityFilter1();
            var filter1 = createRangeFilter();
            filters[filter0.columnKey()] = filter0;
            filters[filter1.columnKey()] = filter1;

            return filters;
        }

        function createFilters2()
        {
            var filters = {};
            var filter0 = createEntityFilter2();
            filters[filter0.columnKey()] = filter0;

            return filters;
        }

        function createRangeFilter()
        {
            var columnKey = "squadPointCost";
            var isMinEnabled = true;
            var minValue = 3;
            var isMaxEnabled = false;
            var maxValue = 10;

            return new RangeFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);
        }
    });
