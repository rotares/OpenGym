export const createStoreState = (
  overrides = {}
) => ({
  workout: {
    title: 'Тренировка',
    id: 'NWvjiG230J_seiR6Q9uat',
    status: 'active' as const,
    startedAt: '2026-06-14T14:23:12.058Z',
    finishedAt: null,
    exercises: [
      {
        id: 'TEi0xw9LgHzyhWAMYJjKZ',
        exerciseId: '1ff7ea8c-c526-4f51-9ef1-a8f67dbb1dda',
        name: 'Выпады с гантелями',
        sets: [
          {
            id: 'F7cxln-qut9vo_Iqq5N_i',
            reps: '',
            weight: '',
            completed: false
          },
          {
            id: 'F7cln-qut9vo_Iqq5N',
            reps: '',
            weight: '',
            completed: false
          }
        ]
      }
    ]
  },
  mode: 'create' as const,
  ...overrides
})