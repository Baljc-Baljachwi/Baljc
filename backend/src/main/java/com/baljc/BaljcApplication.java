package com.baljc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BaljcApplication {

	public static void main(String[] args) {
		SpringApplication.run(BaljcApplication.class, args);
	}

}
