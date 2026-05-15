export type Message = {
  _id: string;
  senderId: string;
  receivedId: string;
  text: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  fullname: string;
  email: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
};
