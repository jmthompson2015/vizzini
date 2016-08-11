define(function()
{
    "use strict";
    var Scanner = React.createClass(
    {
        render: function()
        {
            var cells = [];
            cells.push(React.DOM.img(
            {
                key: cells.length,
                id: "scanner-image",
                src: this.props.image,
                title: this.props.title,
                alt: this.props.title,
            }));
            cells.push(React.DOM.img(
            {
                key: cells.length,
                id: "scanner-cover-top",
                src: "../resources/images/scanner-cover-top.png",
                alt: "Scanner cover top",
            }));
            cells.push(React.DOM.img(
            {
                key: cells.length,
                id: "scanner-cover-bottom",
                src: "../resources/images/scanner-cover-bottom.png",
                alt: "Scanner cover bottom",
            }));

            return React.DOM.div(
            {
                id: "scanner",
                style:
                {
                    backgroundImage: "url(../resources/scenes/time-vortex.gif)",
                },
                title: "Time Vortex",
                alt: "Time Vortex",
            }, cells);
        },
    });

    Scanner.propTypes =
    {
        image: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
    };

    if (Object.freeze)
    {
        Object.freeze(Scanner);
    }

    return Scanner;
});
