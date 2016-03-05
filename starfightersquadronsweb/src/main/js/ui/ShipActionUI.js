/*
 * @param shipActionKey (required)
 * 
 * @param showName (optional)
 */
define([ "Maneuver", "ShipAction" ], function(Maneuver, ShipAction)
{
    "use strict";
    var ShipActionUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("shipActionKey", this.props.shipActionKey);

            var shipActionKey0 = this.props.shipActionKey;
            var shipActionKey = (shipActionKey0.shipAction ? shipActionKey0.shipAction : shipActionKey0);
            var shipAction = ShipAction.properties[shipActionKey];
            var actionName0 = shipAction.displayName;
            var actionName1 = actionName0;

            if (this.props.shipActionKey.defender)
            {
                actionName1 += ": " + shipActionKey0.defender.name();
            }
            else if (this.props.shipActionKey.maneuver)
            {
                actionName1 += ": " + Maneuver.toString(shipActionKey0.maneuver);
            }

            var fileString;

            if (shipAction.image)
            {
                fileString = imageBase + "pilotCard/" + shipAction.image;
            }
            else
            {
                var actionName = actionName0.replace(" (left)", "");
                actionName = actionName.replace(" (straight)", "");
                actionName = actionName.replace(" (right)", "");
                actionName = actionName.replace(" ", "");
                fileString = imageBase + "pilotCard/" + actionName + "24.png";
            }

            var image = React.DOM.img(
            {
                className: "shipActionUIImage",
                src: fileString,
                title: actionName1,
            });
            var showName = (this.props.showName !== undefined ? this.props.showName : false);

            var answer = image;

            if (showName)
            {
                answer = React.DOM.span(
                {
                    className: "shipActionUIImage",
                }, image, " ", actionName1);
            }

            return answer;
        },
    });

    return ShipActionUI;
});
