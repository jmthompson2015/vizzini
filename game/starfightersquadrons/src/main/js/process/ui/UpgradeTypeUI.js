define(function()
{
    "use strict";
    var UpgradeTypeUI = React.createClass(
    {
        propTypes:
        {
            upgradeType: React.PropTypes.object.isRequired,
            imageBase: React.PropTypes.string.isRequired,

            // default: upgrade type value
            myKey: React.PropTypes.string,
        },

        render: function()
        {
            var upgradeType = this.props.upgradeType;
            var typeName0 = upgradeType.name;
            var typeName = typeName0.replace(" ", "");
            var fileString = this.props.imageBase + "upgrade/" + typeName + "24.png";
            var myKey = (this.props.myKey !== undefined ? this.props.myKey : upgradeType.value);

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
