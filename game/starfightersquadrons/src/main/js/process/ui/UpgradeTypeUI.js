define(function()
{
    "use strict";
    var UpgradeTypeUI = React.createClass(
    {
        propTypes:
        {
            upgradeType: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,

            // default: upgrade type value
            myKey: PropTypes.string,
            // default: false
            showName: PropTypes.string,
        },

        render: function()
        {
            var upgradeType = this.props.upgradeType;
            var typeName0 = upgradeType.name;
            var typeName = typeName0.replace(" ", "");
            var fileString = this.props.imageBase + "upgrade/" + typeName + "24.png";
            var myKey = (this.props.myKey !== undefined ? this.props.myKey : upgradeType.value);

            var icon = React.DOM.img(
            {
                key: myKey,
                className: "upgradeTypeUIImage",
                src: fileString,
                title: typeName0,
            });

            var answer = icon;

            var showName = (this.props.showName !== undefined ? this.props.showName : false);

            if (showName)
            {
                answer = React.DOM.span(
                {}, icon, " ", upgradeType.name);
            }

            return answer;
        },
    });

    return UpgradeTypeUI;
});
