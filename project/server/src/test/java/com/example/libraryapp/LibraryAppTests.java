package com.example.libraryapp;

import com.example.libraryapp.book.BookController;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class LibraryAppTests {

	@Autowired
	private BookController bookController;
	@Test
	void contextLoads() throws Exception{
		Assertions.assertThat(bookController).isNotNull();
	}

}
