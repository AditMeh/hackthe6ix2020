import React, { Component } from 'react';
const { MIDIjs } = window


class SamplePlayer extends Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this)
    }

    play() {
        MIDIjs.play("The-Flight-Of-The-Bumble-Bee.mid")
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