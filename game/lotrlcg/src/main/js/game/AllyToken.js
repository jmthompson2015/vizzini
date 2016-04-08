define([ "AllyCard", "game/AttachState", "game/CountState", "game/MarkerState", "game/TargetState", "game/TokenId" ],
        function(AllyCard, AttachState, CountState, MarkerState, TargetState, TokenId)
        {
            "use strict";
            function AllyToken(cardKey)
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

                var card = AllyCard.properties[cardKey];
                InputValidator.validateNotNull("card", card);

                this.card = function()
                {
                    return card;
                };

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

                this.woundState = function()
                {
                    return woundState;
                };
            }

            AllyToken.EVENT = "ally";

            AllyToken.prototype.toString = function()
            {
                return "Ally " + this.card().name;
            };

            MicroEvent.mixin(AllyToken);

            return AllyToken;
        });
