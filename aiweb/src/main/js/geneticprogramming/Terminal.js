define([ "TreeNode" ], function(TreeNode)
{
    "use strict";
    function Terminal(symbol)
    {
        Vizzini.extend(this, new TreeNode(symbol));
    }

    Terminal.prototype.arity = function()
    {
        return 0;
    };

    function Constant(value)
    {
        InputValidator.validateNotNull("value", value);

        this.value = function()
        {
            return value;
        };

        Vizzini.extend(this, new Terminal(value));
    }

    Constant.prototype.copy = function()
    {
        return new Constant(this.value());
    };

    Constant.prototype.evaluate = function()
    {
        return this.value();
    };

    Constant.prototype.toString = function()
    {
        return "Constant " + this.value();
    };

    function Variable(variableName)
    {
        InputValidator.validateNotNull("variableName", variableName);

        this.variableName = function()
        {
            return variableName;
        };

        Vizzini.extend(this, new Terminal(variableName));
    }

    Variable.prototype.copy = function()
    {
        return new Variable(this.variableName());
    };

    Variable.prototype.evaluate = function(context)
    {
        InputValidator.validateNotNull("context", context);

        return context[this.variableName()];
    };

    Variable.prototype.toString = function()
    {
        return "Variable " + this.variableName();
    };

    return (
    {
        Terminal: Terminal,
        Constant: Constant,
        Variable: Variable,
    });
});
