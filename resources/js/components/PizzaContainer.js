import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCart, setSnackbar } from "../actions/";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";

class PizzaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };
    }

    incrementQty() {
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    decrementQty() {
        if (this.state.quantity > 1) {
            this.setState({
                quantity: this.state.quantity - 1
            });
        }
    }

    addToCart(pizza) {
        const data = {
            id: pizza.id,
            name: pizza.name,
            price: pizza.price,
            quantity: this.state.quantity
        };

        const cartIcon = document.getElementById("cartIcon");

        axios
            .post("api/cart/add", data)
            .then(response => {
                this.props.updateCart(response.data.cart);

                const snackbar = {
                    snackbarOpen: true,
                    snackbarMessage: response.data.message,
                    snackbarType: "success"
                };

                cartIcon.classList.add("shakeme");
                setTimeout(function() {
                    cartIcon.classList.remove("shakeme");
                }, 1800);

                this.props.setSnackbar(snackbar);
            })
            .catch(error => {
                console.log(error);
            });
    }

    countPrice(price, currency) {
        let symbol = currency.symbol;
        let modified = price * currency.modifier;
        return symbol + modified.toFixed(2);
    }

    render() {
        return (
            <div className="col-12 col-sm-6 col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-center">{this.props.pizza.name}</h1>
                        <div>
                            <img
                                src={this.props.pizza.image}
                                style={{ width: "100%", objectFit: "cover" }}
                            />
                        </div>

                        <h3 className="text-center mb-4">
                            {this.countPrice(
                                this.props.pizza.price,
                                this.props.currency
                            )}
                        </h3>

                        <div className="col">
                            <div className="text-center">
                                <h3>Quantity</h3>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button
                                        className="btn btn-s "
                                        onClick={() => this.decrementQty()}
                                    >
                                        <span className="material-icons align-middle text-lightgreen">
                                            remove_circle
                                        </span>
                                    </button>
                                    <span className="h3 mx-2 mb-0">
                                        {this.state.quantity}
                                    </span>
                                    <button
                                        className="btn btn-sm "
                                        onClick={() => this.incrementQty()}
                                    >
                                        <span className="material-icons align-middle text-lightgreen">
                                            add_circle
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <Button
                                className="mt-3 bg-primary text-white"
                                fullWidth
                                endIcon={<AddShoppingCartIcon />}
                                onClick={() => this.addToCart(this.props.pizza)}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currency: state.currency
    };
};

const mapDispatchToProps = () => {
    return {
        updateCart,
        setSnackbar
    };
};
export default connect(mapStateToProps, mapDispatchToProps())(PizzaContainer);
