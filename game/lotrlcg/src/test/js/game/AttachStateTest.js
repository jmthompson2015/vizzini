define([ "AttachmentCard", "game/AttachmentToken", "game/AttachState" ], function(AttachmentCard, AttachmentToken,
        AttachState)
{
    "use strict";
    QUnit.module("AttachState");

    QUnit.test("add()", function(assert)
    {
        // Setup.
        var attachment = new AttachmentToken(AttachmentCard.STEWARD_OF_GONDOR);
        var state = new AttachState();

        // Run.
        state.add(attachment);

        // Verify.
        assert.equal(state.attachments().length, 1);
        assert.equal(state.attachments()[0], attachment);
    });

    QUnit.test("attachments()", function(assert)
    {
        // Setup.
        var state = new AttachState();

        // Verify.
        assert.equal(state.attachments().length, 0);
    });

    QUnit.test("clear()", function(assert)
    {
        // Setup.
        var attachment0 = new AttachmentToken(AttachmentCard.CELEBRIANS_STONE);
        var attachment1 = new AttachmentToken(AttachmentCard.STEWARD_OF_GONDOR);
        var state = new AttachState();
        state.add(attachment0);
        state.add(attachment1);
        assert.equal(state.attachments().length, 2);

        // Run.
        state.clear();

        // Verify.
        assert.equal(state.attachments().length, 0);
    });

    QUnit.test("remove()", function(assert)
    {
        // Setup.
        var attachment0 = new AttachmentToken(AttachmentCard.CELEBRIANS_STONE);
        var attachment1 = new AttachmentToken(AttachmentCard.STEWARD_OF_GONDOR);
        var state = new AttachState();
        state.add(attachment0);
        state.add(attachment1);
        assert.equal(state.attachments().length, 2);

        // Run.
        state.remove(attachment0);

        // Verify.
        assert.equal(state.attachments().length, 1);
        assert.equal(state.attachments()[0], attachment1);

        // Run.
        state.remove(attachment1);

        // Verify.
        assert.equal(state.attachments().length, 0);
    });
});
