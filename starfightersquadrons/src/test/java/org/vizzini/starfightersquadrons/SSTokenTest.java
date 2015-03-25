package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;
import java.util.Set;

import org.junit.Test;
import org.vizzini.starfightersquadrons.RangeRuler.Range;
import org.vizzini.starfightersquadrons.ShipAction.DamageCardShipAction;
import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Provides tests for the <code>SSToken</code> class.
 */
public final class SSTokenTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>computeAttackDiceCount()</code> method.
     */
    @Test
    public void computeAttackDiceCount()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent agent = environment.getImperialAgent();
        final SSToken token = new SSToken(Pilot.ACADEMY_PILOT, agent);
        final Weapon weapon = token.getPrimaryWeapon();

        // Run / Verify.
        assertThat(token.computeAttackDiceCount(environment, weapon, Range.ONE), is(3));
        assertThat(token.computeAttackDiceCount(environment, weapon, Range.TWO), is(2));
        assertThat(token.computeAttackDiceCount(environment, weapon, Range.THREE), is(2));
    }

    /**
     * Test the <code>computeAttackDiceCount()</code> method.
     */
    @Test
    public void computeAttackDiceCountBlindedPilot()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent agent = environment.getImperialAgent();
        final SSToken token = new SSToken(Pilot.ACADEMY_PILOT, agent);
        token.addCriticalDamage(DamageCard.BLINDED_PILOT);
        assertThat(token.getDamageCount(), is(0));
        assertThat(token.getCriticalDamageCount(), is(1));
        final Weapon weapon = token.getPrimaryWeapon();

        // Run / Verify.
        assertThat(token.computeAttackDiceCount(environment, weapon, Range.ONE), is(0));
        assertThat(token.getDamageCount(), is(1));
        assertThat(token.getCriticalDamageCount(), is(0));

        assertThat(token.computeAttackDiceCount(environment, weapon, Range.ONE), is(3));
    }

    /**
     * Test the <code>computeDefenseDiceCount()</code> method.
     */
    @Test
    public void computeDefenseDiceCount()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SSToken token = new SSToken(Pilot.ACADEMY_PILOT, agent);
        final Weapon weapon = token.getPrimaryWeapon();

        // Run / Verify.
        assertThat(token.computeDefenseDiceCount(weapon, Range.ONE), is(3));
        assertThat(token.computeDefenseDiceCount(weapon, Range.TWO), is(3));
        assertThat(token.computeDefenseDiceCount(weapon, Range.THREE), is(4));
    }

    /**
     * Test the <code>getHullValue()</code> method.
     */
    @Test
    public void doActionR2F2()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent agent = environment.getRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.R2_F2);
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent, upgrades);

        // Run.
        UpgradeCard.R2_F2.doAction(environment, token);

        // Verify.
        assertThat(token.getPilotSkillValue(), is(2));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(3));
        assertThat(token.getHullValue(), is(3));
        assertThat(token.getShieldValue(), is(2));

        // Run.
        UpgradeCard.R2_F2.phaseEffect(environment, token, Phase.END_END);

        // Verify.
        assertThat(token.getPilotSkillValue(), is(2));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(2));
        assertThat(token.getHullValue(), is(3));
        assertThat(token.getShieldValue(), is(2));
    }

    /**
     * Test the <code>getManeuvers()</code> method.
     */
    @Test
    public void getManeuvers()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);

        // Run.
        final ManeuverSet result = token.getManeuvers();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(15));
        assertThat(result.getEasyManeuvers().size(), is(4));
        assertThat(result.getStandardManeuvers().size(), is(10));
        assertThat(result.getHardManeuvers().size(), is(1));
    }

    /**
     * Test the <code>getManeuvers()</code> method.
     */
    @Test
    public void getManeuversDamagedEngine()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);
        token.addCriticalDamage(DamageCard.DAMAGED_ENGINE);

        // Run.
        final ManeuverSet result = token.getManeuvers();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(15));
        assertThat(result.getEasyManeuvers().size(), is(4));
        assertThat(result.getStandardManeuvers().size(), is(6));
        assertThat(result.getHardManeuvers().size(), is(5));
    }

    /**
     * Test the <code>getManeuvers()</code> method.
     */
    @Test
    public void getManeuversNienNunb()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.NIEN_NUNB);
        final SSToken token = new SSToken(Pilot.HAN_SOLO, agent, upgrades);

        // Run.
        final ManeuverSet result = token.getManeuvers();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(16));
        assertThat(result.getEasyManeuvers().size(), is(6));
        assertThat(result.getStandardManeuvers().size(), is(8));
        assertThat(result.getHardManeuvers().size(), is(2));
    }

    /**
     * Test the <code>getManeuvers()</code> method.
     */
    @Test
    public void getManeuversR2Astromech()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.R2_ASTROMECH);
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent, upgrades);

        // Run.
        final ManeuverSet result = token.getManeuvers();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(15));
        assertThat(result.getEasyManeuvers().size(), is(8));
        assertThat(result.getStandardManeuvers().size(), is(6));
        assertThat(result.getHardManeuvers().size(), is(1));
    }

    /**
     * Test the <code>getPrimaryWeapon()</code> method.
     */
    @Test
    public void getPrimaryWeapon()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken attacker = new SSToken(Pilot.ROOKIE_PILOT, agent, SecondaryWeaponUpgradeCard.PROTON_TORPEDOES);

        // Run.
        final Weapon result = attacker.getPrimaryWeapon();

        // Verify.
        assertNotNull(result);
        assertThat(result.getName(), is("Primary Weapon"));
        assertThat(result.getRanges().size(), is(3));
        assertTrue(result.getRanges().contains(Range.ONE));
        assertTrue(result.getRanges().contains(Range.TWO));
        assertTrue(result.getRanges().contains(Range.THREE));
        assertThat(result.getWeaponValue(), is(3));
    }

    /**
     * Test the <code>getSecondaryWeapons()</code> method.
     */
    @Test
    public void getSecondaryWeapons()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken attacker = new SSToken(Pilot.ROOKIE_PILOT, agent, SecondaryWeaponUpgradeCard.PROTON_TORPEDOES);

        // Run.
        final Set<Weapon> result = attacker.getSecondaryWeapons();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        assertThat(result.iterator().next().getName(), is("Proton Torpedoes"));
    }

    /**
     * Test the <code>getShipActions()</code> method.
     */
    @Test
    public void getShipActions()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);

        // Run.
        final Set<ShipAction> result = token.getShipActions();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
        assertTrue(result.contains(ShipAction.FOCUS));
        assertTrue(result.contains(ShipAction.TARGET_LOCK));
    }

    /**
     * Test the <code>getShipActions()</code> method.
     */
    @Test
    public void getShipActionsDamagedSensorArray()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);
        token.addCriticalDamage(DamageCard.DAMAGED_SENSOR_ARRAY);

        // Run.
        final Set<ShipAction> result = token.getShipActions();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final ShipAction shipAction = result.iterator().next();
        assertThat(shipAction, is(DamageCardShipAction.class));
        assertThat(((DamageCardShipAction)shipAction).getDamage(), is(DamageCard.DAMAGED_SENSOR_ARRAY));
    }

    /**
     * Test the <code>getShipActions()</code> method.
     */
    @Test
    public void getShipActionsEngineUpgrade()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.ENGINE_UPGRADE);
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent, upgrades);

        // Run.
        final Set<ShipAction> result = token.getShipActions();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));
        assertTrue(result.contains(ShipAction.BOOST));
        assertTrue(result.contains(ShipAction.FOCUS));
        assertTrue(result.contains(ShipAction.TARGET_LOCK));
    }

    /**
     * Test the <code>getShipActions()</code> method.
     */
    @Test
    public void getShipActionsMillenniumFalcon()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.MILLENNIUM_FALCON);
        final SSToken token = new SSToken(Pilot.HAN_SOLO, agent, upgrades);

        // Run.
        final Set<ShipAction> result = token.getShipActions();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));
        assertTrue(result.contains(ShipAction.EVADE));
        assertTrue(result.contains(ShipAction.FOCUS));
        assertTrue(result.contains(ShipAction.TARGET_LOCK));
    }

    /**
     * Test the <code>getShipActions()</code> method.
     */
    @Test
    public void getShipActionsTargetingComputer()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.TARGETING_COMPUTER);
        final SSToken token = new SSToken(Pilot.ACADEMY_PILOT, agent, upgrades);

        // Run.
        final Set<ShipAction> result = token.getShipActions();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(4));
        assertTrue(result.contains(ShipAction.FOCUS));
        assertTrue(result.contains(ShipAction.BARREL_ROLL));
        assertTrue(result.contains(ShipAction.EVADE));
        assertTrue(result.contains(ShipAction.TARGET_LOCK));
    }

    /**
     * Test the <code>getHullValue()</code> method.
     */
    @Test
    public void getShipStateValues()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);

        // Run / Verify.
        assertThat(token.getPilotSkillValue(), is(2));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(2));
        assertThat(token.getHullValue(), is(3));
        assertThat(token.getShieldValue(), is(2));
    }

    /**
     * Test the <code>getHullValue()</code> method.
     */
    @Test
    public void getShipStateValuesDirectHit()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);
        token.addCriticalDamage(DamageCard.DIRECT_HIT);

        // Run / Verify.
        assertThat(token.getPilotSkillValue(), is(2));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(2));
        assertThat(token.getHullValue(), is(2));
        assertThat(token.getShieldValue(), is(2));
    }

    /**
     * Test the <code>getHullValue()</code> method.
     */
    @Test
    public void getShipStateValuesHullUpgrade()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.HULL_UPGRADE);
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent, upgrades);

        // Run / Verify.
        assertThat(token.getPilotSkillValue(), is(2));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(2));
        assertThat(token.getHullValue(), is(4));
        assertThat(token.getShieldValue(), is(2));
    }

    /**
     * Test the <code>getPilotSkillValue()</code> method.
     */
    @Test
    public void getShipStateValuesInjuredPilot()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.ADRENALINE_RUSH, UpgradeCard.DAREDEVIL);
        final SSToken token = new SSToken(Pilot.LUKE_SKYWALKER, agent, upgrades);
        assertThat(token.getUpgradeCount(), is(2));
        token.addCriticalDamage(DamageCard.INJURED_PILOT);

        // Run / Verify.
        assertThat(token.getPilotSkillValue(), is(0));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(2));
        assertThat(token.getHullValue(), is(3));
        assertThat(token.getShieldValue(), is(2));
        assertThat(token.getUpgradeCount(), is(0));
    }

    /**
     * Test the <code>getHullValue()</code> method.
     */
    // @Test
    // public void getShipStateValuesCombatRetrofit()
    // {
    // // Setup.
    // final SSAgent agent = testData.createRebelAgent();
    // final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.COMBAT_RETROFIT);
    // final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent, upgrades);
    //
    // // Run / Verify.
    // assertThat(token.getPilotSkillValue(), is(2));
    // assertThat(token.getPrimaryWeaponValue(), is(3));
    // assertThat(token.getAgilityValue(), is(2));
    // assertThat(token.getHullValue(), is(5));
    // assertThat(token.getShieldValue(), is(3));
    // }

    /**
     * Test the <code>getHullValue()</code> method.
     */
    @Test
    public void getShipStateValuesR2F2()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.R2_F2);
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent, upgrades);

        // Run / Verify.
        assertThat(token.getPilotSkillValue(), is(2));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(2));
        assertThat(token.getHullValue(), is(3));
        assertThat(token.getShieldValue(), is(2));
    }

    /**
     * Test the <code>getShieldValue()</code> method.
     */
    @Test
    public void getShipStateValuesShieldUpgrade()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.SHIELD_UPGRADE);
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent, upgrades);

        // Run / Verify.
        assertThat(token.getPilotSkillValue(), is(2));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(2));
        assertThat(token.getHullValue(), is(3));
        assertThat(token.getShieldValue(), is(3));
    }

    /**
     * Test the <code>getAgilityValue()</code> method.
     */
    @Test
    public void getShipStateValuesStealthDevice()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken defender = new SSToken(Pilot.ROOKIE_PILOT, agent, UpgradeCard.STEALTH_DEVICE);
        defender.decreaseShieldCount();
        defender.decreaseShieldCount();

        // Run / Verify.
        assertThat(defender.getPilotSkillValue(), is(2));
        assertThat(defender.getPrimaryWeaponValue(), is(3));
        assertThat(defender.getAgilityValue(), is(3));
        assertThat(defender.getHullValue(), is(3));
        assertThat(defender.getShieldValue(), is(2));
        assertThat(defender.getShieldCount(), is(0));

        // Modify.
        final SSEnvironment environment = testData.createEnvironment();
        environment.placeToken(new SSPosition(557, 81, 0), defender);
        final SSAdjudicator adjudicator = new SSAdjudicator();
        final SSToken attacker = TestData.findShip(environment.getAttackers(SSTeam.IMPERIAL), Ship.TIE_FIGHTER);
        environment.setActiveToken(attacker);
        final Weapon weapon = (Weapon)SecondaryWeaponUpgradeCard.PROTON_TORPEDOES;
        final CombatAction combatAction = new CombatAction(environment, adjudicator, attacker, weapon, defender);
        combatAction.doIt();

        // Run / Verify.
        if (attacker.isDefenderHit())
        {
            assertThat(defender.getAgilityValue(), is(2));
            assertThat(defender.getUpgradeCount(), is(0));
        }
        else
        {
            assertThat(defender.getAgilityValue(), is(3));
            assertThat(defender.getUpgradeCount(), is(1));
        }
    }

    /**
     * Test the <code>getAgilityValue()</code> method.
     */
    @Test
    public void getShipStateValuesStructuralDamage()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);
        token.addCriticalDamage(DamageCard.STRUCTURAL_DAMAGE);

        // Run / Verify.
        assertThat(token.getPilotSkillValue(), is(2));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(1));
        assertThat(token.getHullValue(), is(3));
        assertThat(token.getShieldValue(), is(2));
    }

    /**
     * Test the <code>getPilotSkillValue()</code> method.
     */
    @Test
    public void getShipStateValuesVeteranInstincts()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.VETERAN_INSTINCTS);
        final SSToken token = new SSToken(Pilot.LUKE_SKYWALKER, agent, upgrades);

        // Run / Verify.
        assertThat(token.getPilotSkillValue(), is(10));
        assertThat(token.getPrimaryWeaponValue(), is(3));
        assertThat(token.getAgilityValue(), is(2));
        assertThat(token.getHullValue(), is(3));
        assertThat(token.getShieldValue(), is(2));
    }

    /**
     * Test the <code>getHullValue()</code> method.
     */
    @Test
    public void getShipStateValuesWeaponMalfunction()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);
        token.addCriticalDamage(DamageCard.WEAPON_MALFUNCTION);

        // Run / Verify.
        assertThat(token.getPilotSkillValue(), is(2));
        assertThat(token.getPrimaryWeaponValue(), is(2));
        assertThat(token.getAgilityValue(), is(2));
        assertThat(token.getHullValue(), is(3));
        assertThat(token.getShieldValue(), is(2));
    }

    /**
     * Test the <code>getUpgrades()</code> method.
     */
    @Test
    public void getUpgrades()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);

        // Run.
        final UpgradeCardList result = token.getUpgrades();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(0));
    }

    /**
     * Test the <code>getUpgradeTypes()</code> method.
     */
    @Test
    public void getUpgradeTypes()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, agent);

        // Run.
        final List<UpgradeType> result = token.getUpgradeTypes();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
        assertTrue(result.contains(UpgradeType.ASTROMECH));
        assertTrue(result.contains(UpgradeType.TORPEDO));
    }

    /**
     * Test the <code>getUpgradeTypes()</code> method.
     */
    @Test
    public void getUpgradeTypesR2D6()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.R2_D6);
        final SSToken token = new SSToken(Pilot.RED_SQUADRON_PILOT, agent, upgrades);

        // Run.
        final List<UpgradeType> result = token.getUpgradeTypes();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));
        assertTrue(result.contains(UpgradeType.ASTROMECH));
        assertTrue(result.contains(UpgradeType.ELITE));
        assertTrue(result.contains(UpgradeType.TORPEDO));
    }

    /**
     * Test the <code>getUpgradeTypes()</code> method.
     */
    @Test
    public void getUpgradeTypesSlaveI()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.SLAVE_I);
        final SSToken token = new SSToken(Pilot.BOUNTY_HUNTER, agent, upgrades);

        // Run.
        final List<UpgradeType> result = token.getUpgradeTypes();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(5));
        assertTrue(result.contains(UpgradeType.CANNON));
        assertTrue(result.contains(UpgradeType.BOMB));
        assertTrue(result.contains(UpgradeType.CREW));
        assertTrue(result.contains(UpgradeType.MISSILE));
        assertTrue(result.contains(UpgradeType.TORPEDO));
    }

    /**
     * Test the <code>getWeapons()</code> method.
     */
    @Test
    public void getWeapons()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SSToken attacker = new SSToken(Pilot.ROOKIE_PILOT, agent, SecondaryWeaponUpgradeCard.PROTON_TORPEDOES);

        // Run.
        final List<Weapon> result = attacker.getWeapons();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
        assertThat(result.get(0).getName(), is("Primary Weapon"));
        assertThat(result.get(1).getName(), is("Proton Torpedoes"));
    }

    /**
     * Test the <code>increaseCloakCount()</code> method.
     */
    @Test
    public void increaseCloakCount()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SSToken token = new SSToken(Pilot.ACADEMY_PILOT, agent);
        assertThat(token.getCloakCount(), is(0));

        // Run.
        token.increaseCloakCount();

        // Verify.
        assertThat(token.getCloakCount(), is(1));
    }

    /**
     * Test the <code>increaseEvadeCount()</code> method.
     */
    @Test
    public void increaseEvadeCount()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SSToken token = new SSToken(Pilot.ACADEMY_PILOT, agent);
        assertThat(token.getEvadeCount(), is(0));

        // Run.
        token.increaseEvadeCount();

        // Verify.
        assertThat(token.getEvadeCount(), is(1));
    }

    /**
     * Test the <code>increaseFocusCount()</code> method.
     */
    @Test
    public void increaseFocusCount()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SSToken token = new SSToken(Pilot.ACADEMY_PILOT, agent);
        assertThat(token.getFocusCount(), is(0));

        // Run.
        token.increaseFocusCount();

        // Verify.
        assertThat(token.getFocusCount(), is(1));
    }

    /**
     * Test the <code>increaseStressCount()</code> method.
     */
    @Test
    public void increaseStressCount()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SSToken token = new SSToken(Pilot.ACADEMY_PILOT, agent);
        assertThat(token.getStressCount(), is(0));

        // Run.
        token.increaseStressCount();

        // Verify.
        assertThat(token.getStressCount(), is(1));
    }

    /**
     * Test the <code>getHullValue()</code> method.
     */
    @Test
    public void testCombatActionGunner()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = new SSAdjudicator();
        final SSAgent rebelAgent = environment.getRebelAgent();
        final SSToken attacker = new SSToken(Pilot.HAN_SOLO, rebelAgent, UpgradeCard.GUNNER);
        environment.placeToken(new SSPosition(557, 81, 0), attacker);
        environment.setActiveToken(attacker);
        final SSToken defender = environment.getTokensForTeam(SSTeam.IMPERIAL).get(0);
        attacker.activateUpgrade(UpgradeCard.GUNNER);
        final Weapon weapon = attacker.getPrimaryWeapon();
        attacker.setWeapon(weapon);
        final CombatAction combatAction = new CombatAction(environment, adjudicator, attacker, weapon, defender);
        final int beforeDamage = defender.getDamageCount() + defender.getCriticalDamageCount();
        // System.out.println("beforeDamage = " + beforeDamage);

        // Run.
        combatAction.doIt();
        final int afterDamage = defender.getDamageCount() + defender.getCriticalDamageCount();
        // System.out.println("afterDamage = " + afterDamage);

        // Verify.
        assertFalse(attacker.isUpgradeActive(UpgradeCard.GUNNER));
        assertTrue(afterDamage >= beforeDamage);
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgs()
    {
        // Setup.
        final Pilot pilot = Pilot.ROOKIE_PILOT;
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgradeCardList = new UpgradeCardList();
        upgradeCardList.add(UpgradeCard.R2_ASTROMECH);
        upgradeCardList.add(SecondaryWeaponUpgradeCard.PROTON_TORPEDOES);

        // Run.
        final SSToken result = new SSToken(pilot, agent, upgradeCardList);

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName().endsWith(" Rookie Pilot (X-Wing)"));
        assertThat(result.getDescription(), is("An X-Wing pilot."));
        assertThat(result.getTeam(), is(SSTeam.REBEL));
        assertThat(result.getPilot(), is(pilot));
        assertNotNull(result.getAgent());
        assertTrue(result.isUpgradedWith(UpgradeCard.R2_ASTROMECH));
        assertTrue(result.isUpgradedWith(SecondaryWeaponUpgradeCard.PROTON_TORPEDOES));
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgsModification()
    {
        // Setup.
        final Pilot pilot = Pilot.ROOKIE_PILOT;
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgradeCardList = new UpgradeCardList();
        upgradeCardList.add(UpgradeCard.HULL_UPGRADE);
        upgradeCardList.add(SecondaryWeaponUpgradeCard.PROTON_TORPEDOES);

        // Run.
        final SSToken result = new SSToken(pilot, agent, upgradeCardList);

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName().endsWith(" Rookie Pilot (X-Wing)"));
        assertThat(result.getDescription(), is("An X-Wing pilot."));
        assertThat(result.getTeam(), is(SSTeam.REBEL));
        assertThat(result.getPilot(), is(pilot));
        assertNotNull(result.getAgent());
        assertTrue(result.isUpgradedWith(UpgradeCard.HULL_UPGRADE));
        assertTrue(result.isUpgradedWith(SecondaryWeaponUpgradeCard.PROTON_TORPEDOES));
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgsMultipleModifications()
    {
        // Setup.
        final Pilot pilot = Pilot.HAN_SOLO;
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgradeCardList = new UpgradeCardList();
        upgradeCardList.add(UpgradeCard.STEALTH_DEVICE);
        upgradeCardList.add(UpgradeCard.SHIELD_UPGRADE);

        try
        {
            // Run.
            new SSToken(pilot, agent, upgradeCardList);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Multiple modifications are not allowed."));
        }
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgsMultipleTitles()
    {
        // Setup.
        final Pilot pilot = Pilot.HAN_SOLO;
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgradeCardList = new UpgradeCardList();
        upgradeCardList.add(UpgradeCard.MILLENNIUM_FALCON);
        upgradeCardList.add(UpgradeCard.MOLDY_CROW);

        try
        {
            // Run.
            new SSToken(pilot, agent, upgradeCardList);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Multiple titles are not allowed."));
        }
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgsNull()
    {
        // Setup.
        final Pilot pilot = Pilot.ROOKIE_PILOT;
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgradeCardList = new UpgradeCardList();

        // Run.
        try
        {
            new SSToken(null, agent, upgradeCardList);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("pilot is null."));
        }

        try
        {
            new SSToken(pilot, null, upgradeCardList);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("agent is null."));
        }

        try
        {
            new SSToken(pilot, agent, (UpgradeCardList)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("upgrades is null."));
        }
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgsR2D6ContainsElite()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.R2_D6);

        try
        {
            new SSToken(Pilot.LUKE_SKYWALKER, agent, upgrades);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Upgrade bar already contains Elite: R2-D6"));
        }
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgsR2D6LowSkill()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.R2_D6);

        try
        {
            new SSToken(Pilot.ROOKIE_PILOT, agent, upgrades);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Pilot skill value is 2 or lower: R2-D6"));
        }
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgsRestrictedUpgrade()
    {
        // Setup.
        final Pilot pilot = Pilot.HAN_SOLO;
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgradeCardList = new UpgradeCardList();
        upgradeCardList.add(UpgradeCard.REBEL_CAPTIVE);

        try
        {
            // Run.
            new SSToken(pilot, agent, upgradeCardList);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Restricted upgrade: Rebel Captive"));
        }
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgsTitle()
    {
        // Setup.
        final Pilot pilot = Pilot.HAN_SOLO;
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgradeCardList = new UpgradeCardList();
        upgradeCardList.add(UpgradeCard.MILLENNIUM_FALCON);

        // Run.
        final SSToken result = new SSToken(pilot, agent, upgradeCardList);

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName(), result.getName().endsWith("Han Solo (YT-1300)"));
        assertThat(result.getDescription(), is("A YT-1300 pilot."));
        assertThat(result.getTeam(), is(SSTeam.REBEL));
        assertThat(result.getPilot(), is(pilot));
        assertNotNull(result.getAgent());
        assertTrue(result.isUpgradedWith(UpgradeCard.MILLENNIUM_FALCON));
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorThreeArgsUnsupportedUpgradeType()
    {
        // Setup.
        final Pilot pilot = Pilot.ROOKIE_PILOT;
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgradeCardList = new UpgradeCardList();
        upgradeCardList.add(UpgradeCard.DETERMINATION);

        try
        {
            // Run.
            new SSToken(pilot, agent, upgradeCardList);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Unsupported upgrade type: ELITE"));
        }
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorTwoArgs()
    {
        // Setup.
        final Pilot pilot = Pilot.ACADEMY_PILOT;
        final SSAgent agent = testData.createImperialAgent();

        // Run.
        final SSToken result = new SSToken(pilot, agent);

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName().endsWith(" Academy Pilot (TIE Fighter)"));
        assertThat(result.getDescription(), is("A TIE Fighter pilot."));
        assertThat(result.getTeam(), is(SSTeam.IMPERIAL));
        assertThat(result.getPilot(), is(pilot));
        assertNotNull(result.getAgent());
    }

    /**
     * Test the <code>SSToken()</code> method.
     */
    @Test
    public void testConstructorTwoArgsNull()
    {
        // Setup.
        final Pilot pilot = Pilot.ACADEMY_PILOT;
        final SSAgent agent = testData.createImperialAgent();

        // Run.
        try
        {
            new SSToken(null, agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("pilot is null."));
        }

        try
        {
            new SSToken(pilot, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("agent is null."));
        }
    }
}
