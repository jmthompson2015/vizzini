define([ "Scene", "process/Observer" ], function(Scene, Observer)
{
    function SceneObserver(store)
    {
        this.onChange = function(sceneKey)
        {
            var scene = Scene.properties[sceneKey];
            scanner().style.backgroundImage = "url(" + scene.image + ")";
            scanner().title = scene.name;
        };

        this.select = function(state)
        {
            return state.sceneKey;
        };

        function scanner()
        {
            return document.getElementById("scanner");;
        }

        var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this));
    }

    if (Object.freeze)
    {
        Object.freeze(SceneObserver);
    }

    return SceneObserver;
});
