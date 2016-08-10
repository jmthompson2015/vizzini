define([ "process/Observer" ], function(Observer)
{
    function PowerObserver(store)
    {
        this.onChange = function(isPowered)
        {
            (isPowered ? this.playPowerAudio() : this.pausePowerAudio());
        };

        this.pausePowerAudio = function()
        {
            powerAudio().pause();
            dematerialiseAudio().pause();
            materialiseAudio().pause();
            scannerAudio().pause();
        };

        this.playPowerAudio = function()
        {
            powerAudio().play();
        };

        this.select = function(state)
        {
            return state.isPowered;
        };

        function dematerialiseAudio()
        {
            return document.getElementById("dematerialiseAudio");
        }

        function materialiseAudio()
        {
            return document.getElementById("materialiseAudio");
        }

        function powerAudio()
        {
            return document.getElementById("powerAudio");
        }

        function scannerAudio()
        {
            return document.getElementById("scannerAudio");
        }

        var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this));
    }

    if (Object.freeze)
    {
        Object.freeze(PowerObserver);
    }

    return PowerObserver;
});
