import React, { useEffect } from "react";
import { CardColumns, Card, Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { REMOVE_BOOK } from "../utils/mutations"

import { removeBookId } from '../utils/localStorage';


const BookList = (userData) => {
 // eslint-disable-next-line
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  useEffect(()=>{
    console.log(userData)
  },[userData])
  const handleDeleteBook = async (bookId) => {


    try {
       // eslint-disable-next-line
      const { data } = await removeBook({ bookId });
      
      //  upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (error) {
      console.error(error);
    }
  }

  if (!userData.length) {
    return <h2>No Saved Books</h2>;
  }

  return (
    <CardColumns>
      {userData.savedBooks.map((book) => {
        return (
          <Card key={book.bookId} border='dark'>
            {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <p className='small'>Authors: {book.authors}</p>
              <Card.Text>{book.description}</Card.Text>
              <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                Delete this Book!
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </CardColumns>
  )
}

export default BookList;