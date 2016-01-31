define(function()
{
    "use strict";
    function Device(name, environment, parentKey, position, orientation)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("parentKey", parentKey);
        InputValidator.validateNotNull("position", position);
        InputValidator.validateNotNull("orientation", orientation);

        this.name = function()
        {
            return name;
        };

        this.environment = function()
        {
            return environment;
        };

        this.parentKey = function()
        {
            return parentKey;
        };

        this.position = function()
        {
            return position;
        };

        this.orientation = function()
        {
            return orientation;
        };

        var consumeConduits = [];
        var produceConduits = [];

        this.addConsumeConduit = function(conduit)
        {
            consumeConduits.push(conduit);
        };

        this.addProduceConduit = function(conduit)
        {
            produceConduits.push(conduit);
        };

        this.consumeConduits = function()
        {
            return consumeConduits.slice();
        };

        this.produceConduits = function()
        {
            return produceConduits.slice();
        };

        this.removeConsumeConduit = function(conduit)
        {
            consumeConduits.vizziniRemove(conduit);
        };

        this.removeProduceConduit = function(conduit)
        {
            produceConduits.vizziniRemove(conduit);
        };
    }

    Device.prototype.absoluteOrientation = function()
    {
        var parentState = this.environment().state(this.parentKey());

        if (!parentState) { throw "Can't find parentState for parentKey: " + this.parentKey(); }

        return this.orientation().multiply(parentState.orientation()).unit();
    };

    Device.prototype.absolutePosition = function()
    {
        var parentState = this.environment().state(this.parentKey());

        if (!parentState) { throw "Can't find parentState for parentKey: " + this.parentKey(); }

        return this.position().add(parentState.position());
    };

    Device.prototype.consumeConduitsByType = function(supplyType)
    {
        InputValidator.validateNotNull("supplyType", supplyType);

        return this.consumeConduits().filter(function(conduit)
        {
            return conduit.supplyType() === supplyType;
        });
    };

    return Device;
});
