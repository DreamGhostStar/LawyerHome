import { connect } from 'react-redux'
import { transform_user } from 'redux/actions'
import Login from 'pages/Login'
export default connect(
    state => ({
        user: state
    }),
    {transform_user}
)(Login)