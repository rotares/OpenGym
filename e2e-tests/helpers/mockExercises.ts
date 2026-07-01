import { Page } from "@playwright/test"

const EXERCISES_MOCK = [
  {
    id: "4a42bc05-2e39-4583-97f5-bd67b1193a9d",
    name: "Жим штанги лежа",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "a1e3b3c7-9bf1-4d56-814c-f9c838877587",
    muscle_group: {
      name: "Грудь",
    },
  },
  {
    id: "7d0b8a85-c488-4b50-853d-a0dee86e8e60",
    name: "Разведение гантелей лежа",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "a1e3b3c7-9bf1-4d56-814c-f9c838877587",
    muscle_group: {
      name: "Грудь",
    },
  },
  {
    id: "9e14b835-1ba1-4950-981e-5a9c65765794",
    name: "Подтягивания",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "e85b1a79-4946-4c6f-bc26-ee247a970a59",
    muscle_group: {
      name: "Спина",
    },
  },
  {
    id: "9a365de8-8745-4cfb-886c-47028e2d084e",
    name: "Тяга штанги в наклоне",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "e85b1a79-4946-4c6f-bc26-ee247a970a59",
    muscle_group: {
      name: "Спина",
    },
  },
  {
    id: "ee41d6d2-edf7-4275-a5c8-708f3b1f06e9",
    name: "Приседания со штангой",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "42c6ae6f-2132-474e-9d35-5342d314b45d",
    muscle_group: {
      name: "Ноги",
    },
  },
  {
    id: "f81e90ed-6d9e-424b-b6bf-1bacd29977d8",
    name: "Румынская тяга",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "42c6ae6f-2132-474e-9d35-5342d314b45d",
    muscle_group: {
      name: "Ноги",
    },
  },
  {
    id: "815c4af5-b859-4809-8349-8309ff273975",
    name: "Жим гантелей сидя",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "4bc4d63b-6d89-4bd4-8947-3fc22077d8ed",
    muscle_group: {
      name: "Плечи",
    },
  },
  {
    id: "ab62bb10-10b0-4736-b6b7-8aa795edd02f",
    name: "Махи гантелями в стороны",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "4bc4d63b-6d89-4bd4-8947-3fc22077d8ed",
    muscle_group: {
      name: "Плечи",
    },
  },
  {
    id: "14e63890-008f-4256-85af-6deb7ec80ce1",
    name: "Подъем штанги на бицепс",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "b59604b4-9ada-41f3-bee7-6f1f8d251395",
    muscle_group: {
      name: "Руки",
    },
  },
  {
    id: "db4f30a8-d4fc-41a9-8ebf-2c5b386b6df5",
    name: "Французский жим",
    created_at: "2026-06-15T15:36:14.081554+00:00",
    is_custom: false,
    muscle_group_id: "b59604b4-9ada-41f3-bee7-6f1f8d251395",
    muscle_group: {
      name: "Руки",
    },
  },
]

export const exercisesMock = (page: Page) => {
  page.route("**/rest/v1/exercises*", async (route) => {
    console.log("mock hit", route.request().url)

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(EXERCISES_MOCK),
    })
  })
}
