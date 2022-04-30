package com.baljc.api.service;

import com.baljc.api.dto.RoutineDto;
import com.baljc.db.entity.Routine;
import com.baljc.db.repository.RoutineRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
public class RoutineServiceImpl implements RoutineService {

    private final MemberService memberService;
    private final RoutineRepository routineRepository;

    public RoutineServiceImpl(MemberService memberService, RoutineRepository routineRepository) {
        this.memberService = memberService;
        this.routineRepository = routineRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public RoutineDto.Response insertRoutine(RoutineDto.Request request) {
        Routine routine = Routine.builder()
                .member(memberService.getMemberByAuthentication())
                .title(request.getTitle())
                .repetition(request.getRepetition())
                .deletedYn('N')
                .build();
        routineRepository.save(routine);
        return new RoutineDto.Response(routine.getRoutineId(), routine.getTitle(), routine.getRepetition());
    }

    @Override
    public List<RoutineDto.Response> getRoutine() {
        return memberService.getMemberByAuthentication()
                .getRoutineList()
                .stream()
                .filter(routine -> routine.getDeletedYn() == 'N')
                .map(routine -> new RoutineDto.Response(routine.getRoutineId(),
                        routine.getTitle(), routine.getRepetition()))
                .collect(Collectors.toList());
    }

    @Override
    public List<RoutineDto.Response> getRoutineByRepetition(Integer repetition) {
        return memberService.getMemberByAuthentication()
                .getRoutineList()
                .stream()
                .filter(routine -> routine.getDeletedYn() == 'N' && (routine.getRepetition() & repetition) != 0)
                .map(routine -> new RoutineDto.Response(routine.getRoutineId(),
                        routine.getTitle(), routine.getRepetition()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public RoutineDto.Response updateRoutine(UUID routineId, RoutineDto.Request request) {
        Routine routine = routineRepository.getById(routineId);
        routine.updateRoutine(request);
        return new RoutineDto.Response(routine.getRoutineId(), routine.getTitle(), routine.getRepetition());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteRoutine(UUID routineId) {
        routineRepository.getById(routineId).deleteRoutine();
    }
}
