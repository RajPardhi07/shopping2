import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updatedData } from "../redux/user/userSlice"; // Adjust the import path as needed

const Edit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { qrCodes } = useSelector((state) => state.auth); // Access qrCodes array from auth state
    const qrCode = qrCodes.find((code) => code._id === id);

    console.log("qrcode id", qrCode);


    const [editData, setEditData] = useState({
        components: '',
        dateReceived: '',
        balanceItem: ''
    });

    useEffect(() => {
        if (qrCode) {
            setEditData({
                components: qrCode.components,
                dateReceived: new Date(qrCode.dateReceived).toISOString().split('T')[0],
                balanceItem: qrCode.balanceItem
            });
        }
    }, [qrCode]);




    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatedData({ id, updatedData: editData }))
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Failed to edit QR code:', error);
            });
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>

                <div className="ml-10">
                    <h1 className="text-center mt-3 text-white text-3xl">QRgenerator</h1>
                    <div className="flex flex-col mt-3">
                        <label>Components</label>


                        <input type="text" value={editData.components}
                            onChange={(e) => setEditData({ ...editData, components: e.target.value })} />
                    </div>
                    <div className="flex flex-col mt-3">
                        <label>Date</label>
                        <input
                            name="dateReceived"
                            type="date"
                            value={editData.dateReceived}
                            onChange={(e) => setEditData({ ...editData, dateReceived: e.target.value })}
                            className="w-[25vw] outline-none rounded-md h-[6vh]"
                        />
                    </div>
                    <div className="flex flex-col mt-3">
                        <label>Item Received:</label>
                        <input
                            name="balanceItem"
                            type="number"
                            value={editData.balanceItem}
                            onChange={(e) => setEditData({ ...editData, balanceItem: e.target.value })}
                            className="w-[25vw] outline-none rounded-md h-[6vh]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-[25vw] rounded-md h-[6vh] bg-blue-800 text-white mt-5"
                    >
                        Update
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Edit;
