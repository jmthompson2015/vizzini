package org.vizzini.core;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides convenience methods to print time.
 */
public final class TimePrinter
{
    /** Seconds to milliseconds factor. */
    private final int SECONDS_TO_MS = 1000;

    /** Minutes to milliseconds factor. */
    private final int MINUTES_TO_MS = 60 * SECONDS_TO_MS;

    /**
     * @param title Title.
     * @param start Start time. (ms)
     * @param end End time. (ms)
     * 
     * @return a formatted string.
     */
    public String formatElapsedTime(final String title, final long start, final long end)
    {
        final long myStart = Math.min(start, end);
        final long myEnd = Math.max(start, end);

        final long elapsed = myEnd - myStart;
        final int minutes = (int)(elapsed / MINUTES_TO_MS);
        final long leftover = elapsed - (minutes * MINUTES_TO_MS);
        final int seconds = (int)(leftover / SECONDS_TO_MS);

        final StringBuilder sb = new StringBuilder();

        sb.append(createTitleString(title));
        sb.append(minutes);
        sb.append(":");
        sb.append(StringUtils.leftPad(String.valueOf(seconds), 2, "0"));
        sb.append(" (").append(elapsed).append(" ms)");

        return sb.toString();
    }

    /**
     * @param title Title.
     * @param start Start time. (ms)
     * @param end End time. (ms)
     */
    public void printElapsedTime(final String title, final long start, final long end)
    {
        System.out.println(formatElapsedTime(title, start, end));
    }

    /**
     * @param title Title.
     * 
     * @return a new title string.
     */
    private String createTitleString(final String title)
    {
        final StringBuilder sb = new StringBuilder();

        if (StringUtils.isEmpty(title))
        {
            sb.append("Elapsed time ");
        }
        else
        {
            sb.append(title);
            sb.append(" elapsed time ");
        }

        return sb.toString();
    }
}
