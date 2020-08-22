import React, { Component } from 'react';
import firebaseApp from '../../services/FirebaseService.js';
const { MIDIjs } = window


const storage = firebaseApp.storage()

class SamplePlayer extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.play = this.play.bind(this)
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async play() {
        let fileName = this.state.value
        const s = storage.refFromURL(`gs://songsmith-98875.appspot.com/${fileName}`)
        const url = await s.getDownloadURL()
        MIDIjs.play(url)
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <button onClick={this.play}>play</button>
                <p>try cs1-1pre.mid</p>
            </div>
        )
    }
}

export default SamplePlayer;