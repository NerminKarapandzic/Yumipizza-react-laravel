import React, { Component } from "react";
import { changeCurrency } from "../actions/";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles(theme => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px"
    }
}))(Badge);

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pizzas: []
        };
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        YumiPizza
                    </Link>

                    <ul className="navbar-nav ml-auto">
                        <select
                            className="custom-select"
                            onChange={e =>
                                this.props.changeCurrency(e.target.value)
                            }
                        >
                            <option value="euro">€</option>
                            <option value="dollar">$</option>
                        </select>
                    </ul>

                    <div>
                        <Link to="/cart">
                            <IconButton aria-label="cart" id="cartIcon">
                                <StyledBadge
                                    badgeContent={this.props.cartCount}
                                    color="secondary"
                                >
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        currency: state.currency,
        cartCount: state.cart.count
    };
};

const mapDispatchToProps = () => {
    return {
        changeCurrency
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Navbar);
