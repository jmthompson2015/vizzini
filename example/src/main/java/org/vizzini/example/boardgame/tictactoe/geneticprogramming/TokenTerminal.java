package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Context;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.core.Visitor;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironment;
import org.vizzini.example.boardgame.tictactoe.TTTPosition;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;
import org.vizzini.example.boardgame.tictactoe.TTTToken;

/**
 * Provides a terminal which returns a representation of the token at position.
 */
public final class TokenTerminal implements Terminal<Integer>
{
    /** Delegate. */
    private final TreeNode<Integer> delegate;

    /** Position. */
    private final TTTPosition position;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param position Position.
     */
    @SuppressWarnings("hiding")
    public TokenTerminal(final Converter<Integer> converter, final TTTPosition position)
    {
        if (position == null)
        {
            throw new IllegalArgumentException("position is null");
        }

        final String symbol = "token(" + position.name() + ")";

        this.delegate = new DefaultTerminal<Integer>(converter, symbol);
        this.position = position;
    }

    @Override
    public void accept(final Visitor<TreeNode<Integer>> visitor)
    {
        if (visitor == null)
        {
            throw new IllegalArgumentException("visitor is null");
        }

        visitor.visit(this);
    }

    @Override
    public TreeNode<Integer> copy()
    {
        return new TokenTerminal(getConverter(), getPosition());
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final TokenTerminal another = (TokenTerminal)object;

            answer = position.equals(another.position);
        }

        return answer;
    }

    @Override
    public Integer evaluate(final Context context)
    {
        final TTTContext tttContext = (TTTContext)context;
        final TTTEnvironment environment = tttContext.getEnvironment();
        final TTTToken token = environment.getTokenAt(position);

        Integer answer = null;

        if (token == null)
        {
            answer = 0;
        }
        else
        {
            final TTTTeam whoseMove = tttContext.getWhoseMove();
            answer = (token.getTeam() == whoseMove ? 1 : -1);
        }

        return answer;
    }

    @Override
    public Converter<Integer> getConverter()
    {
        return delegate.getConverter();
    }

    @Override
    public TreeNode<Integer> getParent()
    {
        return delegate.getParent();
    }

    /**
     * @return the position
     */
    public TTTPosition getPosition()
    {
        return position;
    }

    @Override
    public Class<Integer> getReturnType()
    {
        return delegate.getReturnType();
    }

    @Override
    public String getSymbol()
    {
        return delegate.getSymbol();
    }

    @Override
    public int hashCode()
    {
        return position.hashCode();
    }

    @Override
    public void setParent(final TreeNode<Integer> parent)
    {
        delegate.setParent(parent);
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("returnType", getReturnType().getSimpleName());
        builder.append("parent", (getParent() == null ? null : getParent().getClass().getSimpleName()));
        builder.append("symbol", getSymbol());
        builder.append("position", getPosition());

        return builder.toString();
    }
}
