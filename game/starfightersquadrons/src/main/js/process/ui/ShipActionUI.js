define(function()
{
    "use strict";
    var ShipActionUI = React.createClass(
    {
        propTypes:
        {
            shipAction: React.PropTypes.object.isRequired,
            imageBase: React.PropTypes.string.isRequired,

            // default: ship action value
            myKey: React.PropTypes.string,
            // default: false
            showName: React.PropTypes.bool,
        },

        render: function()
        {
            var shipAction = this.props.shipAction;

            var actionName = shipAction.name.replace(" (left)", "Left");
            actionName = actionName.replace(" (straight)", "Straight");
            actionName = actionName.replace(" (right)", "Right");
            actionName = actionName.replace(/ /g, "");
            var fileString = this.props.imageBase + "pilotCard/" + actionName + "24.png";
            var myKey = (this.props.myKey !== undefined ? this.props.myKey : shipAction.value);

            var image = React.DOM.img(
            {
                key: myKey,
                className: "shipActionUIImage",
                src: fileString,
                title: shipAction.name,
            });
            var showName = (this.props.showName !== undefined ? this.props.showName : false);

            var answer = image;

            if (showName)
            {
                answer = React.DOM.span(
                {
                    className: "shipActionUIImage",
                }, image, " ", shipAction.name);
            }

            return answer;
        },
    });

    return ShipActionUI;
});
