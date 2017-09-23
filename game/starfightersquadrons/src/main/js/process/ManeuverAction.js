"use strict";

define(["Bearing", "Maneuver", "ManeuverComputer", "Pilot", "PlayFormat", "Position",
  "process/Action", "process/EnvironmentAction", "process/ShipFledAction", "process/TokenAction"],
   function(Bearing, Maneuver, ManeuverComputer, Pilot, PlayFormat, Position,
      Action, EnvironmentAction, ShipFledAction, TokenAction)
   {
      function ManeuverAction(store, tokenId, maneuverKey, isBoostIn, fromPositionIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("tokenId", tokenId);
         InputValidator.validateNotNull("maneuverKey", maneuverKey);
         // isBoost is optional. default: false
         // fromPosition is optional. default: lookup from environment

         var isBoost = (isBoostIn !== undefined ? isBoostIn : false);

         this.store = function()
         {
            return store;
         };

         this.tokenId = function()
         {
            return tokenId;
         };

         this.maneuverKey = function()
         {
            return maneuverKey;
         };

         this.isBoost = function()
         {
            return isBoost;
         };

         var environment = store.getState().environment;
         var token = environment.getTokenById(tokenId);
         var fromPosition = (fromPositionIn !== undefined ? fromPositionIn : environment.getPositionFor(token));

         this.environment = function()
         {
            return environment;
         };

         this.fromPosition = function()
         {
            return fromPosition;
         };

         this.token = function()
         {
            return token;
         };
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      ManeuverAction.prototype.maneuver = function()
      {
         var maneuverKey = this.maneuverKey();

         return Maneuver.properties[maneuverKey];
      };

      ManeuverAction.prototype.shipBase = function()
      {
         var token = this.token();
         var pilot = token.pilot();
         var shipBase = pilot.shipTeam.ship.shipBase;

         return shipBase;
      };

      ManeuverAction.prototype.toString = function()
      {
         return "ManeuverAction tokenId=" + this.tokenId() + ", maneuverKey=" + this.maneuverKey() + ", isBoost?" + this.isBoost() + ", fromPosition=" + this.fromPosition();
      };

      //////////////////////////////////////////////////////////////////////////
      // Behavior methods.

      ManeuverAction.prototype.doIt = function()
      {
         LOGGER.trace("ManeuverAction.doIt() start");

         var token = this.token();

         if (token)
         {
            var store = this.store();
            var environment = this.environment();
            var maneuver = this.maneuver();
            var shipBase = this.shipBase();
            this._save();
            environment.setTokenTouching(token, false);
            var bearingKey = maneuver.bearingKey;
            var isBarrelRoll = [Bearing.BARREL_ROLL_LEFT, Bearing.BARREL_ROLL_RIGHT].includes(bearingKey);
            var isBoost = this.isBoost();
            var fromPosition = this.fromPosition();
            var toPosition = this.determineToPosition(isBarrelRoll, isBoost);
            var toPolygon;

            if (toPosition)
            {
               toPolygon = ManeuverComputer.computePolygon(shipBase, toPosition.x(), toPosition.y(), toPosition.heading());
            }

            if (!toPosition && (isBarrelRoll || isBoost))
            {
               // Maneuver failed.
               var message = isBarrelRoll ? "Barrel Roll failed." : "Boost failed.";
               LOGGER.info(message);
            }
            else if (!toPosition || !PlayFormat.isPathInPlayArea(environment.playFormatKey(), toPolygon))
            {
               LOGGER.info("Ship fled the battlefield: " + token.name());
               var shipFledAction = new ShipFledAction(environment, token, fromPosition);
               shipFledAction.doIt();
            }
            else
            {
               environment.moveToken(fromPosition, toPosition);

               if (token.isIonized && token.isIonized())
               {
                  store.dispatch(TokenAction.setIonCount(token));
               }

               if (token.pilotKey() === Pilot.IG_88C && isBoost)
               {
                  store.dispatch(TokenAction.addEvadeCount(token));
               }
            }
         }

         LOGGER.trace("ManeuverAction.doIt() end");
      };

      ManeuverAction.prototype.determineToPosition = function(isBarrelRoll, isBoost)
      {
         InputValidator.validateNotNull("isBarrelRoll", isBarrelRoll);
         InputValidator.validateNotNull("isBoost", isBoost);

         var answer;

         if (isBarrelRoll || isBoost)
         {
            answer = this.determineToPositionWithoutBackOff();
         }
         else
         {
            answer = this.determineToPositionWithBackOff();
         }

         return answer;
      };

      ManeuverAction.prototype.determineToPositionWithBackOff = function()
      {
         LOGGER.trace("determineToPositionWithBackOff() start");

         var answer;
         var environment = this.environment();
         var token = this.token();
         var maneuver = this.maneuver();
         var fromPosition = this.fromPosition();
         var shipDataMap = ManeuverComputer.createShipDataMap(environment, token, maneuver, fromPosition);
         var shipData0 = shipDataMap[token];
         var toPosition;

         if (shipData0 !== undefined)
         {
            toPosition = shipData0.position;
         }

         if (toPosition === undefined)
         {
            // Ship fled the battlefield.
            return undefined;
         }

         var shipData;
         var index = -1;
         var count = 0;

         do {
            shipData = ManeuverComputer.findCollision(shipDataMap, token);

            if (shipData === undefined)
            {
               // No collision.
               answer = shipDataMap[token].position;
            }
            else
            {
               // Collision with shipData, at least.
               environment.setTokenTouching(token, true);
               index = ManeuverComputer.backOffFrom(environment, token, maneuver, fromPosition, shipData, index, shipDataMap);
            }

            count++;

            if (count > 100)
            {
               throw "Too long spent in do loop.";
            }

            if (index < -1)
            {
               // Backoff failed.
               answer = fromPosition;
            }
         }
         while (answer === undefined);

         LOGGER.trace("determineToPositionWithBackOff() end");

         return answer;
      };

      ManeuverAction.prototype.determineToPositionWithoutBackOff = function()
      {
         var answer;
         var environment = this.environment();
         var token = this.token();
         var maneuver = this.maneuver();
         var fromPosition = this.fromPosition();
         var shipDataMap = ManeuverComputer.createShipDataMap(environment, token, maneuver, fromPosition);
         var toPosition = shipDataMap[token].position;

         if (toPosition === undefined)
         {
            // Ship fled the battlefield.
            return undefined;
         }

         var shipData = ManeuverComputer.findCollision(shipDataMap, token);

         if (shipData === undefined)
         {
            // No collision.
            answer = shipDataMap[token].position;
         }

         return answer;
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      ManeuverAction.prototype._save = function()
      {
         var store = this.store();
         var tokenId = this.tokenId();
         var maneuverKey = this.maneuverKey();
         var isBoost = this.isBoost();
         var fromPosition = this.fromPosition();
         var fromPosition0 = Immutable.Map(
         {
            x: fromPosition.x(),
            y: fromPosition.y(),
            heading: fromPosition.heading(),
         });

         var values = Immutable.Map(
         {
            tokenId: tokenId,
            maneuverKey: maneuverKey,
            isBoost: isBoost,
            fromPosition: fromPosition0,
         });

         store.dispatch(Action.setTokenManeuverAction(tokenId, values));
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      ManeuverAction.get = function(store, tokenId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("tokenId", tokenId);

         var values = store.getState().tokenIdToManeuverAction[tokenId];
         var answer;

         if (values !== undefined)
         {
            var maneuverKey = values.get("maneuverKey");
            var isBoost = values.get("isBoost");
            var fromPosition0 = values.get("fromPosition");
            var x = fromPosition0.get("x");
            var y = fromPosition0.get("y");
            var heading = fromPosition0.get("heading");
            var fromPosition = new Position(x, y, heading);

            answer = new ManeuverAction(store, tokenId, maneuverKey, isBoost, fromPosition);
         }

         return answer;
      };

      return ManeuverAction;
   });
