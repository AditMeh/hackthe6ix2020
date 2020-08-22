import React, { Component } from 'react';
import firebaseApp from '../../services/FirebaseService.js';
const { MIDIjs } = window


const storage = firebaseApp.storage()

class SamplePlayer extends Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this)
    }

    async play() {
        var s = storage.refFromURL('gs://songsmith-98875.appspot.com/cs1-1pre.mid')
        const url = await s.getDownloadURL()
        MIDIjs.play(url)
    }

    render() {
        return (
            <div>
                <button onClick={this.play}>play</button>
            </div>
        )
    }
}

export default SamplePlayer;