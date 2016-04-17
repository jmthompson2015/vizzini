define([ "CardType" ], function(CardType)
{
    var CardGalleryUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("cardKeys", this.props.cardKeys);
            InputValidator.validateNotNull("properties", this.props.properties);

            var cardKeys = this.props.cardKeys;
            var properties = this.props.properties;
            var rows = [];
            var cells = [];

            cardKeys.forEach(function(cardKey)
            {
                var card = properties[cardKey];
                LOGGER.info("card = " + card.name);
                var width = card.cardTypeKey === CardType.QUEST ? 290 : 208;
                var columns = card.cardTypeKey === CardType.QUEST ? 3 : 5;
                var image = React.DOM.img(
                {
                    src: card.image,
                    title: cardKey,
                    width: width,
                });
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, image));

                if (cells.length >= columns)
                {
                    rows.push(React.DOM.tr({}, cells));
                    cells = [];
                }
            });

            if (cells.length > 0)
            {
                rows.push(React.DOM.tr({}, cells));
            }

            return React.DOM.table({}, rows);
        },
    });

    return CardGalleryUI;
});
