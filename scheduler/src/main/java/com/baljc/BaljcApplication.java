package com.baljc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class BaljcApplication {

	public static void main(String[] args) {
		SpringApplication.run(BaljcApplication.class, args);
	}

}
