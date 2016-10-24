/*
 * Provides convenience methods to print time.
 */
var TimePrinter =
{
    /* Seconds to milliseconds factor. */
    SECONDS_TO_MS: 1000,

    /* Minutes to milliseconds factor. */
    MINUTES_TO_MS: 60 * 1000,

    /*
     * @param title Title. 
     * @param start Start time. (ms) 
     * @param end End time. (ms)
     * 
     * @return a formatted string.
     */
    formatElapsedTime: function(title, start, end)
    {
        var myStart = Math.min(start, end);
        var myEnd = Math.max(start, end);

        var elapsed = myEnd - myStart;
        var minutes = Math.floor(elapsed / this.MINUTES_TO_MS);
        var leftover = elapsed - (minutes * this.MINUTES_TO_MS);
        var seconds = Math.floor(leftover / this.SECONDS_TO_MS);

        var sb = "";

        sb += this.createTitleString(title);
        sb += minutes;
        sb += ":";

        if (seconds < 10)
        {
            sb += "0";
        }

        sb += seconds;
        sb += " (";
        sb += elapsed;
        sb += " ms)";

        return sb;
    },

    /*
     * @param title Title.
     * @param start Start time. (ms)
     * @param end End time. (ms)
     */
    printElapsedTime: function(title, start, end)
    {
        console.info(this.formatElapsedTime(title, start, end));
    },

    /*
     * @param title Title.
     * 
     * @return a new title string.
     */
    createTitleString: function(title)
    {
        var sb = "";

        if (!title || title.length === 0)
        {
            sb += "Elapsed time ";
        }
        else
        {
            sb += title;
            sb += " elapsed time ";
        }

        return sb;
    },
}
