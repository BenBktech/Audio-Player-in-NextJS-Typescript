import classes from './Song.module.css'
import Image from 'next/image';

type Song = {
    id: number;
    title: string;
    artist: string;
    file: string;
    image: string
}

const Song = (props: {song: Song, isPlaying: boolean}) => {

    return (
        <>
            <div className={classes.song__playing}>
                {props.isPlaying ? (
                    <Image className={classes.turning} src={props.song.image} width={300} height={300} />
                ) : (
                    <Image className={classes.notTurning} src={props.song.image} width={300} height={300} />
                )}
                
            </div>
        </>
    )
}

export default Song;