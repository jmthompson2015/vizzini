package org.vizzini.starfightersquadrons.reporter;

import java.io.Writer;

/**
 * Defines methods required by an HTML reporter.
 */
public interface HtmlReporter extends Reporter
{
    /**
     * Write a report body.
     * 
     * @param writer Writer.
     */
    void writeBody(Writer writer);

    /**
     * Write a report head.
     * 
     * @param writer Writer.
     * 
     */
    void writeHead(Writer writer);
}
