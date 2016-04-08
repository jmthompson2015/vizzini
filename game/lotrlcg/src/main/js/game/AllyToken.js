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

                var that = this;
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
                woundState.bind("count", function()
                {
                    that.trigger("change");
                });

                var exhaustState = new MarkerState();
                exhaustState.bind("mark", function()
                {
                    that.trigger("change");
                });
                var questState = new MarkerState();
                questState.bind("mark", function()
                {
                    that.trigger("change");
                });

                var attackerState = new TargetState();
                attackerState.bind("target", function()
                {
                    that.trigger("change");
                });
                var defenderState = new TargetState();
                defenderState.bind("target", function()
                {
                    that.trigger("change");
                });

                var attachState = new AttachState();
                attachState.bind("attach", function()
                {
                    that.trigger("change");
                });

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
