define(function()
{
    "use strict";
    function Conduit(name, supplyType, producer, consumer)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("supplyType", supplyType);
        InputValidator.validateNotNull("producer", producer);
        InputValidator.validateNotNull("consumer", consumer);

        this.name = function()
        {
            return name;
        };

        this.supplyType = function()
        {
            return supplyType;
        };

        this.producer = function()
        {
            return producer;
        };

        this.consumer = function()
        {
            return consumer;
        };
    }

    Conduit.prototype.toString = function()
    {
        return "Conduit " + this.name() + " supplyType=" + this.supplyType() + " producer=" + this.producer() +
                " consumer=" + this.consumer();
    };

    return Conduit;
});
