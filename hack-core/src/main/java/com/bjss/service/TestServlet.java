package com.bjss.service;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.inject.Singleton;


@Singleton
public class TestServlet extends HttpServlet {

	// service() responds to both GET and POST requests.
	// You can also use doGet() or doPost()
	@Override
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		response.setContentType("text/plain");
		response.getWriter().print("This server is working");
	}
}
