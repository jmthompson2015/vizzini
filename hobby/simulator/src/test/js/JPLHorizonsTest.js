define([ "Body", "JPLHorizons" ], function(Body, JPLHorizons)
{
    "use strict";
    QUnit.module("JPLHorizons");

    var START_TIME = '2016-01-22';
    var STOP_TIME = '2016-01-23';

    QUnit.test("fetchData() Sol", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.SOL];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), 561524.6657, 231553.661, -24203.0858);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 0.0011, 0.012, 0.0);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000001);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Mercury", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.MERCURY];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -46552697.3677, 23404020.8974, 6191685.5665);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), -31.5156, -41.6404, -0.512);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000001);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Venus", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.VENUS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -84036209.2703, -67047562.8984, 3935176.5016);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 21.5533, -27.563, -1.6218);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.0);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Earth", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.EARTH];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -75613579.1947, 126206909.8272, -27995.6683);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), -25.9625, -15.5125, 0.0004);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000036);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Luna", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.LUNA];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -75651368.2263, 126584174.0843, -61031.2989);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), -26.9966, -15.5789, 0.0178);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000001);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Mars", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.MARS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -245348812.6809, -14482576.8921, 5702725.3988);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 2.3512, -22.1047, -0.5212);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000035);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Phobos", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.PHOBOS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -245341784.62, -14487714.1007, 5698994.1288);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 3.3902, -20.3162, -0.9673);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000114);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Deimos", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.DEIMOS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -245341967.3608, -14460170.7875, 5701610.9722);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 1.1941, -21.722, 0.0629);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000029);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Jupiter", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.JUPITER];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -7.806918810584E+08, 2.164591897759E+08, 1.65594033277E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), -3.643, -1.19754E+01, 1.313E-01);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000088);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Io", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.IO];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -7.80299640291E+08, 2.163071800772E+08, 1.65598327699E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 2.5805, 4.241, 7.978E-01);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000021);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Europa", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.EUROPA];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -7.800183323945E+08, 2.16520648279E+08, 1.65726609809E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), -4.8328, 1.5925, 7.112E-01);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.00001);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Ganymede", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.GANYMEDE];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -7.810201844603E+08, 2.174791859669E+08, 1.65936247347E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), -1.39888E+01, -1.52767E+01, -1.292E-01);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000005);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Callisto", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.CALLISTO];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -7.820937503327E+08, 2.15187962593E+08, 1.65001355038E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 1.8662, -1.79894E+01, 1.38E-02);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000002);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Saturn", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.SATURN];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), -5.397514454873841E+08, -1.396163588880514E+09,
            // 4.575713043283588E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), 8.481881462622873E+00, -3.512804966966994E+00,
            // -2.762823482498971E-01);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000082);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Mimas", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.MIMAS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), -5.399377709816940E+08, -1.396181551889287E+09,
            // 4.578319006125307E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), 1.049899706952103E+01, -1.573626500903401E+01,
            // 6.356340956262312E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000039);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Enceladus", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.ENCELADUS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), -5.396180886973892E+08, -1.396344430658762E+09,
            // 4.583899929053229E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), 1.886384214236661E+01, 2.308426991803946E+00,
            // -4.332002832764626E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000027);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Tethys", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.TETHYS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), -5.400019021965684E+08, -1.396018113012671E+09,
            // 4.570318916979325E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), 2.557696121909180E+00, -1.194746588075607E+01,
            // 4.483913860958237E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000019);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Dione", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.DIONE];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), -5.400612970002130E+08, -1.396340935402747E+09,
            // 4.587985739501238E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), 1.412829055664225E+01, -1.106284075818941E+01,
            // 3.133323963943480E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000013);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Rhea", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.RHEA];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), -5.399726390486953E+08, -1.396579786600772E+09,
            // 4.599300193916732E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), 1.615500669425126E+01, -6.970336080369134E+00,
            // 8.029163083308466E-01);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000008);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Titan", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.TITAN];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), -5.392243778366202E+08, -1.395212203579206E+09,
            // 4.521445495943147E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), 3.528643985180384E+00, -1.020276420468635E+00,
            // -1.070395192800617E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000002);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Iapetus", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.IAPETUS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), -5.432726910485907E+08, -1.396714872417203E+09,
            // 4.659479878731298E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), 9.097739387418036E+00, -6.569610256595313E+00,
            // 3.075766469252801E-01);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.0);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Uranus", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.URANUS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), 2.819053187742383E+09, 9.916766731526206E+08,
            // -3.283839780774784E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), -2.309639763842593E+00, 6.106707998087125E+00,
            // 5.285445549107637E-02);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000051);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Miranda", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.MIRANDA];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), 2.818955398895836E+09, 9.916848420951180E+08,
            // -3.292353698682529E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), -6.587200208719543E+00, 7.213326540610735E+00,
            // 5.059004142935319E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000026);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Ariel", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.ARIEL];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), 2.819194484674286E+09, 9.916633948179582E+08,
            // -3.271087771774310E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), 1.205016392375063E+00, 4.777438900596774E+00,
            // -3.981073432256014E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000014);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Umbriel", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.UMBRIEL];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), 2.818964473929857E+09, 9.916613991577127E+08,
            // -3.308884354711443E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), -6.588835522359806E+00, 7.243998449138942E+00,
            // 1.520583396930457E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000009);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Titania", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.TITANIA];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), 2.819395992666658E+09, 9.916389536473927E+08,
            // -3.257047279925245E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), -1.954456579059287E-01, 5.245553907418606E+00,
            // -2.783075119487653E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000004);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Oberon", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.OBERON];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            // verifyVector(assert, state.position(), 2.819577096915115E+09, 9.915329062568698E+08,
            // -3.304818261420089E+07);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            // verifyVector(assert, state.velocity(), -3.514212254726945E+00, 5.954315942810359E+00,
            // -2.861984436721071E+00);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000003);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });
});
