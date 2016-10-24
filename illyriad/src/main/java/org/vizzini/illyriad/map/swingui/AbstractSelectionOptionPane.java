package org.vizzini.illyriad.map.swingui;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JDialog;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

/**
 * Provides an option pane for creating platform sensitive dialogs.
 * 
 * <p>
 * The default option type is <code>DEFAULT_OPTION</code>; other choices may be set by using
 * <code>setOptionType( int )</code> or <code>setOptionType(
 * int, String )</code>. The latter allows custom button labels to be set on the OK button. The dialog is shown with
 * <code>
 * optionPane.getDialog().setVisible(true)</code> and brought to the front with <code>
 * optionPane.getDialog().toFront()</code>.
 * </p>
 * 
 * @param <T> Type.
 */
abstract class AbstractSelectionOptionPane<T> extends JOptionPane
{
    /** Client property name. */
    protected final static String CLIENT_PROPERTY = "subject";

    /** Dialog which holds this option pane. */
    private JDialog dialog;

    /** Parent component. */
    private final Component parentComponent;

    /** Selection panel. */
    final JPanel selectionUI;

    /** Title. */
    private final String title;

    /**
     * Construct this object.
     * 
     * @param parentComponent The parent component.
     * @param title Title.
     * @param columnCount Column count.
     */
    @SuppressWarnings("hiding")
    public AbstractSelectionOptionPane(final Component parentComponent, final String title, final int columnCount)
    {
        super();

        this.parentComponent = parentComponent;
        this.selectionUI = new JPanel(new GridLayout2(0, columnCount));
        this.title = title;

        setMessage(new Object[] { createMainPanel() });
    }

    /**
     * @return the dialog for this option pane, creating it if necessary.
     */
    public JDialog getDialog()
    {
        if (dialog == null)
        {
            dialog = createDialog(parentComponent, title);
        }

        return dialog;
    }

    /**
     * @return selections.
     */
    public Set<T> getSelections()
    {
        final Set<T> answer = new TreeSet<T>();

        for (final Component component : selectionUI.getComponents())
        {
            if (component instanceof JCheckBox)
            {
                final JCheckBox checkBox = (JCheckBox)component;

                if (checkBox.isSelected())
                {
                    @SuppressWarnings("unchecked")
                    final T subject = (T)checkBox.getClientProperty(CLIENT_PROPERTY);
                    answer.add(subject);
                }
            }
        }

        return answer;
    }

    /**
     * @return a new button panel.
     */
    protected JPanel createButtonPanel()
    {
        final JPanel answer = new JPanel(new GridLayout(0, 1));

        answer.add(createSelectAllButton());
        answer.add(createDeselectAllButton());

        return answer;
    }

    /**
     * @return a new comparator.
     */
    protected abstract Comparator<T> createComparator();

    /**
     * Fill the selection panel.
     */
    protected abstract void fillSelectionPanel();

    /**
     * @return a new button.
     */
    private JButton createDeselectAllButton()
    {
        final JButton answer = new JButton("Deselect All");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                for (final Component component : selectionUI.getComponents())
                {
                    if (component instanceof JCheckBox)
                    {
                        final JCheckBox checkBox = (JCheckBox)component;
                        checkBox.setSelected(false);
                    }
                }
            }
        });

        return answer;
    }

    /**
     * @return a new main panel.
     */
    private JPanel createMainPanel()
    {
        fillSelectionPanel();

        final JPanel answer = new JPanel(new BorderLayout());

        answer.add(wrap(createButtonPanel()), BorderLayout.EAST);
        answer.add(selectionUI, BorderLayout.CENTER);

        return answer;
    }

    /**
     * @return a new button.
     */
    private JButton createSelectAllButton()
    {
        final JButton answer = new JButton("Select All");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                for (final Component component : selectionUI.getComponents())
                {
                    if (component instanceof JCheckBox)
                    {
                        final JCheckBox checkBox = (JCheckBox)component;
                        checkBox.setSelected(true);
                    }
                }
            }
        });

        return answer;
    }

    /**
     * @param panel Panel.
     * 
     * @return the given parameter wrapped in a new panel.
     */
    private JPanel wrap(final JPanel panel)
    {
        final JPanel answer = new JPanel();

        answer.add(panel);

        return answer;
    }
}
