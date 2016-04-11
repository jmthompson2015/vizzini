define([ "UpgradeCard" ], function(UpgradeCard)
{
    var EnergyAllocationPanel = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("token", this.props.token);

            var token = this.props.token;

            var message = "Active Ship: " + token.name();

            var energy;

            if (token.tokenFore && token.tokenAft)
            {
                energy = token.tokenFore().energy().count() + token.tokenAft().energy().count();
            }
            else
            {
                energy = token.energy().count();
            }

            var rows = [];
            var cells = [];
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, energy));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, "Available Energy"));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            if (token.tokenFore && token.tokenAft)
            {
                rows.vizziniAddAll(this.createUpgradeRows(token.tokenFore(), rows.length + 1));
                rows.vizziniAddAll(this.createUpgradeRows(token.tokenAft(), rows.length + 1));
            }
            else
            {
                rows.vizziniAddAll(this.createUpgradeRows(token, rows.length + 1));
            }

            var initialInput = React.DOM.table({}, rows);

            var cancelButton = React.DOM.button(
            {
                key: 0,
                onClick: this.cancel
            }, "Cancel");
            var okButton = React.DOM.button(
            {
                key: 1,
                onClick: this.ok
            }, "OK");
            var buttons = React.DOM.span({}, [ cancelButton, okButton ]);

            return React.createElement(OptionPane,
            {
                panelClass: "optionPane",
                title: "Allocate Energy",
                titleClass: "optionPaneTitle",
                message: message,
                messageClass: "optionPaneMessage",
                initialInput: initialInput,
                buttons: buttons,
                buttonsClass: "optionPaneButtons"
            });
        },

        cancel: function()
        {
            LOGGER.debug("Cancel clicked");
            this.props.callback(undefined);
        },

        createUpgradeRow: function(upgrade, token, key)
        {
            var cells = [];

            var energy = token.energyForUpgrade(upgrade.value);
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, React.DOM.input(
            {
                className: "energyInput",
                onChange: this.handleChange,
                type: "number",
                value: energy.count(),
            })));

            var label = "/" + upgrade.energyLimit + " " + upgrade.name;
            if (token.pilot().name.endsWith("(fore)"))
            {
                label += " (fore)";
            }
            else if (token.pilot().name.endsWith("(aft)"))
            {
                label += " (aft)";
            }
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "energyLabel",
            }, label));

            return React.DOM.tr(
            {
                key: key,
            }, cells);
        },

        createUpgradeRows: function(token, startKey)
        {
            var rows = [];
            var upgradeKeys = token.upgradeKeys();
            var upgrades = upgradeKeys.map(function(upgradeKey)
            {
                return UpgradeCard.properties[upgradeKey];
            });
            upgrades = upgrades.filter(function(upgrade)
            {
                return upgrade.energyLimit !== undefined && upgrade.energyLimit > 0;
            });

            upgrades.forEach(function(upgrade)
            {
                rows.push(this.createUpgradeRow(upgrade, token, startKey + rows.length + 1));
            }, this);

            return rows;
        },

        handleChange: function(event)
        {
            LOGGER.info("handleChange()");
        },

        ok: function()
        {
            var selected = this.state.selected;
            LOGGER.debug("OK clicked, selected = " + selected);
            this.props.callback(selected);
        },
    });

    return EnergyAllocationPanel;
});
