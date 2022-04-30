package com.baljc.api.service;

import com.baljc.api.dto.TodoDto;

import java.time.LocalDate;
import java.util.UUID;

public interface TodoService {
    TodoDto.Response insertTodo(TodoDto.Request request);
    TodoDto.ResponseByDate getTodoByDate(LocalDate date);
    TodoDto.Response updateTodoContent(UUID todoId, TodoDto.ContentRequest contentRequest);
    TodoDto.Response updateTodoYn(UUID todoId, TodoDto.YnRequest ynRequest);
    void deleteTodo(UUID todoId);
}
