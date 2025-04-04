const data = () => [
  {
    description: 'Completed task',
    classWrapper: 'completed',
    created: Date.now(),
    id: 1,
    valueMin: 43,
    valueSec: 24,
    play: true,
  },
  {
    description: 'Editing task',
    classWrapper: 'editing',
    created: Date.now(),
    id: 2,
    valueMin: 13,
    valueSec: 24,
    play: true,
  },
  {
    description: 'Active task',
    classWrapper: '',
    created: Date.now(),
    id: 3,
    valueMin: 1,
    valueSec: 1,
    play: true,
  },
];

export default data;
