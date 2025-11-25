import { createSlice } from '@reduxjs/toolkit'

export const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        counter: 0,
        playing: false,
        preview: null,
        muted: true,
        theme: true,
        current: null,
        path: null,
        controlsVisible: false,
        summaryVisible: false,
        played: [],
        all: [
            { title: 'Frosty the Snowman', artist: 'Jimmy Durante', duration: 5 },
            { title: 'My Girl', artist: 'The Temptations', duration: 5 },
            { title: 'Shake it Off', artist: 'Taylor Swift', duration: 5 },
            { title: 'Twist and Shout', artist: 'The Beatles', duration: 5 },
            { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', duration: 5 },
            { title: 'Sweet Caroline', artist: 'Neil Diamond', duration: 5 },
            { title: 'I\'m a Believer', artist: 'The Monkees', duration: 5 },
            { title: 'Don\'t Stop Believin\'', artist: 'Journey', duration: 5 },
        ]
    },
    reducers: {
        toggleMute: (state) => {
            state.muted = !state.muted;
        },
        toggleTheme: (state, action) => {
            state.theme = action.payload;
        },
        togglePlay: (state, actions) => {
            state.playing = actions.payload;
        },
        toggleSummary: (state, actions) => {
            state.summaryVisible = actions.payload;
        },
        previewSong: (state, action) => {
            state.preview = action.payload;
        },
        playNext: (state) => {
            const remaining = state.all.filter(song => !state.played.some(p => p.title === song.title));
            const index = Math.floor(Math.random() * remaining.length);

            state.counter = 0;
            state.current = remaining[index];
            const newPath = `/media/songs/${remaining[index].title.replace(/[\s']/g, '')}.mp3`;
            state.path = newPath;
            state.played = [...state.played, { ...remaining[index], path: newPath }];
        },
        replay: (state) => {
            state.counter += 1;
            state.controlsVisible = false;
        },
        reset: (state) => {
            state.playing = false;
            state.current = null;
            state.played = [];
        },
        showControls: (state, actions) => {
            state.controlsVisible = actions.payload;
        }
    }
})

export const { toggleMute, previewSong, playNext, reset, toggleTheme, replay, showControls, togglePlay, toggleSummary } = audioSlice.actions
export default audioSlice.reducer