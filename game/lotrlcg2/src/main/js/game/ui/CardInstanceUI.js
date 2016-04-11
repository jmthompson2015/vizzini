/*
 * @param label Label. (optional)
 * @param cardInstance Card instance. (optional)
 */
define([ "game/ui/LabeledImage" ], function(LabeledImage)
{
    "use strict";
    var CardInstanceUI = React.createClass(
    {
        getInitialState: function()
        {
            return (
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
                    className: "cardInstanceUILabel",
                }, label)));
            }

            var cardInstance = this.props.cardInstance;
            var cell;

            if (cardInstance)
            {
                var content = " ";
                var card = cardInstance.card;
                if (!card)
                {
                    LOGGER.warn("No card set for cardInstance: " + JSON.stringify(cardInstance));
                }
                if (!card.image)
                {
                    LOGGER.warn("No image set for card: " + card);
                }

                if (card.image)
                {
                    var myClass = (this.state.hover ? "cardInstanceUIImagePreview" : "cardInstanceUIImage");

                    content = React.DOM.img(
                    {
                        className: myClass,
                        onMouseOut: this.mouseOut,
                        onMouseOver: this.mouseOver,
                        src: card.image,
                    });
                }
                else
                {
                    content = card.name;
                }

                cell = React.DOM.td(
                {
                    className: "cardInstanceUICell",
                }, content);
                rows.push(React.DOM.tr({}, cell));
            }

            if (cardInstance)
            {
                cell = React.DOM.td({}, React.createElement(TokensPanel,
                {
                    attackTarget: cardInstance.attackTarget,
                    defendTarget: cardInstance.defendTarget,
                    isExhausted: cardInstance.isExhausted,
                    isQuesting: cardInstance.isQuesting,
                    progressCount: cardInstance.progressCount,
                    resourceCount: cardInstance.resourceCount,
                    woundCount: cardInstance.woundCount,
                }));
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, cell));
            }

            return React.DOM.table(
            {
                className: "cardInstanceUI",
            }, rows);
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
    });

    var TokensPanel = React.createClass(
    {
        render: function()
        {
            var cells = [];
            var element;

            if (this.props.attackTarget)
            {
                cells.push(React.DOM.td({}, React.DOM.img(
                {
                    src: imageBase + "token/Attacker32.png",
                })));
            }

            if (this.props.defendTarget)
            {
                cells.push(React.DOM.td({}, React.DOM.img(
                {
                    src: imageBase + "token/Defender32.png",
                })));
            }

            if (this.props.isExhausted)
            {
                cells.push(React.DOM.td({}, React.DOM.img(
                {
                    src: imageBase + "token/Exhaust32.png",
                    title: "Exhausted",
                })));
            }

            if (this.props.isQuesting)
            {
                cells.push(React.DOM.td({}, React.DOM.img(
                {
                    src: imageBase + "token/Quest32.png",
                    title: "Questing",
                })));
            }

            if (this.props.progressCount > 0)
            {
                element = React.createElement(LabeledImage,
                {
                    image: "token/Progress32.png",
                    label: this.props.progressCount,
                    labelClass: "lightImageText",
                    title: "Progress",
                });
                cells.push(React.DOM.td({}, element));
            }

            if (this.props.resourceCount > 0)
            {
                element = React.createElement(LabeledImage,
                {
                    image: "token/Resource32.png",
                    label: this.props.resourceCount,
                    labelClass: "lightImageText",
                    title: "Resources",
                });
                cells.push(React.DOM.td({}, element));
            }

            if (this.props.woundCount > 0)
            {
                element = React.createElement(LabeledImage,
                {
                    image: "token/Wound32.png",
                    label: this.props.woundCount,
                    labelClass: "lightImageText",
                    title: "Wounds",
                });
                cells.push(React.DOM.td({}, element));
            }

            var row = React.DOM.tr({}, cells);
            var table = React.DOM.table(
            {
                className: "tokensTable"
            }, row);
            return React.DOM.div(
            {
                className: "tokensPanel"
            }, table);
        },
    });

    return CardInstanceUI;
});
