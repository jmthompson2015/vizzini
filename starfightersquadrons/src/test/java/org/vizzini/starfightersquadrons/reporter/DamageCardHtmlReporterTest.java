package org.vizzini.starfightersquadrons.reporter;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

/**
 * Provides tests for the <code>DamageCardHtmlReporter</code> class.
 */
public final class DamageCardHtmlReporterTest
{
    /**
     * Test the <code>report()</code> method.
     */
    @Test
    public void report()
    {
        // Setup.
        final DamageCardHtmlReporter reporter = new DamageCardHtmlReporter();
        final Writer writer = new StringWriter();

        // Run.
        reporter.report(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        // System.out.println("result =\n" + result);
        writeToFile(result);
        final String expected = "<html>\n<head>\n<link rel=\"stylesheet\" type=\"text/css\" href=\"https://dl.dropboxusercontent.com/u/1267954/website/includes/style.css\" />\n<title>Starfighter Squadrons: Damage Cards</title>\n<script src=\"sorttable.js\"></script><script src=\"https://dl.dropboxusercontent.com/u/1267954/website/includes/sorttable.js\"></script></head>\n<body>\n<p class=\"header1\">Damage Cards</p><table class=\"sortable table-details\">\n<tr>\n<th class=\"table-header-cell-details\">Name</th><th class=\"table-header-cell-details\">Description</th><th class=\"table-header-cell-details\">Action<br/>Description</th></tr>\n<tr>\n<td class=\"table-cell-details\">Blinded Pilot</td><td class=\"table-cell-details\">The next time you attack, do not roll any attack dice. Then flip this card facedown.</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Console Fire</td><td class=\"table-cell-details\">At the start of each Combat phase, roll 1 attack die. On a hit result, suffer 1 damage.</td><td class=\"table-cell-details\"><b>Action:</b> Flip this card facedown.</td></tr>\n<tr>\n<td class=\"table-cell-details\">Damaged Cockpit</td><td class=\"table-cell-details\">After the round in which you receive this card, treat your pilot skill value as \"0.\"</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Damaged Engine</td><td class=\"table-cell-details\">Treat all turn maneuvers (left turn or right turn) as red maneuvers.</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Damaged Sensor Array</td><td class=\"table-cell-details\">You cannot perform the actions listed in your action bar.</td><td class=\"table-cell-details\"><b>Action:</b> Roll 1 attack die. On a hit result, flip this card facedown.</td></tr>\n<tr>\n<td class=\"table-cell-details\">Direct Hit!</td><td class=\"table-cell-details\">This card counts as 2 damage against your hull.</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Injured Pilot</td><td class=\"table-cell-details\">All players must ignore your pilot ability and all of your Elite Upgrade cards.</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Minor Explosion</td><td class=\"table-cell-details\">Immediately roll 1 attack die. On a hit result, suffer 1 damage. Then flip this card facedown.</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Minor Hull Breach</td><td class=\"table-cell-details\">After executing a red maneuver, roll 1 attack die. On a hit result, suffer 1 damage.</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Munitions Failure</td><td class=\"table-cell-details\">Immediately choose 1 of your secondary weapon Upgrade cards and discard it. Then flip this Damage card facedown.</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Structural Damage</td><td class=\"table-cell-details\">Reduce your agility value by 1 (to a minimum of \"0\").</td><td class=\"table-cell-details\"><b>Action:</b> Roll 1 attack die. On a hit result, flip this card facedown.</td></tr>\n<tr>\n<td class=\"table-cell-details\">Stunned Pilot</td><td class=\"table-cell-details\">After you execute a maneuver that causes you to overlap either another ship or an obstacle token, suffer 1 damage.</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Thrust Control Fire</td><td class=\"table-cell-details\">Immediately receive 1 stress token. Then flip this card facedown.</td><td class=\"table-cell-details\">&nbsp;</td></tr>\n<tr>\n<td class=\"table-cell-details\">Weapon Malfunction</td><td class=\"table-cell-details\">Reduce your primary weapon value by 1 (to a minimum of \"0\").</td><td class=\"table-cell-details\"><b>Action:</b> Roll 1 attack die. On a hit or critical hit result, flip this card facedown.</td></tr>\n</table>\n</body>\n</html>\n";
        assertThat(result, is(expected));
    }

    /**
     * @param content Content.
     */
    private void writeToFile(final String content)
    {
        final File file = new File("damageCards.html");
        try
        {
            FileUtils.write(file, content);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
