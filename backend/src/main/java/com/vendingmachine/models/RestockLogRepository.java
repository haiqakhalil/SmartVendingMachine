package com.vendingmachine.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestockLogRepository extends JpaRepository<RestockLog, Integer> {}