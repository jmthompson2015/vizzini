define([ "DematStatus", "Scene", "process/Action", "process/Observer" ], function(DematStatus, Scene, Action, Observer)
{
    "use strict";
    function DematStatusObserver(store)
    {
        InputValidator.validateNotNull("store", store);

        this.dematerialisationEnded = function(event)
        {
            LOGGER.info("dematerialisationEnded()");
            store.dispatch(Action.setDematStatus(DematStatus.DEMATERIALISED));
        };

        this.materialisationEnded = function(event)
        {
            LOGGER.info("materialisationEnded()");

            timeRotor().removeEventListener("transitionend", this.reverseDirection);
            HtmlUtilities.removeClass(timeRotor(), "time-rotor-state1");
            HtmlUtilities.removeClass(timeRotor(), "time-rotor-state2");
            store.dispatch(Action.setTimeRotorDZ(0));

            store.dispatch(Action.setDematStatus(DematStatus.MATERIALISED));
        };

        this.onChange = function(dematStatusKey)
        {
            if (DematStatus.DEMATERIALISING === dematStatusKey)
            {
                this.playDematerialiseAudio();
            }
            else if (DematStatus.MATERIALISING === dematStatusKey)
            {
                this.playMaterialiseAudio();
            }
        };

        this.playDematerialiseAudio = function()
        {
            HtmlUtilities.removeClass(timeRotor(), "time-rotor-state1");
            materialiseAudio().pause();

            timeRotor().addEventListener("transitionend", this.reverseDirection);
            HtmlUtilities.addClass(timeRotor(), "time-rotor-state2");
            store.dispatch(Action.setTimeRotorDZ(0.12));
            dematerialiseAudio().play();
            scannerImage().style.opacity = 0;
        };

        this.playMaterialiseAudio = function()
        {
            dematerialiseAudio().pause();
            materialiseAudio().play();

            var sceneKey = Scene.values().vizziniRandomElement();
            store.dispatch(Action.setScene(sceneKey));
            scannerImage().style.opacity = 1;
        };

        this.reverseDirection = function(event)
        {
            if (event.propertyName == "transform")
            {
                if (HtmlUtilities.hasClass(timeRotor(), "time-rotor-state2"))
                {
                    HtmlUtilities.removeClass(timeRotor(), "time-rotor-state2");
                    HtmlUtilities.addClass(timeRotor(), "time-rotor-state1");
                }
                else
                {
                    HtmlUtilities.removeClass(timeRotor(), "time-rotor-state1");
                    HtmlUtilities.addClass(timeRotor(), "time-rotor-state2");
                }
            }
        };

        this.select = function(state)
        {
            return state.dematStatusKey;
        };

        function dematerialiseAudio()
        {
            return document.getElementById("dematerialiseAudio");
        }

        function materialiseAudio()
        {
            return document.getElementById("materialiseAudio");
        }

        function scannerImage()
        {
            return document.getElementById("scanner-image");
        }

        function timeRotor()
        {
            return document.getElementById("time-rotor");
        }

        dematerialiseAudio().addEventListener("ended", this.dematerialisationEnded.bind(this));
        materialiseAudio().addEventListener("ended", this.materialisationEnded.bind(this));
        var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this), false);
    }

    if (Object.freeze)
    {
        Object.freeze(DematStatusObserver);
    }

    return DematStatusObserver;
});
