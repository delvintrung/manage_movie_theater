import mongoose, {Schema} from "mongoose";

interface ITicket {
    booking_id: Schema.Types.ObjectId ;
    seat_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    price: number;
}


const TicketSchema = new Schema<ITicket>({
    booking_id: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: [true, 'Booking is required'],
    },
    seat_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seat',
        required: [true, 'Seat is required'],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    price: {
        type: Number,
    }
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema);