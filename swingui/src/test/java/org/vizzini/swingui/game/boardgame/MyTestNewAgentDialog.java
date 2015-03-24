package org.vizzini.swingui.game.boardgame;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.example.boardgame.reversi.ReversiActionGenerator;
import org.vizzini.example.boardgame.reversi.ReversiGameInjector;
import org.vizzini.swingui.game.boardgame.reversi.ReversiAgentFactory;

/**
 * Provides tests for the <code>NewAgentDialog</code> class.
 */
public final class MyTestNewAgentDialog
{
    /**
     * Test the <code>setVisible</code> method.
     */
    @Test
    public void setVisible()
    {
        final ReversiGameInjector injector = new ReversiGameInjector();
        final ReversiActionGenerator actionGenerator = injector.injectActionGenerator();
        final AgentFactory agentFactory = new ReversiAgentFactory(actionGenerator);
        final NewAgentDialog dialog = new NewAgentDialog(null, agentFactory);

        dialog.getDialog().setVisible(true);

        // Modal dialog blocks here until done.

        final Agent firstAgent = dialog.getFirstAgent();
        System.out.println("firstAgent = " + firstAgent);

        final Agent secondAgent = dialog.getSecondAgent();
        System.out.println("secondAgent = " + secondAgent);
    }
}
