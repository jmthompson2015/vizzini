define(["ShipState", "Team", "process/ui/LabeledImage"], function(ShipState, Team, LabeledImage)
{
    "use strict";
    var ShipStateUI = React.createClass(
    {
        propTypes:
        {
            faction: React.PropTypes.object.isRequired,
            imageBase: React.PropTypes.string.isRequired,
            shipState: React.PropTypes.object.isRequired,

            // default: undefined
            label: React.PropTypes.string,
            // default: undefined
            labelClass: React.PropTypes.string,
            // default: ship state value
            myKey: React.PropTypes.string,
            // default: false
            showName: React.PropTypes.bool,
            // default: false
            showOne: React.PropTypes.bool,
        },

        render: function()
        {
            var shipState = this.props.shipState;
            var faction = this.determineFaction(this.props.faction);
            var size = (shipState.value === ShipState.PILOT_SKILL ? 32 : 24);
            var src = this.createFilename(faction, shipState, size);
            var myKey = (this.props.myKey !== undefined ? this.props.myKey : shipState.value);
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
                    imageBase: this.props.imageBase,
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
                    src: this.props.imageBase + src,
                    style: cellStyle,
                });
            }

            var cell0 = React.DOM.div(
            {
                key: myKey,
                style: cellStyle,
                title: shipState.name,
            }, image);

            var showName = (this.props.showName !== undefined ? this.props.showName : false);
            var answer = cell0;

            if (showName)
            {
                var cell1 = React.DOM.div(
                {
                    className: "shipStateUIText",
                    style: cellStyle,
                }, shipState.name);
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

        createFilename: function(faction, shipState, size)
        {
            InputValidator.validateNotNull("faction", faction);
            InputValidator.validateNotNull("shipState", shipState);
            InputValidator.validateNotNull("size", size);

            var factionName = faction.shortName;
            var shipStateName;
            // var size = 24;

            switch (shipState.value)
            {
                case ShipState.PILOT_SKILL:
                    shipStateName = "Skill";
                    // size = 32;
                    break;
                case ShipState.PRIMARY_WEAPON:
                    shipStateName = "Weapon";
                    break;
                case ShipState.TURRET_WEAPON:
                    shipStateName = "Turret_Weapon";
                    break;
                default:
                    shipStateName = shipState.name;
            }

            return "pilotCard/" + factionName + "_" + shipStateName + size + ".png";
        },

        determineFaction: function(faction)
        {
            InputValidator.validateNotNull("faction", faction);

            var answer = faction;

            if (faction.value === Team.FIRST_ORDER ||
                faction.value === Team.RESISTANCE)
            {
                var teamKey = Team.friend(faction.value);
                answer = Team.properties[teamKey];
            }

            return answer;
        },
    });

    return ShipStateUI;
});
