define(["UpgradeType", "process/ui/FactionUI", "process/ui/UpgradeTypeUI", "../../../../../../../coreweb/src/main/js/ui/InputPanel2"],
    function(UpgradeType, FactionUI, UpgradeTypeUI, InputPanel)
    {
        var AbilityChooser = React.createClass(
        {
            propTypes:
            {
                imageBase: React.PropTypes.string.isRequired,
                onChange: React.PropTypes.func.isRequired,
                pilots: React.PropTypes.array.isRequired,
                token: React.PropTypes.object.isRequired,
                upgrades: React.PropTypes.array.isRequired,
            },

            render: function()
            {
                var token = this.props.token;
                var pilots = this.props.pilots;
                var upgrades = this.props.upgrades;
                var imageBase = this.props.imageBase;

                var message = "Active Ship: " + token.name();
                var okButton = React.DOM.button(
                {
                    key: 0,
                    onClick: this.ok,
                }, "Pass");
                var buttons = React.DOM.span(
                {}, [okButton]);

                var labelFunction = function(value)
                {
                    return (value.shipTeamKey ? createPilotLabel(value, imageBase) : createUpgradeLabel(value, imageBase));
                };

                var values = pilots.slice();
                values.vizziniAddAll(upgrades);

                var initialInput = React.createElement(InputPanel,
                {
                    type: InputPanel.Type.RADIO,
                    values: values,
                    name: "selectUpgrade",
                    labelFunction: labelFunction,
                    onChange: this.myOnChange,
                    panelClass: "combatChoicePanel",
                });

                var title = "Select Ability";

                return React.createElement(OptionPane,
                {
                    panelClass: "optionPane",
                    title: title,
                    titleClass: "optionPaneTitle",
                    message: message,
                    messageClass: "combatMessage",
                    initialInput: initialInput,
                    buttons: buttons,
                    buttonsClass: "optionPaneButtons",
                });
            },

            myOnChange: function(event, selected)
            {
                LOGGER.trace("AbilityChooser.myOnChange()");
                LOGGER.debug("AbilityChooser.myOnChange() selected = " + selected + " " + (typeof selected));

                var pilotKey, upgradeKey;
                var isAccepted = false;

                if (selected.shipTeamKey)
                {
                    pilotKey = selected.value;
                    isAccepted = true;
                }
                else if (selected.type)
                {
                    upgradeKey = selected.value;
                    isAccepted = true;
                }

                this.props.onChange(pilotKey, upgradeKey, isAccepted);
            },

            ok: function(event, selected)
            {
                var isAccepted = false;
                this.props.onChange(undefined, undefined, isAccepted);
            },
        });

        function createPilotLabel(pilot, imageBase)
        {
            InputValidator.validateNotNull("pilot", pilot);

            var icon = React.createElement(FactionUI,
            {
                faction: pilot.shipTeam.team,
                imageBase: imageBase,
                isSmall: true,
            });

            return React.DOM.span(
            {}, icon, " ", React.DOM.span(
            {
                title: pilot.description,
            }, pilot.name));
        }

        function createUpgradeLabel(upgrade, imageBase)
        {
            InputValidator.validateNotNull("upgrade", upgrade);

            var icon = React.createElement(UpgradeTypeUI,
            {
                upgradeType: UpgradeType.properties[upgrade.type],
                imageBase: imageBase,
            });

            return React.DOM.span(
            {}, icon, " ", React.DOM.span(
            {
                title: upgrade.description,
            }, upgrade.name));
        }

        return AbilityChooser;
    });
