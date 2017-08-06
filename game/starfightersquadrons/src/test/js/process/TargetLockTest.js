define(["process/EnvironmentFactory", "process/Reducer", "process/TargetLock"],
   function(EnvironmentFactory, Reducer, TargetLock)
   {
      "use strict";
      QUnit.module("TargetLock");

      QUnit.test("TargetLock()", function(assert)
      {
         // Setup.
         //  var store = Redux.createStore(Reducer.root);
         //  var attackerId = 1;
         //  var defenderId = 2;
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0];
         var defender = environment.tokens()[2];

         // Run.
         var result = new TargetLock(store, attacker, defender);

         // Verify.
         assert.ok(result);
         assert.equal(result.attacker(), attacker);
         assert.equal(result.defender(), defender);
         assert.equal(result.id(), "A");
         assert.equal(store.getState().targetLocks.size, 1);
      });

      QUnit.test("attacker()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0];
         var defender = environment.tokens()[2];
         var targetLock = new TargetLock(store, attacker, defender);

         // Run.
         var result = targetLock.attacker();

         // Verify.
         assert.ok(result);
         assert.equal(result, attacker);
      });

      QUnit.test("defender()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0];
         var defender = environment.tokens()[2];
         var targetLock = new TargetLock(store, attacker, defender);

         // Run.
         var result = targetLock.defender();

         // Verify.
         assert.ok(result);
         assert.equal(result, defender);
      });

      QUnit.test("delete()", function(assert)
      {
         // Setup.
         //  var store = Redux.createStore(Reducer.root);
         //  var attackerId = 1;
         //  var defenderId = 2;
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0];
         var defender = environment.tokens()[2];
         var targetLock = new TargetLock(store, attacker, defender);
         assert.equal(store.getState().targetLocks.size, 1);
         assert.equal(store.getState().targetLocks.get(0).get("id"), "A");
         assert.equal(store.getState().targetLocks.get(0).get("attackerId"), attacker.id());
         assert.equal(store.getState().targetLocks.get(0).get("defenderId"), defender.id());

         // Run.
         targetLock.delete();

         // Verify.
         assert.equal(store.getState().targetLocks.size, 0);
      });

      QUnit.test("get()", function(assert)
      {
         // Setup.
         //  var store = Redux.createStore(Reducer.root);
         //  var attackerId = 1;
         //  var defenderId = 2;
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0];
         var defender = environment.tokens()[2];
         var targetLock = new TargetLock(store, attacker, defender);

         // Run.
         var result = TargetLock.get(store, attacker, defender);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), attacker);
         assert.equal(result[0].defender(), defender);
         assert.equal(result[0].id(), "A");
         assert.equal(store.getState().targetLocks.size, 1);
      });

      QUnit.test("get() 2", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var targetLock0 = new TargetLock(store, environment.tokens()[0], environment.tokens()[1]);
         var targetLock1 = new TargetLock(store, environment.tokens()[1], environment.tokens()[2]);
         var targetLock2 = new TargetLock(store, environment.tokens()[2], environment.tokens()[0]);

         // Run.
         var result = TargetLock.get(store, environment.tokens()[0], environment.tokens()[1]);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), environment.tokens()[0]);
         assert.equal(result[0].defender(), environment.tokens()[1]);
         assert.equal(result[0].id(), "A");

         // Run.
         result = TargetLock.get(store, environment.tokens()[1], environment.tokens()[2]);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), environment.tokens()[1]);
         assert.equal(result[0].defender(), environment.tokens()[2]);
         assert.equal(result[0].id(), "B");

         // Run.
         result = TargetLock.get(store, environment.tokens()[2], environment.tokens()[0]);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), environment.tokens()[2]);
         assert.equal(result[0].defender(), environment.tokens()[0]);
         assert.equal(result[0].id(), "C");

         assert.equal(store.getState().targetLocks.size, 3);
      });

      QUnit.test("getByAttacker()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var targetLock0 = new TargetLock(store, environment.tokens()[0], environment.tokens()[1]);
         var targetLock1 = new TargetLock(store, environment.tokens()[1], environment.tokens()[2]);
         var targetLock2 = new TargetLock(store, environment.tokens()[2], environment.tokens()[0]);

         // Run.
         var result = TargetLock.getByAttacker(store, environment.tokens()[0]);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), environment.tokens()[0]);
         assert.equal(result[0].defender(), environment.tokens()[1]);
         assert.equal(result[0].id(), "A");

         // Run.
         result = TargetLock.getByAttacker(store, environment.tokens()[1]);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), environment.tokens()[1]);
         assert.equal(result[0].defender(), environment.tokens()[2]);
         assert.equal(result[0].id(), "B");

         // Run.
         result = TargetLock.getByAttacker(store, environment.tokens()[2]);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), environment.tokens()[2]);
         assert.equal(result[0].defender(), environment.tokens()[0]);
         assert.equal(result[0].id(), "C");

         assert.equal(store.getState().targetLocks.size, 3);
      });

      QUnit.test("getByDefender()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var targetLock0 = new TargetLock(store, environment.tokens()[0], environment.tokens()[1]);
         var targetLock1 = new TargetLock(store, environment.tokens()[1], environment.tokens()[2]);
         var targetLock2 = new TargetLock(store, environment.tokens()[2], environment.tokens()[0]);

         // Run.
         var result = TargetLock.getByDefender(store, environment.tokens()[1]);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), environment.tokens()[0]);
         assert.equal(result[0].defender(), environment.tokens()[1]);
         assert.equal(result[0].id(), "A");

         // Run.
         result = TargetLock.getByDefender(store, environment.tokens()[2]);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), environment.tokens()[1]);
         assert.equal(result[0].defender(), environment.tokens()[2]);
         assert.equal(result[0].id(), "B");

         // Run.
         result = TargetLock.getByDefender(store, environment.tokens()[0]);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].attacker(), environment.tokens()[2]);
         assert.equal(result[0].defender(), environment.tokens()[0]);
         assert.equal(result[0].id(), "C");

         assert.equal(store.getState().targetLocks.size, 3);
      });

      QUnit.test("id()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0];
         var defender = environment.tokens()[2];
         var targetLock = new TargetLock(store, attacker, defender);

         // Run.
         var result = targetLock.id();

         // Verify.
         assert.ok(result);
         assert.equal(result, "A");
      });

      QUnit.test("nextId()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run / Verify.
         assert.equal(TargetLock.nextId(store), "A");
         var i;

         for (i = 0; i < 24; i++)
         {
            TargetLock.nextId(store);
         }

         assert.equal(TargetLock.nextId(store), "Z");
         assert.equal(TargetLock.nextId(store), "AA");

         for (i = 0; i < 24; i++)
         {
            TargetLock.nextId(store);
         }

         assert.equal(TargetLock.nextId(store), "ZZ");
         assert.equal(TargetLock.nextId(store), "A");
      });

      QUnit.test("removeAllTargetLocks()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var targetLock0 = new TargetLock(store, environment.tokens()[0], environment.tokens()[1]);
         var targetLock1 = new TargetLock(store, environment.tokens()[1], environment.tokens()[2]);
         var targetLock2 = new TargetLock(store, environment.tokens()[2], environment.tokens()[0]);
         assert.equal(store.getState().targetLocks.size, 3);

         // Run.
         TargetLock.removeAllTargetLocks(store, environment.tokens()[0]);

         // Verify.
         assert.equal(store.getState().targetLocks.size, 1);
         assert.equal(TargetLock.getByAttacker(store, environment.tokens()[0]).length, 0);
         assert.equal(TargetLock.getByDefender(store, environment.tokens()[0]).length, 0);
      });

      QUnit.test("values()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0];
         var defender = environment.tokens()[2];
         var targetLock = new TargetLock(store, attacker, defender);

         // Run.
         var result = targetLock.values();

         // Verify.
         assert.ok(result);
         assert.equal(result.get("attackerId"), attacker.id());
         assert.equal(result.get("defenderId"), defender.id());
         assert.equal(result.get("id"), "A");
      });
   });
