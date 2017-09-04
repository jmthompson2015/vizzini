define(["UpgradeCard", "process/ui/UpgradeTypeUI"],
   function(UpgradeCard, UpgradeTypeUI)
   {
      "use strict";
      var UpgradeChooser = React.createClass(
      {
         propTypes:
         {
            imageBase: PropTypes.string.isRequired,
            onChange: PropTypes.func.isRequired,
            pilot: PropTypes.object.isRequired,
            upgradeType: PropTypes.object.isRequired,

            index: PropTypes.number,
            initialUpgrade: PropTypes.object,
         },

         getInitialState: function()
         {
            var initialUpgrade = this.props.initialUpgrade;
            var upgradeKey = (initialUpgrade !== undefined ? initialUpgrade.value : undefined);

            return (
            {
               upgradeKey: upgradeKey,
            });
         },

         UPGRADE_PROMPT: "Select an upgrade",

         render: function()
         {
            var pilot = this.props.pilot;
            var upgradeType = this.props.upgradeType;
            var values = UpgradeCard.valuesByPilotAndType(pilot.value, upgradeType.value);
            values.unshift(this.UPGRADE_PROMPT);

            var labelFunction = function(value)
            {
               var upgrade = UpgradeCard.properties[value];
               return (upgrade ? upgrade.name + " [" + upgrade.squadPointCost + "]" : value);
            };

            var image = React.createElement(UpgradeTypeUI,
            {
               key: "upgradeChooserImage",
               upgradeType: upgradeType,
               imageBase: this.props.imageBase,
            });

            var select = React.createElement(Select,
            {
               key: "upgradeChooserSelect",
               values: values,
               labelFunction: labelFunction,
               initialSelectedValue: this.state.upgradeKey,
               onChange: this.upgradeChanged,
               clientProps:
               {
                  "data-index": this.props.index,
               }
            });

            return React.DOM.span(
            {}, image, select);
         },

         upgradeChanged: function(event)
         {
            var upgradeKey = event.currentTarget.value;
            var index = parseInt(event.currentTarget.dataset.index);

            this.setState(
            {
               upgradeKey: upgradeKey,
            });

            var pilot = this.props.pilot;
            var upgrade = UpgradeCard.properties[upgradeKey];
            this.props.onChange(event, pilot, upgrade, index);
         },
      });

      return UpgradeChooser;
   });
