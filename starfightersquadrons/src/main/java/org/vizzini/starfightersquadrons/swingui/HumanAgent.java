package org.vizzini.starfightersquadrons.swingui;

import java.util.List;

import javax.swing.JFrame;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.starfightersquadrons.AttackDice;
import org.vizzini.starfightersquadrons.DefenseDice;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverSet;
import org.vizzini.starfightersquadrons.ModifyAttackDiceAction;
import org.vizzini.starfightersquadrons.ModifyDefenseDiceAction;
import org.vizzini.starfightersquadrons.PlanningAction;
import org.vizzini.starfightersquadrons.ShipActionAction;
import org.vizzini.starfightersquadrons.SSAdjudicator;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.swingui.WeaponAndDefenderChooser.WeaponAndDefender;

/**
 * Provides an agent operated by a human for Starfighter Squadrons.
 */
public final class HumanAgent implements SSAgent
{
    /** Name. */
    private final String name;

    /** Parent component. */
    private final JFrame parentComponent;

    /** Team. */
    private final SSTeam team;

    /**
     * Construct this object.
     *
     * @param name Name. (required)
     * @param team Team. (required)
     * @param parentComponent Parent component. (optional)
     */
    @SuppressWarnings("hiding")
    public HumanAgent(final String name, final SSTeam team, final JFrame parentComponent)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("team", team);

        this.name = name;
        this.team = team;
        this.parentComponent = parentComponent;
    }

    @Override
    public List<SSToken> buildSquad()
    {
        final List<SSToken> answer = SquadBuilderPanel.showDialog(parentComponent, this);

        return answer;
    }

    @Override
    public Maneuver chooseDecloakManeuver(final SSEnvironment environment, final SSAdjudicator adjudicator,
            final SSToken token)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("token", token);

        return ManeuverChooser.showDialog(parentComponent, token.getShip().getName(), ManeuverSet.DECLOAK_MANEUVERS,
                true);
    }

    @Override
    public WeaponAndDefender chooseWeaponAndDefender(final SSEnvironment environment,
            final SSAdjudicator adjudicator, final SSToken attacker)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);

        return WeaponAndDefenderChooser.showDialog(parentComponent, environment, attacker);
    }

    @Deprecated
    @Override
    public Action getAction(final Environment environment, final Adjudicator adjudicator)
    {
        throw new RuntimeException("method not used");
    }

    @Override
    public String getDescription()
    {
        return "This agent is operated by a human.";
    }

    @Override
    public ModifyAttackDiceAction getModifyAttackDiceAction(final SSEnvironment environment,
            final SSAdjudicator adjudicator, final SSToken attacker, final AttackDice attackDice,
            final SSToken defender)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);

        ModifyAttackDiceAction answer = null;

        if (adjudicator.canModifyAttackDice(attacker, defender))
        {
            answer = ModifyAttackDiceUI.showDialog(parentComponent, environment, attacker, attackDice);
        }

        return answer;
    }

    @Override
    public ModifyDefenseDiceAction getModifyDefenseDiceAction(final SSEnvironment environment,
            final SSAdjudicator adjudicator, final SSToken attacker, final AttackDice attackDice,
            final SSToken defender, final DefenseDice defenseDice)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenseDice", defenseDice);

        ModifyDefenseDiceAction answer = null;

        if (adjudicator.canModifyDefenseDice(defender))
        {
            answer = ModifyDefenseDiceUI.showDialog(parentComponent, environment, attacker, attackDice, defender,
                    defenseDice);
        }

        return answer;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public PlanningAction getPlanningAction(final SSEnvironment environment, final SSAdjudicator adjudicator)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);

        PlanningAction answer = null;

        final PlanningDialog dialog = new PlanningDialog(parentComponent, environment, adjudicator, this, 60);
        dialog.setVisible(true);

        // Modal dialog blocks until done.

        answer = dialog.getPlanningAction();

        return answer;
    }

    @Override
    public ShipActionAction getShipActionAction(final SSEnvironment environment, final SSAdjudicator adjudicator,
            final SSToken attacker)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);

        ShipActionAction answer = null;

        if (adjudicator.canSelectShipAction(attacker))
        {
            answer = ShipActionChooser.showDialog(parentComponent, environment, attacker, attacker.getShipActions());
        }

        return answer;
    }

    @Override
    public SSTeam getTeam()
    {
        return team;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("name", getName());
        builder.append("team", getTeam());

        return builder.toString();
    }
}
