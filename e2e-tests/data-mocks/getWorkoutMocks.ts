const WORKOUT_LIST = [
  {
    "id": "8ff08358-8bde-44dd-8a0b-d27166943b49",
    "title": "Тренировка",
    "duration_minutes": 76,
    "finished_at": "2026-06-23T06:10:53.728+00:00",
    "total_sets": 1,
    "total_volume": 2,
    "workout_exercises": [
      {
        "exercises": {
          "name": "Жим гантелей сидя"
        },
        "total_sets": 1
      }
    ]
  },
  {
    "id": "f7b5de1f-be4d-4f32-b181-9bbd3faf5758",
    "title": "Тренировка",
    "duration_minutes": 73,
    "finished_at": "2026-06-23T06:08:01.168+00:00",
    "total_sets": 1,
    "total_volume": 2,
    "workout_exercises": [
      {
        "exercises": {
          "name": "Жим гантелей сидя"
        },
        "total_sets": 1
      }
    ]
  },
  {
    "id": "61c95fa4-b633-47fd-b0f5-ab2360d4d8d5",
    "title": "Тренировка",
    "duration_minutes": 0,
    "finished_at": "2026-06-23T03:50:55.144+00:00",
    "total_sets": 1,
    "total_volume": 25,
    "workout_exercises": [
      {
        "exercises": {
          "name": "Жим штанги лежа"
        },
        "total_sets": 1
      }
    ]
  },
  {
    "id": "0c660576-832c-4fe7-9dff-15f0364ff74e",
    "title": "Тренировка",
    "duration_minutes": 17,
    "finished_at": "2026-06-20T06:07:29.549+00:00",
    "total_sets": 1,
    "total_volume": 2,
    "workout_exercises": [
      {
        "exercises": {
          "name": "Жим штанги лежа"
        },
        "total_sets": 1
      }
    ]
  },
  {
    "id": "42c81f4c-24c2-48e2-ba4f-b69b5fed7c47",
    "title": "Тренировка",
    "duration_minutes": 2,
    "finished_at": "2026-06-20T05:44:03.813+00:00",
    "total_sets": 1,
    "total_volume": 23,
    "workout_exercises": [
      {
        "exercises": {
          "name": "Жим гантелей сидя"
        },
        "total_sets": 1
      }
    ]
  }
]

const NEW_WORKOUT_MOCK = {
  id: "e2e",
  title: "e2e test",
  duration_minutes: 20,
  finished_at: "2026-06-23T07:22:14.686+00:00",
  total_sets: 1,
  total_volume: 20,
  workout_exercises: [
    {
      exercises: {
        name: "e2e",
      },
      total_sets: 1,
    },
  ],
}

const NEW_WORKOUT_MOCK_DETAILS = {
  id: "e2e",
  title: "e2e",
  finished_at: "2026-06-23T07:22:14.686+00:00",
  duration_minutes: 20,
  total_volume: 20,
  total_sets: 1,
  workout_exercises: [
    {
      sets: [
        {
          reps: 2,
          weight: 2,
          order_index: 0,
        },
      ],
      exercises: {
        name: "e2e",
      },
      total_sets: 1,
      exercise_id: "4a42bc05-2e39-4583-97f5-bd67b1193a9d",
      total_volume: 20,
    },
  ],
}

export type WorkoutListType = typeof WORKOUT_LIST
export type NewWorkoutType = typeof NEW_WORKOUT_MOCK
export type NewWorkoutDetails = typeof NEW_WORKOUT_MOCK_DETAILS

export const getWorkoutMocks = () => {

  return {
    workoutList: [...WORKOUT_LIST],
    newWorkout: {...NEW_WORKOUT_MOCK},
    newWorkoutDetails: {...NEW_WORKOUT_MOCK_DETAILS}
  }

}