package com.baljc.api.service;

import com.baljc.api.dto.ChatDto;
import com.baljc.api.dto.MemberDto;
import com.baljc.db.entity.Member;
import com.baljc.db.entity.Room;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
public class ChatServiceImpl implements ChatService{

    private final MemberService memberService;

    public ChatServiceImpl(MemberService memberService) {
        this.memberService = memberService;
    }

    @Override
    public List<ChatDto.RoomResponse> getRoomList() {
        Member member = memberService.getMemberByAuthentication();
        List<Room> roomList1 = member.getRoomList1();
        List<Room> roomList2 = member.getRoomList2();
        List<Room> roomList = new ArrayList<>();
        Collections.addAll(roomList, roomList1.toArray(new Room[0]));
        Collections.addAll(roomList, roomList2.toArray(new Room[0]));

        return roomList
                .stream()
                .sorted(Comparator.comparing(Room::getUpdatedAt).reversed())
                .map(room -> {
                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime dateTime = room.getUpdatedAt();
                    int minutes = (int)ChronoUnit.MINUTES.between(dateTime, now);
                    int hours = (int)ChronoUnit.HOURS.between(dateTime, now);
                    int days = (int)ChronoUnit.DAYS.between(dateTime, now);
                    String updatedAt = dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    if (minutes < 60) {
                        updatedAt = minutes + "분전";
                    }else if (hours < 24) {
                        updatedAt = hours + "시간전";
                    }else if(minutes < 60 * 24 * 7) {
                        updatedAt = days + "일전";
                    }

                    Member other = room.getMember1();
                    if (other.getMemberId().equals(member.getMemberId())) other = room.getMember2();

                    return new ChatDto.RoomResponse(room.getRoomId(), updatedAt,
                            new MemberDto.Other(other.getNickname(), other.getProfileUrl(),
                                    other.getDepth1(), other.getDepth2(), other.getDepth3()));
                })
                .collect(Collectors.toList());
    }
}
