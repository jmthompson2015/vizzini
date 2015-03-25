package org.vizzini.starfightersquadrons.swingui;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.FileUtilities;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SSTeam;

/**
 * Provides an audio player for Starfighter Squadrons.
 *
 * @see <a href="http://docs.oracle.com/javase/tutorial/sound/playing.html">Playing Back Audio</a>
 * @see <a href="http://stackoverflow.com/questions/2416935/how-to-play-wav-files-with-java">How to play .wav files with
 *      java</a>
 */
public final class AudioPlayer
{
    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Explosion audio clip. */
    private Clip explosionClip;

    /** Map of ship to audio clip. */
    private final Map<Ship, Clip> shipToLaserClip = new HashMap<Ship, Clip>();

    /**
     * Play an audio clip.
     */
    public void playExplosionClip()
    {
        if (explosionClip == null)
        {
            explosionClip = loadClip("/audio/Explosion.wav");
        }

        explosionClip.setFramePosition(0);
        explosionClip.start();
    }

    /**
     * @param ship Ship.
     */
    public void playLaserClipForShip(final Ship ship)
    {
        final Clip audioClip = getLaserClipForShip(ship);
        audioClip.setFramePosition(0);
        audioClip.start();
    }

    /**
     * @return an audio clip.
     */
    private Clip getFirespray31LaserClip()
    {
        return getLaserClipForShip(Ship.FIRESPRAY_31, "/audio/Slave1Laser.wav");
    }

    /**
     * @param ship Ship.
     *
     * @return an audio clip.
     */
    private Clip getLaserClipForShip(final Ship ship)
    {
        InputValidator.validateNotNull("ship", ship);

        Clip answer = shipToLaserClip.get(ship);

        if (answer == null)
        {
            if (ship == Ship.FIRESPRAY_31)
            {
                answer = getFirespray31LaserClip();
            }
            else if (ship == Ship.TIE_FIGHTER)
            {
                answer = getTieFighterLaserClip();
            }
            else if (ship == Ship.X_WING)
            {
                answer = getXWingLaserClip();
            }
            else if (ship == Ship.YT_1300)
            {
                answer = getYT1300LaserClip();
            }
        }

        if (answer == null)
        {
            final SSTeam team = ship.getTeam();

            if (team == SSTeam.IMPERIAL)
            {
                answer = getTieFighterLaserClip();
            }
            else
            {
                answer = getXWingLaserClip();
            }
        }

        return answer;
    }

    /**
     * @param ship Ship.
     * @param clipName Clip name.
     *
     * @return an audio clip.
     */
    private Clip getLaserClipForShip(final Ship ship, final String clipName)
    {
        InputValidator.validateNotNull("ship", ship);
        InputValidator.validateNotEmpty("clipName", clipName);

        Clip answer = shipToLaserClip.get(ship);

        if (answer == null)
        {
            answer = loadClip(clipName);
            shipToLaserClip.put(ship, answer);
        }

        return answer;
    }

    /**
     * @return an audio clip.
     */
    private Clip getTieFighterLaserClip()
    {
        return getLaserClipForShip(Ship.TIE_FIGHTER, "/audio/TIEFighterLaser.wav");
    }

    /**
     * @return an audio clip.
     */
    private Clip getXWingLaserClip()
    {
        return getLaserClipForShip(Ship.X_WING, "/audio/XWingLaser.wav");
    }

    /**
     * @return an audio clip.
     */
    private Clip getYT1300LaserClip()
    {
        return getLaserClipForShip(Ship.YT_1300, "/audio/MillenniumFalconLaser.wav");
    }

    /**
     * @param clipName Clip name.
     *
     * @return an audio clip.
     */
    private Clip loadClip(final String clipName)
    {
        if (LOGGER.isTraceEnabled())
        {
            LOGGER.trace("clipName = [" + clipName + "]");
        }

        InputStream inputStream = null;
        BufferedInputStream bufferedInputStream = null;
        AudioInputStream audioInputStream = null;
        Clip answer = null;

        try
        {
            inputStream = getClass().getResourceAsStream(clipName);

            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace("inputStream == null ? " + (inputStream == null));
            }

            bufferedInputStream = new BufferedInputStream(inputStream);
            audioInputStream = AudioSystem.getAudioInputStream(bufferedInputStream);
            final AudioFormat audioFormat = audioInputStream.getFormat();

            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace("audioFormat == null ? " + (audioFormat == null));
            }

            final DataLine.Info info = new DataLine.Info(Clip.class, audioFormat);
            answer = (Clip)AudioSystem.getLine(info);
            answer.open(audioInputStream);
        }
        catch (final UnsupportedAudioFileException e)
        {
            throw new RuntimeException(e);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        catch (final LineUnavailableException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(audioInputStream);
            fileUtils.close(bufferedInputStream);
            fileUtils.close(inputStream);
        }

        return answer;
    }
}
