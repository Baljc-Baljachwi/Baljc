package com.baljc.api.controller;

import com.baljc.api.dto.RoutineDto;
import com.baljc.api.service.RoutineService;
import com.baljc.common.response.BaseDataResponse;
import com.baljc.common.response.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/routines")
public class RoutineController {

    private final RoutineService routineService;

    public RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    @PostMapping
    public ResponseEntity<BaseDataResponse<RoutineDto.Response>> addRoutine(@Valid @RequestBody RoutineDto.Request request) {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1400,
                "일과 등록에 성공하였습니다.", routineService.insertRoutine(request)));
    }

    @GetMapping("/all")
    public ResponseEntity<BaseDataResponse<List<RoutineDto.Response>>> getRoutine() {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1401,
                "일과 조회에 성공하였습니다.", routineService.getRoutine()));
    }

    @GetMapping
    public ResponseEntity<BaseDataResponse<List<RoutineDto.Response>>> getRoutineByRepetition(@RequestParam("dow") Integer dow) {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1402,
                "요일별 일과 조회에 성공하였습니다.", routineService.getRoutineByRepetition(dow)));
    }

    @PutMapping("/{routineId}")
    public ResponseEntity<BaseDataResponse<RoutineDto.Response>> modifyRoutine(
            @PathVariable("routineId") UUID routineId, @Valid @RequestBody RoutineDto.Request request) {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1403,
                "일과 변경이 완료되었습니다.", routineService.updateRoutine(routineId, request)));
    }

    @DeleteMapping("/{routineId}")
    public ResponseEntity<BaseResponse> removeRoutine(@PathVariable("routineId") UUID routineId) {
        routineService.deleteRoutine(routineId);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(1404, "일과 삭제가 완료되었습니다."));
    }
}
