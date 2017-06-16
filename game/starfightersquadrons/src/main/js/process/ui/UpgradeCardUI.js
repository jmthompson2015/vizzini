define(["UpgradeCard", "process/ui/UpgradeTypeUI"],
   function(UpgradeCard, UpgradeTypeUI)
   {
      "use strict";
      var UpgradeCardUI = React.createClass(
      {
         propTypes:
         {
            imageBase: PropTypes.string.isRequired,
            upgradeCard: PropTypes.object.isRequired,
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
               }, upgrade.header.name));

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
               upgradeType: upgrade.type,
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
         upgrade.ranges.forEach(function(range)
         {
            var myDistance = range.minDistance;

            if (!minRange || myDistance < minRange.minDistance)
            {
               minRange = range;
            }

            if (!maxRange || myDistance > maxRange.minDistance)
            {
               maxRange = range;
            }
         });

         var answer = minRange.name;

         if (minRange !== maxRange)
         {
            answer += "-" + maxRange.name;
         }

         return answer;
      };

      return UpgradeCardUI;
   });
