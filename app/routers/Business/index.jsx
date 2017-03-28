// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Business, Detail, Lianxi } from '../../containers';


function mapStateToProps(state) {
  return {...state.business}
}
// function mapDispatchToProps(dispatch){
//   return bindActionCreators(CounterActions, dispatch);
// }
export default {
	'Business':connect(mapStateToProps)(Business),
	'detail':connect(mapStateToProps)(Detail),
  'lianxi':connect(mapStateToProps)(Lianxi),
};