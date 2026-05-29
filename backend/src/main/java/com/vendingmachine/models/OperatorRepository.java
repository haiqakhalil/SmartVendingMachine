package com.vendingmachine.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OperatorRepository extends JpaRepository<Operator, Integer> {
    Optional<Operator> findByUsername(String username);
}