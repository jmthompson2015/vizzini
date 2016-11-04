/*
 * @see https://github.com/reactjs/redux/issues/303#issuecomment-125184409
 */
define(function()
{
    "use strict";
    var Observer = {};

    Observer.observeStore = function(store, select, onChange, initialState)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("select", select);
        InputValidator.validateNotNull("onChange", onChange);
        // initialState optional.

        var currentState = initialState;

        function handleChange()
        {
            var nextState = select(store.getState());

            if (nextState !== currentState)
            {
                currentState = nextState;
                onChange(nextState);
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();

        return unsubscribe;
    };

    if (Object.freeze)
    {
        Object.freeze(Observer);
    }

    return Observer;
});
