/*
 * @param area Area. (required)
 * @param label Label. (optional)
 */
define([ "game/ui/CardInstanceUI" ], function(CardInstanceUI)
{
    "use strict";
    var CardAreaUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("area", this.props.area);

            var rows = [];

            var label = this.props.label;
            var area = this.props.area;

            if (label)
            {
                rows.push(React.DOM.tr({}, React.DOM.td(
                {
                    className: "cardAreaUILabel",
                    colSpan: area.length,
                }, label)));
            }

            var cells = [];

            area.forEach(function(cardInstance)
            {
                var element = React.createElement(CardInstanceUI,
                {
                    cardInstance: cardInstance,
                });
                cells.push(React.DOM.td(
                {
                    className: "cardAreaUICell",
                }, element));
            });

            rows.push(React.DOM.tr({}, cells));

            return React.DOM.table(
            {
                className: "cardAreaUI",
            }, rows);
        },
    });

    return CardAreaUI;
});
