/*
 * @param shipActionKey (required)
 * 
 * @param showName (optional; default: false)
 */
define([ "ShipAction" ], function(ShipAction)
{
    "use strict";
    var ShipActionUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("shipActionKey", this.props.shipActionKey);

            var shipActionKey0 = this.props.shipActionKey;
            var shipActionKey = (shipActionKey0.shipAction !== undefined ? shipActionKey0.shipAction : shipActionKey0);
            var shipAction = ShipAction.properties[shipActionKey];
            var actionName0 = shipAction.name;
            var actionName1 = actionName0;

            var actionName = actionName0.replace(" (left)", "Left");
            actionName = actionName.replace(" (straight)", "Straight");
            actionName = actionName.replace(" (right)", "Right");
            actionName = actionName.replace(" ", "");
            var fileString = imageBase + "pilotCard/" + actionName + "24.png";

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
