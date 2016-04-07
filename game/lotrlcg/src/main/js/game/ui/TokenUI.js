/*
 * @param label Label. (optional)
 * @param token Token. (optional)
 */
define(function()
{
    "use strict";
    var TokenUI = React.createClass(
    {
        getInitialState: function()
        {
            return (
            {
                hover: false
            });
        },

        mouseOver: function()
        {
            this.setState(
            {
                hover: true,
            });
        },

        mouseOut: function()
        {
            this.setState(
            {
                hover: false,
            });
        },

        render: function()
        {
            var rows = [];

            var label = this.props.label;

            if (label)
            {
                rows.push(React.DOM.tr({}, React.DOM.td(
                {
                    className: "tokenUILabel",
                }, label)));
            }

            var content = " ";
            var token = this.props.token;

            if (token)
            {
                var card = token.card();

                if (card.image)
                {
                    var myClass = (this.state.hover ? "tokenUIImagePreview" : "tokenUIImage");

                    content = React.DOM.img(
                    {
                        className: myClass,
                        onMouseOut: this.mouseOut,
                        onMouseOver: this.mouseOver,
                        src: card.image,
                        title: card.name,
                    });
                }
                else
                {
                    content = card.name;
                }
            }

            var cell = React.DOM.td(
            {
                className: "tokenUICell",
            }, content);
            rows.push(React.DOM.tr({}, cell));

            return React.DOM.table(
            {
                className: "tokenUI",
            }, rows);
        },
    });

    return TokenUI;
});
