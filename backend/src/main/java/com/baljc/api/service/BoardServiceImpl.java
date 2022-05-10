package com.baljc.api.service;

import com.baljc.api.dto.BoardDto;
import com.baljc.db.entity.*;
import com.baljc.db.repository.*;
import com.baljc.exception.NotExistedAccountBookException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.ByteBuffer;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
public class BoardServiceImpl implements BoardService {

    private final MemberService memberService;
    private final FileService fileService;
    private final BoardCategoryRepository boardCategoryRepository;
    private final BoardRepository boardRepository;
    private final BoardImgRepository boardImgRepository;
    private final CommentRepository commentRepository;
    private final HeartRepository heartRepository;
    private final ScrapRepository scrapRepository;
    private final BoardRepositorySupport boardRepositorySupport;
    private final String boardImagePath;

    public BoardServiceImpl(MemberService memberService,
                            FileService fileService,
                            BoardCategoryRepository boardCategoryRepository,
                            BoardRepository boardRepository,
                            BoardImgRepository boardImgRepository,
                            CommentRepository commentRepository,
                            HeartRepository heartRepository,
                            ScrapRepository scrapRepository,
                            BoardRepositorySupport boardRepositorySupport,
                            @Value("${cloud.aws.s3.folder.boardImage}") String boardImagePath
    ) {
        this.memberService = memberService;
        this.fileService = fileService;
        this.boardCategoryRepository = boardCategoryRepository;
        this.boardRepository = boardRepository;
        this.boardImgRepository = boardImgRepository;
        this.commentRepository = commentRepository;
        this.heartRepository = heartRepository;
        this.scrapRepository = scrapRepository;
        this.boardRepositorySupport = boardRepositorySupport;
        this.boardImagePath = boardImagePath;
    }

    @Override
    public List<BoardDto.BoardCategoryResponse> getBoardCategory() {
        List<BoardCategory> list = boardCategoryRepository.findAll();
        List<BoardDto.BoardCategoryResponse> boardCategoryResponse = list.stream()
                .map(category -> new BoardDto.BoardCategoryResponse(category.getBoardCategoryId(), category.getImgUrl(), category.getName()))
                .collect(Collectors.toList());

        return boardCategoryResponse;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void insertBoard(BoardDto.BoardRequest boardRequest, List<MultipartFile> files) {
        Member member = memberService.getMemberByAuthentication();
        BoardCategory category = boardCategoryRepository.getById(boardRequest.getCategoryId());

        Board board = Board.builder()
                    .content(boardRequest.getContent())
                    .member(member)
                    .place(boardRequest.getPlace())
                    .boardCategory(category)
                    .latitude(member.getLatitude())
                    .longitude(member.getLongitude())
                    .dong(member.getDepth3())
                    .deletedYn('N')
                    .build();
        boardRepository.save(board);

        if (files != null) {
            for (MultipartFile multipartFile : files) {
                String imgUrl = fileService.uploadImage(multipartFile, boardImagePath);

                boardImgRepository.save(BoardImg.builder()
                        .board(board)
                        .imgUrl(imgUrl)
                        .deletedYn('N')
                        .build());
            }
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void insertComment(UUID boardId, BoardDto.CommentRequest commentRequest) {
        Member member = memberService.getMemberByAuthentication();
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new NullPointerException("해당 게시글이 존재하지 않습니다."));
        Comment comment = null;
        if (commentRequest.getParentId() != null) {
            comment = commentRepository.findById(commentRequest.getParentId()).orElseThrow(() -> new NullPointerException("해당 부모 댓글이 존재하지 않습니다."));
        }

        commentRepository.save(Comment.builder()
                .board(board)
                .member(member)
                .comment(comment)
                .content(commentRequest.getContent())
                .deletedYn('N')
                .build());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteComment(UUID commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new NullPointerException("해당 댓글이 존재하지 않습니다."));
        comment.deleteComment();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateHeart(UUID boardId, BoardDto.HeartRequest heartRequest) {
        Member member = memberService.getMemberByAuthentication();
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new NullPointerException("해당 게시글이 존재하지 않습니다."));

        if (heartRequest.getHeartYn().charAt(0) == 'Y') {
            heartRepository.save(Heart.builder()
                    .member(member)
                    .board(board)
                    .build());
        } else {
            Heart heart = heartRepository.findByMemberAndBoard(member, board).orElseThrow(() -> new NullPointerException("해당 좋아요가 존재하지 않습니다."));
            heartRepository.deleteById(heart.getHeartId());
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateScrap(UUID boardId, BoardDto.ScrapRequest scrapRequest) {
        Member member = memberService.getMemberByAuthentication();
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new NullPointerException("해당 게시글이 존재하지 않습니다."));

        if (scrapRequest.getScrapYn().charAt(0) == 'Y') {
            scrapRepository.save(Scrap.builder()
                    .member(member)
                    .board(board)
                    .build());
        } else {
            Scrap scrap = scrapRepository.findByMemberAndBoard(member, board).orElseThrow(() -> new NullPointerException("해당 스크랩이 존재하지 않습니다."));
            scrapRepository.deleteById(scrap.getScrapId());
        }
    }

    @Override
    public List<BoardDto.BoardListResponse> getBoardList(UUID categoryId, Long index) {
        Member member = memberService.getMemberByAuthentication();

        List<BoardDto.BoardListInterface> list = null;
        if (categoryId.toString().equals("271105c2-f94c-47bc-8af4-dc156dcad3eb")) {
            list = boardRepository.getBoardListAll(member.getLatitude(), member.getLongitude(), index);
        } else {
            ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
            bb.putLong(categoryId.getMostSignificantBits());
            bb.putLong(categoryId.getLeastSignificantBits());
            list = boardRepository.getBoardListByCategory(member.getLatitude(), member.getLongitude(), index, bb.array());
        }

        List<BoardDto.BoardListResponse> response = list.stream()
                .map(board -> {
                    String date = "";

                    Long minutes = ChronoUnit.MINUTES.between(board.getCreatedAt(), LocalDateTime.now());
                    Long hours = ChronoUnit.HOURS.between(board.getCreatedAt(), LocalDateTime.now());
                    Long days = ChronoUnit.DAYS.between(board.getCreatedAt(), LocalDateTime.now());

                    String dayFormat = board.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                    if (minutes < 60) {
                        date = minutes + "분전";
                    } else if (hours < 24) {
                        date = hours + "시간전";
                    } else if (days < 7) {
                        date = days + "일전";
                    } else {
                        date = dayFormat;
                    }

                    ByteBuffer byteBuffer = ByteBuffer.wrap(board.getBoardId());
                    long high = byteBuffer.getLong();
                    long low = byteBuffer.getLong();

                    List<String> imgList = boardRepositorySupport.getImgURLList(new UUID(high, low));

                    return new BoardDto.BoardListResponse(
                            new UUID(high, low),
                            board.getCategoryName(),
                            board.getContent(),
                            date,
                            board.getCreator(),
                            board.getDong(),
                            imgList,
                            board.getHeartCnt(),
                            board.getCommentCnt());
                }).collect(Collectors.toList());

        return response;
    }

}
