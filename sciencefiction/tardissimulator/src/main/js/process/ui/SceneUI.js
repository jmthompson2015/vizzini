define([ "process/ui/ConsoleUI", "process/ui/TimeRotorUI" ], function(ConsoleUI, TimeRotorUI)
{
    "use strict";
    function SceneUI(callback)
    {
        InputValidator.validateNotNull("callback", callback);

        var that = this;

        this.console = function()
        {
            return console;
        };

        this.root = function()
        {
            return root;
        };

        this.scene = function()
        {
            return scene;
        };

        this.timeRotor = function()
        {
            return timeRotor;
        };

        function createConsole()
        {
            return new ConsoleUI(finishConsoleUI).root();
        }

        function createRoot()
        {
            var geometry = new THREE.BoxGeometry(1, 1, 1);

            var material = new THREE.MeshBasicMaterial(
            {
                color: 0xFF0000,
            });

            return new THREE.Mesh(geometry, material);
        }

        function createTimeRotor()
        {
            var answer = new TimeRotorUI().root();

            answer.position.z = 3.5 + 9;
            answer.rotation.x = d2r(90.0);

            return answer;
        }

        function d2r(d)
        {
            return d * Math.PI / 180.0;
        }

        function finishConsoleUI(consoleUI)
        {
            LOGGER.info("SceneUI.finishConsoleUI() consoleUI = " + consoleUI);

            callback(that);
        }

        var scene = new THREE.Scene();

        var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
        scene.add(ambientLight);

        var pointLight = new THREE.PointLight(0xFFFFFF, 0.6, 0);
        pointLight.position.set(100, -100, 40);
        scene.add(pointLight);

        var root = createRoot();
        scene.add(root);

        var console = createConsole();
        root.add(console);

        var timeRotor = createTimeRotor();
        root.add(timeRotor);
    }

    if (Object.freeze)
    {
        Object.freeze(SceneUI);
    }

    return SceneUI;
});
