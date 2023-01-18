import Category from '../models/category';
import {Book} from '../models/book';

export const CATEGORIES: Category[] = [
    new Category('c1', 'Fatasy', '#f5428d'),
    new Category('c2', 'Adventure stories', '#f54242'),
    new Category('c3', 'Classics', '#f5a442'),
    new Category('c4', 'Crime', '#f5d142'),
    new Category('c5', 'Horror', '#368dff'),
    new Category('c6', 'Humour and satire', '#41d95d'),
    new Category('c7', 'Poetry', '#9eecff'),
    new Category('c8', 'Plays', '#b9ffb0'),
    new Category('c9', 'Autobiography, biography and memoir', '#ffc7ff'),
    new Category('c10', 'Essays', '#47fced')
];

export const BOOKS: Book[] = [
    new Book('b1',
        ['c1', 'c2'],
        'Promise of Blood',
        'Brian McClellan',
        'https://images.gr-assets.com/books/1350337505m/15790883.jpg',
        's1'
    ),
    new Book('b2',
        ['c2', 'c4'],
        'The Lion\'s Game',
        'Nelson DeMille',
        'https://nelsondemille.net/wp-content/uploads/2016/07/the-lions-game.png',
        's1'
    ),
    new Book('b3',
        ['c3', 'c6'],
        'Das Parfum. Die Geschichte eines Mörders',
        'Patrick Süskind, John E. Woods',
        'https://images.gr-assets.com/books/1409112276m/343.jpg',
        's1'
    ),
    new Book('b4',
        ['c4', 'c8'],
        'Best Friends with a Self-Confessed Player',
        'Kirsty Moseley',
        'https://images.gr-assets.com/books/1438766503m/16301111.jpg',
        's1'
    ),
];