package org.vizzini.starfightersquadrons.swingui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.ButtonGroup;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JRadioButton;

import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a user interface to pick a token.
 */
public final class TokenChooser extends EnabledPanel
{
    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Token key. */
    private static final String TOKEN_KEY = "token";

    /** Vertical gap. */
    private static final int VGAP = 5;

    /**
     * @param parentComponent Parent component.
     * @param attacker Attacker.
     * @param rangeOneDefenders Defenders.
     * @param rangeTwoDefenders Defenders.
     * @param rangeThreeDefenders Defenders.
     * 
     * @return the selected token, or null.
     */
    public static SSToken showDialog(final JFrame parentComponent, final SSToken attacker,
            final List<SSToken> rangeOneDefenders, final List<SSToken> rangeTwoDefenders,
            final List<SSToken> rangeThreeDefenders)
    {
        InputValidator.validateNotNull("parentComponent", parentComponent);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("rangeOneDefenders", rangeOneDefenders);
        InputValidator.validateNotNull("rangeTwoDefenders", rangeTwoDefenders);
        InputValidator.validateNotNull("rangeThreeDefenders", rangeThreeDefenders);

        final String title = "Select Defender";
        final TokenChooser message = new TokenChooser(attacker, rangeOneDefenders, rangeTwoDefenders,
                rangeThreeDefenders);
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;
        final int y = 60;
        final PositionedDialog dialog = new PositionedDialog(parentComponent, title, message, optionType, messageType,
                y);
        dialog.setVisible(true);

        // Modal dialog blocks until done.

        final int result = dialog.getResult();
        dialog.dispose();

        SSToken selected = null;

        if (result == JOptionPane.OK_OPTION)
        {
            selected = message.getSelectedToken();
        }

        return selected;
    }

    /** Defenders. */
    private final List<SSToken> rangeOneDefenders;

    /** Defenders. */
    private final List<SSToken> rangeThreeDefenders;

    /** Defenders. */
    private final List<SSToken> rangeTwoDefenders;

    /** Selected token. */
    private SSToken selectedToken;

    /**
     * Construct this object.
     * 
     * @param attacker Attacker.
     * @param rangeOneDefenders Defenders.
     * @param rangeTwoDefenders Defenders.
     * @param rangeThreeDefenders Defenders.
     */
    @SuppressWarnings("hiding")
    public TokenChooser(final SSToken attacker, final List<SSToken> rangeOneDefenders,
            final List<SSToken> rangeTwoDefenders, final List<SSToken> rangeThreeDefenders)
    {
        super();

        InputValidator.validateNotNull("rangeOneDefenders", rangeOneDefenders);
        InputValidator.validateNotNull("rangeTwoDefenders", rangeTwoDefenders);
        InputValidator.validateNotNull("rangeThreeDefenders", rangeThreeDefenders);

        this.rangeOneDefenders = rangeOneDefenders;
        this.rangeTwoDefenders = rangeTwoDefenders;
        this.rangeThreeDefenders = rangeThreeDefenders;

        setLayout(new GridLayout2(0, 1, HGAP, VGAP));

        if (attacker != null)
        {
            add(new JLabel("Attacker: " + attacker.getName()));
        }

        add(createRadioButtonUI());
    }

    /**
     * @return the selectedToken
     */
    public SSToken getSelectedToken()
    {
        return selectedToken;
    }

    /**
     * @param mainPanel Main panel.
     * @param buttonGroup Button group.
     * @param title Title.
     * @param defenders Defenders.
     * @param firstRadioButton First radio button.
     * 
     * @return the first radio button.
     */
    private JRadioButton createRadioButtons(final JPanel mainPanel, final ButtonGroup buttonGroup, final String title,
            final List<SSToken> defenders, final JRadioButton firstRadioButton)
    {
        JRadioButton answer = firstRadioButton;

        if (!defenders.isEmpty())
        {
            final JPanel rangePanel = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));
            rangePanel.setBorder(BorderFactory.createTitledBorder(title));

            for (final SSToken defender : defenders)
            {
                final String text = defender.getName();

                final JRadioButton radioButton = new JRadioButton(text);
                radioButton.putClientProperty(TOKEN_KEY, defender);
                radioButton.addActionListener(new ActionListener()
                {
                    @SuppressWarnings("synthetic-access")
                    @Override
                    public void actionPerformed(final ActionEvent event)
                    {
                        final JRadioButton source = (JRadioButton)event.getSource();
                        selectedToken = (SSToken)source.getClientProperty(TOKEN_KEY);
                    }
                });

                buttonGroup.add(radioButton);
                rangePanel.add(radioButton);

                if (answer == null)
                {
                    answer = radioButton;
                }
            }

            mainPanel.add(rangePanel);
        }

        return answer;
    }

    /**
     * @return a new widget.
     */
    private JPanel createRadioButtonUI()
    {
        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));

        final ButtonGroup buttonGroup = new ButtonGroup();
        JRadioButton firstRadioButton = null;

        firstRadioButton = createRadioButtons(answer, buttonGroup, "Range 1", rangeOneDefenders, firstRadioButton);
        firstRadioButton = createRadioButtons(answer, buttonGroup, "Range 2", rangeTwoDefenders, firstRadioButton);
        firstRadioButton = createRadioButtons(answer, buttonGroup, "Range 3", rangeThreeDefenders, firstRadioButton);

        if (firstRadioButton != null)
        {
            firstRadioButton.setSelected(true);
            selectedToken = (SSToken)firstRadioButton.getClientProperty(TOKEN_KEY);
        }

        return answer;
    }
}
