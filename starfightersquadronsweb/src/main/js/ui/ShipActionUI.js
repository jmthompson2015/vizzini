define([ "ShipAction" ], function(ShipAction)
{
    "use strict";
    var ShipActionUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("shipActionKey", this.props.shipActionKey);

            var shipActionKey = this.props.shipActionKey;
            var shipAction = ShipAction.properties[shipActionKey];
            var actionName0 = shipAction.displayName;
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
                title: actionName0,
            });
            var showName = (this.props.showName !== undefined ? this.props.showName : false);

            var answer = image;

            if (showName)
            {
                answer = React.DOM.span(
                {
                    className: "shipActionUIImage",
                }, image, " ", actionName0);
            }

            return answer;
        },
    });

    return ShipActionUI;
});
