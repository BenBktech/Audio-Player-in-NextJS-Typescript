import { useRef, useState, useEffect, SyntheticEvent } from "react"
import { BsFillPauseFill, BsFillPlayFill, BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs"
import classes from './Audio.module.css'

type Song = {
    id: number;
    title: string;
    artist: string;
    file: string;
    image: string
}

const Audio = (props: {isPlaying: boolean, setIsPlaying: Function, songs: Song[], trackPlaying: number, setTrackPlaying: Function}) => {

    const audioRef = useRef<HTMLAudioElement>(null);

    const [timeSongInfo, setTimeSongInfo] = useState<{currentTime: number, duration: number}>({
        currentTime: 0,
        duration: 0
    })
    
    const handlePlay = (): void => {
        props.setIsPlaying(true)
        if(audioRef.current) {
            audioRef.current.play();
        }
    }

    const handlePause = (): void => {
        props.setIsPlaying(false)
        if(audioRef.current) {
            audioRef.current.pause();
        }
    }

    const handlePreviousOrNext = (arg: string): void => {
        let thisTrackPlaying = getNumberNextOrPreviousTrack(arg)
        props.setTrackPlaying(thisTrackPlaying)
    }

    const getNumberNextOrPreviousTrack = (arg: string): number => {
        let thisTrackPlaying = props.trackPlaying
        let numberTracks = props.songs.length
        if(arg === 'previous') {
            thisTrackPlaying--
            if(thisTrackPlaying < 0) {
                thisTrackPlaying = numberTracks - 1
            } 
        }
        if(arg === 'next') {
            thisTrackPlaying++
            if(thisTrackPlaying >= numberTracks) {
                thisTrackPlaying = 0
            }
        }
        return thisTrackPlaying
    }

    useEffect(() => {
        if(props.isPlaying) {
            if(audioRef.current) {
                audioRef.current.play();
            }
        }
        else {
            if(audioRef.current) {
                audioRef.current.pause();
            }
        }
    }, [props.trackPlaying])

    const handleTimeUpdate = (e: SyntheticEvent<EventTarget>): void => {
        const current = (e.target as HTMLMediaElement).currentTime;
        const duration = (e.target as HTMLMediaElement).duration

        if(current == duration) {
            handlePreviousOrNext('next')
        }
        else {
            let timeSongInfo = {
                currentTime: current,
                duration: duration
            }
            setTimeSongInfo(timeSongInfo)
        }
    }

    const getTime = (time: number): string => {
        return (
            Math.floor(time / 60) + ':' + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const handleDragging = (e: SyntheticEvent<EventTarget>): void => {
        console.log(e);
        if(audioRef.current) {
            audioRef.current.currentTime = parseInt((e.target as HTMLInputElement).value)
        }
        setTimeSongInfo({...timeSongInfo, currentTime: parseInt((e.target as HTMLInputElement).value)})
    }

    return (
        <div>
            <div className={classes.range__flex}>
                <p>{getTime(timeSongInfo.currentTime)}</p>
                <input 
                    type="range"
                    className={classes.range} 
                    min={0} 
                    max={timeSongInfo.duration} 
                    value={timeSongInfo.currentTime} 
                    onChange={handleDragging}
                />
                <p>{getTime(timeSongInfo.duration)}</p>
            </div>
            <div className={classes.controls__flex}>
                <BsFillSkipBackwardFill size={24} onClick={() => handlePreviousOrNext('previous')} />
                <audio 
                    onTimeUpdate={handleTimeUpdate} 
                    onLoadedMetadata={handleTimeUpdate} 
                    className={classes.controls__flex__audio__player} 
                    ref={audioRef} 
                    src={props.songs[props.trackPlaying].file} 
                    controls
                ></audio>
                {
                    props.isPlaying ? <BsFillPauseFill size={32} onClick={() => handlePause()} /> : <BsFillPlayFill size={32} onClick={() => handlePlay()} /> 
                }
                <BsFillSkipForwardFill size={24} onClick={() => handlePreviousOrNext('next')} />
            </div>
            
        </div>
    )
}

export default Audio;