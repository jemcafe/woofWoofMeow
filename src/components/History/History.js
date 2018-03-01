import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import './History.css';
import axios from 'axios';
import { connect } from 'react-redux';

class History extends Component {
    constructor () {
        super();
        this.state = {
            jobs: []
        }
    }

    componentDidMount () {
        const { user } = this.props;
        if ( user.title === 'petowner' ) {
            axios.get(`/caregiver/jobs/history`).then( jobs => {
                console.log('History', jobs.data);
                // this.setState({ jobs: jobs.data });
            }).catch(error => console.log(error));
        } 
        if ( user.title === 'caregiver' ) {
            axios.get(`/caregiver/jobs/history`).then( jobs => {
                console.log('History', jobs.data);
                // this.setState({ jobs: jobs.data });
            }).catch(error => console.log(error));
        }
    }

    render() {
        const appointment_history = (
            <div className="AppointmentHistory">
                <div className="AvatarDisplay">
                    <div className="AnimalAvatar"><span>Dog's Name</span></div>
                    <div className="AnimalAvatar"><span>Dog's Name</span></div>
                    <div className="AnimalAvatar"><span>Dog's Name</span></div>
                </div>
                <div className="TodaysService">
                    <div className="ServiceLength">30 min </div>
                    <div className="WalkOrPark"> walk</div>
                </div>
                <div className="AddressContact">
                    <div className="Address">
                        <div>Address</div>
                        1234 N. Somekinda Ave.
                                    </div>
                    <div className="OwnerPhone">
                        <div>Owners's Phone</div>
                        555-555-5555
                    </div>
                </div>
            </div> );
        
        return (
            <Aux>
                <div className="HistoryContainer">
                    <h1>History</h1>
                    <div className="HistoryDropDown">
                        <div className="Appointment tab">
                            <div className="avatar"></div>
                            <div className="day"><h3>March 24</h3></div>
                            <div className="time"><h3>2:30pm - 3:00pm</h3></div>
                        </div>

                        { appointment_history }
                        
                        <div className="Appointment tab">
                            <div className="avatar"></div>
                            <div className="day"><h3>March 24</h3></div>
                            <div className="time"><h3>2:30pm - 3:00pm</h3></div>
                        </div>
                        <div className="Appointment tab">
                            <div className="avatar"></div>
                            <div className="day"><h3>March 24</h3></div>
                            <div className="time"><h3>2:30pm - 3:00pm</h3></div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
};

export default connect( state => state )( History );