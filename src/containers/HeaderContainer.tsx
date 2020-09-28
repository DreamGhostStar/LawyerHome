import { connect } from 'react-redux'
import { transform_user } from 'redux/actions'
import Header from 'components/home/Header'
export default connect(
    state => ({
        user: state
    }),
    {transform_user}
)(Header)