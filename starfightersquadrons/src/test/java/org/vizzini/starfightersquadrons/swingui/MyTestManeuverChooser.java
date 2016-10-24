package org.vizzini.starfightersquadrons.swingui;

import java.awt.Component;
import java.awt.EventQueue;

import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverSet;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.swingui.ManeuverChooser;

/**
 * Provides tests for the <code>ManeuverUI</code> class.
 */
public final class MyTestManeuverChooser
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
                new MyTestManeuverChooser();
            }
        });
    }

    /**
     * Construct this object.
     */
    public MyTestManeuverChooser()
    {
        final Ship ship = Ship.X_WING;
        final Component parentComponent = null;
        final String shipName = ship.getName();
        final ManeuverSet maneuverSet = ship.getManeuvers();
        // final ManeuverSet maneuverSet = ManeuverSet.BARREL_ROLL_MANEUVERS;
        // final ManeuverSet maneuverSet = ManeuverSet.BOOST_MANEUVERS;
        final boolean isEditable = true;

        final Maneuver maneuver = ManeuverChooser.showDialog(parentComponent, shipName, maneuverSet, isEditable);

        System.out.println("maneuver = " + maneuver);
    }
}
