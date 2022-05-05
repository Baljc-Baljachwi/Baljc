package com.baljc.api.service;

import com.baljc.api.dto.BoardDto;
import com.baljc.db.entity.Board;
import com.baljc.db.entity.BoardCategory;
import com.baljc.db.entity.BoardImg;
import com.baljc.db.entity.Member;
import com.baljc.db.repository.BoardCategoryRepository;
import com.baljc.db.repository.BoardImgRepository;
import com.baljc.db.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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
    private final String boardImagePath;

    public BoardServiceImpl(MemberService memberService,
                            FileService fileService,
                            BoardCategoryRepository boardCategoryRepository,
                            BoardRepository boardRepository,
                            BoardImgRepository boardImgRepository,
                            @Value("${cloud.aws.s3.folder.boardImage}") String boardImagePath
    ) {
        this.memberService = memberService;
        this.fileService = fileService;
        this.boardCategoryRepository = boardCategoryRepository;
        this.boardRepository = boardRepository;
        this.boardImgRepository = boardImgRepository;
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
                    .dong(member.getDong())
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
}
