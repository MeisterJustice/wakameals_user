import {useState} from 'react';
import {signup} from '../../Redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import HeaderNav from '../Navigation/HeaderNav';
import { Link } from 'react-router-dom';

export default function SignUp(props) {
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const {loading, error} = userSignin;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: "",
        last_name: "",
        title: "Mr",
        phone: "",
    });

    const {email, password, first_name, last_name, title, phone} = formData;
    const onChangeHandler = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmitHandle = e => {
        e.preventDefault();
        dispatch(signup(formData)).then(() => {}).then(() => {
                let token = localStorage.getItem("token")
                if(typeof token === "string"){
                    props.history.push('/');
                }

        })
    };



    return (
        <div>
            <HeaderNav />
            <div className="login container" style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", paddingTop: "50px", paddingBottom: "50px"}}>
            <div className="card border-0 shadow login-form" style={{backgroundColor: '#ff8903'}}>
                <div className="card-body">
                    <from>
                        <div className="from-row">
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="first_name">
                                    First Name
                                </label>
                                <input
                                    id="first_name"
                                    value={first_name}
                                    name="first_name"
                                    onChange={e => onChangeHandler(e)}
                                    type="text"
                                    className="form-control"
                                />
                                {error && <p style={styles.formError}>{error.errors && error.errors.first_name}</p>}
                            </div>
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="last_name">
                                    Last Name
                                </label>
                                <input
                                    id="last_name"
                                    value={last_name}
                                    name="last_name"
                                    onChange={e => onChangeHandler(e)}
                                    type="text"
                                    className="form-control"
                                />
                                {error && <p style={styles.formError}>{error.errors && error.errors.last_name}</p>}
                            </div>
                            {/* <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="title">Title</label>
                                <select value={title} id="title" name="title" onChange={e => onChangeHandler(e)} className="form-control" id="title">
                                    <option value="Mr">Mr</option>
                                    <option value="Ms">Ms</option>
                                </select>
                                {error && <p style={styles.formError}>{error.errors && error.errors.title}</p>}
                            </div> */}
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="number">
                                    Phone Number
                                </label>
                                <input
                                    id="number"
                                    value={phone}
                                    name="phone"
                                    onChange={e => onChangeHandler(e)}
                                    type="number"
                                    className="form-control"
                                />
                                {error && <p style={styles.formError}>{error.errors && error.errors.phone}</p>}
                            </div>
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    value={email}
                                    name="email"
                                    onChange={e => onChangeHandler(e)}
                                    type="email"
                                    placeholder="Enter Email"
                                    className="form-control"
                                />
                                {error && <p style={styles.formError}>{error.errors && error.errors.identifier}</p>}
                                {error && <p style={styles.formError}>{error.errors && error.errors.email}</p>}
                                {error && <p style={styles.formError}>{error.errors && error.errors.username}</p>}
                            </div>
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    value={password}
                                    name="password"
                                    onChange={e => onChangeHandler(e)}
                                    type="password"
                                    placeholder="Enter Password"
                                    className="form-control"
                                />
                                {error && <p style={styles.formError}>{error.errors && error.errors.password}</p>}
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
                                    SIGN UP
                                </button>
                            </div>
                            )}
                            <div className="form-group col-md-12">
                                <Link to={{
                                    pathname: '/signin',
                                    state: { cart: props.location.state && props.location.state.cart ? true : false }
                                    }} className="btn" style={{color: '#023a9c', fontWeight: 'bold'}}>
                                    Already a User? Login
                                </Link>
                            </div>
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