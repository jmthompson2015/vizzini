/*
 * Provides a user interface to choose an upgrade card.
 * 
 * @param pilot Pilot.
 * @param upgradeType Upgrade type.
 * @param index Index of this chooser.
 * @param onChangeFunction Called for the select onChange event.
 */
var UpgradeChooser = React
        .createClass(
        {
            getInitialState: function()
            {
                return (
                {
                    selected: undefined
                });
            },

            render: function()
            {
                var pilot = this.props.pilot;
                var upgradeType = this.props.upgradeType;
                var upgrades = UpgradeCard.valuesByPilotAndType(pilot,
                        upgradeType);
                upgrades.unshift("*none*");

                var rows = [];

                var image = UpgradeCardUI.createUpgradeImage(upgradeType, 0);
                var labelFunction = function(value)
                {
                    return (UpgradeCard.properties[value] ? UpgradeCard.properties[value].name
                            : value);
                };
                var select = React.createElement(Select,
                {
                    key: 2,
                    values: upgrades,
                    labelFunction: labelFunction,
                    onChange: this.upgradeCardChanged,
                    clientProps:
                    {
                        "data-index": this.props.index
                    }
                });

                rows.push(React.DOM.tr(
                {
                    key: 0
                }, React.DOM.td({}, image, select)));

                rows.push(React.DOM.tr(
                {
                    key: 1
                }, React.DOM.td(
                {
                    id: this.createId()
                }, " ")));

                var tbody = React.DOM.tbody({}, rows);

                return React.DOM.table(
                {
                    className: "upgradeChooser"
                }, tbody);
            },

            createId: function()
            {
                var pilot = this.props.pilot;
                var upgradeType = this.props.upgradeType;
                var index = this.props.index;

                return pilot + upgradeType + index;
            },

            getSelected: function()
            {
                return this.state.selected;
            },

            upgradeCardChanged: function(event)
            {
                var upgradeCard = event.currentTarget.value;
                var id = this.createId();
                var element = document.getElementById(id);

                if (upgradeCard === "*none*")
                {
                    this.setState(
                    {
                        selected: undefined
                    });
                    element.innerHTML = "";
                }
                else
                {
                    this.setState(
                    {
                        selected: upgradeCard
                    });
                    var component = React.createElement(UpgradeCardUI,
                    {
                        upgradeCard: upgradeCard
                    });
                    React.render(component, element);
                }

                this.props.onChangeFunction(event);
            },
        });
