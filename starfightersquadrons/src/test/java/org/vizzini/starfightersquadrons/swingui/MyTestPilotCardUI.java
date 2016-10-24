package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Collection;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.DamageCard;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.TargetLock;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides tests for the <code>PilotCardUI</code> class.
 */
public final class MyTestPilotCardUI extends JFrame
{
    /**
     * Application method.
     *
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        EventQueue.invokeLater(new Runnable()
        {
            @Override
            public void run()
            {
                final MyTestPilotCardUI app = new MyTestPilotCardUI();
                app.setVisible(true);
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    public MyTestPilotCardUI()
    {
        final SSEnvironment environment = testData.createEnvironment();
        // final SSToken token = environment.getTokenAt(TestData.REBEL_START_POSITION0);
        final SSAgent rebelAgent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.LUKE_SKYWALKER, rebelAgent);
        // final SSToken token = environment.getTokenAt(TestData.IMPERIAL_START_POSITION0);
        final PilotCardUI tokenUI = new PilotCardUI(token);

        final JPanel cardPanel = new JPanel();
        cardPanel.add(tokenUI);

        final JPanel panel = new JPanel(new BorderLayout());
        panel.add(cardPanel, BorderLayout.CENTER);
        panel.add(createButtonPanel(environment, token), BorderLayout.SOUTH);

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(panel, BorderLayout.CENTER);
        final Dimension prefSize = getContentPane().getPreferredSize();
        setSize(new Dimension(prefSize.width, prefSize.height + 60));
        setLocationRelativeTo(null);
        setVisible(true);
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createAddCriticalDamageButton(final SSEnvironment environment, final SSToken token)
    {
        final JButton answer = new JButton("+Critical Damage");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.addCriticalDamage(environment.drawDamage());
            }
        });

        return answer;
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createAddDamageButton(final SSEnvironment environment, final SSToken token)
    {
        final JButton answer = new JButton("+Damage");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.addDamage(environment.drawDamage());
            }
        });

        return answer;
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createAddDefenderTargetLockButton(final SSEnvironment environment, final SSToken token)
    {
        final JButton answer = new JButton("+Target Lock (defend)");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final List<SSToken> enemies = environment.getAttackers(token.getTeam().opposite());
                final SSToken attacker = enemies.get(0);
                TargetLock.getInstance(attacker, token);
            }
        });

        return answer;
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new panel.
     */
    private JPanel createButtonPanel(final SSEnvironment environment, final SSToken token)
    {
        final JPanel answer = new JPanel(new GridLayout2(2, 0));

        answer.add(createIncreaseCloakButton(token));
        answer.add(createIncreaseEvadeButton(token));
        answer.add(createIncreaseFocusButton(token));
        answer.add(createIncreaseIonButton(token));
        answer.add(createIncreaseShieldButton(token));
        answer.add(createIncreaseStressButton(token));
        answer.add(createSetAttackerTargetLockButton(environment, token));
        answer.add(createAddDefenderTargetLockButton(environment, token));
        answer.add(createAddDamageButton(environment, token));
        answer.add(createAddCriticalDamageButton(environment, token));

        answer.add(createDecreaseCloakButton(token));
        answer.add(createDecreaseEvadeButton(token));
        answer.add(createDecreaseFocusButton(token));
        answer.add(createDecreaseIonButton(token));
        answer.add(createDecreaseShieldButton(token));
        answer.add(createDecreaseStressButton(token));
        answer.add(createUnsetAttackerTargetLockButton(token));
        answer.add(createRemoveDefenderTargetLockButton(token));
        answer.add(createRemoveDamageButton(environment, token));
        answer.add(createRemoveCriticalDamageButton(environment, token));

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createDecreaseCloakButton(final SSToken token)
    {
        final JButton answer = new JButton("-Cloak");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.decreaseCloakCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createDecreaseEvadeButton(final SSToken token)
    {
        final JButton answer = new JButton("-Evade");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.decreaseEvadeCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createDecreaseFocusButton(final SSToken token)
    {
        final JButton answer = new JButton("-Focus");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.decreaseFocusCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createDecreaseIonButton(final SSToken token)
    {
        final JButton answer = new JButton("-Ion");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.decreaseIonCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createDecreaseShieldButton(final SSToken token)
    {
        final JButton answer = new JButton("-Shield");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.decreaseShieldCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createDecreaseStressButton(final SSToken token)
    {
        final JButton answer = new JButton("-Stress");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.decreaseStressCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createIncreaseCloakButton(final SSToken token)
    {
        final JButton answer = new JButton("+Cloak");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.increaseCloakCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createIncreaseEvadeButton(final SSToken token)
    {
        final JButton answer = new JButton("+Evade");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.increaseEvadeCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createIncreaseFocusButton(final SSToken token)
    {
        final JButton answer = new JButton("+Focus");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.increaseFocusCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createIncreaseIonButton(final SSToken token)
    {
        final JButton answer = new JButton("+Ion");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.increaseIonCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createIncreaseShieldButton(final SSToken token)
    {
        final JButton answer = new JButton("+Shield");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.increaseShieldCount();
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createIncreaseStressButton(final SSToken token)
    {
        final JButton answer = new JButton("+Stress");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                token.increaseStressCount();
            }
        });

        return answer;
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createRemoveCriticalDamageButton(final SSEnvironment environment, final SSToken token)
    {
        final JButton answer = new JButton("-Critical Damage");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final Collection<DamageCard> damages = token.getCriticalDamages();
                if (!damages.isEmpty())
                {
                    final DamageCard damage = damages.iterator().next();
                    token.removeCriticalDamage(damage);
                    environment.discardDamage(damage);
                }
            }
        });

        return answer;
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createRemoveDamageButton(final SSEnvironment environment, final SSToken token)
    {
        final JButton answer = new JButton("-Damage");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final Collection<DamageCard> damages = token.getDamages();
                if (!damages.isEmpty())
                {
                    final DamageCard damage = damages.iterator().next();
                    token.removeDamage(damage);
                    environment.discardDamage(damage);
                }
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createRemoveDefenderTargetLockButton(final SSToken token)
    {
        final JButton answer = new JButton("-Target Lock (defend)");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final List<TargetLock> targetLocks = token.getDefenderTargetLocks();

                if (!targetLocks.isEmpty())
                {
                    final TargetLock targetLock = token.getDefenderTargetLocks().get(0);

                    if (targetLock != null)
                    {
                        TargetLock.freeInstance(targetLock);
                    }
                }
            }
        });

        return answer;
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createSetAttackerTargetLockButton(final SSEnvironment environment, final SSToken token)
    {
        final JButton answer = new JButton("+Target Lock (attack)");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final List<SSToken> enemies = environment.getAttackers(token.getTeam().opposite());
                final SSToken defender = enemies.get(0);
                TargetLock.getInstance(token, defender);
            }
        });

        return answer;
    }

    /**
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createUnsetAttackerTargetLockButton(final SSToken token)
    {
        final JButton answer = new JButton("-Target Lock (attack)");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final TargetLock targetLock = token.getAttackerTargetLock();

                if (targetLock != null)
                {
                    TargetLock.freeInstance(targetLock);
                }
            }
        });

        return answer;
    }
}
