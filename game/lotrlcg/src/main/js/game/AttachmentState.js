define(function()
{
    "use strict";
    function AttachmentState()
    {
        var attachments = [];

        this.attachments = function()
        {
            return attachments;
        };
    }

    return AttachmentState;
});
