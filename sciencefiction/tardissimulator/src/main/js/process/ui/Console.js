define(function()
{
    "use strict";
    var Console = React.createClass(
    {
        componentDidMount: function()
        {
            this.paint();
        },

        componentDidUpdate: function()
        {
            this.paint();
        },

        render: function()
        {
            return React.DOM.canvas(
            {
                id: "consolePanel",
                width: this.props.width,
                height: this.props.height,
            });
        },

        paint: function()
        {
            var canvas = document.getElementById("consolePanel");
            var context = canvas.getContext("2d");
            var width = canvas.width;
            var height = canvas.height;

            context.clearRect(0, 0, this.props.width, this.props.height);

            var widthCollar = 170;

            // Panel.
            var x1 = (width - widthCollar) / 2;
            var y1 = 0;
            var x2 = width - x1;
            var y2 = y1;
            var x3 = width;
            var y3 = height;
            var x4 = 0;
            var y4 = y3;
            context.fillStyle = "#C0C0C0"; // silver
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.lineTo(x3, y3);
            context.lineTo(x4, y4);
            context.closePath();
            context.fill();

            var consolePanel = this.props.consolePanel;
            var imgSrc = consolePanel.image;
            var title = consolePanel.name;
            canvas.title = title;
            canvas.alt = title;

            var image = new Image();
            image.onload = function()
            {
                context.drawImage(image, x4, y1, width, y3 - y1);

                // Left divider.
                context.strokeStyle = "red";
                this.drawLine(context, x1, y1, x4, y4);

                // Right divider.
                this.drawLine(context, x2, y2, x3, y3);
            }.bind(this);
            image.src = imgSrc;
        },

        drawLine: function(context, x1, y1, x2, y2)
        {
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.closePath();
            context.stroke();
        },
    });

    Console.propTypes =
    {
        consolePanel: React.PropTypes.object.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
    };

    if (Object.freeze)
    {
        Object.freeze(Console);
    }

    return Console;
});
