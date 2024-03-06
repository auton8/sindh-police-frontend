export const ValidationRulesOptions = [
  {
    id: 1,
    title: 'Date Range',
    category: 'Date validation',
    values: {
      startDate: new Date(),
      endDate: new Date(),
    },
  },
  // {
  //   id: 2,
  //   title: 'Age Comparison',
  //   category: 'Date validation',
  //   rules: {
  //     age: '',
  //   },
  //   Conditions: [
  //     {id: 1, title: 'Equals', has_target: true},
  //     {id: 2, title: 'Does Not Equals', has_target: true},
  //     {id: 3, title: 'Is Empty', has_target: false},
  //     {id: 4, title: 'Is Not Empty', has_target: false},
  //     {id: 5, title: 'Contains', has_target: true},
  //     {id: 6, title: 'Does Not Contain', has_target: true},
  //     {id: 7, title: 'Is A Number', has_target: false},
  //     // { id: 8, title: 'Equals (Number)', has_target: true },
  //     {id: 9, title: 'Less Than', has_target: true},
  //     {id: 10, title: 'Less Than Or Equal', has_target: true},
  //     {id: 11, title: 'Greater Than', has_target: true},
  //     {id: 12, title: 'Greater Than Or Equal', has_target: true},
  //     {id: 15, title: 'Is Null', has_target: false},
  //   ],
  // },
  // {
  //   id: 3,
  //   title: 'Comparison (logical operation)',
  //   category: 'Date validation',
  // },
  // {
  //   id: 4,
  //   title: 'Format  Validation',
  //   category: 'Date validation',
  // },
  {
    id: 5,
    title: 'Number Range',
    category: 'Numbers',
    values: {
      startNumber: '',
      endNumber: '',
    },
  },
  // {
  //   id: 6,
  //   title: 'Comparison',
  //   category: 'Numbers',
  // },
  {
    id: 7,
    title: 'String Length',
    category: 'String',
    values: {
      length: '',
    },
  },
  // {
  //   id: 8,
  //   title: 'Phone Number',
  //   category: 'String',
  // },
  // {
  //   id: 9,
  //   title: 'ID Card',
  //   category: 'String',
  // },
];
