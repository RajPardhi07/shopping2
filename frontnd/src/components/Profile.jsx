import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";


const Profile = () => {
  return (
    <div>
      <div className='admin-table-container'>

        <table className="admin-table">
          <thead className="admin-table-head">
            <tr>
              <th className="admin-table-cell">#</th>
              <th className="admin-table-cell">Component</th>
              <th className="admin-table-cell">Date Received</th>
              <th className="admin-table-cell">Balance Items</th>
              <th className="admin-table-cell">QR Code</th>
              <th className="admin-table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="admin-table-body">

            <tr >
              <td className="admin-table-cell">1</td>
              <td className="admin-table-cell">ddd</td>
              <td className="admin-table-cell">33</td>
              <td className="admin-table-cell">76</td>
              <td className="admin-table-cell">
                <a href="" download>   <img
                  src=""
                  alt="QR Code"
                  className="admin-qr-code"
                /></a>
              </td>
              <td className="admin-table-cell">
                <button className="admin-delete-btn">
                  <MdDelete className="admin-icon" />
                </button>
                <button className="admin-edit-btn">
                  <MdEdit className="admin-icon" />
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Profile