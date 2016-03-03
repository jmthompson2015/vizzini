/*
 * @param upgradeTypeKey (required)
 * @param key (optional; default: 0)
 */
define([ "UpgradeType" ], function(UpgradeType)
{
    "use strict";
    var UpgradeTypeUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("upgradeTypeKey", this.props.upgradeTypeKey);

            var upgradeTypeKey = this.props.upgradeTypeKey;
            var typeName0 = UpgradeType.properties[upgradeTypeKey].displayName;
            var typeName = typeName0.replace(" ", "");
            var fileString = imageBase + "upgrade/" + typeName + "24.png";
            var myKey = (this.props.key !== undefined ? this.props.key : 0);

            return React.DOM.img(
            {
                key: myKey,
                className: "upgradeTypeUIImage",
                src: fileString,
                title: typeName0,
            });
        },
    });

    return UpgradeTypeUI;
});
