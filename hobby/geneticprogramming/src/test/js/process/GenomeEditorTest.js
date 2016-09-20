define(
        [ "Arithmetic", "Logarithmic", "Logic", "StringifyVisitor", "Terminal", "Trigonometric", "process/GenomeEditor" ],
        function(Arithmetic, Logarithmic, Logic, StringifyVisitor, Terminal, Trigonometric, GenomeEditor)
        {
            "use strict";
            QUnit.module("GenomeEditor");

            QUnit.test("edit() mixed tree", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(1);
                var node1 = new Terminal.Variable("x");
                var node2 = new Arithmetic.Add([ node0, node1 ]);
                var node3 = new Terminal.Constant(2);
                var genome = new Arithmetic.Add([ node2, node3 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "(+ (+ 1 x) 2)");
            });

            QUnit.test("edit() single constant", function(assert)
            {
                // Setup.
                var genome = new Terminal.Constant(1);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "1");
            });

            QUnit.test("edit() single variable", function(assert)
            {
                // Setup.
                var genome = new Terminal.Variable("x");

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "x");
            });

            QUnit.test("edit() Arithmetic abs add constants", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(-1);
                var node1 = new Terminal.Constant(-2);
                var node2 = new Arithmetic.Add([ node0, node1 ]);
                var genome = new Arithmetic.AbsoluteValue([ node2 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "3");
            });

            QUnit.test("edit() Arithmetic add constants", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(1);
                var node1 = new Terminal.Constant(2);
                var genome = new Arithmetic.Add([ node0, node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "3");
            });

            QUnit.test("edit() Arithmetic add constants tree", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(1);
                var node1 = new Terminal.Constant(2);
                var node2 = new Arithmetic.Add([ node0, node1 ]);
                var node3 = new Terminal.Constant(3);
                var genome = new Arithmetic.Add([ node2, node3 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "6");
            });

            QUnit.test("edit() Arithmetic add zero", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(0);
                var node1 = new Terminal.Variable("x");
                var genome0 = new Arithmetic.Add([ node0, node1 ]);
                var genome1 = new Arithmetic.Add([ node1, node0 ]);

                // Run.
                var result = GenomeEditor.edit(genome0);
                assert.equal((new StringifyVisitor(result)).string(), "x");

                var result = GenomeEditor.edit(genome1);
                assert.equal((new StringifyVisitor(result)).string(), "x");
            });

            QUnit.test("edit() Arithmetic divide by zero", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Variable("x");
                var node1 = new Terminal.Constant(0);
                var genome = new Arithmetic.Divide([ node0, node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "1");
            });

            QUnit.test("edit() Arithmetic divide by one", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Variable("x");
                var node1 = new Terminal.Constant(1);
                var genome = new Arithmetic.Divide([ node0, node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "x");
            });

            QUnit.test("edit() Arithmetic divide same expressions", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Variable("x");
                var node1 = new Terminal.Variable("x");
                var genome = new Arithmetic.Divide([ node0, node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "1");
            });

            QUnit.test("edit() Arithmetic zero divided", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(0);
                var node1 = new Terminal.Variable("x");
                var genome = new Arithmetic.Divide([ node0, node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "0");
            });

            QUnit.test("edit() Arithmetic multiply by zero", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(0);
                var node1 = new Terminal.Variable("x");
                var genome0 = new Arithmetic.Multiply([ node0, node1 ]);
                var genome1 = new Arithmetic.Multiply([ node1, node0 ]);

                // Run.
                var result = GenomeEditor.edit(genome0);
                assert.equal((new StringifyVisitor(result)).string(), "0");

                var result = GenomeEditor.edit(genome1);
                assert.equal((new StringifyVisitor(result)).string(), "0");
            });

            QUnit.test("edit() Arithmetic multiply by one", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(1);
                var node1 = new Terminal.Variable("x");
                var genome0 = new Arithmetic.Multiply([ node0, node1 ]);
                var genome1 = new Arithmetic.Multiply([ node1, node0 ]);

                // Run.
                var result = GenomeEditor.edit(genome0);
                assert.equal((new StringifyVisitor(result)).string(), "x");

                var result = GenomeEditor.edit(genome1);
                assert.equal((new StringifyVisitor(result)).string(), "x");
            });

            QUnit.test("edit() Arithmetic subtract same expressions", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Variable("x");
                var node1 = new Terminal.Variable("x");
                var genome = new Arithmetic.Subtract([ node0, node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);
                assert.equal((new StringifyVisitor(result)).string(), "0");
            });

            QUnit.test("edit() Arithmetic subtract zero", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Variable("x");
                var node1 = new Terminal.Constant(0);
                var genome = new Arithmetic.Subtract([ node0, node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);
                assert.equal((new StringifyVisitor(result)).string(), "x");
            });

            QUnit.test("edit() Logarithm exp(0)", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(0);
                var genome = new Logarithmic.Exponential([ node0 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "1");
            });

            QUnit.test("edit() Logarithm log(1)", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(1);
                var genome = new Logarithmic.Logarithm([ node0 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "0");
            });

            QUnit.test("edit() Logic and same expressions", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Variable("x");
                var node1 = new Terminal.Variable("x");
                var genome = new Logic.And([ node0, node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "x");
            });

            QUnit.test("edit() Logic not not expression", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Variable("x");
                var node1 = new Logic.Not([ node0 ]);
                var genome = new Logic.Not([ node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "x");
            });

            QUnit.test("edit() Logic or same expressions", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Variable("x");
                var node1 = new Terminal.Variable("x");
                var genome = new Logic.Or([ node0, node1 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "x");
            });

            QUnit.test("edit() Trigonometric cos(0)", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(0);
                var genome = new Trigonometric.Cosine([ node0 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "1");
            });

            QUnit.test("edit() Trigonometric sin(0)", function(assert)
            {
                // Setup.
                var node0 = new Terminal.Constant(0);
                var genome = new Trigonometric.Sine([ node0 ]);

                // Run.
                var result = GenomeEditor.edit(genome);

                // Verify.
                assert.ok(result);
                assert.equal((new StringifyVisitor(result)).string(), "0");
            });
        });
