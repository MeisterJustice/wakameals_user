import React, { Component } from 'react';

export default function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentDidMount() {
            let token = localStorage.getItem("token")
            let parsedToken = JSON.parse(token)
            if (typeof parsedToken !== "string") {
                return !this.props.location.pathname === "/checkout" ? this.props.history.push('/signin') :  this.props.history.push({
                    pathname: '/signin',
                    state: { cart: true }
                });
            }
        }
        componentDidUpdate(nextProps) {
            let token = localStorage.getItem("token")
            let parsedToken = JSON.parse(token)
            if (typeof parsedToken !== "string") {
                return this.props.history.push('/signin');
            }
        }
        render() {
            return (
                <div>
                    <ComponentToBeRendered {...this.props} />
                </div>
            )
        }
    }

    return Authenticate;
}