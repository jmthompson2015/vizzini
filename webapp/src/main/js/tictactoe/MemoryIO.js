/*
 * Provides input/output utilities for a memory.
 */
var MemoryIO =
{
    ROOT_NAME: "tictactoeMemory",

    clear: function()
    {
        localStorage.removeItem(this.ROOT_NAME);
    },

    load: function()
    {
        var value = localStorage.getItem(this.ROOT_NAME);
        LOGGER.debug("load() value = " + value + " typeof value = "
                + (typeof value));

        var answer = new Memory();

        if (value)
        {
            answer.boardToStatistics = JSON.parse(value);
        }

        return answer;
    },

    store: function(memory)
    {
        if (LOGGER.isDebugEnabled())
        {
            var value = JSON.stringify(memory.boardToStatistics, null, 3); // pretty
                                                                            // print
            LOGGER.debug("store() value = " + value);
        }

        var value = JSON.stringify(memory.boardToStatistics);
        localStorage.setItem(this.ROOT_NAME, value);
    }
}
