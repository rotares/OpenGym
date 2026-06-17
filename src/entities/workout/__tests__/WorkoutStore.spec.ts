import { useWorkoutStore } from "../model/workoutStore";
import { createStoreState } from "./createStoreState";

describe('Тесты WorkoutStore', () => {

  let mockStore: ReturnType<typeof createStoreState>

  beforeEach(() => {
    mockStore = createStoreState()
  })


  test('Начальное состояние null', () => {
    expect(useWorkoutStore.getState().workout).toBeNull()
    expect(useWorkoutStore.getState().mode).toBeNull()
  })

  test('Тренировка создается и начальные значения инициализируются', () => {
    useWorkoutStore.getState().startWorkout()
    expect(useWorkoutStore.getState().workout).not.toBeNull()
    expect(useWorkoutStore.getState().workout?.status).toBe('active')
    expect(useWorkoutStore.getState().workout?.id).not.toBeNull()
    expect(useWorkoutStore.getState().workout?.title).toBe('Тренировка')
    expect(useWorkoutStore.getState().mode).toBe('create')
  })

  test('Тренировка завершается, зануляется', () => {
    useWorkoutStore.getState().startWorkout()
    useWorkoutStore.getState().cancelWorkout()

    expect(useWorkoutStore.getState().workout).toBeNull()
    expect(useWorkoutStore.getState().mode).toBeNull()
  })

  test('Редактирование существующей тренировки', () => {
    const editMock = {
      id: 'e8b0ca68-bf25-463d-a6c7-93d316320efb',
      title: 'Тренировка',
      status: 'active' as const,
      startedAt: '',
      finishedAt: null,
      exercises: [
        {
          id: 'Gi_GmVkF6QIkcE6gKEEV6',
          exerciseId: '1ff7ea8c-c526-4f51-9ef1-a8f67dbb1dda',
          name: 'Выпады с гантелями',
          sets: [
            {
              id: 'PKDnZ7iyWtItOZISVuFzB',
              reps: '23',
              weight: '32',
              completed: true
            }
          ]
        }
      ]
    }

    useWorkoutStore.getState().editWorkout(editMock)
    expect(useWorkoutStore.getState().workout).toEqual(editMock)
  })

  test('Добавление упражнения', () => {
    const testWorkout = {
      id: 'testId',
      name: 'Тест'
    }

    useWorkoutStore.getState().startWorkout()
    useWorkoutStore.getState().addExercise(testWorkout)

    expect(useWorkoutStore.getState().workout?.exercises.length).toBe(1)
    expect(useWorkoutStore.getState().workout?.exercises[0].exerciseId).toBe(testWorkout.id)

  })

  test('Добавление упражнения создает первый сет', () => {
    const testWorkout = {
      id: 'testId',
      name: 'Тест'
    }

    useWorkoutStore.getState().startWorkout()
    useWorkoutStore.getState().addExercise(testWorkout)

    expect(useWorkoutStore.getState().workout?.exercises[0].sets.length).toBe(1)

  })

  test('add exercise ничего не делает без тренировки', () => {
    useWorkoutStore.getState().addExercise({
      id: '1',
      name: '1'
    })

    expect(useWorkoutStore.getState().addExercise({
      id: '1',
      name: '1'
    })).toBeUndefined()

    expect(useWorkoutStore.getState().workout).toBeNull()
  })

  test('удаление сета у упражнения', () => {
    useWorkoutStore.setState(mockStore)
    useWorkoutStore.getState().removeSet(
      'TEi0xw9LgHzyhWAMYJjKZ',
      'F7cxln-qut9vo_Iqq5N_i'
    )
    
    expect(useWorkoutStore.getState().workout?.exercises[0].sets.length).toBe(1)

  })

  test('обновление сета', () => {

    const exerciseId = mockStore.workout.exercises[0].id
    const setId = mockStore.workout.exercises[0].sets[0].id

    useWorkoutStore.setState(mockStore)
    useWorkoutStore.getState().updateSet({
     exerciseId,
     setId,
     changes: {
      reps: '20',
      weight: '25'
     }
    })

    expect(useWorkoutStore.getState().workout?.exercises[0].sets[0].reps).toBe('20')
    expect(useWorkoutStore.getState().workout?.exercises[0].sets[0].weight).toBe('25')

    useWorkoutStore.getState().updateSet({
      exerciseId,
      setId,
      changes: {
        completed: true
      }
    })
    
    expect(useWorkoutStore.getState().workout?.exercises[0].sets[0].weight).toBeTruthy()

  })


  test('update set ничего не делает при неверном exercise id', () => {
    useWorkoutStore.setState(mockStore)

    expect(useWorkoutStore.getState().updateSet({
      exerciseId: 'invalid',
      setId: 'invalid',
      changes: {
        reps: '25'
      }
    })).toBeUndefined()
  })

  test('setTitle изменяет title', () => {
    const newTitle = 'NewTitle'
    useWorkoutStore.setState(mockStore)
    useWorkoutStore.getState().setTitle(newTitle)
    expect(useWorkoutStore.getState().workout?.title).toBe(newTitle)
  })

  test('setStatus изменяет статус', () => {
    const newStatus = 'saving' as const
    
    useWorkoutStore.setState(mockStore)
    useWorkoutStore.getState().setStatus(newStatus)
    expect(useWorkoutStore.getState().workout?.status).toBe(newStatus)
  })
})