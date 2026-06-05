package com.vendingmachine.models;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RestockLogRepository extends JpaRepository<RestockLog, Integer> {

}