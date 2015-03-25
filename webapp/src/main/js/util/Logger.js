/*
 * Provides a simple logger.
 */
function Logger()
{
    this.OFF = false;
    this.FATAL = true;
    this.ERROR = true;
    this.WARN = true;
    this.INFO = true;
    this.DEBUG = true;
    this.TRACE = true;

    this.isOffEnabled = function()
    {
        return this.OFF;
    }

    this.isFatalEnabled = function()
    {
        return this.FATAL;
    }

    this.isErrorEnabled = function()
    {
        return this.ERROR;
    }

    this.isWarnEnabled = function()
    {
        return this.WARN;
    }

    this.isInfoEnabled = function()
    {
        return this.INFO;
    }

    this.isDebugEnabled = function()
    {
        return this.DEBUG;
    }

    this.isTraceEnabled = function()
    {
        return this.TRACE;
    }

    this.setOffEnabled = function(isEnabled)
    {
        this.OFF = isEnabled;
    }

    this.setFatalEnabled = function(isEnabled)
    {
        this.FATAL = isEnabled;
    }

    this.setErrorEnabled = function(isEnabled)
    {
        this.ERROR = isEnabled;
    }

    this.setWarnEnabled = function(isEnabled)
    {
        this.WARN = isEnabled;
    }

    this.setInfoEnabled = function(isEnabled)
    {
        this.INFO = isEnabled;
    }

    this.setDebugEnabled = function(isEnabled)
    {
        this.DEBUG = isEnabled;
    }

    this.setTraceEnabled = function(isEnabled)
    {
        this.TRACE = isEnabled;
    }

    this.fatal = function(message)
    {
        if (!this.OFF && this.FATAL)
        {
            console.log(getDateString() + " FATAL " + message);
        }
    }

    this.error = function(message)
    {
        if (!this.OFF && this.ERROR)
        {
            console.log(getDateString() + " ERROR " + message);
        }
    }

    this.warn = function(message)
    {
        if (!this.OFF && this.WARN)
        {
            console.log(getDateString() + " WARN  " + message);
        }
    }

    this.info = function(message)
    {
        if (!this.OFF && this.INFO)
        {
            console.log(getDateString() + " INFO  " + message);
        }
    }

    this.debug = function(message)
    {
        if (!this.OFF && this.DEBUG)
        {
            console.log(getDateString() + " DEBUG " + message);
        }
    }

    this.trace = function(message)
    {
        if (!this.OFF && this.TRACE)
        {
            console.log(getDateString() + " TRACE " + message);
        }
    }

    function getDateString()
    {
        var date = new Date();
        var hours = date.getHours();
        if (hours < 10)
        {
            hours = "0" + hours;
        }

        var minutes = date.getMinutes();
        if (minutes < 10)
        {
            minutes = "0" + minutes;
        }

        var seconds = date.getSeconds();
        if (seconds < 10)
        {
            seconds = "0" + seconds;
        }

        var millis = date.getMilliseconds();
        if (millis < 10)
        {
            millis = "00" + millis;
        }
        else if (millis < 100)
        {
            millis = "0" + millis;
        }

        return hours + ":" + minutes + ":" + seconds + ":" + millis;
    }
}
