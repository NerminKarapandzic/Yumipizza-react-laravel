import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, closeSnackbar } from "../actions/";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Navbar from "./Navbar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pizzas: []
        };
    }

    componentDidMount() {
        //get the cart
        axios.get("api/cart").then(response => {
            console.log(response.data.cart);
            this.props.getCart(response.data.cart);
        });
    }

    render() {
        const closeSnackbar = () => {
            return this.props.closeSnackbar;
        };

        return (
            <div>
                <Navbar />

                <Snackbar
                    open={this.props.snackbarOpen}
                    autoHideDuration={6000}
                    onClose={closeSnackbar()}
                >
                    <Alert
                        onClose={closeSnackbar()}
                        severity={this.props.snackbarType}
                    >
                        {this.props.snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        snackbarOpen: state.snackbar.snackbarOpen,
        snackbarType: state.snackbar.snackbarType,
        snackbarMessage: state.snackbar.snackbarMessage
    };
};

const mapDispatchToProps = () => {
    return {
        getCart,
        closeSnackbar
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
