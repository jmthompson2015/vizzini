package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Provides a group of squad builders using tournament lists.
 * 
 * @see <a href="http://www.xwingminiaturesgame.com/squad-list-rebels/nationals-review-the-netherlands/">Nationals
 *      Review: The Netherlands</a>
 */
public class TournamentLeiden2014SquadBuilder extends DefaultSquadBuilder
{
    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialAndrei()
    {
        return new TournamentLeiden2014SquadBuilder("5th: Andrei (TIE Fighters x4/TIE Phantom)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.ECHO, agent, UpgradeCard.ADVANCED_CLOAKING_DEVICE, UpgradeCard.GUNNER,
                        UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.VETERAN_INSTINCTS));
                answer.add(new SSToken(Pilot.HOWLRUNNER, agent, UpgradeCard.STEALTH_DEVICE));

                for (int i = 0; i < 3; i++)
                {
                    answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                }

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialFrans()
    {
        return new TournamentLeiden2014SquadBuilder("4th: Frans (TIE Fighters x4/TIE Phantom)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.WHISPER, agent, UpgradeCard.ADVANCED_CLOAKING_DEVICE,
                        UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.VETERAN_INSTINCTS));
                answer.add(new SSToken(Pilot.HOWLRUNNER, agent));

                for (int i = 0; i < 3; i++)
                {
                    answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                }

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialPiers()
    {
        return new TournamentLeiden2014SquadBuilder("2nd: Piers (Lambda-class Shuttle/TIE Fighters x6)",
                SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.OMICRON_GROUP_PILOT, agent, UpgradeCard.DARTH_VADER));

                for (int i = 0; i < 4; i++)
                {
                    answer.add(new SSToken(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
                }

                for (int i = 0; i < 2; i++)
                {
                    answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                }

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialStephan()
    {
        return new TournamentLeiden2014SquadBuilder("1st: Stephan (TIE Fighters x5/TIE Phantom)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.WHISPER, agent, UpgradeCard.VETERAN_INSTINCTS,
                        UpgradeCard.ADVANCED_CLOAKING_DEVICE, UpgradeCard.REBEL_CAPTIVE));

                for (int i = 0; i < 5; i++)
                {
                    answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                }

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebelOnno()
    {
        return new TournamentLeiden2014SquadBuilder("6th: Onno (E-Wing/YT-1300/X-Wing)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.HAN_SOLO, agent, UpgradeCard.C_3PO, UpgradeCard.ENGINE_UPGRADE,
                        UpgradeCard.LUKE_SKYWALKER, UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.VETERAN_INSTINCTS));
                answer.add(new SSToken(Pilot.BIGGS_DARKLIGHTER, agent));
                answer.add(new SSToken(Pilot.TALA_SQUADRON_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebelToby()
    {
        return new TournamentLeiden2014SquadBuilder("3rd: Toby (B-Wing/X-Wings x2/Y-Wing)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.BLUE_SQUADRON_PILOT, agent, UpgradeCard.FIRE_CONTROL_SYSTEM));
                answer.add(new SSToken(Pilot.LUKE_SKYWALKER, agent));
                answer.add(new SSToken(Pilot.TARN_MISON, agent, UpgradeCard.R7_ASTROMECH));
                answer.add(new SSToken(Pilot.GOLD_SQUADRON_PILOT, agent,
                        SecondaryWeaponUpgradeCard.ION_CANNON_TURRET));

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
    private TournamentLeiden2014SquadBuilder(final String description, final SSTeam team)
    {
        super(description, team);
    }
}
