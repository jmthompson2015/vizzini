define(
        [ "Quaternion", "State", "Vector" ],
        function(Quaternion, State, Vector)
        {
            "use strict";
            QUnit.module("State");

            var DATE = moment("2016-Jan-22 00:00:00.0000", "YYYY-MMM-DD HH:mm:ss.SSS");

            QUnit.test("SimpleState()", function(assert)
            {
                // Setup.
                var position = Vector.ZERO;
                var orientation = Quaternion.ZERO;
                var state = new State.SimpleState(DATE, position, orientation);

                // Run / Verify.
                assert.equal(state.date().valueOf(), DATE.valueOf());
                verifyVector(assert, state.position(), 0.0, 0.0, 0.0);
                verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            });

            QUnit
                    .test(
                            "SimpleState.toString()",
                            function(assert)
                            {
                                // Setup.
                                var position = new Vector(1.0, 2.0, 3.0);
                                var orientation = new Quaternion(4.0, 5.0, 6.0, 7.0).unit();
                                var state = new State.SimpleState(DATE, position, orientation);

                                // Run.
                                var result = state.toString();

                                // Verify.
                                assert.ok(result);
                                assert
                                        .equal(
                                                result,
                                                "SimpleState date=2016-01-22 00:00:00.000 position=(1, 2, 3) orientation=(0.3563483225498992, 0.44543540318737396, 0.5345224838248488, 0.6236095644623235)");
                            });

            QUnit.test("State()", function(assert)
            {
                // Setup.
                var position = Vector.ZERO;
                var orientation = Quaternion.ZERO;
                var velocity = Vector.ZERO;
                var angularVelocity = Quaternion.ZERO;
                var state = new State.State(DATE, position, orientation, velocity, angularVelocity);

                // Run / Verify.
                assert.equal(state.date().valueOf(), DATE.valueOf());
                verifyVector(assert, state.position(), 0.0, 0.0, 0.0);
                verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
                verifyVector(assert, state.velocity(), 0.0, 0.0, 0.0);
                verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.0);
                verifyVector(assert, state.acceleration(), 0.0, 0.0, 0.0);
                verifyQuaternion(assert, state.angularAcceleration(), 1.0, 0.0, 0.0, 0.0);
            });

            QUnit.test("tick() velocity", function(assert)
            {
                // Setup.
                var position = Vector.ZERO;
                var orientation = Quaternion.ZERO;
                var velocity = new Vector(0.1, 0.2, 0.3);
                var angularVelocity = Quaternion.newInstance(0.5, Vector.Z_AXIS);
                var state = new State.State(DATE, position, orientation, velocity, angularVelocity);

                // Run.
                state.tick();

                // Verify.
                assert.equal(state.date().valueOf(), parseInt(DATE.valueOf()) + 1000);
                verifyVector(assert, state.position(), 0.1, 0.2, 0.3);
                verifyQuaternion(assert, state.orientation(), 0.99999, 0.0, 0.0, 0.004363);
                assert.equal(Math.vizziniRound(state.orientation().angle(), 4), 0.5);
                verifyVector(assert, state.velocity(), 0.1, 0.2, 0.3);
                verifyQuaternion(assert, state.angularVelocity(), 0.99999, 0.0, 0.0, 0.004363);
                assert.equal(Math.vizziniRound(state.angularVelocity().angle(), 4), 0.5);
                verifyVector(assert, state.acceleration(), 0.0, 0.0, 0.0);
                verifyQuaternion(assert, state.angularAcceleration(), 1.0, 0.0, 0.0, 0.0);

                // Run.
                state.tick();

                // Verify.
                assert.equal(state.date().valueOf(), parseInt(DATE.valueOf()) + 2000);
                verifyVector(assert, state.position(), 0.2, 0.4, 0.6);
                verifyQuaternion(assert, state.orientation(), 0.999962, 0.0, 0.0, 0.008727);
                assert.equal(Math.vizziniRound(state.orientation().angle(), 4), 1.0);
                verifyVector(assert, state.velocity(), 0.1, 0.2, 0.3);
                verifyQuaternion(assert, state.angularVelocity(), 0.99999, 0.0, 0.0, 0.004363);
                assert.equal(Math.vizziniRound(state.angularVelocity().angle(), 4), 0.5);
                verifyVector(assert, state.acceleration(), 0.0, 0.0, 0.0);
                verifyQuaternion(assert, state.angularAcceleration(), 1.0, 0.0, 0.0, 0.0);
            });

            QUnit.test("tick() acceleration", function(assert)
            {
                // Setup.
                var position = Vector.ZERO;
                var orientation = Quaternion.ZERO;
                var velocity = new Vector(0.1, 0.2, 0.3);
                var angularVelocity = Quaternion.newInstance(0.5, Vector.Z_AXIS);
                var state = new State.State(DATE, position, orientation, velocity, angularVelocity);
                state.addAcceleration(new Vector(0.01, 0.02, 0.03));
                state.addAngularAcceleration(Quaternion.newInstance(0.05, Vector.Z_AXIS));

                // Run.
                state.tick();

                // Verify.
                assert.equal(state.date().valueOf(), parseInt(DATE.valueOf()) + 1000);
                verifyVector(assert, state.position(), 0.1, 0.2, 0.3);
                verifyQuaternion(assert, state.orientation(), 0.99999, 0.0, 0.0, 0.004363);
                assert.equal(Math.vizziniRound(state.orientation().angle(), 4), 0.5);
                verifyVector(assert, state.velocity(), 0.11, 0.22, 0.33);
                verifyQuaternion(assert, state.angularVelocity(), 0.999988, 0.0, 0.0, 0.0048);
                assert.equal(Math.vizziniRound(state.angularVelocity().angle(), 4), 0.55);
                verifyVector(assert, state.acceleration(), 0.0, 0.0, 0.0);
                verifyQuaternion(assert, state.angularAcceleration(), 1.0, 0.0, 0.0, 0.0);

                // Run.
                state.tick();

                // Verify.
                assert.equal(state.date().valueOf(), parseInt(DATE.valueOf()) + 2000);
                verifyVector(assert, state.position(), 0.21, 0.42, 0.63);
                verifyQuaternion(assert, state.orientation(), 0.999958, 0.0, 0.0, 0.009163);
                assert.equal(Math.vizziniRound(state.orientation().angle(), 4), 1.05);
                verifyVector(assert, state.velocity(), 0.11, 0.22, 0.33);
                verifyQuaternion(assert, state.angularVelocity(), 0.999988, 0.0, 0.0, 0.0048);
                assert.equal(Math.vizziniRound(state.angularVelocity().angle(), 4), 0.55);
                verifyVector(assert, state.acceleration(), 0.0, 0.0, 0.0);
                verifyQuaternion(assert, state.angularAcceleration(), 1.0, 0.0, 0.0, 0.0);
            });

            QUnit
                    .test(
                            "toString()",
                            function(assert)
                            {
                                // Setup.
                                var position = new Vector(1.0, 2.0, 3.0);
                                var orientation = new Quaternion(4.0, 5.0, 6.0, 7.0).unit();
                                var velocity = new Vector(0.1, 0.2, 0.3);
                                var angularVelocity = Quaternion.newInstance(0.5, Vector.Z_AXIS);
                                var state = new State.State(DATE, position, orientation, velocity, angularVelocity);

                                // Run.
                                var result = state.toString();

                                // Verify.
                                assert.ok(result);
                                assert
                                        .equal(
                                                result,
                                                "State date=2016-01-22 00:00:00.000 position=(1, 2, 3) orientation=(0.3563483225498992, 0.44543540318737396, 0.5345224838248488, 0.6236095644623235)");
                            });
        });
