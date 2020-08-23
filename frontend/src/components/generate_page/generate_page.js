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
			value: '',
			songloaded: 'false',
			songs: [
				{
					title: '',
					artist: '',
					storagelink: ''
				}
      ],
      curtitle: "Suite No. 1 in G major - Allemande",
      curartist: "Bach",
      curoglink: "https://firebasestorage.googleapis.com/v0/b/songsmith-98875.appspot.com/o/mp3_gen%2Fgen_cs2-4sar.mp3?alt=media&token=d6b0f1d4-670b-4093-846d-d9682c241d40",
      curgenlink: "https://firebasestorage.googleapis.com/v0/b/songsmith-98875.appspot.com/o/mp3_gen%2Fgen_cs2-4sar.mp3?alt=media&token=d6b0f1d4-670b-4093-846d-d9682c241d40"
		};

		this.loadsongs = this.loadsongs.bind(this);
    this.songlist = this.songlist.bind(this);
    this.loadaudio = this.loadaudio.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadaudio = (stitle, slink) => {
    var wasd = this.state.curtitle;
    console.log("DAWDHAWUI DHWA", slink)
    return (
      <Audio
      title={stitle}
      artist="Bach"
      storagelink="https://firebasestorage.googleapis.com/v0/b/songsmith-98875.appspot.com/o/mp3_gen%2Fgen_cs2-4sar.mp3?alt=media&token=d6b0f1d4-670b-4093-846d-d9682c241d40"
    />
    )
  }


	loadsongs = () => {
		HttpService.show_songs()
			.then((temp) => {
				this.setState({ songs: temp });
				this.setState({ songloaded: true });
			})
			.then((temp2) => {
				// console.log(this.state.songs);
			});
	};

	songlist = (name) => {
		const list1 = [];
		var list2 = [];

		for (let i = 0; i < this.state.songs.length; i++) {
			// console.log(this.state.songs[i]);
			if (this.state.songs[i].title.toLowerCase().trim().includes(name.toLowerCase().trim())) {
				list1.push(this.state.songs[i]);
			} else if (name === '') {
				list1.push(this.state.songs[i]);
			}
		}

		list2 = list1.map((item) => (
			<div className="song-item">
				{item.title}, {item.artist}
			</div>
		));
		return list2;
	};

	componentDidMount() {
		this.loadsongs();
		// console.log(this.state.value);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		// send data thru http
    event.preventDefault();
    HttpService.get_song_info(this.state.value).then((newdata) => {
      this.setState({curtitle: newdata.title});
      this.setState({curoglink: newdata.ogurl});
      this.setState({curgenlink: newdata.genurl});
      // console.log(this.state.curgenlink);
      if (newdata){
        HttpService.get_song_info(" "+this.state.value).then((newdata) => {
          this.setState({curtitle: newdata.title});
          this.setState({curoglink: newdata.ogurl});
          this.setState({curgenlink: newdata.genurl});
          // console.log(this.state.curgenlink);
        });
      }
    });
	}

	render() {
		// return this.SomeComponent();
		return (
			<div className="container-fluid">
				<div className="row search-bar-row">
					<div className="col-12 search-bar-col">
						<div className="form-wrapper">
							<header className="form-header">Search Our Database</header>
							<form className="search-form" onSubmit={this.handleSubmit}>
								<label htmlFor="search-input" className="search-bar-label">
									Search for an Artist
								</label>
								<input
									name="search-input"
									type="text"
									className="search-bar-inp"
									value={this.state.value}
									onChange={this.handleChange}
								/>
								<button type="submit" className="search-submit-btn">
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>

				<div className="row search-results-row">
					{/* <div className="col-4" /> */}
					<div className="col-12 search-results-col">
							<div className="search-results">{this.songlist(this.state.value)}</div>
					</div>
					{/* <div className="col-4" /> */}
				</div>

				<div className="row original-song-row">
					<div className="col-12 original-song-col">
						{/* <Audio
							title={this.state.curtitle}
              artist={this.state.curartist}
							storagelink={this.state.curgenlink}
						/> */}
            {this.loadaudio(this.state.curtitle, this.state.curgenlink)}
					</div>
				</div>

				<div className="row spacer-row">
					{/* <div className="col-12 spacer-col">SPACE</div> */}
				</div>

				<div className="row new-song-row">
					<div className="col-12 new-song-col">
						{/* <Audio
							title={this.state.songs[0].title}
							artist="eman"
							storagelink="https://firebasestorage.googleapis.com/v0/b/songsmith-98875.appspot.com/o/trap_anthem.ogg?alt=media&token=8f63883b-f04b-4083-909a-e533a046a454"
						/> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Generate_page;
