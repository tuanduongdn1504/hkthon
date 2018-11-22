import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, Image } from 'react-native';
import CaseTypesActions from '../../redux/CaseTypesRedux/actions';
import { getCurrentData } from '../../redux/crudCreator/selectors';
import Text from '../../components/Text';
import Container from '../../components/Container';
import { Images } from '../../themes';

class Detail extends Component {
  componentDidMount() {
    const { item, getCaseTypeById } = this.props;
    getCaseTypeById(item);
  }

  render() {
    const { caseType } = this.props;
    return (
      <Container center>
        <Image
          defaultSource={Images.defaultUser}
          source={{ uri: caseType.imageLink }}
          style={styles.image}
        />
        <Text type="body2">{caseType?.displayName?.vi}</Text>
      </Container>
    );
  }
}
Detail.propTypes = {
  item: PropTypes.object,
  getCaseTypeById: PropTypes.func
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  }
});

function mapStateToProps(state) {
  return {
    caseType: getCurrentData(state, 'caseTypes')
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getCaseTypeById: data => dispatch(CaseTypesActions.getByIdCaseTypes(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
