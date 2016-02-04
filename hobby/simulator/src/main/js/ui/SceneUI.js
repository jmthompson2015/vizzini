define([ "Body", "ui/BodyUI" ], function(Body, BodyUI)
{
    "use strict";
    function SceneUI(environment, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("callback", callback);

        var that = this;
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
            new BodyUI(body, isBump, isSpecular, finishBodyUI);
        }

        var ambientLight = createAmbientLight();
        scene.add(ambientLight);

        var solState = environment.state(Body.SOL);
        var pointLight = createPointLight(solState.position());
        scene.add(pointLight);

        this.ambientLight = function()
        {
            return ambientLight;
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

        function createAmbientLight()
        {
            // var color = 0x343434;
            var color = 0x808080;
            // var color = 0xffffff;

            return new THREE.AmbientLight(color);
        }

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

        function finishBodyUI(bodyUI)
        {
            var bodyKey = bodyUI.bodyKey;
            bodyToUI[bodyKey] = bodyUI;
            scene.add(bodyUI);

            if (Object.getOwnPropertyNames(bodyToUI).length === environment.bodyKeys().length)
            {
                callback(that);
            }
        }
    }

    return SceneUI;
});
