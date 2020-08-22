import React, { Component } from 'react';
// import { FirebaseContext } from '../firebase';
import HttpServiceClass from '../../services/http-services'

var HttpService = new HttpServiceClass();

class Generate_page extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            songs: {},
          };
	}

	// SomeComponent = () => (
	// 	<FirebaseContext.Consumer>
	// 		{(firebase) => {
	// 			return <div>I've access to Firebase and render something.</div>;
	// 		}}
	// 	</FirebaseContext.Consumer>
	// );

	componentDidMount() {
        HttpService.show_songs();
    }

	render() {
        // return this.SomeComponent();
        return(
        <div>
            <p>generate page</p>
        </div>
        );
	}
}

export default Generate_page;
