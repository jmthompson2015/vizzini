define(["ShipAction", "process/ui/ShipActionUI"], function(ShipAction, ShipActionUI)
{
    "use strict";
    var ShipActionPanel = React.createClass(
    {
        propTypes:
        {
            shipActionKeys: PropTypes.array.isRequired,
            imageBase: PropTypes.string.isRequired,
        },

        render: function()
        {
            var shipActionKeys = this.props.shipActionKeys;
            var cells = [];

            shipActionKeys.forEach(function(shipActionKey, i)
            {
                var image = React.createElement(ShipActionUI,
                {
                    shipAction: ShipAction.properties[shipActionKey],
                    imageBase: this.props.imageBase,
                });

                cells.push(React.DOM.td(
                {
                    key: i,
                    className: "shipActionPanelCell",
                }, image));
            }, this);

            var row = React.DOM.tr(
            {
                className: "pilotCardUIShipActions"
            }, cells);
            return React.DOM.table(
            {
                className: "pilotCardUIShipActions"
            }, React.DOM.tbody(
            {}, row));
        },
    });

    return ShipActionPanel;
});
