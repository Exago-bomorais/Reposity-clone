export type BookTestDTO = {
  id?: number;
  title: string;
  description: string;
  bar_code: string;
  author?: boolean | string;
};

export type BookUpdateDTO = {
  id?: number;
  title: string;
  description: string;
  bar_code: string;
};
