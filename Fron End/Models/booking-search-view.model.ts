import { BookingStatusViewModel } from "./booking-status-view.model";

export class BookingSearchViewModel {
    public From: Date;
    public To: Date;
    public BookingStatus: BookingStatusViewModel = new BookingStatusViewModel();
    public ProductId: number;
    public PaxName: string = "";
    public ClientId: number;
    public ProviderId: number;
    public FenixId: string = "";
}