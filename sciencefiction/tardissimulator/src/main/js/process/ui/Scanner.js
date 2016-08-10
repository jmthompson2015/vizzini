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
                id: "scanner-cover-top",
                src: "../resources/images/scanner-cover-top.png",
                alt: "missing image top",
            }));
            cells.push(React.DOM.img(
            {
                key: cells.length,
                id: "scanner-cover-bottom",
                src: "../resources/images/scanner-cover-bottom.png",
                alt: "missing image bottom",
            }));

            return React.DOM.figure(
            {
                id: "scanner",
                style:
                {
                    backgroundImage: "url(" + this.props.image + ")",
                },
                title: this.props.title,
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
