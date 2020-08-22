import React, { Component } from 'react';
import { FirebaseContext } from '../firebase';

class Generate_page extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            songs: {},
          };
	}

	SomeComponent = () => (
		<FirebaseContext.Consumer>
			{(firebase) => {
				return <div>I've access to Firebase and render something.</div>;
			}}
		</FirebaseContext.Consumer>
	);

	componentDidMount() {
        this.setState({ loading: true });
     
        this.props.firebase.songs().on('value', snapshot => {
          this.setState({
            songs: snapshot.val(),
            loading: false,
          });
        });
      }

	render() {
		return this.SomeComponent();
	}
}

export default Generate_page;
