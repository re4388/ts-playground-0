// https://www.jmalvarez.dev/posts/adapter-pattern-typescript
export interface LibraryAdapter {
  getBooks(): { title: string; author: string }[];
}
