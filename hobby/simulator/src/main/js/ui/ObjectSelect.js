define([ "Body", "BodyType" ], function(Body, BodyType)
{
    "use strict";
    var BodySelect = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("bodyKeys", this.props.bodyKeys);

            var bodyKeys = this.props.bodyKeys;
            var labelFunction = function(bodyKey)
            {
                var body = Body.properties[bodyKey];
                var prefix = (body.type === BodyType.MOON ? "\u25D0 " : "");
                return prefix + body.name;
            };

            return React.createElement(Select,
            {
                values: bodyKeys,
                labelFunction: labelFunction,
                onChange: this.bodyChanged,
            });
        },

        bodyChanged: function(event)
        {
            InputValidator.validateNotNull("callback", this.props.callback);

            var bodyKey = event.target.value;
            LOGGER.trace("bodyChanged() bodyKey = " + bodyKey);

            this.props.callback(bodyKey);
        },
    });

    var ShipSelect = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("shipKeys", this.props.shipKeys);
            InputValidator.validateNotNull("environment", this.props.environment);

            var shipKeys = this.props.shipKeys.sort();
            var environment = this.props.environment;
            var labelFunction = function(shipKey)
            {
                var ship = environment.ship(shipKey);
                return ship.name();
            };

            return React.createElement(Select,
            {
                values: shipKeys,
                labelFunction: labelFunction,
                onChange: this.shipChanged,
            });
        },

        shipChanged: function(event)
        {
            InputValidator.validateNotNull("callback", this.props.callback);

            var shipKey = event.target.value;
            LOGGER.trace("shipChanged() shipKey = " + shipKey);

            this.props.callback(shipKey);
        },
    });

    return (
    {
        BodySelect: BodySelect,
        ShipSelect: ShipSelect,
    });
});
