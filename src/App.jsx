import React, { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import './App.css';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { listSongs } from './graphql/queries';

Amplify.configure(awsconfig);

function App() {
  const [songs, setSongs] = useState([]);
  
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const songData = await API.graphql(graphqlOperation(listSongs));
      const songList = songData.data.listSongs.items;
      console.log('song list', songList);
      setSongs(songList);
    } catch (error) {
      console.log('error on fetching songs', error);
    }
  };
  
  return (
    <div className='App'>
      <header className='App-header'>
        <AmplifySignOut />
        <h2>My App Content</h2>
      </header>
    </div>
  )
}


export default withAuthenticator(App);