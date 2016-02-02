define(
        [ "Environment", "Quaternion", "StateFactory", "Vector", "ship/Conduit", "ship/Power", "ship/Sensor",
                "ship/SupplyType" ],
        function(Environment, Quaternion, StateFactory, Vector, Conduit, Power, Sensor, SupplyType)
        {
            "use strict";
            QUnit.module("Conduit");

            QUnit.test("Conduit()", function(assert)
            {
                // Setup.
                var supplyType = SupplyType.POWER;
                var bodyToState = StateFactory.Reference.createStates();
                var environment = new Environment.Environment(bodyToState);
                var name = "ReferenceShip";
                var producer = new Power.FusionReactor("1", environment, name, Vector.ZERO, Quaternion.ZERO, 1, 2);
                var consumer = new Sensor.Camera("1", environment, name, Vector.ZERO, Quaternion.ZERO, 1);
                var conduit = new Conduit("1", supplyType, producer, consumer);

                // Run / Verify.
                assert.ok(conduit.producer());
                assert.ok(conduit.consumer());
            });

            QUnit
                    .test(
                            "toString()",
                            function(assert)
                            {
                                // Setup.
                                var supplyType = SupplyType.POWER;
                                var bodyToState = StateFactory.Reference.createStates();
                                var environment = new Environment.Environment(bodyToState);
                                var name = "ReferenceShip";
                                var producer = new Power.FusionReactor("1", environment, name, Vector.ZERO,
                                        Quaternion.ZERO, 1, 2);
                                var consumer = new Sensor.Camera("1", environment, name, Vector.ZERO, Quaternion.ZERO,
                                        1);
                                var conduit = new Conduit("1", supplyType, producer, consumer);

                                // Run / Verify.
                                assert
                                        .equal(
                                                conduit.toString(),
                                                "Conduit 1 supplyType=power producer=FusionReactor 1 consumePerTick=1 producePerTick=2 consumer=Camera 1 consumePerTick=1");
                            });
        });
