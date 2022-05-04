package com.baljc.api.service;

import com.baljc.api.dto.TodoDto;
import com.baljc.db.entity.Todo;
import com.baljc.db.repository.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
public class TodoServiceImpl implements TodoService {

    private final MemberService memberService;
    private final TodoRepository todoRepository;

    public TodoServiceImpl(MemberService memberService, TodoRepository todoRepository) {
        this.memberService = memberService;
        this.todoRepository = todoRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TodoDto.Response insertTodo(TodoDto.Request request) {
        Todo todo = Todo.builder()
                .member(memberService.getMemberByAuthentication())
                .date(request.getDate())
                .content(request.getContent())
                .completedYn('N')
                .deletedYn('N')
                .build();
        todoRepository.save(todo);
        return new TodoDto.Response(todo.getTodoId(), todo.getDate(), todo.getContent(), todo.getCompletedYn());
    }

    @Override
    public List<TodoDto.Response> getTodoByDate(LocalDate date) {
//        List<RoutineDto.Response> routines = routineService
//                .getRoutineByRepetition(1 << (6 - (date.getDayOfWeek().getValue() % 7)));
        return memberService.getMemberByAuthentication()
                .getTodoList()
                .stream()
                .filter(todo -> todo.getDeletedYn() == 'N' && todo.getDate().equals(date))
                .sorted(Comparator.comparing(Todo::getCreatedAt))
                .map(todo -> new TodoDto.Response(todo.getTodoId(), todo.getDate(),
                        todo.getContent(), todo.getCompletedYn()))
                .collect(Collectors.toList());
//        return new TodoDto.ResponseByDate(routines, todos);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TodoDto.Response updateTodoContent(UUID todoId, TodoDto.ContentRequest contentRequest) {
        Todo todo = todoRepository.getById(todoId);
        todo.updateTodoContent(contentRequest);
        return new TodoDto.Response(todo.getTodoId(), todo.getDate(), todo.getContent(), todo.getCompletedYn());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TodoDto.Response updateTodoYn(UUID todoId, TodoDto.YnRequest ynRequest) {
        Todo todo = todoRepository.getById(todoId);
        todo.updateTodoYn(ynRequest.getCompletedYn().charAt(0));
        return new TodoDto.Response(todo.getTodoId(), todo.getDate(), todo.getContent(), todo.getCompletedYn());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteTodo(UUID todoId) {
        todoRepository.getById(todoId).deleteTodo();
    }
}
