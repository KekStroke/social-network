interface IModelBase {
  id: number;
  // createdAt: number;
  // updatedAt: number;
}

export interface User extends IModelBase {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Post extends IModelBase {
  images: string[];
  content: string;
  authorId: number;
}
