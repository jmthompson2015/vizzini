define([ "Body", "Constants", "JPLHorizons", "Quaternion", "State", "Vector" ], function(Body, Constants, JPLHorizons,
        Quaternion, State, Vector)
{
    "use strict";
    function ReferenceFactory(bodyKeys, callback)
    {
        InputValidator.validateNotEmpty("bodyKeys", bodyKeys);
        InputValidator.validateNotEmpty("callback", callback);

        var DATE = moment("2016-Jan-22 00:00:00.0000", "YYYY-MMM-DD HH:mm:ss.SSS");

        this.createStates = function()
        {
            var answer = {};

            answer[Body.SOL] = createSolState();
            answer[Body.MERCURY] = createMercuryState();
            answer[Body.VENUS] = createVenusState();
            answer[Body.EARTH] = createEarthState();
            answer[Body.LUNA] = createLunaState();
            answer[Body.MARS] = createMarsState();
            answer[Body.PHOBOS] = createPhobosState();
            answer[Body.DEIMOS] = createDeimosState();
            answer[Body.CERES] = createCeresState();
            answer[Body.JUPITER] = createJupiterState();
            answer[Body.IO] = createIoState();
            answer[Body.EUROPA] = createEuropaState();
            answer[Body.GANYMEDE] = createGanymedeState();
            answer[Body.CALLISTO] = createCallistoState();
            answer[Body.SATURN] = createSaturnState();
            answer[Body.MIMAS] = createMimasState();
            answer[Body.ENCELADUS] = createEnceladusState();
            answer[Body.TETHYS] = createTethysState();
            answer[Body.DIONE] = createDioneState();
            answer[Body.RHEA] = createRheaState();
            answer[Body.TITAN] = createTitanState();
            answer[Body.IAPETUS] = createIapetusState();
            answer[Body.URANUS] = createUranusState();
            answer[Body.MIRANDA] = createMirandaState();
            answer[Body.ARIEL] = createArielState();
            answer[Body.UMBRIEL] = createUmbrielState();
            answer[Body.TITANIA] = createTitaniaState();
            answer[Body.OBERON] = createOberonState();
            answer[Body.NEPTUNE] = createNeptuneState();
            answer[Body.TRITON] = createTritonState();
            answer[Body.PLUTO] = createPlutoState();
            answer[Body.CHARON] = createCharonState();
            answer[Body.HAUMEA] = createHaumeaState();
            answer[Body.MAKEMAKE] = createMakemakeState();
            answer[Body.ERIS] = createErisState();

            this.trigger("dataLoaded", Object.getOwnPropertyNames(answer).length);
            callback(answer);
            return answer;
        }

        function createArielState()
        {
            var body = Body.properties[Body.ARIEL];
            var position = new Vector(2.819194484674286E+09, 9.916633948179582E+08, -3.271087771774310E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.205016392375063E+00, 4.777438900596774E+00, -3.981073432256014E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createCallistoState()
        {
            var body = Body.properties[Body.CALLISTO];
            var position = new Vector(-7.820937503326939E+08, 2.151879625930370E+08, 1.650013550381620E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.866166856427782E+00, -1.798937152675281E+01, 1.380205322338579E-02); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createCeresState()
        {
            var body = Body.properties[Body.CERES];
            var position = new Vector(3.999343837926300E+08, -1.803792825699942E+08, -7.931951687023476E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(6.646171370777949E+00, 1.520052409886607E+01, -7.474507264528834E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createCharonState()
        {
            var body = Body.properties[Body.CHARON];
            var position = new Vector(1.286556295944259E+09, -4.768194341470391E+09, 1.380785049826846E+08); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(5.348893201406136E+00, 3.948465947370057E-01, -1.408850950467001E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createDeimosState()
        {
            var body = Body.properties[Body.DEIMOS];
            var position = new Vector(-2.453419673607886E+08, -1.446017078752224E+07, 5.701610972238690E+06); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.194122461504781E+00, -2.172198484009983E+01, 6.291012176784427E-02); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createDioneState()
        {
            var body = Body.properties[Body.DIONE];
            var position = new Vector(-5.400612970002130E+08, -1.396340935402747E+09, 4.587985739501238E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.412829055664225E+01, -1.106284075818941E+01, 3.133323963943480E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createEarthState()
        {
            var body = Body.properties[Body.EARTH];
            var position = new Vector(-7.561357919474147E+07, 1.262069098272267E+08, -2.799566829568148E+04); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-2.596245358914444E+01, -1.551250076715294E+01, 4.301894898413039E-04); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createEnceladusState()
        {
            var body = Body.properties[Body.ENCELADUS];
            var position = new Vector(-5.396180886973892E+08, -1.396344430658762E+09, 4.583899929053229E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.886384214236661E+01, 2.308426991803946E+00, -4.332002832764626E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createErisState()
        {
            var body = Body.properties[Body.ERIS];
            var position = new Vector(1.297525331953531E+10, 5.424227790340644E+09, -3.121060706646293E+09); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-6.342899994091096E-01, 1.564963693029050E+00, 1.582458658824998E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createEuropaState()
        {
            var body = Body.properties[Body.EUROPA];
            var position = new Vector(-7.800183323944567E+08, 2.165206482789710E+08, 1.657266098092231E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-4.832828809811526E+00, 1.592536382978167E+00, 7.112233733367845E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createGanymedeState()
        {
            var body = Body.properties[Body.GANYMEDE];
            var position = new Vector(-7.810201844602801E+08, 2.174791859668944E+08, 1.659362473474739E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-1.398875642089171E+01, -1.527674892083302E+01, -1.291837436964505E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createHaumeaState()
        {
            var body = Body.properties[Body.HAUMEA];
            var position = new Vector(-6.203986405415936E+09, -2.530510595239978E+09, 3.541373437433648E+09); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.827512845121738E+00, -3.332841999954446E+00, 1.141198506451382E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createIapetusState()
        {
            var body = Body.properties[Body.IAPETUS];
            var position = new Vector(-5.432726910485907E+08, -1.396714872417203E+09, 4.659479878731298E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(9.097739387418036E+00, -6.569610256595313E+00, 3.075766469252801E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createIoState()
        {
            var body = Body.properties[Body.IO];
            var position = new Vector(-7.802996402910351E+08, 2.163071800772197E+08, 1.655983276992474E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(2.580477571789114E+00, 4.241009036666952E+00, 7.978367852589356E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createJupiterState()
        {
            var body = Body.properties[Body.JUPITER];
            var position = new Vector(-7.806918810584401E+08, 2.164591897759456E+08, 1.655940332772167E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-3.643003676886735E+00, -1.197544163731336E+01, 1.312630691799290E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createLunaState()
        {
            var body = Body.properties[Body.LUNA];
            var position = new Vector(-7.565136822630262E+07, 1.265841740842660E+08, -6.103129894522578E+04); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-2.699663514092948E+01, -1.557892634656363E+01, 1.780050153023804E-02); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createMakemakeState()
        {
            var body = Body.properties[Body.MAKEMAKE];
            var position = new Vector(-6.893149582817187E+09, -1.784674742039695E+08, 3.738431092046375E+09); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-2.535359653718248E-01, -3.773084327398640E+00, -2.450773505550299E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createMarsState()
        {
            var body = Body.properties[Body.MARS];
            var position = new Vector(-2.453488126809445E+08, -1.448257689212526E+07, 5.702725398832533E+06); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(2.351151896390406E+00, -2.210471406998296E+01, -5.211780858316031E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createMercuryState()
        {
            var body = Body.properties[Body.MERCURY];
            var position = new Vector(-4.655269736772238E+07, 2.340402089738802E+07, 6.191685566492947E+06); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-3.151563668985122E+01, -4.164038960478674E+01, -5.119994272692079E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createMimasState()
        {
            var body = Body.properties[Body.MIMAS];
            var position = new Vector(-5.399377709816940E+08, -1.396181551889287E+09, 4.578319006125307E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.049899706952103E+01, -1.573626500903401E+01, 6.356340956262312E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createMirandaState()
        {
            var body = Body.properties[Body.MIRANDA];
            var position = new Vector(2.818955398895836E+09, 9.916848420951180E+08, -3.292353698682529E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-6.587200208719543E+00, 7.213326540610735E+00, 5.059004142935319E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createNeptuneState()
        {
            var body = Body.properties[Body.NEPTUNE];
            var position = new Vector(4.185418054676996E+09, -1.602805727653323E+09, -6.345050017997658E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.907442620119111E+00, 5.107370101220092E+00, -1.496869677359534E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createOberonState()
        {
            var body = Body.properties[Body.OBERON];
            var position = new Vector(2.819577096915115E+09, 9.915329062568698E+08, -3.304818261420089E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-3.514212254726945E+00, 5.954315942810359E+00, -2.861984436721071E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createPhobosState()
        {
            var body = Body.properties[Body.PHOBOS];
            var position = new Vector(-2.453417846199759E+08, -1.448771410074829E+07, 5.698994128798394E+06); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(3.390151660992808E+00, -2.031619475579002E+01, -9.672556353593000E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createPlutoState()
        {
            var body = Body.properties[Body.PLUTO];
            var position = new Vector(1.286570671885723E+09, -4.768182431348478E+09, 1.380725358681972E+08); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(5.359268577933973E+00, 2.851079648272089E-01, -1.602805052138219E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createRheaState()
        {
            var body = Body.properties[Body.RHEA];
            var position = new Vector(-5.399726390486953E+08, -1.396579786600772E+09, 4.599300193916732E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.615500669425126E+01, -6.970336080369134E+00, 8.029163083308466E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createSaturnState()
        {
            var body = Body.properties[Body.SATURN];
            var position = new Vector(-5.397514454873841E+08, -1.396163588880514E+09, 4.575713043283588E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(8.481881462622873E+00, -3.512804966966994E+00, -2.762823482498971E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createSolState()
        {
            var body = Body.properties[Body.SOL];
            var position = new Vector(5.615246656543500E+05, 2.315536610010385E+05, -2.420308582415251E+04); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(1.087228969233570E-03, 1.203657799485593E-02, -3.669325133155450E-05); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createTethysState()
        {
            var body = Body.properties[Body.TETHYS];
            var position = new Vector(-5.400019021965684E+08, -1.396018113012671E+09, 4.570318916979325E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(2.557696121909180E+00, -1.194746588075607E+01, 4.483913860958237E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createTitanState()
        {
            var body = Body.properties[Body.TITAN];
            var position = new Vector(-5.392243778366202E+08, -1.395212203579206E+09, 4.521445495943147E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(3.528643985180384E+00, -1.020276420468635E+00, -1.070395192800617E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createTitaniaState()
        {
            var body = Body.properties[Body.TITANIA];
            var position = new Vector(2.819395992666658E+09, 9.916389536473927E+08, -3.257047279925245E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-1.954456579059287E-01, 5.245553907418606E+00, -2.783075119487653E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createTritonState()
        {
            var body = Body.properties[Body.TRITON];
            var position = new Vector(4.185118124357553E+09, -1.602863598314968E+09, -6.327009543629968E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(2.771820544935911E+00, 8.575066648097195E+00, 2.399703661665448E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createUmbrielState()
        {
            var body = Body.properties[Body.UMBRIEL];
            var position = new Vector(2.818964473929857E+09, 9.916613991577127E+08, -3.308884354711443E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-6.588835522359806E+00, 7.243998449138942E+00, 1.520583396930457E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createUranusState()
        {
            var body = Body.properties[Body.URANUS];
            var position = new Vector(2.819053187742383E+09, 9.916766731526206E+08, -3.283839780774784E+07); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(-2.309639763842593E+00, 6.106707998087125E+00, 5.285445549107637E-02); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }

        function createVenusState()
        {
            var body = Body.properties[Body.VENUS];
            var position = new Vector(-8.403620927028121E+07, -6.704756289839806E+07, 3.935176501556642E+06); // km
            var orientation = Quaternion.newInstanceVector(body.northPole);
            var velocity = new Vector(2.155331421046835E+01, -2.756300898657247E+01, -1.621810352088923E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(DATE, position, orientation, velocity, angularVelocity);
        }
    };

    MicroEvent.mixin(ReferenceFactory);

    /*
     * Reference state factory instance for convenience.
     */
    var Reference = new ReferenceFactory(Body.values(), function(bodyToState)
    {
    // Nothing to do.
    });

    function Horizons(bodyKeys, callback)
    {
        InputValidator.validateNotEmpty("bodyKeys", bodyKeys);
        InputValidator.validateNotEmpty("callback", callback);

        var that = this;
        var index = -1;
        var bodyToState = {};
        var startTime = moment().format("'YYYY-MM-DD HH:mm'");
        var stopTime = moment().add(1, "days").format("'YYYY-MM-DD HH:mm'");
        var start, end;
        var totalTime = 0;

        this.createStates = function()
        {
            setState();
        };

        function setState(state)
        {
            var bodyKey;

            if (state)
            {
                bodyKey = bodyKeys[index];
                bodyToState[bodyKey] = state;
                end = moment();
                totalTime += end.valueOf() - start.valueOf();
                // LOGGER.time(index + " Received JPL Horizons data for " + Body.properties[bodyKey].name,
                // start.valueOf(), end.valueOf());
            }

            start = moment();
            index++;
            that.trigger("dataLoaded", index);

            if (index < bodyKeys.length)
            {
                bodyKey = bodyKeys[index];
                LOGGER.debug(index + " bodyKey = " + bodyKey);
                var body = Body.properties[bodyKey];
                var horizons = new JPLHorizons(body, startTime, stopTime, setState);
                horizons.fetchData();
            }
            else
            {
                LOGGER.time("JPL Horizons total", 0, totalTime);
                callback(bodyToState);
            }
        }
    }

    MicroEvent.mixin(Horizons);

    Reference.createCircularOrbit = function(solState, parentKey, parentState, distance)
    {
        InputValidator.validateNotEmpty("solState", solState);
        InputValidator.validateNotEmpty("parentKey", parentKey);
        InputValidator.validateNotEmpty("parentState", parentState);
        InputValidator.validateNotEmpty("distance", distance);

        var body = Body.properties[parentKey];
        var position0 = parentState.position();
        var velocity0 = parentState.velocity();
        LOGGER.debug(parentKey + " velocity0 = " + velocity0);
        var orientation;
        var direction, angle, vector;

        if (parentKey === Body.SOL)
        {
            direction = Vector.X_AXIS.multiply(-1.0).unit();
            orientation = Quaternion.newInstance(180.0, Vector.Z_AXIS);
        }
        else
        {
            direction = position0.subtract(solState.position()).unit();
            angle = Vector.X_AXIS.angle(direction);
            vector = Vector.X_AXIS.cross(direction).unit();
            LOGGER.debug(parentKey + " angle = " + angle + " vector = " + vector);
            orientation = Quaternion.newInstance(angle, vector);
        }

        var date = parentState.date();
        var position = position0.subtract(direction.multiply(distance));
        var mu = Constants.G * body.mass;
        var speed = Math.sqrt(mu / distance);
        var vector2 = direction.cross(Vector.Z_AXIS).unit();
        LOGGER.debug(parentKey + " speed = " + speed + " vector2 = " + vector2);
        var velocity = velocity0.add(vector2.multiply(speed));
        var period = 2.0 * Math.PI * Math.sqrt(distance * distance * distance / mu);
        var vector3 = Vector.Y_AXIS.cross(direction).unit();
        LOGGER.debug(parentKey + " period = " + period + " vector3 = " + vector3);
        var angularVelocity = Quaternion.newInstance(360.0 / period, vector3);

        return new State.State(date, position, orientation, velocity, angularVelocity);
    };

    Reference.createRelativeState = function(parentState, distance, speed)
    {
        InputValidator.validateNotEmpty("parentState", parentState);
        InputValidator.validateNotEmpty("distance", distance);
        InputValidator.validateNotEmpty("speed", speed);

        var date = parentState.date();
        var position0 = parentState.position();
        var position = new Vector(position0.x() + distance, position0.y(), position0.z());
        var orientation = Quaternion.ZERO;
        var velocity0 = parentState.velocity();
        var velocity = new Vector(velocity0.x(), velocity0.y() + speed, velocity0.z());
        var angularVelocity = Quaternion.ZERO;

        return new State.State(date, position, orientation, velocity, angularVelocity);
    };

    return (
    {
        createCircularOrbit: Reference.createCircularOrbit,
        createRelativeState: Reference.createRelativeState,
        Reference: Reference,
        ReferenceFactory: ReferenceFactory,
        Horizons: Horizons,
    });
});
