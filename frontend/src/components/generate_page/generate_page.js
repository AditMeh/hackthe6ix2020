import React, { Component } from 'react';
import './generate_page.css';
// import { FirebaseContext } from '../firebase';
import HttpServiceClass from '../../services/http-services';
import ReactAudioPlayer from 'react-audio-player';
import song from '../generate_page/trap_anthem.ogg';

import Audio from '../audioplayer/Audio';

let HttpService = new HttpServiceClass();

class Generate_page extends Component {
	constructor(props) {
		super(props);

		this.state = {
			songloaded: 'false',
			songs: [{
        title: "",
        artist: "",
        storagelink: ""

      }]
		};

		this.loadsongs = this.loadsongs.bind(this);
	}

	loadsongs = () => {
		HttpService.show_songs().then((temp) => {
			this.setState({ songs: temp });
			this.setState({ songloaded: true });
		}).then((temp2) => {
      console.log(this.state.songs[0].title);
    });
	};

	componentDidMount() {
		this.loadsongs();
	}

	render() {
		// return this.SomeComponent();
		return (
			<div>
				<div>
					<p>generate page</p>
				</div>

				<div>
					{/* <audio className="audioPlayer" src={"https://firebasestorage.googleapis.com/v0/b/songsmith-98875.appspot.com/o/trap_anthem.ogg?alt=media&token=8f63883b-f04b-4083-909a-e533a046a454"} controls /> */}

					<Audio
						title={this.state.songs[0].title}
						artist="eman"
						storagelink="https://firebasestorage.googleapis.com/v0/b/songsmith-98875.appspot.com/o/trap_anthem.ogg?alt=media&token=8f63883b-f04b-4083-909a-e533a046a454"
					/>
				</div>
			</div>
		);
	}
}

export default Generate_page;
