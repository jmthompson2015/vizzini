define([ "Body", "ui/BodyUI" ], function(Body, BodyUI)
{
    "use strict";
    QUnit.module("BodyUI");

    QUnit.test("BodyUI() Venus", function(assert)
    {
        // Setup.
        var bodyKey = Body.VENUS;
        var body = Body.properties[bodyKey];
        var isBump = false;
        var isSpecular = false;
        var callback = function(bodyUI)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(bodyUI);
            assert.equal(bodyUI.name, body.name);
            assert.equal(bodyUI.bodyKey, bodyKey);
            assert.equal(bodyUI.children.length, 1); // axis helper
            done();
        };

        // Run.
        var done = assert.async();
        new BodyUI(body, isBump, isSpecular, callback);
    });

    QUnit.test("BodyUI() Earth", function(assert)
    {
        // Setup.
        var bodyKey = Body.EARTH;
        var body = Body.properties[bodyKey];
        var isBump = true;
        var isSpecular = true;
        var callback = function(bodyUI)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(bodyUI);
            assert.equal(bodyUI.name, body.name);
            assert.equal(bodyUI.bodyKey, bodyKey);
            assert.equal(bodyUI.children.length, 1); // axis helper
            done();
        };

        // Run.
        var done = assert.async();
        new BodyUI(body, isBump, isSpecular, callback);
    });

    QUnit.test("BodyUI() Saturn", function(assert)
    {
        // Setup.
        var bodyKey = Body.SATURN;
        var body = Body.properties[bodyKey];
        var isBump = false;
        var isSpecular = false;
        var callback = function(bodyUI)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(bodyUI);
            assert.equal(bodyUI.name, body.name);
            assert.equal(bodyUI.bodyKey, bodyKey);
            assert.equal(bodyUI.children.length, 2); // ring and axis helper
            done();
        };

        // Run.
        var done = assert.async();
        new BodyUI(body, isBump, isSpecular, callback);
    });
});
