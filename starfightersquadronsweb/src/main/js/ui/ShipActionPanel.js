/*
 * @param shipActionKeys (required)
 */
define([ "ui/ShipActionUI" ], function(ShipActionUI)
{
    "use strict";
    var ShipActionPanel = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("shipActionKeys", this.props.shipActionKeys);

            var shipActionKeys = this.props.shipActionKeys;
            var cells = [];

            shipActionKeys.forEach(function(shipActionKey, i)
            {
                var img = React.createElement(ShipActionUI,
                {
                    shipActionKey: shipActionKey,
                });

                cells.push(React.DOM.td(
                {
                    key: i,
                    className: "shipActionPanelCell",
                }, img));
            });

            var row = React.DOM.tr(
            {
                className: "pilotCardUIShipActions"
            }, cells);
            return React.DOM.table(
            {
                className: "pilotCardUIShipActions"
            }, row);
        },
    });

    return ShipActionPanel;
});
