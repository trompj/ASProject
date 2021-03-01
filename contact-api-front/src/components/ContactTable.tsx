// ContactTable
// Justin Tromp
// Utilizes react bootstrap table 2 and custom solutions to display paginated results of contacts table from API.
// Options to delete, update, and insert new rows in the table through the API exist.
// TODO: - Currently update state directly, which is not ideal. But do so to keep from endless state updates. Look into
//         alternative in future release.

import {Component} from "react";
import * as React from "react";
import {Button} from "react-bootstrap";
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import {InsertUpdatePopup} from './InsertUpdatePopup';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import { format } from "date-fns";
import "../styles/Table.css";

class ContactTable extends Component {
    state = {
        contacts: [],
        show: false,
        currId: null
    };

    // Sets popup to show
    showModal = () => {
        this.setState({currId: null});
        this.setState({ show: true });
    };

    // Sets popup for update to show
    showPopupModal = (id: any) => {
        this.setState({currId: id});
        this.setState({show: true});
    };

    // Sets popup to hide
    hideModal = () => {
        this.setState({ show: false });
    };

    // Format date for table friendly view
    formatDates(data: any) {
        for (let i = 0; i < data.length; i++) {
            let date = new Date(data[i].dateUpdated);
            let formattedDate = format(date, "P");

            data[i].dateCreated = formattedDate;

            date = new Date(data[i].dateUpdated);
            formattedDate = format(date, "P");

            data[i].dateUpdated = formattedDate;
        }

        return data;
    }

    // Delete row from contacts table
    // No API call is made if 204 is returned as table is updated internally. If 204 is not returned, then error
    // occurred and state is set to reload table.
    // TODO: - Quickly clicking delete repeatedly may be too quick for system to keep up. May want to look into
    //         other alternatives to the simple alert method.
    deleteRow(id: number) {
        // Set DELETE request for contacts and make request
        const postReqOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        fetch(`http://localhost:3000/api/contacts/${id}`, postReqOptions)
            .then(res => {
                    // Check status code, if not 204 then output to console and table is not updated
                    // TODO: - Better alert system and more robust error checking
                    if (res.status !== 204) {
                        console.log(res.statusText);
                        alert("Entity was unable to be deleted. See console for more information.");
                    }
                    else {
                            fetch('http://localhost:3000/api/contacts')
                                .then(res => res.json())
                                .then((data) => {
                                    this.setState({ contacts: data });
                                    console.log(data);
                                })
                                .catch(console.log);
                    }
                }
            )
            .catch(console.log);
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/contacts')
            .then(res => res.json())
            .then((data) => {
              this.setState({ contacts: data });
            })
            .catch(console.log);
    }

    // Action buttons to be displayed in column
    // TODO: - Should add a mobile friendly version, such as a drop down menu
    actionButtons = (cell: any, row: any) => {
        this.state.currId = row.id;
        return (
            <div className="action-button-div">
                <Button
                    variant="danger"
                    onClick={() => {
                        this.deleteRow(row.id);
                    }}
                >
                    Delete
                </Button>
                <Button
                    variant="warning"
                    value={row.id}
                    onClick={() => this.showPopupModal(row.id)}
                >
                    Update
                </Button>
            </div>
        );
    };

    render() {
        const columns = [{
            dataField: 'id',
            text: 'Contact ID',
            sort: true,
            style: { width: '10px' }
        }, {
            dataField: 'dateCreated',
            text: 'Date Created',
            sort: true
        }, {
            dataField: 'dateUpdated',
            text: 'Date Updated',
            sort: true
        }, {
            dataField: 'firstName',
            text: 'First Name',
            sort: true
        }, {
            dataField: 'lastName',
            text: 'Last Name',
            sort: true
        },{
            dataField: 'emailAddress',
            text: 'Email Address',
            sort: true
        },{
            dataField: "actions",
            text: "Actions",                // TODO: - Throws warning for state update placement. Works as expected but
            formatter: this.actionButtons,  //         should clean up with next release and fix warning.
        },
        ];

        // Pagination setup for table
        const pagination = paginationFactory({
            page: 1,                    // Default starting page
            sizePerPage: 10,            // Rows to show per page
            lastPageText: '>>',         //
            firstPageText: '<<',
            nextPageText: '>',
            prePageText: '<',
            showTotal: true,            // Show total row information
            alwaysShowAllBtns: true,    // Show all buttons on pagination
            onPageChange: function (page, sizePerPage) {
                console.log('page', page);
                console.log('sizePerPage', sizePerPage);
            },
            onSizePerPageChange: function (page, sizePerPage) {
                console.log('page', page);
                console.log('sizePerPage', sizePerPage);
            }
        });

        return (
            <div>
                <InsertUpdatePopup show={this.state.show} handleClose={this.hideModal} id={this.state.currId}/>

                <Button className="mb-2" type="button" onClick={this.showModal}>Add Contact</Button>
                <BootstrapTable
                    keyField={"id"}
                    data={this.formatDates(this.state.contacts)}
                    columns={columns}
                    pagination={ pagination }
                />
            </div>
        );
    }
}

export default ContactTable;