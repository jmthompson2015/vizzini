define([ "AllyCard", "AttachmentCard", "EventCard", "HeroCard", "game/CardInstance", "game/PlayerDeck" ], function(
        AllyCard, AttachmentCard, EventCard, HeroCard, CardInstance, PlayerDeck)
{
    "use strict";
    var DeckBuilders = [];

    var BeornsPath1DeckBuilder = new PlayerDeckBuilder("Beorn's Path #1", 2013, "Leadership/Lore", function()
    {
        var heroTokens = [];
        addHero(heroTokens, HeroCard.ARAGORN_CORE);
        addHero(heroTokens, HeroCard.THEODRED);
        addHero(heroTokens, HeroCard.DENETHOR);

        var playerTokens = [];
        addAlly(playerTokens, AllyCard.HENAMARTH_RIVERSONG, 1);
        addAlly(playerTokens, AllyCard.SNOWBOURN_SCOUT, 3);
        addAlly(playerTokens, AllyCard.GUARD_OF_THE_CITADEL, 3);
        addAlly(playerTokens, AllyCard.EREBOR_HAMMERSMITH, 2);
        addAlly(playerTokens, AllyCard.MINER_OF_THE_IRON_HILLS, 2);
        addAlly(playerTokens, AllyCard.GLEOWINE, 2);
        addAlly(playerTokens, AllyCard.SON_OF_ARNOR, 2);
        addAlly(playerTokens, AllyCard.DAUGHTER_OF_THE_NIMRODEL, 3);
        addAlly(playerTokens, AllyCard.FARAMIR, 2);
        addAlly(playerTokens, AllyCard.GANDALF, 3);

        addAttachment(playerTokens, AttachmentCard.STEWARD_OF_GONDOR, 2);
        addAttachment(playerTokens, AttachmentCard.PROTECTOR_OF_LORIEN, 2);
        addAttachment(playerTokens, AttachmentCard.FOREST_SNARE, 2);
        addAttachment(playerTokens, AttachmentCard.SELF_PRESERVATION, 2);
        addAttachment(playerTokens, AttachmentCard.CELEBRIANS_STONE, 1);

        addEvent(playerTokens, EventCard.VALIANT_SACRIFICE, 2);
        addEvent(playerTokens, EventCard.SNEAK_ATTACK, 2);
        addEvent(playerTokens, EventCard.FOR_GONDOR, 2);
        addEvent(playerTokens, EventCard.RADAGASTS_CUNNING, 2);

        return new PlayerDeck(heroTokens, playerTokens);
    });
    DeckBuilders.push(BeornsPath1DeckBuilder);

    var BeornsPath2DeckBuilder = new PlayerDeckBuilder("Beorn's Path #2", 2013, "Spirit/Tactics", function()
    {
        var heroTokens = [];
        addHero(heroTokens, HeroCard.EOWYN);
        addHero(heroTokens, HeroCard.GIMLI);
        addHero(heroTokens, HeroCard.THALIN);

        var playerTokens = [];
        addAlly(playerTokens, AllyCard.GONDORIAN_SPEARMAN, 3);
        addAlly(playerTokens, AllyCard.VETERAN_AXEHAND, 3);
        addAlly(playerTokens, AllyCard.HORSEBACK_ARCHER, 2);
        addAlly(playerTokens, AllyCard.LORIEN_GUIDE, 1);
        addAlly(playerTokens, AllyCard.NORTHERN_TRACKER, 2);
        addAlly(playerTokens, AllyCard.GANDALF, 1);
        addAlly(playerTokens, AllyCard.BEORN, 1);

        addAttachment(playerTokens, AttachmentCard.HORN_OF_GONDOR, 1);
        addAttachment(playerTokens, AttachmentCard.BLADE_OF_GONDOLIN, 2);
        addAttachment(playerTokens, AttachmentCard.DWARVEN_AXE, 2);
        addAttachment(playerTokens, AttachmentCard.CITADEL_PLATE, 2);
        addAttachment(playerTokens, AttachmentCard.THE_FAVOR_OF_THE_LADY, 2);
        addAttachment(playerTokens, AttachmentCard.UNEXPECTED_COURAGE, 1);

        addEvent(playerTokens, EventCard.FEINT, 2);
        addEvent(playerTokens, EventCard.QUICK_STRIKE, 2);
        addEvent(playerTokens, EventCard.SWIFT_STRIKE, 1);
        addEvent(playerTokens, EventCard.A_TEST_OF_WILL, 2);
        addEvent(playerTokens, EventCard.HASTY_STROKE, 2);
        addEvent(playerTokens, EventCard.THE_GALADHRIMS_GREETING, 2);
        addEvent(playerTokens, EventCard.DWARVEN_TOMB, 1);
        addEvent(playerTokens, EventCard.A_LIGHT_IN_THE_DARK, 2);
        addEvent(playerTokens, EventCard.STAND_AND_FIGHT, 3);

        return new PlayerDeck(heroTokens, playerTokens);
    });
    DeckBuilders.push(BeornsPath2DeckBuilder);

    function PlayerDeckBuilder(name, year, description, buildFunction)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("year", year);
        InputValidator.validateNotNull("description", description);
        InputValidator.validateNotNull("buildFunction", buildFunction);

        this.name = function()
        {
            return name;
        };

        this.year = function()
        {
            return year;
        };

        this.description = function()
        {
            return description;
        };

        this.buildDeck = function()
        {
            return buildFunction();
        };
    }

    function addAlly(array, cardKey, count)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        for (var i = 0; i < count; i++)
        {
            array.push(CardInstance.ally(cardKey));
        }
    }

    function addAttachment(array, cardKey, count)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        for (var i = 0; i < count; i++)
        {
            array.push(CardInstance.attachment(cardKey));
        }
    }

    function addEvent(array, cardKey, count)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        for (var i = 0; i < count; i++)
        {
            array.push(CardInstance.event(cardKey));
        }
    }

    function addHero(array, cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        array.push(CardInstance.hero(cardKey));
    }

    return (
    {
        BeornsPath1DeckBuilder: BeornsPath1DeckBuilder,
        BeornsPath2DeckBuilder: BeornsPath2DeckBuilder,
        DeckBuilders: DeckBuilders,
        PlayerDeckBuilder: PlayerDeckBuilder,
    });
});
