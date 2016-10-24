package org.vizzini.starfightersquadrons.swingui;

import java.net.URL;

import javax.swing.ImageIcon;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.AttackDice;
import org.vizzini.starfightersquadrons.DefenseDice;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.ShipAction;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.Maneuver.Bearing;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.ShipAction.DamageCardShipAction;
import org.vizzini.starfightersquadrons.ShipAction.UpgradeCardShipAction;

/**
 * Provides utilities for working with images.
 */
public final class ImageUtilities
{
    /** Base directory. */
    private static final String BASE = "images/";

    /** Base directory. */
    private static final String ICONS = "icons/";

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /**
     * @return a new image icon.
     */
    public ImageIcon createAboutIcon()
    {
        return createImageIcon("game/About24.gif", "About");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createAgilityIcon()
    {
        return createImageIcon(BASE + "PilotCard/AgilityIcon24.jpg", "Agility");
    }

    /**
     * @param value Die value.
     * 
     * @return a new image icon.
     */
    public ImageIcon createAttackDieIcon(final AttackDice.Value value)
    {
        final String name = determineDieName(value.name());

        return createImageIcon(BASE + "Dice/Attack" + name + "32.png", name);
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createAttackerTargetLockToken()
    {
        return createImageIcon(BASE + "Token/AttackerTargetLock32.png", "Target Lock");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createBarrelRollIcon()
    {
        return createImageIcon(BASE + "PilotCard/BarrelRollIcon24.png", "Barrel Roll");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createBarrelRollLeftManeuverIcon()
    {
        return createImageIcon(BASE + "Maneuver/barrel_roll_left16.png", "Barrel Roll");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createBarrelRollRightManeuverIcon()
    {
        return createImageIcon(BASE + "Maneuver/barrel_roll_right16.png", "Barrel Roll");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createBoostIcon()
    {
        return createImageIcon(BASE + "PilotCard/BoostIcon24.png", "Boost");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createCloakIcon()
    {
        return createImageIcon(BASE + "PilotCard/CloakIcon24.png", "Cloak");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createCloakToken()
    {
        return createImageIcon(BASE + "Token/CloakToken32.png", "Cloak");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createCriticalDamageIcon()
    {
        return createImageIcon(BASE + "PilotCard/CriticalHit24.jpg", "Critical");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createCupIcon()
    {
        return createImageIcon("game/cup48.jpg", "Vizzini.org");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createDamageIcon()
    {
        return createImageIcon(BASE + "PilotCard/Hit24.jpg", "Damage");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createDefenderTargetLockToken()
    {
        return createImageIcon(BASE + "Token/DefenderTargetLock32.png", "Target Lock");
    }

    /**
     * @param value Die value.
     * 
     * @return a new image icon.
     */
    public ImageIcon createDefenseDieIcon(final DefenseDice.Value value)
    {
        final String name = determineDieName(value.name());

        return createImageIcon(BASE + "Dice/Defense" + name + "32.png", name);
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createEvadeIcon()
    {
        return createImageIcon(BASE + "PilotCard/EvadeIcon24.png", "Evade");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createEvadeToken()
    {
        return createImageIcon(BASE + "Token/EvadeToken32.png", "Evade");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createExplosionIcon()
    {
        return createImageIcon(BASE + "Ship/Explosion.png", "Explosion");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createFocusIcon()
    {
        return createImageIcon(BASE + "PilotCard/FocusIcon24.png", "Focus");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createFocusToken()
    {
        return createImageIcon(BASE + "Token/FocusToken32.png", "Focus");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createHullIcon()
    {
        return createImageIcon(BASE + "PilotCard/HullIcon24.jpg", "Hull");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createIonToken()
    {
        return createImageIcon(BASE + "Token/IonToken32.png", "Ion");
    }

    /**
     * @param bearing Bearing.
     * @param difficulty Difficulty.
     * 
     * @return a new image icon.
     */
    public ImageIcon createManeuverIcon(final Bearing bearing, final Difficulty difficulty)
    {
        final String filename = bearing.name().toLowerCase() + "_" + difficulty.name().toLowerCase();

        return createImageIcon(BASE + "Maneuver/" + filename + "16.png", "Maneuver");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createPauseIcon()
    {
        return createImageIcon(ICONS + "Pause24.gif", "Pause");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createPlayAreaBackground()
    {
        return createImageIcon(BASE + "Background/pia13845.jpg", "North America Nebula");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createPlayIcon()
    {
        return createImageIcon(ICONS + "Play24.gif", "Play");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createShieldIcon()
    {
        return createImageIcon(BASE + "PilotCard/ShieldIcon24.jpg", "Shield");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createShieldToken()
    {
        return createImageIcon(BASE + "Token/ShieldToken32.png", "Shield");
    }

    /**
     * @param shipAction Ship action.
     * 
     * @return a new image icon.
     */
    public ImageIcon createShipActionIcon(final ShipAction shipAction)
    {
        InputValidator.validateNotNull("shipAction", shipAction);

        ImageIcon answer = null;

        if (shipAction == ShipAction.BARREL_ROLL)
        {
            answer = createBarrelRollIcon();
        }
        else if (shipAction == ShipAction.BOOST)
        {
            answer = createBoostIcon();
        }
        else if (shipAction == ShipAction.CLOAK)
        {
            answer = createCloakIcon();
        }
        else if (shipAction == ShipAction.EVADE)
        {
            answer = createEvadeIcon();
        }
        else if (shipAction == ShipAction.FOCUS)
        {
            answer = createFocusIcon();
        }
        else if (shipAction == ShipAction.TARGET_LOCK)
        {
            answer = createTargetLockIcon();
        }
        else if (shipAction instanceof DamageCardShipAction)
        {
            // Nothing to do.
        }
        else if (shipAction instanceof UpgradeCardShipAction)
        {
            // Nothing to do.
        }
        else
        {
            throw new RuntimeException("Unknown shipAction: " + shipAction);
        }

        return answer;
    }

    /**
     * @param ship Ship.
     * 
     * @return a new ship icon.
     */
    public ImageIcon createShipIcon(final Ship ship)
    {
        String filename = ship.getName() + ".png";
        filename = filename.replaceAll("[ ]", "_");

        final ImageIcon answer = createImageIcon(BASE + "Ship/" + filename, ship.getName());

        if (answer == null)
        {
            LOGGER.error("Image missing for filename " + filename);
        }

        return answer;
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createStressToken()
    {
        return createImageIcon(BASE + "Token/StressToken32.png", "Stress");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createTargetLockIcon()
    {
        return createImageIcon(BASE + "PilotCard/TargetLockIcon24.png", "Target Lock");
    }

    /**
     * @param team Team.
     * 
     * @return a new team icon.
     */
    public ImageIcon createTeamIcon24(final SSTeam team)
    {
        final String filename = team.getName() + "Icon24.png";

        return createImageIcon(BASE + filename, team.getName());
    }

    /**
     * @param team Team.
     * 
     * @return a new team icon.
     */
    public ImageIcon createTeamIcon36(final SSTeam team)
    {
        final String filename = team.getName() + "Icon36.png";

        return createImageIcon(BASE + filename, team.getName());
    }

    /**
     * @param team Team.
     * 
     * @return a new team icon.
     */
    public ImageIcon createTeamIcon64(final SSTeam team)
    {
        final String filename = team.getName() + "Icon64.png";

        return createImageIcon(BASE + "Message/" + filename, team.getName());
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createWeaponIcon()
    {
        return createImageIcon(BASE + "PilotCard/WeaponIcon24.jpg", "Primary Weapon");
    }

    /**
     * @param imageLocation Image location.
     * @param description Description.
     * 
     * @return a new image icon.
     */
    private ImageIcon createImageIcon(final String imageLocation, final String description)
    {
        ImageIcon answer = null;

        final URL imageUrl = getClass().getClassLoader().getResource(imageLocation);

        if (imageUrl != null)
        {
            answer = new ImageIcon(imageUrl, description);
        }

        return answer;
    }

    /**
     * @param name Value name.
     * 
     * @return the die name.
     */
    private String determineDieName(final String name)
    {
        String answer = name;

        answer = answer.replaceAll("[_]", "");
        answer = answer.toLowerCase();
        answer = answer.substring(0, 1).toUpperCase() + answer.substring(1);

        return answer;
    }
}
