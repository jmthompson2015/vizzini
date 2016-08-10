define([ "process/Observer" ], function(Observer)
{
    function DematerialisationObserver(store)
    {
        InputValidator.validateNotNull("store", store);

        this.materialisationEnded = function(event)
        {
            timeRotor().removeEventListener("transitionend", this.reverseDirection, false);
            HtmlUtilities.removeClass(timeRotor(), "time-rotor-state1");
            HtmlUtilities.removeClass(timeRotor(), "time-rotor-state2");
        };

        this.onChange = function(isDematerialised)
        {
            if (isDematerialised)
            {
                this.playDematerialiseAudio();
            }
            else if (!isDematerialised)
            {
                this.playMaterialiseAudio();
            }
        };

        this.playDematerialiseAudio = function()
        {
            HtmlUtilities.removeClass(document.getElementById("time-rotor"), "time-rotor-state1");
            materialiseAudio().pause();

            timeRotor().addEventListener("transitionend", this.reverseDirection, false);
            HtmlUtilities.addClass(timeRotor(), "time-rotor-state2");
            dematerialiseAudio().play();
        };

        this.playMaterialiseAudio = function()
        {
            dematerialiseAudio().pause();
            materialiseAudio().addEventListener("ended", this.materialisationEnded.bind(this), false);
            materialiseAudio().play();
        };

        this.reverseDirection = function(event)
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

        this.select = function(state)
        {
            return state.isDematerialised;
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
        Object.freeze(DematerialisationObserver);
    }

    return DematerialisationObserver;
});
