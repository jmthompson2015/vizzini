define(function()
{
   "use strict";
   var Connector = {};

   Connector.FactionUI = {
      mapStateToProps: function(state, ownProps)
      {
         InputValidator.validateNotNull("faction", ownProps.faction);

         return (
         {
            faction: ownProps.faction,
            isSmall: true,
         });
      },
   };

   Connector.PilotCardImage = {
      mapStateToProps: function(state, ownProps)
      {
         InputValidator.validateNotNull("pilot", ownProps.pilot);

         return (
         {
            pilot: ownProps.pilot,
            width: 1.20 * 200,
         });
      },
   };

   Connector.PilotChooser = {
      mapStateToProps: function(state, ownProps)
      {
         InputValidator.validateNotNull("onChange", ownProps.onChange);
         InputValidator.validateNotNull("ship", ownProps.ship);
         InputValidator.validateNotNull("team", ownProps.team);

         return (
         {
            imageBase: state.imageBase,
            onChange: ownProps.onChange,
            ship: ownProps.ship,
            team: ownProps.team,

            index: ownProps.index,
            initialPilot: ownProps.initialPilot,
         });
      },
   };

   Connector.ShipCardUI = {
      mapStateToProps: function(state, ownProps)
      {
         InputValidator.validateNotNull("agent", ownProps.agent);
         InputValidator.validateNotNull("ship", ownProps.ship);
         InputValidator.validateNotNull("shipTeamKey", ownProps.shipTeamKey);

         return (
         {
            agent: ownProps.agent,
            imageBase: state.imageBase,
            ship: ownProps.ship,
            shipTeamKey: ownProps.shipTeamKey,
            store: state.delegateStore,
         });
      },
   };

   Connector.ShipChooser = {
      mapStateToProps: function(state, ownProps)
      {
         InputValidator.validateNotNull("onChange", ownProps.onChange);

         return (
         {
            imageBase: state.imageBase,
            onChange: ownProps.onChange,
            team: state.team,

            index: ownProps.index,
            initialShip: ownProps.initialShip,
         });
      },
   };

   Connector.ShipStateUI = {
      mapStateToProps: function(state, ownProps)
      {
         InputValidator.validateNotNull("shipState", ownProps.shipState);

         return (
         {
            faction: state.team,
            imageBase: state.imageBase,
            shipState: ownProps.shipState,
         });
      },
   };

   Connector.UpgradeCardImage = {
      mapStateToProps: function(state, ownProps)
      {
         InputValidator.validateNotNull("upgrade", ownProps.upgrade);

         return (
         {
            upgrade: ownProps.upgrade,
            width: 1.20 * 135,
         });
      },
   };

   Connector.UpgradeChooser = {
      mapStateToProps: function(state, ownProps)
      {
         InputValidator.validateNotNull("onChange", ownProps.onChange);
         InputValidator.validateNotNull("pilot", ownProps.pilot);
         InputValidator.validateNotNull("upgradeType", ownProps.upgradeType);

         return (
         {
            imageBase: state.imageBase,
            onChange: ownProps.onChange,
            pilot: ownProps.pilot,
            upgradeType: ownProps.upgradeType,

            index: ownProps.index,
            initialUpgrade: ownProps.initialUpgrade,
         });
      },
   };

   return Connector;
});
