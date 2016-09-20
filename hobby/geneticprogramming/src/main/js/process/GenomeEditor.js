define([ "Arithmetic", "Logarithmic", "Logic", "StringifyVisitor", "Terminal", "Trigonometric" ], function(Arithmetic,
        Logarithmic, Logic, StringifyVisitor, Terminal, Trigonometric)
{
    "use strict";
    var GenomeEditor = {};

    GenomeEditor.edit = function(genome)
    {
        var answer;

        switch (genome.arity())
        {
        case 0:
            answer = genome;
            break;
        case 1:
            answer = GenomeEditor.editArityOne(genome);
            break;
        case 2:
            answer = GenomeEditor.editArityTwo(genome);
            break;
        default:
            throw "GenomeEditor.edit() Unhandled arity " + genome.arity();
        }

        return answer;
    };

    GenomeEditor.editArityOne = function(genome)
    {
        var child0 = GenomeEditor.edit(genome.childAt(0));
        var answer = genome.copy();
        answer.children()[0] = child0;

        if (answer instanceof Arithmetic.AbsoluteValue)
        {
            if (child0 instanceof Terminal.Constant)
            {
                answer = new Terminal.Constant(answer.evaluate({}));
            }
        }
        else if (answer instanceof Logarithmic.Exponential)
        {
            // exp(0) = 1
            if (child0 instanceof Terminal.Constant && child0.value() === 0)
            {
                answer = new Terminal.Constant(1);
            }
            else if (child0 instanceof Logarithmic.Logarithm)
            {
                answer = child0.childAt(0);
            }
        }
        else if (answer instanceof Logarithmic.Logarithm)
        {
            // log(1) = 0
            if (child0 instanceof Terminal.Constant && child0.value() === 1)
            {
                answer = new Terminal.Constant(0);
            }
            else if (child0 instanceof Logarithmic.Exponential)
            {
                answer = child0.childAt(0);
            }
        }
        else if (answer instanceof Logic.Not)
        {
            // Not (Not a) = a
            if (child0 instanceof Logic.Not)
            {
                answer = child0.childAt(0);
            }
        }
        else if (answer instanceof Trigonometric.Cosine)
        {
            // cos(0) = 1
            if (child0 instanceof Terminal.Constant && child0.value() === 0)
            {
                answer = new Terminal.Constant(1);
            }
        }
        else if (answer instanceof Trigonometric.Sine)
        {
            // sin(0) = 0
            if (child0 instanceof Terminal.Constant && child0.value() === 0)
            {
                answer = new Terminal.Constant(0);
            }
        }

        return answer;
    };

    GenomeEditor.editArityTwo = function(genome)
    {
        var child0 = GenomeEditor.edit(genome.childAt(0));
        var child1 = GenomeEditor.edit(genome.childAt(1));
        var answer = genome.copy();
        answer.children()[0] = child0;
        answer.children()[1] = child1;

        if (GenomeEditor.areChildrenConstants(answer))
        {
            answer = new Terminal.Constant(answer.evaluate({}));
        }
        else if (answer instanceof Arithmetic.Add)
        {
            // Add zero.
            if (child0 instanceof Terminal.Constant && child0.value() === 0)
            {
                answer = child1;
            }
            // Add zero.
            else if (child1 instanceof Terminal.Constant && child1.value() === 0)
            {
                answer = child0;
            }
        }
        else if (answer instanceof Arithmetic.Divide)
        {
            // Divide by zero.
            if (child1 instanceof Terminal.Constant && child1.value() === 0)
            {
                answer = new Terminal.Constant(1);
            }
            // Divide by one.
            else if (child1 instanceof Terminal.Constant && child1.value() === 1)
            {
                answer = child0;
            }
            // Zero divided.
            if (child0 instanceof Terminal.Constant && child0.value() === 0)
            {
                answer = new Terminal.Constant(0);
            }
            // Divide by the same expression.
            else if (GenomeEditor.isSameExpression(child0, child1))
            {
                answer = new Terminal.Constant(1);
            }
        }
        else if (answer instanceof Arithmetic.Multiply)
        {
            // Multiply by zero.
            if ((child0 instanceof Terminal.Constant && child0.value() === 0) ||
                    (child1 instanceof Terminal.Constant && child1.value() === 0))
            {
                answer = new Terminal.Constant(0);
            }
            // Multiply by one.
            else if (child0 instanceof Terminal.Constant && child0.value() === 1)
            {
                answer = child1;
            }
            // Multiply by one.
            else if (child1 instanceof Terminal.Constant && child1.value() === 1)
            {
                answer = child0;
            }
        }
        else if (answer instanceof Arithmetic.Subtract)
        {
            // Subtract zero.
            if (child1 instanceof Terminal.Constant && child1.value() === 0)
            {
                answer = child0;
            }
            // Subtract the same expression.
            else if (GenomeEditor.isSameExpression(child0, child1))
            {
                answer = new Terminal.Constant(0);
            }
        }
        else if (answer instanceof Logic.And)
        {
            // And the same expression.
            if (GenomeEditor.isSameExpression(child0, child1))
            {
                answer = child0;
            }
        }
        else if (answer instanceof Logic.Or)
        {
            // Or the same expression.
            if (GenomeEditor.isSameExpression(child0, child1))
            {
                answer = child0;
            }
        }
        return answer;
    };

    GenomeEditor.areChildrenConstants = function(genome)
    {
        return genome.children().reduce(function(previousValue, child)
        {
            return previousValue && (child instanceof Terminal.Constant);
        }, true);
    };

    GenomeEditor.isSameExpression = function(node0, node1)
    {
        if (node0.string === undefined)
        {
            node0.string = (new StringifyVisitor(node0)).string();
        }

        if (node1.string === undefined)
        {
            node1.string = (new StringifyVisitor(node1)).string();
        }

        return (node0.string === node1.string);
    };

    if (Object.freeze)
    {
        Object.freeze(GenomeEditor);
    }

    return GenomeEditor;
});
