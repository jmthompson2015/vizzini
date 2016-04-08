/*
 * @param label Label. (optional)
 * @param token Token. (optional)
 */
define([ "game/ui/LabeledImage" ], function(LabeledImage)
{
    "use strict";
    var TokenUI = React.createClass(
    {
        getInitialState: function()
        {
            var answer = {};
            answer.hover = false;

            if (this.props.initialToken)
            {
                answer.token = this.props.initialToken;
            }

            return answer;
        },

        componentDidMount: function()
        {
            if (this.state.token)
            {
                this.state.token.bind("change", this.tokenChanged);
            }
        },

        componentWillUnmount: function()
        {
            if (this.state.token)
            {
                this.state.token.unbind("change", this.tokenChanged);
            }
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
            var token = this.state.token;

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

            if (token)
            {
                cell = React.DOM.td({}, React.createElement(TokensPanel,
                {
                    token: token,
                }));
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, cell));
            }

            return React.DOM.table(
            {
                className: "tokenUI",
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

        tokenChanged: function()
        {
            LOGGER.trace(this.state.token + " token change event");
            this.setState(
            {
                token: this.state.token,
            });
        },
    });

    var TokensPanel = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("token", this.props.token);

            var token = this.props.token;
            var cells = [];

            if (token.attackerState && token.attackerState().target())
            {
                cells.push(React.DOM.td({}, React.DOM.img(
                {
                    src: imageBase + "token/Attacker32.png",
                })));
            }

            if (token.defenderState && token.defenderState().target())
            {
                cells.push(React.DOM.td({}, React.DOM.img(
                {
                    src: imageBase + "token/Defender32.png",
                })));
            }

            if (token.exhaustState && token.exhaustState().isMarked())
            {
                cells.push(React.DOM.td({}, React.DOM.img(
                {
                    src: imageBase + "token/Exhaust32.png",
                })));
            }

            if (token.progressState && token.progressState().count() > 0)
            {
                var element = React.createElement(LabeledImage,
                {
                    image: imageBase + "token/Progress32.png",
                    label: token.progressState().count(),
                    labelClass: "lightImageText",
                });
                cells.push(React.DOM.td({}, element));
            }

            if (token.questState && token.questState().isMarked())
            {
                cells.push(React.DOM.td({}, React.DOM.img(
                {
                    src: imageBase + "token/Quest32.png",
                })));
            }

            if (token.resourceState && token.resourceState().count() > 0)
            {
                var element = React.createElement(LabeledImage,
                {
                    image: imageBase + "token/Resource32.png",
                    label: token.resourceState().count(),
                    labelClass: "lightImageText",
                });
                cells.push(React.DOM.td({}, element));
            }

            if (token.woundState && token.woundState().count() > 0)
            {
                var element = React.createElement(LabeledImage,
                {
                    image: imageBase + "token/Wound32.png",
                    label: token.woundState().count(),
                    labelClass: "lightImageText",
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

    return TokenUI;
});
