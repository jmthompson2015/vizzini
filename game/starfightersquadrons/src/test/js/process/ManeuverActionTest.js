"use strict";

define(["Maneuver", "Pilot", "Position", "ShipBase", "process/EnvironmentAction", "process/EnvironmentFactory", "process/ManeuverAction", "process/Token"],
   function(Maneuver, Pilot, Position, ShipBase, EnvironmentAction, EnvironmentFactory, ManeuverAction, Token)
   {
      QUnit.module("ManeuverAction");

      QUnit.test("ManeuverAction properties", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var maneuverKey = Maneuver.STRAIGHT_1_EASY;
         var token = environment.tokens()[2]; // X-Wing
         var fromPosition = environment.getPositionFor(token);
         var shipBaseKey = token.pilot().shipTeam.ship.shipBaseKey;

         // Run.
         var result = new ManeuverAction(store, token.id(), maneuverKey);

         // Verify.
         assert.equal(result.store(), store);
         assert.equal(result.tokenId(), token.id());
         assert.equal(result.maneuverKey(), maneuverKey);
         assert.equal(result.isBoost(), false);

         var resultPosition = result.fromPosition();
         assert.equal(resultPosition.x(), fromPosition.x());
         assert.equal(resultPosition.y(), fromPosition.y());
         assert.equal(resultPosition.heading(), fromPosition.heading());
         assert.equal(result.maneuver(), Maneuver.properties[maneuverKey]);
         assert.equal(result.shipBase(), ShipBase.properties[shipBaseKey]);
         assert.ok(result.token().equals(token));
      });

      QUnit.test("doIt() Straight1Easy", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var fromPosition0 = environment.getPositionFor(token);
         var fromPosition = new Position(fromPosition0.x(), fromPosition0.y(), -30);
         environment.moveToken(fromPosition0, fromPosition);
         var maneuverKey = Maneuver.STRAIGHT_1_EASY;
         var maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);

         // Run.
         maneuverAction.doIt();

         // Verify.
         var toPosition = environment.getPositionFor(token);
         assert.ok(toPosition);
         assert.equal(toPosition.x(), fromPosition.x() + 69);
         assert.equal(toPosition.y(), fromPosition.y() - 40);
         assert.equal(toPosition.heading(), 330);
      });

      QUnit.test("doIt() Straight3Standard", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var fromPosition0 = environment.getPositionFor(token);
         var fromPosition = new Position(fromPosition0.x(), fromPosition0.y(), -30);
         environment.moveToken(fromPosition0, fromPosition);
         var maneuverKey = Maneuver.STRAIGHT_3_STANDARD;
         var maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);

         // Run.
         maneuverAction.doIt();

         // Verify.
         var toPosition = environment.getPositionFor(token);
         assert.ok(toPosition);
         assert.equal(toPosition.x(), fromPosition.x() + 139);
         assert.equal(toPosition.y(), fromPosition.y() - 80);
         assert.equal(toPosition.heading(), 330);
      });

      QUnit.test("doIt() Straight3Standard collision", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0]; // TIE Fighter
         var fromPosition00 = environment.getPositionFor(token0);
         var token2 = environment.tokens()[2]; // X-Wing
         var fromPosition20 = environment.getPositionFor(token2);
         var fromPosition2 = new Position(fromPosition20.x(), fromPosition20.y(), -30);
         environment.moveToken(fromPosition20, fromPosition2);

         // Move token0 to token2's planned toPosition.
         var fromPosition0 = new Position(fromPosition2.x() + 139, fromPosition2.y() - 80, 90);
         environment.moveToken(fromPosition00, fromPosition0);

         var maneuverKey = Maneuver.STRAIGHT_3_STANDARD;
         var maneuverAction = new ManeuverAction(store, token2.id(), maneuverKey);

         // Run.
         maneuverAction.doIt();

         // Verify.
         var toPosition = environment.getPositionFor(token2);
         assert.equal(toPosition.x(), fromPosition2.x() + 95);
         assert.equal(toPosition.y(), fromPosition2.y() - 55);
         assert.equal(toPosition.heading(), 330);
      });

      QUnit.test("doIt() IG-88C", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var agent = environment.tokens()[2].agent(); // X-Wing
         var token = new Token(environment.store(), Pilot.IG_88C, agent);
         var position = new Position(450, 450, 0);
         store.dispatch(EnvironmentAction.placeToken(position, token));
         var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;
         var isBoost = true;
         var maneuverAction = new ManeuverAction(store, token.id(), maneuverKey, isBoost);
         assert.equal(token.evadeCount(), 0);

         // Run.
         maneuverAction.doIt();

         // Verify.
         assert.equal(token.evadeCount(), 1);
      });

      QUnit.test("toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2];
         var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;
         var isBoost = true;
         var maneuverAction = new ManeuverAction(store, token.id(), maneuverKey, isBoost);

         // Run.
         var result = maneuverAction.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "ManeuverAction tokenId=3, maneuverKey=straight1Standard, isBoost?true, fromPosition=(458, 895, 270)");
      });
   });
