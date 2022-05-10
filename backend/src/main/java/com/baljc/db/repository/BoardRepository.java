package com.baljc.db.repository;

import com.baljc.api.dto.BoardDto;
import com.baljc.db.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BoardRepository extends JpaRepository<Board, UUID> {

    @Query(value = "SELECT b.board_id as boardId, bc.name as categoryName, b.content as content, b.created_at as createdAt, m.nickname as nickname, b.dong as dong, count(h.heart_id) as heartCnt, count(c.comment_id) as commentCnt, " +
            "(6371*acos(cos(radians(:lat))*cos(radians(b.latitude))*cos(radians(b.longitude) " +
            "-radians(:lon))+sin(radians(:lat))*sin(radians(b.latitude)))) as distance " +
            "FROM board b " +
            "LEFT JOIN board_category bc " +
            "ON b.board_category_id = bc.board_category_id " +
            "LEFT JOIN member m " +
            "ON b.member_id = m.member_id and m.deleted_at is null " +
            "LEFT JOIN heart h " +
            "ON h.board_id = b.board_id " +
            "LEFT JOIN comment c " +
            "ON c.board_id = b.board_id and c.deleted_yn = 'N' " +
            "WHERE b.deleted_yn = 'N' " +
            "GROUP BY b.board_id " +
            "having distance <= 4 " +
            "ORDER BY b.created_at " +
            "LIMIT :idx, 20", nativeQuery = true)
    List<BoardDto.BoardListInterface> getBoardListAll(@Param(value = "lat") double lat, @Param(value = "lon") double lon, @Param(value = "idx") long idx);

    @Query(value = "SELECT b.board_id as boardId, bc.name as categoryName, b.content as content, b.created_at as createdAt, m.nickname as nickname, b.dong as dong, count(h.heart_id) as heartCnt, count(c.comment_id) as commentCnt, " +
            "(6371*acos(cos(radians(:lat))*cos(radians(b.latitude))*cos(radians(b.longitude) " +
            "-radians(:lon))+sin(radians(:lat))*sin(radians(b.latitude)))) as distance " +
            "FROM board b " +
            "LEFT JOIN board_category bc " +
            "ON b.board_category_id = bc.board_category_id " +
            "LEFT JOIN member m " +
            "ON b.member_id = m.member_id and m.deleted_at is null " +
            "LEFT JOIN heart h " +
            "ON h.board_id = b.board_id " +
            "LEFT JOIN comment c " +
            "ON c.board_id = b.board_id and c.deleted_yn = 'N' " +
            "WHERE b.deleted_yn = 'N' and b.board_category_id = :categoryId " +
            "GROUP BY b.board_id " +
            "having distance <= 4 " +
            "ORDER BY b.created_at " +
            "LIMIT :idx, 20", nativeQuery = true)
    List<BoardDto.BoardListInterface> getBoardListByCategory(@Param(value = "lat") double lat, @Param(value = "lon") double lon, @Param(value = "idx") long idx, @Param(value = "categoryId") byte[] categoryId);
}
