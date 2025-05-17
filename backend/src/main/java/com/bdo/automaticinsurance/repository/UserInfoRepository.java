package com.bdo.automaticinsurance.repository;

import com.bdo.automaticinsurance.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo,Long> {
}
