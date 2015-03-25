package org.vizzini.starfightersquadrons.reporter;

import java.io.Writer;

/**
 * Defines methods required by a reporter.
 */
public interface Reporter
{
    /**
     * Write a report.
     * 
     * @param writer Writer.
     */
    void report(Writer writer);
}
