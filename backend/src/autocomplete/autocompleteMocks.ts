import { TedTalk } from '../data/data.types';

export const mockTedTalkData: string = [
  'Title,Author,Date,Views,Likes,Link',
  'How to Test,John Doe,2020-01-01,1000,500,link1',
  'Testing in Practice,Jane Doe,2020-02-01,2000,1000,link2',
  'Effective Testing,John Smith,2020-03-01,3000,1500,link3',
].join('\n');

export const expectedSuggestions: TedTalk[] = [
  {
    title: 'How to Test',
    author: 'John Doe',
    date: '2020-01-01',
    views: '1000',
    likes: '500',
    link: 'link1',
  },
  {
    title: 'Testing in Practice',
    author: 'Jane Doe',
    date: '2020-02-01',
    views: '2000',
    likes: '1000',
    link: 'link2',
  },
];
