
export class BookTemplate {
  categoryIds: string[]
  title: string
  author: string
  coverUrl: string
  shelfId: string


  constructor(
    categoryIds: string[],
    title: string,
    author: string,
    coverUrl: string,
    shelfId: string
  ) {
    this.categoryIds = categoryIds;
    this.title = title;
    this.author = author;
    this.coverUrl = coverUrl;
    this.shelfId = shelfId;
  }
}

export class Book extends BookTemplate {
  id: string

  constructor(
      id: string | undefined,
      categoryIds: string[],
      title: string,
      author: string,
      coverUrl: string,
      shelfId: string
  ) {
    super(categoryIds, title, author, coverUrl, shelfId);
    this.id = !!id ? id : Math.random().toString();
  }
}