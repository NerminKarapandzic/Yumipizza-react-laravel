import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import SendIcon from "@material-ui/icons/Send";

class ConfirmDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button
                    variant="text"
                    onClick={this.props.openDialog}
                    className="mt-3 bg-primary text-white w-100"
                    endIcon={<SendIcon />}
                >
                    Place your order
                </Button>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.closeDialog}
                    aria-labelledby="confirm-your-order"
                    aria-describedby="confirm-your-order"
                    className="p-5"
                    maxWidth="sm"
                    fullWidth={true}
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        className="text-center"
                    >
                        {"Confirm your order"}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description "
                            className="text-center h4"
                        >
                            Total items: {this.props.cart.count}
                        </DialogContentText>

                        <DialogContentText
                            id="alert-dialog-description "
                            className="text-center h4"
                        >
                            Total value with delivery:{this.props.cart.total}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className="justify-content-center">
                        <Button color="primary" onClick={this.props.sendOrder}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmDialog;
