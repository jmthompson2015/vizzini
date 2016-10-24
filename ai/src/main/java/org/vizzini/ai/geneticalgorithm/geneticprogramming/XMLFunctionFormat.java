package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.vizzini.core.Format;
import org.vizzini.core.XMLFormat;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * Provides an XML formatter for a function.
 * 
 * @param <T> Type.
 */
public final class XMLFunctionFormat<T> implements Format<Function<T>>
{
    /** Terminal formatter. */
    private final XMLTerminalFormat<T> terminalFormatter;

    /**
     * Construct this object.
     * 
     * @param terminalFormatter Terminal formatter.
     */
    @SuppressWarnings("hiding")
    public XMLFunctionFormat(final XMLTerminalFormat<T> terminalFormatter)
    {
        if (terminalFormatter == null)
        {
            throw new IllegalArgumentException("terminalFormatter is null");
        }

        this.terminalFormatter = terminalFormatter;
    }

    @Override
    public String format(final Function<T> function)
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("<function");
        sb.append(" class=\"").append(function.getClass().getName()).append("\"");
        sb.append(" returnType=\"").append(function.getReturnType().getName()).append("\"");

        if (function instanceof PutVariableFunction)
        {
            final PutVariableFunction<T> put = (PutVariableFunction<T>)function;
            sb.append(" variableName=\"").append(put.getVariableName()).append("\"");
        }

        sb.append(">");

        sb.append("<children>");

        final int size = function.getArity();

        for (int i = 0; i < size; i++)
        {
            final TreeNode<T> child = function.getChildAt(i);

            if (child instanceof Terminal)
            {
                sb.append(terminalFormatter.format((Terminal<T>)child));
            }
            else if (child instanceof Function)
            {
                sb.append(format((Function<T>)child));
            }
            else
            {
                throw new RuntimeException("Unknown child type " + child.getClass().getName());
            }
        }

        sb.append("</children>");
        sb.append("</function>");

        return sb.toString();
    }

    /**
     * @return the xmlFormatter
     */
    public XMLFormat getXmlFormatter()
    {
        return terminalFormatter.getXmlFormatter();
    }

    @Override
    public Function<T> parse(final String source)
    {
        final Element element = getXmlFormatter().parse(source);

        final String className = element.getAttribute("class");
        final String returnTypeName = element.getAttribute("returnType");
        final Converter<T> converter = Converter.create(returnTypeName);

        Function<T> answer;

        if ("org.vizzini.ai.geneticalgorithm.geneticprogramming.AddFunction".equals(className))
        {
            final Node childrenNode = element.getElementsByTagName("children").item(0);
            final List<TreeNode<T>> children = createChildren(childrenNode);
            final TreeNode<T> child0 = children.get(0);
            final TreeNode<T> child1 = children.get(1);
            answer = new AddFunction<T>(converter, child0, child1);
        }
        else if ("org.vizzini.ai.geneticalgorithm.geneticprogramming.IfFunction".equals(className))
        {
            final Node childrenNode = element.getElementsByTagName("children").item(0);
            final List<TreeNode<T>> children = createChildren(childrenNode);
            final TreeNode<T> child0 = children.get(0);
            final TreeNode<T> child1 = children.get(1);
            final TreeNode<T> child2 = children.get(2);
            answer = new IfFunction<T>(converter, child0, child1, child2);
        }
        else if ("org.vizzini.ai.geneticalgorithm.geneticprogramming.MultiplyFunction".equals(className))
        {
            final Node childrenNode = element.getElementsByTagName("children").item(0);
            final List<TreeNode<T>> children = createChildren(childrenNode);
            final TreeNode<T> child0 = children.get(0);
            final TreeNode<T> child1 = children.get(1);
            answer = new MultiplyFunction<T>(converter, child0, child1);
        }
        else if ("org.vizzini.ai.geneticalgorithm.geneticprogramming.PowerFunction".equals(className))
        {
            final Node childrenNode = element.getElementsByTagName("children").item(0);
            final List<TreeNode<T>> children = createChildren(childrenNode);
            final TreeNode<T> child0 = children.get(0);
            final TreeNode<T> child1 = children.get(1);
            answer = new PowerFunction<T>(converter, child0, child1);
        }
        else if ("org.vizzini.ai.geneticalgorithm.geneticprogramming.PutVariableFunction".equals(className))
        {
            final String variableName = element.getAttribute("variableName");
            final Node childrenNode = element.getElementsByTagName("children").item(0);
            final List<TreeNode<T>> children = createChildren(childrenNode);
            final TreeNode<T> child0 = children.get(0);
            answer = new PutVariableFunction<T>(converter, variableName, child0);
        }
        else if ("org.vizzini.ai.geneticalgorithm.geneticprogramming.SineFunction".equals(className))
        {
            final Node childrenNode = element.getElementsByTagName("children").item(0);
            final List<TreeNode<T>> children = createChildren(childrenNode);
            final TreeNode<T> child0 = children.get(0);
            answer = new SineFunction<T>(converter, child0);
        }
        else
        {
            throw new RuntimeException("Unknown terminal class " + className);
        }

        return answer;
    }

    /**
     * @param childrenNode Children XML node.
     * 
     * @return a list of children.
     */
    private List<TreeNode<T>> createChildren(final Node childrenNode)
    {
        final List<TreeNode<T>> answer = new ArrayList<TreeNode<T>>();

        final NodeList nodeList = childrenNode.getChildNodes();

        final int size = nodeList.getLength();

        for (int i = 0; i < size; i++)
        {
            final Node node = nodeList.item(i);
            final TreeNode<T> treeNode = createTreeNode(node);
            answer.add(treeNode);
        }

        return answer;
    }

    /**
     * @param node Node.
     * 
     * @return a new tree node.
     */
    private TreeNode<T> createTreeNode(final Node node)
    {
        TreeNode<T> answer = null;

        final String nodeName = node.getNodeName();

        if ("terminal".equals(nodeName))
        {
            answer = terminalFormatter.parse(nodeToString(node));
        }
        else
        {
            throw new RuntimeException("Unknown node name " + nodeName);
        }

        return answer;
    }

    /**
     * @param node Node.
     * 
     * @return a string representation of the given parameter.
     */
    private String nodeToString(final Node node)
    {
        final StringWriter sw = new StringWriter();

        try
        {
            final Transformer transformer = TransformerFactory.newInstance().newTransformer();
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.transform(new DOMSource(node), new StreamResult(sw));
        }
        catch (final TransformerException e)
        {
            throw new RuntimeException(e);
        }

        return sw.toString();
    }
}
