import { connect } from 'react-redux'
import { transform_user } from 'redux/actions'
import Login from 'pages/login'
export default connect(
    state => ({
        user: state
    }),
    {transform_user}
)(Login)