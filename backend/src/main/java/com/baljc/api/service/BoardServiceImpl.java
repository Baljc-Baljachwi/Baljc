package com.baljc.api.service;

import com.baljc.api.dto.BoardDto;
import com.baljc.db.entity.*;
import com.baljc.db.repository.*;
import com.baljc.exception.HeartAlreadyExistException;
import com.baljc.exception.NotExistedAccountBookException;
import com.baljc.exception.ScrapAlreadyExistException;
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
import java.util.*;
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
    public void updateBoard(UUID boardId, BoardDto.BoardUpdateRequest boardUpdateRequest, List<MultipartFile> files) {
        BoardCategory category = boardCategoryRepository.getById(boardUpdateRequest.getCategoryId());

        Board board = boardRepository.findById(boardId).orElseThrow(() -> new NullPointerException("해당 게시글이 존재하지 않습니다."));
        board.updateBoard(boardUpdateRequest, category);

        for (UUID uuid : boardUpdateRequest.getDeleteBoardImgIdList()) {
            BoardImg boardImg = boardImgRepository.findById(uuid).orElseThrow(() -> new NullPointerException("해당 이미지가 존재하지 않습니다."));
            boardImg.deleteBoardImg();
            fileService.deleteImage(boardImg.getImgUrl());
        }

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
    public void deleteBoard(UUID boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new NullPointerException("해당 게시글이 존재하지 않습니다."));
        board.deleteBoard();

        List<BoardImg> boardImgList = boardRepositorySupport.getDeleteImgList(boardId);
        for (BoardImg bi : boardImgList) {
            bi.deleteBoardImg();
            fileService.deleteImage(bi.getImgUrl());
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
            Heart heart = heartRepository.findByMemberAndBoard(member, board).orElse(null);
            if (heart != null) throw new HeartAlreadyExistException("이미 좋아요가 되어 있는 상태입니다.");

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
            Scrap scrap = scrapRepository.findByMemberAndBoard(member, board).orElse(null);
            if (scrap != null) throw new ScrapAlreadyExistException("이미 스크랩이 되어 있는 상태입니다.");

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
                    Long minutes = ChronoUnit.MINUTES.between(board.getCreatedAt(), LocalDateTime.now());
                    Long hours = ChronoUnit.HOURS.between(board.getCreatedAt(), LocalDateTime.now());
                    Long days = ChronoUnit.DAYS.between(board.getCreatedAt(), LocalDateTime.now());

                    String date = board.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                    if (days >= 1 && days < 7) {
                        date = days + "일전";
                    } else if (hours >= 1 && hours < 24) {
                        date = hours + "시간전";
                    } else if (minutes >= 1 && minutes < 60) {
                        date = minutes + "분전";
                    } else if (minutes < 1) {
                        date = "방금전";
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

    @Override
    public BoardDto.BoardDetailResponse getBoardDetail(UUID boardId) {
        Member member = memberService.getMemberByAuthentication();
        BoardDto.BoardDetailDto boardDetail = boardRepositorySupport.getBoardDetail(boardId, member);

        List<BoardDto.CommentListDto> commentList = boardRepositorySupport.getCommentList(boardId);
        List<BoardDto.BoardDetailCommentResponse> commentResponse = new ArrayList<>();
        for (BoardDto.CommentListDto commentListDto : commentList) {
            Long minutes = ChronoUnit.MINUTES.between(commentListDto.getCreatedAt(), LocalDateTime.now());
            Long hours = ChronoUnit.HOURS.between(commentListDto.getCreatedAt(), LocalDateTime.now());
            Long days = ChronoUnit.DAYS.between(commentListDto.getCreatedAt(), LocalDateTime.now());

            String date = commentListDto.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            if (days >= 1 && days < 7) {
                date = days + "일전";
            } else if (hours >= 1 && hours < 24) {
                date = hours + "시간전";
            } else if (minutes >= 1 && minutes < 60) {
                date = minutes + "분전";
            } else if (minutes < 1) {
                date = "방금전";
            }

            if (commentListDto.getParentId() == null) {
                commentResponse.add(new BoardDto.BoardDetailCommentResponse(
                        commentListDto.getCommentId(),
                        commentListDto.getMemberId(),
                        commentListDto.getProfileUrl(),
                        commentListDto.getNickname(),
                        commentListDto.getContent(),
                        date,
                        commentListDto.getDeletedYn(),
                        new ArrayList<>()
                ));
            } else {
                for (int i = 0; i < commentResponse.size(); i++) {
                    BoardDto.BoardDetailCommentResponse comment = commentResponse.get(i);
                    if (comment.getCommentId().equals(commentListDto.getParentId())) {
                        comment.getList().add(
                                new BoardDto.BoardDetailCommentResponse(
                                        commentListDto.getCommentId(),
                                        commentListDto.getMemberId(),
                                        commentListDto.getProfileUrl(),
                                        commentListDto.getNickname(),
                                        commentListDto.getContent(),
                                        date,
                                        commentListDto.getDeletedYn(),
                                        null
                        ));
                        break;
                    }
                }
            }
        }

        Long minutes = ChronoUnit.MINUTES.between(boardDetail.getCreatedAt(), LocalDateTime.now());
        Long hours = ChronoUnit.HOURS.between(boardDetail.getCreatedAt(), LocalDateTime.now());
        Long days = ChronoUnit.DAYS.between(boardDetail.getCreatedAt(), LocalDateTime.now());

        String date = boardDetail.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        if (days >= 1 && days < 7) {
            date = days + "일전";
        } else if (hours >= 1 && hours < 24) {
            date = hours + "시간전";
        } else if (minutes >= 1 && minutes < 60) {
            date = minutes + "분전";
        } else if (minutes < 1) {
            date = "방금전";
        }

        List<BoardDto.BoardImgURLDto> imgList = boardRepositorySupport.getBoardDetailImgURLList(boardId);

        BoardDto.BoardDetailResponse response = new BoardDto.BoardDetailResponse(
                    boardDetail.getBoardId(),
                    boardDetail.getMemberId(),
                    boardDetail.getProfileUrl(),
                    boardDetail.getNickname(),
                    boardDetail.getCategoryName(),
                    boardDetail.getContent(),
                    date,
                    boardDetail.getHeartCnt(),
                    boardDetail.getCommentCnt(),
                    boardDetail.getIsHeart(),
                    boardDetail.getIsScrap(),
                    imgList,
                    commentResponse
                );

        return response;
    }

}
