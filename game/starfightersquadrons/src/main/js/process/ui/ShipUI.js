define(["process/ui/ShipImage"], function(ShipImage)
{
    var ShipUI = React.createClass(
    {
        propTypes:
        {
            canvasId: React.PropTypes.string.isRequired,
            imageBase: React.PropTypes.string.isRequired,
            position: React.PropTypes.object.isRequired,
            shipTeam: React.PropTypes.object.isRequired,
        },

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
            var shipTeam = this.props.shipTeam;
            var shipBase = shipTeam.ship.shipBase;

            return React.DOM.canvas(
            {
                id: this.props.canvasId,
                width: shipBase.width,
                height: shipBase.height,
                title: shipTeam.name,
            });
        },

        paint: function()
        {
            var shipTeam = this.props.shipTeam;
            var shipBase = shipTeam.ship.shipBase;
            var canvas = document.getElementById(this.props.canvasId);
            var context = canvas.getContext("2d");
            var scale = 1.0;
            var id;
            var imageBase = this.props.imageBase;
            var image = new Image();
            image.onload = function()
            {
                this.forceUpdate();
            }.bind(this);
            image.src = imageBase + "ship/" + shipTeam.image;
            var position = this.props.position;

            context.clearRect(0, 0, shipBase.width, shipBase.height);

            ShipImage.draw(context, scale, id, image, position, shipTeam);
        },
    });

    return ShipUI;
});
