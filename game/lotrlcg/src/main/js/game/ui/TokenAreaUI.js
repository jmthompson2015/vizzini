/*
 * @param area Area. (required)
 * @param label Label. (optional)
 */
define([ "game/ui/TokenUI" ], function(TokenUI)
{
    "use strict";
    var TokenAreaUI = React.createClass(
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
                    className: "tokenAreaUILabel",
                    colSpan: area.length,
                }, label)));
            }

            var cells = [];

            area.forEach(function(token)
            {
                var element = React.createElement(TokenUI,
                {
                    initialToken: token,
                });
                cells.push(React.DOM.td(
                {
                    className: "tokenAreaUICell",
                }, element));
            });

            rows.push(React.DOM.tr({}, cells));

            return React.DOM.table(
            {
                className: "tokenAreaUI",
            }, rows);
        },
    });

    return TokenAreaUI;
});
