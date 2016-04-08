define(function()
{
    "use strict";
    function AttachState()
    {
        var attachments = [];

        this.add = function(element)
        {
            attachments.push(element);
            this.trigger(AttachState.EVENT, this);
        };

        this.attachments = function()
        {
            return attachments.slice();
        };

        this.clear = function()
        {
            attachments = [];
            this.trigger(AttachState.EVENT, this);
        }

        this.remove = function(element)
        {
            attachments.vizziniRemove(element);
            this.trigger(AttachState.EVENT, this);
        };
    }

    AttachState.EVENT = "attach";

    MicroEvent.mixin(AttachState);

    return AttachState;
});
