/*
 * @param shipKey (required)
 * @param key (optional; default: 0)
 */
define([ "Ship" ], function(Ship)
{
    "use strict";
    var ShipSilhouetteUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("shipKey", this.props.shipKey);

            var shipKey = this.props.shipKey;
            var shipName0 = Ship.properties[shipKey].name;
            var shipName = shipName0.replace("/", "_");
            shipName = shipName.replace(" ", "_");
            var fileString = imageBase + "silhouette/" + shipName + ".png";
            var myKey = (this.props.key !== undefined ? this.props.key : 0);

            var image = React.DOM.img(
            {
                key: myKey,
                className: "shipSilhouetteUIImage",
                src: fileString,
                title: shipName0,
            });
            var showName = (this.props.showName !== undefined ? this.props.showName : false);

            var answer = image;

            if (showName)
            {
                answer = React.DOM.span(
                {
                    className: "shipSilhouetteUIImage",
                }, image, " ", shipName0);
            }

            return answer;
        },
    });

    return ShipSilhouetteUI;
});
