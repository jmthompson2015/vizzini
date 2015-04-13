/*
 * Provides input/output utilities for a memory.
 */
function MemoryIO(rootName)
{
    this.clear = function()
    {
        localStorage.removeItem(rootName);
    }

    this.load = function()
    {
        var answer = new Memory();

        var value = localStorage.getItem(rootName);

        if (value)
        {
            answer.boardToStatistics = JSON.parse(value);
        }

        logBoardCount(answer);

        return answer;
    }

    this.store = function(memory)
    {
        if (LOGGER.isDebugEnabled())
        {
            var value = JSON.stringify(memory.boardToStatistics, null, 3); // pretty
            // print
            LOGGER.debug("store() value = " + value);
        }

        logBoardCount(memory);

        var value = JSON.stringify(memory.boardToStatistics);
        localStorage.setItem(rootName, value);
    }

    function logBoardCount(memory)
    {
        LOGGER.info("board count = "
                + Object.getOwnPropertyNames(memory.boardToStatistics).length);
    }
}
