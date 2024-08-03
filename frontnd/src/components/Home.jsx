import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteQRCode, fetchQRCodes } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { qrCodes, status, error } = useSelector((state) => state.auth);


  // console.log("qrcode", qrCodes)

  useEffect(() => {
    dispatch(fetchQRCodes())
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error:{error}</div>
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)

  }

  const handleDelete = (id) => {
    dispatch(deleteQRCode(id))
  }

  return (
    <div className="w-full h-screen">

      <div className="flex items-center justify-center">
        <div className='w-[87vw] mt-[1rem] p-28 flex items-center justify-center shadow-lg'>

          <div className="w-[80vw] overflow-x-auto">


            <table className="w-[100%] border">
              <thead className="bg-slate-200">
                <tr>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Component</th>
                  <th className="p-2 text-left">Date Received</th>
                  <th className="p-2 text-left">Balance Items</th>
                  <th className="p-2 text-left">QR Code</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="admin-table-body">

                {qrCodes && qrCodes?.map((qrCode, index) => (
                   <tr key={qrCode._id}>
                    <td className="p-2 text-left">{index + 1}</td>
                    <td className="p-2 text-left">{qrCode.components}</td>
                    <td className="p-2 text-left">{new Date(qrCode.dateReceived).toLocaleDateString()}</td>
                    <td className="p-2 text-left">{qrCode.balanceItem}</td>
                    <td className="p-2 text-left">
                      <a href={qrCode.qrCode} download>   <img
                        src={qrCode.qrCode}
                        alt="QR Code"
                        className="admin-qr-code"
                      /></a>
                    </td>
                    <td className="p-2 text-left">
                      <button className="admin-delete-btn">
                        <MdDelete onClick={() => handleDelete(qrCode._id)} className="admin-icon" />
                      </button>
                      <button className="admin-edit-btn">
                        <MdEdit onClick={() => handleEdit(qrCode._id)} className="admin-icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home