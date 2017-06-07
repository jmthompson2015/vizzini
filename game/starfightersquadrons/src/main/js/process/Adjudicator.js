define(["Maneuver", "ManeuverComputer", "Pilot", "RectanglePath", "Team", "process/Selector", "process/SimpleAgent"],
   function(Maneuver, ManeuverComputer, Pilot, RectanglePath, Team, Selector, SimpleAgent)
   {
      "use strict";

      function Adjudicator()
      {
         this.canAttack = function(attacker)
         {
            InputValidator.validateNotNull("attacker", attacker);

            // A cloaked ship cannot attack. Cannot attack if weapons are disabled.
            return !attacker.isCloaked() && attacker.weaponsDisabledCount() === 0;
         };

         this.canBarrelRoll = function(environment, attacker, maneuverKey)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("maneuverKey", maneuverKey);

            // A ship cannot barrel roll if this would cause its base to overlap with another ship's base or an obstacle
            // token.
            var answer = false;
            var fromPosition = environment.getPositionFor(attacker);

            if (fromPosition)
            {
               var maneuver = Maneuver.properties[maneuverKey];
               var shipBase = attacker.pilot().shipTeam.ship.shipBase;
               var toPolygon = ManeuverComputer.computeToPolygon(environment.playFormatKey(), maneuver, fromPosition,
                  shipBase);

               if (toPolygon)
               {
                  var tokens = environment.tokens();
                  answer = true;

                  for (var i = 0; i < tokens.length; i++)
                  {
                     var token = tokens[i];

                     if (token !== attacker)
                     {
                        var myShipBase = token.pilot().shipTeam.ship.shipBase;
                        var position = environment.getPositionFor(token);
                        var polygon = ManeuverComputer.computePolygon(myShipBase, position.x(), position.y(),
                           position.heading());
                        var collide = RectanglePath.doPolygonsCollide(polygon, toPolygon);

                        if (collide)
                        {
                           answer = false;
                           break;
                        }
                     }
                  }
               }
            }

            return answer;
         };

         this.canBoost = function(environment, attacker, maneuverKey)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("maneuverKey", maneuverKey);

            // A ship cannot boost if this would cause its base to overlap with another ship's base or an obstacle
            // token, or if the maneuver template overlaps an obstacle token.

            // FIXME: implement Adjudicator.canBoost()
            return this.canBarrelRoll(environment, attacker, maneuverKey);
         };

         this.canDecloak = function(environment, attacker, maneuverKey)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("maneuverKey", maneuverKey);

            // A ship cannot decloak if it would overlap another ship or an obstacle token, or if the maneuver template
            // would overlap an obstacle token.

            // FIXME: implement Adjudicator.canDecloak()
            return attacker.isCloaked() && this.canBarrelRoll(environment, attacker, maneuverKey);
         };

         this.canSelectShipAction = function(attacker)
         {
            InputValidator.validateNotNull("attacker", attacker);

            // Cannot select a ship action if the ship is stressed (exception: pilot Tycho Celchu), or
            // if the ship is touching another ship.
            var state = attacker.store().getState();
            return (attacker.pilotKey() === Pilot.TYCHO_CELCHU || !attacker.isStressed()) && !Selector.isTouching(state, attacker);
         };

         this.compareInitiative = function(squadBuilder1, squadBuilder2)
         {
            var answer = 1;

            // Compare squad point costs.
            var factionKey1 = squadBuilder1.faction();
            var agent1 = new SimpleAgent("Agent1", factionKey1);
            var squad1 = squadBuilder1.buildSquad(agent1);
            var squadPointCost1 = squad1.squadPointCost();

            var factionKey2 = squadBuilder2.faction();
            var agent2 = new SimpleAgent("Agent2", factionKey2);
            var squad2 = squadBuilder2.buildSquad(agent2);
            var squadPointCost2 = squad2.squadPointCost();

            answer = (squadPointCost2 - squadPointCost1);

            if (answer === 0)
            {
               // Compare faction keys.
               var values = Team.values();
               var index1 = values.indexOf(factionKey1);
               var index2 = values.indexOf(factionKey2);

               answer = index2 - index1;
            }

            return answer;
         };

         this.determineWinner = function(environment)
         {
            InputValidator.validateNotNull("environment", environment);

            var answer;

            var firstAgent = environment.firstAgent();
            var firstCount = environment.getTokensForTeam(firstAgent.teamKey()).length;
            var secondAgent = environment.secondAgent();
            var secondCount = environment.getTokensForTeam(secondAgent.teamKey()).length;

            if (firstCount === 0)
            {
               answer = secondAgent;
            }
            else if (secondCount === 0)
            {
               answer = firstAgent;
            }

            return answer;
         };

         this.isGameOver = function(environment)
         {
            InputValidator.validateNotNull("environment", environment);

            var answer = false;

            var firstAgent = environment.firstAgent();
            var firstCount = environment.getTokensForTeam(firstAgent.teamKey()).length;

            answer = (firstCount === 0);

            if (!answer)
            {
               var secondAgent = environment.secondAgent();
               var secondCount = environment.getTokensForTeam(secondAgent.teamKey()).length;
               answer = (secondCount === 0);
            }

            return answer;
         };
      }

      return Adjudicator;
   });
