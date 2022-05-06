package com.baljc.api.controller;

import com.baljc.api.dto.TodoDto;
import com.baljc.api.service.TodoService;
import com.baljc.common.response.BaseDataResponse;
import com.baljc.common.response.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public ResponseEntity<BaseDataResponse<TodoDto.Response>> addTodo(@Valid @RequestBody TodoDto.Request request) {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1500,
                "할일 등록에 성공하였습니다.", todoService.insertTodo(request)));
    }

    @GetMapping
    public ResponseEntity<BaseDataResponse<List<TodoDto.Response>>> getTodo(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1501,
                "할일 조회에 성공하였습니다.", todoService.getTodoByDate(date)));
    }

    @PatchMapping("/{todoId}")
    public ResponseEntity<BaseDataResponse<TodoDto.Response>> modifyTodoContent(
            @PathVariable("todoId") UUID todoId, @Valid @RequestBody TodoDto.ContentRequest contentRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1502,
                "할일 내용 변경이 완료되었습니다.", todoService.updateTodoContent(todoId, contentRequest)));
    }

    @PatchMapping("/{todoId}/done")
    public ResponseEntity<BaseDataResponse<TodoDto.Response>> modifyTodoYn(
            @PathVariable("todoId") UUID todoId, @Valid @RequestBody TodoDto.YnRequest ynRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1503,
                "할일 완료여부 변경이 완료되었습니다.", todoService.updateTodoYn(todoId, ynRequest)));
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<BaseResponse> removeTodo(@PathVariable("todoId") UUID todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(1504, "할일 삭제가 완료되었습니다."));
    }
}
