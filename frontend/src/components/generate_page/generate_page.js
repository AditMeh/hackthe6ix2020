import React, { Component } from 'react';
// import { FirebaseContext } from '../firebase';
import HttpServiceClass from '../../services/http-services';

var HttpService = new HttpServiceClass();


class Generate_page extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
        HttpService.show_songs();
	}

	render() {
		// return this.SomeComponent();
		return (
			<div>
				<div>
					<p>generate page</p>
				</div>

				<div>
				</div>
			</div>
		);
	}
}

export default Generate_page;
