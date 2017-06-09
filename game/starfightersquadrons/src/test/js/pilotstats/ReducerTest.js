define(["Team", "pilotstats/Action", "pilotstats/EntityFilter", "pilotstats/InitialState", "pilotstats/RangeFilter", "pilotstats/Reducer"], function(Team, Action, EntityFilter, InitialState, RangeFilter, Reducer)
{
   "use strict";
   QUnit.module("Reducer");

   QUnit.test("filterPilotData()", function(assert)
   {
      // Setup.
      var pilotData = [];
      pilotData.push(
      {
         factionKey: Team.IMPERIAL,
         pilotSkill: 5,
      });
      pilotData.push(
      {
         factionKey: Team.IMPERIAL,
         pilotSkill: 2,
      });
      pilotData.push(
      {
         factionKey: Team.REBEL,
         pilotSkill: 5,
      });
      var filters = createFilters();

      // Run.
      var result = Reducer.filterPilotData(pilotData, filters);

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 1);
   });

   QUnit.test("passes()", function(assert)
   {
      // Setup.
      var data = {
         factionKey: Team.IMPERIAL,
         pilotSkill: 5,
      };
      var filters = createFilters();

      // Run / Verify.
      assert.ok(Reducer.passes(
      {
         factionKey: Team.IMPERIAL,
         pilotSkill: 5,
      }, filters));
      assert.ok(!Reducer.passes(
      {
         factionKey: Team.IMPERIAL,
         pilotSkill: 2,
      }, filters));
      assert.ok(!Reducer.passes(
      {
         factionKey: Team.REBEL,
         pilotSkill: 5,
      }, filters));
   });

   QUnit.test("removeFilters()", function(assert)
   {
      // Setup.
      var state = new InitialState();
      assert.equal(Object.getOwnPropertyNames(state.filters).length, 15);
      assert.equal(state.pilotData.length, 219);
      assert.equal(state.filteredPilotData.length, 219);
      var action = Action.removeFilters();

      // Run.
      var result = Reducer.root(state, action);

      // Verify.
      assert.ok(result);
      assert.equal(Object.getOwnPropertyNames(state.filters).length, 15);
      assert.equal(result.pilotData.length, 219);
      assert.equal(result.filteredPilotData.length, 219);
   });

   QUnit.test("setDefaultFilters()", function(assert)
   {
      // Setup.
      var state = new InitialState();
      assert.equal(Object.getOwnPropertyNames(state.filters).length, 15);
      assert.equal(state.pilotData.length, 219);
      assert.equal(state.filteredPilotData.length, 219);
      var action = Action.setDefaultFilters();

      // Run.
      var result = Reducer.root(state, action);

      // Verify.
      assert.ok(result);
      assert.equal(Object.getOwnPropertyNames(state.filters).length, 15);
      assert.equal(result.pilotData.length, 219);
      assert.equal(result.filteredPilotData.length, 219);

      // Cleanup.
      localStorage.removeItem("filters");
   });

   QUnit.test("setFilters()", function(assert)
   {
      // Setup.
      var state = new InitialState();
      assert.equal(Object.getOwnPropertyNames(state.filters).length, 15);
      assert.equal(state.pilotData.length, 219);
      assert.equal(state.filteredPilotData.length, 219);
      var filters = createFilters();
      var action = Action.setFilters(filters);

      // Run.
      var result = Reducer.root(state, action);

      // Verify.
      assert.ok(result);
      assert.ok(result.filters.factionKey);
      assert.ok(result.filters.pilotSkill);
      assert.equal(Object.getOwnPropertyNames(state.filters).length, 15);
      assert.equal(result.pilotData.length, 219);
      assert.equal(result.filteredPilotData.length, 52);

      // Cleanup.
      localStorage.removeItem("filters");
   });

   function createEntityFilter()
   {
      var columnKey = "factionKey";
      var values = [Team.FIRST_ORDER, Team.IMPERIAL];

      return new EntityFilter(columnKey, values);
   }

   function createFilters()
   {
      var filters = {};
      var filter0 = createEntityFilter();
      var filter1 = createRangeFilter();
      filters[filter0.columnKey()] = filter0;
      filters[filter1.columnKey()] = filter1;

      return filters;
   }

   function createRangeFilter()
   {
      var columnKey = "pilotSkill";
      var isMinEnabled = true;
      var minValue = 5;
      var isMaxEnabled = false;
      var maxValue = 10;

      return new RangeFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);
   }
});
