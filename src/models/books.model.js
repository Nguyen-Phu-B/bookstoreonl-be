import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const BooksSchema = new mongoose.Schema(
    {
        nameBook: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            default: "Đang cập nhật",
        },
        author: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        supplier: {
            type: String,
            required: true,
        },
        kinds: {
            type: [String],
            required: true,
        },
        pageNumbers: {
            type: Number,
            default: 0,
        },
        img: {
            type: String,
            default: "https://nhasachtritue.com.vn/Content/UserFiles/Images/nha-sach/SKD004_1.jpg",
        },
        form: {
            type: String,
            default: "Đang cập nhật",
        },
        quantily: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: "Đang cập nhật",
        },
        price: {
            type: Number,
            required: true,
        },
        rePrice: {
            type: Number,
        },
        discount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

BooksSchema.plugin(mongoosePaginate);

const BooksModel = mongoose.model("Books", BooksSchema);

BooksModel.paginate().then({});
export default BooksModel;
