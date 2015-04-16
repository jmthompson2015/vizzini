/*
 * Provides an injector for Reversi.
 */
function Injector()
{
    var adjudicator;
    var boardUtils;
    var formatter;
    var geometry;

    this.injectAdjudicator = function()
    {
        if (!adjudicator)
        {
            adjudicator = new Adjudicator(this.injectGeometry(), this
                    .injectFormatter(), this.injectBoardUtilities());
        }

        return adjudicator;
    }

    this.injectBoardUtilities = function()
    {
        if (!boardUtils)
        {
            boardUtils = new BoardUtilities(this.injectGeometry(), this
                    .injectFormatter());
        }

        return boardUtils;
    }

    this.injectFormatter = function()
    {
        if (!formatter)
        {
            formatter = new BoardFormat(this.injectGeometry());
        }

        return formatter;
    }

    this.injectGeometry = function()
    {
        if (!geometry)
        {
            geometry = new BoardGeometry(8, 8, 1);
        }

        return geometry;
    }

    this.injectMemoryIO = function()
    {
        return new MemoryIO("reversiMemory");
    }
}
