package org.vizzini.imageeditor;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JCheckBox;
import javax.swing.JColorChooser;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.KeyStroke;
import javax.swing.WindowConstants;
import javax.swing.colorchooser.AbstractColorChooserPanel;
import javax.swing.colorchooser.ColorSelectionModel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.filechooser.FileNameExtensionFilter;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Provides a user interface for an image editor.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Image Editor"</code>
 * <p>
 * To get the application menu bar in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dapple.laf.useScreenMenuBar="true"</code>
 */
public final class ImageEditor extends JFrame
{
	/** Logger. */
	private static final Logger LOGGER = LogManager.getLogger();

	/**
	 * Application method.
	 * 
     * @param args Application arguments.
	 */
	public static final void main(final String[] args)
	{
		EventQueue.invokeLater(new Runnable()
		{
			@Override
			public void run()
			{
				ImageEditor app;
				try
				{
					app = new ImageEditor();
					app.setVisible(true);
                }
                catch (final IOException e)
				{
					throw new RuntimeException(e);
				}
			}
		});
	}

	/** Change listener. */
	private final ChangeListener changeListener = new ChangeListener()
	{
		@SuppressWarnings("synthetic-access")
		@Override
		public void stateChanged(final ChangeEvent event)
		{
			LOGGER.trace("stateChanged() start");
			final ColorSelectionModel selectionModel = (ColorSelectionModel) event.getSource();
			final boolean isChooser1 = selectionModel == colorChooser1.getSelectionModel();
			final boolean isChooser2 = selectionModel == colorChooser2.getSelectionModel();

			if (isChooser1)
			{
				LOGGER.trace("new color1 = " + getColor1());
            }
            else if (isChooser2)
			{
				LOGGER.trace("new color2 = " + getColor2());
            }
            else
			{
				LOGGER.trace("new color3 = " + getColor3());
			}

			updateImage();
			LOGGER.trace("stateChanged() end");
		}
	};

	/** First color chooser. */
	private final JColorChooser colorChooser1 = createColorChooser("Low Range Color", new Color(0, 0, 0));

	/** Second color chooser. */
	private final JColorChooser colorChooser2 = createColorChooser("High Range Color", new Color(127, 127, 127));

	/** Third color chooser. */
	private final JColorChooser colorChooser3 = createColorChooser(null, new Color(255, 255, 255));

	/** Color range image filter. */
	private ColorRangeImageFilter colorRangeImageFilter;

	/** File chooser. */
	private JFileChooser fileChooser;

	/** Image. */
	private BufferedImage image;

	/** Image widget. */
	private final JPanel imageUI = new JPanel()
	{
		private Dimension preferredSize = new Dimension(500, 500);

		@Override
		public Dimension getPreferredSize()
		{
			return preferredSize;
		}

		@SuppressWarnings("synthetic-access")
		@Override
		public void paintComponent(final Graphics g)
		{
			super.paintComponent(g);

			LOGGER.trace("paintComponent() start");
			final int width = getWidth();
			final int height = getHeight();
			
			if (image != null)
			{
				final int imageWidth = image.getWidth();
				final int imageHeight = image.getHeight();
				final int x = (width - imageWidth) / 2;
				final int y = (height - imageHeight) / 2;
				LOGGER.trace("x, y = " + x + ", " + y + " width, height = " + width + ", " + height);
				g.drawImage(image, x, y, imageWidth, imageHeight, ImageEditor.this);
			}
			
			LOGGER.trace("paintComponent() end");
		}
	};

	/** Flag indicating the replacement color is transparent. */
	private boolean isTransparent;

	/** Image. */
	private BufferedImage originalImage;

	/** Handle to the previous cursor. */
	private Cursor previousCursor;

	/**
	 * Construct this object.
	 * 
     * @throws IOException if there is something wrong.
	 */
	public ImageEditor() throws IOException
	{
		createMenuBar();

		final JPanel pickerPanel = new JPanel(new GridLayout(0, 3));
		pickerPanel.add(colorChooser1);
		pickerPanel.add(colorChooser2);
		pickerPanel.add(createColorChooser3UI());

		final JPanel mainPanel = new JPanel(new BorderLayout());
		mainPanel.add(imageUI, BorderLayout.CENTER);
		mainPanel.add(pickerPanel, BorderLayout.SOUTH);

		setTitle("Vizzini Image Editor");
		setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		getContentPane().add(mainPanel, BorderLayout.CENTER);
		final Dimension prefSize = getContentPane().getPreferredSize();
		setSize(new Dimension(prefSize.width, prefSize.height + 60));
		setLocationRelativeTo(null);
		setVisible(true);

		openActionPerformed(null);
	}

	/**
     * @param title Title.
     * @param initialColor Initial color.
	 * 
	 * @return a new color chooser.
	 */
	private JColorChooser createColorChooser(final String title, final Color initialColor)
	{
		final JColorChooser answer = new JColorChooser(initialColor);

		if (StringUtils.isNotEmpty(title))
		{
			answer.setBorder(BorderFactory.createTitledBorder(title));
		}

		answer.getSelectionModel().addChangeListener(changeListener);

		for (final AbstractColorChooserPanel panel : answer.getChooserPanels())
		{
			final String displayName = panel.getDisplayName();

			if ("Swatches".equals(displayName) || "HSB".equals(displayName))
			{
				answer.removeChooserPanel(panel);
			}
		}

		return answer;
	}

	/**
	 * @return a new color chooser panel.
	 */
	private JPanel createColorChooser3UI()
	{
		final JCheckBox isTransparentUI = new JCheckBox("Transparent");
		isTransparentUI.setAlignmentX(Component.LEFT_ALIGNMENT);
		isTransparentUI.addActionListener(new ActionListener()
		{
			@SuppressWarnings("synthetic-access")
			@Override
			public void actionPerformed(final ActionEvent event)
			{
				final JCheckBox checkBox = (JCheckBox) event.getSource();
				isTransparent = checkBox.isSelected();
				LOGGER.trace("isTransparent ? " + isTransparent);
				colorChooser3.setEnabled(!isTransparent);
				updateImage();
			}
		});

		colorChooser3.setAlignmentX(Component.LEFT_ALIGNMENT);

		final JPanel color3Panel = new JPanel();
		final BoxLayout layout = new BoxLayout(color3Panel, BoxLayout.Y_AXIS);
		color3Panel.setLayout(layout);
		color3Panel.setBorder(BorderFactory.createTitledBorder("Replacement Color"));
		color3Panel.add(isTransparentUI);
		color3Panel.add(colorChooser3);

		return color3Panel;
	}

	/**
	 * Create and assign a new menu bar.
	 */
	private void createMenuBar()
	{
		final ImageUtilities imageUtils = new ImageUtilities();

		final JMenuItem openMenuItem = new JMenuItem("Open...", imageUtils.createOpenIcon());
		openMenuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_O, ActionEvent.META_MASK));
		openMenuItem.addActionListener(new ActionListener()
		{
			@SuppressWarnings("synthetic-access")
			@Override
			public void actionPerformed(final ActionEvent event)
			{
				openActionPerformed(event);
			}
		});

		final JMenuItem saveMenuItem = new JMenuItem("Save", imageUtils.createSaveIcon());
		saveMenuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_S, ActionEvent.META_MASK));
		saveMenuItem.addActionListener(new ActionListener()
		{
			@SuppressWarnings("synthetic-access")
			@Override
			public void actionPerformed(final ActionEvent event)
			{
				saveActionPerformed(event);
			}
		});

		final JMenuItem saveAsMenuItem = new JMenuItem("Save As...", imageUtils.createSaveAsIcon());
        saveAsMenuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_S, ActionEvent.META_MASK
                | ActionEvent.SHIFT_MASK));
		saveAsMenuItem.addActionListener(new ActionListener()
		{
			@SuppressWarnings("synthetic-access")
			@Override
			public void actionPerformed(final ActionEvent event)
			{
				saveAsActionPerformed(event);
			}
		});

		final JMenu fileMenu = new JMenu("File");
		fileMenu.add(openMenuItem);
		fileMenu.add(saveMenuItem);
		fileMenu.add(saveAsMenuItem);

		final JMenuBar menuBar = new JMenuBar();
		menuBar.add(fileMenu);

		setJMenuBar(menuBar);
	}

	/**
	 * @return the color1
	 */
	private Color getColor1()
	{
		return colorChooser1.getColor();
	}

	/**
	 * @return the color2
	 */
	private Color getColor2()
	{
		return colorChooser2.getColor();
	}

	/**
	 * @return the color3
	 */
	private Color getColor3()
	{
		Color answer = null;

		if (!isTransparent)
		{
			answer = colorChooser3.getColor();
		}

		return answer;
	}

	/**
	 * @return the colorRangeImageFilter
	 */
	private ColorRangeImageFilter getColorRangeImageFilter()
	{
		if (colorRangeImageFilter == null)
		{
			colorRangeImageFilter = new ColorRangeImageFilter(getColor1(), getColor2(), getColor3());
		}

		return colorRangeImageFilter;
	}

	/**
	 * @return the fileChooser
	 */
	private JFileChooser getFileChooser()
	{
		if (fileChooser == null)
		{
			fileChooser = new JFileChooser();
			final FileNameExtensionFilter filter = new FileNameExtensionFilter("PNG, JPG & GIF Images", "png", "jpg",
					"gif");
			fileChooser.setFileFilter(filter);
			final File directory = new File(
					"/Users/jmthompson/Dropbox/SoftwareDev/JavaProjects/vizzini/starfightersquadrons/src/test/resources");
			fileChooser.setCurrentDirectory(directory);
		}

		return fileChooser;
	}

	/**
     * @param event Event.
	 */
	private void openActionPerformed(final ActionEvent event)
	{
		final JFileChooser chooser = getFileChooser();

		final int result = chooser.showOpenDialog(this);

		if (result == JFileChooser.APPROVE_OPTION)
		{
			setCursorBusy(true);

			final File file = chooser.getSelectedFile();
			openFile(file);

			setCursorBusy(false);
		}
	}

	/**
     * @param file File.
	 */
	private void openFile(final File file)
	{
		try
		{
			final FileInputStream inputStream = new FileInputStream(file);
			originalImage = ImageIO.read(inputStream);
			updateImage();
        }
        catch (final IOException e)
		{
			throw new RuntimeException(e);
		}
	}

	/**
     * @param event Event.
	 */
	private void saveActionPerformed(final ActionEvent event)
	{
		final JFileChooser chooser = getFileChooser();

		setCursorBusy(true);

		final File file = chooser.getSelectedFile();
		saveFile(file);

		setCursorBusy(false);
	}

	/**
     * @param event Event.
	 */
	private void saveAsActionPerformed(final ActionEvent event)
	{
		final JFileChooser chooser = getFileChooser();

		final int result = chooser.showSaveDialog(this);

		if (result == JFileChooser.APPROVE_OPTION)
		{
			setCursorBusy(true);

			final File file = chooser.getSelectedFile();
			saveFile(file);

			setCursorBusy(false);
		}
	}

	/**
     * @param file File.
	 */
	private void saveFile(final File file)
	{
		try
		{
			ImageIO.write(image, "png", file);
        }
        catch (final IOException e)
		{
			throw new RuntimeException(e);
		}
	}

	/**
	 * Set the cursor to busy depending upon the given state.
	 * 
     * @param isBusy Flag indicating if the app is busy.
	 */
	private void setCursorBusy(final boolean isBusy)
	{
		Cursor newCursor;

		if (isBusy)
		{
			previousCursor = getCursor();
			newCursor = Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR);
        }
        else
		{
			if (previousCursor != null)
			{
				newCursor = previousCursor;
				previousCursor = null;
            }
            else
			{
				newCursor = Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR);
			}
		}

		setCursor(newCursor);
	}

	/**
	 * Update the image.
	 */
	private void updateImage()
	{
		LOGGER.trace("updateImage() start");
		colorRangeImageFilter = null;
		image = getColorRangeImageFilter().filter(originalImage);
		imageUI.repaint();
		LOGGER.trace("updateImage() end");
	}
}