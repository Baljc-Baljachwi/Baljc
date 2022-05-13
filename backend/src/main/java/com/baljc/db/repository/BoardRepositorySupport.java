package com.baljc.db.repository;

import com.baljc.api.dto.*;
import com.baljc.db.entity.*;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.MathExpressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Expr;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.querydsl.core.types.ExpressionUtils.count;

@RequiredArgsConstructor
@Repository
public class BoardRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QBoard qBoard = QBoard.board;
    QBoardCategory qBoardCategory = QBoardCategory.boardCategory;
    QMember qMember = QMember.member;
    QMember qMemberSelf = QMember.member;
    QHeart qHeart = QHeart.heart;
    QScrap qScrap = QScrap.scrap;
    QComment qComment = QComment.comment1;
    QBoardImg qBoardImg = QBoardImg.boardImg;

//    public Optional<List<BoardDto.BoardListDto>> getBoardList(UUID categoryId, Long index, Member member) {
//        NumberPath<Double> distance = Expressions.numberPath(Double.class, "distance");
//
//        List<BoardDto.BoardListDto> response = jpaQueryFactory.select(
//                new QBoardDto_BoardListDto(qBoard.boardId, qBoardCategory.name, qBoard.content, qBoard.createdAt, qMember.nickname, qBoard.dong, qHeart.count(), qComment.count(),
//                        (MathExpressions.acos(MathExpressions.cos(MathExpressions.radians(qMemberSelf.latitude)).multiply(MathExpressions.cos(MathExpressions.radians(qBoard.latitude))))
//                                .multiply(MathExpressions.cos(MathExpressions.radians(qBoard.longitude))).multiply(6371).subtract(MathExpressions.radians(qMemberSelf.longitude)))
//                                .add(MathExpressions.sin(MathExpressions.radians(qMemberSelf.latitude)).multiply(MathExpressions.sin(MathExpressions.radians(qBoard.latitude))))
//                ))
//                .from(qBoard)
//                .leftJoin(qBoardCategory).on(qBoard.boardCategory.eq(qBoardCategory))
//                .leftJoin(qMember).on(qBoard.member.eq(qMember))
//                .leftJoin(qHeart).on(qHeart.board.eq(qBoard))
//                .leftJoin(qComment).on(qComment.board.eq(qBoard))
//                .leftJoin(qMemberSelf)
//                .groupBy(qBoard)
//                .having(
//                        JPAExpressions
//                                .select((MathExpressions.acos(MathExpressions.cos(MathExpressions.radians(Expressions.constant(member.getLatitude()))).multiply(MathExpressions.cos(MathExpressions.radians(qBoard.latitude))))
//                                        .multiply(MathExpressions.cos(MathExpressions.radians(qBoard.longitude))).multiply(6371).subtract(MathExpressions.radians(Expressions.constant(member.getLongitude()))))
//                                        .add(MathExpressions.sin(MathExpressions.radians(Expressions.constant(member.getLatitude()))).multiply(MathExpressions.sin(MathExpressions.radians(qBoard.latitude)))))
//                                .from(qBoard)
//                                .lt(4.0))
//                .where(qBoardCategory.boardCategoryId.eq(categoryId), qBoard.deletedYn.eq('N'))
//                .orderBy(qBoard.createdAt.desc())
//                .offset(index)
//                .limit(20)
//                .fetch();
//
//        return Optional.ofNullable(response);
//    }

    public List<String> getImgURLList(UUID boardId) {
        List<String> response = jpaQueryFactory.select(qBoardImg.imgUrl)
                .from(qBoardImg)
                .leftJoin(qBoard).on(qBoardImg.board.eq(qBoard))
                .where(qBoard.boardId.eq(boardId).and(qBoardImg.deletedYn.eq('N')))
                .orderBy(qBoardImg.createdAt.asc())
                .fetch();

        return response;
    }

    public List<BoardDto.BoardImgURLDto> getBoardDetailImgURLList(UUID boardId) {
        List<BoardDto.BoardImgURLDto> response = jpaQueryFactory.select(new QBoardDto_BoardImgURLDto(qBoardImg.boardImgId, qBoardImg.imgUrl))
                .from(qBoardImg)
                .leftJoin(qBoard).on(qBoardImg.board.eq(qBoard))
                .where(qBoard.boardId.eq(boardId).and(qBoardImg.deletedYn.eq('N')))
                .orderBy(qBoardImg.createdAt.asc())
                .fetch();

        return response;
    }

    public BoardDto.BoardDetailDto getBoardDetail(UUID boardId, Member member) {
        BoardDto.BoardDetailDto response = jpaQueryFactory.select(
                        new QBoardDto_BoardDetailDto(qBoard.boardId, qMember.memberId, qMember.profileUrl, qMember.nickname,
                                qBoardCategory.name, qBoard.content, qBoard.createdAt, qHeart.countDistinct(), qComment.countDistinct(),
                                ExpressionUtils.as(
                                        JPAExpressions.select(count(qHeart.heartId))
                                                .from(qHeart)
                                                .where(qHeart.member.eq(member).and(qHeart.board.boardId.eq(boardId))),
                                        "isHeart"),
                                ExpressionUtils.as(
                                        JPAExpressions.select(count(qScrap.scrapId))
                                                .from(qScrap)
                                                .where(qScrap.member.eq(member).and(qScrap.board.boardId.eq(boardId))),
                                        "isScrap")
                        ))
                .from(qBoard)
                .leftJoin(qBoardCategory).on(qBoard.boardCategory.eq(qBoardCategory))
                .leftJoin(qMember).on(qBoard.member.eq(qMember))
                .leftJoin(qHeart).on(qHeart.board.eq(qBoard))
                .leftJoin(qComment).on(qComment.board.eq(qBoard).and(qComment.deletedYn.eq('N')))
                .groupBy(qBoard.boardId)
                .where(qBoard.boardId.eq(boardId).and(qBoard.deletedYn.eq('N')))
                .fetchOne();

        return response;
    }

    public List<BoardImg> getDeleteImgList(UUID boardId) {
        List<BoardImg> response = jpaQueryFactory.select(qBoardImg)
                .from(qBoardImg)
                .leftJoin(qBoard).on(qBoardImg.board.eq(qBoard))
                .where(qBoard.boardId.eq(boardId).and(qBoardImg.deletedYn.eq('N')))
                .orderBy(qBoardImg.createdAt.asc())
                .fetch();

        return response;
    }

    public List<BoardDto.CommentListDto> getCommentList(UUID boardId) {
        List<BoardDto.CommentListDto> response = jpaQueryFactory.select(
                        new QBoardDto_CommentListDto(
                                qComment.commentId, qMember.memberId, qMember.profileUrl, qMember.nickname,
                                qComment.content, qComment.createdAt, qComment.comment.commentId, qComment.deletedYn
                        ))
                .from(qComment)
                .leftJoin(qMember).on(qComment.member.eq(qMember))
                .where(qComment.board.boardId.eq(boardId))
                .orderBy(qComment.createdAt.asc())
                .fetch();

        return response;
    }

    public BoardDto.CommentListDto getComment(UUID commentId) {
        BoardDto.CommentListDto response = jpaQueryFactory.select(
                        new QBoardDto_CommentListDto(
                                qComment.commentId, qMember.memberId, qMember.profileUrl, qMember.nickname,
                                qComment.content, qComment.createdAt, qComment.comment.commentId, qComment.deletedYn
                        ))
                .from(qComment)
                .leftJoin(qMember).on(qComment.member.eq(qMember))
                .where(qComment.commentId.eq(commentId))
                .fetchOne();

        return response;
    }

    public List<BoardDto.CommentListDto> getSubCommentList(UUID commentId) {
        List<BoardDto.CommentListDto> response = jpaQueryFactory.select(
                        new QBoardDto_CommentListDto(
                                qComment.commentId, qMember.memberId, qMember.profileUrl, qMember.nickname,
                                qComment.content, qComment.createdAt, qComment.comment.commentId, qComment.deletedYn
                        ))
                .from(qComment)
                .leftJoin(qMember).on(qComment.member.eq(qMember))
                .where(qComment.comment.commentId.eq(commentId))
                .orderBy(qComment.createdAt.asc())
                .fetch();

        return response;
    }

}
