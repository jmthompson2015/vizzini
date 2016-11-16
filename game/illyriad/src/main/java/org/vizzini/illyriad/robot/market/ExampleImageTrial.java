package org.vizzini.illyriad.robot.market;

import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.io.FileUtils;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.robot.ImageSplitter;

/**
 * Provides a trial of handling example images.
 */
public final class ExampleImageTrial
{
    /**
     * Provides an error message.
     */
    static class ErrorMessage
    {
        /** Message. */
        private final String message;

        /** Name. */
        private final String name;

        /** Error points. */
        private final int points;

        /**
         * Construct this object.
         * 
         * @param name Name.
         * @param message Message.
         * @param points Points.
         */
        @SuppressWarnings("hiding")
        public ErrorMessage(final String name, final String message, final int points)
        {
            this.name = name;
            this.message = message;
            this.points = points;
        }

        /**
         * @return the message
         */
        public String getMessage()
        {
            return message;
        }

        /**
         * @return the name
         */
        public String getName()
        {
            return name;
        }

        /**
         * @return the points
         */
        public int getPoints()
        {
            return points;
        }
    }

    /**
     * Provides run data.
     */
    static class RunData
    {
        /** Configuration. */
        private final PriceImageFilterConfiguration config;

        /** Error messages. */
        private final List<ErrorMessage> errorMessages;

        /** Map of name to digit images. */
        private final Map<String, List<RobotImage>> nameToDigitsMap;

        /**
         * Construct this object.
         * 
         * @param config Configuration.
         * @param errorMessages Error messages.
         * @param nameToDigitsMap Map of name to digit images.
         */
        @SuppressWarnings("hiding")
        public RunData(final PriceImageFilterConfiguration config, final List<ErrorMessage> errorMessages,
                final Map<String, List<RobotImage>> nameToDigitsMap)
        {
            this.config = config;
            this.errorMessages = errorMessages;
            this.nameToDigitsMap = nameToDigitsMap;
        }

        /**
         * @return the config
         */
        public PriceImageFilterConfiguration getConfig()
        {
            return config;
        }

        /**
         * @return the sum of the error message points.
         */
        public int getErrorCount()
        {
            int answer = 0;

            for (final ErrorMessage msg : errorMessages)
            {
                answer += msg.getPoints();
            }

            return answer;
        }

        /**
         * @return the errorMessages
         */
        public List<ErrorMessage> getErrorMessages()
        {
            return errorMessages;
        }

        /**
         * @return the nameToDigitsMap
         */
        public Map<String, List<RobotImage>> getNameToDigitsMap()
        {
            return nameToDigitsMap;
        }
    }

    /** Output directory. */
    private static final File OUTPUT_DIR = new File(Locations.MARKET_DATA_DIR, "example");

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        deleteOutputDirectory();

        final ExampleImageTrial trial = new ExampleImageTrial();

        try
        {
            trial.run();
        }
        catch (final RuntimeException e)
        {
            Toolkit.getDefaultToolkit().beep();
            e.printStackTrace();
        }

        Toolkit.getDefaultToolkit().beep();
    }

    /**
     * Delete the image output directory.
     */
    private static void deleteOutputDirectory()
    {
        try
        {
            FileUtils.deleteDirectory(OUTPUT_DIR);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /** Error messages. */
    private final List<ErrorMessage> errorMessages = new ArrayList<ErrorMessage>();

    /** Example images. */
    private final List<ExampleImage> exampleImages;

    /** List of run data. */
    private final List<RunData> runDatas = new ArrayList<RunData>();

    /**
     * Construct this object.
     */
    public ExampleImageTrial()
    {
        final ExampleImageListBuilder builder = new ExampleImageListBuilder();
        exampleImages = builder.build();
    }

    /**
     * Run.
     */
    public void run()
    {
        final boolean isSinglePass = true;
        // final boolean isSinglePass = false;

        if (isSinglePass)
        {
            final boolean isNormalized0 = true;
            final Float[] scaleFactors = { 5.22f, 6.33f, 3.35f, };
            final Float[] offsets = { -458.0f, -761.0f, 227.0f, };
            final boolean isNormalized1 = false;
            final double trimColorScale = 2.0;
            final double blackAndWhiteColorScale = 1.41;

            final PriceImageFilterConfiguration config = createConfiguration(isNormalized0, scaleFactors, offsets,
                    isNormalized1, trimColorScale, blackAndWhiteColorScale);
            final PriceImageFilter filter = new PriceImageFilter(config);
            final ImageSplitter splitter = new PriceImageSplitter();

            runDatas.clear();
            final boolean isDigitSaved = true;
            runSinglePass(filter, splitter, isDigitSaved);
            System.out.println();
            printResults();
        }
        else
        {
            runSearch();
        }
    }

    /**
     * Run a search for the best configuration.
     */
    public void runSearch()
    {
        final long start = System.currentTimeMillis();

        float[] scaleFactorCandidates;
        float[] offsetCandidates;
        double[] trimScaleCandidates;
        double[] blackWhiteScaleCandidates;

        final boolean isThorough = true;
        // final boolean isThorough = false;
        final boolean isDigitSaved = false;

        if (isThorough)
        {
            scaleFactorCandidates = new float[] { 1.25f, 1.5f, 2.0f, 3.0f, 4.0f, };
            offsetCandidates = new float[] { 128.0f, 64.0f, 0.0f, -64.0f, -127.0f, -254.0f, -381.0f, };
            trimScaleCandidates = new double[] { 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, };
            blackWhiteScaleCandidates = new double[] { 1.1, 1.2, 1.3, 1.4, 1.5, };
        }
        else
        {
            scaleFactorCandidates = new float[] { 1.25f, 3.0f, };
            offsetCandidates = new float[] { 128.0f, 64.0f, -127.0f, };
            trimScaleCandidates = new double[] { 0.80, 0.90, };
            blackWhiteScaleCandidates = new double[] { 1.2, 1.3, };
        }

        final ImageSplitter splitter = new PriceImageSplitter();

        for (int n0 = 0; n0 < 2; n0++)
        {
            final boolean isNormalized0 = (n0 == 1);
            System.out.println("isNormalized0   = " + isNormalized0);

            for (final float factorRed : scaleFactorCandidates)
            {
                System.out.println("scaleFactorRed   = " + factorRed);

                for (final float factorGreen : scaleFactorCandidates)
                {
                    System.out.println("scaleFactorGreen = " + factorGreen);

                    for (final float factorBlue : scaleFactorCandidates)
                    {
                        System.out.println("scaleFactorBlue  = " + factorBlue);

                        final Float[] scaleFactors = { factorRed, factorGreen, factorBlue };

                        for (final float offsetRed : offsetCandidates)
                        {
                            for (final float offsetGreen : offsetCandidates)
                            {
                                for (final float offsetBlue : offsetCandidates)
                                {
                                    final Float[] offsets = { offsetRed, offsetGreen, offsetBlue };

                                    for (int n1 = 0; n1 < 2; n1++)
                                    {
                                        final boolean isNormalized1 = (n1 == 1);

                                        for (final double trimScale : trimScaleCandidates)
                                        {
                                            for (final double bwScale : blackWhiteScaleCandidates)
                                            {
                                                final PriceImageFilterConfiguration config = createConfiguration(
                                                        isNormalized0, scaleFactors, offsets, isNormalized1, trimScale,
                                                        bwScale);
                                                final PriceImageFilter preprocessor = new PriceImageFilter(config);

                                                runSinglePass(preprocessor, splitter, isDigitSaved);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        System.out.println();
        printResults();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("\nrun()", start, end);
    }

    /**
     * Run a single pass of example images through the given processor.
     * 
     * @param filter Price image preprocessor.
     * @param splitter Price image splitter.
     * @param isDigitSaved Flag indicating whether to save the digits to files.
     */
    public void runSinglePass(final PriceImageFilter filter, final ImageSplitter splitter, final boolean isDigitSaved)
    {
        errorMessages.clear();
        final Map<String, List<RobotImage>> nameToDigitsMap = new TreeMap<String, List<RobotImage>>();

        for (int i = 0; i < exampleImages.size(); i++)
        {
            final ExampleImage exampleImage = exampleImages.get(i);

            if (exampleImage.isImageExpected())
            {
                RobotImage priceImage = exampleImage.getPriceImage();
                priceImage = filter.filter(priceImage);
                final List<RobotImage> digits = splitter.split(priceImage);

                if (isDigitSaved)
                {
                    saveDigits(exampleImage.getName(), digits);
                }

                nameToDigitsMap.put(exampleImage.getName(), digits);
                evaluate(exampleImage, digits);
            }
        }

        int errorCount = 0;

        for (final ErrorMessage msg : errorMessages)
        {
            errorCount += msg.getPoints();
        }

        final String format = "%3d %s %5s %-21s %-21s %5s %4.2f %4.2f";
        final PriceImageFilterConfiguration config = filter.getConfiguration();

        if (runDatas.isEmpty() || (errorCount < runDatas.get(0).getErrorCount()))
        {
            runDatas.clear();
            runDatas.add(new RunData(config, new ArrayList<ErrorMessage>(errorMessages), nameToDigitsMap));

            System.out.println(String.format(format, errorCount, "new best", config.isNormalized0(),
                    Arrays.toString(config.getScaleFactors()), Arrays.toString(config.getOffsets()),
                    config.isNormalized1(), config.getTrimColorScale(), config.getBlackAndWhiteColorScale()));
        }
        else if (!runDatas.isEmpty() && (errorCount == runDatas.get(0).getErrorCount()))
        {
            runDatas.add(new RunData(config, new ArrayList<ErrorMessage>(errorMessages), nameToDigitsMap));

            // System.out.println(String.format(format, errorCount, "another best",
            // Arrays.toString(config.getScaleFactors()), Arrays.toString(config.getOffsets()),
            // config.getTrimColorScale(), config.getBlackAndWhiteColorScale()));
        }
    }

    /**
     * @param isNormalized0 First flag indicating whether the image is normalized.
     * @param scaleFactors Scale factors.
     * @param offsets Offsets.
     * @param isNormalized1 Second flag indicating whether the image is normalized.
     * @param trimColorScale Trim color scale.
     * @param blackAndWhiteColorScale Black and white color scale.
     * 
     * @return a new image processor configuration.
     */
    private PriceImageFilterConfiguration createConfiguration(final boolean isNormalized0, final Float[] scaleFactors,
            final Float[] offsets, final boolean isNormalized1, final double trimColorScale,
            final double blackAndWhiteColorScale)
    {
        return new PriceImageFilterConfiguration(isNormalized0, scaleFactors, offsets, isNormalized1, trimColorScale,
                blackAndWhiteColorScale);
    }

    /**
     * @param exampleImage Example image.
     * @param digits Digit images.
     */
    private void evaluate(final ExampleImage exampleImage, final List<RobotImage> digits)
    {
        // Error points.
        final int digitsNull = 7;
        final int digitImageNotNull = 7;

        final int digitsCount = 5;

        final int digitWidth = 1;
        final int digitHeight = 1;

        if (exampleImage.isImageExpected())
        {
            final String name = exampleImage.getName();

            final List<Integer> expectedDigitWidths = exampleImage.getExpectedDigitWidths();
            myAssertThat(name, "failed digits count", digitsCount, digits.size(), expectedDigitWidths.size());

            for (int i = 0; i < expectedDigitWidths.size(); i++)
            {
                if (i < digits.size())
                {
                    final RobotImage digit = digits.get(i);
                    myAssertNotNull(name, i + " failed digit not null", digitImageNotNull, digit);

                    myAssertThat(name, i + " failed digit width", digitWidth, digit.getWidth(),
                            expectedDigitWidths.get(i));

                    myAssertThat(name, i + " failed height", digitHeight, digit.getHeight(),
                            exampleImage.getExpectedHeight());
                }
                else
                {
                    myAssertNotNull(name, i + " failed digit not null", digitImageNotNull, null);
                }
            }
        }
        else
        {
            final String name = exampleImage.getName();
            myAssertNull(name, "failed digits null", digitsNull, digits);
        }
    }

    /**
     * @param name Name.
     * @param message Message.
     * @param points Points.
     * @param object Object.
     */
    private void myAssertNotNull(final String name, final String message, final int points, final Object object)
    {
        if (object == null)
        {
            final String myMessage = message;
            errorMessages.add(new ErrorMessage(name, myMessage, points));
        }
    }

    /**
     * @param name Name.
     * @param message Message.
     * @param points Points.
     * @param object Object.
     */
    private void myAssertNull(final String name, final String message, final int points, final Object object)
    {
        if (object != null)
        {
            final String myMessage = message;
            errorMessages.add(new ErrorMessage(name, myMessage, points));
        }
    }

    /**
     * @param name Name.
     * @param message Message.
     * @param points Points.
     * @param value Value.
     * @param expected Expected value.
     */
    private void myAssertThat(final String name, final String message, final int points, final int value,
            final int expected)
    {
        if (value != expected)
        {
            final String myMessage = message + " (expected: " + expected + " got: " + value + ")";
            errorMessages.add(new ErrorMessage(name, myMessage, points));
        }
    }

    /**
     * Print results.
     */
    private void printResults()
    {
        final String format = "%3d %s %5s %-21s %-21s %5s %4.2f %4.2f";

        System.out.println("Final best count: " + runDatas.size());

        for (int i = 0; i < runDatas.size(); i++)
        {
            final RunData runData = runDatas.get(i);
            final PriceImageFilterConfiguration config = runData.getConfig();
            final Float[] myScaleFactors = config.getScaleFactors();
            final Float[] myOffsets = config.getOffsets();
            System.out.println(String.format("%2d " + format, i, runData.getErrorCount(), "best",
                    config.isNormalized0(), Arrays.toString(myScaleFactors), Arrays.toString(myOffsets),
                    config.isNormalized1(), config.getTrimColorScale(), config.getBlackAndWhiteColorScale()));
        }

        final RunData runData0 = runDatas.get(0);

        if (!runData0.getErrorMessages().isEmpty())
        {
            System.out.println("\nError count: " + runData0.getErrorCount());
            System.out.println();
            System.out.println("First set of errors: ");

            for (final ErrorMessage errorMsg : runData0.getErrorMessages())
            {
                final String name = errorMsg.getName();
                System.out.println(String.format("%32s: %s", name, errorMsg.getMessage()));
                saveDigits(name, runData0.getNameToDigitsMap().get(name));
            }
        }
    }

    /**
     * @param name Name.
     * @param digits Digits.
     */
    private void saveDigits(final String name, final List<RobotImage> digits)
    {
        final RobotImageIO imageIo = new RobotImageIO();

        for (int i = 0; i < digits.size(); i++)
        {
            final RobotImage digit = digits.get(i);
            imageIo.write(new File(OUTPUT_DIR, name + "_" + i + ".png"), digit);
        }
    }
}
