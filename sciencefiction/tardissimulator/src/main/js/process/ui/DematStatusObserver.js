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
            dematerialiseAudio().addEventListener("ended", this.dematerialisationEnded.bind(this));
            dematerialiseAudio().play();
        };

        this.playMaterialiseAudio = function()
        {
            dematerialiseAudio().pause();
            materialiseAudio().addEventListener("ended", this.materialisationEnded.bind(this));
            materialiseAudio().play();

            var sceneKey = Scene.values().vizziniRandomElement();
            store.dispatch(Action.setScene(sceneKey));
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

        function timeRotor()
        {
            return document.getElementById("time-rotor");
        }

        var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this), false);
    }

    if (Object.freeze)
    {
        Object.freeze(DematStatusObserver);
    }

    return DematStatusObserver;
});
