package com.baljc.api.service;

import com.baljc.api.dto.ChatDto;
import com.baljc.api.dto.MemberDto;
import com.baljc.db.entity.Chat;
import com.baljc.db.entity.Member;
import com.baljc.db.entity.Room;
import com.baljc.db.repository.ChatRepository;
import com.baljc.db.repository.MemberRepository;
import com.baljc.db.repository.RoomRepository;
import com.baljc.exception.NotExistedMemberException;
import com.baljc.exception.NotExistedRoomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
public class ChatServiceImpl implements ChatService{

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final ChatRepository chatRepository;

    public ChatServiceImpl(MemberService memberService, MemberRepository memberRepository,
                           RoomRepository roomRepository, ChatRepository chatRepository) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.roomRepository = roomRepository;
        this.chatRepository = chatRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ChatDto.RoomResponse insertRoom(ChatDto.RoomRequest roomRequest) {
        if (!(memberRepository.findById(roomRequest.getMemberId1()).isPresent()
                && memberRepository.findById(roomRequest.getMemberId2()).isPresent()))
            throw new NotExistedMemberException("아이디로 조회되는 회원이 존재하지 않습니다.");

        Room room = roomRepository.findByMembers(roomRequest.getMemberId1(), roomRequest.getMemberId2()).orElseGet(
                () -> roomRepository.save(Room.builder()
                        .member1(memberRepository.getById(roomRequest.getMemberId1()))
                        .member2(memberRepository.getById(roomRequest.getMemberId2()))
                        .build())
        );

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime dateTime = room.getUpdatedAt();
        String updatedAt = dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        long diff = ChronoUnit.DAYS.between(dateTime, now);

        if (diff < 7) {
            if (diff >= 1) updatedAt = diff + "일전";
            else {
                diff = ChronoUnit.HOURS.between(dateTime, now);
                if (diff >= 1) updatedAt = diff + "시간전";
                else {
                    diff = ChronoUnit.MINUTES.between(dateTime, now);
                    if (diff >= 1) updatedAt = diff + "분전";
                    else updatedAt = "방금전";
                }
            }
        }

        Member other = room.getMember1();
        if (other.getMemberId().equals(memberService.getMemberByAuthentication().getMemberId()))
            other = room.getMember2();
        return new ChatDto.RoomResponse(room.getRoomId(), updatedAt, new MemberDto.Other(other.getNickname(),
                other.getProfileUrl(), other.getDepth1(), other.getDepth2(), other.getDepth3()));
    }

    @Override
    public List<ChatDto.RoomContentResponse> getRoomList() {
        Member member = memberService.getMemberByAuthentication();
        List<Room> roomList1 = member.getRoomList1();
        List<Room> roomList2 = member.getRoomList2();
        List<Room> roomList = new ArrayList<>();
        Collections.addAll(roomList, roomList1.toArray(new Room[0]));
        Collections.addAll(roomList, roomList2.toArray(new Room[0]));

        return roomList
                .stream()
                .filter(room -> !room.getChatList().isEmpty())
                .sorted(Comparator.comparing(Room::getUpdatedAt).reversed())
                .map(room -> {
                    Chat chat = room.getChatList()
                            .stream()
                            .max(Comparator.comparing(Chat::getCreatedAt))
                            .orElseGet(() -> Chat.builder().build());

                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime dateTime = chat.getCreatedAt();
                    String updatedAt = dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    long diff = ChronoUnit.DAYS.between(dateTime, now);

                    if (diff < 7) {
                        if (diff >= 1) updatedAt = diff + "일전";
                        else {
                            diff = ChronoUnit.HOURS.between(dateTime, now);
                            if (diff >= 1) updatedAt = diff + "시간전";
                            else {
                                diff = ChronoUnit.MINUTES.between(dateTime, now);
                                if (diff >= 1) updatedAt = diff + "분전";
                                else updatedAt = "방금전";
                            }
                        }
                    }

                    Member other = room.getMember1();
                    if (other.getMemberId().equals(member.getMemberId())) other = room.getMember2();

                    return new ChatDto.RoomContentResponse(room.getRoomId(), updatedAt, chat.getContent(),
                            new MemberDto.Other(other.getNickname(), other.getProfileUrl(),
                                    other.getDepth1(), other.getDepth2(), other.getDepth3()));
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ChatDto.ChatResponse> getChatList(UUID roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new NotExistedRoomException("아이디로 조회되는 채팅 방이 존재하지 않습니다."))
                .getChatList()
                .stream()
                .sorted(Comparator.comparing(Chat::getCreatedAt))
                .map(chat -> new ChatDto.ChatResponse(
                        chat.getChatId(),
                        chat.getMember().getMemberId(),
                        chat.getMember().getNickname(),
                        chat.getContent(),
                        chat.getImgUrl(),
                        chat.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void insertChat(UUID roomId, ChatDto.ChatRequest chatRequest) {
        Room room = roomRepository.getById(roomId);
        Chat chat = chatRepository.save(Chat.builder()
                        .room(room)
                        .member(memberRepository.getById(chatRequest.getMemberId()))
                        .content(chatRequest.getContent())
                .build());
        room.updateDateTime(chat.getCreatedAt());
    }
}
