import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';


class Generate_page extends Component {
	constructor(props) {
		super(props);
	}

	SomeComponent = () => (
		<FirebaseContext.Consumer>
			{(firebase) => {
				return <div>I've access to Firebase and render something.</div>;
			}}
		</FirebaseContext.Consumer>
    );
    
    render() {
        return(
            this.SomeComponent()
        )
    }
}

export default Generate_page;