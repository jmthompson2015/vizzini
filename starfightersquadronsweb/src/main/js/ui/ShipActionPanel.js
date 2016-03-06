/*
 * @param shipActionKeys (required)
 */
define([ "ShipAction", "ui/ShipActionUI" ], function(ShipAction, ShipActionUI)
{
    "use strict";
    var ShipActionPanel = React.createClass(
    {
        excludes: [ ShipAction.BARREL_ROLL_RIGHT, ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT ],

        render: function()
        {
            InputValidator.validateNotNull("shipActionKeys", this.props.shipActionKeys);

            var shipActionKeys = this.props.shipActionKeys;
            var cells = [];

            shipActionKeys.forEach(function(shipActionKey, i)
            {
                if (!this.excludes.vizziniContains(shipActionKey))
                {
                    var myActionKey = shipActionKey;

                    if (shipActionKey === ShipAction.BARREL_ROLL_LEFT)
                    {
                        myActionKey = ShipAction.BARREL_ROLL;
                    }
                    else if (shipActionKey === ShipAction.BOOST_LEFT)
                    {
                        myActionKey = ShipAction.BOOST;
                    }

                    var img = React.createElement(ShipActionUI,
                    {
                        shipActionKey: myActionKey,
                    });

                    cells.push(React.DOM.td(
                    {
                        key: i,
                        className: "shipActionPanelCell",
                    }, img));
                }
            }, this);

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
