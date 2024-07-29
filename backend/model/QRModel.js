import mongoose from "mongoose";


const qrSchema = new mongoose.Schema({
    name:String,
    components:String,
    partNumber: String,
    dateDispatch: Date,
    dateReceived:Date,
    balanceItem:Number,
    qrIdentifier:String,
    qrCode:String,
    dispatchItems:Number,
})

export default mongoose.model("QRModel", qrSchema);