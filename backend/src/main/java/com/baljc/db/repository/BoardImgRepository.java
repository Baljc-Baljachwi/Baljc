package com.baljc.db.repository;

import com.baljc.db.entity.BoardImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BoardImgRepository extends JpaRepository<BoardImg, UUID> {

}
