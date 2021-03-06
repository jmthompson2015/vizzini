"use strict";

define(["process/Action", "process/Adjudicator", "process/Engine", "process/Environment", "process/EventObserver", "process/PhaseObserver", "process/Reducer"],
   function(Action, Adjudicator, Engine, Environment, EventObserver, PhaseObserver, Reducer)
   {

      function Game(agent1, squad1, agent2, squad2, delayIn)
      {
         InputValidator.validateNotNull("agent1", agent1);
         InputValidator.validateNotNull("squad1", squad1);
         InputValidator.validateNotNull("agent2", agent2);
         InputValidator.validateNotNull("squad2", squad2);
         // delayIn optional.

         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, agent1, squad1, agent2, squad2);
         new EventObserver(store);
         new PhaseObserver(store);

         var adjudicator = new Adjudicator();
         environment.store().dispatch(Action.setAdjudicator(adjudicator));
         var engine = new Engine(environment, adjudicator, delayIn);

         this.adjudicator = function()
         {
            return adjudicator;
         };

         this.engine = function()
         {
            return engine;
         };

         this.environment = function()
         {
            return environment;
         };
      }

      Game.prototype.start = function()
      {
         var engine = this.engine();

         setTimeout(function()
         {
            engine.performPlanningPhase();
         }, 0);
      };

      return Game;
   });
