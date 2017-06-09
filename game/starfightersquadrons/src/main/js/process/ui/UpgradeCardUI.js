define(["RangeRuler", "UpgradeCard", "UpgradeHeader", "UpgradeType", "process/ui/UpgradeTypeUI"],
   function(RangeRuler, UpgradeCard, UpgradeHeader, UpgradeType, UpgradeTypeUI)
   {
      "use strict";
      var UpgradeCardUI = React.createClass(
      {
         propTypes:
         {
            imageBase: React.PropTypes.string.isRequired,
            upgradeCard: React.PropTypes.object.isRequired,
         },

         render: function()
         {
            var upgrade = this.props.upgradeCard;
            var rows = [];

            var cells0 = [];
            var colspan0 = (upgrade.weaponValue ? 1 : 2);
            cells0.push(React.DOM.td(
            {
               key: cells0.length,
               colSpan: colspan0,
               className: "upgradeCardUIName",
            }, UpgradeCard.getName(upgrade.value)));

            if (upgrade.weaponValue)
            {
               cells0.push(React.DOM.td(
               {
                  key: cells0.length,
                  className: "upgradeCardUIWeaponValue",
               }, upgrade.weaponValue));
            }
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cells0));

            if (upgrade.header)
            {
               var cells1 = [];
               var colspan1 = (upgrade.ranges ? 1 : 2);
               cells1.push(React.DOM.td(
               {
                  key: cells1.length,
                  colSpan: colspan1,
                  className: "upgradeCardUIHeader",
               }, UpgradeHeader.properties[upgrade.headerKey].name));

               if (upgrade.ranges)
               {
                  var ranges = UpgradeCardUI.createRangesLabel(upgrade.value);
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
            }, upgrade.description)));

            var cells3 = [];
            cells3.push(React.DOM.td(
            {
               key: cells3.length,
               className: "upgradeCardUIImage"
            }, React.createElement(UpgradeTypeUI,
            {
               upgradeType: UpgradeType.properties[upgrade.typeKey],
               imageBase: this.props.imageBase,
            })));
            cells3.push(React.DOM.td(
            {
               key: cells3.length,
               className: "upgradeCardUISquadPoints",
               title: "Squad Point cost"
            }, upgrade.squadPointCost));
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cells3));

            return React.DOM.table(
            {
               className: "upgradeCardUI"
            }, React.DOM.tbody(
            {}, rows));
         },
      });

      UpgradeCardUI.createRangesLabel = function(upgradeKey)
      {
         InputValidator.validateNotNull("upgradeKey", upgradeKey);

         var upgrade = UpgradeCard.properties[upgradeKey];
         var minRange;
         var maxRange;
         upgrade.rangeKeys.forEach(function(rangeKey)
         {
            var myDistance = RangeRuler.properties[rangeKey].minDistance;

            if (!minRange || myDistance < RangeRuler.properties[minRange].minDistance)
            {
               minRange = rangeKey;
            }

            if (!maxRange || myDistance > RangeRuler.properties[maxRange].minDistance)
            {
               maxRange = rangeKey;
            }
         });

         var answer = RangeRuler.properties[minRange].name;

         if (minRange !== maxRange)
         {
            answer += "-" + RangeRuler.properties[maxRange].name;
         }

         return answer;
      };

      return UpgradeCardUI;
   });
