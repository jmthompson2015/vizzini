package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides a squad builder to create Veldrin's squads for the X-Wing Galactic Cup.
 * 
 * @see <a
 *      href="http://teamcovenant.com/veldrin/2014/06/14/veldrins-guide-to-building-fun-and-competitive-x-wing-squads"
 *      >Veldrin's Guide to Building Fun and Competitive X-Wing Squads</a>
 */
@SuppressWarnings("javadoc")
public class VeldrinsSquadBuilder extends DefaultSquadBuilder
{
    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialHowlingTurr()
    {
        return new VeldrinsSquadBuilder("Howling Turr (TIE Fighters x5/TIE Interceptor)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.HOWLRUNNER, agent));
                answer.add(new SSToken(Pilot.TURR_PHENNIR, agent, UpgradeCard.PUSH_THE_LIMIT));
                answer.add(new SSToken(Pilot.BLACK_SQUADRON_PILOT, agent, UpgradeCard.DRAW_THEIR_FIRE));
                answer.add(new SSToken(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebelChewieBlues()
    {
        return new VeldrinsSquadBuilder("Chewie Blues (YT-1300/B-Wings x2)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.CHEWBACCA, agent, UpgradeCard.GUNNER, UpgradeCard.RECON_SPECIALIST));
                answer.add(new SSToken(Pilot.BLUE_SQUADRON_PILOT, agent, UpgradeCard.ADVANCED_SENSORS));
                answer.add(new SSToken(Pilot.BLUE_SQUADRON_PILOT, agent, UpgradeCard.ADVANCED_SENSORS));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebelVeldrinsSquad()
    {
        return new VeldrinsSquadBuilder("Veldrin's Squad (YT-1300/X-Wings x2)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.OUTER_RIM_SMUGGLER, agent, UpgradeCard.ANTI_PURSUIT_LASERS,
                        UpgradeCard.INTELLIGENCE_AGENT, UpgradeCard.NAVIGATOR));
                answer.add(new SSToken(Pilot.JEK_PORKINS, agent, UpgradeCard.HULL_UPGRADE,
                        UpgradeCard.VETERAN_INSTINCTS));
                answer.add(new SSToken(Pilot.WEDGE_ANTILLES, agent, UpgradeCard.R2_D2, UpgradeCard.SHIELD_UPGRADE));

                return answer;
            }
        };
    }

    /**
     * Construct this object.
     * 
     * @param description Description.
     * @param team Team.
     */
    private VeldrinsSquadBuilder(final String description, final SSTeam team)
    {
        super(description, team);
    }
}
