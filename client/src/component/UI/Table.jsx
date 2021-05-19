import React, { Component } from "react";

class TableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    {this.props.columns.filter(header => typeof this.props.row[header] !== 'object')
                        .map((header, _i) => <th key={`${'table-head-' + header}`}>{header}</th>)
                    }
                </tr>
            </thead>
        )
    }
}

class TableRow extends Component {
    render() {
        return (
            <tr>
                {this.props.columns.filter(field => typeof this.props.row[field] !== 'object').map((field, _i) => {
                    return (<td key={`${'table-cell-' + field}`}>{this.props.row[field]}</td>)
                })}
                {this.props.isImg ? <td><img className="table-product-img" src={"http://localhost:5005/" + (this.props.row[this.props.isImg].length ? this.props.row[this.props.isImg][0]['image_path'] : "")} /></td> : ""}
            </tr>
        )
    }
}

class Table extends Component {
    render() {
        let component;
        if (this.props.data && this.props.data.length) {
            let headers = Object.keys(this.props.data[0])
            if (this.props.columns) {
                headers = this.props.columns
            }
            component = (<table className={"table" + this.props.className}>
                <TableHeader columns={headers} row={this.props.data[0]} />
                <tbody>
                    {this.props.data.map((row, _i) => <TableRow columns={headers} key={`${'table-row-' + _i}`}
                        row={row} isImg={this.props.isImg}
                    />)}
                </tbody>
            </table>)

        } else {
            component = <div><strong>Invalid or Empty Data Source</strong></div>
        }

        return (
            <div>
                { component}
            </div>
        )
    }
}

export default Table