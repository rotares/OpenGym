import { queryOptions } from "@tanstack/react-query";
import { type MuscleInfo } from "../model/types";
import { muscleService } from "./muscle-service";

export const MUSCLE_QUERIES = {
  all: () => ['muscle_info'],

  list: () => queryOptions<MuscleInfo[]>({
    queryKey: MUSCLE_QUERIES.all(),
    queryFn: () => muscleService.getMuscles(),
    staleTime: 1000 * 60 * 5,
  })
}

