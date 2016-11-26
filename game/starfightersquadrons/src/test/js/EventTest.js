define(["Event"], function(Event)
{
    "use strict";
    QUnit.module("Event");

    QUnit.test("Event properties Acquire Target Lock", function(assert)
    {
        var event = Event.ACQUIRE_TARGET_LOCK;
        var properties = Event.properties[event];
        assert.equal(properties.name, "Acquire Target Lock");
        assert.equal(properties.value, "acquireTargetLock");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Event.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Event);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Event[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Event.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Event[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("Event.values()", function(assert)
    {
        // Run.
        var result = Event.values();

        // Verify.
        assert.ok(result);
        var length = 11;
        assert.equal(result.length, length);
        assert.equal(result[0], Event.ACQUIRE_TARGET_LOCK);
        assert.equal(result[length - 1], Event.SPEND_TARGET_LOCK);
    });
});
