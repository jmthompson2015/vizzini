/*
 * Provides a phenotype factory for a JavaScript based genome.
 * 
 * Side effects (if function cannot be created):
 * <ol>
 * <li>genome.code set to function string</li>
 * <li>genome.warningCount set</li>
 * <li>genome.errorCount set</li>
 * </ol>
 */
function JSPhenotypeFactory(functionName, args, prefix0, suffix0)
{
    InputValidator.validateNotEmpty("functionName", functionName);
    InputValidator.validateNotNull("args", args);

    var prefix = (prefix0 === undefined ? "" : prefix0);
    var suffix = (suffix0 === undefined ? "" : suffix0);

    this.getFunctionName = function()
    {
        return functionName;
    }

    this.getArgs = function()
    {
        return args;
    }

    this.getPrefix = function()
    {
        return prefix;
    }

    this.getSuffix = function()
    {
        return suffix;
    }

    this.create = function(genome, isDetailed)
    {
        InputValidator.validateNotEmpty("genome", genome);
        InputValidator.validateNotNull("isDetailed", isDetailed);

        var answer;
        var genomeString = this.genomeToString(genome);

        genome.code = "function ";
        genome.code += functionName;
        genome.code += "(" + args.toString() + ")";
        genome.code += " { " + genomeString + " }";

        try
        {
            answer = Function(args, genomeString);
            answer.name = functionName;
            genome.issues = [];
            genome.warningCount = 0;
            genome.errorCount = 0;
        }
        catch (e)
        {
            // Can't create a valid JavaScript function.
            if (isDetailed)
            {
                // Perform a JSHint analysis.
                try
                {
                    JSHINT(genome.code);
                    LOGGER.trace("JSHINT.errors = " + JSHINT.errors);
                    genome.issues = JSHINT.errors.slice();
                    genome.warningCount = GAUtilities
                            .countWarnings(JSHINT.errors);
                    genome.errorCount = GAUtilities.countErrors(JSHINT.errors);
                }
                catch (e)
                {
                    // Can't analyze.
                    LOGGER.trace("e = " + e);
                    genome.issues = undefined;
                    genome.warningCount = Number.NaN;
                    genome.errorCount = Number.NaN;
                }
            }
        }

        return answer;
    }

    this.genomeToString = function(genome)
    {
        InputValidator.validateNotEmpty("genome", genome);
        LOGGER.debug("genome = " + genome);

        var answer = prefix;

        var genomeCopy = genome.slice();

        while (genomeCopy.length > 0)
        {
            answer += " " + JSPhenotypeFactory.parseChunk(genomeCopy);
        }

        answer += suffix;
        answer = answer.trim();

        LOGGER.debug("genomeToString() returning _" + answer + "_");

        return answer;
    }
}

JSPhenotypeFactory.UNARY_FUNCTIONS = [ "Math.abs", "Math.sqrt", "Math.sin",
        "Math.cos", "Math.tan", "Math.exp", "Math.log" ];
JSPhenotypeFactory.UNARY_OPERATORS = [ "!" ];
JSPhenotypeFactory.BINARY_FUNCTIONS = [ "Math.atan2" ];
JSPhenotypeFactory.BINARY_OPERATORS = [ "=", "+", "-", "*", "/", "%", // number
"===", "!==", "<", ">", "&&", "||" // boolean
];

JSPhenotypeFactory.isUnaryFunction = function(functionName)
{
    return JSPhenotypeFactory.UNARY_FUNCTIONS.vizziniContains(functionName);
}

JSPhenotypeFactory.isUnaryOperator = function(functionName)
{
    return JSPhenotypeFactory.UNARY_OPERATORS.vizziniContains(functionName);
}

JSPhenotypeFactory.isBinaryFunction = function(functionName)
{
    return JSPhenotypeFactory.BINARY_FUNCTIONS.vizziniContains(functionName);
}

JSPhenotypeFactory.isBinaryOperator = function(functionName)
{
    return JSPhenotypeFactory.BINARY_OPERATORS.vizziniContains(functionName);
}

/*
 * Warning: this method alters the input genome.
 */
JSPhenotypeFactory.parseChunk = function(genome)
{
    InputValidator.validateNotNull("genome", genome);

    var answer;

    var gene0 = genome.shift();

    if (gene0 === "if" || gene0 === "while")
    {
        // if function.
        var gene1 = this.parseChunk(genome);
        var gene2 = this.parseChunk(genome);
        answer = gene0 + " (" + gene1 + ") {" + gene2 + "; }";
    }
    else if (gene0 === "ifElse")
    {
        // if else function.
        var gene1 = this.parseChunk(genome);
        var gene2 = this.parseChunk(genome);
        var gene3 = this.parseChunk(genome);
        answer = "if (" + gene1 + ") {" + gene2 + "; } else {" + gene3 + "; }";
    }
    else if (JSPhenotypeFactory.isUnaryFunction(gene0))
    {
        // Unary function.
        var gene1 = this.parseChunk(genome);
        answer = gene0 + "(" + gene1 + ")";
    }
    else if (JSPhenotypeFactory.isUnaryOperator(gene0))
    {
        // Unary operator.
        var gene1 = this.parseChunk(genome);
        answer = gene0 + "(" + gene1 + ")";
    }
    else if (JSPhenotypeFactory.isBinaryFunction(gene0))
    {
        // Binary function.
        var gene1 = this.parseChunk(genome);
        var gene2 = this.parseChunk(genome);
        answer = gene0 + "(" + gene1 + ", " + gene2 + ")";
    }
    else if (JSPhenotypeFactory.isBinaryOperator(gene0))
    {
        // Binary operator.
        var gene1 = this.parseChunk(genome);
        var gene2 = this.parseChunk(genome);
        answer = "(" + gene1 + " " + gene0 + " " + gene2 + ")";
    }
    else if (gene0 === undefined)
    {
        answer = "";
    }
    else
    {
        answer = gene0;
    }

    return answer;
}
