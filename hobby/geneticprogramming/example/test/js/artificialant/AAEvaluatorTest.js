define([ "Sequence", "process/Population", "../../../../example/main/js/artificialant/AAEvaluator",
        "../../../../example/main/js/artificialant/AATerminal", "../../../../example/main/js/artificialant/Direction",
        "../../../../example/main/js/artificialant/IfFoodAhead" ], function(Sequence, Population, AAEvaluator,
        AATerminal, Direction, IfFoodAhead)
{
    "use strict";
    QUnit.module("AAEvaluator");

    QUnit.test("run() Move", function(assert)
    {
        // Setup.
        var fitnessCases = createFitnessCases();
        var evaluator = new AAEvaluator(fitnessCases);
        var genome = new AATerminal.Move();
        var population = new Population();
        population.maybeAddGenome(genome, true);

        // Run.
        evaluator.evaluate(population);

        // Verify.
        assert.equal(genome.rawFitness, 3);
        assert.equal(genome.hits, 3);
        assert.equal(genome.fitness, 86);
        assert.equal(Math.vizziniRound(genome.adjustedFitness, 4), 0.0115);
    });

    QUnit.test("run() solution", function(assert)
    {
        // Setup.
        var fitnessCases = createFitnessCases();
        var evaluator = new AAEvaluator(fitnessCases);
        var genome = createGenome();
        var population = new Population();
        population.maybeAddGenome(genome, true);

        // Run.
        evaluator.evaluate(population);

        // Verify.
        assert.equal(genome.rawFitness, 89);
        assert.equal(genome.hits, 89);
        assert.equal(genome.fitness, 0);
        assert.equal(Math.vizziniRound(genome.adjustedFitness, 4), 1);
    });

    function createFitnessCases()
    {
        var fitnessCases = [];

        fitnessCases.push(
        {
            input:
            {
                time: 0,
                x: 0,
                y: 0,
                directionKey: Direction.EAST,
            },
            output: 0,
        });

        return fitnessCases;
    }

    function createGenome()
    {
        var left = new AATerminal.Left();
        var move = new AATerminal.Move();
        var right = new AATerminal.Right();

        var node6 = new IfFoodAhead([ move, left ]);
        var node5 = new IfFoodAhead([ move, right ]);
        var node4 = new Sequence.Sequence2([ node6, move ]);
        var node3 = new Sequence.Sequence2([ node5, right ]);
        var node2 = new Sequence.Sequence3([ left, node3, node4 ]);
        var node1 = new IfFoodAhead([ move, node2 ]);

        return node1;
    }
});
