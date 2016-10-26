/*
 * @param shipStateKey (required)
 * @param factionKey (required)
 *
 * @param label (optional)
 * @param labelClass (optional)
 */
define(["Team", "process/ui/LabeledImage"], function(Team, LabeledImage)
{
    "use strict";
    var ShipStateUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("shipStateKey", this.props.shipStateKey);
            InputValidator.validateNotNull("factionKey", this.props.factionKey);

            var shipStateKey = this.props.shipStateKey;
            var factionKey = this.determineFactionKey();
            var factionName = Team.properties[factionKey].shortName;
            var size = (shipStateKey === "Skill" ? 32 : 24);
            var src = "pilotCard/" + factionName + "_" + shipStateKey + size + ".png";
            var myKey = (this.props.key !== undefined ? this.props.key : 0);
            var label = this.props.label;
            var cellStyle = {
                display: "table-cell",
                verticalAlign: "middle",
            };
            var image;

            if (label !== undefined)
            {
                image = React.createElement(LabeledImage,
                {
                    image: src,
                    label: label,
                    labelClass: this.props.labelClass,
                    showOne: this.props.showOne,
                    style: cellStyle,
                    width: size,
                });
            }
            else
            {
                image = React.DOM.img(
                {
                    src: imageBase + src,
                    style: cellStyle,
                });
            }

            var cell0 = React.DOM.div(
            {
                key: myKey,
                style: cellStyle,
                title: shipStateKey,
            }, image);

            var showName = (this.props.showName !== undefined ? this.props.showName : false);
            var answer = cell0;

            if (showName)
            {
                var cell1 = React.DOM.div(
                {
                    className: "shipStateUIText",
                    style: cellStyle,
                }, shipStateKey);
                var row = React.DOM.div(
                {
                    style:
                    {
                        display: "table-row",
                    },
                }, cell0, cell1);
                answer = React.DOM.div(
                {
                    style:
                    {
                        display: "table",
                    },
                }, row);
            }

            return answer;
        },

        determineFactionKey: function()
        {
            var answer = this.props.factionKey;

            if (answer === Team.FIRST_ORDER)
            {
                answer = Team.IMPERIAL;
            }
            else if (answer === Team.RESISTANCE)
            {
                answer = Team.REBEL;
            }

            return answer;
        },
    });

    return ShipStateUI;
});
