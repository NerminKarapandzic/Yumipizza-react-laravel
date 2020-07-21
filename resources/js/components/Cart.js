import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ConfirmDialog from "./confirmDialog";
import Axios from "axios";
import { updateCart, setSnackbar } from "../actions/";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            adress: "",
            city: "",
            email: "",
            postal: "",
            errors: {},
            errorMessage: "",
            valid: false,
            dialog: false
        };
    }

    handleOpenDialog() {
        let fields = {
            name: this.state.name,
            adress: this.state.adress,
            city: this.state.city,
            email: this.state.email,
            postal: this.state.postal
        };

        let validationErrors = {};
        Object.keys(fields).map(function(key) {
            if (!fields[key]) {
                validationErrors[key] = key + " is required";
            }
        });
        this.setState(state => {
            const errors = validationErrors;
            return { ...state, errors };
        });

        if (Object.keys(validationErrors).length == 0) {
            this.setState({
                dialog: true
            });
        }
    }

    async clearCart(message) {
        await axios
            .post("api/cart/clear")
            .then(response => {
                this.props.updateCart(response.data.cart);
            })
            .catch(error => {
                console.log(error);
            });

        const snackbar = {
            snackbarOpen: true,
            snackbarMessage: message,
            snackbarType: "success"
        };

        this.props.setSnackbar(snackbar);
    }

    handleSendOrder(cart, info) {
        axios
            .post("/api/order", {
                cart: cart,
                name: info.name,
                adress: info.adress,
                city: info.city,
                email: info.email,
                postal: info.postal
            })
            .then(response => {
                this.setState({ dialog: false });

                this.clearCart(response.data.message);
            })
            .catch(error => {
                this.setState(state => {
                    let errorMessage = error.response.data.message;
                    let errors = error.response.data.errors;

                    return { ...state, errorMessage, errors, dialog: false };
                });

                const snackbar = {
                    snackbarOpen: true,
                    snackbarMessage: error.response.data.message,
                    snackbarType: "error"
                };

                this.props.setSnackbar(snackbar);
            });
    }

    handleCloseDialog() {
        this.setState({
            dialog: false
        });
    }

    remove(item) {
        Axios.post("api/cart/remove", item)
            .then(response => {
                this.props.updateCart(response.data.cart);

                const snackbar = {
                    snackbarOpen: true,
                    snackbarMessage: response.data.message,
                    snackbarType: "warning"
                };

                this.props.setSnackbar(snackbar);
            })
            .catch(error => {});
    }

    items() {
        return Object.keys(this.props.items).map(key => {
            return (
                <tr key={this.props.items[key].id}>
                    <th className="p-4">
                        {this.props.items[key].name}
                        <Button
                            onClick={() => this.remove(this.props.items[key])}
                            variant="text"
                            className="ml-2 p-0"
                            endIcon={<DeleteIcon />}
                        >
                            Remove
                        </Button>
                    </th>
                    <th className="text-center p-4">
                        {this.props.items[key].quantity}
                    </th>
                    <th className="text-right p-4">
                        {this.countPrice(
                            this.props.items[key].price *
                                this.props.items[key].quantity,
                            this.props.currency
                        )}
                    </th>
                </tr>
            );
        });
    }

    countPrice(price, currency) {
        let symbol = currency.symbol;
        let modified = price * currency.modifier;
        return symbol + modified.toFixed(2);
    }

    handleChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    renderCart(cart, info) {
        if (this.props.count > 0) {
            return (
                <div className="row">
                    <div className="col-12 col-lg-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="p-4">
                                        Item
                                    </th>
                                    <th scope="col" className="text-center p-4">
                                        Quantity
                                    </th>
                                    <th scope="col" className="text-right p-4">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{this.items()}</tbody>
                        </table>

                        <p className="text-right px-4 font-weight-bold">
                            Delivery cost:{" "}
                            {this.props.items.length != 0
                                ? this.countPrice(5, this.props.currency)
                                : ""}
                        </p>
                        <p className="text-right px-4 font-weight-bold">
                            Amount to pay:{" "}
                            {this.props.items.length != 0
                                ? this.countPrice(
                                      this.props.total + 5,
                                      this.props.currency
                                  )
                                : ""}
                        </p>
                    </div>
                    <div className="col-12 col-lg-7 text-center mt-4 mt-lg-0">
                        <div className="mx-lg-5 card px-4 py-3">
                            <TextField
                                error={this.state.errors.name ? true : false}
                                helperText={this.state.errors.name}
                                className="w-100 mt-3"
                                id="name"
                                label="Name"
                                onChange={e =>
                                    this.handleChange("name", e.target.value)
                                }
                            ></TextField>
                            <TextField
                                error={this.state.errors.adress ? true : false}
                                helperText={this.state.errors.adress}
                                className="w-100 mt-3"
                                id="adress"
                                label="Adress"
                                onChange={e =>
                                    this.handleChange("adress", e.target.value)
                                }
                            ></TextField>
                            <TextField
                                error={this.state.errors.city ? true : false}
                                helperText={this.state.errors.city}
                                className="w-100 mt-3"
                                id="city"
                                label="City"
                                onChange={e =>
                                    this.handleChange("city", e.target.value)
                                }
                            ></TextField>
                            <TextField
                                error={this.state.errors.email ? true : false}
                                helperText={this.state.errors.email}
                                className="w-100 mt-3"
                                id="email"
                                label="E-mail"
                                onChange={e =>
                                    this.handleChange("email", e.target.value)
                                }
                            ></TextField>
                            <TextField
                                error={this.state.errors.postal ? true : false}
                                helperText={this.state.errors.postal}
                                className="w-100 mt-3"
                                id="postal"
                                label="Postal Code"
                                onChange={e =>
                                    this.handleChange("postal", e.target.value)
                                }
                            ></TextField>
                            <ConfirmDialog
                                open={this.state.dialog}
                                openDialog={this.handleOpenDialog.bind(this)}
                                closeDialog={this.handleCloseDialog.bind(this)}
                                cart={cart}
                                sendOrder={() => {
                                    this.handleSendOrder(cart, info);
                                }}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <h3>Your cart is empty. </h3>;
        }
    }

    render() {
        const info = {
            name: this.state.name,
            adress: this.state.adress,
            email: this.state.email,
            city: this.state.city,
            postal: this.state.postal
        };

        const cart = {
            items: this.props.items,
            count: this.props.count,
            total: this.countPrice(this.props.total + 5, this.props.currency)
        };
        return (
            <div className="container pt-4">
                <div className="alert alert-primary">
                    <p className="mb-0 font-weight-bold">
                        You have {this.props.count} items in cart
                    </p>
                </div>
                {this.renderCart(cart, info)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currency: state.currency,
        items: state.cart.items,
        total: state.cart.total,
        count: state.cart.count
    };
};

const mapDispatchToProps = () => {
    return {
        updateCart,
        setSnackbar
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Cart);
