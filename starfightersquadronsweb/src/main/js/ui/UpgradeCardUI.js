/*
 * Provides a user interface for an upgrade card.
 * 
 * @param upgradeCard Upgrade card.
 */
define([ "RangeRuler", "UpgradeCard", "UpgradeHeader", "UpgradeType" ], function(RangeRuler, UpgradeCard,
        UpgradeHeader, UpgradeType)
{
    var UpgradeCardUI = React.createClass(
    {
        render: function()
        {
            var upgradeCard = this.props.upgradeCard;
            var upgradeProps = UpgradeCard.properties[upgradeCard];
            var rows = [];

            var cells0 = [];
            var colspan0 = (upgradeProps.weaponValue ? 1 : 2);
            cells0.push(React.DOM.td(
            {
                key: cells0.length,
                colSpan: colspan0,
                className: "upgradeCardUIName",
            }, UpgradeCard.getName(upgradeCard)));

            if (upgradeProps.weaponValue)
            {
                cells0.push(React.DOM.td(
                {
                    key: cells0.length,
                    className: "upgradeCardUIWeaponValue",
                }, upgradeProps.weaponValue));
            }
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells0));

            if (upgradeProps.header)
            {
                var cells1 = [];
                var colspan1 = (upgradeProps.ranges ? 1 : 2);
                cells1.push(React.DOM.td(
                {
                    key: cells1.length,
                    colSpan: colspan1,
                    className: "upgradeCardUIHeader",
                }, UpgradeHeader.properties[upgradeProps.header].name));

                if (upgradeProps.ranges)
                {
                    var ranges = this.createRangesLabel();
                    cells1.push(React.DOM.td(
                    {
                        key: cells1.length,
                        className: "upgradeCardUIRanges",
                    }, ranges));
                }

                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, cells1));
            }

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                colSpan: 2,
            }, upgradeProps.description)));

            var cells3 = [];
            cells3.push(React.DOM.td(
            {
                key: cells3.length,
                className: "upgradeCardUIImage"
            }, UpgradeCardUI.createUpgradeImage(upgradeProps.type)));
            cells3.push(React.DOM.td(
            {
                key: cells3.length,
                className: "upgradeCardUISquadPoints",
                title: "Squad Point cost"
            }, upgradeProps.squadPointCost));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells3));

            return React.DOM.table(
            {
                className: "upgradeCardUI"
            }, React.DOM.tbody({}, rows));
        },

        createRangesLabel: function()
        {
            var upgradeCard = this.props.upgradeCard;
            var upgradeProps = UpgradeCard.properties[upgradeCard];
            var minRange;
            var maxRange;
            upgradeProps.ranges.forEach(function(range)
            {
                var myDistance = RangeRuler.properties[range].minDistance;

                if (!minRange || myDistance < RangeRuler.properties[minRange].minDistance)
                {
                    minRange = range;
                }

                if (!maxRange || myDistance > RangeRuler.properties[maxRange].minDistance)
                {
                    maxRange = range;
                }
            });

            var answer = RangeRuler.properties[minRange].displayName;

            if (minRange !== maxRange)
            {
                answer += "-" + RangeRuler.properties[maxRange].displayName;
            }

            return answer;
        },
    });

    UpgradeCardUI.createUpgradeImage = function(upgradeType, key)
    {
        InputValidator.validateNotNull("upgradeType", upgradeType);

        var typeName0 = UpgradeType.properties[upgradeType].displayName;
        var typeName = typeName0.replace(" ", "");
        var fileString = imageBase + "upgrade/" + typeName + "24.png";
        var myKey = (key ? key : 0);

        return React.DOM.img(
        {
            key: myKey,
            className: "upgradeCardUIImage",
            src: fileString,
            title: typeName0,
        });
    }

    return UpgradeCardUI;
});
