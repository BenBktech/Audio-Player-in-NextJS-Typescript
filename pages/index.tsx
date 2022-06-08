import { InferGetStaticPropsType } from 'next';
import { NextPage } from 'next';
import { useState } from 'react';
import Song from '../components/Song/Song';
import Audio from '../components/Audio/Audio'
import styles from '../styles/Home.module.css'

const SONGS: Song[] = [
  {
    id: 0,
    title: 'Birdseye Blues',
    artist: 'Chris Haugen',
    file: 'Birdseye Blues - Chris Haugen.mp3',
    image: '/1.jpg'
  },
  {
    id: 1,
    title: 'Depth Fuse',
    artist: 'French Fuse',
    file: 'Depth Fuse - French Fuse.mp3',
    image: '/2.jpg'
  },
  {
    id: 2,
    title: 'Duh Fuse',
    artist: 'French Fuse',
    file: 'Duh Fuse - French Fuse.mp3',
    image: '/3.jpg'
  }
]

export const getStaticProps = async() => {
  const allSongs: Song[] = SONGS;
  return {
    props: {
      songs: allSongs
    },
    revalidate: 3600
  }
}

const Home: NextPage<{ songs: Song[]}> = ({ songs }) => {

  const [trackPlaying, setTrackPlaying] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.songPlaying}>
        <Song isPlaying={isPlaying} trackPlaying={trackPlaying} song={songs[trackPlaying]} />
      </div>
      <Audio isPlaying={isPlaying} setIsPlaying={setIsPlaying} songs={songs} trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} />
    </div>
  )
}

export default Home
