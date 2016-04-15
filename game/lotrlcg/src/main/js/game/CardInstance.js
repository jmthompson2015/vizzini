define([ "AllyCard", "AttachmentCard", "EnemyCard", "EventCard", "HeroCard", "LocationCard", "QuestCard",
        "TreacheryCard" ], function(AllyCard, AttachmentCard, EnemyCard, EventCard, HeroCard, LocationCard, QuestCard,
        TreacheryCard)
{
    "use strict";
    var CardInstance = {};

    CardInstance.nextIdValue = 1;

    CardInstance.nextId = function()
    {
        return CardInstance.nextIdValue++;
    };

    CardInstance.resetNextId = function()
    {
        CardInstance.nextIdValue = 1;
    };

    CardInstance.ally = function(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        var card = AllyCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        return (
        {
            id: CardInstance.nextId(),
            cardKey: cardKey,
            card: card,
            attachments: [],
            isExhausted: false,
            isQuesting: false,
            woundCount: 0,
            attackTarget: undefined,
            defendTarget: undefined,
        });
    };

    CardInstance.attachment = function(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        var card = AttachmentCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        return (
        {
            id: CardInstance.nextId(),
            cardKey: cardKey,
            card: card,
            isExhausted: false,
        });
    };

    CardInstance.event = function(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        var card = EventCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        return (
        {
            id: CardInstance.nextId(),
            cardKey: cardKey,
            card: card,
        });
    };

    CardInstance.hero = function(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        var card = HeroCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        return (
        {
            id: CardInstance.nextId(),
            cardKey: cardKey,
            card: card,
            attachments: [],
            isExhausted: false,
            isQuesting: false,
            resourceCount: 0,
            woundCount: 0,
            attackTarget: undefined,
            defendTarget: undefined,
        });
    };

    CardInstance.enemy = function(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        var card = EnemyCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        return (
        {
            id: CardInstance.nextId(),
            cardKey: cardKey,
            card: card,
            attachments: [],
            woundCount: 0,
        });
    };

    CardInstance.location = function(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        var card = LocationCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        return (
        {
            id: CardInstance.nextId(),
            cardKey: cardKey,
            card: card,
            progressCount: 0,
        });
    };

    CardInstance.quest = function(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        var card = QuestCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        return (
        {
            id: CardInstance.nextId(),
            cardKey: cardKey,
            card: card,
            progressCount: 0,
        });
    };

    CardInstance.treachery = function(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        var card = TreacheryCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        return (
        {
            id: CardInstance.nextId(),
            cardKey: cardKey,
            card: card,
        });
    };

    return CardInstance;
});
