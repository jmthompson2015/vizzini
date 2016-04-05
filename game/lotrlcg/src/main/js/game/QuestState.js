define([ "game/Count" ], function(Count)
{
    "use strict";
    function QuestState()
    {
        var that = this;
        var count = new Count();

        count.bind(Count.EVENT, function()
        {
            that.trigger(QuestState.EVENT);
        });

        this.progress = function()
        {
            return count;
        };
    }

    QuestState.EVENT = "quest";

    MicroEvent.mixin(QuestState);

    return QuestState;
});
