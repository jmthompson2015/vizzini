/*
 * Provides a user interface to choose an upgrade card.
 * 
 * @param pilot Pilot.
 * @param upgradeType Upgrade type.
 * @param index Index of this chooser.
 * @param onChangeFunction Called for the select onChange event.
 */
var UpgradeChooser = React.createClass(
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
        var upgrades = UpgradeCard.valuesByPilotAndType(pilot, upgradeType);
        var options = [];
        options.push(React.DOM.option(
        {
            key: 0,
            value: "*none*"
        }, "*none*"));

        for (var i = 0; i < upgrades.length; i++)
        {
            var upgradeCard = upgrades[i];
            var upgradeProps = UpgradeCard.properties[upgradeCard];
            options.push(React.DOM.option(
            {
                key: i + 1,
                value: upgradeCard
            }, upgradeProps.name));
        }

        var rows = [];

        var image = UpgradeCardUI.createUpgradeImage(upgradeType, 0);
        var spacer = React.DOM.span(
        {
            key: 1
        }, " ");
        var select = React.DOM.select(
        {
            key: 2,
            onChange: this.upgradeCardChanged,
            "data-index": this.props.index
        }, options);
        var cell0 = React.DOM.td({}, [ image, spacer, select ]);
        rows.push(React.DOM.tr(
        {
            key: this.createId() + "0"
        }, cell0));

        var cell1 = React.DOM.td(
        {
            id: this.createId()
        }, " ");
        rows.push(React.DOM.tr(
        {
            key: this.createId() + "1"
        }, cell1));

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
