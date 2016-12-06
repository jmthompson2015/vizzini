/*
 * @param source One of [DamageCard, DamageCardV2, Pilot, UpgradeCard].
 * @param sourceKey Damage, pilot, or upgrade key.
 * @param type One of [DamageAbilityX, PilotAbilityX, UpgradeAbilityX].
 * @param eventOrPhaseKey Event key or Phase key.
 */
define(["DamageCard", "DamageCardV2", "Pilot", "UpgradeCard"],
    function(DamageCard, DamageCardV2, Pilot, UpgradeCard)
    {
        function Ability(source, sourceKey, type, eventOrPhaseKey)
        {
            InputValidator.validateNotNull("source", source);
            InputValidator.validateNotNull("sourceKey", sourceKey);
            InputValidator.validateNotNull("type", type);
            InputValidator.validateNotNull("eventOrPhaseKey", eventOrPhaseKey);

            this.source = function()
            {
                return source;
            };

            this.sourceKey = function()
            {
                return sourceKey;
            };

            this.type = function()
            {
                return type;
            };

            this.eventOrPhaseKey = function()
            {
                return eventOrPhaseKey;
            };

            var sourceObject = source.properties[sourceKey];

            this.sourceObject = function()
            {
                return sourceObject;
            };

            var myAbility = (type[eventOrPhaseKey] !== undefined ? type[eventOrPhaseKey][sourceKey] : undefined);

            this.ability = function()
            {
                return myAbility;
            };
        }

        Ability.prototype.condition = function()
        {
            var myAbility = this.ability();

            return (myAbility !== undefined ? myAbility.condition : undefined);
        };

        Ability.prototype.conditionPasses = function(store, token)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);

            var answer = false;
            var condition = this.condition();

            if (condition !== undefined)
            {
                answer = condition(store, token);
            }

            return answer;
        };

        Ability.prototype.consequent = function()
        {
            var myAbility = this.ability();
            var myConsequent = (myAbility !== undefined ? myAbility.consequent : undefined);

            return (myConsequent !== undefined ? myConsequent.bind(myAbility) : undefined);
        };

        Ability.prototype.isDamage = function()
        {
            return [DamageCard, DamageCardV2].vizziniContains(this.source());
        };

        Ability.prototype.isPilot = function()
        {
            return this.source() === Pilot;
        };

        Ability.prototype.isUpgrade = function()
        {
            return this.source() === UpgradeCard;
        };

        Ability.prototype.toString = function()
        {
            var answer = "Ability ";

            answer += "source=" + this.source().toString();
            answer += ",sourceKey=" + this.sourceKey();
            answer += ",type=" + this.type().toString();
            answer += ",eventOrPhaseKey=" + this.eventOrPhaseKey();

            return answer;
        };

        Ability.prototype.usedAbilities = function(token)
        {
            InputValidator.validateNotNull("token", token);

            var answer;

            if (token.activationState !== undefined)
            {
                var activationState = token.activationState();
                var source = this.source();

                switch (source)
                {
                    case DamageCard:
                    case DamageCardV2:
                        answer = activationState.usedDamages();
                        break;
                    case Pilot:
                        answer = activationState.usedPilots();
                        break;
                    case UpgradeCard:
                        answer = activationState.usedUpgrades();
                        break;
                    default:
                        throw "Unknown source: " + source + " " + (typeof source);
                }
            }

            return answer;
        };

        return Ability;
    });
