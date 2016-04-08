define([ "HeroCard", "game/AttachState", "game/CountState", "game/MarkerState", "game/TargetState", "game/TokenId" ],
        function(HeroCard, AttachState, CountState, MarkerState, TargetState, TokenId)
        {
            "use strict";
            function HeroToken(cardKey)
            {
                InputValidator.validateNotNull("cardKey", cardKey);

                this.cardKey = function()
                {
                    return cardKey;
                };

                var id = TokenId.nextId();

                this.id = function()
                {
                    return id;
                };

                var card = HeroCard.properties[cardKey];
                InputValidator.validateNotNull("card", card);

                this.card = function()
                {
                    return card;
                };

                var resourceState = new CountState();
                var woundState = new CountState();

                var exhaustState = new MarkerState();
                var questState = new MarkerState();

                var attackerState = new TargetState();
                var defenderState = new TargetState();

                var attachState = new AttachState();

                this.attachState = function()
                {
                    return attachState;
                };

                this.attackerState = function()
                {
                    return attackerState;
                };

                this.defenderState = function()
                {
                    return defenderState;
                };

                this.exhaustState = function()
                {
                    return exhaustState;
                };

                this.questState = function()
                {
                    return questState;
                };

                this.resourceState = function()
                {
                    return resourceState;
                };

                this.woundState = function()
                {
                    return woundState;
                };
            }

            HeroToken.EVENT = "hero";

            HeroToken.prototype.toString = function()
            {
                return "Hero " + this.card().name;
            };

            MicroEvent.mixin(HeroToken);

            return HeroToken;
        });
