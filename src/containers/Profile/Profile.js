import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Petowner from './Petowner/Petowner';
import CareGiver from './CareGiver/CareGiver';
import { connect } from 'react-redux';
import { login } from '../../redux/ducks/reducer';

class Profile extends Component {
  render() {
    return (
      <Aux>
        { this.props.user.title === 'petowner'
          ? <Petowner/>
          : <CareGiver/>
        }
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);