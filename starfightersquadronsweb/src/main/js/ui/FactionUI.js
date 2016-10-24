/*
 * @param factionKey (required)
 * @param key (optional; default: 0)
 * @param isSmall (optional; default: false)
 */
define([ "Team" ], function(Team)
{
    "use strict";
    var FactionUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("factionKey", this.props.factionKey);

            var factionKey = this.props.factionKey;
            var faction = Team.properties[factionKey];
            var size = (this.props.isSmall !== undefined ? 24 : 32);
            var fileString = imageBase + faction.shortName + "Icon" + size + ".png";
            var myKey = (this.props.key !== undefined ? this.props.key : 0);

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
