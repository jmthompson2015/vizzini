define([ "InitialState", "Scene", "process/Action" ], function(InitialState, Scene, Action)
{
    "use strict";
    var Reducer = {};

    Reducer._dematerialiseAudio = new Audio("../resources/audio/dematerialise.wav");
    Reducer._dematerialiseAudio.volume -= 0.1;
    Reducer._materialiseAudio = new Audio("../resources/audio/materialise.wav");
    Reducer._materialiseAudio.volume -= 0.1;
    Reducer._powerAudio = new Audio("../resources/audio/power.wav");
    Reducer._powerAudio.loop = true;
    Reducer._powerAudio.volume -= 0.3;
    Reducer._scannerAudio = new Audio("../resources/audio/scanner.wav");

    Reducer.root = function(state, action)
    {
        LOGGER.debug("root() type = " + action.type);

        if (typeof state === 'undefined') { return new InitialState(); }

        switch (action.type)
        {
        case Action.SET_CONSOLE_PANEL:
            return Object.assign({}, state,
            {
                consolePanelKey: action.consolePanelKey,
            });
        case Action.SET_DEMATERIALISED:
            if (!state.isDematerialised && action.isDematerialised)
            {
                Reducer._playDematerialiseAudio();
            }
            else if (state.isDematerialised && !action.isDematerialised)
            {
                Reducer._playMaterialiseAudio();
            }
            return Object.assign({}, state,
            {
                isDematerialised: action.isDematerialised,
            });
        case Action.SET_POWERED:
            (action.isPowered ? Reducer._playPowerAudio() : Reducer._pausePowerAudio());
            return Object.assign({}, state,
            {
                isPowered: action.isPowered,
            });
        case Action.SET_SCANNING:
            if (!state.isScanning && action.isScanning)
            {
                Reducer._scannerOpen();
            }
            else if (state.isScanning && !action.isScanning)
            {
                Reducer._scannerClose();
            }
            return Object.assign({}, state,
            {
                isScanning: action.isScanning,
            });
        case Action.SET_SCENE:
            Reducer._setScene(action.sceneKey);
            return Object.assign({}, state,
            {
                sceneKey: action.sceneKey,
            });
        default:
            LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer._materialisationEnded = function(event)
    {
        LOGGER.info("Reducer._materialisationEnded()");

        var timeRotor = document.getElementById("time-rotor");
        timeRotor.removeEventListener("transitionend", Reducer._reverseDirection, false);
        HtmlUtilities.removeClass(document.getElementById("time-rotor"), "time-rotor-state1");
        HtmlUtilities.removeClass(document.getElementById("time-rotor"), "time-rotor-state2");
    };

    Reducer._pausePowerAudio = function()
    {
        Reducer._powerAudio.pause();
        Reducer._dematerialiseAudio.pause();
        Reducer._materialiseAudio.pause();
        Reducer._scannerAudio.pause();
    };

    Reducer._playDematerialiseAudio = function()
    {
        HtmlUtilities.removeClass(document.getElementById("time-rotor"), "time-rotor-state1");
        Reducer._materialiseAudio.pause();

        var timeRotor = document.getElementById("time-rotor");
        timeRotor.addEventListener("transitionend", Reducer._reverseDirection, false);
        HtmlUtilities.addClass(document.getElementById("time-rotor"), "time-rotor-state2");
        Reducer._dematerialiseAudio.play();
    };

    Reducer._playMaterialiseAudio = function()
    {
        Reducer._dematerialiseAudio.pause();
        Reducer._materialiseAudio.addEventListener("ended", Reducer._materialisationEnded, false);
        Reducer._materialiseAudio.play();
    };

    Reducer._playPowerAudio = function()
    {
        Reducer._powerAudio.play();
    };

    Reducer._reverseDirection = function(event)
    {
        if (event.propertyName == "transform")
        {
            var timeRotor = document.getElementById("time-rotor");

            if (HtmlUtilities.hasClass(timeRotor, "time-rotor-state2"))
            {
                HtmlUtilities.removeClass(timeRotor, "time-rotor-state2");
                HtmlUtilities.addClass(timeRotor, "time-rotor-state1");
            }
            else
            {
                HtmlUtilities.removeClass(timeRotor, "time-rotor-state1");
                HtmlUtilities.addClass(timeRotor, "time-rotor-state2");
            }
        }
    };

    Reducer._scannerClose = function()
    {
        HtmlUtilities.removeClass(document.getElementById("scanner-cover-top"), "scanner-cover-top-open");
        HtmlUtilities.removeClass(document.getElementById("scanner-cover-bottom"), "scanner-cover-bottom-open");
        Reducer._scannerAudio.pause();

        HtmlUtilities.addClass(document.getElementById("scanner-cover-top"), "scanner-cover-top-close");
        HtmlUtilities.addClass(document.getElementById("scanner-cover-bottom"), "scanner-cover-bottom-close");
        Reducer._scannerAudio.play();
    };

    Reducer._scannerOpen = function()
    {
        HtmlUtilities.removeClass(document.getElementById("scanner-cover-top"), "scanner-cover-top-close");
        HtmlUtilities.removeClass(document.getElementById("scanner-cover-bottom"), "scanner-cover-bottom-close");
        Reducer._scannerAudio.pause();

        HtmlUtilities.addClass(document.getElementById("scanner-cover-top"), "scanner-cover-top-open");
        HtmlUtilities.addClass(document.getElementById("scanner-cover-bottom"), "scanner-cover-bottom-open");
        Reducer._scannerAudio.play();
    };

    Reducer._setScene = function(sceneKey)
    {
        var scene = Scene.properties[sceneKey];
        var scanner = document.getElementById("scanner");
        scanner.style.backgroundImage = "url(" + scene.image + ")";
        scanner.title = scene.name;
    };

    if (Object.freeze)
    {
        Object.freeze(Reducer);
    }

    return Reducer;
});
