define(function()
{
    "use strict";
    var FactionUI = React.createClass(
    {
        propTypes:
        {
            faction: React.PropTypes.object.isRequired,
            imageBase: React.PropTypes.string.isRequired,

            // default: faction value
            myKey: React.PropTypes.string,
            // default: false
            isSmall: React.PropTypes.bool,
        },

        render: function()
        {
            var faction = this.props.faction;
            var size = (this.props.isSmall !== undefined ? 24 : 32);
            var fileString = this.props.imageBase + faction.shortName + "Icon" + size + ".png";
            var myKey = (this.props.myKey !== undefined ? this.props.myKey : faction.value);

            var image = React.DOM.img(
            {
                key: myKey,
                className: "factionUIImage",
                src: fileString,
                title: faction.name,
            });
            var showName = (this.props.showName !== undefined ? this.props.showName : false);

            var answer = image;

            if (showName)
            {
                answer = React.DOM.span(
                {
                    className: "factionUIImage",
                }, image, " ", faction.name);
            }

            return answer;
        },
    });

    return FactionUI;
});
