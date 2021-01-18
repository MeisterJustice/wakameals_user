import {useState} from 'react';
import {signin} from '../../Redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import HeaderNav from '../Navigation/HeaderNav';
import { Link } from 'react-router-dom';

export default function SignIn(props) {
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const {loading, error} = userSignin;
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const {identifier, password} = formData;
    const onChangeHandler = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmitHandle = e => {
        e.preventDefault();
        dispatch(signin(identifier, password)).then(() => {}).then(() => {
                let token = localStorage.getItem("token")
                if(typeof token === "string"){
                    props.history.push('/account');
                }

        })
    };



    return (
        <div>
            <HeaderNav />
            <div className="login container" style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "90vh"}}>
            <div className="card border-0 shadow " style={{backgroundColor: '#B02121', width: "60%"}}>
                <div className="card-body">
                    <from>
                        <div className="from-row">
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="inputCity">
                                    Email
                                </label>
                                <input
                                    value={identifier}
                                    name="identifier"
                                    onChange={e => onChangeHandler(e)}
                                    type="email"
                                    placeholder="Enter Email"
                                    className="form-control"
                                />
                                {error && <p style={styles.formError}>{error.errors.identifier}</p>}
                                {error && <p style={styles.formError}>{error.errors.email}</p>}
                                {error && <p style={styles.formError}>{error.errors.phone}</p>}
                                {error && <p style={styles.formError}>{error.errors.username}</p>}
                            </div>
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="inputCity">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    name="password"
                                    onChange={e => onChangeHandler(e)}
                                    type="password"
                                    placeholder="Enter Password"
                                    className="form-control"
                                />
                                {error && <p style={styles.formError}>{error.errors.password}</p>}
                            </div>
                            {loading ? (
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (

                            <div className="form-group col-md-12">
                                <button
                                    type="submit"
                                    onClick={onSubmitHandle}
                                    className="btn  btn-block"
                                    style={{color: 'white', backgroundColor: 'black'}}>
                                    SIGN IN
                                </button>
                            </div>
                            )}
                            <Link to="/signup" className="form-group col-md-12">
                                <p className="btn" style={{color: '#023a9c', fontWeight: 'bold'}}>
                                    Not Registered?
                                </p>
                            </Link>
                            {/* <div className="form-group col-md-12">
                                <p className="btn" style={{color: '#023a9c', fontWeight: 'bold'}}>
                                    Forgot Password?
                                </p>
                            </div> */}
                        </div>
                    </from>
                </div>
            </div>
        </div>
        </div>
    );
}

const styles = {
    label: {
        fontSize: '0.9em',
        fontWeight: 'bold',
        color: 'black'
    },
    formError: {
        fontSize: '0.7em',
        color: 'red',
        marginTop: '10px',
        fontWeight: 'bold'
    }
};