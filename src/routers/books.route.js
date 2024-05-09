import express from "express";
import BooksController from "../controllers/books.controller.js";

const booksRoute = express.Router();

booksRoute.get("/detail/:bookId", BooksController.getBookById);
booksRoute.get("/top", BooksController.getTopBooks);
booksRoute.get("/all", BooksController.getAllBooks);
booksRoute.post("/addbook", BooksController.addBook);
booksRoute.get("/findbooks", BooksController.getFindProduct);
booksRoute.get("/allKinds", BooksController.getAllKinds);
booksRoute.get("/booksByKind/:kind", BooksController.getBooksByKind);

export default booksRoute;
