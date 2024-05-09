import asyncHandler from "express-async-handler";
import BadRequestError from "../errors/BadRequestError.js";
import BooksModel from "../models/books.model.js";

const BooksController = {
    addBook: asyncHandler(async (req, res) => {
        const { nameBook, author, publisher, supplier, kinds, price, discount, rePrice } = req.body;
        const books = await BooksModel.create({
            nameBook,
            author,
            publisher,
            supplier,
            kinds,
            rePrice: price - (price * discount) / 100,
            price,
            discount,
        });
        res.status(200).json(books);
    }),

    getFindProduct: asyncHandler(async (req, res) => {
        const { name } = req.query;
        const products = await BooksModel.find({ nameBook: { $regex: name, $options: "i" } });
        res.status(200).json(products);
    }),

    getBookById: asyncHandler(async (req, res) => {
        const { bookId } = req.params;

        const book = await BooksModel.findById(bookId);

        if (!book) {
            return BadRequestError.sendErrorResponse(res, "Không tìm thấy sách");
        }

        res.status(200).json(book);
    }),

    getAllBooks: asyncHandler(async (req, res) => {
        const page = req.query.page;
        const createdAtValue = req.query.createdAt;

        const options = {
            page,
            limit: 8,
            sort: { createdAt: -1 },
        };

        if (page && createdAtValue) {
            options.page = page;
            options.paginate = { createdAt: { $1t: new Date(createdAtValue) } };
        } else if (page) {
            options.page = page;
        }

        const allBooks = await BooksModel.paginate({}, options);

        res.status(200).json(allBooks.docs);
    }),

    getTopBooks: asyncHandler(async (req, res) => {
        const page = req.query.page;

        const options = {
            page,
            limit: 8,
            sort: { quantily: -1 },
        };

        const topBooks = await BooksModel.paginate({}, options);

        res.status(200).json(topBooks.docs);
    }),

    getBooksByKind: asyncHandler(async (req, res) => {
        const { kind } = req.params;
        const { page, pageSize } = req.query;

        const skip = Math.max(page - 1, 0) * pageSize;
        console.log("🚀 ~ getBooksByKind:asyncHandler ~ skip:", skip);

        const filterBooksByKind = async (paramKind, skip, limit) => {
            try {
                const allBooks = await BooksModel.find();

                const totalBooks = await allBooks.filter((book) => {
                    const formatKinds = book.kinds.map((kind) =>
                        kind
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .toLowerCase()
                            .replace(/\s+/g, "")
                            .replace(/đ/g, "d")
                    );
                    return formatKinds.includes(paramKind.toLowerCase().trim());
                }).length;

                const totalPages = Math.ceil(totalBooks / pageSize);

                const filterBooks = allBooks
                    .filter((book) => {
                        const formatKinds = book.kinds.map((kind) =>
                            kind
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .replace(/\s+/g, "")
                                .replace(/đ/g, "d")
                        );
                        return formatKinds.includes(paramKind.toLowerCase().trim());
                    })
                    .slice(skip, skip + parseInt(limit));

                return { filterBooks, totalPages };
            } catch (error) {
                console.log("🚀 ~ filterBooksByKind ~ error:", error);
            }
        };

        const books = await filterBooksByKind(kind, skip, pageSize);
        console.log("🚀 ~ getBooksByKind:asyncHandler ~ pageSize:", pageSize);

        res.status(200).json(books);
    }),

    getAllKinds: asyncHandler(async (req, res) => {
        const allKinds = await BooksModel.distinct("kinds");

        const uniqueKinds = [...new Set(allKinds)];

        res.status(200).json(uniqueKinds);
    }),
};

export default BooksController;
