const diaryData = {
  diaryWithCompleteDetails: {
    name: 'Andrew Childhood',
    desc: 'My childhood experiences and memories',
    type: 'public',
    userId: 1,
  },
  diaryWithNameAsSpace: {
    name: '     ',
    desc: 'My childhood experiences and memories',
    type: 'public',
    userId: 1,
  },
  diaryWithDescAsSpace: {
    name: 'Andrew Childhood',
    desc: '      ',
    type: 'public',
    userId: 1,
  },
  diaryWithWrongType: {
    name: 'Andrew Childhood',
    desc: 'My childhood experiences and memories',
    type: 'wrongType',
    userId: 1,
  },
};
export default diaryData;
