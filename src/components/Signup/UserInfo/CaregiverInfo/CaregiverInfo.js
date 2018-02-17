import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Aux from '../../../../hoc/Aux';

class CaregiverInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: '',
            proximity_defenition : 0,
            about_message: ''
        }
    }

    handleChange(property, event) {
        event.preventDefault();
        this.setState({ [property]: event.target.value });
    }

    render() {
        return (
            <Aux>
                <label className="form-group">
                    Upload an image of yourself. Pictures with your furry friends are best!!
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={(event) => this.handleChange("avatar", event)} />
                </label>
                <label className="form-group">
                    Include a description about yourself. Consider what makes you trustworthy to enter peoples homes and provide animal care. What previous experience do you have? Sell yourself!! 
                    <textarea className="form-control" name="Text1" cols="40" rows="5" type="text" placeholder="About Yourself" onChange={(event) => this.handleChange("about_message", event)} />
                </label>
                <label className="form-group">
                    How many miles proximity from your home would you like to work? Consider commute times. Can you arrive in a reasonable window according to your appointments? Each appointment allows for a 60 minute window before and after the suggested scheduling time.
                    <select 
                        className="form-control" 
                        type="text"
                        placeholder="last name"
                        onChange={(event) => this.handleChange("proximity_defenition", event)}>
                        <option value="3">3</option>
                        <option value="3">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                    </select>
                </label>
            </Aux>
        )
    }
}

export default CaregiverInfo;