type TedTalk = {
  title: string;
  author: string;
  date: string;
  views: string;
  likes: string;
  link: string;
};
type TedTalkAPI = {
  find: () => Promise<TedTalk[]>;
  count: () => Promise<number>;
};
export type { TedTalk, TedTalkAPI };
