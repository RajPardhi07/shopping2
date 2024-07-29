import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateQR } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const QRgenerator = () => {
    const [components, setComponents] = useState('');
    const [dateReceived, setDateReceived] = useState('');
    const [itemsReceived, setItemsReceived] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const qrCode = useSelector((state) => state.auth.qrCode);
    console.log("qrCodedata", qrCode)


    const handleSubmit = () => {
        dispatch(generateQR({ components, dateReceived, itemsReceived })).then(() => {
            navigate('/')
        })
    }


    return (
        <div className="w-full h-[90vh] flex items-center justify-center bg-white ">
            <div className="w-[30vw] h-[60vh] rounded-md shadow-lg bg-zinc-400">


                <h1 className="text-center mt-3 text-white text-3xl">QRgenerator</h1>
                <div className="ml-10">

                    <div className="flex flex-col mt-3">
                        <label>Components</label>
                        <select value={components} onChange={(e) => setComponents(e.target.value)} className="w-[25vw] outline-none  h-[6vh] rounded-md">
                            <option value="">Select Components</option>
                            <option value="c1">C1</option>
                            <option value="c2">C2</option>
                            <option value="c3">C3</option>
                            <option value="c4">C4</option>
                        </select>
                    </div>

                    <div className="flex flex-col mt-3">
                        <label>Date</label>
                        <input value={dateReceived} onChange={(e) => setDateReceived(e.target.value)} className="w-[25vw] outline-none rounded-md h-[6vh]" type="date" />
                    </div>
                    <div className="flex flex-col mt-3">
                        <label>Item Received:</label>
                        <input value={itemsReceived} onChange={(e) => setItemsReceived(e.target.value)} className="w-[25vw] outline-none rounded-md h-[6vh]" type="number" />
                    </div>

                    <button onClick={handleSubmit} className="w-[25vw] rounded-md h-[6vh] bg-blue-800 text-white mt-5"
                    >Generate QR</button>

                    {qrCode && (
                        <div className="mt-5">
                            <img src={qrCode} alt="" />
                        </div>
                    )}
                </div>


            </div>
        </div>
    )
}

export default QRgenerator