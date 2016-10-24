define(["Assessment", "InitialState", "process/Action"], function(Assessment, InitialState, Action)
{
    "use strict";
    var Reducer = {};

    Reducer.root = function(state, action)
    {
        LOGGER.debug("root() type = " + action.type);

        if (typeof state === 'undefined')
        {
            return new InitialState();
        }

        var newBookToAssessment, newBookToNomination;

        switch (action.type)
        {
            case Action.ADD_BOOK:
                LOGGER.info("Reducer book = " + action.book);
                var newBooks = [];
                newBooks.vizziniAddAll(state.books);
                newBooks.push(action.book);
                newBookToNomination = Object.assign(
                {}, state.bookToNomination);
                newBookToNomination[action.book] = [];
                newBookToAssessment = Object.assign(
                {}, state.bookToAssessment);
                newBookToAssessment[action.book] = Assessment.NONE;
                return Object.assign(
                {}, state,
                {
                    books: newBooks,
                    bookToNomination: newBookToNomination,
                    bookToAssessment: newBookToAssessment,
                });
            case Action.ADD_NOMINATION:
                LOGGER.info("Reducer book = " + action.book);
                LOGGER.info("Reducer nomination = " + action.nomination);
                newBookToNomination = Object.assign(
                {}, state.bookToNomination);
                if (newBookToNomination[action.book] === undefined)
                {
                    throw "Missing bookToNomination array for book: " + action.book;
                }
                newBookToNomination[action.book].push(action.nomination);
                return Object.assign(
                {}, state,
                {
                    bookToNomination: newBookToNomination,
                });
            case Action.SET_ASSESSMENT:
                LOGGER.info("Reducer book = " + action.book);
                LOGGER.info("Reducer assessment = " + action.assessment);
                newBookToAssessment = Object.assign(
                {}, state.bookToAssessment);
                if (newBookToAssessment[action.book] === undefined)
                {
                    throw "Missing bookToAssessment entry for book: " + action.book;
                }
                newBookToAssessment[action.book] = action.assessment;
                return Object.assign(
                {}, state,
                {
                    bookToAssessment: newBookToAssessment,
                });
            default:
                LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
                return state;
        }
    };

    if (Object.freeze)
    {
        Object.freeze(Reducer);
    }

    return Reducer;
});
