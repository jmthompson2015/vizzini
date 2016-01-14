define([ "Pilot", "Team", "Token", "UpgradeCard" ], function(Pilot, Team, Token, UpgradeCard)
{
    "use strict";
    var SquadBuilders = [];

    SquadBuilders.push(new SquadBuilder(Team.IMPERIAL, "Imperial Core Set: 36 Points", 2012, "TIE Fighters x2",
            function(agent)
            {
                var answer = [];
                answer.push(new Token(Pilot.MAULER_MITHEL, agent, UpgradeCard.MARKSMANSHIP));
                answer.push(new Token(Pilot.DARK_CURSE, agent));
                return answer;
            }));

    SquadBuilders.push(new SquadBuilder(Team.REBEL, "Rebel Core Set: 36 Points", 2012, "X-Wing", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.LUKE_SKYWALKER, agent, UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2));
        return answer;
    }));

    SquadBuilders.push(new SquadBuilder(Team.FIRST_ORDER, "First Order TFA Core Set: 39 Points", 2015,
            "TIE/fo Fighters x2", function(agent)
            {
                var answer = [];
                answer.push(new Token(Pilot.EPSILON_LEADER, agent, UpgradeCard.WIRED));
                answer.push(new Token(Pilot.ZETA_ACE, agent));
                return answer;
            }));

    SquadBuilders.push(new SquadBuilder(Team.RESISTANCE, "Resistance TFA Core Set: 39 Points", 2015, "T-70 X-Wing",
            function(agent)
            {
                var answer = [];
                answer.push(new Token(Pilot.POE_DAMERON, agent, UpgradeCard.BB_8, UpgradeCard.PROTON_TORPEDOES,
                        UpgradeCard.WEAPONS_GUIDANCE));
                return answer;
            }));

    // - Winner - Rick Sidebotham (#1 Swiss, 23 pts, 754 MoV, flight 1): Whisper + Veteran Instincts + Fire-Control
    // Systems
    // + Advanced Cloaking Device + Gunner; Soontir Fel + Push the Limit; Captain Yorr
    SquadBuilders.push(new SquadBuilder(Team.IMPERIAL, "1st US Nationals", 2014,
            "TIE Phantom/Interceptor/Lambda Shuttle", function(agent)
            {
                var answer = [];
                answer.push(new Token(Pilot.WHISPER, agent, UpgradeCard.VETERAN_INSTINCTS,
                        UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.GUNNER, UpgradeCard.ADVANCED_CLOAKING_DEVICE));
                answer.push(new Token(Pilot.SOONTIR_FEL, agent, UpgradeCard.PUSH_THE_LIMIT));
                answer.push(new Token(Pilot.CAPTAIN_YORR, agent));
                return answer;
            }));

    // 2nd place - Jeff Berling (#3 Swiss, 20 pts, 802 MoV, flight 1): Chewbacca + Millennium Falcon + C-3P0 + R2-D2 +
    // Draw
    // Their Fire; Lando + Nien Nunb + Han Solo + Draw Their Fire
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "2nd US Nationals", 2014, "YT-1300 x2", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.CHEWBACCA, agent, UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.DRAW_THEIR_FIRE,
                UpgradeCard.C_3PO, UpgradeCard.R2_D2_CREW));
        answer.push(new Token(Pilot.LANDO_CALRISSIAN, agent, UpgradeCard.DRAW_THEIR_FIRE, UpgradeCard.NIEN_NUNB,
                UpgradeCard.HAN_SOLO));
        return answer;
    }));

    // Top 4 - Paul Heaver (#2 Swiss, 21 pts, 763 MoV, flight 1, lost to Jeff): Han Solo + Luke Skywalker + Veteran
    // Instincts + C-3P0 + Millennium Falcon + Engine Upgrade; Biggs; Tala Squadron Pilot
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "3rd US Nationals", 2014, "YT-1300/X-Wing/Z-95", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.HAN_SOLO, agent, UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.VETERAN_INSTINCTS,
                UpgradeCard.LUKE_SKYWALKER, UpgradeCard.C_3PO, UpgradeCard.ENGINE_UPGRADE));
        answer.push(new Token(Pilot.BIGGS_DARKLIGHTER, agent));
        answer.push(new Token(Pilot.TALA_SQUADRON_PILOT, agent));
        return answer;
    }));

    // Top 4 - Nick Jones (lost to winner, #4 Swiss, 20 pts, 758 MoV, flight 1): Howlrunner + Push the Limit; 6x
    // Obsidian
    // Squadron Pilot
    SquadBuilders.push(new SquadBuilder(Team.IMPERIAL, "4th US Nationals", 2014, "TIE Fighters x7", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.HOWLRUNNER, agent, UpgradeCard.PUSH_THE_LIMIT));
        answer.push(new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
        return answer;
    }));

    // Top 8 - David Pontier (lost to Nick, #5 Swiss, 20 pts, 745 MoV, flight 2): Han Solo + Determination + Luke
    // Skywalker
    // + Millenium Falcon; Corran Horn + Push the Limit + R2-D2 + Fire Control System
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "5th US Nationals", 2014, "YT-1300/E-Wing", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.HAN_SOLO, agent, UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.DETERMINATION,
                UpgradeCard.LUKE_SKYWALKER));
        answer.push(new Token(Pilot.CORRAN_HORN, agent, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.FIRE_CONTROL_SYSTEM,
                UpgradeCard.R2_D2));
        return answer;
    }));

    // 2014 World Champion Paul Heaver (2013 VASSAL winner, 2013 World Champion, 2014 US Nationals Top 4. Flight 2, rank
    // #2): 100 pts: Han Solo + Predator + C-3P0 + R2-D2 + MF + Engine Upgrade; 3x Tala
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "1st World", 2014, "YT-1300/Z-95 x3", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.HAN_SOLO, agent, UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.PREDATOR,
                UpgradeCard.C_3PO, UpgradeCard.R2_D2_CREW, UpgradeCard.ENGINE_UPGRADE));
        answer.push(new Token(Pilot.TALA_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.TALA_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.TALA_SQUADRON_PILOT, agent));
        return answer;
    }));

    // Morgan Reid (2014 Australian Nationals Champion. Flight 1, rank #2): 98 pts: Whisper + VI + ACD + FCS + Rebel
    // Captive; Howlrunner + Swarm; 3x Academy
    SquadBuilders.push(new SquadBuilder(Team.IMPERIAL, "2nd World", 2014, "TIE Phantom/Fighters x4", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.WHISPER, agent, UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.FIRE_CONTROL_SYSTEM,
                UpgradeCard.REBEL_CAPTIVE, UpgradeCard.ADVANCED_CLOAKING_DEVICE));
        answer.push(new Token(Pilot.HOWLRUNNER, agent, UpgradeCard.SWARM_TACTICS));
        answer.push(new Token(Pilot.ACADEMY_PILOT, agent));
        answer.push(new Token(Pilot.ACADEMY_PILOT, agent));
        answer.push(new Token(Pilot.ACADEMY_PILOT, agent));
        return answer;
    }));

    // Ira Mayers (2014 NOVA Open winner. Flight 1, rank #1): 100 pts: Han + MF + Gunner + C-3P0 + Engine + Predator; 2x
    // Tala; Bandit
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "3rd World", 2014, "YT-1300/Z-95 x3", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.HAN_SOLO, agent, UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.PREDATOR,
                UpgradeCard.GUNNER, UpgradeCard.C_3PO, UpgradeCard.ENGINE_UPGRADE));
        answer.push(new Token(Pilot.TALA_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.TALA_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.BANDIT_SQUADRON_PILOT, agent));
        return answer;
    }));

    // Keith Wilson (2014 UK National Champion. Flight 2, rank #1): 99 pts: Howlrunner; Dark Curse; Black + DtF; 2x
    // Obsidan,
    // 2x Academy Pilot
    SquadBuilders.push(new SquadBuilder(Team.IMPERIAL, "4th World", 2014, "TIE Fighters x7", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.HOWLRUNNER, agent));
        answer.push(new Token(Pilot.DARK_CURSE, agent));
        answer.push(new Token(Pilot.BLACK_SQUADRON_PILOT, agent, UpgradeCard.DRAW_THEIR_FIRE));
        answer.push(new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.ACADEMY_PILOT, agent));
        answer.push(new Token(Pilot.ACADEMY_PILOT, agent));
        return answer;
    }));

    // Richard Hsu (2014 US Nationals #16. Flight 1, rank #4): 100 pts: Wedge + DTF + R2D2; Cracken + VI; Biggs; Rookie
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "5th World", 2014, "X-Wings x3/Z-95", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.WEDGE_ANTILLES, agent, UpgradeCard.DRAW_THEIR_FIRE, UpgradeCard.R2_D2));
        answer.push(new Token(Pilot.AIREN_CRACKEN, agent, UpgradeCard.VETERAN_INSTINCTS));
        answer.push(new Token(Pilot.BIGGS_DARKLIGHTER, agent));
        answer.push(new Token(Pilot.ROOKIE_PILOT, agent));
        return answer;
    }));

    // 1st (#7 Swiss) Jeff Berling: Dash + Lone Wolf + HLC + Outrider + R2-D2 crew + Anti-Pursuit Lasers; 2x Blue
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "1st US Nationals", 2015, "YT-2400/B-Wings x2", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.DASH_RENDAR, agent, UpgradeCard.OUTRIDER, UpgradeCard.LONE_WOLF,
                UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.R2_D2_CREW, UpgradeCard.ANTI_PURSUIT_LASERS));
        answer.push(new Token(Pilot.BLUE_SQUADRON_PILOT, agent));
        answer.push(new Token(Pilot.BLUE_SQUADRON_PILOT, agent));
        return answer;
    }));

    // 2nd (#13 Swiss) Phillip Horny: Oicunn + Predator + ysanne + gunner + rebel captive + engine + proximity mine;
    // Soontir + PtL + autothruster + stealth device + title
    SquadBuilders.push(new SquadBuilder(Team.IMPERIAL, "2nd US Nationals", 2015, "Decimator/TIE Interceptor", function(
            agent)
    {
        var answer = [];
        answer
                .push(new Token(Pilot.CAPTAIN_OICUNN, agent, UpgradeCard.PREDATOR, UpgradeCard.YSANNE_ISARD,
                        UpgradeCard.GUNNER, UpgradeCard.REBEL_CAPTIVE, UpgradeCard.PROXIMITY_MINES,
                        UpgradeCard.ENGINE_UPGRADE));
        answer.push(new Token(Pilot.SOONTIR_FEL, agent, UpgradeCard.ROYAL_GUARD_TIE, UpgradeCard.PUSH_THE_LIMIT,
                UpgradeCard.AUTOTHRUSTERS, UpgradeCard.STEALTH_DEVICE));
        return answer;
    }));

    // 3rd (#14 Swiss) Jonathan Grasser: Chewbacca + Predator + Luke + C-3PO + MF; Vrill + HLC (no title) + Recon
    // Specialist + Anti-pursuit Lasers
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "3rd US Nationals", 2015, "YT-1300/YT-2400", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.CHEWBACCA, agent, UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.PREDATOR,
                UpgradeCard.LUKE_SKYWALKER, UpgradeCard.C_3PO));
        answer.push(new Token(Pilot.EADEN_VRILL, agent, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.RECON_SPECIALIST,
                UpgradeCard.ANTI_PURSUIT_LASERS));
        return answer;
    }));

    // 4th (#16 Swiss) Kyle Adams: Dash + Predator + Title + Mangler + Chewbacca crew; Corran + PtL + FCS + R2-D2 +
    // Engine
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "4th US Nationals", 2015, "YT-2400/E-Wing", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.DASH_RENDAR, agent, UpgradeCard.OUTRIDER, UpgradeCard.PREDATOR,
                UpgradeCard.MANGLER_CANNON, UpgradeCard.CHEWBACCA));
        answer.push(new Token(Pilot.CORRAN_HORN, agent, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.FIRE_CONTROL_SYSTEM,
                UpgradeCard.R2_D2, UpgradeCard.ENGINE_UPGRADE));
        return answer;
    }));

    // 5th (#5 Swiss) Mark Moriarity: IG88B&C + VI + HLC + FCS + Autothrusters + Inertial dampeners + title
    SquadBuilders.push(new SquadBuilder(Team.SCUM, "5th US Nationals", 2015, "Aggressors x2", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.IG_88B, agent, UpgradeCard.IG_2000, UpgradeCard.VETERAN_INSTINCTS,
                UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.INERTIAL_DAMPENERS,
                UpgradeCard.AUTOTHRUSTERS));
        answer.push(new Token(Pilot.IG_88C, agent, UpgradeCard.IG_2000, UpgradeCard.VETERAN_INSTINCTS,
                UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.INERTIAL_DAMPENERS,
                UpgradeCard.AUTOTHRUSTERS));
        return answer;
    }));

    // #1: Paul Heaver
    // - Poe Dameron + R2‑D2 + Veteran Instincts + Autothrusters
    // - Gold Squadron Pilot + R3‑A2 + BTL‑A4 Y‑wing + Twin Laser Turret
    // - Gold Squadron Pilot + Twin Laser Turret
    // - Bandit Squadron Pilot
    SquadBuilders.push(new SquadBuilder(Team.RESISTANCE, "1st World", 2015, "T-70 X-Wing/Y-Wings x2/Z-95", function(
            agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.POE_DAMERON, agent, UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.R2_D2,
                UpgradeCard.AUTOTHRUSTERS));
        answer.push(new Token(Pilot.GOLD_SQUADRON_PILOT, agent, UpgradeCard.BTL_A4_Y_WING,
                UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.R3_A2));
        answer.push(new Token(Pilot.GOLD_SQUADRON_PILOT, agent, UpgradeCard.TWIN_LASER_TURRET));
        answer.push(new Token(Pilot.BANDIT_SQUADRON_PILOT, agent));
        return answer;
    }));

    // #2: Nathan Eide
    // - Corran Horn + R2-D2 + Engine Upgrade + Push The Limit + Fire Control Systems;
    // - Poe Dameron + Veteran Instincts + Autothrusters + R5-P9
    // - Prototype Pilot + Chardaan Refit
    SquadBuilders.push(new SquadBuilder(Team.RESISTANCE, "2nd World", 2015, "E-Wing/T-70 X-Wing/A-Wing",
            function(agent)
            {
                var answer = [];
                answer.push(new Token(Pilot.CORRAN_HORN, agent, UpgradeCard.PUSH_THE_LIMIT,
                        UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.R2_D2, UpgradeCard.ENGINE_UPGRADE));
                answer.push(new Token(Pilot.POE_DAMERON, agent, UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.R5_P9,
                        UpgradeCard.AUTOTHRUSTERS));
                answer.push(new Token(Pilot.PROTOTYPE_PILOT, agent, UpgradeCard.CHARDAAN_REFIT));
                return answer;
            }));

    // #3: Phillip Booth - IG-88A&B + Heavy Laser Cannon + Autothrusters + Glitterstim + Crackshot + Fire Control
    // Systems +
    // IG-2000
    SquadBuilders.push(new SquadBuilder(Team.SCUM, "3rd World", 2015, "Aggressors x2", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.IG_88A, agent, UpgradeCard.IG_2000, UpgradeCard.CRACK_SHOT,
                UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.GLITTERSTIM,
                UpgradeCard.AUTOTHRUSTERS));
        answer.push(new Token(Pilot.IG_88B, agent, UpgradeCard.IG_2000, UpgradeCard.CRACK_SHOT,
                UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.GLITTERSTIM,
                UpgradeCard.AUTOTHRUSTERS));
        return answer;
    }));

    // #4: Jeremy Howard
    // - Fel + PtL + Royal Guard Title + Stealth + Autothrusters
    // - Vader + Lone Wolf + title + ATC
    // - Omicron Group Shuttle + Palpatine + Sensor Jammer
    SquadBuilders.push(new SquadBuilder(Team.IMPERIAL, "4th World", 2015, "TIE Interceptor/Advanced/Lambda-class",
            function(agent)
            {
                var answer = [];
                answer.push(new Token(Pilot.SOONTIR_FEL, agent, UpgradeCard.ROYAL_GUARD_TIE,
                        UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.AUTOTHRUSTERS, UpgradeCard.STEALTH_DEVICE));
                answer.push(new Token(Pilot.DARTH_VADER, agent, UpgradeCard.TIE_X1, UpgradeCard.LONE_WOLF,
                        UpgradeCard.ADVANCED_TARGETING_COMPUTER));
                answer.push(new Token(Pilot.OMICRON_GROUP_PILOT, agent, UpgradeCard.EMPEROR_PALPATINE,
                        UpgradeCard.SENSOR_JAMMER));
                return answer;
            }));

    // #5: Aaron Bonar
    // - Miranda Doni + Tactician + Twin Laser Turret;
    // - 2x Warden Squadron Pilot + Tactician + Twin Laser Turret
    SquadBuilders.push(new SquadBuilder(Team.REBEL, "5th World", 2015, "K-Wings x3", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.MIRANDA_DONI, agent, UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.TACTICIAN));
        answer
                .push(new Token(Pilot.WARDEN_SQUADRON_PILOT, agent, UpgradeCard.TWIN_LASER_TURRET,
                        UpgradeCard.TACTICIAN));
        answer
                .push(new Token(Pilot.WARDEN_SQUADRON_PILOT, agent, UpgradeCard.TWIN_LASER_TURRET,
                        UpgradeCard.TACTICIAN));
        return answer;
    }));

    // Kirk Mistr: IG88B + Flechette Canon; Cartel Spacer; Binayre Pirate + Cluster Missiles; Talonbane Cobra + Predator
    SquadBuilders.push(new SquadBuilder(Team.SCUM, "EKM", 2015, "Aggressor/M3-A/Z-95/Kihraxz", function(agent)
    {
        var answer = [];
        answer.push(new Token(Pilot.IG_88B, agent, UpgradeCard.FLECHETTE_CANNON));
        answer.push(new Token(Pilot.TALONBANE_COBRA, agent, UpgradeCard.PREDATOR));
        answer.push(new Token(Pilot.CARTEL_SPACER, agent, UpgradeCard.CALCULATION));
        answer.push(new Token(Pilot.BINAYRE_PIRATE, agent, UpgradeCard.CLUSTER_MISSILES));
        return answer;
    }));

    var CoreSetImperialSquadBuilder = SquadBuilders[0];
    var CoreSetRebelSquadBuilder = SquadBuilders[1];
    var CoreSetFirstOrderSquadBuilder = SquadBuilders[2];
    var CoreSetResistanceSquadBuilder = SquadBuilders[3];

    function SquadBuilder(faction, name, year, description, buildFunction)
    {
        InputValidator.validateNotNull("faction", faction);
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("year", year);
        InputValidator.validateNotNull("description", description);
        InputValidator.validateNotNull("buildFunction", buildFunction);

        this.faction = function()
        {
            return faction;
        };

        this.name = function()
        {
            return name;
        };

        this.year = function()
        {
            return year;
        };

        this.description = function()
        {
            return description;
        };

        this.buildSquad = function(agent)
        {
            InputValidator.validateNotNull("agent", agent);
            return buildFunction(agent);
        };
    }

    SquadBuilder.prototype.toString = function()
    {
        return this.year() + " " + this.name() + " (" + this.description() + ")";
    };

    SquadBuilder.findByNameAndYear = function(name, year)
    {
        var answer;
        var length = SquadBuilders.length;

        for (var i = 0; i < length; i++)
        {
            var squadBuilder = SquadBuilders[i];

            if (squadBuilder.name() === name && squadBuilder.year() === year)
            {
                answer = squadBuilder;
                break;
            }
        }

        return answer;
    };

    SquadBuilder.findByTeam = function(team)
    {
        InputValidator.validateNotNull("team", team);

        return SquadBuilders.filter(function(squadBuilder)
        {
            return squadBuilder.faction() === team;
        });
    };

    return (
    {
        findByNameAndYear: SquadBuilder.findByNameAndYear,
        findByTeam: SquadBuilder.findByTeam,
        SquadBuilders: SquadBuilders,
        CoreSetFirstOrderSquadBuilder: CoreSetFirstOrderSquadBuilder,
        CoreSetImperialSquadBuilder: CoreSetImperialSquadBuilder,
        CoreSetRebelSquadBuilder: CoreSetRebelSquadBuilder,
        CoreSetResistanceSquadBuilder: CoreSetResistanceSquadBuilder,
        SquadBuilder: SquadBuilder,
    });
});
