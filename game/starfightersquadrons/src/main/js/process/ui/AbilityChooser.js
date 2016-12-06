define(["Pilot", "UpgradeCard", "process/ui/AbilityUI", "../../../../../../../coreweb/src/main/js/ui/InputPanel2"],
    function(Pilot, UpgradeCard, AbilityUI, InputPanel)
    {
        var AbilityChooser = React.createClass(
        {
            propTypes:
            {
                damages: React.PropTypes.array.isRequired,
                imageBase: React.PropTypes.string.isRequired,
                onChange: React.PropTypes.func.isRequired,
                pilots: React.PropTypes.array.isRequired,
                token: React.PropTypes.object.isRequired,
                upgrades: React.PropTypes.array.isRequired,
            },

            render: function()
            {
                var token = this.props.token;
                var damages = this.props.damages;
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
                    var answer;

                    if (value.isDamage())
                    {
                        answer = createDamageLabel(value, imageBase);
                    }
                    else if (value.isPilot())
                    {
                        answer = createPilotLabel(value.sourceObject(), imageBase);
                    }
                    else if (value.isUpgrade())
                    {
                        answer = createUpgradeLabel(value.sourceObject(), imageBase);
                    }
                    else
                    {
                        throw "Unknown value: " + value;
                    }
                    return answer;
                };

                var values = pilots.slice();
                values.vizziniAddAll(upgrades);
                values.vizziniAddAll(damages);

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

                var isAccepted = (selected !== undefined);
                this.props.onChange(selected, isAccepted);
            },

            ok: function(event, selected)
            {
                var isAccepted = false;
                this.props.onChange(undefined, undefined, undefined, isAccepted);
            },
        });

        function createDamageLabel(damage, imageBase)
        {
            return React.createElement(AbilityUI.Damage,
            {
                damage: damage,
                imageBase: imageBase,
            });
        }

        function createPilotLabel(pilot, imageBase)
        {
            return React.createElement(AbilityUI.Pilot,
            {
                pilot: pilot,
                imageBase: imageBase,
            });
        }

        function createUpgradeLabel(upgrade, imageBase)
        {
            return React.createElement(AbilityUI.Upgrade,
            {
                upgrade: upgrade,
                imageBase: imageBase,
            });
        }

        return AbilityChooser;
    });
