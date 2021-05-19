import React from 'react'

export const ListGroup = (props) => {
    return (<table className="table table-dark bg-dark">
        <tbody>
            {
                props.data.map((list, _i) => <tr key={'row' + _i}
                    className={props.cursor === "true" ? " list-group-item--category" : ""}
                >
                    <td {...(props.cursor === 'true' ? { onClick: () => props.onListSelect(list.id) } : {})}>{list.id}.</td>
                    <td>{list.category_id}</td>
                    <td>{list.name}</td>
                    <td colSpan="2"><button className="btn-sm btn-danger" onClick={() => props.onDelete(props.isSub, list.id)}>DELETE</button></td>
                    <td><button className="btn-sm btn-info" onClick={() => props.onEdit(props.isSub, list)}>EDIT</button></td>
                </tr>)
            }
        </tbody>
    </table>
    )
    // return (<Table columns={['id', 'category_id', 'name']} data={props.data} />)
}