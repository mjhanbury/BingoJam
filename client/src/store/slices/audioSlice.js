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
        duration: 20,
        controlsVisible: false,
        summaryVisible: false,
        played: [],
        all: [
            { title: "ABC", artist: "Jackson 5" },
            { title: "Ain't No Sunshine", artist: "Bill Withers" },
            { title: "Baby Got Back", artist: "Sir Mix-A-Lot" },
            { title: "Bohemian Rhapsody", artist: "Queen" },
            { title: "Brown Eyed Girl", artist: "Van Morrison" },
            { title: "Call Me", artist: "Blondie" },
            { title: "Dancing Queen", artist: "ABBA" },
            { title: "Don't Stop Believin'", artist: "Journey" },
            { title: "Don't Worry Be Happy", artist: "Bobby McFerrin" },
            { title: "Eye of the Tiger", artist: "Survivor" },
            { title: "Frosty the Snowman", artist: "Jimmy Durante" },
            { title: "Ghostbusters", artist: "Ray Parker Junior" },
            { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper" },
            { title: "Hot to Go", artist: "Chappell Roan" },
            { title: "I'm a Believer", artist: "The Monkees" },
            { title: "I'm Gonna Be", artist: "The Proclaimers" },
            { title: "I Want to Hold Your Hand", artist: "The Beatles" },
            { title: "Kiss", artist: "Prince" },
            { title: "Let's Go Crazy", artist: "Prince" },
            { title: "Lions Fight Song", artist: "Gridiron Heros" },
            { title: "Love Shack", artist: "The B-52s" },
            { title: "Mr. Brightside", artist: "The Killers" },
            { title: "My Girl", artist: "The Temptations" },
            { title: "Party In The U.S.A.", artist: "Miley Cyrus" },
            { title: "Pink Pony Club", artist: "Chappell Roan" },
            { title: "Pour Some Sugar on Me", artist: "Def Leppard" },
            { title: "Ring of Fire", artist: "Johnny Cash" },
            { title: "Rocket Man", artist: "Elton John" },
            { title: "Rudolph The Red-Nosed Reindeer", artist: "Gene Autry" },
            { title: "Shake it Off", artist: "Taylor Swift" },
            { title: "Shout", artist: "The Isley Brothers" },
            { title: "Sweet Caroline", artist: "Neil Diamond" },
            { title: "The Lions Sleep Tonight", artist: "The Tokens" },
            { title: "Thriller", artist: "Michael Jackson" },
            { title: "Twist and Shout", artist: "The Beatles" },
            { title: "Unchained Melody", artist: "Righteous Brothers" },
            { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
            { title: "Uptown Girl", artist: "Billy Joel" },
            { title: "Walking on Sunshine", artist: "Katrina & The Waves" },
            { title: "Wolverines Fight Song", artist: "Louis Elbel" },
            { title: "Wouldn't It Be Nice", artist: "The Beach Boys" }
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
            const newPath = `/media/songs/${remaining[index].title.replace(/[\s'-.]/g, '')}.mp3`;
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