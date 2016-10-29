define(function()
{
    "use strict";
    var ShipSilhouetteUI = React.createClass(
    {
        propTypes:
        {
            ship: React.PropTypes.object.isRequired,
            imageBase: React.PropTypes.string.isRequired,

            // default: ship value
            myKey: React.PropTypes.string,
            // default: false
            showName: React.PropTypes.bool,
        },

        render: function()
        {
            var ship = this.props.ship;
            var shipName = ship.name.replace(/\//g, "_"); // forward slash
            shipName = shipName.replace(/ /g, "_");
            var fileString = this.props.imageBase + "silhouette/" + shipName + ".png";
            var myKey = (this.props.myKey !== undefined ? this.props.myKey : ship.value);

            var image = React.DOM.img(
            {
                key: myKey,
                className: "shipSilhouetteUIImage",
                src: fileString,
                title: ship.name,
            });
            var showName = (this.props.showName !== undefined ? this.props.showName : false);

            var answer = image;

            if (showName)
            {
                answer = React.DOM.span(
                {
                    className: "shipSilhouetteUIImage",
                }, image, " ", ship.name);
            }

            return answer;
        },
    });

    return ShipSilhouetteUI;
});
