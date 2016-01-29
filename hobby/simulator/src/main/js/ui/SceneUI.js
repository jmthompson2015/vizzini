define([ "Body", "ui/BodyUI" ], function(Body, BodyUI)
{
    "use strict";
    function SceneUI(environment)
    {
        InputValidator.validateNotNull("environment", environment);

        var scene = new THREE.Scene();
        var bodyKeys = environment.bodyKeys();
        var bodyToUI = {};

        for (var i = 0; i < bodyKeys.length; i++)
        {
            var bodyKey = bodyKeys[i];
            var body = Body.properties[bodyKey];
            var isBump = (bodyKey === Body.SOL ? false : true);
            var isSpecular = (bodyKey === Body.EARTH ? true : false);
            var bodyUI = new BodyUI(body, isBump, isSpecular);
            bodyToUI[bodyKey] = bodyUI;
            var state = environment.state(bodyKey);
            bodyUI.position.set(state.position().x(), state.position().y(), state.position().z());
            scene.add(bodyUI);
        }

        // var ambientLight = new THREE.AmbientLight(0x343434);
        var ambientLight = new THREE.AmbientLight(0x808080);
        // var ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        var pointLight = new THREE.PointLight(0xffffff, 1.0);
        var solState = environment.state(Body.SOL);
        pointLight.position.set(solState.position().x(), solState.position().y(), solState.position().z());
        scene.add(pointLight);

        this.bodyToState = function()
        {
            return bodyToState;
        };

        this.bodyToUI = function()
        {
            return bodyToUI;
        };

        this.scene = function()
        {
            return scene;
        };
    }

    return SceneUI;
});
