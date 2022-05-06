package com.baljc.api.service;

import com.baljc.api.dto.RoutineDto;

import java.util.List;
import java.util.UUID;

public interface RoutineService {
    RoutineDto.Response insertRoutine(RoutineDto.Request request);
    List<RoutineDto.Response> getRoutine();
    List<RoutineDto.Response> getRoutineByRepetition(Integer repetition);
    RoutineDto.Response updateRoutine(UUID routineId, RoutineDto.Request request);
    void deleteRoutine(UUID routineId);
}
