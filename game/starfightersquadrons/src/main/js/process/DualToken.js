define(["Pilot", "process/TargetLock", "process/Token", "process/TokenAction"],
   function(Pilot, TargetLock, Token, TokenAction)
   {
      "use strict";

      function DualToken(store, pilotKey, agent, upgradeKeysForeIn, upgradeKeysAftIn, idIn, isNewIn, idFore, idAft)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("pilotKey", pilotKey);
         InputValidator.validateNotNull("agent", agent);
         // upgradeKeysForeIn optional.
         // upgradeKeysAftIn optional.
         // idIn optional. default: determined from store
         // isNewIn optional. default: true
         // idFore optional.
         // idAft optional.

         this.store = function()
         {
            return store;
         };

         this.pilotKey = function()
         {
            return pilotKey;
         };

         this.agent = function()
         {
            return agent;
         };

         var id = idIn;

         if (isNaN(id))
         {
            id = store.getState().nextTokenId;
            store.dispatch(TokenAction.incrementNextTokenId());
         }

         this.id = function()
         {
            return id;
         };

         var pilot = Pilot.properties[pilotKey];
         var shipTeam = pilot.shipTeam;
         var ship = shipTeam.ship;

         var pilotFore = pilot.fore;
         pilotFore.shipTeam = pilot.shipTeam;
         var pilotAft = pilot.aft;
         pilotAft.shipTeam = pilot.shipTeam;
         var tokenFore;
         var tokenAft;

         var isNew = (isNewIn !== undefined ? isNewIn : true);

         if (isNew)
         {
            var upgradeKeysFore = (upgradeKeysForeIn ? upgradeKeysForeIn : []);
            var upgradeKeysAft = (upgradeKeysAftIn ? upgradeKeysAftIn : []);
            tokenFore = new Token(store, pilotFore, agent, upgradeKeysFore);
            tokenAft = new Token(store, pilotAft, agent, upgradeKeysAft);
            this._save(upgradeKeysFore, upgradeKeysAft, tokenFore, tokenAft);
         }
         else
         {
            tokenFore = Token.get(store, idFore);
            tokenAft = Token.get(store, idAft);
         }

         tokenFore.parent = this;
         tokenAft.parent = this;

         var myCrippledPilotFore, myCrippledPilotAft;
         var myCrippledTokenFore, myCrippledTokenAft;

         this.pilot = function()
         {
            return pilot;
         };

         this.pilotAft = function()
         {
            var answer = pilotAft;

            if (tokenAft.isDestroyed())
            {
               answer = crippledPilotAft();
            }

            return answer;
         };

         this.pilotFore = function()
         {
            var answer = pilotFore;

            if (tokenFore.isDestroyed())
            {
               answer = crippledPilotFore();
            }

            return answer;
         };

         this.ship = function()
         {
            return ship;
         };

         this.tokenAft = function()
         {
            var answer = tokenAft;

            if (tokenAft.isDestroyed())
            {
               answer = this.crippledTokenAft();
            }

            return answer;
         };

         this.tokenFore = function()
         {
            var answer = tokenFore;

            if (tokenFore.isDestroyed())
            {
               answer = this.crippledTokenFore();
            }

            return answer;
         };

         this.crippledTokenAft = function()
         {
            if (tokenAft.isDestroyed() && myCrippledTokenAft === undefined)
            {
               var upgradeKeys = [];
               myCrippledTokenAft = new Token(store, crippledPilotAft(), agent, upgradeKeys);
               myCrippledTokenAft.parent = this;
            }

            return myCrippledTokenAft;
         };

         this.crippledTokenFore = function()
         {
            if (tokenFore.isDestroyed() && myCrippledTokenFore === undefined)
            {
               var upgradeKeys = [];
               myCrippledTokenFore = new Token(store, crippledPilotFore(), agent, upgradeKeys);
               myCrippledTokenFore.parent = this;
            }

            return myCrippledTokenFore;
         };

         function crippledPilotAft()
         {
            if (myCrippledPilotAft === undefined)
            {
               myCrippledPilotAft = pilot.crippledAft;
               myCrippledPilotAft.shipTeam = pilot.shipTeam;
            }

            return myCrippledPilotAft;
         }

         function crippledPilotFore()
         {
            if (myCrippledPilotFore === undefined)
            {
               myCrippledPilotFore = pilot.crippledFore;
               myCrippledPilotFore.shipTeam = pilot.shipTeam;
            }

            return myCrippledPilotFore;
         }
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      DualToken.prototype.equals = function(other)
      {
         return this.id() == other.id() && this.pilotKey() == other.pilotKey();
      };

      DualToken.prototype.isDestroyed = function()
      {
         this.tokenFore();
         this.tokenAft();
         var myCrippledTokenFore = this.crippledTokenFore();
         var myCrippledTokenAft = this.crippledTokenAft();

         return !(myCrippledTokenFore === undefined || myCrippledTokenAft === undefined);
      };

      DualToken.prototype.isHuge = function()
      {
         return true;
      };

      DualToken.prototype.isStressed = function()
      {
         return false;
      };

      DualToken.prototype.isUpgradedWith = function(upgradeKey)
      {
         return false;
      };

      DualToken.prototype.maneuverKeys = function()
      {
         return this.pilot().shipTeam.ship.maneuverKeys.slice();
      };

      DualToken.prototype.name = function()
      {
         return this.id() + " " + this.pilot().name;
      };

      DualToken.prototype.pilotName = function()
      {
         var properties = this.pilot();
         var isUnique = properties.isUnique;
         var answer = this.id() + " ";

         if (isUnique)
         {
            answer += "\u25CF ";
         }

         answer += properties.name;

         return answer;
      };

      DualToken.prototype.primaryWeapon = function()
      {
         return this.tokenFore().primaryWeapon();
      };

      DualToken.prototype.shipName = function()
      {
         return this.pilot().shipTeam.ship.name;
      };

      DualToken.prototype.toString = function()
      {
         return this.name();
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      DualToken.prototype.removeAllTargetLocks = function()
      {
         var store = this.store();
         TargetLock.removeAllTargetLocks(store, this.tokenFore());
         TargetLock.removeAllTargetLocks(store, this.tokenAft());

         var myCrippledTokenFore = this.crippledTokenFore();

         if (myCrippledTokenFore !== undefined)
         {
            TargetLock.removeAllTargetLocks(store, myCrippledTokenFore);
         }

         var myCrippledTokenAft = this.crippledTokenAft();

         if (myCrippledTokenAft)
         {
            TargetLock.removeAllTargetLocks(store, myCrippledTokenAft);
         }
      };

      DualToken.prototype._save = function(upgradeKeysFore, upgradeKeysAft, tokenFore, tokenAft)
      {
         InputValidator.validateIsArray("upgradeKeysFore", upgradeKeysFore);
         InputValidator.validateIsArray("upgradeKeysAft", upgradeKeysAft);
         InputValidator.validateNotNull("tokenFore", tokenFore);
         InputValidator.validateNotNull("tokenAft", tokenAft);

         var store = this.store();
         var id = this.id();
         var pilotKey = this.pilotKey();
         var agent = this.agent();

         store.dispatch(TokenAction.setToken(id, pilotKey, agent, tokenFore.id(), tokenAft.id()));
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      DualToken.prototype.newInstance = function(store, agent)
      {
         var pilotKey = this.pilotKey();
         var tokenFore = this.tokenFore();
         var tokenAft = this.tokenAft();
         var upgradeKeysFore = tokenFore.upgradeKeys().slice();
         var upgradeKeysAft = tokenAft.upgradeKeys().slice();

         return new DualToken(store, pilotKey, agent, upgradeKeysFore, upgradeKeysAft);
      };

      DualToken.get = function(store, id)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("id", id);

         var values = store.getState().tokens.get(id);
         var answer;

         if (values !== undefined)
         {
            var pilotKey = values.get("pilotKey");
            var agent = values.get("agent");
            var idFore = values.get("idFore");
            var idAft = values.get("idAft");
            var upgradeKeysFore = store.getState().tokenIdToUpgrades[id];
            var upgradeKeysAft = store.getState().tokenIdToUpgrades[id];
            var isNew = false;

            answer = new DualToken(store, pilotKey, agent, upgradeKeysFore, upgradeKeysAft, id, isNew, idFore, idAft);
         }

         return answer;
      };

      return DualToken;
   });
