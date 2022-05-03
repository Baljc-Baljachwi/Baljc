package com.baljc.db.repository;

import com.baljc.db.entity.Member;
import com.baljc.db.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RoutineRepository extends JpaRepository<Routine, UUID> {
    List<Routine> findByMember(Member member);
//    @Query("select r.routineId, r.title, r.repetition from Routine r where r.member.memberId = :memberId and " +
//            "r.deletedYn = 'N' and (r.repetiton & :repetition) != 0")
//    List<RoutineDto.Response> findWithRepetition(@Param("memberId") UUID memberId, @Param("repetition") Integer repetition);
}
