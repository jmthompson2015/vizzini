define([ "Body", "ui/BodyUI" ], function(Body, BodyUI)
{
    "use strict";
    function SceneUI(environment)
    {
        InputValidator.validateNotNull("environment", environment);

        var bumps = [ Body.MERCURY, Body.VENUS, Body.EARTH, Body.LUNA, Body.MARS, Body.PHOBOS, Body.DEIMOS ];
        var speculars = [ Body.EARTH ];
        var scene = new THREE.Scene();
        var bodyKeys = environment.bodyKeys();
        var bodyToUI = {};

        for (var i = 0; i < bodyKeys.length; i++)
        {
            var bodyKey = bodyKeys[i];
            var body = Body.properties[bodyKey];
            var isBump = bumps.vizziniContains(bodyKey);
            var isSpecular = speculars.vizziniContains(bodyKey);
            var bodyUI = new BodyUI(body, isBump, isSpecular);
            bodyToUI[bodyKey] = bodyUI;
            var position = environment.state(bodyKey).position();
            bodyUI.position.set(position.x(), position.y(), position.z());
            scene.add(bodyUI);
        }

        // var color = 0x343434;
        var color = 0x808080;
        // var color = 0xffffff;
        var ambientLight = new THREE.AmbientLight(color);
        scene.add(ambientLight);

        var solState = environment.state(Body.SOL);
        var pointLight = createPointLight(solState.position());
        scene.add(pointLight);

        this.bodyToState = function()
        {
            return bodyToState;
        };

        this.bodyToUI = function()
        {
            return bodyToUI;
        };

        this.pointLight = function()
        {
            return pointLight;
        };

        this.scene = function()
        {
            return scene;
        };

        function createPointLight(position)
        {
            InputValidator.validateNotNull("position", position);

            var color = 0xffffff;
            var intensity = 1.0;
            var distance = 0.0;
            var decay = 0;
            var pointLight = new THREE.PointLight(color, intensity, distance, decay);
            pointLight.position.set(position.x(), position.y(), position.z());

            return pointLight;
        }
    }

    return SceneUI;
});
