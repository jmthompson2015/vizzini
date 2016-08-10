define([ "process/Observer" ], function(Observer)
{
    function ScannerObserver(store)
    {
        this.onChange = function(isScanning)
        {
            if (isScanning === true)
            {
                this.scannerOpen();
            }
            else if (isScanning === false)
            {
                this.scannerClose();
            }
        };

        this.scannerClose = function()
        {
            HtmlUtilities.removeClass(document.getElementById("scanner-cover-top"), "scanner-cover-top-open");
            HtmlUtilities.removeClass(document.getElementById("scanner-cover-bottom"), "scanner-cover-bottom-open");
            scannerAudio().pause();

            HtmlUtilities.addClass(document.getElementById("scanner-cover-top"), "scanner-cover-top-close");
            HtmlUtilities.addClass(document.getElementById("scanner-cover-bottom"), "scanner-cover-bottom-close");
            scannerAudio().play();
        };

        this.scannerOpen = function()
        {
            HtmlUtilities.removeClass(document.getElementById("scanner-cover-top"), "scanner-cover-top-close");
            HtmlUtilities.removeClass(document.getElementById("scanner-cover-bottom"), "scanner-cover-bottom-close");
            scannerAudio().pause();

            HtmlUtilities.addClass(document.getElementById("scanner-cover-top"), "scanner-cover-top-open");
            HtmlUtilities.addClass(document.getElementById("scanner-cover-bottom"), "scanner-cover-bottom-open");
            scannerAudio().play();
        };

        this.select = function(state)
        {
            return state.isScanning;
        };

        function scannerAudio()
        {
            return document.getElementById("scannerAudio");
        }

        var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this), false);
    }

    if (Object.freeze)
    {
        Object.freeze(ScannerObserver);
    }

    return ScannerObserver;
});
