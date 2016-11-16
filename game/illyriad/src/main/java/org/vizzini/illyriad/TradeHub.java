package org.vizzini.illyriad;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Provides an enumeration of trade hubs.
 */
public enum TradeHub
{
    /** Trade hub. */
    ACIES("Acies", 529, -1771),

    /** Trade hub. */
    AELIF("Aelif", -675, -1345),

    /** Trade hub. */
    AERIS("Aeris", 109, -340),

    /** Trade hub. */
    AKUALIS("Akualis", 610, -922),

    /** Trade hub. */
    ALLON("Allon", -68, -77),

    /** Trade hub. */
    ALLTUDIN("Alltudin", 282, -1599),

    /** Trade hub. */
    APAXY("Apaxy", 688, -341),

    /** Trade hub. */
    AQUA("Aqua", 160, -199),

    /** Trade hub. */
    ARGMAENOR("Argmaenor", 366, -2331),

    /** Trade hub. */
    ARTAIN("Artain", 724, -1619),

    /** Trade hub. */
    AUGO("Augo", 71, -1511),

    /** Trade hub. */
    AZURIA("Azuria", -147, -484),

    /** Trade hub. */
    BANDARIUS("Bandarius", 524, -143),

    /** Trade hub. */
    BANDERSTOL("Banderstol", -435, -2551),

    /** Trade hub. */
    BAOLAN("Baolan", 960, 45),

    /** Trade hub. */
    BELGORRIAN("Belgorrian", 211, -2403),

    /** Trade hub. */
    BELLINGSY("Bellingsy", -108, 2),

    /** Trade hub. */
    BENFIS("Benfis", -537, 296),

    /** Trade hub. */
    BEPIMA("Bepima", -563, -754),

    /** Trade hub. */
    BESNURK_BARRACKS("Besnurk Barracks", -642, -3117),

    /** Trade hub. */
    BLACKBRIAR("Blackbriar", 760, -658),

    /** Trade hub. */
    BOYAQUIRA("Boyaquira", 254, -1459),

    /** Trade hub. */
    BROADRICKS_LANDING("Broadrick's Landing", -86, -1425),

    /** Trade hub. */
    BUSILLIS("Busillis", 330, -46),

    /** Trade hub. */
    CAER_MOROCK("Caer Morock", 74, 199),

    /** Trade hub. */
    CAERLEA("Caerlea", -80, -298),

    /** Trade hub. */
    CASK("Cask", -687, 340),

    /** Trade hub. */
    CASTLE_OF_MERCY("Castle of Mercy", -291, -1583),

    /** Trade hub. */
    CATMONT("Catmont", -314, -2852),

    /** Trade hub. */
    CENTRUM("Centrum", 0, 0),

    /** Trade hub. */
    CITTACOLUMBAE("Cittacolumbae", 199, -136),

    /** Trade hub. */
    CITY_OF_TEMPLES("City of Temples", -321, -847),

    /** Trade hub. */
    CLEAGS_HAVEN("Cleag's Haven", 232, -1999),

    /** Trade hub. */
    CLEGERICK("Clegerick", -401, -177),

    /** Trade hub. */
    CLOGHORDS_HAVEN("Cloghord's Haven", -498, -1887),

    /** Trade hub. */
    COLLEGE_OF_SILENCE("College of Silence", -768, -1910),

    /** Trade hub. */
    CROWCAER("Crowcaer", -661, 525),

    /** Trade hub. */
    DAMQUKA("Damquka", 741, 382),

    /** Trade hub. */
    DEAGHS_HAVEN("Deagh's Haven", -122, -2619),

    /** Trade hub. */
    DETYRK_BARRACKS("Detyrk Barracks", -176, -2956),

    /** Trade hub. */
    DOLENTIS("Dolentis", 278, 162),

    /** Trade hub. */
    DOLORIA("Doloria", 331, 280),

    /** Trade hub. */
    DOLUNHILL("Dolunhill", -312, -2389),

    /** Trade hub. */
    DRANGU_KALA("Drangu Kala", -197, 860),

    /** Trade hub. */
    DREADLAND_KEEP("Dreadland Keep", -93, -2381),

    /** Trade hub. */
    DUNBAR("Dunbar", -30, 461),

    /** Trade hub. */
    DUNTHASLEA("Dunthaslea", -838, -39),

    /** Trade hub. */
    DURUS("Durus", 274, -1753),

    /** Trade hub. */
    DYADIN("Dyadin", 123, -534),

    /** Trade hub. */
    EARTHOLME("Eartholme", -525, -466),

    /** Trade hub. */
    ELLESMERE("Ellesmere", 441, 101),

    /** Trade hub. */
    ELSCRICK("Elscrick", -561, -2553),

    /** Trade hub. */
    ESHTUK("Eshtuk", 747, -3171),

    /** Trade hub. */
    ETILAN("Etilan", -615, -138),

    /** Trade hub. */
    EYEPOOL("Eyepool", 256, -670),

    /** Trade hub. */
    FAH_STRIGZ_DORAZ("Fah Strigz Doraz", 518, 61),

    /** Trade hub. */
    FALKENBURG("Falkenburg", 136, 857),

    /** Trade hub. */
    FAMAK_BARRACKS("Famak Barracks", -459, -2643),

    /** Trade hub. */
    FREEPORT("Freeport", 445, -908),

    /** Trade hub. */
    FYTORJ_BARRACKS("Fytorj Barracks", -599, -3016),

    /** Trade hub. */
    GAJIK_FESTRAL("Gajik Festral", 669, 824),

    /** Trade hub. */
    GAJIK_HINOR("Gajik Hinor", 334, 715),

    /** Trade hub. */
    GAJIK_SERUN("Gajik Serun", 457, 783),

    /** Trade hub. */
    GALARWOOD("Galarwood", -284, -2524),

    /** Trade hub. */
    GARR("Garr", -505, 690),

    /** Trade hub. */
    GILAKEK("Gilakek", -920, -553),

    /** Trade hub. */
    GJUK_DARAK("Gjuk-Darak", 320, -3176),

    /** Trade hub. */
    GJUNTAK_BARRACKS("Gjuntak Barracks", -585, -2275),

    /** Trade hub. */
    GLINNTRE("Glinntre", -141, -179),

    /** Trade hub. */
    GLORY_CITY("Glory City", 498, -662),

    /** Trade hub. */
    GORDARILL("Gordarill", 615, -2216),

    /** Trade hub. */
    GORN("Gorn", -384, 536),

    /** Trade hub. */
    GORWYN("Gorwyn", 594, -1527),

    /** Trade hub. */
    GREAT_MOUNTAIN_HOME("Great Mountain Home", -223, -353),

    /** Trade hub. */
    GREYBRIAR("Greybriar", -808, -2177),

    /** Trade hub. */
    GRISJ_HHURAGK("Grisj-hhuragk", 180, -3124),

    /** Trade hub. */
    GROVINTON("Grovinton", -145, 174),

    /** Trade hub. */
    GRUJT_URUK("Grujt Uruk", -207, -3176),

    /** Trade hub. */
    HALL_OF_CONTEMPLATION("Hall of Contemplation", -316, -2635),

    /** Trade hub. */
    HALL_OF_REFLECTION("Hall of Reflection", -375, -2119),

    /** Trade hub. */
    HALLS_OF_CARE("Halls of Care", 34, -1796),

    /** Trade hub. */
    HANLIF("Hanlif", -684, -869),

    /** Trade hub. */
    HASTELBURY("Hastelbury", -152, 54),

    /** Trade hub. */
    HEADAGHS_HAVEN("Headagh's Haven", 173, -2686),

    /** Trade hub. */
    HEDGORS_HAVEN("Hedgor's Haven", 776, -2502),

    /** Trade hub. */
    HELNSBERE("Helnsbere", -849, -2475),

    /** Trade hub. */
    HOATAOTO("Hoataoto", 939, -1955),

    /** Trade hub. */
    HOHNSVAL("Hohnsval", -231, 691),

    /** Trade hub. */
    HOLBAEK("Holbaek", -83, 539),

    /** Trade hub. */
    HOPE("Hope", -775, 235),

    /** Trade hub. */
    HOPE_RIDGE("Hope Ridge", -137, -2052),

    /** Trade hub. */
    HOSCARMEL("Hoscarmel", -858, -612),

    /** Trade hub. */
    HUMAYAN("Humayan", 635, -534),

    /** Trade hub. */
    IGNIS("Ignis", 242, -251),

    /** Trade hub. */
    IJEK("Ijek", 879, -2803),

    /** Trade hub. */
    ILDIBROOK("Ildibrook", -303, -1899),

    /** Trade hub. */
    JALLALABAD("Jallalabad", 664, -617),

    /** Trade hub. */
    JARRU("Jarru", -906, -277),

    /** Trade hub. */
    JHKEJ("Jhkej", 32, -3200),

    /** Trade hub. */
    KACHAK("Kachak", 210, -2953),

    /** Trade hub. */
    KAJADUM("Kajadum", 564, -387),

    /** Trade hub. */
    KALA_MAHLARG("Kala Mahlarg", 777, 517),

    /** Trade hub. */
    KARAKAR("Karakar", -418, -640),

    /** Trade hub. */
    KELSMOUTH("Kelsmouth", -55, -853),

    /** Trade hub. */
    KENDBROOK("Kendbrook", -942, -3041),

    /** Trade hub. */
    KEPSBURG("Kepsburg", -566, 104),

    /** Trade hub. */
    KHAFKAR("Khafkar", 755, -498),

    /** Trade hub. */
    KINGSTHRONE("Kingsthrone", -860, -2683),

    /** Trade hub. */
    KOLBARCH("Kolbarch", 509, -2059),

    /** Trade hub. */
    KREYO("Kreyo", 788, -2184),

    /** Trade hub. */
    KZRIK("Kzrik", -283, 536),

    /** Trade hub. */
    LACONA("Lacona", 146, -447),

    /** Trade hub. */
    LAGHADDS_HAVEN("Laghadd's Haven", 545, -2518),

    /** Trade hub. */
    LANARRIN("Lanarrin", -684, -481),

    /** Trade hub. */
    LANDINGSTOWN("Landingstown", 645, -1327),

    /** Trade hub. */
    LANTELLYN("Lantellyn", -693, -595),

    /** Trade hub. */
    LARESH("Laresh", 476, -305),

    /** Trade hub. */
    LASTHOLD("Lasthold", -651, -2382),

    /** Trade hub. */
    LOSTWITHIEL("Lostwithiel", 137, 527),

    /** Trade hub. */
    LUDISFOLD("Ludisfold", -821, -2055),

    /** Trade hub. */
    MADH_KALA_URUK("Madh Kala Uruk", 623, 114),

    /** Trade hub. */
    MADH_VRAKEN_KALJ("Madh-Vraken-Kalj", 9, -2842),

    /** Trade hub. */
    MAHAREVA("Mahareva", 957, -2142),

    /** Trade hub. */
    MANDAIPUR("Mandaipur", 506, -538),

    /** Trade hub. */
    MAPLEHURST("Maplehurst", -337, 253),

    /** Trade hub. */
    MARAUPOE("Maraupoe", 942, -1496),

    /** Trade hub. */
    MARSTON("Marston", -42, 371),

    /** Trade hub. */
    MATABA("Mataba", 893, -571),

    /** Trade hub. */
    MATOMBO("Matombo", -496, -802),

    /** Trade hub. */
    MEMOR("Memor", 382, -1921),

    /** Trade hub. */
    MENTIS("Mentis", 212, -2168),

    /** Trade hub. */
    METAKI("Metaki", -570, -722),

    /** Trade hub. */
    MONS_EQUI("Mons Equi", 244, 28),

    /** Trade hub. */
    MOONVALE("Moonvale", -527, -2771),

    /** Trade hub. */
    MOURLAKE("Mourlake", -766, -2893),

    /** Trade hub. */
    NACHIK("Nachik", 648, -443),

    /** Trade hub. */
    NDERURK_BARRACKS("Nderurk Barracks", -780, -3108),

    /** Trade hub. */
    NEMIDAS("Nemidas", -113, -697),

    /** Trade hub. */
    NESSIM("Nessim", 838, -352),

    /** Trade hub. */
    NEW_HOPE("New Hope", 48, -1888),

    /** Trade hub. */
    NEW_TAL("New Tal", -436, -1341),

    /** Trade hub. */
    NEWCHAPEL("Newchapel", -549, -2428),

    /** Trade hub. */
    NEWHARBOUR("Newharbour", 664, -817),

    /** Trade hub. */
    NEWYNS("Newyns", 895, -1650),

    /** Trade hub. */
    NORVASSER("Norvasser", -734, -2454),

    /** Trade hub. */
    OLOG_HA("Olog Ha", 92, -710),

    /** Trade hub. */
    OLOG_RRAUS("Olog Rraus", 118, -801),

    /** Trade hub. */
    OMEN("Omen", 538, -2936),

    /** Trade hub. */
    ORAMATETE("Oramatete", 914, -2041),

    /** Trade hub. */
    ORDU_KUSH("Ordu Kush", 684, -174),

    /** Trade hub. */
    ORELYS("Orelys", -370, 332),

    /** Trade hub. */
    PARATAOTI("Parataoti", 783, -1828),

    /** Trade hub. */
    PARLANTIS("Parlantis", 311, -889),

    /** Trade hub. */
    PATRADAN("Patradan", 420, -2170),

    /** Trade hub. */
    PELLIMONT("Pellimont", 80, 100),

    /** Trade hub. */
    PENCASTER("Pencaster", -645, -2861),

    /** Trade hub. */
    PENTATEUL("Pentateul", 832, -813),

    /** Trade hub. */
    PERSIFLAGE("Persiflage", 271, 392),

    /** Trade hub. */
    POEGHADS_HAVEN("Poeghad's Haven", 631, -1970),

    /** Trade hub. */
    PORT_TAL("Port Tal", -302, -763),

    /** Trade hub. */
    POTENTIA("Potentia", 284, -143),

    /** Trade hub. */
    PRAEKORN("Praekorn", 645, -2672),

    /** Trade hub. */
    PRINCEVALE("Princevale", -843, -2966),

    /** Trade hub. */
    QAINAQANGMA("Qainaqangma", 630, 281),

    /** Trade hub. */
    QAL_MAR("Qal Mar", 905, -269),

    /** Trade hub. */
    QI_QUIEN("Qi Quien", 919, 521),

    /** Trade hub. */
    QINGDAO("Qingdao", 936, 369),

    /** Trade hub. */
    RAINSWINTON("Rainswinton", -530, -1441),

    /** Trade hub. */
    RENDSBURG("Rendsburg", 46, 736),

    /** Trade hub. */
    RIVERPASS("Riverpass", -639, 64),

    /** Trade hub. */
    ROETAGHS_HAVEN("Roetagh's Haven", 410, -2640),

    /** Trade hub. */
    RONNEBY("Ronneby", 179, 212),

    /** Trade hub. */
    ROSDIN("Rosdin", -331, -230),

    /** Trade hub. */
    ROYALPORT("Royalport", 452, -1478),

    /** Trade hub. */
    SANCTUARY("Sanctuary", 248, -2823),

    /** Trade hub. */
    SANSOURAN("Sansouran", -608, -334),

    /** Trade hub. */
    SANTELLYA("Santellya", -698, -377),

    /** Trade hub. */
    SCARA_GAJUP("Scara Gajup", -371, 797),

    /** Trade hub. */
    SCARA_ULURL("Scara Ulurl", -518, 834),

    /** Trade hub. */
    SCARAVAR("Scaravar", -321, -527),

    /** Trade hub. */
    SCIO("Scio", 120, -1999),

    /** Trade hub. */
    SCITE("Scite", 219, -48),

    /** Trade hub. */
    SEBRING("Sebring", -770, -213),

    /** Trade hub. */
    SELENZE("Selenze", 265, -414),

    /** Trade hub. */
    SEVEN_BLESSINGS("Seven Blessings", -93, -1760),

    /** Trade hub. */
    SHEARWALL_MARKET("Shearwall Market", -60, -1532),

    /** Trade hub. */
    SHELTON("Shelton", 428, -214),

    /** Trade hub. */
    SHINGENG("Shingeng", 771, -12),

    /** Trade hub. */
    SHQUR_MICH_KALJ("Shqur-Mich-Kalj", 184, -2580),

    /** Trade hub. */
    SHURTHORN("Shurthorn", -374, 13),

    /** Trade hub. */
    SILDARIM("Sildarim", 757, 704),

    /** Trade hub. */
    SILLARUS("Sillarus", 563, 661),

    /** Trade hub. */
    SILVER_SPIRES("Silver Spires", -60, -1694),

    /** Trade hub. */
    SLUICE_HAVEN("Sluice Haven", -841, 362),

    /** Trade hub. */
    SLUPSK("Slupsk", 155, 350),

    /** Trade hub. */
    SNARESHEATH("Snaresheath", -613, -2655),

    /** Trade hub. */
    SOUTHFORGE("Southforge", -793, -2289),

    /** Trade hub. */
    SSAHARIN("Ssaharin", 912, -199),

    /** Trade hub. */
    STONEBERG("Stoneberg", -411, -2815),

    /** Trade hub. */
    STORMSTONE("Stormstone", -43, -973),

    /** Trade hub. */
    STYNE("Styne", 84, 520),

    /** Trade hub. */
    SUIQIAS("Suiqias", 30, -1388),

    /** Trade hub. */
    SWIFTSTEAD("Swiftstead", 448, 561),

    /** Trade hub. */
    SYGUF_BARRACKS("Syguf Barracks", -724, -2719),

    /** Trade hub. */
    TANTARK("Tantark", -480, 480),

    /** Trade hub. */
    TARPONSEA("Tarponsea", -96, -603),

    /** Trade hub. */
    TATTERSHILL("Tattershill", -494, -1729),

    /** Trade hub. */
    TAYARIBE("Tayaribe", -335, -1382),

    /** Trade hub. */
    TEMPLE_OF_COMPASSION("Temple of Compassion", -188, -1675),

    /** Trade hub. */
    TEMPUS("Tempus", 222, -340),

    /** Trade hub. */
    TERRA("Terra", 82, -251),

    /** Trade hub. */
    TEWHIRRIA("Tewhirria", 312, 575),

    /** Trade hub. */
    THE_BARRACKS("The Barracks", 544, 466),

    /** Trade hub. */
    THE_BARRIER("The Barrier", -146, 241),

    /** Trade hub. */
    THE_BROTHERS_HAVEN("The Brothers' Haven", 376, -2068),

    /** Trade hub. */
    THE_EMPTY_HALLS("The Empty Halls", 817, -2699),

    /** Trade hub. */
    THE_LOFT("The Loft", -801, 515),

    /** Trade hub. */
    THOP_FATOFT("Thop Fatoft", 562, 234),

    /** Trade hub. */
    THOROES_HAVEN("Thoroe's Haven", -603, -2081),

    /** Trade hub. */
    THUJN_HUCKUT_KALJ("Thujn-Huckut-Kalj", 498, -2400),

    /** Trade hub. */
    TIENA("Tiena", 0, -441),

    /** Trade hub. */
    TILVERDALE("Tilverdale", -469, -56),

    /** Trade hub. */
    TOR_DANNU("Tor Dannu", -251, -86),

    /** Trade hub. */
    TOR_GORRAK("Tor Gorrak", 21, -180),

    /** Trade hub. */
    TORKURZ("Torkurz", 967, -3153),

    /** Trade hub. */
    TRACTUS("Tractus", 90, -2123),

    /** Trade hub. */
    TRAZURK("Trazurk", -419, -3224),

    /** Trade hub. */
    TRIMEK_BARRACKS("Trimek Barracks", -743, -3025),

    /** Trade hub. */
    TRINGAR_TRADING_POST("Tringar Trading Post", -705, 671),

    /** Trade hub. */
    TROTTINGHAM("Trottingham", 113, -72),

    /** Trade hub. */
    TUBRIQ("Tubriq", 395, -692),

    /** Trade hub. */
    TUDEYLL("Tudeyll", -387, -322),

    /** Trade hub. */
    TUNDALE("Tundale", 391, 437),

    /** Trade hub. */
    TURYIN("Turyin", -324, -316),

    /** Trade hub. */
    UDALIA("Udalia", 385, -586),

    /** Trade hub. */
    URUK_VADOKAN("Uruk Vadokan", -591, 190),

    /** Trade hub. */
    URUKONIUM("Urukonium", 502, -65),

    /** Trade hub. */
    VA_DRANGU("Va Drangu", -52, 865),

    /** Trade hub. */
    VDEKURCH("Vdekurch", -967, -3276),

    /** Trade hub. */
    VDUCH("Vduch", 822, -3061),

    /** Trade hub. */
    VEEM("Veem", 983, -2386),

    /** Trade hub. */
    VERITAS("Veritas", 402, 154),

    /** Trade hub. */
    VERITY_CITY("Verity City", -923, 113),

    /** Trade hub. */
    VOTAR("Votar", -709, 159),

    /** Trade hub. */
    VRAKUN("Vrakun", 532, -3209),

    /** Trade hub. */
    WINDMIRE("Windmire", -210, -2875),

    /** Trade hub. */
    WINTER_HAVEN("Winter Haven", -446, -3068),

    /** Trade hub. */
    WOODSEDGE("Woodsedge", 130, 13),

    /** Trade hub. */
    WYLVALE("Wylvale", -195, -2757),

    /** Trade hub. */
    XCRIX("Xcrix", -236, 487),

    /** Trade hub. */
    ZAQCHA("Zaqcha", 796, -1415),

    /** Trade hub. */
    ZGUDUN_BARRACKS("Zgudun Barracks", -506, -2893),

    /** Trade hub. */
    ZHUHAI("Zhuhai", 846, 229);

    /** Map of display name to value. */
    private static final Map<String, TradeHub> displayNameToValue = new HashMap<String, TradeHub>();

    /** Values in Broken Lands. */
    private static TradeHub[] valuesBrokenLands;

    /** Values in Elgea. */
    private static TradeHub[] valuesElgea;

    /**
     * @param displayName Display name.
     * 
     * @return the trade hub with the given display name.
     */
    public static TradeHub valueOfDisplayName(final String displayName)
    {
        if (displayNameToValue.isEmpty())
        {
            for (final TradeHub tradeHub : values())
            {
                displayNameToValue.put(tradeHub.getDisplayName(), tradeHub);
            }
        }

        return displayNameToValue.get(displayName);
    }

    /**
     * @return the trade hubs in Broken Lands.
     */
    public static TradeHub[] valuesBrokenLands()
    {
        if (valuesBrokenLands == null)
        {
            final List<TradeHub> tradeHubs = new ArrayList<TradeHub>();

            for (final TradeHub region : values())
            {
                if (region.isInBrokenLands())
                {
                    tradeHubs.add(region);
                }
            }

            valuesBrokenLands = tradeHubs.toArray(new TradeHub[tradeHubs.size()]);
        }

        return valuesBrokenLands;
    }

    /**
     * @return the trade hubs in Elgea.
     */
    public static TradeHub[] valuesElgea()
    {
        if (valuesElgea == null)
        {
            final List<TradeHub> tradeHubs = new ArrayList<TradeHub>();

            for (final TradeHub region : values())
            {
                if (region.isInElgea())
                {
                    tradeHubs.add(region);
                }
            }

            valuesElgea = tradeHubs.toArray(new TradeHub[tradeHubs.size()]);
        }

        return valuesElgea;
    }

    /** Display name. */
    private final String displayName;

    /** X coordinate. */
    private final int x;

    /** Y coordinate. */
    private final int y;

    /**
     * Construct this object.
     * 
     * @param displayName Display name.
     * @param x X coordinate.
     * @param y Y coordinate.
     */
    @SuppressWarnings("hiding")
    private TradeHub(final String displayName, final int x, final int y)
    {
        this.displayName = displayName;
        this.x = x;
        this.y = y;
    }

    /**
     * @param city City.
     * 
     * @return the distance between this trade hub and another trade hub.
     */
    public double computeDistance(final City city)
    {
        return computeDistance(x, y, city.getX(), city.getY());
    }

    /**
     * @param another Another trade hub.
     * 
     * @return the distance between this trade hub and another trade hub.
     */
    public double computeDistance(final TradeHub another)
    {
        return computeDistance(x, y, another.x, another.y);
    }

    /**
     * @return the displayName
     */
    public String getDisplayName()
    {
        return displayName;
    }

    /**
     * @return the x
     */
    public int getX()
    {
        return x;
    }

    /**
     * @return the y
     */
    public int getY()
    {
        return y;
    }

    /**
     * @return true if this is in the Broken Lands.
     */
    public boolean isInBrokenLands()
    {
        return (y < -1000);
    }

    /**
     * @return true if this is in Elgea.
     */
    public boolean isInElgea()
    {
        return (y > -1001);
    }

    @Override
    public String toString()
    {
        return displayName;
    }

    /**
     * @param x1 First X coordinate.
     * @param y1 First Y coordinate.
     * @param x2 Second X coordinate.
     * @param y2 Second Y coordinate.
     * 
     * @return the distance between two points.
     */
    private double computeDistance(final int x1, final int y1, final int x2, final int y2)
    {
        final int dSquared = ((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2));

        return Math.sqrt(dSquared);
    }
}
