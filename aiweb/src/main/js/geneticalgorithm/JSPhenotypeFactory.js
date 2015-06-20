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
function JSPhenotypeFactory(functionName, args)
{
    this.getFunctionName = function()
    {
        return functionName;
    }

    this.getArgs = function()
    {
        return args;
    }

    this.create = function(genome)
    {
        var answer;
        var genomeString = GAUtilities.genomeToString(genome);

        try
        {
            answer = Function(args, genomeString);
        }
        catch (e)
        {
            genome.code = "function ";
            genome.code += functionName;
            genome.code += "(" + args.toString() + ")";
            genome.code += "{" + genomeString + "}";

            try
            {
                JSHINT(genome.code);
                genome.warningCount = GAUtilities.countWarnings(JSHINT.errors);
                genome.errorCount = GAUtilities.countErrors(JSHINT.errors);
            }
            catch (e)
            {
                genome.warningCount = Number.NaN;
                genome.errorCount = Number.NaN;
            }
        }

        return answer;
    }
}
